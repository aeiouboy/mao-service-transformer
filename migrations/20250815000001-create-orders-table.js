module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'orders';

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
            unique: true,
          },
          short_order_number: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          bu: {
            type: Sequelize.STRING(10),
            allowNull: true,
          },
          captured_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          currency_code: {
            type: Sequelize.STRING(3),
            allowNull: true,
          },
          customer_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          customer_email: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          do_not_release_before: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          customer_first_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          customer_last_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          customer_phone: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          customer_type_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          is_on_hold: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          order_locale: {
            type: Sequelize.STRING(10),
            allowNull: true,
          },
          cancel_allowed: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          alternate_order_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          org_id: {
            type: Sequelize.STRING(10),
            allowNull: true,
          },
          selling_channel: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          order_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          fulfillment_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          payment_status: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          // JSONB fields for complex nested data
          doc_type: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_hold: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_actions: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_extension1: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_charge_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_tax_detail: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_type: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          order_note: {
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
        { unique: true, transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['short_order_number'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['order_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['fulfillment_status'],
        { using: 'BTREE', transaction },
      );

      await queryInterface.addIndex(
        { tableName, schema: process.env.DATABASE_SCHEMA },
        ['payment_status'],
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
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
