# Migration Adjustment Plan

## **Overview**
Plan to adjust the new migration files to fully support the dynamic service architecture and transformation requirements of the MAO Service Transformer. Updated with comprehensive service-database alignment analysis.

**Date**: 2025-08-16  
**Status**: 📋 **PLANNING** → **READY FOR IMPLEMENTATION**  
**Migration Review Score**: 8.5/10 → **Target: 9.5/10**
**Service Alignment Score**: 7.5/10 → **Target: 9.5/10**

---

## **Current Migration Status**

### ✅ **What's Working Well**
- **Schema Alignment**: Perfect match with PlantUML schema
- **Data Types**: Correct DECIMAL(10,2) for financial fields
- **JSONB Usage**: Proper complex data storage
- **Transaction Handling**: Rollback on errors
- **Audit Fields**: Standard created_at, updated_at, created_by, updated_by
- **Indexes**: Key lookup indexes on order_id, item_id, payment_method_id

### ⚠️ **What Needs Adjustment** (Based on Service Alignment Analysis)
- **Missing Calculated Fields**: Financial totals not stored for performance (CalculationService integration)
- **Missing Product Fields**: Enhanced product support for dynamic extraction (OrderLineTransformationService requirements)
- **Missing Tables**: payment_transactions, quantity_details, releases, release_lines (Service architecture gaps)
- **Missing Indexes**: Service-optimized query indexes (13-service performance optimization)
- **Missing Constraints**: Referential integrity constraints (Domain relationship enforcement)
- **DTO Integration**: Database fields for direct DTO persistence without transformation layer

---

## **Phase 1: Critical Field Additions (HIGH Priority)**

### **1.1 Orders Table Enhancement**
**File**: Create `20250816000001-add-financial-fields-to-orders.js`

**Purpose**: Add calculated financial fields for performance optimization

**Fields to Add**:
```javascript
order_subtotal: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: true,
  defaultValue: 0,
  comment: 'Calculated order subtotal before taxes and shipping'
},
total_charges: {
  type: Sequelize.DECIMAL(10, 2), 
  allowNull: true,
  defaultValue: 0,
  comment: 'Total shipping and handling charges'
},
total_taxes: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: true, 
  defaultValue: 0,
  comment: 'Total tax amount for order'
},
total_discounts: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: true,
  defaultValue: 0,
  comment: 'Total discount amount applied'
},
order_total: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: true,
  defaultValue: 0,
  comment: 'Final order total (subtotal + charges + taxes - discounts)'
}
```

**Business Justification** (Service Architecture Integration):
- **Performance**: Avoid real-time calculation in queries (CalculationService optimization)
- **Reporting**: Enable fast financial analytics (Service layer efficiency)
- **Audit**: Snapshot of financial state at order time (Transformation context preservation)
- **Service Integration**: CalculationService can store results directly to database
- **DTO Alignment**: Support direct persistence of PMPOrderInputDTO and ReleaseOutputDTO structures
- **Orchestrator Efficiency**: OrderTransformationOrchestratorService performance optimization

### **1.2 Order Lines Table Enhancement**
**File**: Create `20250816000002-add-product-fields-to-order-lines.js`

**Purpose**: Support dynamic product extraction from any product type

**Fields to Add**:
```javascript
product_name_en: {
  type: Sequelize.STRING(255),
  allowNull: true,
  comment: 'Product name in English'
},
product_name_th: {
  type: Sequelize.STRING(255), 
  allowNull: true,
  comment: 'Product name in Thai'
},
item_description: {
  type: Sequelize.TEXT,
  allowNull: true,
  comment: 'Product description'
},
item_brand: {
  type: Sequelize.STRING(100),
  allowNull: true,
  comment: 'Product brand name'
},
pack_unit_price: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: true,
  comment: 'Pack-level unit price for bundle calculations'
},
pack_ordered_qty: {
  type: Sequelize.INTEGER,
  allowNull: true, 
  comment: 'Pack-level ordered quantity'
},
bundle_ref_id: {
  type: Sequelize.STRING(255),
  allowNull: true,
  comment: 'Reference ID for bundle products'
},
line_total: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: true,
  defaultValue: 0,
  comment: 'Calculated line total (quantity * unit_price)'
},
image_uri: {
  type: Sequelize.STRING(500),
  allowNull: true,
  comment: 'Product image URI'
}
```

