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
          release_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            comment: 'Release identifier (unique)',
          },

          // Core Business Fields (Required)
          org_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Organization identifier',
          },
          ship_from_location_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Ship from location identifier',
          },
          carrier_code: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Carrier code',
          },

          // Optional Business Fields
          delivery_method_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Delivery method ID',
          },
          ship_to_location_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Ship to location identifier',
          },
          ship_via_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Ship via ID',
          },
          release_type: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Release type',
          },
          process: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Process',
          },
          service_level_code: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Service level code',
          },
          destination_action: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Destination action',
          },

          // Integer Field
          effective_rank: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Effective rank',
          },

          // JSONB Fields
          release_extension_1: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Release extension 1 in JSON format',
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
          name: 'idx_releases_order_id',
          transaction,
        },
      );

      // Release identifier unique index - from <<UNIQUE>>
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_id'],
        {
          name: 'idx_releases_release_id',
          unique: true,
          transaction,
        },
      );

      // Additional useful indexes for common queries

      // Organization queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id'],
        {
          name: 'idx_releases_org_id',
          using: 'HASH',
          transaction,
        },
      );

      // Location queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_from_location_id'],
        {
          name: 'idx_releases_ship_from_location_id',
          using: 'HASH',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_to_location_id'],
        {
          name: 'idx_releases_ship_to_location_id',
          using: 'HASH',
          transaction,
        },
      );

      // Carrier code queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['carrier_code'],
        {
          name: 'idx_releases_carrier_code',
          using: 'HASH',
          transaction,
        },
      );

      // Delivery method queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['delivery_method_id'],
        {
          name: 'idx_releases_delivery_method_id',
          using: 'HASH',
          transaction,
        },
      );

      // Release type queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_type'],
        {
          name: 'idx_releases_release_type',
          using: 'HASH',
          transaction,
        },
      );

      // Service level code queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['service_level_code'],
        {
          name: 'idx_releases_service_level_code',
          using: 'HASH',
          transaction,
        },
      );

      // Process queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['process'],
        {
          name: 'idx_releases_process',
          using: 'HASH',
          transaction,
        },
      );

      // Effective rank queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['effective_rank'],
        {
          name: 'idx_releases_effective_rank',
          transaction,
        },
      );

      // Audit trail queries
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['created_at'],
        {
          name: 'idx_releases_created_at',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['updated_at'],
        {
          name: 'idx_releases_updated_at',
          transaction,
        },
      );

      // JSONB field indexes for better query performance
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_extension_1'],
        {
          name: 'idx_releases_release_extension_1_gin',
          using: 'GIN',
          transaction,
        },
      );

      // Composite indexes for common query patterns
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['org_id', 'carrier_code'],
        {
          name: 'idx_releases_org_carrier_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['ship_from_location_id', 'ship_to_location_id'],
        {
          name: 'idx_releases_ship_from_to_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['release_type', 'process'],
        {
          name: 'idx_releases_type_process_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['carrier_code', 'service_level_code'],
        {
          name: 'idx_releases_carrier_service_composite',
          transaction,
        },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['effective_rank', 'created_at'],
        {
          name: 'idx_releases_rank_created_composite',
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
