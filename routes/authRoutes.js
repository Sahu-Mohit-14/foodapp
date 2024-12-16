const express = require('express')
const router = express.Router()
const {loginController,registerController}=require('../controllers/authController.js')

//routes
//Register || post
router.post("/register",registerController)

// LOGIN
router.post("/login",loginController)

module.exports = router