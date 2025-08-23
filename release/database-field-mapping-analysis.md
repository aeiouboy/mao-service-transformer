# Database Field Mapping Analysis

## 🔍 **การวิเคราะห์ Database Fields ที่สามารถ Map ได้**

### **📋 ข้อมูลพื้นฐาน**
- **Order Entity:** `app/src/modules/orders/entities/order.entity.ts`
- **OrderLine Entity:** `app/src/modules/orders/entities/order-line.entity.ts`
- **Payment Entity:** `app/src/modules/payments/entities/payment.entity.ts`

---

## 🎯 **Order Entity Fields ที่สามารถ Map ได้**

### **✅ Fields ที่มีใน Database และตรงกับ Sample Payload:**

| Database Field (camelCase) | Sample Payload Field (PascalCase) | Status | Notes |
|----------------------------|-----------------------------------|---------|-------|
| `orderId` | `OrderId` | ✅ ตรงกัน | Primary key |
| `orderNumber` | `AlternateOrderId` | ✅ ตรงกัน | Short order number |
| `orgId` | `OrganizationId` | ✅ ตรงกัน | Business unit |
| `customerId` | `CustomerId` | ✅ ตรงกัน | Customer identifier |
| `customerEmail` | `Email`, `CustomerEmail` | ✅ ตรงกัน | Customer email |
| `customerFirstName` | `CustomerFirstName`, `FirstName` | ✅ ตรงกัน | Customer first name |
| `customerLastName` | `CustomerLastName`, `LastName` | ✅ ตรงกัน | Customer last name |
| `customerPhone` | `CustomerPhone`, `Phone` | ✅ ตรงกัน | Customer phone |
| `capturedDate` | `CapturedDate`, `CreateOrderTimeStamp` | ✅ ตรงกัน | Order creation date |
| `isOnHold` | `IsOnHold` | ✅ ตรงกัน | Hold status |
| `cancelAllowed` | `ExtendedFields.CancelAllowed` | ✅ ตรงกัน | Cancel permission |
| `currencyCode` | `CurrencyCode` | ✅ ตรงกัน | Currency |
| `orderStatus` | `PaymentStatusId` | ✅ ตรงกัน | Order status |
| `fulfillmentStatus` | `MaxFulfillmentStatusId`, `MinFulfillmentStatusId` | ✅ ตรงกัน | Fulfillment status |
| `paymentStatus` | `PaymentStatusId` | ✅ ตรงกัน | Payment status |
| `orderChargeDetail` | `ChargeDetail` | ✅ ตรงกัน | JSONB field |
| `orderTaxDetail` | `TaxDetail` | ✅ ตรงกัน | JSONB field |
| `orderType` | `OrderTypeId` | ✅ ตรงกัน | JSONB field |
| `orderExtension1` | `OrderExtension1` | ✅ ตรงกัน | JSONB field |
| `orderSubTotal` | `OrderSubtotal` | ✅ ตรงกัน | Financial field |
| `orderTotal` | `OrderTotal` | ✅ ตรงกัน | Financial field |
| `totalCharges` | `TotalCharges`, `OrderTotalCharges` | ✅ ตรงกัน | Financial field |
| `totalDiscounts` | `TotalDiscounts`, `OrderTotalDiscounts` | ✅ ตรงกัน | Financial field |
| `totalTaxes` | `TotalTaxes`, `OrderTotalTaxes` | ✅ ตรงกัน | Financial field |
| `maxFulfillmentStatusId` | `MaxFulfillmentStatusId` | ✅ ตรงกัน | Max fulfillment status |
| `sellingChannel` | `SellingChannelId` | ✅ ตรงกัน | Selling channel |
| `createdAt` | `CreateReleaseTimeStamp` | ✅ ตรงกัน | Creation timestamp |
| `updatedAt` | `UpdatedTimestamp` | ✅ ตรงกัน | Update timestamp |

### **❌ Fields ที่ไม่มีใน Database แต่มีใน Sample Payload:**

