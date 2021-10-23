'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          account_no: 1634744215439,
          account_type: 2,
          user_id: 1,
          balance: 100,
          created_at: '2021-10-20 15:36:58.00',
          updated_at: '2021-10-20 15:54:49.00',
        },
        {
          account_no: 1634744216439,
          account_type: 1,
          user_id: 2,
          balance: 100,
          created_at: '2021-10-20 15:36:58.00',
          updated_at: '2021-10-20 15:54:49.00',
        },
        {
          account_no: 1634744217439,
          account_type: 2,
          user_id: 3,
          balance: 100,
          created_at: '2021-10-20 15:36:58.00',
          updated_at: '2021-10-20 15:54:49.00',
        },
        {
          account_no: 1634744218439,
          account_type: 1,
          user_id: 4,
          balance: 100,
          created_at: '2021-10-20 15:36:58.00',
          updated_at: '2021-10-20 15:54:49.00',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('accounts', null, {})
  },
}
