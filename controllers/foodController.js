const foodModel = require("../models/foodModel.js");
const orderModel = require("../models/orderModel.js")

const createFoodController = async (req, res) => {
  try {
    const { title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount
    } = req.body

    //validation
    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: "false",
        message: "Please Provide all fields"
      })
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount
    })
    await newFood.save()
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In create food api",
      error,
    });
  }
}
//Get all fooods
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({})
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items was found"
      })
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Get All Foods Api"
    })
  }
}

//get single food 
const singleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id"
      })
    }
    const food = await foodModel.findById(foodId)
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id"
      })
    }
    res.status(200).send({
      success: true,
      food
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Get single food APi"
    })
  }
}

// GET FOOD BY RESTURANT
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.find({ resturnat: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restuatrn",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

//Update food item 
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "No Food id was found",
      });
    }
    const food = await foodModel.findById(foodID)
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found ",
      });
    }
    const { title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount } = req.body
    const updatedFood = await foodModel.findByIdAndUpdate(foodID, {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabe,
      resturant,
      rating,
      ratingCount
    }, { new: true })
    res.status(200).send({
      success: true,
      message: "food items updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update Food API",
      error,
    });
  }
}
//Delete food controller
const deleteFoodController = async (req, res) => {
  try {
    const foodID = req.params.id
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "Provide food id",
      });
    }
    const food = await foodModel.findById(foodID)
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id ",
      });
    }
    await foodModel.findByIdAndDelete(foodID)
    res.status(200).send({
      success: true,
      message: "food item deleted",
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food api ",
      error,
    });
  }
}

//Place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body
    if (!cart ) {
      return res.status(500).send({
        success: false,
        message: "please fodd cart or payment method",
      });
    }
    let total = 0
    // cal
    cart.map((i) => {
      total += i.price;
    })

    const newOrder = new orderModel({
      foods: cart,
      payment:total,
      buyer: req.body.id
    })
    await newOrder.save()
    res.status(201).send({
      success: true,
      message: "order placed successfully",
      newOrder
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place order api ",
      error,
    });
  }
}

//Change order status
const orderStatusController = async(req,res)=>{
  try {
    const orderId = req.params.id
    if(!orderId){
      return res.status(404).send({
        success:false,
        message:"please provide valid order id"
      })
    }   
     const {status} = req.body
    const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
    res.status(200).send({
      success:true,
      message:"Order status Update",
      order
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order status Api ",
      error,
    });
  }
}

module.exports = { createFoodController, getAllFoodsController, singleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController,orderStatusController }