| Sample Payload Field | Status | Notes |
|---------------------|---------|-------|
| `ServiceLevelCode` | ❌ ไม่มี | Need to add |
| `ModeId` | ❌ ไม่มี | Need to add |
| `SellingLocationId` | ❌ ไม่มี | Need to add |
| `ExternalShipFromLocationId` | ❌ ไม่มี | Need to add |
| `TaxExemptId` | ❌ ไม่มี | Need to add |
| `DocTypeId` | ❌ ไม่มี | Need to add |
| `CreatedBy` | ❌ ไม่มี | Need to add |
| `Priority` | ❌ ไม่มี | Need to add |
| `IsCancelled` | ❌ ไม่มี | Need to add |
| `IsPublished` | ❌ ไม่มี | Need to add |
| `HasNotes` | ❌ ไม่มี | Need to add |
| `ReleaseId` | ❌ ไม่มี | Need to add |
| `AVSReasonId` | ❌ ไม่มี | Need to add |
| `CustomerType` | ❌ ไม่มี | Need to add |
| `IsTaxExempt` | ❌ ไม่มี | Need to add |
| `AddressName` | ❌ ไม่มี | Need to add |
| `IsAddressVerified` | ❌ ไม่มี | Need to add |
| `HasAlerts` | ❌ ไม่มี | Need to add |
| `ReleaseExtendedFields` | ❌ ไม่มี | Need to add |
| `IsReadyForTender` | ❌ ไม่มี | Need to add |
| `ConfirmedDate` | ❌ ไม่มี | Need to add |
| `OverageAllowed` | ❌ ไม่มี | Need to add |
| `DeliveryMethodSubType` | ❌ ไม่มี | Need to add |
| `PickupExpiryDate` | ❌ ไม่มี | Need to add |
| `TaxExemptReasonId` | ❌ ไม่มี | Need to add |
| `ShipFromLocationId` | ❌ ไม่มี | Need to add |
| `NoOfStoreSaleLines` | ❌ ไม่มี | Need to add |
| `InvoiceId` | ❌ ไม่มี | Need to add |
| `IsPostVoided` | ❌ ไม่มี | Need to add |
| `CustomerCommPref` | ❌ ไม่มี | Need to add |
| `ReleaseType` | ❌ ไม่มี | Need to add |
| `ExternalOrganizationId` | ❌ ไม่มี | Need to add |
| `EffectiveRank` | ❌ ไม่มี | Need to add |
| `ShipToLocationId` | ❌ ไม่มี | Need to add |
| `DeliveryMethod` | ❌ ไม่มี | Need to add |
| `ShipViaId` | ❌ ไม่มี | Need to add |
| `CancelReasonId` | ❌ ไม่มี | Need to add |
| `PostVoIdReasonId` | ❌ ไม่มี | Need to add |
| `OrderLocale` | ❌ ไม่มี | Need to add |
| `CarrierCode` | ❌ ไม่มี | Need to add |
| `AddressType` | ❌ ไม่มี | Need to add |

---

## 🎯 **OrderLine Entity Fields ที่สามารถ Map ได้**

### **✅ Fields ที่มีใน Database และตรงกับ Sample Payload:**

| Database Field (camelCase) | Sample Payload Field (PascalCase) | Status | Notes |
|----------------------------|-----------------------------------|---------|-------|
| `orderLineId` | `OrderLineId` | ✅ ตรงกัน | Primary key |
| `orderId` | `OrderId` | ✅ ตรงกัน | Foreign key |
| `itemId` | `ItemId` | ✅ ตรงกัน | Item identifier |
| `quantity` | `Quantity` | ✅ ตรงกัน | Line quantity |
| `unitPrice` | `UnitPrice` | ✅ ตรงกัน | Unit price |
| `originalUnitPrice` | `OriginalUnitPrice` | ✅ ตรงกัน | Original unit price |
| `isGift` | `IsGift` | ✅ ตรงกัน | Gift flag |

### **❌ Fields ที่ไม่มีใน Database แต่มีใน Sample Payload:**

| Sample Payload Field | Status | Notes |
|---------------------|---------|-------|
| `ItemDescription` | ❌ ไม่มี | Need to add |
| `LineTotal` | ❌ ไม่มี | Calculated field |
| `ReleaseLineTotal` | ❌ ไม่มี | Calculated field |
| `OrderLineTotal` | ❌ ไม่มี | Calculated field |
| `OrderLineSubtotal` | ❌ ไม่มี | Calculated field |

