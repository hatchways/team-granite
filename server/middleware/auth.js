const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    let dbUserId = await User.findById(decoded.id)
    if (!dbUserId) {
      res.status(401).json({ success: false, message: "Account doesn't exist" })
    }
    req.user = decoded

    next()
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' })
  }
}

module.exports = protect
