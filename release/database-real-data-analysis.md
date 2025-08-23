# Database Real Data Analysis

## 🔍 **การวิเคราะห์ข้อมูลจริงจาก Database**

### **📋 ข้อมูลพื้นฐาน**
- **Database:** Omnia-DEV (PostgreSQL)
- **Host:** cg-omnia-psql-flex-nonprd.central.co.th:5432
- **Schema:** order
- **Connection:** SSL enabled

---

## 🎯 **การค้นพบข้อมูลจริงจาก Database**

### **1. ตารางที่มีอยู่ใน Database:**

| Table Name | Description | Records |
|------------|-------------|---------|
| `orders` | ข้อมูล orders หลัก | 5+ records |
| `order_lines` | ข้อมูล order lines | 3+ records |
| `payments` | ข้อมูล payments หลัก | 3+ records |
| `payment_methods` | ข้อมูล payment methods | 3+ records |
| `payment_transactions` | ข้อมูล payment transactions | 3+ records |
| `allocations` | ข้อมูล allocations | - |
| `fulfillment_details` | ข้อมูล fulfillment details | - |
| `quantity_details` | ข้อมูล quantity details | - |
| `release_lines` | ข้อมูล release lines | - |
| `releases` | ข้อมูล releases | - |
| `SequelizeMeta_order` | Migration metadata | - |

---

## 🎯 **ข้อมูลจริงจาก Orders Table**

### **✅ Fields ที่มีข้อมูลจริง:**

#### **Order ID ตัวอย่าง:**
- `10-SAN6-423924816-C7EJNB23JAUDN2`
- `11-SAN6-423924816-C7EJNB23JAUDN2`
- `12-SAN6-423924816-C7EJNB23JAUDN2`
- `13-SAN6-423924816-C7EJNB23JAUDN2`
- `123456789-C7L2LCDCTCC2AE`

#### **ข้อมูลจริงที่ค้นพบ:**

