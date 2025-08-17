# Migration Implementation Checklist

## **Quick Reference Checklist for Migration Adjustments**
## **Service-Database Alignment Integration**

**Date**: 2025-08-16  
**Status**: 📋 **READY FOR IMPLEMENTATION**  
**Service Alignment**: 7.5/10 → Target: 9.5/10  
**Priority**: Service Integration + Database Performance

---

## **Phase 1: Critical Fields (HIGH Priority)**

### ✅ **Orders Table Enhancement** (CalculationService Integration)
- [ ] **File**: `20250816000001-add-financial-fields-to-orders.js`
- [ ] **Fields**: order_subtotal, total_charges, total_taxes, total_discounts, order_total
- [ ] **Service Integration**: CalculationService can store results directly
- [ ] **Test**: Verify financial calculations + service persistence
- [ ] **Performance**: 10x faster retrieval vs real-time calculation
- [ ] **Deploy**: Development environment

### ✅ **Order Lines Table Enhancement** (OrderLineTransformationService Integration)
- [ ] **File**: `20250816000002-add-product-fields-to-order-lines.js`
- [ ] **Fields**: product_name_en, product_name_th, pack_unit_price, pack_ordered_qty, bundle_ref_id, line_total, image_uri
- [ ] **Service Integration**: OrderLineTransformationService extractProductData storage
- [ ] **DTO Mapping**: Direct PMPOrderInputDTO.OrderLine[].OrderLineExtension1.Extended extraction
- [ ] **Test**: Verify dynamic product support (any product type, not just Monte water)
- [ ] **Multilingual**: Thai/English product name support
- [ ] **Deploy**: Development environment

### ✅ **Payment Methods Table Enhancement** (PaymentMethodTransformationService Integration)
- [ ] **File**: `20250816000003-add-payment-method-uuid.js`
- [ ] **Field**: payment_method_uuid (UUID type)
- [ ] **Service Integration**: PaymentMethodTransformationService UUID support
- [ ] **DTO Mapping**: PMPOrderInputDTO.Payment[].PaymentMethod structure alignment
- [ ] **Test**: Verify UUID format compatibility (fcf8e04e-f409-408d-b103-233af73af95e format)
- [ ] **Deploy**: Development environment

---

## **Phase 2: Missing Tables (HIGH Priority)**

### ✅ **Payment Transactions Table** (PaymentTransactionTransformationService Integration)
- [ ] **File**: `20250816000004-create-payment-transactions-table.js`
- [ ] **Service Integration**: PaymentTransactionTransformationService complete implementation
- [ ] **Missing Service**: Currently 0/10 alignment - complete gap resolution
- [ ] **Indexes**: order_id, payment_transaction_id, payment_method_id
- [ ] **DTO Mapping**: PMPOrderInputDTO.Payment[].PaymentMethod[].PaymentTransaction structure
- [ ] **Test**: Verify payment transaction storage + service persistence
- [ ] **Deploy**: Development environment

### ✅ **Quantity Details Table**
- [ ] **File**: `20250816000005-create-quantity-details-table.js`
- [ ] **Indexes**: order_id, order_line_id, quantity_detail_id
- [ ] **Test**: Verify quantity tracking
- [ ] **Deploy**: Development environment

### ✅ **Releases Table** (ReleaseTransformationService Integration)
- [ ] **File**: `20250816000006-create-releases-table.js`
- [ ] **Service Integration**: ReleaseTransformationService complete implementation
- [ ] **Missing Service**: Currently 0/10 alignment - complete gap resolution
- [ ] **Indexes**: order_id, release_id, warehouse_id
- [ ] **DTO Mapping**: ReleaseOutputDTO.SystemFields structure support
- [ ] **Test**: Verify release tracking + service persistence
- [ ] **Deploy**: Development environment

### ✅ **Release Lines Table** (ReleaseLineTransformationService Integration)
- [ ] **File**: `20250816000007-create-release-lines-table.js` 
- [ ] **Service Integration**: ReleaseLineTransformationService complete implementation
- [ ] **Missing Service**: Currently 0/10 alignment - complete gap resolution
- [ ] **Indexes**: order_id, release_id, order_line_id, item_id
- [ ] **DTO Mapping**: ReleaseOutputDTO.OriginalPayload.ReleaseLine[] structure support
- [ ] **Test**: Verify release line tracking + service persistence
- [ ] **Deploy**: Development environment

---

## **Phase 3: Performance Optimization (MEDIUM Priority)**

### ✅ **Service-Optimized Indexes** (13-Service Architecture Performance)
- [ ] **File**: `20250816000008-add-service-performance-indexes.js`
- [ ] **Orders**: customer_id+order_status, org_id+selling_channel, created_at, order_total
- [ ] **Order Lines**: item_id+fulfillment_status, order_id+item_id, line_total, product_name_en+product_name_th
- [ ] **Payment Methods**: order_id+currency_code, amount, payment_method_uuid
- [ ] **Service Optimization**: Indexes optimized for OrderTransformationService, OrderLineTransformationService, PaymentTransformationService queries
- [ ] **Performance Target**: <200ms for service-specific queries, <500ms for complete transformation
- [ ] **Test**: Query performance benchmarks + service integration testing
- [ ] **Deploy**: Development environment

---

## **Phase 4: Data Integrity (MEDIUM Priority)**

