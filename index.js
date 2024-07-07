require("dotenv").config()
const Mongoose  = require("mongoose");
const app=require("./app")

const port=process.env.PORT;
app.listen(port,()=>console.log(`run on ${port}`))
Mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{console.log("Database connected")})