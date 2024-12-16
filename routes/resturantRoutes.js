const express = require('express')
const authmiddleware = require('../middlewares/authmiddleware.js')
const {createResturantController, getAllResturantController, getResturantByIdController, deleleteResturantController} = require('../controllers/resturantController.js')

const router = express.Router()


//routes
//CREATE PASSWORD || POST
router.post('/create',authmiddleware,createResturantController)

// GET All Resutrants || Get
router.get("/getAll",getAllResturantController)

//Get RESTURANT BY ID || GET
router.get("/getByResturant/:id",getResturantByIdController)


// Delete Restaurant || Delete

router.delete("/delete/:id", authmiddleware,deleleteResturantController)

module.exports = router