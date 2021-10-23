const express = require('express')
const router = express.Router()
const {
  signUp,
  signIn,
  singOut,
  requestSignIn,
} = require('../controllers/auth')
const { userSignUpValidator } = require('../validator')

router.post('/register', userSignUpValidator, signUp)
router.post('/login', signIn)
router.get('/logout', singOut)

module.exports = router
