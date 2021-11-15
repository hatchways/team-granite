const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  updateUser,
  getProfilePhoto,
} = require("../controllers/user");
const { validateUpdate } = require("../validate");

router.route("/").get(protect, searchUsers);

router.route("/").post(protect, validateUpdate, updateUser);

router.route("/profile-photo").get(protect, getProfilePhoto);

module.exports = router;
