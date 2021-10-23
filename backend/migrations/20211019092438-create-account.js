'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        allowNull:false,
      },
      balance: {
        type: DataTypes.DOUBLE(9, 2),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};