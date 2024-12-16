const express = require('express')
const authmiddleware = require('../middlewares/authmiddleware.js')
const {createCatController,getAllCategory, updateCatController, deletedCatController} = require('../controllers/categoryController.js')

const router = express.Router()


//routes
//CREATE cateory || POST
router.post('/create',authmiddleware,createCatController)

//GET ALL Cat
router.get("/getAll",getAllCategory)

//Update Cat
router.put('/update/:id',authmiddleware,updateCatController)

//Delete Cat
router.delete('/delete/:id',authmiddleware,deletedCatController)

module.exports = router