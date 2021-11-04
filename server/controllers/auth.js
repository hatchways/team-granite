const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    res.status(400)
    throw new Error('A user with that email already exists')
  }

  const usernameExists = await User.findOne({ username })

  if (usernameExists) {
    res.status(400)
    throw new Error('A user with that username already exists')
  }

  const user = await User.create({
    username,
    email,
    password,
  })

  if (user) {
    const token = generateToken(user._id)
    const secondsInWeek = 604800

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    })

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)
    const secondsInWeek = 604800

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    })

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

exports.loadUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('Not authorized')
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
  })
})

exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token')

  res.json({ success: true, message: 'You have successfully logged out' })
})
