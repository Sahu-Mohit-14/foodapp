const mongoose = require('mongoose');

const connectDB=async()=>{
try {
  await mongoose.connect(process.env.MONGODB_URL)
  console.log(`connected to Database,${mongoose.connection.host}`,);
  
} catch (error) {
  console.log(error);
}
}

module.exports = connectDB;
