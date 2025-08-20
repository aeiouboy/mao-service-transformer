'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'payment_transactions';

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
          payment_method_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Reference to payment method',
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Reference to parent order',
          },
          // Transaction identification
          payment_transaction_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique payment transaction identifier',
          },
          reconciliation_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reconciliation identifier',
          },
          request_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Payment request identifier',
          },
          request_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Payment request token',
          },
          // Transaction flags
          is_activation: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether this is an activation transaction',
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Whether transaction is currently active',
          },
          is_copied: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether transaction was copied',
          },
          is_valid_for_refund: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Whether transaction is valid for refund',
          },
          // Amount and timing
          processed_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            defaultValue: 0,
            comment: 'Amount that was processed',
          },
          requested_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            defaultValue: 0,
            comment: 'Amount that was requested',
          },
          transaction_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'When the transaction occurred',
          },
          // Complex status data stored as JSONB
          payment_response_status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment gateway response status',
          },
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Transaction status information',
          },
          transmission_status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Transmission status to payment gateway',
          },
          transaction_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Transaction type configuration',
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
        ['payment_method_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_transaction_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['reconciliation_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['request_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_active'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_valid_for_refund'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['transaction_date'],
        { using: 'BTREE', transaction },
      );

      // Add GIN indexes for JSONB fields
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_response_status'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['transaction_type'],
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
        {
          tableName: 'payment_transactions',
          schema: process.env.DATABASE_SCHEMA,
        },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