**Business Justification** (OrderLineTransformationService Integration):
- **Product Flexibility**: Support any product type, not just Monte water (Dynamic extraction from OrderLineExtension1.Extended)
- **Multilingual**: Support Thai and English product names (Service requirement for extractProductData method)
- **Bundle Support**: Handle bundle pricing calculations (Service business logic requirement)
- **Performance**: Store calculated line totals (CalculationService.calculateLineTotal optimization)
- **Service Architecture**: Enable OrderLineTransformationService to store extracted product data
- **DTO Mapping**: Direct mapping from PMPOrderInputDTO.OrderLine[].OrderLineExtension1.Extended to database fields

### **1.3 Payment Methods Table Enhancement**
**File**: Create `20250816000003-add-payment-method-uuid.js`

**Purpose**: Support UUID payment method identifiers

**Field to Add**:
```javascript
payment_method_uuid: {
  type: Sequelize.UUID,
  allowNull: true,
  comment: 'UUID for payment method (fcf8e04e-f409-408d-b103-233af73af95e format)'
}
```

**Business Justification** (PaymentMethodTransformationService Integration):
- **Compatibility**: Match expected UUID format in transformation (PaymentMethodTransformationService requirement)
- **Integration**: Support external payment gateway UUIDs (Service architecture requirement)
- **Service Persistence**: Enable PaymentMethodTransformationService direct database storage
- **DTO Alignment**: Match PMPOrderInputDTO.Payment[].PaymentMethod structure

---

## **Phase 2: Missing Tables Creation (HIGH Priority)**

### **2.1 Payment Transactions Table**
**File**: Create `20250816000004-create-payment-transactions-table.js`

**Purpose**: Store payment transaction details

**Table Structure**:
```javascript
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
    references: {
      model: 'payment_methods',
      key: 'id'
    }
  },
  order_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  payment_transaction_id: {
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
  requested_amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
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
    defaultValue: true,
  },
  reconciliation_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  // JSONB fields
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
  }
}
```

**Indexes**:
```javascript
['order_id'],
['payment_transaction_id'], 
['payment_method_id']
```

### **2.2 Quantity Details Table**
**File**: Create `20250816000005-create-quantity-details-table.js`

**Purpose**: Track quantity details for order lines

**Table Structure**:
```javascript
{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_line_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'order_lines',
      key: 'id'
    }
  },
  order_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  quantity_detail_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  status_id: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  process: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  item_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  uom: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
  reason: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  reason_type: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  substitution_ratio: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: true,
  },
  substitution_type: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  web_url: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  org_id: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  // JSONB fields
  status: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  change_log: {
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
  }
}
```

**Indexes**:
```javascript
['order_id'],
['order_line_id'],
['quantity_detail_id']
```

### **2.3 Releases Table**
**File**: Create `20250816000006-create-releases-table.js`

**Purpose**: Store release/fulfillment information

**Table Structure**:
```javascript
{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  release_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  release_number: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  process: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  org_id: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  status_id: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  release_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  expected_ship_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  actual_ship_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  warehouse_id: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  carrier_code: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  tracking_number: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  ship_from_location_id: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  ship_to_location_id: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  ship_via_id: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  // JSONB fields
  status: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  shipping_info: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  carrier_details: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  release_metadata: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  extended: {
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
  }
}
```

**Indexes**:
```javascript
['order_id'],
['release_id'],
['warehouse_id']
```

### **2.4 Release Lines Table**
**File**: Create `20250816000007-create-release-lines-table.js`

**Purpose**: Store individual release line details

**Table Structure**:
```javascript
{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  release_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'releases',
      key: 'id'
    }
  },
  order_line_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'order_lines',
      key: 'id'
    }
  },
  order_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  release_line_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  item_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  process: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  org_id: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  status_id: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  uom: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
  location_id: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  warehouse_id: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  picked_quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  packed_quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  shipped_quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  line_status: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  // JSONB fields
  status: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  item_details: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  fulfillment_details: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  location_info: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  inventory_attributes: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  change_log: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
  extended: {
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
  }
}
```

**Indexes**:
```javascript
['order_id'],
['release_id'],
['order_line_id'],
['item_id']
```

---

## **Phase 3: Performance Optimization (MEDIUM Priority)**

### **3.1 Service-Optimized Indexes**
**File**: Create `20250816000008-add-service-performance-indexes.js`

**Purpose**: Optimize queries for service separation architecture

