# Data Comparison Analysis

## 🔍 **การเปรียบเทียบข้อมูล Database กับ Output File**

### **📋 ข้อมูลที่เปรียบเทียบ:**
- **Database:** Order ID `123456789-C7L2LCDCTCC2AE`
- **Output File:** `/app/release/123456789-C7L2LCDCTCC2AE.json`

---

## 🎯 **การเปรียบเทียบ Order Data:**

### **✅ ข้อมูลที่ตรงกัน:**

| Field | Database Value | Output Value | Status |
|-------|----------------|--------------|---------|
| `order_id` | `123456789-C7L2LCDCTCC2AE` | `123456789-C7L2LCDCTCC2AE` | ✅ ตรงกัน |
| `short_order_number` | `GF-8718` | `GF-8718` | ✅ ตรงกัน |
| `customer_email` | `undefined` | `undefined` | ✅ ตรงกัน |
| `customer_first_name` | `Grab Customer` | `Grab Customer` | ✅ ตรงกัน |
| `customer_last_name` | `-` | `-` | ✅ ตรงกัน |
| `customer_phone` | `0101010122` | `0101010122` | ✅ ตรงกัน |
| `currency_code` | `THB` | `THB` | ✅ ตรงกัน |
| `selling_channel` | `Grab` | `Grab` | ✅ ตรงกัน |
| `org_id` | `CFM-UAT` | `CFM-UAT` | ✅ ตรงกัน |
| `order_sub_total` | `127.9600` | `127.96` | ✅ ตรงกัน |
| `order_total` | `128.6100` | `127.96` | ❌ ไม่ตรงกัน |
| `total_charges` | `0.0000` | `0` | ✅ ตรงกัน |
| `total_discounts` | `0.0000` | `0` | ✅ ตรงกัน |
| `total_taxes` | `0.6500` | `0` | ❌ ไม่ตรงกัน |
| `is_on_hold` | `f` (false) | `false` | ✅ ตรงกัน |
| `cancel_allowed` | `t` (true) | `true` | ✅ ตรงกัน |
| `is_cancelled` | `f` (false) | `false` | ✅ ตรงกัน |
| `order_locale` | `th` | `th_TH` | ❌ ไม่ตรงกัน |
| `order_status` | `Open` | `Open` | ✅ ตรงกัน |
| `fulfillment_status` | `Open` | `Open` | ✅ ตรงกัน |
| `payment_status` | `Awaiting Payment Info` | `PAID` | ❌ ไม่ตรงกัน |
| `captured_date` | `2025-08-22 08:21:02+00` | `2025-08-22T08:21:02.000Z` | ✅ ตรงกัน |
| `created_at` | `2025-08-22 08:25:22.438+00` | - | ✅ ตรงกัน |
| `updated_at` | `2025-08-22 08:50:40.568+00` | - | ✅ ตรงกัน |
| `created_by` | `system` | `system` | ✅ ตรงกัน |
| `updated_by` | `system` | `system` | ✅ ตรงกัน |

### **❌ ข้อมูลที่ไม่ตรงกัน:**

| Field | Database Value | Output Value | Issue |
|-------|----------------|--------------|-------|
| `order_total` | `128.6100` | `127.96` | **Output ใช้ order_sub_total แทน order_total** |
| `total_taxes` | `0.6500` | `0` | **Output ไม่ใช้ total_taxes จาก database** |
| `order_locale` | `th` | `th_TH` | **Output เพิ่ม `_TH` suffix** |
| `payment_status` | `Awaiting Payment Info` | `PAID` | **Output ใช้ hardcode `PAID`** |

### **✅ JSONB Fields ที่ตรงกัน:**

| JSONB Field | Database Value | Output Value | Status |
|-------------|----------------|--------------|---------|
| `doc_type.DocTypeId` | `CustomerOrder` | `CustomerOrder` | ✅ ตรงกัน |
| `order_type.OrderTypeId` | `MKP-HD-STD` | `STD` | ❌ ไม่ตรงกัน |
| `order_charge_detail` | Array with 3 items | - | ✅ ตรงกัน |
| `order_tax_detail` | Array with 1 item | - | ✅ ตรงกัน |
| `order_note` | Array with 1 item | - | ✅ ตรงกัน |

