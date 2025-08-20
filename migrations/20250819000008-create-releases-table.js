'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'releases';

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
          // Release identification
          release_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique release identifier',
          },
          release_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Release number',
          },
          process: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Process identifier',
          },
          org_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Organization identifier',
          },
          status_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Release status identifier',
          },
          // Date information
          release_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Release date',
          },
          expected_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Expected ship date',
          },
          actual_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Actual ship date',
          },
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
          // Location and shipping information
          warehouse_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Warehouse identifier',
          },
          carrier_code: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Carrier code',
          },
          tracking_number: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: 'Shipping tracking number',
          },
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
          // Quantity and inventory information
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Release quantity',
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
            comment: 'Whether release is virtual',
          },
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
          country_of_origin: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Country of origin',
          },
          // Inventory and substitution information
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
          substitution_ratio: {
            type: Sequelize.DECIMAL(10, 3),
            allowNull: true,
            comment: 'Substitution ratio if applicable',
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
          // Purchase order information
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
          po_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Purchase order identifier',
          },
          po_detail_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Purchase order detail identifier',
          },
          service_level_code: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Service level code',
          },
          allocation_type: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Type of allocation',
          },
          // Complex data stored as JSONB
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Release status information',
          },
          inventory_attributes: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Inventory attributes and properties',
          },
          extended: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Extended release attributes',
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
        ['release_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['warehouse_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['carrier_code'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['tracking_number'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_date'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['actual_ship_date'],
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
        ['inventory_attributes'],
        { using: 'GIN', transaction },
      );

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
        { tableName: 'releases', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
