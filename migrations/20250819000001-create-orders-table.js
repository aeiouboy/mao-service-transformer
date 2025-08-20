'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'orders';

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
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique order identifier',
          },
          short_order_number: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Short reference order number',
          },
          // Business and organization fields
          bu: {
            type: Sequelize.STRING(10),
            allowNull: true,
            comment: 'Business unit code',
          },
          org_id: {
            type: Sequelize.STRING(10),
            allowNull: true,
            comment: 'Organization identifier',
          },
          // Customer information
          customer_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer unique identifier',
          },
          customer_email: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer email address',
          },
          customer_first_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer first name',
          },
          customer_last_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer last name',
          },
          customer_phone: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Customer phone number',
          },
          customer_type_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Customer type classification',
          },
          // Order timing and control
          captured_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'When the order was captured',
          },
          do_not_release_before: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Hold order until this date',
          },
          is_on_hold: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether order is currently on hold',
          },
          cancel_allowed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Whether order can be cancelled',
          },
          // Order classification
          currency_code: {
            type: Sequelize.STRING(10),
            allowNull: true,
            comment: 'ISO currency code (USD, THB, etc.)',
          },
          order_locale: {
            type: Sequelize.STRING(10),
            allowNull: true,
            comment: 'Order locale (en-US, th-TH, etc.)',
          },
          selling_channel: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Sales channel identifier',
          },
          alternate_order_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Alternative order reference',
          },
          // Status fields
          order_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Current order status',
          },
          fulfillment_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Current fulfillment status',
          },
          payment_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Current payment status',
          },
          max_fulfillment_status_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Maximum fulfillment status reached',
          },
          // Complex data stored as JSONB
          doc_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Document type configuration',
          },
          order_hold: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order hold information and reasons',
          },
          order_actions: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Available actions for this order',
          },
          order_extension1: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Extended order attributes',
          },
          order_charge_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order-level charges and fees',
          },
          order_tax_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Tax calculation details',
          },
          order_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order type configuration',
          },
          order_note: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order notes and comments',
          },
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order change history log',
          },
          // Hierarchy support
          parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Parent order ID for order hierarchies',
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Whether order is active',
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
      // Unique constraint on order_id for foreign key references
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        { unique: true, using: 'BTREE', transaction },
      );

      // Composite unique constraint for business logic
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'is_active'],
        { unique: true, using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['short_order_number'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['customer_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['bu'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['parent_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['captured_date'],
        { using: 'BTREE', transaction },
      );

      // Add GIN indexes for JSONB fields
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_charge_detail'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_tax_detail'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['change_log'],
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
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