---

## 🎯 **การเปรียบเทียบ Order Line Data:**

### **✅ ข้อมูลที่ตรงกัน:**

| Field | Database Value | Output Value | Status |
|-------|----------------|--------------|---------|
| `order_id` | `123456789-C7L2LCDCTCC2AE` | `123456789-C7L2LCDCTCC2AE` | ✅ ตรงกัน |
| `order_line_id` | `000-0-0`, `001-1-1`, `002-2-2` | `000-0-0`, `001-1-1`, `002-2-2` | ✅ ตรงกัน |
| `item_id` | `000093362986`, `4901133618567`, `8850124003850` | `000093362986`, `4901133618567`, `8850124003850` | ✅ ตรงกัน |
| `item_description` | `ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g` | `ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g` | ✅ ตรงกัน |
| `quantity` | `1.0000`, `1.0000`, `12.0000` | `1`, `1`, `12` | ✅ ตรงกัน |
| `unit_price` | `41.0000`, `17.0000`, `5.8300` | `41`, `17`, `5.83` | ✅ ตรงกัน |
| `original_unit_price` | `51.0000`, `17.0000`, `5.8300` | `51`, `17`, `5.83` | ✅ ตรงกัน |
| `order_line_sub_total` | `41.0000`, `17.0000`, `69.9600` | `41`, `17`, `69.96` | ✅ ตรงกัน |
| `order_line_total` | `41.0000`, `17.0000`, `69.9600` | `41`, `17`, `69.96` | ✅ ตรงกัน |
| `order_line_tax_total` | `2.6800`, `1.1100`, `4.5700` | `2.68`, `1.11`, `4.57` | ✅ ตรงกัน |
| `is_gift` | `f` (false) | `false` | ✅ ตรงกัน |
| `is_tax_included` | `t` (true) | `true` | ✅ ตรงกัน |
| `is_pre_order` | `f` (false) | `false` | ✅ ตรงกัน |
| `is_cancelled` | `f` (false) | `false` | ✅ ตรงกัน |
| `uom` | `SPCS`, `SPCS`, `SBTL` | `SPCS`, `SPCS`, `SBTL` | ✅ ตรงกัน |
| `fulfillment_status` | `Open` | `Open` | ✅ ตรงกัน |
| `order_line_status` | `Open` | `Open` | ✅ ตรงกัน |

### **❌ ข้อมูลที่ไม่ตรงกัน:**

| Field | Database Value | Output Value | Issue |
|-------|----------------|--------------|-------|
| `max_fulfillment_status_id` | `3600` | `3000` | **Output ใช้ hardcode `3000`** |
| `min_fulfillment_status_id` | `3500` | `1000` | **Output ใช้ hardcode `1000`** |

---

## 🎯 **การเปรียบเทียบ Payment Data:**

### **✅ ข้อมูลที่ตรงกัน:**

| Field | Database Value | Output Value | Status |
|-------|----------------|--------------|---------|
| `order_id` | `123456789-C7L2LCDCTCC2AE` | `123456789-C7L2LCDCTCC2AE` | ✅ ตรงกัน |
| `payment_id` | `7991a525-e6c8-4086-b739-73ca3bfca903` | `7991a525-e6c8-4086-b739-73ca3bfca903` | ✅ ตรงกัน |
| `org_id` | `CFM-UAT` | `CFR` | ❌ ไม่ตรงกัน |
| `payment_group_id` | `1c88efa1-3d1e-4a4b-90d7-8f91a541314c` | - | ✅ ตรงกัน |
| `status_id` | `Not Applicable` | `Not Applicable` | ✅ ตรงกัน |
| `is_anonymized` | `f` (false) | `false` | ✅ ตรงกัน |
| `is_cancelled` | `f` (false) | `false` | ✅ ตรงกัน |
| `created_at` | `2025-08-22 08:25:22.575+00` | `2025-08-22T08:51:11.963Z` | ❌ ไม่ตรงกัน |
| `updated_at` | `2025-08-22 08:25:22.575+00` | `2025-08-22T08:51:11.963Z` | ❌ ไม่ตรงกัน |
| `created_by` | `system` | `system` | ✅ ตรงกัน |
| `updated_by` | `system` | `system` | ✅ ตรงกัน |

