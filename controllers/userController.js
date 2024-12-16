// get user info
const { JsonWebTokenError } = require('jsonwebtoken')
const userModel = require('../models/usermodel.js')
const bcrypt = require('bcrypt')
const getuserController = async function (req, res) {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id })

    //validation
    if (!user) res.status(404).send({
      success: false,
      message: "User Not found"
    })
    //hide password 
    user.password = undefined;

    //resp
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User Api",
      error,
    })
  }
}

//UPDATE USER
const updateUserController = async (req, res) => {
  try {
    //find User 
    const user = await userModel.findById({ _id: req.body.id })
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found"
      })
    }
    //update
    const { username, address, phone } = req.body
    if (username) user.username = username
    if (address) user.address = address
    if (phone) user.phone = phone

    //Save user 
    await user.save()
    res.status(200).send({
      success: true,
      message: "User updated Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error
    })
  }
}

//updated password
const updatedPasswordController = async (req, res) => {
  try {
    //find User 
    const user = await userModel.findById({ _id: req.body.id })
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found"
      })
    }
    //get data from user
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please provide old or new password"
      })
    }

    //check user password |compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password"
      })
    }
    //hasing password
    // user.password=newPassword
    var salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()
    res.status(200).send({
      success: true,
      message: 'Error in Password Update Api',
      error,
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Passsword Update Api",

    })
  }
}

//Reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields"
      })
    }
    const user = await userModel.findOne({ email, answer })
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid answer"
      })
    }
    //hashing password
    var salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()
    res.status(200).send({
      success: true,
      message: "Password Reset successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Passsword APi",
      error
    })
  }
}

//DELETE PROFILE
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success: true,
      message: "your account has been deleted"
    })
  }catch (error) {
  {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Profile APi",
      error
    })
  }
}
}

module.exports = { getuserController, updateUserController, updatedPasswordController, resetPasswordController, deleteProfileController };