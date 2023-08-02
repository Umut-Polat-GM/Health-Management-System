const express = require('express')
const router = express.Router()

const {addSpesialization} = require('../controllers/AdminControllers.js')

router.post('/add-spesialization',  addSpesialization)

module.exports = router
