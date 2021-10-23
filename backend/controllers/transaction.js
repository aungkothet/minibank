const { Transaction, Account } = require('../models')
const { Op } = require('sequelize')

exports.makeTransfer = async (req, res) => {
  const { fromAccount, toAccount, amount, type } = req.body
  if (fromAccount === toAccount) {
    res.status(400).json({
      error: 'You can not transfer to your own account.',
    })
  }
  let fees = 0.0
  if (type == 2) {
    fees = amount * 0.05
    fees = Number(fees.toFixed(2))
  }
  let total = amount + fees
  const receiveAccount = await Account.findOne({
    where: {
      account_no: toAccount,
    },
  })
  if (receiveAccount === null) {
    res.status(400).json({
      error: 'Invalid Receive Account !!.',
    })
  }
  const transaction = await Transaction.create({
    from_account: fromAccount,
    to_account: receiveAccount.id,
    amount: amount,
    fees,
    type,
    status: 1,
    remark: '',
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
  })
  const fromAcc = await transaction.getFromAccount()

  if (fromAcc.balance < total) {
    transaction.status = 3
    transaction.remark = 'Insufficient Balance'
    transaction.save()
    res.status(400).json({
      error: 'Insufficient Balance',
    })
  } else {
    fromAcc.balance -= total
    fromAcc.save()
    if (type == 2) {
      receiveAccount.balance += amount
      receiveAccount.save()
      transaction.status = 2
      transaction.save()
    }
    
    await transaction.reload({
      include: [
        { model: Account, as: 'fromAccount', attributes: ['account_no'] },
        { model: Account, as: 'toAccount', attributes: ['account_no'] },
      ],
    })
    global.io.emit('transactions', { transaction })
    res.json({
      transaction,
    })
  }
}

exports.getAllTransactions = async (req, res, next, id) => {
  const transactions = await Transaction.findAll({
    where: {
      [Op.or]: [{ from_account: id }, { to_account: id }],
    },
    include: [
      { model: Account, as: 'fromAccount', attributes: ['account_no'] },
      { model: Account, as: 'toAccount', attributes: ['account_no'] },
    ],
  })
  if (transactions === null) {
    res.status(400).json({
      error: 'No Transactions for this account',
    })
  } else {
    req.transaction = transactions
    next()
  }
}
