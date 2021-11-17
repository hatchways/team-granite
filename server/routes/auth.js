const express = require("express");
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  validatePassword,
} = require("../validate");
const protect = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
  changePassword,
  loginDemoUser,
} = require("../controllers/auth");

router.route("/register").post(validateRegister, registerUser);

router.route("/login").post(validateLogin, loginUser);

router.route("/user").get(protect, loadUser);

router.route("/logout").get(logoutUser);

router.route("/demo").get(loginDemoUser);

router.route("/password").post(protect, validatePassword, changePassword);

module.exports = router;
