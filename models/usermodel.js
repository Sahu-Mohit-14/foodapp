const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    address: {
      type: Array,

    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    usertype:{
      type:String,
      // required: [true, 'usertype is required'],
    },
    profile:{
      type:String,
      default:"https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=220"
    }, 
    answer:{
      type:String,
      required:[true,'Answer is required']
    }
  },
  {
    timestamps: true, 
  }
);

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
