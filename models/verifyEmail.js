const Mongoose=require("mongoose")
const Schema=new Mongoose.Schema({
    email:String,
    code:String
})

module.exports=Mongoose.model("VerifyEmail",Schema)