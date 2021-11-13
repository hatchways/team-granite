const User = require("../models/User");
const { checkUserExists } = require("./helper.js");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await checkUserExists(email, username);
  } catch (error) {
    res.status(422);
    throw error;
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.loadUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
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

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.send("You have successfully logged out");
});

// @route POST /auth/password
// @desc Change password
// @access Protected
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (await user.matchPassword(oldPassword)) {
    user.password = newPassword;
    user.save();
  } else {
    res.status(400);
    throw new Error("Invalid Password.");
  }

  res.status(200).json({
    success: "Password changed.",
  });
});
