const express = require('express')
const router = express.Router()

const {addSpesialization,getAllDoctors,updateUserToDoctor} = require('../controllers/AdminControllers.js')

router.post('/add-spesialization',  addSpesialization)
router.post('/getAllDoctors',  getAllDoctors)
router.post('/updateUserToDoctor',  updateUserToDoctor)

module.exports = router
