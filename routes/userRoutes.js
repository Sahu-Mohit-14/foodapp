const express = require('express')
const {getuserController,updateUserController, updatedPasswordController, resetPasswordController, deleteProfileController} = require('../controllers/userController')
const authmiddleware = require('../middlewares/authmiddleware')

const router = express.Router()


//routes
router.get('/getUser', authmiddleware, getuserController)

//Update profile
router.put('/updateUser', authmiddleware,updateUserController )
 
//password update
router.post('/updatePassword', authmiddleware,updatedPasswordController )
 
//RESET PASSWORD
router.post('/resetPassword',authmiddleware,resetPasswordController)

//delete User 
router.delete('/deleteUser/:id',authmiddleware,deleteProfileController)
module.exports = router