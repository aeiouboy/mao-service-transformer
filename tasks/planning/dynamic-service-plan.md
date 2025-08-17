# Dynamic Service Transformation Plan

## **Objective**: Remove all hardcoded values and make the MAO Service Transformer truly dynamic for any order pattern.

## **Current Issues Identified**

### 🚨 **Critical Hardcoded Problems**

1. **Fixed ID Sequences** (Lines 12-37 in service)
   - Hardcoded IDs: `'7543960027815601342'`, `'7543960028655638704'`, etc.
   - Impact: Any new order reuses same IDs → conflicts & audit issues

2. **Fixed Timestamps** (Lines 290-318 in service)
   - All timestamps from `'2025-08-05T12:13:22.781'`
   - Impact: All orders appear created at same time

3. **Hardcoded Product Variants** (Lines 201-283 in service)
   - Only works for 3 specific Monte water SKUs
   - Impact: Complete failure for any other products

4. **Sample-Specific Logic**
   - Assumes exactly 3 ReleaseLine entries
   - Fixed ChargeDetail patterns
   - Impact: Orders with different structures fail

## **Phase 1: Dynamic ID & Timestamp Generation (Priority: CRITICAL)**

### 1.1 Replace Fixed ID Sequences
- **Current Problem**: 
  ```typescript
  private readonly idSequence = [
    '7543960027815601342', // Payment[0].PK
    '7543960028655638704', // PaymentMethod[0].PK
    // ... hardcoded for one specific order
  ];
  ```
