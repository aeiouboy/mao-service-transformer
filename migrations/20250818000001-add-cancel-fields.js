module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Add cancel fields to orders table
      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'is_cancelled',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: 'Indicates if the order is cancelled',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancel_line_count',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
          comment: 'Number of cancelled order lines',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancelled_order_subtotal',
        {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: true,
          defaultValue: 0.00,
          comment: 'Total value of cancelled items',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancel_reason',
        {
          type: Sequelize.JSONB,
          allowNull: true,
          comment: 'Cancel reason object with ReasonId',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancel_comments',
        {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: 'Cancel comments from user',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'process_type',
        {
          type: Sequelize.STRING(100),
          allowNull: true,
          comment: 'Process type (e.g., postReleaseCancellation)',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancelled_date',
        {
          type: Sequelize.DATE,
          allowNull: true,
          comment: 'Date when order was cancelled',
        },
        { transaction }
      );

      // Add cancel fields to order_lines table
      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'is_cancelled',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: 'Indicates if this order line is cancelled',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_quantity',
        {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
          defaultValue: 0,
          comment: 'Quantity that was cancelled for this line',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_subtotal',
        {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: true,
          defaultValue: 0.00,
          comment: 'Financial impact of cancelled quantity',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancel_history',
        {
          type: Sequelize.JSONB,
          allowNull: true,
          comment: 'OrderLineCancelHistory array with timestamps, reasons, quantities',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancel_reason',
        {
          type: Sequelize.JSONB,
          allowNull: true,
          comment: 'Line-specific cancel reason object',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancel_comments',
        {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: 'Line-specific cancel comments',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_date',
        {
          type: Sequelize.DATE,
          allowNull: true,
          comment: 'Date when this line was cancelled',
        },
        { transaction }
      );

      await queryInterface.addColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_total_discounts',
        {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: true,
          defaultValue: 0.00,
          comment: 'Total discounts for cancelled items',
        },
        { transaction }
      );

      // Add indexes for better query performance
      await queryInterface.addIndex(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        ['is_cancelled'],
        {
          name: 'idx_orders_is_cancelled',
          using: 'BTREE',
          transaction,
        }
      );

      await queryInterface.addIndex(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        ['cancelled_date'],
        {
          name: 'idx_orders_cancelled_date',
          using: 'BTREE',
          transaction,
        }
      );

      await queryInterface.addIndex(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        ['is_cancelled'],
        {
          name: 'idx_order_lines_is_cancelled',
          using: 'BTREE',
          transaction,
        }
      );

      await queryInterface.addIndex(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'is_cancelled'],
        {
          name: 'idx_order_lines_order_id_cancelled',
          using: 'BTREE',
          transaction,
        }
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
      // Remove indexes first
      await queryInterface.removeIndex(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'idx_orders_is_cancelled',
        { transaction }
      );

      await queryInterface.removeIndex(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'idx_orders_cancelled_date',
        { transaction }
      );

      await queryInterface.removeIndex(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'idx_order_lines_is_cancelled',
        { transaction }
      );

      await queryInterface.removeIndex(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'idx_order_lines_order_id_cancelled',
        { transaction }
      );

      // Remove columns from orders table
      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'is_cancelled',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancel_line_count',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancelled_order_subtotal',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancel_reason',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancel_comments',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'process_type',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        'cancelled_date',
        { transaction }
      );

      // Remove columns from order_lines table
      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'is_cancelled',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_quantity',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_subtotal',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancel_history',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancel_reason',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancel_comments',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_date',
        { transaction }
      );

      await queryInterface.removeColumn(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        'cancelled_total_discounts',
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};