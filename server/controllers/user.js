const User = require("../models/User");
const Image = require("../models/Image");
const asyncHandler = require("express-async-handler");
const { checkUserExists } = require("./helper.js");

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

// @route GET /image/profile
// @desc returns the profile photo of the user.
// @access Private
exports.getProfilePhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (user.profilePhoto) {
    res.status(200).json({ success: { imageURI: user.profilePhoto.url } });
  } else {
    res.status(404);
    throw new Error("Photo not found.");
  }
});

// @route POST /users
// @desc Update users
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { newUsername, newEmail } = req.body;

  await checkUserExists(newEmail, newUsername, res);

  const update = {};

  if (req.user.username !== newUsername) {
    Object.assign(update, { username: newUsername });
  }

  if (req.user.email !== newUsername) {
    Object.assign(update, { email: newEmail });
  }

  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });

  if (!user) {
    res.status(404).json({
      error: "User not found.",
    });
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
  });
});
