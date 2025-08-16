-- Migration: Create JSONB utility functions and optimizations
-- Version: 004
-- Description: Add JSONB utility functions, views, and optimization tools
-- Author: System
-- Date: 2025-01-15

-- =============================================================================
-- UP MIGRATION
-- =============================================================================

BEGIN;

-- UP: Create JSONB utility functions and optimizations

-- =============================================================================
-- 1. JSONB UTILITY FUNCTIONS
-- =============================================================================

-- Function to safely extract JSONB values with defaults
CREATE OR REPLACE FUNCTION safe_jsonb_text(jsonb_field JSONB, path TEXT, default_value TEXT DEFAULT NULL)
RETURNS TEXT AS $$
BEGIN
    RETURN COALESCE(jsonb_field->>path, default_value);
EXCEPTION WHEN OTHERS THEN
    RETURN default_value;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to safely extract JSONB boolean values
CREATE OR REPLACE FUNCTION safe_jsonb_boolean(jsonb_field JSONB, path TEXT, default_value BOOLEAN DEFAULT FALSE)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN COALESCE((jsonb_field->>path)::BOOLEAN, default_value);
EXCEPTION WHEN OTHERS THEN
    RETURN default_value;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to safely extract JSONB numeric values
CREATE OR REPLACE FUNCTION safe_jsonb_numeric(jsonb_field JSONB, path TEXT, default_value NUMERIC DEFAULT 0)
RETURNS NUMERIC AS $$
BEGIN
    RETURN COALESCE((jsonb_field->>path)::NUMERIC, default_value);
EXCEPTION WHEN OTHERS THEN
    RETURN default_value;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =============================================================================
-- 2. EXPRESSION INDEXES FOR JSONB PATHS
-- =============================================================================

-- Orders table JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_orders_doc_type_id ON orders USING BTREE ((doc_type->>'DocTypeId'));
CREATE INDEX IF NOT EXISTS idx_orders_order_actions_priced ON orders USING BTREE ((order_actions->>'IsAlreadyPriced'));
CREATE INDEX IF NOT EXISTS idx_orders_order_hold_status ON orders USING BTREE ((order_hold->>'StatusId'));

-- Order Lines table JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_order_lines_delivery_method_id ON order_lines USING BTREE ((delivery_method->>'DeliveryMethodId'));
CREATE INDEX IF NOT EXISTS idx_order_lines_ship_to_city ON order_lines USING BTREE ((ship_to_address->'Address'->>'City'));
CREATE INDEX IF NOT EXISTS idx_order_lines_ship_to_country ON order_lines USING BTREE ((ship_to_address->'Address'->>'Country'));

-- Payment Methods JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_payment_methods_payment_type_id ON payment_methods USING BTREE ((payment_type->>'PaymentTypeId'));
CREATE INDEX IF NOT EXISTS idx_payment_methods_billing_city ON payment_methods USING BTREE ((billing_address->'Address'->>'City'));

-- Payment Transactions JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status_id ON payment_transactions USING BTREE ((status->>'PaymentTransactionStatusId'));
CREATE INDEX IF NOT EXISTS idx_payment_transactions_response_status ON payment_transactions USING BTREE ((payment_response_status->>'PaymentResponseStatusId'));

-- Quantity Details JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_quantity_details_status_id_jsonb ON quantity_details USING BTREE ((status->>'StatusId'));

-- Releases JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_releases_status_id_jsonb ON releases USING BTREE ((status->>'StatusId'));
CREATE INDEX IF NOT EXISTS idx_releases_inventory_segment ON releases USING BTREE ((inventory_attributes->>'InventorySegmentId'));

-- Release Lines JSONB expression indexes
CREATE INDEX IF NOT EXISTS idx_release_lines_status_id_jsonb ON release_lines USING BTREE ((status->>'StatusId'));
CREATE INDEX IF NOT EXISTS idx_release_lines_inventory_segment ON release_lines USING BTREE ((inventory_attributes->>'InventorySegmentId'));

-- =============================================================================
-- 3. OPTIMIZED VIEWS WITH JSONB EXTRACTION
-- =============================================================================

-- View for commonly accessed order information with JSONB fields extracted
CREATE OR REPLACE VIEW v_orders_extended AS
SELECT 
    o.*,
    safe_jsonb_text(o.doc_type, 'DocTypeId') as doc_type_id,
    safe_jsonb_boolean(o.order_actions, 'IsAlreadyPriced') as is_already_priced,
    safe_jsonb_boolean(o.order_actions, 'IsAlreadyCharged') as is_already_charged,
    safe_jsonb_boolean(o.order_actions, 'IsAlreadyTaxed') as is_already_taxed,
    safe_jsonb_text(o.order_type, 'OrderTypeId') as order_type_id