**Additional Indexes**:
```javascript
// Orders table
await queryInterface.addIndex('orders', ['customer_id', 'order_status']);
await queryInterface.addIndex('orders', ['org_id', 'selling_channel']);
await queryInterface.addIndex('orders', ['created_at']);
await queryInterface.addIndex('orders', ['order_total']);

// Order Lines table  
await queryInterface.addIndex('order_lines', ['item_id', 'fulfillment_status']);
await queryInterface.addIndex('order_lines', ['order_id', 'item_id']);
await queryInterface.addIndex('order_lines', ['line_total']);

// Payment Methods table
await queryInterface.addIndex('payment_methods', ['order_id', 'currency_code']);
await queryInterface.addIndex('payment_methods', ['amount']);

// Allocations table
await queryInterface.addIndex('allocations', ['item_id']);
await queryInterface.addIndex('allocations', ['ship_from_location_id']);

// Payment Transactions table
await queryInterface.addIndex('payment_transactions', ['transaction_date']);
await queryInterface.addIndex('payment_transactions', ['requested_amount']);
```

### **3.2 Composite Indexes for Common Queries**
```javascript
// Multi-column indexes for service queries
await queryInterface.addIndex('orders', ['org_id', 'order_status', 'created_at']);
await queryInterface.addIndex('order_lines', ['order_id', 'fulfillment_status', 'item_id']);
await queryInterface.addIndex('payment_methods', ['order_id', 'payment_method_id', 'amount']);
```

---

## **Phase 4: Data Integrity (MEDIUM Priority)**

### **4.1 Foreign Key Constraints**
**File**: Create `20250816000009-add-foreign-key-constraints.js`

**Purpose**: Ensure referential integrity

**Constraints to Add**:
```javascript
// Order Lines → Orders
await queryInterface.addConstraint('order_lines', {
  fields: ['order_id'],
  type: 'foreign key',
  name: 'fk_order_lines_order_id',
  references: {
    table: 'orders',
    field: 'order_id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Payment Methods → Orders
await queryInterface.addConstraint('payment_methods', {
  fields: ['order_id'],
  type: 'foreign key', 
  name: 'fk_payment_methods_order_id',
  references: {
    table: 'orders',
    field: 'order_id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Payment Transactions → Payment Methods
await queryInterface.addConstraint('payment_transactions', {
  fields: ['payment_method_id'],
  type: 'foreign key',
  name: 'fk_payment_transactions_payment_method_id', 
  references: {
    table: 'payment_methods',
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Allocations → Order Lines
await queryInterface.addConstraint('allocations', {
  fields: ['order_line_id'],
  type: 'foreign key',
  name: 'fk_allocations_order_line_id',
  references: {
    table: 'order_lines', 
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Quantity Details → Order Lines
await queryInterface.addConstraint('quantity_details', {
  fields: ['order_line_id'],
  type: 'foreign key',
  name: 'fk_quantity_details_order_line_id',
  references: {
    table: 'order_lines',
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Release Lines → Releases
await queryInterface.addConstraint('release_lines', {
  fields: ['release_id'],
  type: 'foreign key',
  name: 'fk_release_lines_release_id',
  references: {
    table: 'releases',
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Release Lines → Order Lines
await queryInterface.addConstraint('release_lines', {
  fields: ['order_line_id'],
  type: 'foreign key',
  name: 'fk_release_lines_order_line_id',
  references: {
    table: 'order_lines',
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
```

### **4.2 Check Constraints**
```javascript
// Financial validation constraints
await queryInterface.addConstraint('orders', {
  fields: ['order_total'],
  type: 'check',
  name: 'chk_orders_order_total_positive',
  where: {
    order_total: {
      [Sequelize.Op.gte]: 0
    }
  }
});

await queryInterface.addConstraint('order_lines', {
  fields: ['quantity'],
  type: 'check', 
  name: 'chk_order_lines_quantity_positive',
  where: {
    quantity: {
      [Sequelize.Op.gt]: 0
    }
  }
});

await queryInterface.addConstraint('payment_methods', {
  fields: ['amount'],
  type: 'check',
  name: 'chk_payment_methods_amount_positive',
  where: {
    amount: {
      [Sequelize.Op.gte]: 0
    }
  }
});
```

---

## **Phase 5: Reporting & Analytics (LOW Priority)**

### **5.1 Materialized Views**
**File**: Create `20250816000010-create-reporting-views.js`

**Purpose**: Support fast reporting and analytics

