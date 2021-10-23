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
      'users',
      [
        {
          name: 'Aye Ko',
          email: 'ayek0@gmail.com',
          password: 'fec426739b227df4781636537de2584404a1f2a3',
          updated_at: '2021-10-17 07:26:24.36',
          created_at: '2021-10-17 07:26:24.36',
        },
        {
          name: 'Aye Ko2',
          email: 'ayek02@gmail.com',
          password: '8d89eaead9713e2114c7d13925b2210b24ad1e9b',
          updated_at: '2021-10-17 07:26:24.36',
          created_at: '2021-10-17 07:26:24.36',
        },
        {
          name: 'Aye Ko3',
          email: 'ayek03@gmail.com',
          password: 'ae92c4c1f4786c6680b91c0861bf6fb11fc01997',
          updated_at: '2021-10-17 07:26:24.36',
          created_at: '2021-10-17 07:26:24.36',
        },
        {
          name: 'Aye Ko4',
          email: 'ayek04@gmail.com',
          password: '9fc99a41eb3ab0ec007903d87912550a356858c8',
          updated_at: '2021-10-17 07:26:24.36',
          created_at: '2021-10-17 07:26:24.36',
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
    await queryInterface.bulkDelete('users', null, {})
  },
}
