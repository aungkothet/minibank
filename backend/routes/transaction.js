const express = require('express')
const { requestSignIn } = require('../controllers/auth')
const router = express.Router()
const {
  makeTransfer,
  getAllTransactions,
} = require('../controllers/transaction')
router.post('/transfer', requestSignIn, makeTransfer)
router.get('/transactions/:accountId', requestSignIn, (req, res) => {
  res.json({
    transaction: req.transaction,
  })
})
router.param('accountId', getAllTransactions)

module.exports = router
