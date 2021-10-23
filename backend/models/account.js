'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate({ User, Transaction }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
      this.hasMany(Transaction, { foreignKey: 'from_account', as: 'fromAccount' })
      this.hasMany(Transaction, { foreignKey: 'to_account', as: 'toAccount' })
    }
  }
  Account.init(
    {
      account_no: {
        type: DataTypes.BIGINT(14),
        allowNull: false,
        unique: true,
      },
      account_type: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE(9, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Account',
      timestamps: true,
      tableName: 'accounts',
      underscored: true,
    }
  )
  return Account
}
