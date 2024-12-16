const mongoose = require('mongoose');

// resturant Schema
const ordersSchema = new mongoose.Schema({
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Foods"
  }],
  payment: {},
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ['preparing', "prepare", "on the way", "delivered"],
    default: "preparing",
  }
},
  { timestamps: true }
)



// Export the model
const Order = mongoose.model('Order', ordersSchema);
module.exports = Order;
