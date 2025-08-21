'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'fulfillment_details';

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
            allowNull: true,
            comment: 'Order identifier',
          },
          order_line_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Order line identifier',
          },
          release_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Release identifier',
          },
          release_line_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Release line identifier',
          },
          fulfillment_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Fulfillment identifier',
          },

          // Core Business Fields
          fulfillment_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Fulfillment group identifier',
          },
          event_type_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Event type identifier',
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
          status_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Status identifier',
          },
          short_reason_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Short reason identifier',
          },

          // JSONB Fields
          fulfillment_info: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Fulfillment information',
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
          name: 'idx_fulfillment_details_order_id',
          transaction,
        },
      );

      // Order line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_fulfillment_details_order_line_id',
          transaction,
        },
      );

      // Release identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_id'],
        {
          name: 'idx_fulfillment_details_release_id',
          transaction,
        },
      );

      // Release line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_line_id'],
        {
          name: 'idx_fulfillment_details_release_line_id',
          transaction,
        },
      );

      // Fulfillment identifier unique index - from <<UNIQUE>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_id'],
        {
          name: 'idx_fulfillment_details_fulfillment_id_unique',
          unique: true,
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Fulfillment group queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_group_id'],
        {
          name: 'idx_fulfillment_details_fulfillment_group_id',
          using: 'HASH',
          transaction,
        },
      );

      // Event type queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['event_type_id'],
        {
          name: 'idx_fulfillment_details_event_type_id',
          using: 'HASH',
          transaction,
        },
      );

      // Item queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        {
          name: 'idx_fulfillment_details_item_id',
          using: 'HASH',
          transaction,
        },
      );

      // UOM queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['uom'],
        {
          name: 'idx_fulfillment_details_uom',
          using: 'HASH',
          transaction,
        },
      );

      // Status queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        {
          name: 'idx_fulfillment_details_status_id',
          using: 'HASH',
          transaction,
        },
      );

      // Short reason queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['short_reason_id'],
        {
          name: 'idx_fulfillment_details_short_reason_id',
          using: 'HASH',
          transaction,
        },
      );

      // JSONB field index for fulfillment_info - using GIN for JSONB queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_info'],
        {
          name: 'idx_fulfillment_details_fulfillment_info',
          using: 'GIN',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_fulfillment_details_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_fulfillment_details_updated_at',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'order_line_id'],
        {
          name: 'idx_fulfillment_details_order_orderline_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_id', 'release_line_id'],
        {
          name: 'idx_fulfillment_details_release_releaseline_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_group_id', 'event_type_id'],
        {
          name: 'idx_fulfillment_details_group_event_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id', 'uom'],
        {
          name: 'idx_fulfillment_details_item_uom_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id', 'short_reason_id'],
        {
          name: 'idx_fulfillment_details_status_reason_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_id', 'status_id'],
        {
          name: 'idx_fulfillment_details_fulfillment_status_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['quantity', 'uom', 'status_id'],
        {
          name: 'idx_fulfillment_details_quantity_uom_status_composite',
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
          tableName: 'fulfillment_details',
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
