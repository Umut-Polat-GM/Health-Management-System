const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler')//try cache gerek kalmaz
const User = require('../models/userModel.js')
const Doctor = require('../models/doctorModel.js')
const Specialization = require('../models/specializationModel.js')
const sendVerificationEmail = require('../utils/sendVerificationEmail.js');
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail.js');
const CustomError = require('../errors');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const createHash = require('../utils/createHash');

const registerUser = asyncErrorHandler(async (req, res) => {
  const { username, email, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const token = crypto.randomBytes(40).toString('hex');//burası email verify işlemi için gerekli

  // Create user
  const user = await User({
    username,
    email,
    password: hashedPassword,
    verificationToken: token,//verify işlemi olduktan sonra "" olacak dbde /ama bunu clienta gönderip işlem yaptırıcaz
  })


  await sendVerificationEmail({
    name: user.username,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: process.env.ORIGIN,
  });

  await user.save()
  res.status(StatusCodes.CREATED).json({
    message: 'Success! Please check your email to verify account',
  });
})

const verifyEmail = asyncErrorHandler(async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed")
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('Verification Failed');
  }

  user.isVerified = true
  user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });

});
const loginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email } );
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    if (!user.isVerified) {
      const token = crypto.randomBytes(40).toString('hex');//burası email verify işlemi için gerekli
      user.verificationToken = token;
      await user.save();
      console.log("----------");
      console.log(user.verificationToken+"----------");
      await sendVerificationEmail({
        name: user.username,
        email: user.email,
        verificationToken: user.verificationToken,
        origin: process.env.ORIGIN,
      });
      return res.status(StatusCodes.OK).json({
        success: true,
        verifyError:true,
        message: "Hesabınız doğrulanmamıştır. Lütfen mail adresinize gönderilen doğrulama bağlantısını kullanarak hesabınızı doğrulayınız.",
      });
      }


    //"password" alanını çıkarmayı amaçlar
    const token = await generateToken(user._id);
    if (!token) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    let oldTokens = user.tokens || [];
    if (oldTokens.length) {
      oldTokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 86400) {
          return t;
        }
      })
    }
    await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { token, signedAt: Date.now().toString() }] })
    res.status(StatusCodes.OK).json({
      succedd: true,
      token,
      user,
      message: "Successfully sign-in",
    })
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
      succeded:false,
      message:"Şifrenizi tekrardan giriniz"
    })
  }

  // const { email, password } = req.body
  // const user = await User.findOne({ email })

  // if (user && user.isVerified && (await bcrypt.compare(password, user.password))) {
  //   res.status(201).json({

  //     name: user.username,
  //     email: user.email,
  //     isDoctor: user.isDoctor,//
  //     notification: user.notification.map((item) => { return item.message }),//dene çalışıyor mu
  //     token: generateToken(user._id)
  //   })
  // } else {
  //   res.status(400)
  //   throw new Error('Invalid credentials')
  // }
})
const forgotPassword = asyncErrorHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');

    await sendResetPasswordEmail({
      name: user.username,
      email: user.email,
      token: passwordToken,
      origin: process.env.ORIGIN,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    //güvenlik için zamanını da tutyoruz 10 dk sonra geçersiz olacak/ onaylandıktan sonra passwordtoken ve expiration date null olacak
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ message: 'Please check your email for reset password link' });
});

const resetPassword = asyncErrorHandler(async (req, res) => {
  const { token, email, password } = req.body;//token kontrolu yapılmalı

  if (!token || !email || !password) {
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    throw new CustomError.BadRequestError('Please provide different password');
  }

  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.send('reset password');
});



// doktor başvuru 
const applyDoctor = asyncErrorHandler(async (req, res) => {

  try {
    if (!req.body) {
      res.status(400)
      throw new Error('there is no data')
    }
    // if (!userId || !firstName || !lastName || !phone || !specializationId ) {
    //   res.status(400)
    //   throw new Error('there is no data')
    // }
    const { userId, firstName, lastName, phone, specializationId } = req.body;

    const newDoctor = new Doctor({
      firstName,
      lastName,
      phone,
      status: "pending",
    });

    const userProp = await User.findById(userId);
    const spelizProp = await Specialization.findById(specializationId);

    newDoctor.userId = userProp;
    newDoctor.specializationId = spelizProp;
    await newDoctor.save();

    //   const populatedDoctor = await Doctor.findOne({_id: newDoctor._id})
    //   .populate("specializationId")
    //   .exec();

    // console.log(populatedDoctor.specializationId.specialization);//genel cerrahi

    // const populatedDoctor = await Doctor.findOne({_id: newDoctor._id})
    //   .populate("userId")
    //   .exec();

    // console.log(populatedDoctor);

    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    notification = {
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,//şuan pendingte doktor onaylarsa isDoctor true olaac

    };

    user.notification.push(notification);
    console.log(user.notification)
    await user.save();

    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctor",
    });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  applyDoctor,
  verifyEmail,
  forgotPassword,
  resetPassword
}
