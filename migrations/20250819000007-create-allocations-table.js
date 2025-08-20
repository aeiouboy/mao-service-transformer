'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'allocations';

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
          // Allocation identification
          allocation_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique allocation identifier',
          },
          allocation_type: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Type of allocation',
          },
          status_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Allocation status identifier',
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
            comment: 'Allocated quantity',
          },
          uom: {
            type: Sequelize.STRING(20),
            allowNull: true,
            comment: 'Unit of measure',
          },
          is_virtual: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether allocation is virtual',
          },
          // Location and shipping information
          ship_from_location_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Ship from location identifier',
          },
          ship_to_location_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Ship to location identifier',
          },
          ship_via_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Ship via method identifier',
          },
          carrier_code: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Carrier code',
          },
          // Date information
          earliest_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Earliest possible delivery date',
          },
          earliest_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Earliest possible ship date',
          },
          committed_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Committed delivery date',
          },
          committed_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Committed ship date',
          },
          latest_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Latest possible ship date',
          },
          latest_release_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Latest release date',
          },
          allocated_on: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'When allocation was made',
          },
          // Inventory and batch information
          batch_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Batch number',
          },
          reservation_request_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reservation request identifier',
          },
          reservation_request_detail_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reservation request detail identifier',
          },
          org_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Organization identifier',
          },
          country_of_origin: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Country of origin',
          },
          inventory_segment_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Inventory segment identifier',
          },
          inventory_type_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Inventory type identifier',
          },
          substitution_type_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Substitution type identifier',
          },
          allocation_dependency_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Allocation dependency identifier',
          },
          group_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Group identifier',
          },
          product_status_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Product status identifier',
          },
          asn_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'ASN identifier',
          },
          asn_detail_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'ASN detail identifier',
          },
          // Complex data stored as JSONB
          extended: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Extended allocation attributes',
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
        ['allocation_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocation_type'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_from_location_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['carrier_code'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocated_on'],
        { using: 'BTREE', transaction },
      );

      // Add GIN index for JSONB field
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['extended'],
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
        { tableName: 'allocations', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
