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
            comment: 'Payment identifier',
          },
          payment_method_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            comment: 'Payment method identifier (unique)',
          },

          // Message and Currency
          messages: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Payment method messages',
          },
          currency_code: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Currency code',
          },
          alternate_currency_amount: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Alternate currency amount',
          },

          // Account Information
          account_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Account number',
          },
          account_display_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Account display number',
          },
          name_on_card: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Name on card',
          },
          swipe_data: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Swipe data',
          },

          // Card Information
          card_expiry_month: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Card expiry month',
          },
          card_expiry_year: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Card expiry year',
          },
          gift_card_pin: {
            type: Sequelize.STRING(25),
            allowNull: true,
            comment: 'Gift card PIN',
          },

          // Signature Information
          customer_signature: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer signature',
          },
          customer_pay_signature: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Customer pay signature',
          },
          charge_sequence: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Charge sequence',
          },

          // Bank Information
          routing_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Routing number',
          },
          routing_display_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Routing display number',
          },
          check_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Check number',
          },

          // License Information
          drivers_license_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Drivers license number',
          },
          drivers_license_state: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Drivers license state',
          },
          drivers_license_country: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Drivers license country',
          },

          // Business Information
          business_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Business name',
          },
          business_tax_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Business tax ID',
          },
          check_quantity: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Check quantity',
          },
          original_amount: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Original amount',
          },

          // Parent References
          parent_order_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Parent order ID',
          },
          parent_payment_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Parent payment group ID',
          },
          parent_payment_method_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Parent payment method ID',
          },

          // Gateway and Location Information
          gateway_account_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Gateway account ID',
          },
          location_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Location ID',
          },
          transaction_reference_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Transaction reference ID',
          },
          org_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Organization ID',
          },

          // Additional Information
          entry_type_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Entry type ID',
          },
          gateway_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Gateway ID',
          },
          captured_source: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Captured source',
          },
          shopper_reference: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Shopper reference',
          },
          suggested_amount: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Suggested amount',
          },
          purge_date: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Purge date',
          },
          account_type: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Account type',
          },
          payment_category: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Payment category',
          },

          // Financial Fields (DECIMAL 18,4)
          amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Amount',
          },
          current_auth_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Current authorization amount',
          },
          current_settled_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Current settled amount',
          },
          current_refund_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Current refund amount',
          },
          current_failed_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Current failed amount',
          },
          merchandise_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Merchandise amount',
          },
          change_amount: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Change amount',
          },
          conversion_rate: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Conversion rate',
          },

          // Boolean Flags
          captured_in_edge_mode: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Captured in edge mode flag',
          },
          is_suspended: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is suspended flag',
          },
          is_voided: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is voided flag',
          },
          is_copied: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is copied flag',
          },
          is_modifiable: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is modifiable flag',
          },

          // JSONB Fields
          actions: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment method actions in JSON format',
          },
          billing_address: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Billing address in JSON format',
          },
          payment_method_attribute: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment method attributes in JSON format',
          },
          payment_method_encr_attribute: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment method encrypted attributes in JSON format',
          },
          payment_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Payment type in JSON format',
          },
          card_type: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Card type in JSON format',
          },
          extended: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Extended information in JSON format',
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
          name: 'idx_payment_methods_order_id',
          transaction,
        },
      );

      // Payment identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_id'],
        {
          name: 'idx_payment_methods_payment_id',
          transaction,
        },
      );

      // Payment method identifier unique index - from <<UNIQUE>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_method_id'],
        {
          name: 'idx_payment_methods_payment_method_id',
          unique: true,
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Currency code queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['currency_code'],
        {
          name: 'idx_payment_methods_currency_code',
          using: 'HASH',
          transaction,
        },
      );

      // Organization queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_payment_methods_org_id',
          using: 'HASH',
          transaction,
        },
      );

      // Gateway queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['gateway_id'],
        {
          name: 'idx_payment_methods_gateway_id',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['gateway_account_id'],
        {
          name: 'idx_payment_methods_gateway_account_id',
          using: 'HASH',
          transaction,
        },
      );

      // Location queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['location_id'],
        {
          name: 'idx_payment_methods_location_id',
          using: 'HASH',
          transaction,
        },
      );

      // Account type queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['account_type'],
        {
          name: 'idx_payment_methods_account_type',
          using: 'HASH',
          transaction,
        },
      );

      // Payment category queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_category'],
        {
          name: 'idx_payment_methods_payment_category',
          using: 'HASH',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_payment_methods_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_payment_methods_updated_at',
          transaction,
        },
      );

      // Boolean flag queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_suspended'],
        {
          name: 'idx_payment_methods_is_suspended',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_voided'],
        {
          name: 'idx_payment_methods_is_voided',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_modifiable'],
        {
          name: 'idx_payment_methods_is_modifiable',
          using: 'HASH',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['actions'],
        {
          name: 'idx_payment_methods_actions_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['billing_address'],
        {
          name: 'idx_payment_methods_billing_address_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_type'],
        {
          name: 'idx_payment_methods_payment_type_gin',
          using: 'GIN',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['card_type'],
        {
          name: 'idx_payment_methods_card_type_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'payment_id'],
        {
          name: 'idx_payment_methods_order_payment_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'currency_code'],
        {
          name: 'idx_payment_methods_org_currency_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['gateway_id', 'account_type'],
        {
          name: 'idx_payment_methods_gateway_account_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_category', 'is_suspended', 'created_at'],
        {
          name: 'idx_payment_methods_category_suspended_created_composite',
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
