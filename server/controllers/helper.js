const User = require("../models/User");

exports.checkUserExists = async (email, username) => {
  if (email) {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      throw new Error("A user with that email already exists");
    }
  }

  if (username) {
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      throw new Error("A user with that username already exists");
    }
  }
};
