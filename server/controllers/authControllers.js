const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')//try cache gerek kalmaz
const User = require('../models/userModel.js')
const Doctor = require('../models/doctorModel.js')
const Specialization = require('../models/specializationModel.js')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isDoctor: user.isDoctor,//
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// doktor başvuru 
const applyDoctor = async (req, res) => {

  try {
    console.log(req.body)

    // id = req.body.userId;
    const { userId, firstName, lastName, phone, specializationId } = req.body;

    if (!req.body) {
      res.status(400)
      throw new Error('there is no data')
    }

    // Kontrol edilecek alanları kontrol edin
    const newDoctor = new Doctor({
      firstName,
      lastName,
      phone,
      status: "pending",
    });

    //console.log(newDoctor)
    const userProp = await User.findById(userId);
    const spelizProp = await Specialization.findById(specializationId);
    // console.log(userProp)
    // console.log(spelizProp)

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


    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
    // Doctor.populate(specialization).execPopulate()
    // const user = await User.findOne({ id });
    // if (!user) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "User Not Found",
    //   });
    // }
    // const notification = user.notification;
    // notifcation.push({
    //   type: "apply-doctor-request",
    //   message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
    // });
    // await User.findByIdAndUpdate(user._id, { notification });
    // res.status(201).send({
    //   success: true,
    //   message: "Doctor Account Applied SUccessfully",
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctor",
    });
  }
};
// const applyDoctor = async (req, res) => {
//   try {
//     console.log(req.body)
//     const { userId, firstName, lastName } = req.body;

//     // Kontrol edilecek alanları kontrol edin
//     const newDoctor = await Doctor({ ...req.body, status: "pending" }); // admin onaylayacak
//     await newDoctor.save();
//     console.log(newDoctor);

//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User Not Found",
//       });
//     }

//     // Bildirim oluştur
//     const notification = user.notification;
//     notification.push({
//       type: "apply-doctor-request",
//       message: `${firstName} ${lastName} Has Applied For A Doctor Account`,
//     });

//     await User.findByIdAndUpdate(user._id, { notification });

//     res.status(201).send({
//       success: true,
//       message: "Doctor Account Applied Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error While Applying For Doctor",
//     });
//   }
// };


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
}
