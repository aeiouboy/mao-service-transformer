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
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          allocation_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          allocation_type: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          status_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          process: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          uom: {
            type: Sequelize.STRING(20),
            allowNull: true,
          },
          is_virtual: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          ship_from_location_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          ship_to_location_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          ship_via_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          carrier_code: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          earliest_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          earliest_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          committed_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          committed_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          latest_ship_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          latest_release_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          allocated_on: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          batch_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          reservation_request_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          reservation_request_detail_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          org_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          country_of_origin: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          inventory_segment_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          inventory_type_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          substitution_type_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          allocation_dependency_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          group_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          product_status_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          asn_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          asn_detail_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          // JSONB fields for complex nested data
          extended: {
            type: Sequelize.JSONB,
            allowNull: true,
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

      // Add indexes after table creation
      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['allocation_id'],
        { using: 'BTREE', transaction },
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
          tableName: 'allocations',
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