FROM orders o;

-- View for order lines with extracted shipping address
CREATE OR REPLACE VIEW v_order_lines_shipping AS
SELECT 
    ol.*,
    safe_jsonb_text(ol.delivery_method, 'DeliveryMethodId') as delivery_method_id,
    safe_jsonb_text(ol.ship_to_address->'Address', 'City') as ship_to_city,
    safe_jsonb_text(ol.ship_to_address->'Address', 'State') as ship_to_state,
    safe_jsonb_text(ol.ship_to_address->'Address', 'Country') as ship_to_country,
    safe_jsonb_text(ol.ship_to_address->'Address', 'PostalCode') as ship_to_postal_code
FROM order_lines ol;

-- View for payment methods with extracted details
CREATE OR REPLACE VIEW v_payment_methods_extended AS
SELECT 
    pm.*,
    safe_jsonb_text(pm.payment_type, 'PaymentTypeId') as payment_type_id,
    safe_jsonb_text(pm.billing_address->'Address', 'City') as billing_city,
    safe_jsonb_text(pm.billing_address->'Address', 'State') as billing_state,
    safe_jsonb_text(pm.billing_address->'Address', 'Country') as billing_country
FROM payment_methods pm;

-- =============================================================================
-- 4. JSONB VALIDATION CONSTRAINTS
-- =============================================================================

-- Add JSON schema validation for critical JSONB fields
ALTER TABLE orders ADD CONSTRAINT check_order_doc_type_jsonb 
CHECK (
    doc_type IS NULL OR 
    (doc_type ? 'DocTypeId' AND jsonb_typeof(doc_type->'DocTypeId') = 'string')
);

ALTER TABLE orders ADD CONSTRAINT check_order_actions_jsonb 
CHECK (
    order_actions IS NULL OR 
    (order_actions ? 'IsAlreadyPriced' AND jsonb_typeof(order_actions->'IsAlreadyPriced') = 'boolean')
);

ALTER TABLE order_lines ADD CONSTRAINT check_ship_to_address_jsonb 
CHECK (
    ship_to_address IS NULL OR 
    (ship_to_address ? 'Address' AND jsonb_typeof(ship_to_address->'Address') = 'object')
);

-- =============================================================================
-- 5. JSONB MAINTENANCE FUNCTIONS
-- =============================================================================

-- Procedure to update JSONB field statistics
CREATE OR REPLACE FUNCTION update_jsonb_statistics()
RETURNS void AS $$
BEGIN
    -- Analyze tables with JSONB fields for better query planning
    ANALYZE orders;
    ANALYZE order_lines; 
    ANALYZE payments;
    ANALYZE payment_methods;
    ANALYZE payment_transactions;
    ANALYZE quantity_details;
    ANALYZE allocations;
    ANALYZE releases;
    ANALYZE release_lines;
    
    RAISE NOTICE 'JSONB statistics updated successfully';
END;
$$ LANGUAGE plpgsql;

-- Function to validate JSONB field integrity
CREATE OR REPLACE FUNCTION validate_jsonb_fields()
RETURNS TABLE(table_name TEXT, column_name TEXT, invalid_count BIGINT) AS $$
BEGIN
    -- Check for invalid JSONB in orders
    RETURN QUERY
    SELECT 'orders'::TEXT, 'doc_type'::TEXT, 
           COUNT(*) FROM orders WHERE doc_type IS NOT NULL AND NOT (doc_type ? 'DocTypeId');
    
    RETURN QUERY
    SELECT 'orders'::TEXT, 'order_actions'::TEXT, 
           COUNT(*) FROM orders WHERE order_actions IS NOT NULL AND NOT (order_actions ? 'IsAlreadyPriced');
    
    -- Check for invalid JSONB in order_lines
    RETURN QUERY
    SELECT 'order_lines'::TEXT, 'ship_to_address'::TEXT, 
           COUNT(*) FROM order_lines WHERE ship_to_address IS NOT NULL AND NOT (ship_to_address ? 'Address');
    
END;
$$ LANGUAGE plpgsql;

