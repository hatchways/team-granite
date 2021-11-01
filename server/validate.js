const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
  check("username", "Username too long").isLength({ max: 40 }),
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  check("password", "Password must be 6 to 100 charachters long.").isLength({
    max: 100,
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  check("password", "Password must be 6 to 100 charachters long.").isLength({
    max: 100,
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdate = [
  check("newUsername", "Please enter a username").not().isEmpty(),
  check("newEmail", "Please enter a valid email address").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validatePassword = [
  check("oldPassword", "Password is required").not().isEmpty(),
  check("oldPassword", "Password must be 6 to 100 charachters long.").isLength({
    max: 100,
    min: 6,
  }),
  check("newPassword", "Password is required").not().isEmpty(),
  check("newPassword", "Password must be 6 to 100 charachters long.").isLength({
    max: 100,
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
