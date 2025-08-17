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
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          quantity_detail_id: {
            type: Sequelize.STRING(255),
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
          reason: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          reason_type: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          substitution_ratio: {
            type: Sequelize.DECIMAL(10, 3),
            allowNull: true,
            defaultValue: 0,
          },
          substitution_type: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          web_url: {
            type: Sequelize.STRING(500),
            allowNull: true,
          },
          org_id: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          // JSONB fields for complex nested data
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          change_log: {
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
        ['quantity_detail_id'],
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
          tableName: 'quantity_details',
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
