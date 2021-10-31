const User = require("../models/User");
const Image = require("../models/Image");
const asyncHandler = require("express-async-handler");

// @route GET /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

// @route POST /users
// @desc Update users
// @access Private
exports.getProfilePhoto = asyncHandler(async (req, res, next) => {
  const profilePhoto = await Image.findById(req.user.profilePhoto);
  if (!profilePhoto) {
    res.status(200).json({ imageSource: profilePhoto.url });
  } else {
    res.status(404).json({ error: "Profile photo not found." });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { newUsername, newEmail, newPassword } = req.body;
});
