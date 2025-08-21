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
            unique: true,
            comment: 'Business order identifier',
          },
          short_order_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Short order number',
          },

          // Customer Information
          customer_type_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer type identifier',
          },
          customer_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer identifier',
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
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer phone number',
          },
          currency_code: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Currency code',
          },

          // Channel and Organization
          selling_channel: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Selling channel',
          },
          org_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Organization identifier',
          },
          alternate_order_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Alternate order identifier',
          },

          // Fulfillment Status
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

          // Financial Fields (DECIMAL 18,4)
          order_sub_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Order subtotal amount',
          },
          order_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Order total amount',
          },
          total_charges: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Total charges amount',
          },
          total_discounts: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Total discounts amount',
          },
          total_taxes: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Total taxes amount',
          },
          cancelled_order_sub_total: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Cancelled order subtotal amount',
          },

          // Boolean Flags
          is_on_hold: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Order is on hold flag',
          },
          cancel_allowed: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Cancel allowed flag',
          },
          is_cancelled: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Order is cancelled flag',
          },

          // Locale and Status
          order_locale: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Order locale',
          },
          order_status: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Order status',
          },
          fulfillment_status: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Fulfillment status',
          },
          payment_status: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Payment status',
          },

          // Timestamp Fields
          do_not_release_before: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Do not release before timestamp',
          },
          captured_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Captured date timestamp',
          },

          // JSONB Fields
          doc_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Document type in JSON format',
          },
          order_hold: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order hold information in JSON format',
          },
          order_actions: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order actions in JSON format',
          },
          order_extension1: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order extension 1 in JSON format',
          },
          order_charge_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order charge detail in JSON format',
          },
          order_tax_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order tax detail in JSON format',
          },
          order_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order type in JSON format',
          },
          order_note: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Order note in JSON format',
          },
          cancel_reason: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Cancel reason in JSON format',
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
            comment: 'Parent order ID',
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

      // Primary business identifier index (unique) - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_orders_order_id',
          unique: true,
          transaction,
        },
      );

      // Short order number index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['short_order_number'],
        {
          name: 'idx_orders_short_order_number',
          transaction,
        },
      );

      // Order status index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_status'],
        {
          name: 'idx_orders_order_status',
          using: 'HASH',
          transaction,
        },
      );

      // Fulfillment status index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_status'],
        {
          name: 'idx_orders_fulfillment_status',
          using: 'HASH',
          transaction,
        },
      );

      // Payment status index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_status'],
        {
          name: 'idx_orders_payment_status',
          using: 'HASH',
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Customer-based queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['customer_id'],
        {
          name: 'idx_orders_customer_id',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['customer_email'],
        {
          name: 'idx_orders_customer_email',
          using: 'HASH',
          transaction,
        },
      );

      // Organization and channel queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_orders_org_id',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['selling_channel'],
        {
          name: 'idx_orders_selling_channel',
          using: 'HASH',
          transaction,
        },
      );

      // Time-based queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['captured_date'],
        {
          name: 'idx_orders_captured_date',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['do_not_release_before'],
        {
          name: 'idx_orders_do_not_release_before',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_orders_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_orders_updated_at',
          transaction,
        },
      );

      // Version and active status queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_active'],
        {
          name: 'idx_orders_is_active',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['version'],
        {
          name: 'idx_orders_version',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['doc_type'],
        {
          name: 'idx_orders_doc_type_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_type'],
        {
          name: 'idx_orders_order_type_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['change_log'],
        {
          name: 'idx_orders_change_log_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'order_status'],
        {
          name: 'idx_orders_org_status_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['customer_id', 'is_active'],
        {
          name: 'idx_orders_customer_active_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['selling_channel', 'order_status', 'created_at'],
        {
          name: 'idx_orders_channel_status_created_composite',
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
