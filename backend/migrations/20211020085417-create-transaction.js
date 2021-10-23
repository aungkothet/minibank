'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions')
  },
}
