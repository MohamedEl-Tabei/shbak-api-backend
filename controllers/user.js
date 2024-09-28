const Models = require("../models");
const Validator = require("../validator");
let Package = {
  bcrypt: require("bcrypt"),
  nodemailer: require("nodemailer"),
  jwt: require("jsonwebtoken"),
};
let Err = require("../error");
const signup = async (req, res) => {
  try {
    const data = req.data;
    const user = await Models.User(data);
    await user.save();
    token = await Package.jwt.sign({ id: user._id }, process.env.SECRETKEY, {
      expiresIn: req.time,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const logIn = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let time = req.body.rememberMe ? "12 days" : "1h";
    let user = await Models.User.findOne({ email });
    if (user && (await Package.bcrypt.compare(password, user.password))) {
      if (!user.userAgent.includes(req.headers["user-agent"])) {
        user.userAgent.push(req.headers["user-agent"]);
        await user.save();
      }
      let token = await Package.jwt.sign(
        { id: user.id },
        process.env.SECRETKEY,
        {
          expiresIn: time,
        }
      );
      res.status(200).json({ token, ...user._doc, password: undefined });
    } else throw new Error(`Invalid email or password`);
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const sendCode = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    let code = Math.random().toString().slice(3, 6);
    const transporter = Package.nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // send mail with defined transport object
    await transporter.sendMail({
      from: {
        name: "Shbak Cinema",
        address: process.env.EMAIL,
      }, // sender address
      to: email, // list of receivers
      subject: "Verify Email", // Subject line
      text: code, // plain text body
      html: `
      <div style="width:100%;">
        <img style="height:30px" src="https://i.ibb.co/ZNjd3c1/Capture.png"/>
        <div style="background-color:white;width:125px;display:flex;font-size:1.5rem">
          <div style=" font-weight:bold;margin:auto">${code}</div>
        </div>
        <img style="height:30px" src="https://i.ibb.co/ZNjd3c1/Capture.png"/>
      </div>`, // html body
    });
    let salt = await Package.bcrypt.genSalt(10);
    let hashCode = await Package.bcrypt.hash(code, salt);
    let data = await Models.VerifyEmail.findOne({ email });
    if (data) {
      await data.updateOne({ code: hashCode });
    } else {
      data = new Models.VerifyEmail({ code: hashCode, email });
    }
    await data.save();
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const deleteUser = async (req, res) => {
  try {
    await Models.User.findByIdAndDelete(req.id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const emailIsUnique = async (req, res) => {
  try {
    const user = await Models.User.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (user) throw new Error(`"${req.body.email}" has an account.`);
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const phoneIsUnique = async (req, res) => {
  try {
    const user = await Models.User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (user) throw new Error(`"${req.body.phoneNumber}" is used.`);
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const dataValidation = async (req, res) => {
  try {
    const data = req.body;
    let err = { message: "" };
    data.email = data.email.toLowerCase();
    await Models.User.validate(data);
    Validator.password(data.password, err);
    if (err.message.length) throw new Error(err.message);

    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
const controller = {
  signup,
  sendCode,
  dataValidation,
  emailIsUnique,
  deleteUser,
  phoneIsUnique,
  logIn,
};
module.exports = controller;
