const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.searchUsers = asyncHandler(async (req, res) => {
  const searchString = req.query.search

  let users
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: 'i' },
    })
  }

  if (!users) {
    res.status(404)
    throw new Error('No users found in search')
  }

  res.status(200).json({ users: users })
})
