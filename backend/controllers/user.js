const { User } = require('../models')

exports.findUserById = async (req, res, next, id) => {
  const user = await User.findByPk(id, {
    include: 'account',
  })
  if (user === null) {
    res.status(400).json({
      error: 'User Not Found!',
    })
  } else {
    req.profile = user
    next()
  }
}
