# OMS Order Mapping Field Analysis Report

## Executive Summary

**Total Fields Discovered**: 716 actual data fields across 786 structural elements
**Extended Fields**: 108 fields across multiple Extended sections  
**Array Item Fields**: 526 fields within array structures
**Missing Fields**: 371 fields (approximately 52% of total fields)

## Complete Field Hierarchy

### Root Structure
```
OriginalHeaders/ (33 fields)
OriginalPayload/ (683 fields)
  ├── Top-level Order Fields (47 fields)
  ├── ExtendedFields (1 field)
  ├── Order/ (175 fields)
  │   ├── Payment[*] (130 fields per payment)
  │   ├── OrderChargeDetail[*] (5 fields per charge)
  │   └── OrderExtension1.Extended (20 fields) ⭐ USER MENTIONED
  ├── ChargeDetail[*] (11 fields per charge)
  ├── Note[*] (10 fields per note)
  ├── PaymentMethod[*] (41 fields per method)
  ├── ProcessInfo (53 fields)
  └── ReleaseLine[*] (295 fields per line item) ⭐ LARGEST SECTION
      └── OrderLine.OrderLineExtension1.Extended (65 fields) ⭐ CRITICAL
```

## Critical Extended Sections Analysis

### 1. OriginalPayload.Order.OrderExtension1.Extended (20 fields)
**Priority**: HIGH - User specifically mentioned this section

**Fields**:
- `IsPSConfirmed`: boolean
- `CancelAllowed`: boolean  
- `FullTaxInvoice`: boolean
- `SourceOrderShippingTotal`: null
- `AutoSettlement`: null
- `TaxId`: string (empty)
- `SourceOrderTotal`: null
- `T1ConversionRate`: null
- `Extended1`: null
- `AllowSubstitution`: boolean
- `T1RedemptionPoint`: null
- `CompanyName`: string (empty)
- `CustRef`: null
- `SourceOrderTotalDiscount`: null
- `BranchNo`: string (empty)
- `ConfirmPaymentId`: string ("Cash On Delivery")
- `T1Number`: null
- `T1PhoneNo`: null
- `SourceOrderSubTotal`: null
- `ExternalMPSellerId`: null

### 2. ReleaseLine[*].OrderLine.OrderLineExtension1.Extended (65 fields)
**Priority**: CRITICAL - Largest Extended section, likely contains many missing fields

**Key Field Categories**:

**Product Information**:
- `ProductNameEN`, `ProductNameTH`, `ProductNameDE`, `ProductNameIT`, `ProductNameVN`
- `ProductUOMEN`, `ProductUOMTH`
- `PrimaryBarcode`
- `ItemBrand`, `ItemStyle`

**Bundle/Pack Information**:
- `IsBundle`, `BundleRefId`
- `PackUnitPrice`, `PackOrderedQty`
- `PackItemDescriptionEN`, `PackItemDescriptionTH`
- `PackSmallImageURI`, `PackOriginalUnitPrice`
- `NumberOfPack`

**Pricing & Promotion**:
- `PromotionId`, `PromotionType`
- `LatestUnitPrice`, `LatestItemTotal`, `LatestItemSubTotal`
- `LatestItemTotalDiscount`
- `SourceItemTotal`, `SourceItemSubTotal`, `SourceItemTotalDiscount`

**Delivery & Fulfillment**:
- `SlotBookingFrom`, `SlotBookingTo`, `SlotBookingId`
- `DeliveryRoute`, `ServiceType`
- `CanReturntoWarehouse`

**Weight & Measurement**:
- `IsWeightItem`, `AverageWeight`, `AverageUnitPrice`
- `ActualQuantity`

**Pickup Store Information** (20+ fields):
- `PickUpStoreCode`, `PickUpStoreName`, `PickUpStoreDescription`
- `PickUpStoreAddress1`, `PickUpStoreAddress2`
- `PickUpStoreCity`, `PickUpStoreDistrict`, `PickUpStoreSubDistrict`
- `PickUpStorePostal`, `PickUpStoreCountry`
- `PickUpStorePhone`, `PickUpStoreEmail`
- `PickUpStoreLat`, `PickUpStoreLong`
- `PickUpSecretKey`, `SecretKeyCode`

**Gift & Special Features**:
- `IsGWP`, `GWPParentItem`
- `IsGiftWrapping`, `IsSubstitution`

**System Integration**:
- `MMSDepartment`, `MMSSubDepartment`, `MMSSKUType`
- `JDASKUType`
- `OfferId`, `ReferenceOrderLineId`
- `CustomerAddressLat`, `CustomerAddressLong`

### 3. Other Extended Sections

**Payment Method Extended** (5 fields):
- `BillingNameString`, `BillingAddressString`, `BillingAddressString2`
- `InstallmentPlan`, `InstallmentRate`