### ✅ **Foreign Key Constraints**
- [ ] **File**: `20250816000009-add-foreign-key-constraints.js`
- [ ] **Order Lines** → Orders (order_id)
- [ ] **Payment Methods** → Orders (order_id)
- [ ] **Payment Transactions** → Payment Methods (payment_method_id)
- [ ] **Allocations** → Order Lines (order_line_id)
- [ ] **Test**: Referential integrity validation
- [ ] **Deploy**: Development environment

---

## **Quick Commands**

### **Migration Execution**
```bash
cd /Users/chongraktanaka/Projects/mao-service-transformer/app

# Run new migrations
npm run migration:run

# Check migration status
npm run migration:status

# Rollback if needed (last migration)
npm run migration:revert
```

### **Validation Testing** (Service Integration)
```bash
# Build and test transformation
npm run build
node dist/src/test-release-order.js

# Test service database integration
node -e "const service = require('./dist/src/common/services/release-order-transformation.service.js'); console.log('Service ready for database integration');"

# Validate schema
psql -d development -c "\d+ orders"
psql -d development -c "\d+ order_lines" 
psql -d development -c "\d+ payment_methods"
psql -d development -c "\d+ payment_transactions"
psql -d development -c "\d+ releases"
psql -d development -c "\d+ release_lines"
```

### **Data Population (After Migration)**
```sql
-- Populate financial fields from existing data
UPDATE orders SET 
  order_subtotal = (
    SELECT COALESCE(SUM(quantity * unit_price), 0) 
    FROM order_lines 
    WHERE order_lines.order_id = orders.order_id
  );

-- Populate product fields from JSONB
UPDATE order_lines SET
  product_name_th = order_line_extension1->>'ProductNameTH',
  product_name_en = order_line_extension1->>'ProductNameEN'
WHERE order_line_extension1 IS NOT NULL;
```

---

## **Validation Checklist**

### ✅ **Functional Validation** (Service Architecture Integration)
- [ ] Transformation service builds successfully
- [ ] All existing tests pass
- [ ] All 13 services can access database entities
- [ ] OrderTransformationOrchestratorService coordinates database operations
- [ ] New fields populated correctly from service calculations
- [ ] Service queries work with new schema
- [ ] Financial calculations accurate (CalculationService → database storage)
- [ ] Product extraction working (OrderLineTransformationService → structured fields)
- [ ] Payment processing complete (PaymentTransactionTransformationService → new table)
- [ ] Release workflow functional (ReleaseTransformationService + ReleaseLineTransformationService → new tables)

### ✅ **Performance Validation** (Service Performance Optimization)
- [ ] Service queries within acceptable limits (<200ms)
- [ ] Complete transformation with database storage (<500ms)
- [ ] CalculationService 10x faster with stored results
- [ ] OrderLineTransformationService no JSON parsing overhead
- [ ] Index effectiveness verified for 13-service architecture
- [ ] No significant resource usage increase
- [ ] Concurrent access testing with service layer
- [ ] OrderTransformationOrchestratorService performance validation

### ✅ **Data Integrity Validation**
- [ ] All foreign key constraints valid
- [ ] No orphaned records
- [ ] Financial totals match calculations
- [ ] JSONB data properly migrated to structured fields

---

## **Deployment Order**

### **Development Environment**
1. **Phase 1**: Critical fields (Week 1)
2. **Phase 2**: Missing tables (Week 2)  
3. **Phase 3**: Performance indexes (Week 3)
4. **Phase 4**: Foreign key constraints (Week 3)

### **Staging Environment**
1. Deploy after successful development testing
2. Full regression testing with production-like data
3. Performance testing under load
4. Rollback testing

### **Production Environment**
1. Deploy during maintenance window
2. Monitor performance and error rates
3. Validate data integrity post-deployment
4. Confirm service functionality

---

## **Rollback Plan**

### **If Issues Occur**
```bash
# Rollback migrations in reverse order
npm run migration:revert  # Last migration
npm run migration:revert  # Second to last
# Continue as needed

# Restore from backup if necessary
# Contact DBA team for assistance
```

### **Rollback Decision Points**
- **Data corruption detected** → Immediate rollback
- **Performance degradation >50%** → Rollback and investigate
- **Service errors >1%** → Rollback and fix
- **Foreign key constraint failures** → Rollback and review

---

## **Success Metrics**

### ✅ **Technical Success** (Service Architecture Integration)
- [ ] Zero data loss during migration
- [ ] All 13 services operational post-migration
- [ ] OrderTransformationOrchestratorService fully functional
- [ ] Service database persistence working
- [ ] Query performance meets SLA requirements (<200ms service queries, <500ms complete transformation)
- [ ] No constraint violation errors
- [ ] Service-database alignment score: 9.5/10 achieved

### ✅ **Business Success** (Production Architecture)
- [ ] Dynamic product support working (any product type, not just Monte water)
- [ ] Financial calculations accurate and stored for fast retrieval
- [ ] Multilingual product support (Thai/English)
- [ ] Complete payment transaction tracking
- [ ] Release workflow fully implemented
- [ ] Reporting capabilities enabled with structured data
- [ ] Audit trail complete across all domains
- [ ] Service architecture ready for microservice extraction
- [ ] Real-time order processing through service layer

---

**Quick Start**: Begin with Phase 1 migrations for immediate impact on service performance and dynamic product support.

**Risk Level**: **LOW** - All changes are additive and can be safely rolled back.

**Estimated Time**: **3-4 weeks** for complete implementation across all environments.