- **Solution**: Dynamic UUID/timestamp-based generation
- **Implementation**: 
  ```typescript
  private generateUniqueId(prefix?: string): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}${random}`;
  }
  ```

### 1.2 Dynamic Timestamp Management  
- **Current Problem**: All orders use same fixed timestamps
- **Solution**: Actual current timestamps with proper progression
- **Implementation**: Base timestamp + incremental milliseconds
- **Testing Support**: Config flag for deterministic timestamps in tests

## **Phase 2: Dynamic Product Data Extraction (Priority: CRITICAL)**

### 2.1 Remove Hardcoded Product Variants
- **Current Problem**: 
  ```typescript
  private getProductVariant(index: number) {
    const variants = [
      { itemId: "8853474090594", productNameTH: "มอนเต้น้ำแร่..." }
      // Only works for Monte water products
    ];
  }
  ```
- **Solution**: Extract directly from `OrderLineExtension1.Extended`
- **Implementation**: Map from actual input fields to output structure
- **Fallback**: Default values for missing product data

### 2.2 Dynamic OrderLine Processing
- **Current Problem**: Assumes exactly 3 ReleaseLine entries
- **Solution**: Process actual `input.OrderLine` array length
- **Implementation**: Generate ReleaseLine for each actual OrderLine

## **Phase 3: Configurable Business Rules (Priority: HIGH)**

### 3.1 Externalize Business Rules
- **Create**: `/app/src/config/business-rules.json`
- **Include**: Discount rates, shipping thresholds, tax rules
- **Implementation**: JSON config with rule engine
- **Example**:
  ```json
  {
    "shipping": {
      "freeShippingThreshold": 100,
      "standardRate": 0.025
    },
    "discounts": {
      "orderDiscountRate": 0.0005,
      "minimumOrderForDiscount": 100
    }
  }
  ```

### 3.2 Market-Specific Rules
- **Support**: Different rules for TH, US, etc.
- **Implementation**: Rule selection based on currency/country
- **Configuration**: Environment-specific rule sets

## **Phase 4: Dynamic Structure Generation (Priority: HIGH)**

### 4.1 Flexible ChargeDetail Arrays
- **Current Problem**: Fixed 3-4 ChargeDetail patterns
- **Solution**: Dynamic generation based on actual charges
- **Implementation**: Build arrays from input data + business rules

### 4.2 Variable ReleaseLine Support
- **Current Problem**: Hardcoded for 3 lines
- **Solution**: Support 1-N OrderLines
- **Implementation**: Dynamic array generation with proper indexing

## **Phase 5: Enhanced Input Processing (Priority: MEDIUM)**

### 5.1 Robust Input Validation
- **Add**: Validation for missing/optional fields
- **Implementation**: Enhanced DTO validation with fallbacks
- **Error handling**: Graceful degradation for incomplete data

### 5.2 Multi-Product Support
- **Support**: Any product type beyond Monte water
- **Implementation**: Generic product field mapping
- **Fallback**: Default product data when Extended fields missing

## **Phase 6: Testing & Validation (Priority: HIGH)**

### 6.1 Multi-Pattern Testing
- **Create**: Test cases for different order patterns:
  - Single line orders
  - Multi-line orders (2, 5, 10+ lines)
  - Different product types
  - Various currencies (THB, USD, EUR)
  - Different shipping methods
- **Validation**: Ensure 100% accuracy across all patterns

### 6.2 Regression Testing
- **Maintain**: Original sample as regression test
- **Implementation**: Automated comparison against known good output
- **CI/CD**: Integrate into build pipeline

## **Implementation Strategy**

### **Approach**: Incremental refactoring with validation checkpoints

**Week 1**: Critical Fixes
- Phase 1.1: Dynamic ID generation
- Phase 1.2: Dynamic timestamps
- **Validation**: Test with original sample

**Week 2**: Product Dynamics  
- Phase 2.1: Product data extraction
- Phase 2.2: Dynamic OrderLine processing
- **Validation**: Test with different product types

**Week 3**: Business Rules
- Phase 3.1: Business rules externalization
- Phase 3.2: Market-specific configurations
- **Validation**: Test with different markets

**Week 4**: Structure & Testing
- Phase 4.1: Dynamic ChargeDetail arrays
- Phase 4.2: Variable ReleaseLine support
- Phase 6.1: Multi-pattern testing
- **Validation**: Comprehensive test suite

### **Risk Mitigation**
- **Incremental Approach**: Change one component at a time
- **Feature Flags**: Enable/disable new logic per component
- **Parallel Testing**: Run old and new logic side-by-side
- **Rollback Plan**: Keep original logic as fallback
- **Validation Gates**: Must pass existing tests before proceeding

### **Success Criteria**
- ✅ Support any product type and order pattern
- ✅ Maintain 100% field accuracy for all orders  
- ✅ Configurable business rules for different markets
- ✅ Production-ready for real-world order volumes
- ✅ Pass all existing regression tests
- ✅ No hardcoded values remaining in service

### **Files to Create/Modify**

**Core Service Changes**:
- **Modify**: `app/src/common/services/release-order-transformation.service.ts`
- **Create**: `app/src/common/services/dynamic-id-generator.service.ts`
- **Create**: `app/src/common/services/product-data-mapper.service.ts`

**Configuration**:
- **Create**: `app/src/config/business-rules.json`
- **Create**: `app/src/config/market-specific-rules.json`

**Testing**:
- **Create**: `tests/transformation/multi-pattern-test.js`
- **Create**: `tests/data/various-order-patterns/`
- **Modify**: Existing test files for regression validation

**Documentation**:
- **Update**: All documentation to reflect dynamic behavior
- **Create**: Configuration guide for business rules
- **Create**: Multi-pattern testing guide

## **Expected Outcomes**

### **Before (Current State)**
- ❌ Only works with Monte water products
- ❌ Fixed timestamps for all orders
- ❌ Reuses same IDs across orders
- ❌ Assumes exactly 3 order lines
- ❌ Hardcoded business rules

### **After (Dynamic State)**
- ✅ Works with any product type
- ✅ Real timestamps for each order
- ✅ Unique IDs for every order
- ✅ Supports 1-N order lines
- ✅ Configurable business rules
- ✅ Production-ready for any order pattern

This transformation will make the MAO Service Transformer truly production-ready and capable of handling the diverse order patterns found in real-world e-commerce operations.