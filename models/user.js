const Mongoose = require("mongoose");
const Schema = new Mongoose.Schema({
  fName: {
    type: String,
    required: "Enter first name",
    trim: true,
    minlength: 3,    
    maxlength: 20 
  },
  lName: {
    type: String,
    required: "Enter last name",
    trim: true,
    minlength: 3,   
    maxlength: 20 
  },
  email:{
    type: String,
    required: "Enter Email",
    unique:true,
    trim: true,
  },
  password:{
    type: String,
    required: "Enter Password",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    required: "Enter phone number",
    unique:true,
    minlength: 11,
    maxlength: 11
  },
  dateOfBirth: {
    type: Date,
    required: "Enter birthday",
  },
  userAgent:[String]

});

module.exports = Mongoose.model("user", Schema);
