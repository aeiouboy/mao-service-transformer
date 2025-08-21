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
          // Primary Key
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },

          // Business Identifiers (with indexes)
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Order identifier',
          },
          payment_method_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Payment method identifier',
          },
          payment_transaction_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            comment: 'Payment transaction identifier (unique)',
          },

          // Boolean Flags
          is_activation: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is activation flag',
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is active flag',
          },
          is_copied: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is copied flag',
          },
          is_valid_for_refund: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is valid for refund flag',
          },

          // Request Information
          reconciliation_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reconciliation ID',
          },
          request_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Request ID',
          },
          request_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Request token',
          },

          // Financial Fields (DECIMAL 18,4)
          processed_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Processed amount',
          },
          requested_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Requested amount',
          },

          // Transaction Date
          transaction_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Transaction date',
          },

          // JSONB Fields
          payment_response_status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment response status in JSON format',
          },
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Status in JSON format',
          },
          transmission_status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Transmission status in JSON format',
          },
          transaction_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Transaction type in JSON format',
          },

          // Standard Audit Fields
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Record creation timestamp',
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Record last update timestamp',
          },
          created_by: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'User who created the record',
          },
          updated_by: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'User who last updated the record',
          },
        },
        {
          schema: process.env.DATABASE_SCHEMA,
          transaction,
        },
      );

      // Create indexes based on PlantUML diagram annotations

      // Order identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_payment_transactions_order_id',
          transaction,
        },
      );

      // Payment method identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_method_id'],
        {
          name: 'idx_payment_transactions_payment_method_id',
          transaction,
        },
      );

      // Payment transaction identifier unique index - from <<UNIQUE>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_transaction_id'],
        {
          name: 'idx_payment_transactions_payment_transaction_id',
          unique: true,
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Request ID queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['request_id'],
        {
          name: 'idx_payment_transactions_request_id',
          using: 'HASH',
          transaction,
        },
      );

      // Reconciliation ID queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['reconciliation_id'],
        {
          name: 'idx_payment_transactions_reconciliation_id',
          using: 'HASH',
          transaction,
        },
      );

      // Transaction date queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['transaction_date'],
        {
          name: 'idx_payment_transactions_transaction_date',
          transaction,
        },
      );

      // Boolean flag queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_active'],
        {
          name: 'idx_payment_transactions_is_active',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_valid_for_refund'],
        {
          name: 'idx_payment_transactions_is_valid_for_refund',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_activation'],
        {
          name: 'idx_payment_transactions_is_activation',
          using: 'HASH',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_payment_transactions_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_payment_transactions_updated_at',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_response_status'],
        {
          name: 'idx_payment_transactions_payment_response_status_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status'],
        {
          name: 'idx_payment_transactions_status_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['transmission_status'],
        {
          name: 'idx_payment_transactions_transmission_status_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['transaction_type'],
        {
          name: 'idx_payment_transactions_transaction_type_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'payment_method_id'],
        {
          name: 'idx_payment_transactions_order_payment_method_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_active', 'transaction_date'],
        {
          name: 'idx_payment_transactions_active_transaction_date_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_valid_for_refund', 'processed_amount', 'created_at'],
        {
          name: 'idx_payment_transactions_refund_amount_created_composite',
          transaction,
        },
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
