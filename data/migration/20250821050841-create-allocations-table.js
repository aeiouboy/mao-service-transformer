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
          allocation_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Allocation identifier',
          },

          // Core Business Fields (Required)
          allocation_type: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Allocation type',
          },
          status_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Status identifier',
          },
          ship_from_location_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Ship from location identifier',
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
          carrier_code: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Carrier code',
          },
          allocated_on: {
            type: Sequelize.DATE,
            allowNull: false,
            comment: 'Allocation timestamp',
          },

          // Optional Business Fields
          reservation_request_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reservation request ID',
          },
          reservation_request_detail_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Reservation request detail ID',
          },
          ship_to_location_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Ship to location identifier',
          },
          country_of_origin: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Country of origin',
          },
          inventory_segment_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Inventory segment ID',
          },
          inventory_type_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Inventory type ID',
          },
          substitution_type_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Substitution type ID',
          },
          allocation_dependency_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Allocation dependency ID',
          },
          group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Group ID',
          },
          product_status_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Product status ID',
          },
          ship_via_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Ship via ID',
          },
          asn_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'ASN ID',
          },
          asn_detail_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'ASN detail ID',
          },
          service_level_code: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Service level code',
          },
          process: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Process',
          },
          batch_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Batch number',
          },

          // Boolean Field
          is_virtual: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            comment: 'Is virtual flag',
          },

          // Date Fields
          earliest_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Earliest delivery date',
          },
          earliest_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Earliest ship date',
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
            comment: 'Latest ship date',
          },
          latest_release_date: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Latest release date',
          },

          // JSONB Fields
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
          name: 'idx_allocations_order_id',
          transaction,
        },
      );

      // Order line identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_allocations_order_line_id',
          transaction,
        },
      );

      // Allocation identifier index - from <<INDEX>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocation_id'],
        {
          name: 'idx_allocations_allocation_id',
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Status queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id'],
        {
          name: 'idx_allocations_status_id',
          using: 'HASH',
          transaction,
        },
      );

      // Allocation type queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocation_type'],
        {
          name: 'idx_allocations_allocation_type',
          using: 'HASH',
          transaction,
        },
      );

      // Organization queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_allocations_org_id',
          using: 'HASH',
          transaction,
        },
      );

      // Item queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        {
          name: 'idx_allocations_item_id',
          using: 'HASH',
          transaction,
        },
      );

      // Location queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_from_location_id'],
        {
          name: 'idx_allocations_ship_from_location_id',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_to_location_id'],
        {
          name: 'idx_allocations_ship_to_location_id',
          using: 'HASH',
          transaction,
        },
      );

      // Carrier code queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['carrier_code'],
        {
          name: 'idx_allocations_carrier_code',
          using: 'HASH',
          transaction,
        },
      );

      // UOM queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['uom'],
        {
          name: 'idx_allocations_uom',
          using: 'HASH',
          transaction,
        },
      );

      // Boolean flag queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_virtual'],
        {
          name: 'idx_allocations_is_virtual',
          using: 'HASH',
          transaction,
        },
      );

      // Date queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocated_on'],
        {
          name: 'idx_allocations_allocated_on',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['earliest_delivery_date'],
        {
          name: 'idx_allocations_earliest_delivery_date',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['committed_delivery_date'],
        {
          name: 'idx_allocations_committed_delivery_date',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_allocations_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_allocations_updated_at',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['extended'],
        {
          name: 'idx_allocations_extended_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'order_line_id'],
        {
          name: 'idx_allocations_order_orderline_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'item_id'],
        {
          name: 'idx_allocations_org_item_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['status_id', 'allocation_type'],
        {
          name: 'idx_allocations_status_type_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_from_location_id', 'ship_to_location_id'],
        {
          name: 'idx_allocations_ship_from_to_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['carrier_code', 'service_level_code'],
        {
          name: 'idx_allocations_carrier_service_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['item_id', 'uom', 'quantity'],
        {
          name: 'idx_allocations_item_uom_quantity_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['is_virtual', 'allocated_on', 'status_id'],
        {
          name: 'idx_allocations_virtual_allocated_status_composite',
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
