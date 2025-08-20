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
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          release_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Reference to release record',
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
          // Release line identification
          release_line_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Unique release line identifier',
          },
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Product/item identifier',
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
            comment: 'Release line status identifier',
          },
          // Quantity information
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Release line quantity',
          },
          uom: {
            type: Sequelize.STRING(20),
            allowNull: true,
            comment: 'Unit of measure',
          },
          picked_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Quantity that has been picked',
          },
          packed_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Quantity that has been packed',
          },
          shipped_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Quantity that has been shipped',
          },
          // Line status and reason information
          line_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
            comment: 'Current line status',
          },
          reason: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reason for release line',
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
          web_url: {
            type: Sequelize.STRING(500),
            allowNull: true,
            comment: 'Related web URL',
          },
          // Location and warehouse information
          location_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Location identifier',
          },
          warehouse_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Warehouse identifier',
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
          is_virtual: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether release line is virtual',
          },
          // Complex data stored as JSONB
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Release line status information',
          },
          inventory_attributes: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Inventory attributes and properties',
          },
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Release line change history log',
          },
          extended: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Extended release line attributes',
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
        ['release_id'],
        { using: 'BTREE', transaction },
      );

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
        ['release_line_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['line_status'],
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
        ['inventory_attributes'],
        { using: 'GIN', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['change_log'],
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