| Field | Sample Value | Notes |
|-------|--------------|-------|
| `order_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Primary key |
| `short_order_number` | `GM-366` | Alternate order ID |
| `customer_email` | `undefined` | Customer email |
| `customer_first_name` | `Grab Customer` | Customer first name |
| `customer_last_name` | `-` | Customer last name |
| `customer_phone` | `0101010122` | Customer phone |
| `currency_code` | `THB` | Currency |
| `selling_channel` | `Grab` | Selling channel |
| `org_id` | `CFR`, `CFM-UAT` | Organization ID |
| `max_fulfillment_status_id` | `1000`, `3500` | Max fulfillment status |
| `min_fulfillment_status_id` | `1000` | Min fulfillment status |
| `order_sub_total` | `117.0000`, `127.9600` | Order subtotal |
| `order_total` | `125.7800`, `128.6100` | Order total |
| `total_charges` | `8.0000`, `0.0000` | Total charges |
| `total_discounts` | `0.0000` | Total discounts |
| `total_taxes` | `0.7800`, `0.6500` | Total taxes |
| `is_on_hold` | `f` (false) | On hold status |
| `cancel_allowed` | `t` (true) | Cancel allowed |
| `is_cancelled` | `f` (false) | Cancelled status |
| `order_locale` | `th` | Order locale |
| `order_status` | `Open` | Order status |
| `fulfillment_status` | `Open` | Fulfillment status |
| `payment_status` | `Awaiting Payment Info` | Payment status |
| `captured_date` | `2025-06-02 10:38:39+00` | Captured date |
| `created_at` | `2025-08-22 05:35:51.565+00` | Created timestamp |
| `updated_at` | `2025-08-22 05:35:51.565+00` | Updated timestamp |
| `created_by` | `system` | Created by |
| `updated_by` | `system` | Updated by |

#### **JSONB Fields ที่มีข้อมูลจริง:**

| JSONB Field | Sample Data | Notes |
|-------------|-------------|-------|
| `doc_type` | `{"DocTypeId": "CustomerOrder"}` | Document type |
| `order_actions` | `[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]` | Order actions |
| `order_extension1` | `{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}` | Order extensions |
| `order_charge_detail` | `[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 12, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}]` | Charge details |
| `order_tax_detail` | `[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.78, "TaxTypeId": "VAT", "TaxableAmount": 11.21, "IsInformational": true}]` | Tax details |
| `order_type` | `{"OrderTypeId": "MKP-HD-STD"}` | Order type |
| `order_note` | `[{"NoteText": "GM-366", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]` | Order notes |

---

## 🎯 **ข้อมูลจริงจาก Order Lines Table**

### **✅ Fields ที่มีข้อมูลจริง:**

#### **Order Line ID ตัวอย่าง:**
- `000-0-0`
- `001-1-1`
- `002-2-2`

#### **ข้อมูลจริงที่ค้นพบ:**

| Field | Sample Value | Notes |
|-------|--------------|-------|
| `order_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Foreign key |
| `order_line_id` | `000-0-0` | Order line ID |
| `release_group_id` | `3-CZDEEY43ATN1N2` | Release group ID |
| `shipping_method_id` | `Standard Delivery` | Shipping method |
| `fulfillment_group_id` | (empty) | Fulfillment group ID |
| `max_fulfillment_status_id` | `1000` | Max fulfillment status |
| `min_fulfillment_status_id` | `1000` | Min fulfillment status |
| `ship_from_address_id` | `CFR99999` | Ship from address |
| `item_id` | `8853474045150`, `8857200469104` | Item ID |
| `item_description` | `สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10`, `แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5` | Item description |
| `is_gift` | `f` (false) | Gift flag |
| `is_tax_included` | `t` (true) | Tax included |
| `is_pre_order` | `f` (false) | Pre-order flag |
| `is_cancelled` | `f` (false) | Cancelled flag |
| `uom` | `SPAC` | Unit of measure |
| `quantity` | `1.0000` | Quantity |
| `unit_price` | `41.0000`, `35.0000` | Unit price |
| `original_unit_price` | `41.0000`, `39.0000` | Original unit price |
| `order_line_sub_total` | `41.0000`, `35.0000` | Line subtotal |
| `order_line_total` | `41.0000`, `35.0000` | Line total |
| `order_line_tax_total` | `2.6800`, `2.2800` | Line tax total |
| `fulfillment_status` | `Open` | Fulfillment status |
| `order_line_status` | `Open` | Order line status |
| `created_at` | `2025-08-22 05:35:51.62+00` | Created timestamp |
| `updated_at` | `2025-08-22 05:35:51.62+00` | Updated timestamp |

#### **JSONB Fields ที่มีข้อมูลจริง:**

| JSONB Field | Sample Data | Notes |
|-------------|-------------|-------|
| `delivery_method` | `{"DeliveryMethodId": "ShipToAddress"}` | Delivery method |
| `order_line_note` | `[{"NoteId": "R02_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]` | Line notes |
| `order_line_charge_detail` | `[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "3-CZDEEY43ATN1N2-C7EFKCCVE8MKA2-86534337", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -4, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-002-2", "IsInformational": true, "RequestedAmount": -4, "ChargeDisplayName": "Product Discount Promotion"}]` | Line charge details |
| `order_line_tax_detail` | `[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]` | Line tax details |
| `order_line_promising_info` | `{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}` | Promising info |
| `ship_to_address` | `{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}` | Ship to address |
| `order_line_extension1` | `{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}` | Line extensions |

---

## 🎯 **ข้อมูลจริงจาก Payments Table**

### **✅ Fields ที่มีข้อมูลจริง:**

#### **Payment ID ตัวอย่าง:**
- `10-7f4c5bd2-97f1-4afe-975d-09a86111176b`
- `11-7f4c5bd2-97f1-4afe-975d-09a86111176b`
- `12-7f4c5bd2-97f1-4afe-975d-09a86111176b`

#### **ข้อมูลจริงที่ค้นพบ:**

| Field | Sample Value | Notes |
|-------|--------------|-------|
| `order_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Foreign key |
| `payment_id` | `10-7f4c5bd2-97f1-4afe-975d-09a86111176b` | Payment ID |
| `org_id` | `CFR` | Organization ID |
| `payment_group_id` | `0cc81698-0da9-4caa-873b-cbd5ac644c5c` | Payment group ID |
| `status_id` | `Not Applicable` | Status ID |
| `message` | (empty) | Message |
| `is_anonymized` | `f` (false) | Anonymized flag |
| `is_cancelled` | `f` (false) | Cancelled flag |
| `created_at` | `2025-08-22 05:35:51.729+00` | Created timestamp |
| `updated_at` | `2025-08-22 05:35:51.729+00` | Updated timestamp |
| `created_by` | `system` | Created by |
| `updated_by` | `system` | Updated by |

#### **JSONB Fields ที่มีข้อมูลจริง:**

| JSONB Field | Sample Data | Notes |
|-------------|-------------|-------|
| `processing_mode` | `{"ProcessingModeId": "ExternalProcessing"}` | Processing mode |

---

## 🎯 **ข้อมูลจริงจาก Payment Methods Table**

### **✅ Fields ที่มีข้อมูลจริง:**

#### **Payment Method ID ตัวอย่าง:**
- `10-7f4c5bd2-97f1-4afe-975d-09a86111176b`
- `11-7f4c5bd2-97f1-4afe-975d-09a86111176b`
- `12-7f4c5bd2-97f1-4afe-975d-09a86111176b`

#### **ข้อมูลจริงที่ค้นพบ:**

| Field | Sample Value | Notes |
|-------|--------------|-------|
| `order_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Foreign key |
| `payment_id` | `10-7f4c5bd2-97f1-4afe-975d-09a86111176b` | Payment ID |
| `payment_method_id` | `10-7f4c5bd2-97f1-4afe-975d-09a86111176b` | Payment method ID |
| `currency_code` | `THB` | Currency code |
| `parent_order_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Parent order ID |
| `org_id` | `CFR` | Organization ID |
| `gateway_id` | `Simulator` | Gateway ID |
| `amount` | `117.0000` | Amount |
| `current_settled_amount` | `117.0000` | Current settled amount |
| `is_suspended` | `f` (false) | Suspended flag |
| `is_voided` | `f` (false) | Voided flag |
| `is_copied` | `f` (false) | Copied flag |
| `is_modifiable` | `t` (true) | Modifiable flag |
| `created_at` | `2025-08-22 05:35:51.823+00` | Created timestamp |
| `updated_at` | `2025-08-22 05:35:51.823+00` | Updated timestamp |
| `created_by` | `system` | Created by |
| `updated_by` | `system` | Updated by |

#### **JSONB Fields ที่มีข้อมูลจริง:**

| JSONB Field | Sample Data | Notes |
|-------------|-------------|-------|
| `billing_address` | `{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}` | Billing address |
| `payment_type` | `{"PaymentTypeId": "Cash On Delivery"}` | Payment type |
| `extended` | `{"AddressRef": "|||4016|TH"}` | Extended info |

---

## 🎯 **ข้อมูลจริงจาก Payment Transactions Table**

### **✅ Fields ที่มีข้อมูลจริง:**

#### **Payment Transaction ID ตัวอย่าง:**
- `10-7f4c5bd2-97f1-4afe-975d-09a86111176b`
- `11-7f4c5bd2-97f1-4afe-975d-09a86111176b`
- `12-7f4c5bd2-97f1-4afe-975d-09a86111176b`

#### **ข้อมูลจริงที่ค้นพบ:**

| Field | Sample Value | Notes |
|-------|--------------|-------|
| `order_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Foreign key |
| `payment_method_id` | `10-7f4c5bd2-97f1-4afe-975d-09a86111176b` | Payment method ID |
| `payment_transaction_id` | `10-7f4c5bd2-97f1-4afe-975d-09a86111176b` | Payment transaction ID |
| `is_activation` | `f` (false) | Activation flag |
| `is_active` | `t` (true) | Active flag |
| `is_copied` | `f` (false) | Copied flag |
| `is_valid_for_refund` | `t` (true) | Valid for refund |
| `reconciliation_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Reconciliation ID |
| `request_id` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Request ID |
| `request_token` | `10-SAN6-423924816-C7EJNB23JAUDN2` | Request token |
| `processed_amount` | `117.0000` | Processed amount |
| `requested_amount` | `117.0000` | Requested amount |
| `transaction_date` | `2025-06-02 10:38:39+00` | Transaction date |
| `created_at` | `2025-08-22 05:35:51.876+00` | Created timestamp |
| `updated_at` | `2025-08-22 05:35:51.876+00` | Updated timestamp |
| `created_by` | `system` | Created by |
| `updated_by` | `system` | Updated by |

#### **JSONB Fields ที่มีข้อมูลจริง:**

| JSONB Field | Sample Data | Notes |
|-------------|-------------|-------|
| `payment_response_status` | `{"PaymentResponseStatusId": "Success"}` | Payment response status |
| `status` | `{"PaymentTransactionStatusId": "Closed"}` | Transaction status |
| `transmission_status` | `{"PaymentTransmissionStatusId": "Closed"}` | Transmission status |
| `transaction_type` | `{"PaymentTransactionTypeId": "Settlement"}` | Transaction type |

---

## 🔧 **ข้อเสนอแนะการแก้ไข Service**

### **1. ใช้ข้อมูลจริงจาก Database:**

#### **Order Fields ที่ควร Map:**
```typescript
// ใช้ข้อมูลจริงจาก database
ServiceLevelCode: order.maxFulfillmentStatusId || 'STD',
OrderSubtotal: order.orderSubTotal || 0,
OrderTotal: order.orderTotal || 0,
TotalCharges: order.totalCharges || 0,
TotalDiscounts: order.totalDiscounts || 0,
TotalTaxes: order.totalTaxes || 0,
CurrencyCode: order.currencyCode || 'THB',
CustomerEmail: order.customerEmail || 'undefined',
CustomerFirstName: order.customerFirstName || '',
CustomerLastName: order.customerLastName || '-',
CustomerPhone: order.customerPhone || '',
SellingChannelId: order.sellingChannel || 'Grab',
OrganizationId: order.orgId || 'CFR',
IsOnHold: order.isOnHold || false,
CancelAllowed: order.cancelAllowed || true,
IsCancelled: order.isCancelled || false,
OrderLocale: order.orderLocale || 'th',
OrderStatus: order.orderStatus || 'Open',
FulfillmentStatus: order.fulfillmentStatus || 'Open',
PaymentStatus: order.paymentStatus || 'Awaiting Payment Info',
CapturedDate: order.capturedDate?.toISOString(),
CreatedAt: order.createdAt?.toISOString(),
UpdatedAt: order.updatedAt?.toISOString(),
CreatedBy: order.createdBy || 'system',
UpdatedBy: order.updatedBy || 'system',
```

#### **OrderLine Fields ที่ควร Map:**
```typescript
// ใช้ข้อมูลจริงจาก database
ItemId: line.itemId || '',
ItemDescription: line.itemDescription || '',
Quantity: line.quantity || 0,
UnitPrice: line.unitPrice || 0,
OriginalUnitPrice: line.originalUnitPrice || line.unitPrice,
OrderLineSubtotal: line.orderLineSubtotal || 0,
OrderLineTotal: line.orderLineTotal || 0,
OrderLineTaxTotal: line.orderLineTaxTotal || 0,
IsGift: line.isGift || false,
IsTaxIncluded: line.isTaxIncluded || true,
IsPreOrder: line.isPreOrder || false,
IsCancelled: line.isCancelled || false,
UOM: line.uom || 'SPAC',
FulfillmentStatus: line.fulfillmentStatus || 'Open',
OrderLineStatus: line.orderLineStatus || 'Open',
```

#### **Payment Fields ที่ควร Map:**
```typescript
// ใช้ข้อมูลจริงจาก database
PaymentId: payment.paymentId || '',
OrgId: payment.orgId || 'CFR',
PaymentGroupId: payment.paymentGroupId || '',
StatusId: payment.statusId || 'Not Applicable',
IsAnonymized: payment.isAnonymized || false,
IsCancelled: payment.isCancelled || false,
CreatedAt: payment.createdAt?.toISOString(),
UpdatedAt: payment.updatedAt?.toISOString(),
CreatedBy: payment.createdBy || 'system',
UpdatedBy: payment.updatedBy || 'system',
```

#### **PaymentMethod Fields ที่ควร Map:**
```typescript
// ใช้ข้อมูลจริงจาก database
PaymentMethodId: method.paymentMethodId || '',
CurrencyCode: method.currencyCode || 'THB',
Amount: method.amount || 0,
CurrentSettledAmount: method.currentSettledAmount || 0,
IsSuspended: method.isSuspended || false,
IsVoided: method.isVoided || false,
IsCopied: method.isCopied || false,
IsModifiable: method.isModifiable || true,
GatewayId: method.gatewayId || 'Simulator',
CreatedAt: method.createdAt?.toISOString(),
UpdatedAt: method.updatedAt?.toISOString(),
CreatedBy: method.createdBy || 'system',
UpdatedBy: method.updatedBy || 'system',
```

#### **PaymentTransaction Fields ที่ควร Map:**
```typescript
// ใช้ข้อมูลจริงจาก database
PaymentTransactionId: transaction.paymentTransactionId || '',
IsActivation: transaction.isActivation || false,
IsActive: transaction.isActive || true,
IsCopied: transaction.isCopied || false,
IsValidForRefund: transaction.isValidForRefund || true,
ReconciliationId: transaction.reconciliationId || '',
RequestId: transaction.requestId || '',
RequestToken: transaction.requestToken || '',
ProcessedAmount: transaction.processedAmount || 0,
RequestedAmount: transaction.requestedAmount || 0,
TransactionDate: transaction.transactionDate?.toISOString(),
CreatedAt: transaction.createdAt?.toISOString(),
UpdatedAt: transaction.updatedAt?.toISOString(),
CreatedBy: transaction.createdBy || 'system',
UpdatedBy: transaction.updatedBy || 'system',
```

### **2. ใช้ JSONB Fields:**

#### **Order JSONB Fields:**
```typescript
// ใช้ JSONB fields จาก database
DocTypeId: order.docType?.DocTypeId || 'CustomerOrder',
OrderTypeId: order.orderType?.OrderTypeId || 'MKP-HD-STD',
ChargeDetail: order.orderChargeDetail || [],
TaxDetail: order.orderTaxDetail || [],
Note: order.orderNote || [],
ExtendedFields: order.orderExtension1?.Extended || {},
```

#### **OrderLine JSONB Fields:**
```typescript
// ใช้ JSONB fields จาก database
DeliveryMethod: line.deliveryMethod?.DeliveryMethodId || 'ShipToAddress',
ShipToAddress: line.shipToAddress || {},
OrderLineNote: line.orderLineNote || [],
OrderLineChargeDetail: line.orderLineChargeDetail || [],
OrderLineTaxDetail: line.orderLineTaxDetail || [],
OrderLineExtension1: line.orderLineExtension1?.Extended || {},
```

#### **Payment JSONB Fields:**
```typescript
// ใช้ JSONB fields จาก database
ProcessingMode: payment.processingMode?.ProcessingModeId || 'ExternalProcessing',
```

#### **PaymentMethod JSONB Fields:**
```typescript
// ใช้ JSONB fields จาก database
BillingAddress: method.billingAddress || {},
PaymentType: method.paymentType?.PaymentTypeId || 'Cash On Delivery',
Extended: method.extended || {},
```

#### **PaymentTransaction JSONB Fields:**
```typescript
// ใช้ JSONB fields จาก database
PaymentResponseStatus: transaction.paymentResponseStatus?.PaymentResponseStatusId || 'Success',
Status: transaction.status?.PaymentTransactionStatusId || 'Closed',
TransmissionStatus: transaction.transmissionStatus?.PaymentTransmissionStatusId || 'Closed',
TransactionType: transaction.transactionType?.PaymentTransactionTypeId || 'Settlement',
```

---

## 📊 **สรุปการวิเคราะห์**

### **✅ ข้อมูลที่ค้นพบ:**
- **Orders:** 5+ records พร้อมข้อมูลครบถ้วน
- **Order Lines:** 3+ records พร้อมข้อมูลครบถ้วน
- **Payments:** 3+ records พร้อมข้อมูลครบถ้วน
- **Payment Methods:** 3+ records พร้อมข้อมูลครบถ้วน
- **Payment Transactions:** 3+ records พร้อมข้อมูลครบถ้วน

### **🔧 ข้อเสนอแนะ:**
1. **ใช้ข้อมูลจริงจาก database** แทนการ hard code
2. **Map JSONB fields** ที่มีข้อมูลครบถ้วน
3. **ใช้ calculated fields** จาก database
4. **เพิ่ม error handling** สำหรับ missing data
5. **สร้าง field mapping utility** สำหรับแปลงข้อมูล

**การแก้ไขนี้จะทำให้ service ใช้ข้อมูลจริงจาก database แทนการ hard code ค่าครับ! 🔧**
