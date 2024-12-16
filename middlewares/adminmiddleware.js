const userModel = require('../models/usermodel.js');

module.exports = async (req, res, next) => {
  try {
    // Check if `id` is provided in the request
    if (!req.body.id) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    // Find the user by ID
    const user = await userModel.findById(req.body.id);

    // If user is not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user is an admin
    if (user.usertype !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    // Proceed to the next middleware if checks pass
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(500).send({
      success: false,
      message: "Unauthorized access",
      error: error.message,
    });
  }
};