-- Function to extract commonly used JSONB data for reporting
CREATE OR REPLACE FUNCTION extract_jsonb_summary()
RETURNS TABLE(
    metric TEXT,
    count BIGINT
) AS $$
BEGIN
    -- Document types distribution
    RETURN QUERY
    SELECT 'doc_type_' || doc_type->>'DocTypeId' as metric, COUNT(*)
    FROM orders 
    WHERE doc_type IS NOT NULL AND doc_type ? 'DocTypeId'
    GROUP BY doc_type->>'DocTypeId';
    
    -- Payment types distribution
    RETURN QUERY
    SELECT 'payment_type_' || payment_type->>'PaymentTypeId' as metric, COUNT(*)
    FROM payment_methods 
    WHERE payment_type IS NOT NULL AND payment_type ? 'PaymentTypeId'
    GROUP BY payment_type->>'PaymentTypeId';
    
    -- Delivery methods distribution
    RETURN QUERY
    SELECT 'delivery_method_' || delivery_method->>'DeliveryMethodId' as metric, COUNT(*)
    FROM order_lines 
    WHERE delivery_method IS NOT NULL AND delivery_method ? 'DeliveryMethodId'
    GROUP BY delivery_method->>'DeliveryMethodId';
END;
$$ LANGUAGE plpgsql;

-- Record migration completion
INSERT INTO migration_state (migration_name, version, description, checksum, rollback_sql) 
VALUES (
    '004_create_jsonb_utilities',
    4,
    'Add JSONB utility functions, views, and optimization tools',
    md5('004_create_jsonb_utilities_v4'),
    $rollback$
-- Drop views
DROP VIEW IF EXISTS v_payment_methods_extended;
DROP VIEW IF EXISTS v_order_lines_shipping;
DROP VIEW IF EXISTS v_orders_extended;

-- Drop functions
DROP FUNCTION IF EXISTS extract_jsonb_summary();
DROP FUNCTION IF EXISTS validate_jsonb_fields();
DROP FUNCTION IF EXISTS update_jsonb_statistics();
DROP FUNCTION IF EXISTS safe_jsonb_numeric(JSONB, TEXT, NUMERIC);
DROP FUNCTION IF EXISTS safe_jsonb_boolean(JSONB, TEXT, BOOLEAN);
DROP FUNCTION IF EXISTS safe_jsonb_text(JSONB, TEXT, TEXT);

-- Drop constraints
ALTER TABLE order_lines DROP CONSTRAINT IF EXISTS check_ship_to_address_jsonb;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS check_order_actions_jsonb;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS check_order_doc_type_jsonb;

-- Drop expression indexes
DROP INDEX IF EXISTS idx_release_lines_inventory_segment;
DROP INDEX IF EXISTS idx_release_lines_status_id_jsonb;
DROP INDEX IF EXISTS idx_releases_inventory_segment;
DROP INDEX IF EXISTS idx_releases_status_id_jsonb;
DROP INDEX IF EXISTS idx_quantity_details_status_id_jsonb;
DROP INDEX IF EXISTS idx_payment_transactions_response_status;
DROP INDEX IF EXISTS idx_payment_transactions_status_id;
DROP INDEX IF EXISTS idx_payment_methods_billing_city;
DROP INDEX IF EXISTS idx_payment_methods_payment_type_id;
DROP INDEX IF EXISTS idx_order_lines_ship_to_country;
DROP INDEX IF EXISTS idx_order_lines_ship_to_city;
DROP INDEX IF EXISTS idx_order_lines_delivery_method_id;
DROP INDEX IF EXISTS idx_orders_order_hold_status;
DROP INDEX IF EXISTS idx_orders_order_actions_priced;
DROP INDEX IF EXISTS idx_orders_doc_type_id;
    $rollback$
) ON CONFLICT (migration_name) DO NOTHING;

COMMIT;

-- =============================================================================
-- DOWN MIGRATION (ROLLBACK)
-- =============================================================================

/*
-- DOWN: Remove JSONB utilities and optimizations
-- (See rollback_sql above for complete list)
*/

-- =============================================================================
-- MIGRATION METADATA
-- =============================================================================

/*
MIGRATION_INFO = {
    "name": "004_create_jsonb_utilities",
    "version": 4,
    "description": "Add JSONB utility functions, views, and optimization tools",
    "dependencies": ["003_create_indexes"],
    "rollback_safe": true,
    "estimated_time": "< 10 seconds",
    "tables_created": [],
    "tables_modified": ["orders", "order_lines"],
    "indexes_created": [
        "12 expression indexes for JSONB paths"
    ],
    "functions_created": [
        "safe_jsonb_text", "safe_jsonb_boolean", "safe_jsonb_numeric",
        "update_jsonb_statistics", "validate_jsonb_fields", "extract_jsonb_summary"
    ],
    "views_created": [
        "v_orders_extended", "v_order_lines_shipping", "v_payment_methods_extended"
    ],
    "constraints_added": [
        "check_order_doc_type_jsonb", "check_order_actions_jsonb", "check_ship_to_address_jsonb"
    ],
    "data_migration": false
}
*/