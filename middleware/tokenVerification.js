const Err = require("../error");
const jwt = require("jsonwebtoken");
const tokenVerification = async (req, res, nxt) => {
  try {
    let verify= await jwt.verify(
      req.headers["x-auth-token"],
      process.env.SECRETKEY
    );
    req.id=verify.id
    nxt();
  } catch (error) {
    res.status(400).json(Err.getErrorMessage(error));
  }
};
module.exports = tokenVerification;
