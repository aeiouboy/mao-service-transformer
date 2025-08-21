'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'quantity_details';

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
          quantity_detail_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            comment: 'Quantity detail identifier (unique)',
          },

          // Core Business Fields
          status_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Status identifier',
          },
          org_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Organization identifier',
          },
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Item identifier',
          },
          quantity: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: false,
            comment: 'Quantity',
          },
          uom: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unit of measure',
          },

          // Process and Reason Information
          process: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Process',
          },
          reason: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reason',
          },
          reason_type: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reason type',
          },

          // Substitution Information
          substitution_ratio: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Substitution ratio',
          },
          substitution_type: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Substitution type',
          },

          // Web URL Information
          web_url: {
            type: Sequelize.STRING(500),
            allowNull: true,
            comment: 'Web URL',
          },

          // JSONB Fields
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Change log in JSON format',
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
          name: 'idx_quantity_details_order_id',
          transaction,
        },
      );

      // Order line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_quantity_details_order_line_id',
          transaction,
        },
      );

      // Quantity detail identifier unique index - from <<UNIQUE>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['quantity_detail_id'],
        {
          name: 'idx_quantity_details_quantity_detail_id',
          unique: true,
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Status ID queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        {
          name: 'idx_quantity_details_status_id',
          using: 'HASH',
          transaction,
        },
      );

      // Organization queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_quantity_details_org_id',
          using: 'HASH',
          transaction,
        },
      );

      // Item queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        {
          name: 'idx_quantity_details_item_id',
          using: 'HASH',
          transaction,
        },
      );

      // UOM queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['uom'],
        {
          name: 'idx_quantity_details_uom',
          using: 'HASH',
          transaction,
        },
      );

      // Process queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['process'],
        {
          name: 'idx_quantity_details_process',
          using: 'HASH',
          transaction,
        },
      );

      // Reason type queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['reason_type'],
        {
          name: 'idx_quantity_details_reason_type',
          using: 'HASH',
          transaction,
        },
      );

      // Substitution type queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['substitution_type'],
        {
          name: 'idx_quantity_details_substitution_type',
          using: 'HASH',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_quantity_details_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_quantity_details_updated_at',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['change_log'],
        {
          name: 'idx_quantity_details_change_log_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'order_line_id'],
        {
          name: 'idx_quantity_details_order_orderline_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'item_id'],
        {
          name: 'idx_quantity_details_org_item_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id', 'process'],
        {
          name: 'idx_quantity_details_status_process_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id', 'uom', 'quantity'],
        {
          name: 'idx_quantity_details_item_uom_quantity_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['reason_type', 'substitution_type', 'created_at'],
        {
          name: 'idx_quantity_details_reason_substitution_created_composite',
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
        { tableName: 'quantity_details', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
