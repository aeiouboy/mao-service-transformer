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
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          order_line_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Reference to order line',
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Reference to parent order',
          },
          // Quantity detail identification
          quantity_detail_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique quantity detail identifier',
          },
          status_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Status identifier',
          },
          process: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Process identifier',
          },
          // Item and quantity information
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Product/item identifier',
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Quantity amount',
          },
          uom: {
            type: Sequelize.STRING(20),
            allowNull: true,
            comment: 'Unit of measure',
          },
          // Reason and modification information
          reason: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reason for quantity detail',
          },
          reason_type: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Type of reason',
          },
          substitution_ratio: {
            type: Sequelize.DECIMAL(18, 4),
            allowNull: true,
            comment: 'Substitution ratio if applicable',
          },
          substitution_type: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Type of substitution',
          },
          // Additional information
          web_url: {
            type: Sequelize.STRING(500),
            allowNull: true,
            comment: 'Related web URL',
          },
          org_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Organization identifier',
          },
          // Complex data stored as JSONB
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Status information and details',
          },
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Change history log',
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
        ['order_line_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['quantity_detail_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['process'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        { using: 'BTREE', transaction },
      );

      // Add GIN indexes for JSONB fields
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status'],
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
