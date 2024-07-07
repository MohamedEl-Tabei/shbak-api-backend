const bcrypt = require("bcrypt");
const Model = require("../models");
const Err = require("../error");
const validator = require("../validator");
const preSignup = async (req, res, nxt) => {
  try {
    //∞
    let error = { message: "" };
    const payload = req.body;
    const verifyEmail = await Model.VerifyEmail.findOne({
      email: payload.email.toLowerCase(),
    });
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////validation//////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    const isValid = await bcrypt.compare(payload.code, await verifyEmail.code);
    if (!isValid) throw new Error("Invalid Code");
    validator.password(payload.password, error);
    error.message =
      isNaN(payload.phoneNumber) || payload.phoneNumber.length !== 11
        ? error.message.concat("Invalid phone number")
        : error.message;
    if (error.message.length) throw new Error(error.message);
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////Data Handle/////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(payload.password, salt);
    req.time=payload.rememberMe?"12 days":"1h"
    req.data = {
      password: await hashPassword,
      fName: payload.fName,
      lName: payload.lName,
      email: payload.email.toLowerCase(),
      dateOfBirth: payload.dateOfBirth,
      phoneNumber: payload.phoneNumber,
      userAgent:[req.headers["user-agent"]]
    };
    nxt();
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
module.exports = preSignup;
