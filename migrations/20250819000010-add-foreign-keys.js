'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Add foreign key: order_lines.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_order_lines_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: payments.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'payments', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_payments_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: payment_methods.payment_id -> payments.id
      await queryInterface.addConstraint(
        { tableName: 'payment_methods', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['payment_id'],
          type: 'foreign key',
          name: 'fk_payment_methods_payment_id',
          references: {
            table: {
              tableName: 'payments',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: payment_methods.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'payment_methods', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_payment_methods_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: payment_transactions.payment_method_id -> payment_methods.id
      await queryInterface.addConstraint(
        {
          tableName: 'payment_transactions',
          schema: process.env.DATABASE_SCHEMA,
        },
        {
          fields: ['payment_method_id'],
          type: 'foreign key',
          name: 'fk_payment_transactions_payment_method_id',
          references: {
            table: {
              tableName: 'payment_methods',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: payment_transactions.order_id -> orders.order_id
      await queryInterface.addConstraint(
        {
          tableName: 'payment_transactions',
          schema: process.env.DATABASE_SCHEMA,
        },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_payment_transactions_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: quantity_details.order_line_id -> order_lines.id
      await queryInterface.addConstraint(
        { tableName: 'quantity_details', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_line_id'],
          type: 'foreign key',
          name: 'fk_quantity_details_order_line_id',
          references: {
            table: {
              tableName: 'order_lines',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: quantity_details.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'quantity_details', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_quantity_details_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: allocations.order_line_id -> order_lines.id
      await queryInterface.addConstraint(
        { tableName: 'allocations', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_line_id'],
          type: 'foreign key',
          name: 'fk_allocations_order_line_id',
          references: {
            table: {
              tableName: 'order_lines',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: allocations.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'allocations', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_allocations_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: releases.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'releases', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_releases_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: release_lines.release_id -> releases.id
      await queryInterface.addConstraint(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['release_id'],
          type: 'foreign key',
          name: 'fk_release_lines_release_id',
          references: {
            table: {
              tableName: 'releases',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: release_lines.order_line_id -> order_lines.id
      await queryInterface.addConstraint(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_line_id'],
          type: 'foreign key',
          name: 'fk_release_lines_order_line_id',
          references: {
            table: {
              tableName: 'order_lines',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add foreign key: release_lines.order_id -> orders.order_id
      await queryInterface.addConstraint(
        { tableName: 'release_lines', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['order_id'],
          type: 'foreign key',
          name: 'fk_release_lines_order_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'order_id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add self-referencing foreign key: orders.parent_id -> orders.id
      await queryInterface.addConstraint(
        { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['parent_id'],
          type: 'foreign key',
          name: 'fk_orders_parent_id',
          references: {
            table: { tableName: 'orders', schema: process.env.DATABASE_SCHEMA },
            field: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          transaction,
        },
      );

      // Add self-referencing foreign key: order_lines.parent_id -> order_lines.id
      await queryInterface.addConstraint(
        { tableName: 'order_lines', schema: process.env.DATABASE_SCHEMA },
        {
          fields: ['parent_id'],
          type: 'foreign key',
          name: 'fk_order_lines_parent_id',
          references: {
            table: {
              tableName: 'order_lines',
              schema: process.env.DATABASE_SCHEMA,
            },
            field: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
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
      // Remove foreign key constraints in reverse order
      const constraints = [
        'fk_order_lines_parent_id',
        'fk_orders_parent_id',
        'fk_release_lines_order_id',
        'fk_release_lines_order_line_id',
        'fk_release_lines_release_id',
        'fk_releases_order_id',
        'fk_allocations_order_id',
        'fk_allocations_order_line_id',
        'fk_quantity_details_order_id',
        'fk_quantity_details_order_line_id',
        'fk_payment_transactions_order_id',
        'fk_payment_transactions_payment_method_id',
        'fk_payment_methods_order_id',
        'fk_payment_methods_payment_id',
        'fk_payments_order_id',
        'fk_order_lines_order_id',
      ];
      const tables = [
        'order_lines',
        'orders',
        'release_lines',
        'release_lines',
        'release_lines',
        'releases',
        'allocations',
        'allocations',
        'quantity_details',
        'quantity_details',
        'payment_transactions',
        'payment_transactions',
        'payment_methods',
        'payment_methods',
        'payments',
        'order_lines',
      ];

      for (let i = 0; i < constraints.length; i++) {
        await queryInterface.removeConstraint(
          { tableName: tables[i], schema: process.env.DATABASE_SCHEMA },
          constraints[i],
          { transaction },
        );
      }

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
