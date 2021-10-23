const { User } = require('../models')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

exports.singOut = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'SignOut Success.', status: 200 })
}

exports.signUp = (req, res) => {
  const { name, email, password, accountType } = req.body
  const user = User.create(
    {
      name,
      email,
      password,
      account: {
        account_no: new Date().getTime(),
        account_type: accountType,
        balance: 100.0,
      },
    },
    {
      include: 'account',
    }
  )
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  res.clearCookie('token')
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: false,
    maxAge: 36000000,
    expires: new Date(Date.now() + 36000000) * 1000,
    domain: undefined,
  })
  res.json({
    message: 'Account Created!.',
    user,
    status: 200,
  })
}

exports.signIn = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    include: 'account',
  })
  if (user === null) {
    return res.json({ error: 'User Not Found!', status: 400 })
  }
  if (!user.authenticate(req.body.password)) {
    return res.json({
      status: 401,
      error: "Email and Password doesn't match",
    })
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  res.clearCookie('token')
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: false,
    maxAge: 36000000,
    expires: new Date(Date.now() + 36000000) * 1000,
    domain: undefined,
  })
  return res.json({ token, user, status: 200 })
}

exports.requestSignIn = expressJWT({
  algorithms: ['sha1', 'RS256', 'HS256'],
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  getToken: (req) => req.cookies.token,
})

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile.id === req.auth.id
  if (!user) {
    return res.json({
      status: 403,
      error: 'Access Denied!',
    })
  }
  next()
}
