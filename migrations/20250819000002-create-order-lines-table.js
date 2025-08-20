'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'order_lines';

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
            comment: 'Reference to parent order',
          },
          order_line_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Unique order line identifier',
          },
          // Product information
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Product/item identifier',
          },
          // Product attributes
          is_gift: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether this item is a gift',
          },
          is_tax_included: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether tax is included in price',
          },
          // Quantity and pricing
          quantity: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            defaultValue: 0,
            comment: 'Ordered quantity',
          },
          uom: {
            type: Sequelize.STRING(10),
            allowNull: true,
            comment: 'Unit of measure',
          },
          unit_price: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            defaultValue: 0,
            comment: 'Current unit price',
          },
          original_unit_price: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Original unit price before modifications',
          },
          // Delivery and shipping
          promised_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Promised delivery date for this line',
          },
          shipping_method_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Shipping method identifier',
          },
          release_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Release group identifier for batching',
          },
          // Status tracking
          fulfillment_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Current fulfillment status',
          },
          order_line_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Current order line status',
          },
          max_fulfillment_status_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Maximum fulfillment status reached',
          },
          // Complex data stored as JSONB
          delivery_method: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Delivery method configuration',
          },
          order_line_note: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Line-specific notes and comments',
          },
          order_line_charge_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Line-level charges and fees',
          },
          order_line_tax_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Line-level tax calculations',
          },
          order_line_promising_info: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Promising and availability information',
          },
          ship_to_address: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Specific shipping address for this line',
          },
          order_line_extension1: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Extended line attributes',
          },
          min_fulfillment_status_id: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Minimum fulfillment status configuration',
          },
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Line change history log',
          },
          // Hierarchy support
          parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Parent line ID for line hierarchies',
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Whether order line is active',
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
        ['order_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_group_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['parent_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['promised_delivery_date'],
        { using: 'BTREE', transaction },
      );

      // Add GIN indexes for JSONB fields
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_charge_detail'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_tax_detail'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_to_address'],
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
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
