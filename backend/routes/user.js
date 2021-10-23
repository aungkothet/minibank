const express = require('express')
const { requestSignIn, isAuth } = require('../controllers/auth')
const router = express.Router()
const { findUserById } = require('../controllers/user')

router.get('/account/:userId', requestSignIn, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  })
})
router.param('userId', findUserById)

module.exports = router
