'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // 1. orders table - Composite UNIQUE index (order_id + parent_id + org_id)
      await queryInterface.addIndex(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'parent_id', 'org_id'],
        {
          name: 'idx_orders_order_parent_org_unique',
          unique: true,
          transaction,
        },
      );

      // 2. order_lines table - Composite UNIQUE index (order_id + parent_id)
      await queryInterface.addIndex(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        ['order_id', 'parent_id'],
        {
          name: 'idx_order_lines_order_parent_unique',
          unique: true,
          transaction,
        },
      );

      // 3. order_lines table - BTREE index on item_id
      await queryInterface.addIndex(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        ['item_id'],
        {
          name: 'idx_order_lines_item_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 4. payment_methods table - BTREE index on order_id
      await queryInterface.addIndex(
        { tableName: 'payment_methods', schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_payment_methods_order_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 5. payment_methods table - UNIQUE index on payment_method_id
      await queryInterface.addIndex(
        { tableName: 'payment_methods', schema: process.env.DATABASE_SCHEMA },
        ['payment_method_id'],
        {
          name: 'idx_payment_methods_payment_method_id_unique',
          unique: true,
          transaction,
        },
      );

      // 6. payment_transactions table - BTREE index on order_id
      await queryInterface.addIndex(
        {
          tableName: 'payment_transactions',
          schema: process.env.DATABASE_SCHEMA,
        },
        ['order_id'],
        {
          name: 'idx_payment_transactions_order_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 7. payment_transactions table - UNIQUE index on payment_transaction_id
      await queryInterface.addIndex(
        {
          tableName: 'payment_transactions',
          schema: process.env.DATABASE_SCHEMA,
        },
        ['payment_transaction_id'],
        {
          name: 'idx_payment_transactions_payment_transaction_id_unique',
          unique: true,
          transaction,
        },
      );

      // 8. quantity_details table - BTREE index on order_id
      await queryInterface.addIndex(
        { tableName: 'quantity_details', schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_quantity_details_order_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 9. quantity_details table - BTREE index on order_line_id
      await queryInterface.addIndex(
        { tableName: 'quantity_details', schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_quantity_details_order_line_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 10. quantity_details table - UNIQUE index on quantity_detail_id
      await queryInterface.addIndex(
        { tableName: 'quantity_details', schema: process.env.DATABASE_SCHEMA },
        ['quantity_detail_id'],
        {
          name: 'idx_quantity_details_quantity_detail_id_unique',
          unique: true,
          transaction,
        },
      );

      // 11. allocations table - BTREE index on order_id
      await queryInterface.addIndex(
        { tableName: 'allocations', schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_allocations_order_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 12. allocations table - BTREE index on order_line_id
      await queryInterface.addIndex(
        { tableName: 'allocations', schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_allocations_order_line_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 13. allocations table - BTREE index on allocation_id
      await queryInterface.addIndex(
        { tableName: 'allocations', schema: process.env.DATABASE_SCHEMA },
        ['allocation_id'],
        {
          name: 'idx_allocations_allocation_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 14. releases table - BTREE index on order_id
      await queryInterface.addIndex(
        { tableName: 'releases', schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_releases_order_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 15. releases table - UNIQUE index on release_id
      await queryInterface.addIndex(
        { tableName: 'releases', schema: process.env.DATABASE_SCHEMA },
        ['release_id'],
        {
          name: 'idx_releases_release_id_unique',
          unique: true,
          transaction,
        },
      );

      // 16. release_lines table - BTREE index on order_id
      await queryInterface.addIndex(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        ['order_id'],
        {
          name: 'idx_release_lines_order_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 17. release_lines table - BTREE index on order_line_id
      await queryInterface.addIndex(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        ['order_line_id'],
        {
          name: 'idx_release_lines_order_line_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 18. release_lines table - BTREE index on release_id
      await queryInterface.addIndex(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        ['release_id'],
        {
          name: 'idx_release_lines_release_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 19. release_lines table - BTREE index on release_line_id
      await queryInterface.addIndex(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        ['release_line_id'],
        {
          name: 'idx_release_lines_release_line_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 20. release_lines table - BTREE index on allocation_id
      await queryInterface.addIndex(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        ['allocation_id'],
        {
          name: 'idx_release_lines_allocation_id_btree',
          using: 'BTREE',
          transaction,
        },
      );

      // 21. fulfillment_details table - BTREE index on fulfillment_id
      await queryInterface.addIndex(
        {
          tableName: 'fulfillment_details',
          schema: process.env.DATABASE_SCHEMA,
        },
        ['fulfillment_id'],
        {
          name: 'idx_fulfillment_details_fulfillment_id_btree',
          using: 'BTREE',
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
      // Drop all indexes in reverse order
      const indexesToDrop = [
        'idx_fulfillment_details_fulfillment_id_btree',
        'idx_release_lines_allocation_id_btree',
        'idx_release_lines_release_line_id_btree',
        'idx_release_lines_release_id_btree',
        'idx_release_lines_order_line_id_btree',
        'idx_release_lines_order_id_btree',
        'idx_releases_release_id_unique',
        'idx_releases_order_id_btree',
        'idx_allocations_allocation_id_btree',
        'idx_allocations_order_line_id_btree',
        'idx_allocations_order_id_btree',
        'idx_quantity_details_quantity_detail_id_unique',
        'idx_quantity_details_order_line_id_btree',
        'idx_quantity_details_order_id_btree',
        'idx_payment_transactions_payment_transaction_id_unique',
        'idx_payment_transactions_order_id_btree',
        'idx_payment_methods_payment_method_id_unique',
        'idx_payment_methods_order_id_btree',
        'idx_order_lines_item_id_btree',
        'idx_order_lines_order_parent_unique',
        'idx_orders_order_parent_org_unique',
      ];

      for (const indexName of indexesToDrop) {
        try {
          await queryInterface.removeIndex(
            { tableName: 'tables', schema: process.env.DATABASE_SCHEMA },
            indexName,
            { transaction },
          );
        } catch (error) {
          // Continue if index doesn't exist - log the specific error
          console.log(
            `Index ${indexName} may not exist: ${error.message}, continuing...`,
          );
        }
      }

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