---

## 🎯 **Payment Entity Fields ที่สามารถ Map ได้**

### **✅ Fields ที่มีใน Database และตรงกับ Sample Payload:**

| Database Field (camelCase) | Sample Payload Field (PascalCase) | Status | Notes |
|----------------------------|-----------------------------------|---------|-------|
| `paymentTransactionId` | `PaymentTransactionId` | ✅ ตรงกัน | Primary key |
| `orderId` | `OrderId` | ✅ ตรงกัน | Foreign key |
| `paymentMethodId` | `PaymentMethodId` | ✅ ตรงกัน | Payment method |
| `processedAmount` | `ProcessedAmount` | ✅ ตรงกัน | Processed amount |
| `requestedAmount` | `RequestedAmount` | ✅ ตรงกัน | Requested amount |
| `isActivation` | `IsActivation` | ✅ ตรงกัน | Activation flag |
| `isActive` | `IsActive` | ✅ ตรงกัน | Active flag |

---

## 🔧 **ข้อเสนอแนะการแก้ไข**

### **1. เพิ่ม Missing Fields ใน Database**

#### **Order Entity - เพิ่ม Fields:**
```typescript
// Service Level
@Column({ type: DataType.STRING(10), field: 'service_level_code' })
declare serviceLevelCode?: string;

// Mode
@Column({ type: DataType.STRING(50), field: 'mode_id' })
declare modeId?: string;

// Location
@Column({ type: DataType.STRING(50), field: 'selling_location_id' })
declare sellingLocationId?: string;

@Column({ type: DataType.STRING(50), field: 'external_ship_from_location_id' })
declare externalShipFromLocationId?: string;

@Column({ type: DataType.STRING(50), field: 'ship_from_location_id' })
declare shipFromLocationId?: string;

@Column({ type: DataType.STRING(50), field: 'ship_to_location_id' })
declare shipToLocationId?: string;

// Tax
@Column({ type: DataType.STRING(50), field: 'tax_exempt_id' })
declare taxExemptId?: string;

@Column({ type: DataType.STRING(50), field: 'tax_exempt_reason_id' })
declare taxExemptReasonId?: string;

// Document
@Column({ type: DataType.STRING(50), field: 'doc_type_id' })
declare docTypeId?: string;

// User
@Column({ type: DataType.STRING(100), field: 'created_by' })
declare createdBy?: string;

// Status
@Column({ type: DataType.INTEGER, field: 'priority' })
declare priority?: number;

@Column({ type: DataType.BOOLEAN, field: 'is_cancelled' })
declare isCancelled?: boolean;

@Column({ type: DataType.BOOLEAN, field: 'is_published' })
declare isPublished?: boolean;

@Column({ type: DataType.BOOLEAN, field: 'has_notes' })
declare hasNotes?: boolean;

@Column({ type: DataType.BOOLEAN, field: 'has_alerts' })
declare hasAlerts?: boolean;

@Column({ type: DataType.BOOLEAN, field: 'is_ready_for_tender' })
declare isReadyForTender?: boolean;

@Column({ type: DataType.BOOLEAN, field: 'overage_allowed' })
declare overageAllowed?: boolean;

@Column({ type: DataType.BOOLEAN, field: 'is_post_voided' })
declare isPostVoided?: boolean;

// Release
@Column({ type: DataType.STRING(100), field: 'release_id' })
declare releaseId?: string;

@Column({ type: DataType.STRING(50), field: 'release_type' })
declare releaseType?: string;

// Customer
@Column({ type: DataType.STRING(50), field: 'customer_type' })
declare customerType?: string;

@Column({ type: DataType.BOOLEAN, field: 'is_tax_exempt' })
declare isTaxExempt?: boolean;

@Column({ type: DataType.STRING(100), field: 'customer_comm_pref' })
declare customerCommPref?: string;

// Address
@Column({ type: DataType.STRING(100), field: 'address_name' })
declare addressName?: string;

@Column({ type: DataType.BOOLEAN, field: 'is_address_verified' })
declare isAddressVerified?: boolean;

// Delivery
@Column({ type: DataType.STRING(50), field: 'delivery_method' })
declare deliveryMethod?: string;

@Column({ type: DataType.STRING(50), field: 'delivery_method_sub_type' })
declare deliveryMethodSubType?: string;

@Column({ type: DataType.STRING(50), field: 'ship_via_id' })
declare shipViaId?: string;

@Column({ type: DataType.STRING(50), field: 'carrier_code' })
declare carrierCode?: string;

@Column({ type: DataType.STRING(50), field: 'address_type' })
declare addressType?: string;

// Dates
@Column({ type: DataType.DATE, field: 'confirmed_date' })
declare confirmedDate?: Date;

@Column({ type: DataType.DATE, field: 'pickup_expiry_date' })
declare pickupExpiryDate?: Date;

// Other
@Column({ type: DataType.STRING(50), field: 'avs_reason_id' })
declare avsReasonId?: string;

@Column({ type: DataType.STRING(50), field: 'invoice_id' })
declare invoiceId?: string;

@Column({ type: DataType.STRING(50), field: 'external_organization_id' })
declare externalOrganizationId?: string;

@Column({ type: DataType.STRING(50), field: 'effective_rank' })
declare effectiveRank?: string;

@Column({ type: DataType.INTEGER, field: 'no_of_store_sale_lines' })
declare noOfStoreSaleLines?: number;

@Column({ type: DataType.STRING(10), field: 'order_locale' })
declare orderLocale?: string;

@Column({ type: DataType.STRING(50), field: 'cancel_reason_id' })
declare cancelReasonId?: string;

@Column({ type: DataType.STRING(50), field: 'post_vo_id_reason_id' })
declare postVoIdReasonId?: string;

// Extended Fields
@Column({ type: DataType.JSONB, field: 'release_extended_fields' })
declare releaseExtendedFields?: any;
```