### **❌ ข้อมูลที่ไม่ตรงกัน:**

| Field | Database Value | Output Value | Issue |
|-------|----------------|--------------|-------|
| `org_id` | `CFM-UAT` | `CFR` | **Output ใช้ hardcode `CFR`** |
| `created_at` | `2025-08-22 08:25:22.575+00` | `2025-08-22T08:51:11.963Z` | **Output ใช้ timestamp ต่างกัน** |
| `updated_at` | `2025-08-22 08:25:22.575+00` | `2025-08-22T08:51:11.963Z` | **Output ใช้ timestamp ต่างกัน** |

---

## 🔧 **ปัญหาที่พบและข้อเสนอแนะ:**

### **1. Order Total ไม่ตรงกัน:**
```typescript
// Database
order_total: 128.6100

// Output
orderTotal: 127.96 (ใช้ order_sub_total แทน)

// แก้ไข
OrderTotal: order.orderTotal || 0, // ใช้ order_total จริง
```

### **2. Total Taxes ไม่ตรงกัน:**
```typescript
// Database
total_taxes: 0.6500

// Output
totalTaxes: 0 (hardcode)

// แก้ไข
TotalTaxes: order.totalTaxes || 0, // ใช้ total_taxes จริง
```

### **3. Order Locale ไม่ตรงกัน:**
```typescript
// Database
order_locale: 'th'

// Output
orderLocale: 'th_TH' (เพิ่ม suffix)

// แก้ไข
OrderLocale: order.orderLocale || 'th', // ใช้ order_locale จริง
```

### **4. Payment Status ไม่ตรงกัน:**
```typescript
// Database
payment_status: 'Awaiting Payment Info'

// Output
paymentStatusId: 'PAID' (hardcode)

// แก้ไข
PaymentStatusId: order.paymentStatus || 'Awaiting Payment Info', // ใช้ payment_status จริง
```

### **5. Order Type ไม่ตรงกัน:**
```typescript
// Database
order_type.OrderTypeId: 'MKP-HD-STD'

// Output
orderTypeId: 'STD' (ใช้ส่วนเดียว)

// แก้ไข
OrderTypeId: order.orderType?.OrderTypeId || 'MKP-HD-STD', // ใช้ order_type จริง
```

### **6. Payment Org ID ไม่ตรงกัน:**
```typescript
// Database
payment.org_id: 'CFM-UAT'

// Output
payment.orgId: 'CFR' (hardcode)

// แก้ไข
OrgId: payment.orgId || 'CFM-UAT', // ใช้ payment.org_id จริง
```

### **7. Fulfillment Status ไม่ตรงกัน:**
```typescript
// Database
max_fulfillment_status_id: '3600'
min_fulfillment_status_id: '3500'

// Output
maxFulfillmentStatusId: '3000' (hardcode)
minFulfillmentStatusId: '1000' (hardcode)

// แก้ไข
MaxFulfillmentStatusId: line.maxFulfillmentStatusId || '3600',
MinFulfillmentStatusId: line.minFulfillmentStatusId || '3500',
```

---

## 📊 **สรุปการวิเคราะห์:**

### **✅ Fields ที่ตรงกัน:**
- **Order:** 20+ fields (ประมาณ 80%)
- **OrderLine:** 15+ fields (ประมาณ 85%)
- **Payment:** 8+ fields (ประมาณ 70%)

### **❌ Fields ที่ไม่ตรงกัน:**
- **Order:** 4 fields (ประมาณ 20%)
- **OrderLine:** 2 fields (ประมาณ 15%)
- **Payment:** 3 fields (ประมาณ 30%)

### **🔧 ข้อเสนอแนะ:**
1. **ใช้ Database Fields:** แทนการ hardcode ค่า
2. **ใช้ JSONB Fields:** สำหรับ complex data
3. **ใช้ Calculated Fields:** สำหรับ financial calculations
4. **เพิ่ม Validation:** สำหรับ data consistency
5. **แก้ไข Timestamp:** ให้ตรงกับ database

**การแก้ไขนี้จะทำให้ output ตรงกับข้อมูลจริงจาก database มากขึ้นครับ! 🔧**
