const User = require("../models/User");
const Image = require("../models/File");
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

  const update = {};

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not authorized");
  }

  if (user.username !== newUsername) {
    Object.assign(update, { username: newUsername });
  }

  if (user.email !== newEmail) {
    Object.assign(update, { email: newEmail });
  }

  if (Object.keys(update).length === 0) {
    res.status(400);
    throw new Error("Same Email and Username");
  }

  try {
    await checkUserExists(update.email, update.username);
  } catch (error) {
    res.status(400);
    throw error;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, update, {
    new: true,
  });

  res.status(200).json({
    success: {
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    },
  });
});
