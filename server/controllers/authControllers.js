const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')//try cache gerek kalmaz
const User = require('../models/userModel.js')
const Doctor = require('../models/userModel.js')

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
      _id: user.id,
      name: user.name,
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
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isDoctor: user.isDoctor,//
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})
//doktor başvuru 
const applyDoctor = async (req, res) => {
  try {
    userId = req.body.userId;
    const newDoctor = await Doctor({ ...req.body, status: "pending" });//admin onaylayacak
    await newDoctor.save();
    const user = await User.findOne({ userId });
    const notification = user.notification;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
     
    });
    await User.findByIdAndUpdate(user._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

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
