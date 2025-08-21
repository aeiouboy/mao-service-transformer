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
          order_line_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Order line identifier',
          },

          // Shipping and Fulfillment
          release_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Release group identifier',
          },
          shipping_method_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Shipping method identifier',
          },
          fulfillment_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Fulfillment group identifier',
          },
          max_fulfillment_status_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Maximum fulfillment status identifier',
          },
          min_fulfillment_status_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Minimum fulfillment status identifier',
          },
          ship_to_location_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Ship to location identifier',
          },
          ship_from_address_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Ship from address identifier',
          },

          // Item Information
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Item identifier',
          },
          item_description: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Item description',
          },

          // Boolean Flags
          is_gift: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is gift flag',
          },
          is_tax_included: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is tax included flag',
          },
          is_pre_order: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is pre-order flag',
          },
          is_cancelled: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is cancelled flag',
          },

          // Delivery Information
          promised_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Promised delivery date',
          },
          small_image_uri: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Small image URI',
          },

          // Quantity and Pricing
          uom: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Unit of measure',
          },
          quantity: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Quantity',
          },
          unit_price: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Unit price',
          },
          original_unit_price: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Original unit price',
          },

          // Financial Totals (DECIMAL 18,4)
          order_line_sub_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Order line subtotal',
          },
          order_line_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Order line total',
          },
          order_line_tax_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Order line tax total',
          },
          max_appeasement_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Maximum appeasement amount',
          },
          total_discount_on_item: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Total discount on item',
          },
          total_discounts: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Total discounts',
          },
          total_charges: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Total charges',
          },
          cancelled_order_line_sub_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Cancelled order line subtotal',
          },
          cancelled_total_discounts: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Cancelled total discounts',
          },

          // Status Fields
          fulfillment_status: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Fulfillment status',
          },
          order_line_status: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Order line status',
          },

          // JSONB Fields
          delivery_method: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Delivery method in JSON format',
          },
          order_line_note: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order line note in JSON format',
          },
          order_line_charge_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order line charge detail in JSON format',
          },
          order_line_tax_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order line tax detail in JSON format',
          },
          order_line_promising_info: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order line promising info in JSON format',
          },
          ship_to_address: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Ship to address in JSON format',
          },
          order_line_extension1: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order line extension 1 in JSON format',
          },
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Change log history in JSON format',
          },

          // Parent and Version Control
          parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Parent order line ID',
          },
          version: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: 'Version number',
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'Is active flag',
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

      // Primary business identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_order_lines_order_id',
          transaction,
        },
      );

      // Order line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_order_lines_order_line_id',
          transaction,
        },
      );

      // Fulfillment status index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_status'],
        {
          name: 'idx_order_lines_fulfillment_status',
          using: 'HASH',
          transaction,
        },
      );

      // Order line status index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_status'],
        {
          name: 'idx_order_lines_order_line_status',
          using: 'HASH',
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Item-based queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        {
          name: 'idx_order_lines_item_id',
          using: 'HASH',
          transaction,
        },
      );

      // UOM queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['uom'],
        {
          name: 'idx_order_lines_uom',
          using: 'HASH',
          transaction,
        },
      );

      // Fulfillment group queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_group_id'],
        {
          name: 'idx_order_lines_fulfillment_group_id',
          using: 'HASH',
          transaction,
        },
      );

      // Shipping method queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['shipping_method_id'],
        {
          name: 'idx_order_lines_shipping_method_id',
          using: 'HASH',
          transaction,
        },
      );

      // Time-based queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['promised_delivery_date'],
        {
          name: 'idx_order_lines_promised_delivery_date',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_order_lines_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_order_lines_updated_at',
          transaction,
        },
      );

      // Version and active status queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_active'],
        {
          name: 'idx_order_lines_is_active',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['version'],
        {
          name: 'idx_order_lines_version',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['delivery_method'],
        {
          name: 'idx_order_lines_delivery_method_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_to_address'],
        {
          name: 'idx_order_lines_ship_to_address_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['change_log'],
        {
          name: 'idx_order_lines_change_log_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'order_line_status'],
        {
          name: 'idx_order_lines_order_status_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'is_active'],
        {
          name: 'idx_order_lines_order_active_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id', 'fulfillment_status'],
        {
          name: 'idx_order_lines_item_fulfillment_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_group_id', 'order_line_status', 'created_at'],
        {
          name: 'idx_order_lines_group_status_created_composite',
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
