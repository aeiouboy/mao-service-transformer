-- Migration: Create migration state tracking
-- Version: 001
-- Description: Create migration state tracking table for up/down migration management
-- Author: System
-- Date: 2025-01-15

-- =============================================================================
-- UP MIGRATION
-- =============================================================================

-- UP: Create migration state tracking table
CREATE TABLE IF NOT EXISTS migration_state (
    id SERIAL PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    version INTEGER NOT NULL,
    description TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    execution_time_ms INTEGER,
    checksum VARCHAR(64),
    status VARCHAR(20) DEFAULT 'completed',
    rollback_sql TEXT,
    created_by VARCHAR(100) DEFAULT 'system'
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_migration_state_name ON migration_state(migration_name);
CREATE INDEX IF NOT EXISTS idx_migration_state_version ON migration_state(version);
CREATE INDEX IF NOT EXISTS idx_migration_state_status ON migration_state(status);

-- Insert this migration record
INSERT INTO migration_state (migration_name, version, description, checksum, rollback_sql) 
VALUES (
    '001_create_migration_state',
    1,
    'Create migration state tracking table for up/down migration management',
    md5('001_create_migration_state_v1'),
    'DROP TABLE IF EXISTS migration_state CASCADE;'
) ON CONFLICT (migration_name) DO NOTHING;

-- =============================================================================
-- DOWN MIGRATION (ROLLBACK)
-- =============================================================================

/*
-- DOWN: Remove migration state tracking table
DROP TABLE IF EXISTS migration_state CASCADE;
*/

-- =============================================================================
-- MIGRATION METADATA
-- =============================================================================

/*
MIGRATION_INFO = {
    "name": "001_create_migration_state",
    "version": 1,
    "description": "Create migration state tracking table for up/down migration management",
    "dependencies": [],
    "rollback_safe": true,
    "estimated_time": "< 1 second",
    "tables_created": ["migration_state"],
    "tables_modified": [],
    "indexes_created": ["idx_migration_state_name", "idx_migration_state_version", "idx_migration_state_status"],
    "functions_created": [],
    "data_migration": false
}
*/