**Views to Create**:
```sql
-- Order Summary View
CREATE MATERIALIZED VIEW order_summary AS
SELECT 
  o.order_id,
  o.order_status,
  o.order_total,
  o.currency_code,
  o.created_at,
  COUNT(ol.id) as line_count,
  SUM(ol.line_total) as calculated_total
FROM orders o
LEFT JOIN order_lines ol ON o.order_id = ol.order_id
WHERE o.is_active = true
GROUP BY o.order_id, o.order_status, o.order_total, o.currency_code, o.created_at;

-- Product Performance View  
CREATE MATERIALIZED VIEW product_performance AS
SELECT
  ol.item_id,
  ol.product_name_en,
  COUNT(*) as order_count,
  SUM(ol.quantity) as total_quantity,
  SUM(ol.line_total) as total_revenue,
  AVG(ol.unit_price) as avg_unit_price
FROM order_lines ol
JOIN orders o ON ol.order_id = o.order_id
WHERE o.is_active = true AND ol.is_active = true
GROUP BY ol.item_id, ol.product_name_en;

-- Payment Method Analytics View
CREATE MATERIALIZED VIEW payment_analytics AS
SELECT
  pm.currency_code,
  DATE_TRUNC('day', pm.created_at) as transaction_date,
  COUNT(*) as transaction_count,
  SUM(pm.amount) as total_amount,
  AVG(pm.amount) as avg_amount
FROM payment_methods pm
JOIN orders o ON pm.order_id = o.order_id  
WHERE o.is_active = true
GROUP BY pm.currency_code, DATE_TRUNC('day', pm.created_at);
```

### **5.2 Update Triggers**
```javascript
// Auto-refresh materialized views
CREATE OR REPLACE FUNCTION refresh_order_summary()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY order_summary;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_refresh_order_summary
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH STATEMENT EXECUTE FUNCTION refresh_order_summary();
```

---

## **Implementation Timeline**

### **Week 1: Critical Fields (Phase 1)**
- **Monday**: Create financial fields migration for orders table
- **Tuesday**: Create product fields migration for order_lines table  
- **Wednesday**: Create payment method UUID migration
- **Thursday**: Test all field additions and validate transformations
- **Friday**: Deploy to development environment

### **Week 2: Missing Tables (Phase 2)**
- **Monday**: Create payment_transactions table
- **Tuesday**: Create quantity_details table
- **Wednesday**: Create releases table
- **Thursday**: Create release_lines table
- **Friday**: Test full schema and service integration

### **Week 3: Performance & Integrity (Phase 3-4)**
- **Monday-Tuesday**: Add performance indexes
- **Wednesday-Thursday**: Add foreign key constraints
- **Friday**: Performance testing and validation

### **Week 4: Reporting (Phase 5 - Optional)**
- **Monday-Tuesday**: Create materialized views
- **Wednesday-Thursday**: Add update triggers
- **Friday**: Analytics validation and documentation

---

## **Validation Strategy**

### **Migration Validation**
```bash
# Test migration up/down
cd /Users/chongraktanaka/Projects/mao-service-transformer/app
npm run migration:run
npm run migration:revert

# Validate schema
npm run migration:status
psql -d development -c "\d+ orders"
psql -d development -c "\d+ order_lines"
```

### **Service Integration Testing**
```bash
# Test transformation with new schema
cd /Users/chongraktanaka/Projects/mao-service-transformer/app
npm run build
node dist/src/test-release-order.js

# Validate service queries
# Run service-specific database queries
# Check performance with new indexes
```

### **Data Validation**
```sql
-- Validate financial calculations
SELECT order_id, 
       order_subtotal, 
       total_charges, 
       total_taxes, 
       total_discounts,
       order_total,
       (order_subtotal + total_charges + total_taxes - total_discounts) as calculated_total
FROM orders 
WHERE abs(order_total - (order_subtotal + total_charges + total_taxes - total_discounts)) > 0.01;

-- Validate referential integrity
SELECT COUNT(*) FROM order_lines ol 
LEFT JOIN orders o ON ol.order_id = o.order_id 
WHERE o.order_id IS NULL;
```

---

## **Risk Mitigation**

### **Rollback Strategy**
- **Field Additions**: Can be rolled back safely (data preserved)
- **New Tables**: Can be dropped safely (no existing dependencies)
- **Indexes**: Can be dropped without data loss
- **Constraints**: Can be removed without data loss

### **Data Migration Strategy**
```sql
-- Populate financial fields from existing data
UPDATE orders SET 
  order_subtotal = (
    SELECT COALESCE(SUM(quantity * unit_price), 0) 
    FROM order_lines 
    WHERE order_lines.order_id = orders.order_id
  ),
  order_total = order_subtotal + total_charges + total_taxes - total_discounts
WHERE order_subtotal IS NULL;

-- Populate product fields from JSONB extension data
UPDATE order_lines SET
  product_name_th = order_line_extension1->>'ProductNameTH',
  product_name_en = order_line_extension1->>'ProductNameEN',
  pack_unit_price = (order_line_extension1->>'PackUnitPrice')::DECIMAL
WHERE product_name_th IS NULL AND order_line_extension1 IS NOT NULL;
```

