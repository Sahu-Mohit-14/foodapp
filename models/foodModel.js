const mongoose = require('mongoose');

// resturant Schema
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'food title is required']
  },
  description: {
    type: String,
    required: [true, 'food description is required']
  },
  price: {
    type: Number,
    required: [true, "food price is required"]
  },
  imageUrl: {
    type: String,
    default: "https://tse4.mm.bing.net/th?id=OIP.ZVyz3jQWFVZq3ScHCO9jwQHaHa&pid=Api&P=0&h=220"
  },
  foodTags: {
    type: String,
  },
  category: {
    type: String,
  },
  code: {
    type: String,
  },
  isAvailabe: {
    type: Boolean,
    default: true
  },
  resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resturant"
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  ratingCount: {
    type: String
  },
},
  { timestamps: true }
)



// Export the model
const Foods = mongoose.model('Foods', categorySchema);
module.exports = Foods;