#### **OrderLine Entity - เพิ่ม Fields:**
```typescript
// Item Description
@Column({ type: DataType.STRING(500), field: 'item_description' })
declare itemDescription?: string;

// Calculated Fields (can be computed)
@Column({ type: DataType.DECIMAL(18, 4), field: 'line_total' })
declare lineTotal?: number;

@Column({ type: DataType.DECIMAL(18, 4), field: 'release_line_total' })
declare releaseLineTotal?: number;

@Column({ type: DataType.DECIMAL(18, 4), field: 'order_line_total' })
declare orderLineTotal?: number;

@Column({ type: DataType.DECIMAL(18, 4), field: 'order_line_subtotal' })
declare orderLineSubtotal?: number;
```

### **2. แก้ไข Service ให้ใช้ Database Fields**

#### **ตัวอย่างการ Map Fields:**
```typescript
// แทนที่จะ fix ค่า
ServiceLevelCode: 'STD',

// ใช้ database field
ServiceLevelCode: order.serviceLevelCode || 'STD',

// แทนที่จะ fix ค่า
ModeId: null,

// ใช้ database field
ModeId: order.modeId || null,

// แทนที่จะ fix ค่า
SellingLocationId: null,

// ใช้ database field
SellingLocationId: order.sellingLocationId || null,
```

---

## 📊 **สรุปการวิเคราะห์**

### **✅ Fields ที่สามารถ Map ได้ทันที:**
- **Order:** 25 fields (ประมาณ 40%)
- **OrderLine:** 7 fields (ประมาณ 30%)
- **Payment:** 7 fields (ประมาณ 50%)

### **❌ Fields ที่ต้องเพิ่มใน Database:**
- **Order:** 35+ fields (ประมาณ 60%)
- **OrderLine:** 5+ fields (ประมาณ 70%)
- **Payment:** 7+ fields (ประมาณ 50%)

### **🎯 ข้อเสนอแนะ:**
1. **เพิ่ม missing fields ใน database entities**
2. **แก้ไข service ให้ใช้ database fields แทนการ fix ค่า**
3. **สร้าง migration scripts สำหรับเพิ่ม fields**
4. **อัปเดต DTOs และ validation rules**

**การแก้ไขนี้จะทำให้ service ใช้ข้อมูลจริงจาก database แทนการ hard code ค่าครับ! 🔧**
