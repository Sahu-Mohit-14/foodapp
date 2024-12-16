const express = require('express')
const app = express()
const cors = require('cors')
// const morgan = require('morgan')
const dotenv = require('dotenv')
const  connectDB = require('./config/db.js')
const userModel = require("./models/usermodel.js")

dotenv.config()

//DB connection
connectDB()

//middlewares
app.use(cors())
app.use(express.json())
// app.use(morgan())

//route
app.use('/api/v1/test', require("./routes/testRoutes.js"))
app.use('/api/v1/auth', require("./routes/authRoutes.js")) 
app.use('/api/v1/user', require("./routes/userRoutes.js")) 
app.use('/api/v1/restaurant', require("./routes/resturantRoutes.js")) 
app.use('/api/v1/category', require("./routes/categoryRoutes.js")) 
app.use('/api/v1/food', require("./routes/foodRoutes.js")) 


//route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the food server app")
})

const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  })