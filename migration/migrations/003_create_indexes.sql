-- Migration: Create performance indexes
-- Version: 003
-- Description: Create all performance indexes for optimal query performance
-- Author: System
-- Date: 2025-01-15

-- =============================================================================
-- UP MIGRATION
-- =============================================================================

BEGIN;

-- UP: Create performance indexes

-- ============================================================================= 
-- 1. ORDERS TABLE INDEXES
-- =============================================================================

-- Primary business key (unique constraint already exists)
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_short_order_number ON orders(short_order_number);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_fulfillment_status ON orders(fulfillment_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_captured_date ON orders(captured_date);
CREATE INDEX IF NOT EXISTS idx_orders_org_id ON orders(org_id);
CREATE INDEX IF NOT EXISTS idx_orders_bu ON orders(bu);
CREATE INDEX IF NOT EXISTS idx_orders_selling_channel ON orders(selling_channel);
CREATE INDEX IF NOT EXISTS idx_orders_is_active ON orders(is_active);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_orders_status_composite ON orders(order_status, fulfillment_status, payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_composite ON orders(customer_id, order_status);
CREATE INDEX IF NOT EXISTS idx_orders_date_status ON orders(captured_date, order_status);

-- =============================================================================
-- 2. ORDER_LINES TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_order_lines_order_id ON order_lines(order_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_order_lines_item_id ON order_lines(item_id);
CREATE INDEX IF NOT EXISTS idx_order_lines_fulfillment_status ON order_lines(fulfillment_status);
CREATE INDEX IF NOT EXISTS idx_order_lines_shipping_method_id ON order_lines(shipping_method_id);
CREATE INDEX IF NOT EXISTS idx_order_lines_release_group_id ON order_lines(release_group_id);
CREATE INDEX IF NOT EXISTS idx_order_lines_is_active ON order_lines(is_active);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_order_lines_order_item ON order_lines(order_id, item_id);
CREATE INDEX IF NOT EXISTS idx_order_lines_order_status ON order_lines(order_id, fulfillment_status);

-- =============================================================================
-- 3. PAYMENTS TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);

-- =============================================================================
-- 4. PAYMENT_METHODS TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_payment_methods_order_id ON payment_methods(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_payment_id ON payment_methods(payment_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_payment_methods_payment_method_id ON payment_methods(payment_method_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_gateway_id ON payment_methods(gateway_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_currency_code ON payment_methods(currency_code);

-- =============================================================================
-- 5. PAYMENT_TRANSACTIONS TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id ON payment_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_payment_method_id ON payment_transactions(payment_method_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_payment_transactions_payment_transaction_id ON payment_transactions(payment_transaction_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_request_id ON payment_transactions(request_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_reconciliation_id ON payment_transactions(reconciliation_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_transaction_date ON payment_transactions(transaction_date);

-- =============================================================================
-- 6. QUANTITY_DETAILS TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_quantity_details_order_id ON quantity_details(order_id);
CREATE INDEX IF NOT EXISTS idx_quantity_details_order_line_id ON quantity_details(order_line_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_quantity_details_quantity_detail_id ON quantity_details(quantity_detail_id);
CREATE INDEX IF NOT EXISTS idx_quantity_details_item_id ON quantity_details(item_id);
CREATE INDEX IF NOT EXISTS idx_quantity_details_status_id ON quantity_details(status_id);
CREATE INDEX IF NOT EXISTS idx_quantity_details_org_id ON quantity_details(org_id);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_quantity_details_order_line_item ON quantity_details(order_line_id, item_id);

-- =============================================================================
-- 7. ALLOCATIONS TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_allocations_order_id ON allocations(order_id);
CREATE INDEX IF NOT EXISTS idx_allocations_order_line_id ON allocations(order_line_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_allocations_allocation_id ON allocations(allocation_id);
CREATE INDEX IF NOT EXISTS idx_allocations_item_id ON allocations(item_id);
CREATE INDEX IF NOT EXISTS idx_allocations_status_id ON allocations(status_id);
CREATE INDEX IF NOT EXISTS idx_allocations_ship_from_location_id ON allocations(ship_from_location_id);
CREATE INDEX IF NOT EXISTS idx_allocations_ship_to_location_id ON allocations(ship_to_location_id);
CREATE INDEX IF NOT EXISTS idx_allocations_carrier_code ON allocations(carrier_code);
CREATE INDEX IF NOT EXISTS idx_allocations_org_id ON allocations(org_id);
CREATE INDEX IF NOT EXISTS idx_allocations_inventory_segment_id ON allocations(inventory_segment_id);
CREATE INDEX IF NOT EXISTS idx_allocations_allocation_type ON allocations(allocation_type);

-- Date indexes for delivery tracking
CREATE INDEX IF NOT EXISTS idx_allocations_earliest_delivery_date ON allocations(earliest_delivery_date);
CREATE INDEX IF NOT EXISTS idx_allocations_committed_delivery_date ON allocations(committed_delivery_date);
CREATE INDEX IF NOT EXISTS idx_allocations_allocated_on ON allocations(allocated_on);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_allocations_order_line_item ON allocations(order_line_id, item_id);
CREATE INDEX IF NOT EXISTS idx_allocations_location_status ON allocations(ship_from_location_id, status_id);

-- =============================================================================
-- 8. RELEASES TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_releases_order_id ON releases(order_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_releases_release_id ON releases(release_id);
CREATE INDEX IF NOT EXISTS idx_releases_release_number ON releases(release_number);
CREATE INDEX IF NOT EXISTS idx_releases_warehouse_id ON releases(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_releases_status_id ON releases(status_id);
CREATE INDEX IF NOT EXISTS idx_releases_carrier_code ON releases(carrier_code);
CREATE INDEX IF NOT EXISTS idx_releases_tracking_number ON releases(tracking_number);
CREATE INDEX IF NOT EXISTS idx_releases_org_id ON releases(org_id);

-- Date indexes for shipping tracking
CREATE INDEX IF NOT EXISTS idx_releases_release_date ON releases(release_date);
CREATE INDEX IF NOT EXISTS idx_releases_expected_ship_date ON releases(expected_ship_date);
CREATE INDEX IF NOT EXISTS idx_releases_actual_ship_date ON releases(actual_ship_date);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_releases_warehouse_status ON releases(warehouse_id, status_id);
CREATE INDEX IF NOT EXISTS idx_releases_order_warehouse ON releases(order_id, warehouse_id);

-- =============================================================================
-- 9. RELEASE_LINES TABLE INDEXES
-- =============================================================================

-- Foreign key relationships
CREATE INDEX IF NOT EXISTS idx_release_lines_order_id ON release_lines(order_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_release_id ON release_lines(release_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_order_line_id ON release_lines(order_line_id);

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_release_lines_release_line_id ON release_lines(release_line_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_item_id ON release_lines(item_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_status_id ON release_lines(status_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_location_id ON release_lines(location_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_warehouse_id ON release_lines(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_line_status ON release_lines(line_status);
CREATE INDEX IF NOT EXISTS idx_release_lines_org_id ON release_lines(org_id);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_release_lines_release_item ON release_lines(release_id, item_id);
CREATE INDEX IF NOT EXISTS idx_release_lines_warehouse_status ON release_lines(warehouse_id, line_status);
CREATE INDEX IF NOT EXISTS idx_release_lines_order_line_release ON release_lines(order_line_id, release_id);

-- =============================================================================
-- JSONB FIELD OPTIMIZATION (GIN Indexes)
-- =============================================================================

-- Orders JSONB indexes
CREATE INDEX IF NOT EXISTS idx_orders_doc_type_gin ON orders USING GIN (doc_type);
CREATE INDEX IF NOT EXISTS idx_orders_order_actions_gin ON orders USING GIN (order_actions);
CREATE INDEX IF NOT EXISTS idx_orders_order_hold_gin ON orders USING GIN (order_hold);

-- Order Lines JSONB indexes  
CREATE INDEX IF NOT EXISTS idx_order_lines_delivery_method_gin ON order_lines USING GIN (delivery_method);
CREATE INDEX IF NOT EXISTS idx_order_lines_ship_to_address_gin ON order_lines USING GIN (ship_to_address);

-- Payment Methods JSONB indexes
CREATE INDEX IF NOT EXISTS idx_payment_methods_payment_type_gin ON payment_methods USING GIN (payment_type);
CREATE INDEX IF NOT EXISTS idx_payment_methods_billing_address_gin ON payment_methods USING GIN (billing_address);

-- Payment Transactions JSONB indexes
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status_gin ON payment_transactions USING GIN (status);

-- Quantity Details JSONB indexes
CREATE INDEX IF NOT EXISTS idx_quantity_details_status_gin ON quantity_details USING GIN (status);

-- Allocations JSONB indexes
CREATE INDEX IF NOT EXISTS idx_allocations_extended_gin ON allocations USING GIN (extended);

-- Releases JSONB indexes
CREATE INDEX IF NOT EXISTS idx_releases_status_gin ON releases USING GIN (status);
CREATE INDEX IF NOT EXISTS idx_releases_inventory_attributes_gin ON releases USING GIN (inventory_attributes);

-- Release Lines JSONB indexes
CREATE INDEX IF NOT EXISTS idx_release_lines_status_gin ON release_lines USING GIN (status);
CREATE INDEX IF NOT EXISTS idx_release_lines_inventory_attributes_gin ON release_lines USING GIN (inventory_attributes);

-- Record migration completion
INSERT INTO migration_state (migration_name, version, description, checksum, rollback_sql) 
VALUES (
    '003_create_indexes',
    3,
    'Create all performance indexes for optimal query performance',
    md5('003_create_indexes_v3'),
    $rollback$
-- Drop all created indexes (comprehensive list)
DROP INDEX IF EXISTS idx_release_lines_inventory_attributes_gin;
DROP INDEX IF EXISTS idx_release_lines_status_gin;
DROP INDEX IF EXISTS idx_releases_inventory_attributes_gin;
DROP INDEX IF EXISTS idx_releases_status_gin;
DROP INDEX IF EXISTS idx_allocations_extended_gin;
DROP INDEX IF EXISTS idx_quantity_details_status_gin;
DROP INDEX IF EXISTS idx_payment_transactions_status_gin;
DROP INDEX IF EXISTS idx_payment_methods_billing_address_gin;
DROP INDEX IF EXISTS idx_payment_methods_payment_type_gin;
DROP INDEX IF EXISTS idx_order_lines_ship_to_address_gin;
DROP INDEX IF EXISTS idx_order_lines_delivery_method_gin;
DROP INDEX IF EXISTS idx_orders_order_hold_gin;
DROP INDEX IF EXISTS idx_orders_order_actions_gin;
DROP INDEX IF EXISTS idx_orders_doc_type_gin;
DROP INDEX IF EXISTS idx_release_lines_order_line_release;
DROP INDEX IF EXISTS idx_release_lines_warehouse_status;
DROP INDEX IF EXISTS idx_release_lines_release_item;
DROP INDEX IF EXISTS idx_release_lines_org_id;
DROP INDEX IF EXISTS idx_release_lines_line_status;
DROP INDEX IF EXISTS idx_release_lines_warehouse_id;
DROP INDEX IF EXISTS idx_release_lines_location_id;
DROP INDEX IF EXISTS idx_release_lines_status_id;
DROP INDEX IF EXISTS idx_release_lines_item_id;
DROP INDEX IF EXISTS idx_release_lines_release_line_id;
DROP INDEX IF EXISTS idx_release_lines_order_line_id;
DROP INDEX IF EXISTS idx_release_lines_release_id;
DROP INDEX IF EXISTS idx_release_lines_order_id;
DROP INDEX IF EXISTS idx_releases_order_warehouse;
DROP INDEX IF EXISTS idx_releases_warehouse_status;
DROP INDEX IF EXISTS idx_releases_actual_ship_date;
DROP INDEX IF EXISTS idx_releases_expected_ship_date;
DROP INDEX IF EXISTS idx_releases_release_date;
DROP INDEX IF EXISTS idx_releases_org_id;
DROP INDEX IF EXISTS idx_releases_tracking_number;
DROP INDEX IF EXISTS idx_releases_carrier_code;
DROP INDEX IF EXISTS idx_releases_status_id;
DROP INDEX IF EXISTS idx_releases_warehouse_id;
DROP INDEX IF EXISTS idx_releases_release_number;
DROP INDEX IF EXISTS idx_releases_release_id;
DROP INDEX IF EXISTS idx_releases_order_id;
DROP INDEX IF EXISTS idx_allocations_location_status;
DROP INDEX IF EXISTS idx_allocations_order_line_item;
DROP INDEX IF EXISTS idx_allocations_allocated_on;
DROP INDEX IF EXISTS idx_allocations_committed_delivery_date;
DROP INDEX IF EXISTS idx_allocations_earliest_delivery_date;
DROP INDEX IF EXISTS idx_allocations_allocation_type;
DROP INDEX IF EXISTS idx_allocations_inventory_segment_id;
DROP INDEX IF EXISTS idx_allocations_org_id;
DROP INDEX IF EXISTS idx_allocations_carrier_code;
DROP INDEX IF EXISTS idx_allocations_ship_to_location_id;
DROP INDEX IF EXISTS idx_allocations_ship_from_location_id;
DROP INDEX IF EXISTS idx_allocations_status_id;
DROP INDEX IF EXISTS idx_allocations_item_id;
DROP INDEX IF EXISTS idx_allocations_allocation_id;
DROP INDEX IF EXISTS idx_allocations_order_line_id;
DROP INDEX IF EXISTS idx_allocations_order_id;
DROP INDEX IF EXISTS idx_quantity_details_order_line_item;
DROP INDEX IF EXISTS idx_quantity_details_org_id;
DROP INDEX IF EXISTS idx_quantity_details_status_id;
DROP INDEX IF EXISTS idx_quantity_details_item_id;
DROP INDEX IF EXISTS idx_quantity_details_quantity_detail_id;
DROP INDEX IF EXISTS idx_quantity_details_order_line_id;
DROP INDEX IF EXISTS idx_quantity_details_order_id;
DROP INDEX IF EXISTS idx_payment_transactions_transaction_date;
DROP INDEX IF EXISTS idx_payment_transactions_reconciliation_id;
DROP INDEX IF EXISTS idx_payment_transactions_request_id;
DROP INDEX IF EXISTS idx_payment_transactions_payment_transaction_id;
DROP INDEX IF EXISTS idx_payment_transactions_payment_method_id;
DROP INDEX IF EXISTS idx_payment_transactions_order_id;
DROP INDEX IF EXISTS idx_payment_methods_currency_code;
DROP INDEX IF EXISTS idx_payment_methods_gateway_id;
DROP INDEX IF EXISTS idx_payment_methods_payment_method_id;
DROP INDEX IF EXISTS idx_payment_methods_payment_id;
DROP INDEX IF EXISTS idx_payment_methods_order_id;
DROP INDEX IF EXISTS idx_payments_order_id;
DROP INDEX IF EXISTS idx_order_lines_order_status;
DROP INDEX IF EXISTS idx_order_lines_order_item;
DROP INDEX IF EXISTS idx_order_lines_is_active;
DROP INDEX IF EXISTS idx_order_lines_release_group_id;
DROP INDEX IF EXISTS idx_order_lines_shipping_method_id;
DROP INDEX IF EXISTS idx_order_lines_fulfillment_status;
DROP INDEX IF EXISTS idx_order_lines_item_id;
DROP INDEX IF EXISTS idx_order_lines_order_id;
DROP INDEX IF EXISTS idx_orders_date_status;
DROP INDEX IF EXISTS idx_orders_customer_composite;
DROP INDEX IF EXISTS idx_orders_status_composite;
DROP INDEX IF EXISTS idx_orders_is_active;
DROP INDEX IF EXISTS idx_orders_selling_channel;
DROP INDEX IF EXISTS idx_orders_bu;
DROP INDEX IF EXISTS idx_orders_org_id;
DROP INDEX IF EXISTS idx_orders_captured_date;
DROP INDEX IF EXISTS idx_orders_customer_email;
DROP INDEX IF EXISTS idx_orders_customer_id;
DROP INDEX IF EXISTS idx_orders_payment_status;
DROP INDEX IF EXISTS idx_orders_fulfillment_status;
DROP INDEX IF EXISTS idx_orders_order_status;
DROP INDEX IF EXISTS idx_orders_short_order_number;
DROP INDEX IF EXISTS idx_orders_order_id;
    $rollback$
) ON CONFLICT (migration_name) DO NOTHING;

COMMIT;

-- =============================================================================
-- DOWN MIGRATION (ROLLBACK)
-- =============================================================================

/*
-- DOWN: Drop all created indexes
-- (See rollback_sql above for complete list)
*/

-- =============================================================================
-- MIGRATION METADATA
-- =============================================================================

/*
MIGRATION_INFO = {
    "name": "003_create_indexes",
    "version": 3,
    "description": "Create all performance indexes for optimal query performance",
    "dependencies": ["002_create_core_tables"],
    "rollback_safe": true,
    "estimated_time": "30-60 seconds",
    "tables_created": [],
    "tables_modified": [],
    "indexes_created": [
        "65+ B-tree indexes for core tables",
        "18 GIN indexes for JSONB optimization",
        "Multiple composite indexes for query patterns"
    ],
    "functions_created": [],
    "data_migration": false
}
*/