### **Performance Impact**
- **Minimal Impact**: Additive changes only
- **Index Creation**: Plan for maintenance window
- **Materialized Views**: Refresh during low-traffic periods

---

## **Service Architecture Integration Plan**

### **Service-to-Database Mapping**

**Phase 1 Services Ready for Database Integration**:
- ✅ **CalculationService**: Ready to store financial calculations in orders table (order_subtotal, total_charges, total_taxes, order_total)
- ✅ **OrderLineTransformationService**: Ready to store extracted product data in order_lines table (product_name_en, product_name_th, line_total)
- ✅ **PaymentMethodTransformationService**: Ready to store payment methods with UUID support

**Phase 2 Services Requiring New Tables**:
- ✅ **PaymentTransactionTransformationService**: Requires payment_transactions table
- ✅ **ReleaseTransformationService**: Requires releases table
- ✅ **ReleaseLineTransformationService**: Requires release_lines table
- ✅ **AllocationTransformationService**: Enhanced by quantity_details table

**Orchestrator Service Database Integration**:
- ✅ **OrderTransformationOrchestratorService**: Central coordination with database persistence across all domains
- ✅ **TransformationContext**: Enhanced with database IDs for relationship management
- ✅ **Service Health Checks**: Database connectivity validation

### **DTO-to-Database Persistence Strategy**

**Direct Persistence Capability**:
```typescript
// Phase 1: Store transformation inputs
PMPOrderInputDTO → database entities (orders, order_lines, payments, payment_methods)

// Phase 2: Store transformation outputs  
ReleaseOutputDTO → database entities (releases, release_lines, allocations)

// Phase 3: Service result storage
CalculationService results → financial calculation fields
OrderLineTransformationService results → product extraction fields
```

**Database-First Service Architecture**:
- Services read from database instead of JSON transformation only
- Real-time data updates through service layer
- Audit trail through database change logs
- Performance optimization through stored calculations

---

## **Success Criteria**

### **Technical Metrics** (Service Architecture Integration)
- ✅ All migrations execute successfully without errors
- ✅ Transformation service maintains 100% field accuracy
- ✅ Service queries perform within acceptable time limits (<200ms)
- ✅ No data loss or corruption during migration
- ✅ All foreign key constraints validate successfully
- ✅ **Service Integration**: All 13 services can persist data directly to database
- ✅ **DTO Alignment**: 95%+ direct mapping between DTOs and database entities
- ✅ **Orchestrator Performance**: <500ms for complete order transformation with database storage

### **Business Metrics** (Production Readiness)
- ✅ Support for any product type (not just Monte water)
- ✅ Financial calculations stored for fast reporting
- ✅ Full audit trail through all related tables
- ✅ Ready for production order volumes
- ✅ Analytics and reporting capabilities enabled
- ✅ **Service Architecture**: Production-ready with database persistence
- ✅ **Real-time Processing**: Live order processing through service layer
- ✅ **Scalability**: Database schema supports microservice extraction

### **Quality Metrics** (Architecture Alignment)
- ✅ Schema matches service architecture requirements (100% domain alignment)
- ✅ Performance indexes optimize service queries (13-service optimization)
- ✅ Referential integrity maintained across all tables
- ✅ Data validation rules prevent corruption
- ✅ Rollback capability for all changes
- ✅ **Service Boundaries**: Clean separation between domain services and database entities
- ✅ **DTO Compliance**: Database schema supports both input and output DTO structures
- ✅ **Transformation Quality**: 100% field accuracy maintained through database layer

---

## **Post-Implementation Tasks**

### **Documentation Updates**
- Update service documentation with new field mappings
- Document new query patterns for each service
- Create database schema documentation
- Update API documentation if needed

### **Monitoring Setup**
- Add database performance monitoring
- Set up alerts for constraint violations
- Monitor query performance with new indexes
- Track materialized view refresh performance

### **Training & Knowledge Transfer**
- Train development team on new schema
- Document best practices for new field usage
- Create troubleshooting guide for common issues
- Share performance optimization guidelines

---

**Prepared by**: Claude Code SuperClaude  
**Review Date**: 2025-08-16  
**Status**: Ready for Implementation with Service Architecture Integration  
**Estimated Effort**: 3-4 weeks (Phase 1-2 critical for service integration)  
**Risk Level**: Low (Additive changes only)  
**Service Integration**: Complete alignment with 13-service architecture  
**Target Achievement**: 9.5/10 alignment score upon completion