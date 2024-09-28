const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const Middleware = require("../middleware");
router.route("/signup").post(Middleware.preSignup, Controllers.User.signup);
router.route("/logIn").post(Controllers.User.logIn);
router.route("/sendCode").post(Controllers.User.sendCode);
router.route("/dataValidation").post(Controllers.User.dataValidation);
router.route("/emailIsUnique").post(Controllers.User.emailIsUnique);
router.route("/phoneIsUnique").post(Controllers.User.phoneIsUnique);
router
  .route("/deleteUser")
  .delete(Middleware.tokenVerification, Controllers.User.deleteUser);
module.exports = router;
