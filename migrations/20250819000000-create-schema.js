'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create database schema if it doesn't exist
      await queryInterface.sequelize.query(
        `CREATE SCHEMA IF NOT EXISTS ${process.env.DATABASE_SCHEMA};`,
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Drop schema and all its contents (CASCADE)
      await queryInterface.sequelize.query(
        `DROP SCHEMA IF EXISTS ${process.env.DATABASE_SCHEMA} CASCADE;`,
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
