'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'payments';

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
          payment_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            comment: 'Payment identifier (unique)',
          },

          // Organization and Customer
          org_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Organization identifier',
          },
          customer_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer identifier',
          },
          payment_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Payment group identifier',
          },

          // Status and Information
          status_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Status identifier',
          },
          message: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Payment message',
          },

          // Boolean Flags
          is_anonymized: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is anonymized flag',
          },
          is_cancelled: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is cancelled flag',
          },

          // Date Information
          purge_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Purge date timestamp',
          },

          // JSONB Fields
          actions: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment actions in JSON format',
          },
          processing_mode: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Processing mode in JSON format',
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
          name: 'idx_payments_order_id',
          transaction,
        },
      );

      // Payment identifier unique index - from <<UNIQUE>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_id'],
        {
          name: 'idx_payments_payment_id',
          unique: true,
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Organization queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_payments_org_id',
          using: 'HASH',
          transaction,
        },
      );

      // Customer queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['customer_id'],
        {
          name: 'idx_payments_customer_id',
          using: 'HASH',
          transaction,
        },
      );

      // Payment group queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_group_id'],
        {
          name: 'idx_payments_payment_group_id',
          using: 'HASH',
          transaction,
        },
      );

      // Status queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        {
          name: 'idx_payments_status_id',
          using: 'HASH',
          transaction,
        },
      );

      // Time-based queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['purge_date'],
        {
          name: 'idx_payments_purge_date',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_payments_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_payments_updated_at',
          transaction,
        },
      );

      // Boolean flag queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_cancelled'],
        {
          name: 'idx_payments_is_cancelled',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_anonymized'],
        {
          name: 'idx_payments_is_anonymized',
          using: 'HASH',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['actions'],
        {
          name: 'idx_payments_actions_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['processing_mode'],
        {
          name: 'idx_payments_processing_mode_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'status_id'],
        {
          name: 'idx_payments_order_status_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['customer_id', 'is_cancelled'],
        {
          name: 'idx_payments_customer_cancelled_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'created_at'],
        {
          name: 'idx_payments_org_created_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_group_id', 'status_id', 'created_at'],
        {
          name: 'idx_payments_group_status_created_composite',
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
        { tableName: 'payments', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
