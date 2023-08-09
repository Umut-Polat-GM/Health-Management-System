const express = require('express')
const router = express.Router()
const {registerUser, loginUser, applyDoctor,verifyEmail} = require('../controllers/authControllers.js')
const { protect } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/apply-doctor',protect, applyDoctor)
router.post('/verify-email', verifyEmail)
//router.get('/me', protect, getMe)

module.exports = router
