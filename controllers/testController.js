const testUserController =(req,res)=>{
try {
  res.status(200).send('<h1>test user data</h1>')
} catch (error) {
  console.log("error in test Api",error);
}
}

module.exports = testUserController