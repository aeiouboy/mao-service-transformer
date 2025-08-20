'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'payment_methods';

    try {
      await queryInterface.createTable(
        tableName,
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          payment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Reference to payment record',
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Reference to parent order',
          },
          // Payment method identification
          payment_method_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique payment method identifier',
          },
          gateway_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Payment gateway identifier',
          },
          // Amount and currency
          amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            defaultValue: 0,
            comment: 'Payment method amount',
          },
          currency_code: {
            type: Sequelize.STRING(3),
            allowNull: true,
            comment: 'ISO currency code',
          },
          current_settled_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            defaultValue: 0,
            comment: 'Currently settled amount',
          },
          // Payment method flags
          is_copied: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether payment method was copied',
          },
          is_modifiable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Whether payment method can be modified',
          },
          is_suspended: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether payment method is suspended',
          },
          is_voided: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether payment method is voided',
          },
          // Complex data stored as JSONB
          payment_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment type configuration and details',
          },
          billing_address: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Billing address information',
          },
          // Standard audit fields
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          created_by: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          updated_by: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
        },
        {
          schema: process.env.DATABASE_SCHEMA,
          transaction,
        },
      );

      // Add indexes for performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_method_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['gateway_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_suspended'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_voided'],
        { using: 'BTREE', transaction },
      );

      // Add GIN indexes for JSONB fields
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_type'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['billing_address'],
        { using: 'GIN', transaction },
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
      await queryInterface.dropTable(
        { tableName: 'payment_methods', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
