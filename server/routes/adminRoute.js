const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const {addSpesialization,getAllDoctors,updateUserToDoctor} = require('../controllers/AdminControllers.js')

router.post('/add-spesialization',  addSpesialization)
router.post('/getAllDoctors', protect, getAllDoctors)
router.post('/updateUserToDoctor',  updateUserToDoctor)

module.exports = router
