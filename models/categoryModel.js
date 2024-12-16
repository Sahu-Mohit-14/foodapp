const mongoose = require('mongoose');

// resturant Schema
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "category title is required"]
  },
  imageUrl: {
    type: String,
    default: "https://tse4.mm.bing.net/th?id=OIP.ZVyz3jQWFVZq3ScHCO9jwQHaHa&pid=Api&P=0&h=220"
  },
}, { timestamps: true }
)



// Export the model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
