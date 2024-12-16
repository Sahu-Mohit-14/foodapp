// REGISTER
const userModel = require('../models/usermodel.js')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address,answer } = req.body
    //validation
    if (!username || !email || !password || !address ||
      !phone ||!answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields"
      })

    }
    //check user 
    const existing = await userModel.findOne({ email })
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already registered please login"
      })
    }

    //hasing password
    var salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, 10)


    //create new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    })
    res.status(201).send({
      success: true,
      message: "Successfully Registerd",
      user,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send("Error in register Api", error)
  }
}

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Error in login Api"
      })
    }
    //check user
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not Found"
      })
    }

    //check user password |compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials"
      })
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error
    })
  }
}


module.exports = { registerController, loginController }