const User = require("../models/User");

exports.checkUserExists = async (email, username, res) => {
  if (email) {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(400);
      throw new Error("A user with that email already exists");
    }
  }

  if (username) {
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      res.status(400);
      throw new Error("A user with that username already exists");
    }
  }
};
