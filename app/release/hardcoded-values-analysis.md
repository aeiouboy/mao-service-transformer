# Hardcoded Values Analysis - Release Order Transformer Service

## Overview
This document analyzes the `release-order-transformer.service.ts` file to identify hardcoded values and mapping issues that need to be addressed.

## 🔍 Current vs Expected Output Comparison

### Input File: `123456789-C7L2LCDCTCC2AE.json`
### Expected Output: `MAO-123456789-C7L2LCDCTCC2AE.json`

## 🚨 Critical Hardcoded Values Found

### 1. Order Header Level Hardcoded Values

| Field | Current Hardcoded Value | Database Field Available | Status |
|-------|------------------------|-------------------------|---------|
| `ServiceLevelCode` | `'STD'` | `order.maxFulfillmentStatusId` | ❌ Should use DB |
| `MaxFulfillmentStatusId` | `'3000'` | `order.maxFulfillmentStatusId` | ❌ Should use DB |
| `CurrencyCode` | `'THB'` | `order.currencyCode` | ❌ Should use DB |
| `OrganizationId` | `'CFM-SIT'` | `order.orgId` | ❌ Should use DB |
| `PaymentStatusId` | `'5000.000'` | `payment.statusId` | ❌ Should use DB |
| `MinFulfillmentStatusId` | `'3000'` | `orderLine.minFulfillmentStatusId` | ❌ Should use DB |
| `ShipViaId` | `'InStore_STD'` | Not in DB | ⚠️ Business rule |
| `CarrierCode` | `'InStore'` | Not in DB | ⚠️ Business rule |
| `OrderLocale` | `'th'` | Not in DB | ⚠️ Business rule |

### 2. Timestamp Hardcoded Values

| Field | Current Hardcoded Value | Database Field Available | Status |
|-------|------------------------|-------------------------|---------|
| `ConfirmedDate` | `'2025-08-22T08:34:45.141'` | `order.confirmedAt` | ❌ Should use DB |
| `CreateReleaseTimeStamp` | `'2025-08-22T08:34:46.053'` | `order.createdAt` | ❌ Should use DB |
| `CreateOrderTimeStamp` | `'2025-08-22T08:34:26.784'` | `order.createdAt` | ❌ Should use DB |
| `CapturedDate` | `'2025-08-22T08:21:02'` | `order.capturedAt` | ❌ Should use DB |

### 3. Address Hardcoded Values

| Field | Current Hardcoded Value | Database Field Available | Status |
|-------|------------------------|-------------------------|---------|
| `PostalCode` | `'99999'` | `address.postalCode` | ❌ Should use DB |
| `Address1` | `'Grab Address1'` | `address.address1` | ❌ Should use DB |
| `Address2` | `'Grab Address2'` | `address.address2` | ❌ Should use DB |
| `City` | `'-'` | `address.city` | ❌ Should use DB |
| `State` | `'-'` | `address.state` | ❌ Should use DB |
| `County` | `'-'` | `address.county` | ❌ Should use DB |

### 4. User/System Hardcoded Values

| Field | Current Hardcoded Value | Database Field Available | Status |
|-------|------------------------|-------------------------|---------|
| `CreatedBy` | `'pubstestuser@twd'` | `order.createdBy` | ❌ Should use DB |
| `ShipFromLocationId` | `'CFM6470'` | `order.shipFromLocationId` | ❌ Should use DB |
| `EffectiveRank` | `'1020250822082102'` | Not in DB | ⚠️ Generated value |

### 5. Payment Method Hardcoded Values

| Field | Current Hardcoded Value | Database Field Available | Status |
|-------|------------------------|-------------------------|---------|
| `GatewayId` | `'Simulator'` | `paymentMethod.gatewayId` | ❌ Should use DB |
| `PaymentTypeId` | `'Cash On Delivery'` | `paymentMethod.paymentTypeId` | ❌ Should use DB |
| `CurrencyCode` | `'THB'` | `paymentMethod.currencyCode` | ❌ Should use DB |

### 6. Order Line Hardcoded Values

| Field | Current Hardcoded Value | Database Field Available | Status |
|-------|------------------------|-------------------------|---------|
| `MinFulfillmentStatusId` | `'3500'` | `orderLine.minFulfillmentStatusId` | ❌ Should use DB |
| `UOM` | `'SPCS'` | `orderLine.uom` | ❌ Should use DB |
| `FulfillmentStatus` | `'Created'` | `orderLine.fulfillmentStatus` | ❌ Should use DB |

## 🔧 Mapping Issues Identified

### 1. Field Name Mismatches

```typescript
// Current mapping issues:
order.customerEmail -> Email (✅ Correct)
order.customerFirstName -> CustomerFirstName (✅ Correct)
order.customerLastName -> CustomerLastName (✅ Correct)
order.customerPhone -> CustomerPhone (✅ Correct)
order.currencyCode -> CurrencyCode (✅ Correct)
order.orderSubTotal -> OrderSubtotal (✅ Correct)
order.orderTotal -> ReleaseTotal (✅ Correct)
order.totalTaxes -> OrderTotalTaxes (✅ Correct)
order.totalDiscounts -> OrderTotalDiscounts (✅ Correct)
```

### 2. Missing Database Fields

The following fields are hardcoded but should be added to the database schema:

```sql
-- Missing fields in orders table:
ALTER TABLE orders ADD COLUMN confirmed_at TIMESTAMP;
ALTER TABLE orders ADD COLUMN captured_at TIMESTAMP;
ALTER TABLE orders ADD COLUMN ship_from_location_id VARCHAR(50);
ALTER TABLE orders ADD COLUMN created_by VARCHAR(100);

-- Missing fields in order_lines table:
ALTER TABLE order_lines ADD COLUMN uom VARCHAR(20);
ALTER TABLE order_lines ADD COLUMN fulfillment_status VARCHAR(50);

-- Missing fields in payment_methods table:
ALTER TABLE payment_methods ADD COLUMN gateway_id VARCHAR(100);
ALTER TABLE payment_methods ADD COLUMN payment_type_id VARCHAR(100);
```

### 3. JSONB Field Mapping Issues

```typescript
// Current JSONB field usage:
order.docType?.DocTypeId -> DocTypeId (✅ Correct)
order.orderType?.OrderTypeId -> OrderTypeId (✅ Correct)

// Missing JSONB field mappings:
order.orderNote -> Note (❌ Not mapped)
order.orderChargeDetail -> ChargeDetail (❌ Not mapped)
order.orderTaxDetail -> TaxDetail (❌ Not mapped)
```

## 🎯 Recommended Fixes

### 1. Database Schema Updates

```sql
-- Add missing fields to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS captured_at TIMESTAMP;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS ship_from_location_id VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS created_by VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_locale VARCHAR(10) DEFAULT 'th';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS ship_via_id VARCHAR(50) DEFAULT 'InStore_STD';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS carrier_code VARCHAR(50) DEFAULT 'InStore';

-- Add missing fields to order_lines table
ALTER TABLE order_lines ADD COLUMN IF NOT EXISTS uom VARCHAR(20) DEFAULT 'SPCS';
ALTER TABLE order_lines ADD COLUMN IF NOT EXISTS fulfillment_status VARCHAR(50) DEFAULT 'Created';

-- Add missing fields to payment_methods table
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS gateway_id VARCHAR(100);
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS payment_type_id VARCHAR(100);
```

### 2. Service Code Updates

```typescript
// Replace hardcoded values with database values
ServiceLevelCode: order.maxFulfillmentStatusId || 'STD',
MaxFulfillmentStatusId: order.maxFulfillmentStatusId || '3000',
CurrencyCode: order.currencyCode || 'THB',
OrganizationId: order.orgId || 'CFM-UAT',
PaymentStatusId: payment.statusId || '5000.000',
MinFulfillmentStatusId: orderLine.minFulfillmentStatusId || '3000',
ConfirmedDate: order.confirmedAt?.toISOString() || new Date().toISOString(),
CreateReleaseTimeStamp: order.createdAt?.toISOString() || new Date().toISOString(),
CreateOrderTimeStamp: order.createdAt?.toISOString() || new Date().toISOString(),
CapturedDate: order.capturedAt?.toISOString() || new Date().toISOString(),
CreatedBy: order.createdBy || 'system',
ShipFromLocationId: order.shipFromLocationId || 'CFM6470',
```

### 3. Address Mapping Updates

```typescript
// Use address from database instead of hardcoded values
PostalCode: address.postalCode || '99999',
Address1: address.address1 || 'Grab Address1',
Address2: address.address2 || 'Grab Address2',
City: address.city || '-',
State: address.state || '-',
County: address.county || '-',
```

### 4. Payment Method Mapping Updates

```typescript
// Use payment method data from database
GatewayId: paymentMethod.gatewayId || 'Simulator',
PaymentTypeId: paymentMethod.paymentTypeId || 'Cash On Delivery',
CurrencyCode: paymentMethod.currencyCode || 'THB',
```

## 📊 Impact Analysis

### High Priority Issues (Must Fix)
1. **Timestamps** - Using hardcoded dates instead of actual order creation dates
2. **Organization IDs** - Using wrong org ID that doesn't match the order
3. **Payment Status** - Not using actual payment status from database
4. **Address Information** - Using hardcoded address instead of customer address

### Medium Priority Issues (Should Fix)
1. **Currency Codes** - Should use database value with fallback
2. **Fulfillment Status** - Should use database value with fallback
3. **User Information** - Should use actual user who created the order

### Low Priority Issues (Nice to Have)
1. **Business Rule Constants** - Some hardcoded values are business rules
2. **Generated Values** - Some values are system-generated and appropriate

## 🚀 Implementation Plan

### Phase 1: Database Schema Updates
1. Add missing fields to database tables
2. Update existing records with appropriate default values
3. Create database migration scripts

### Phase 2: Service Code Updates
1. Update field mappings to use database values
2. Add fallback values for missing data
3. Update unit tests to reflect changes

### Phase 3: Validation & Testing
1. Test with real database data
2. Validate output matches expected format
3. Update integration tests

### Phase 4: Documentation
1. Update API documentation
2. Create field mapping documentation
3. Update deployment guides

## 📝 Summary

The transformation service has **significant hardcoded values** that need to be replaced with actual database values. The main issues are:

1. **23 hardcoded values** that should come from database
2. **8 missing database fields** that need to be added
3. **5 JSONB field mappings** that are not being used
4. **3 business rule constants** that are appropriately hardcoded

The most critical fixes are the timestamp fields and organization IDs, as these directly affect the accuracy of the transformed data.
