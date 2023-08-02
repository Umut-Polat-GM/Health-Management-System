const express = require('express')
const router = express.Router()
const {getAllNotification,deleteAllNotification, getAllSpecialization} = require('../controllers/userControllers.js')
const { protect } = require('../middlewares/authMiddleware')


router.post('/getAllNotification', protect, getAllNotification)
router.post('/deleteAllNotification', protect, deleteAllNotification)
router.get('/getAllSpecialization', getAllSpecialization)


//router.get('/me', protect, getMe)

module.exports = router
