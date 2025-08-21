'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'release_lines';

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
          release_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Release identifier',
          },
          release_line_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Release line identifier',
          },
          allocation_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Allocation identifier',
          },

          // Core Business Fields (Required)
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

          // Optional Business Fields
          fulfilled_quantity: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Fulfilled quantity',
          },
          cancelled_quantity: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Cancelled quantity',
          },
          effective_rank: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Effective rank',
          },
          process: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Process',
          },
          cancelled_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Cancelled date',
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
          name: 'idx_release_lines_order_id',
          transaction,
        },
      );

      // Order line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_release_lines_order_line_id',
          transaction,
        },
      );

      // Release identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_id'],
        {
          name: 'idx_release_lines_release_id',
          transaction,
        },
      );

      // Release line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_line_id'],
        {
          name: 'idx_release_lines_release_line_id',
          transaction,
        },
      );

      // Allocation identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocation_id'],
        {
          name: 'idx_release_lines_allocation_id',
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Organization queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_release_lines_org_id',
          using: 'HASH',
          transaction,
        },
      );

      // Item queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        {
          name: 'idx_release_lines_item_id',
          using: 'HASH',
          transaction,
        },
      );

      // UOM queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['uom'],
        {
          name: 'idx_release_lines_uom',
          using: 'HASH',
          transaction,
        },
      );

      // Process queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['process'],
        {
          name: 'idx_release_lines_process',
          using: 'HASH',
          transaction,
        },
      );

      // Effective rank queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['effective_rank'],
        {
          name: 'idx_release_lines_effective_rank',
          transaction,
        },
      );

      // Cancelled date queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['cancelled_date'],
        {
          name: 'idx_release_lines_cancelled_date',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_release_lines_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_release_lines_updated_at',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'order_line_id'],
        {
          name: 'idx_release_lines_order_orderline_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_id', 'release_line_id'],
        {
          name: 'idx_release_lines_release_releaseline_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'item_id'],
        {
          name: 'idx_release_lines_org_item_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id', 'uom'],
        {
          name: 'idx_release_lines_item_uom_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocation_id', 'effective_rank'],
        {
          name: 'idx_release_lines_allocation_rank_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['process', 'cancelled_date'],
        {
          name: 'idx_release_lines_process_cancelled_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['quantity', 'fulfilled_quantity', 'cancelled_quantity'],
        {
          name: 'idx_release_lines_quantity_fulfilled_cancelled_composite',
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
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
