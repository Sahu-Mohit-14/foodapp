const categoryModel = require("../models/categoryModel");

// Create category 
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title"
      })
    }
    const newCategory = new categoryModel({
      title, imageUrl
    })
    await newCategory.save()
    res.status(200).send({
      success: true,
      message: "new category created successfully",
      newCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Cat Api",
      error,
    });
  }
}

//get all category
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found"
      })
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get all category Api",
      error,
    });
  }
}

//updatecatController
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params
    const { title, imageUrl } = req.body
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found"
      })
    }
    res.status(200).send({
      success:true,
      message:"updated category successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update cat Api",
      error,
    });
  }
}
//deleted controller
const deletedCatController = async(req,res)=>{
  try {
    const {id} = req.params
if(!id){
  return res.status(500).send({
    success:false,
    message:"Please provide category Id"
  })
}
const category = await categoryModel.findById(id)
if(!category){
  return res.status(500).send({
    success:false,
    message:"No category found with this id"
  })
}
await categoryModel.findByIdAndDelete(id)
res.status(200).send({
  success:true,
  message:"deleted category successfully",
})
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In delet cat api",
      error,
    });
  }
}

module.exports = { createCatController, getAllCategory, updateCatController,deletedCatController }