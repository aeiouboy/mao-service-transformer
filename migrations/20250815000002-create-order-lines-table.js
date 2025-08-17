module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'order_lines';

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
          },
          order_line_id: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          item_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          is_gift: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          is_tax_included: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          promised_delivery_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          uom: {
            type: Sequelize.STRING(10),
            allowNull: true,
          },
          quantity: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          unit_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          original_unit_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          shipping_method_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          release_group_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          fulfillment_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          // JSONB fields for complex nested data
          delivery_method: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_line_note: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_line_charge_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_line_tax_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_line_promising_info: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          ship_to_address: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_line_extension1: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          change_log: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        ['item_id'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_status'],
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
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
