-- Migration: Create core order management tables
-- Version: 002
-- Description: Create the 9 core entities for order management system
-- Author: System
-- Date: 2025-01-15

-- =============================================================================
-- UP MIGRATION
-- =============================================================================

BEGIN;

-- UP: Create core order management tables

-- 1. ORDERS TABLE (Main order container)
CREATE TABLE orders (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    short_order_number VARCHAR(50),
    
    -- Core Order Fields
    bu VARCHAR(10),
    captured_date TIMESTAMP,
    currency_code VARCHAR(3),
    customer_id VARCHAR(255),
    customer_email VARCHAR(255),
    do_not_release_before TIMESTAMP,
    customer_first_name VARCHAR(255),
    customer_last_name VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_type_id VARCHAR(100),
    is_on_hold BOOLEAN,
    order_locale VARCHAR(10),
    cancel_allowed BOOLEAN,
    alternate_order_id VARCHAR(255),
    org_id VARCHAR(10),
    selling_channel VARCHAR(100),
    order_status VARCHAR(50),
    fulfillment_status VARCHAR(50),
    payment_status VARCHAR(50),
    
    -- JSONB Fields for flexible metadata
    doc_type JSONB,
    order_hold JSONB,
    order_actions JSONB,
    order_extension1 JSONB,
    order_charge_detail JSONB,
    order_tax_detail JSONB,
    order_type JSONB,
    order_note JSONB,
    change_log JSONB,
    
    -- Hierarchy and Status
    parent_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 2. ORDER_LINES TABLE (Order line items)
CREATE TABLE order_lines (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    order_line_id VARCHAR(50),
    
    -- Core Line Fields
    item_id VARCHAR(255),
    is_gift BOOLEAN,
    is_tax_included BOOLEAN,
    promised_delivery_date TIMESTAMP,
    uom VARCHAR(10),
    quantity DECIMAL(10,2),
    unit_price DECIMAL(10,2),
    original_unit_price DECIMAL(10,2),
    shipping_method_id VARCHAR(100),
    release_group_id VARCHAR(255),
    fulfillment_status VARCHAR(50),
    
    -- JSONB Fields for flexible metadata
    delivery_method JSONB,
    order_line_note JSONB,
    order_line_charge_detail JSONB,
    order_line_tax_detail JSONB,
    order_line_promising_info JSONB,
    ship_to_address JSONB,
    order_line_extension1 JSONB,
    change_log JSONB,
    
    -- Hierarchy and Status
    parent_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 3. PAYMENTS TABLE (Payment root level)
CREATE TABLE payments (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    
    -- JSONB Fields
    processing_mode JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 4. PAYMENT_METHODS TABLE (Payment method details)
CREATE TABLE payment_methods (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    payment_id INTEGER,
    order_id VARCHAR(255) NOT NULL,
    
    -- Core Payment Method Fields
    payment_method_id VARCHAR(255),
    amount DECIMAL(10,2),
    currency_code VARCHAR(3),
    gateway_id VARCHAR(100),
    current_settled_amount DECIMAL(10,2),
    is_copied BOOLEAN,
    is_modifiable BOOLEAN,
    is_suspended BOOLEAN,
    is_voided BOOLEAN,
    
    -- JSONB Fields
    payment_type JSONB,
    billing_address JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 5. PAYMENT_TRANSACTIONS TABLE (Payment transaction details)
CREATE TABLE payment_transactions (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    payment_method_id INTEGER,
    order_id VARCHAR(255) NOT NULL,
    
    -- Core Transaction Fields
    payment_transaction_id VARCHAR(255),
    is_activation BOOLEAN,
    is_active BOOLEAN,
    is_copied BOOLEAN,
    is_valid_for_refund BOOLEAN,
    reconciliation_id VARCHAR(255),
    request_id VARCHAR(255),
    request_token VARCHAR(255),
    processed_amount DECIMAL(10,2),
    transaction_date TIMESTAMP,
    requested_amount DECIMAL(10,2),
    
    -- JSONB Fields
    payment_response_status JSONB,
    status JSONB,
    transmission_status JSONB,
    transaction_type JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 6. QUANTITY_DETAILS TABLE (Quantity detail tracking)
CREATE TABLE quantity_details (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    order_line_id INTEGER,
    order_id VARCHAR(255),
    
    -- Core Quantity Fields
    quantity_detail_id VARCHAR(255),
    status_id VARCHAR(50),
    process VARCHAR(100),
    item_id VARCHAR(255),
    quantity INTEGER,
    uom VARCHAR(20),
    reason VARCHAR(255),
    reason_type VARCHAR(100),
    substitution_ratio DECIMAL(10,3),
    substitution_type VARCHAR(100),
    web_url VARCHAR(500),
    org_id VARCHAR(50),
    
    -- JSONB Fields
    status JSONB,
    change_log JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 7. ALLOCATIONS TABLE (Allocation tracking)
CREATE TABLE allocations (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    order_line_id INTEGER,
    order_id VARCHAR(255),
    
    -- Core Allocation Fields
    allocation_id VARCHAR(255),
    allocation_type VARCHAR(50),
    status_id VARCHAR(50),
    process VARCHAR(100),
    item_id VARCHAR(255),
    quantity INTEGER,
    uom VARCHAR(20),
    is_virtual BOOLEAN,
    ship_from_location_id VARCHAR(100),
    ship_to_location_id VARCHAR(100),
    ship_via_id VARCHAR(100),
    carrier_code VARCHAR(100),
    earliest_delivery_date TIMESTAMP,
    earliest_ship_date TIMESTAMP,
    committed_delivery_date TIMESTAMP,
    committed_ship_date TIMESTAMP,
    latest_ship_date TIMESTAMP,
    latest_release_date TIMESTAMP,
    allocated_on TIMESTAMP,
    batch_number VARCHAR(100),
    reservation_request_id VARCHAR(255),
    reservation_request_detail_id VARCHAR(255),
    org_id VARCHAR(50),
    country_of_origin VARCHAR(50),
    inventory_segment_id VARCHAR(100),
    inventory_type_id VARCHAR(100),
    substitution_type_id VARCHAR(100),
    allocation_dependency_id VARCHAR(100),
    group_id VARCHAR(100),
    product_status_id VARCHAR(100),
    asn_id VARCHAR(100),
    asn_detail_id VARCHAR(100),
    
    -- JSONB Fields
    extended JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 8. RELEASES TABLE (Release workflow - consolidated version)
CREATE TABLE releases (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255),
    
    -- Core Release Fields
    release_id VARCHAR(255),
    release_number VARCHAR(100),
    process VARCHAR(100),
    org_id VARCHAR(50),
    status_id VARCHAR(50),
    release_date TIMESTAMP,
    expected_ship_date TIMESTAMP,
    actual_ship_date TIMESTAMP,
    warehouse_id VARCHAR(100),
    carrier_code VARCHAR(100),
    tracking_number VARCHAR(200),
    ship_from_location_id VARCHAR(100),
    ship_to_location_id VARCHAR(100),
    ship_via_id VARCHAR(100),
    earliest_delivery_date TIMESTAMP,
    earliest_ship_date TIMESTAMP,
    committed_delivery_date TIMESTAMP,
    committed_ship_date TIMESTAMP,
    latest_ship_date TIMESTAMP,
    latest_release_date TIMESTAMP,
    allocated_on TIMESTAMP,
    quantity INTEGER,
    uom VARCHAR(20),
    is_virtual BOOLEAN,
    batch_number VARCHAR(100),
    reservation_request_id VARCHAR(255),
    reservation_request_detail_id VARCHAR(255),
    country_of_origin VARCHAR(50),
    inventory_segment_id VARCHAR(100),
    inventory_type_id VARCHAR(100),
    substitution_type_id VARCHAR(100),
    substitution_ratio DECIMAL(10,3),
    allocation_dependency_id VARCHAR(100),
    group_id VARCHAR(100),
    product_status_id VARCHAR(100),
    asn_id VARCHAR(100),
    asn_detail_id VARCHAR(100),
    po_id VARCHAR(100),
    po_detail_id VARCHAR(100),
    service_level_code VARCHAR(50),
    allocation_type VARCHAR(50),
    
    -- JSONB Fields
    status JSONB,
    inventory_attributes JSONB,
    extended JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- 9. RELEASE_LINES TABLE (Release line details - consolidated version)
CREATE TABLE release_lines (
    -- Primary Key
    id SERIAL PRIMARY KEY,
    release_id INTEGER,
    order_line_id INTEGER,
    order_id VARCHAR(255),
    
    -- Core Release Line Fields
    release_line_id VARCHAR(255),
    item_id VARCHAR(255),
    process VARCHAR(100),
    org_id VARCHAR(50),
    status_id VARCHAR(50),
    quantity INTEGER,
    uom VARCHAR(20),
    reason VARCHAR(255),
    reason_type VARCHAR(100),
    substitution_ratio DECIMAL(10,3),
    substitution_type VARCHAR(100),
    web_url VARCHAR(500),
    location_id VARCHAR(100),
    warehouse_id VARCHAR(100),
    picked_quantity INTEGER,
    packed_quantity INTEGER,
    shipped_quantity INTEGER,
    line_status VARCHAR(50),
    ship_from_location_id VARCHAR(100),
    ship_to_location_id VARCHAR(100),
    ship_via_id VARCHAR(100),
    carrier_code VARCHAR(100),
    earliest_delivery_date TIMESTAMP,
    earliest_ship_date TIMESTAMP,
    committed_delivery_date TIMESTAMP,
    committed_ship_date TIMESTAMP,
    latest_ship_date TIMESTAMP,
    latest_release_date TIMESTAMP,
    allocated_on TIMESTAMP,
    batch_number VARCHAR(100),
    reservation_request_id VARCHAR(255),
    reservation_request_detail_id VARCHAR(255),
    country_of_origin VARCHAR(50),
    inventory_segment_id VARCHAR(100),
    inventory_type_id VARCHAR(100),
    substitution_type_id VARCHAR(100),
    allocation_dependency_id VARCHAR(100),
    group_id VARCHAR(100),
    product_status_id VARCHAR(100),
    asn_id VARCHAR(100),
    asn_detail_id VARCHAR(100),
    po_id VARCHAR(100),
    po_detail_id VARCHAR(100),
    service_level_code VARCHAR(50),
    allocation_type VARCHAR(50),
    is_virtual BOOLEAN,
    
    -- JSONB Fields
    status JSONB,
    inventory_attributes JSONB,
    change_log JSONB,
    extended JSONB,
    
    -- Audit Fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Record migration completion
INSERT INTO migration_state (migration_name, version, description, checksum, rollback_sql) 
VALUES (
    '002_create_core_tables',
    2,
    'Create the 9 core entities for order management system',
    md5('002_create_core_tables_v2'),
    'DROP TABLE IF EXISTS release_lines CASCADE; DROP TABLE IF EXISTS releases CASCADE; DROP TABLE IF EXISTS allocations CASCADE; DROP TABLE IF EXISTS quantity_details CASCADE; DROP TABLE IF EXISTS payment_transactions CASCADE; DROP TABLE IF EXISTS payment_methods CASCADE; DROP TABLE IF EXISTS payments CASCADE; DROP TABLE IF EXISTS order_lines CASCADE; DROP TABLE IF EXISTS orders CASCADE;'
) ON CONFLICT (migration_name) DO NOTHING;

COMMIT;

-- =============================================================================
-- DOWN MIGRATION (ROLLBACK)
-- =============================================================================

/*
-- DOWN: Drop all core tables in reverse dependency order
BEGIN;

DROP TABLE IF EXISTS release_lines CASCADE;
DROP TABLE IF EXISTS releases CASCADE;
DROP TABLE IF EXISTS allocations CASCADE;
DROP TABLE IF EXISTS quantity_details CASCADE;
DROP TABLE IF EXISTS payment_transactions CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_lines CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Remove migration record
DELETE FROM migration_state WHERE migration_name = '002_create_core_tables';

COMMIT;
*/

-- =============================================================================
-- MIGRATION METADATA
-- =============================================================================

/*
MIGRATION_INFO = {
    "name": "002_create_core_tables",
    "version": 2,
    "description": "Create the 9 core entities for order management system",
    "dependencies": ["001_create_migration_state"],
    "rollback_safe": true,
    "estimated_time": "< 5 seconds",
    "tables_created": [
        "orders", "order_lines", "payments", "payment_methods", 
        "payment_transactions", "quantity_details", "allocations", 
        "releases", "release_lines"
    ],
    "tables_modified": [],
    "indexes_created": [],
    "functions_created": [],
    "data_migration": false
}
*/