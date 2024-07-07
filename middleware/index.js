const preSignup = require("./preSignup");
const tokenVerification = require("./tokenVerification");
const Middleware = {
  preSignup,
  tokenVerification,
};

module.exports = Middleware;
