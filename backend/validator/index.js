exports.userSignUpValidator = (req, res, next) => {
  req.check('name', 'Name is required.').notEmpty()
  req.check('email', 'Email is required.').notEmpty()
  req.check('password', 'Password is required.').notEmpty()
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
  const errors = req.validationErrors()
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  next()
}
