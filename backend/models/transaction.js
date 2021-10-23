'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({ Account }) {
      this.belongsTo(Account, { foreignKey: 'from_account', as: 'fromAccount' })
      this.belongsTo(Account, { foreignKey: 'to_account', as: 'toAccount' })
    }
    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
      }
    }
  }
  Transaction.init(
    {
      from_account: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      to_account: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE(9, 2),
        allowNull: false,
      },
      fees: {
        type: DataTypes.DOUBLE(9, 2),
        default: 0.0,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        default: 1, // 1 for normal transfer( with delay) 2 for special transfer(with cost 5%)
      },
      status: {
        type: DataTypes.INTEGER,
        default: 1, // 1 for pending, 2 for success, 3 for rejected
      },
      remark: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      timestamps: true,
      tableName: 'transactions',
      underscored: true,
    }
  )
  return Transaction
}
