const resturantModel = require("../models/resturantModel.js");

const createResturantController = async (req, res) => {
  try {
    const { title, imageUrl, foods, time, pickup, delivery, logUrl, rating, ratingCount, code, coords } = req.body

    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address"
      })
    }
    const newResturant = new resturantModel({
      title, imageUrl, foods, time, pickup, delivery, logUrl, rating, ratingCount, code, coords
    })
    await newResturant.save()

    res.status(201).send({
      success: true,
      message: "New User Created Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Resturant api",
      error
    })
  }
}
//GET ALL RESTURANT
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({})
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available"
      })
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all Resturant API ",
      error
    })
  }
}

//resturant by id

const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
};

// DELETE resturant
const deleleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "no Resturant found or Provide Resturant Id",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId)
    res.status(200).send({
      success: true,
      message: "resturant deleted Sucessfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In delete Resturarnt api",
      error,
    });
  }
}

module.exports = { createResturantController, getAllResturantController, getResturantByIdController, deleleteResturantController }