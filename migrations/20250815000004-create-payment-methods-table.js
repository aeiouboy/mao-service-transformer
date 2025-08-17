module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'payment_methods';

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
          payment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          payment_method_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          currency_code: {
            type: Sequelize.STRING(3),
            allowNull: true,
          },
          gateway_id: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          current_settled_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          is_copied: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          is_modifiable: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          is_suspended: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          is_voided: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          // JSONB fields for complex nested data
          payment_type: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          billing_address: {
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
        ['payment_method_id'],
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
        { tableName: 'payment_methods', schema: process.env.DATABASE_SCHEMA },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
