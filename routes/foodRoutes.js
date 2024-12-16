const express = require('express')
const authmiddleware = require('../middlewares/authmiddleware.js')
const { createFoodController, getAllFoodsController, singleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController.js')
const adminmiddleware = require('../middlewares/adminmiddleware.js')


const router = express.Router()

//routes
//create food || post
router.post("/create", authmiddleware, createFoodController)

// get all food || get
router.get("/getAll",getAllFoodsController)

//get single foods by id || get
router.get("/get/:id",singleFoodController)

//get single foods by id || get
router.get("/getByResturant/:id",getFoodByResturantController)

//update foods 
router.put("/update/:id",authmiddleware,updateFoodController)

//delete foods
router.delete("/delete/:id",authmiddleware,deleteFoodController)

//PLACE ORDER
router.post("/placeorder",authmiddleware,placeOrderController)

//ORDER STATUS 
router.post("/orderStatus/:id",authmiddleware,adminmiddleware,orderStatusController)

module.exports = router