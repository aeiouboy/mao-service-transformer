module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const tableName = 'payment_transactions';

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
          payment_method_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          order_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          payment_transaction_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          is_activation: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          },
          is_copied: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          is_valid_for_refund: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          reconciliation_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          request_id: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          request_token: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          processed_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          transaction_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          requested_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
          },
          // JSONB fields for complex nested data
          payment_response_status: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          status: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          transmission_status: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          transaction_type: {
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
        ['payment_transaction_id'],
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
          tableName: 'payment_transactions',
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
