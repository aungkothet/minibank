'use strict'
const crypto = require('crypto')

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Account }) {
      this.hasOne(Account, { foreignKey: 'user_id', as: 'account' })
    }
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      }
    }
    authenticate(plainPwd) {
      return (
        crypto.createHmac('sha1', this.email).update(plainPwd).digest('hex') ===
        this.password
      )
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue(
            'password',
            crypto.createHmac('sha1', this.email).update(value).digest('hex')
          )
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      tableName: 'users',
      underscored: true,
    }
  )
  return User
}
