'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Add is_active column to allocations table
      await queryInterface.addColumn(
        { 
          tableName: 'allocations', 
          schema: process.env.DATABASE_SCHEMA || 'order' 
        },
        'is_active',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: 'Whether this allocation record is active/current version'
        },
        { transaction }
      );

      // Add index for is_active to optimize queries filtering active records
      await queryInterface.addIndex(
        { 
          tableName: 'allocations', 
          schema: process.env.DATABASE_SCHEMA || 'order' 
        },
        ['is_active'],
        { 
          using: 'BTREE', 
          transaction,
          name: 'idx_allocations_is_active'
        }
      );

      // Add composite index for order_line_id and is_active for efficient active record queries
      await queryInterface.addIndex(
        { 
          tableName: 'allocations', 
          schema: process.env.DATABASE_SCHEMA || 'order' 
        },
        ['order_line_id', 'is_active'],
        { 
          using: 'BTREE', 
          transaction,
          name: 'idx_allocations_order_line_active'
        }
      );

      await transaction.commit();
      console.log('Successfully added is_active column to allocations table');
    } catch (err) {
      await transaction.rollback();
      console.error('Failed to add is_active column to allocations table:', err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Remove indexes first
      await queryInterface.removeIndex(
        { 
          tableName: 'allocations', 
          schema: process.env.DATABASE_SCHEMA || 'order' 
        },
        'idx_allocations_order_line_active',
        { transaction }
      );

      await queryInterface.removeIndex(
        { 
          tableName: 'allocations', 
          schema: process.env.DATABASE_SCHEMA || 'order' 
        },
        'idx_allocations_is_active',
        { transaction }
      );

      // Remove the column
      await queryInterface.removeColumn(
        { 
          tableName: 'allocations', 
          schema: process.env.DATABASE_SCHEMA || 'order' 
        },
        'is_active',
        { transaction }
      );

      await transaction.commit();
      console.log('Successfully removed is_active column from allocations table');
    } catch (err) {
      await transaction.rollback();
      console.error('Failed to remove is_active column from allocations table:', err);
      throw err;
    }
  },
};