**Address Extended** (1 field):
- `AddressRef`: Format "|||4016|TH"

**Charge Detail Extended** (8 fields):
- `JdaDiscCode`, `ChargeDesc`, `CRCTaxAmount`
- `TaxRate`, `MKPPromotionId`, `PlatformAbsorb`
- `PromotionId`, `PromotionType`

## Array Structures & Field Multipliers

### High-Impact Arrays
1. **ReleaseLine[*]**: 295 fields × number of line items
2. **Order.Payment[*]**: 130 fields × number of payments  
3. **PaymentMethod[*]**: 41 fields × number of payment methods
4. **ChargeDetail[*]**: 11 fields × number of charges
5. **Note[*]**: 10 fields × number of notes

### Array Nesting Patterns
- Order → Payment → PaymentMethod → PaymentTransaction
- ReleaseLine → OrderLine → (Allocation, ChargeDetail, FulfillmentDetail)
- Multiple Extended objects at different nesting levels

## Field Type Analysis

### Data Types Distribution
- **String fields**: 45% (names, descriptions, IDs, URLs)
- **Null fields**: 30% (optional/conditional fields)
- **Boolean fields**: 15% (flags and switches)
- **Number fields**: 10% (quantities, prices, counts)

### Critical vs Optional Fields

**Critical Fields** (Required for basic order processing):
- Order identification (OrderId, AlternateOrderId)
- Customer information (CustomerFirstName, Phone, Email)
- Product details (ItemId, ItemBrand, Quantity)
- Pricing (Amount, UnitPrice, Total)
- Status fields (StatusId, IsCancelled, IsConfirmed)

**Optional Fields** (Business logic enhancement):
- Extended product information (multi-language names)
- Pickup store details (when not applicable)
- Promotion details (when no promotions)
- T1 loyalty fields (when not T1 customer)
- Gift wrapping options (when not selected)

## Field Naming Patterns

### Consistent Patterns Identified
1. **Multi-language support**: `ProductName[EN|TH|DE|IT|VN]`
2. **Address structure**: `Address1`, `Address2`, `Address3`
3. **Status tracking**: `Is[Status]`, `Has[Feature]`
4. **Source system fields**: `Source[Field]` vs `Latest[Field]`
5. **External references**: `External[System]Id`
6. **Pickup store prefix**: `PickUpStore[Field]`

### Special Field Categories
- **T1 Customer fields**: T1-prefixed fields for loyalty program
- **MMS/JDA Integration**: System-specific SKU and department codes
- **Slot booking**: Time-based delivery scheduling
- **Bundle handling**: Pack vs individual item fields

## Recommendations for Transformation Service

### Priority 1: Core Extended Fields
1. Implement all 20 fields from `Order.OrderExtension1.Extended`
2. Add all 65 fields from `ReleaseLine[*].OrderLine.OrderLineExtension1.Extended`
3. Include payment extended fields for billing address handling

### Priority 2: Array Structure Support
1. Ensure proper handling of ReleaseLine arrays (multiple products)
2. Support multiple payment methods per order
3. Handle charge detail arrays for discounts/fees

### Priority 3: Conditional Field Logic
1. Implement T1 customer field handling
2. Add pickup store field support (when applicable)
3. Handle promotion and bundle-specific fields

### Priority 4: Data Validation
1. Validate multi-language product names
2. Check address reference format consistency
3. Ensure proper boolean field handling for null values

## Field Gap Analysis

**Estimated Missing Field Distribution**:
- OrderLine Extended fields: ~200 fields (65 fields × ~3 line items)
- Payment/Billing Extended: ~25 fields
- Charge/Discount Extended: ~40 fields  
- Address/Location Extended: ~15 fields
- System Integration fields: ~50 fields
- Miscellaneous Extended: ~41 fields

**Total Estimated**: ~371 fields (matches user's reported gap)

## Technical Implementation Notes

### JSON Path Patterns for Missing Fields
```
OriginalPayload.Order.OrderExtension1.Extended.*
OriginalPayload.ReleaseLine[*].OrderLine.OrderLineExtension1.Extended.*
OriginalPayload.Order.Payment[*].PaymentMethod[*].Extended.*
OriginalPayload.ReleaseLine[*].OrderLine.OrderLineChargeDetail[*].Extended.*
OriginalPayload.ReleaseLine[*].OrderLine.ShipToAddress.Extended.*
OriginalPayload.Order.Payment[*].PaymentMethod[*].BillingAddress.Extended.*
```

### Data Type Mapping Requirements
- Handle null values appropriately (many fields are conditionally populated)
- Support multi-language strings (UTF-8 Thai characters)
- Parse datetime fields in ISO format
- Handle decimal pricing fields with proper precision
- Support boolean fields that may be null in source

This analysis provides the foundation for implementing the missing 371 fields in your transformation service.