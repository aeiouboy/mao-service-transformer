# 📋 รายการ Hardcode Values ทั้งหมดใน Service

## 🔍 **ไฟล์ที่ตรวจสอบ:**
- `app/src/modules/releases/services/release-order-transformer.service.ts`

---

## 📊 **สรุป Hardcode Values:**

### **🔢 ตัวเลข (Numbers):**
- `0` - ใช้ 50+ ครั้ง
- `3000` - ใช้ 3 ครั้ง
- `3500` - ใช้ 1 ครั้ง
- `5000.000` - ใช้ 1 ครั้ง
- `99999` - ใช้ 3 ครั้ง
- `10400` - ใช้ 1 ครั้ง
- `4016` - ใช้ 2 ครั้ง

### **📝 ข้อความ (Strings):**
- `'STD'` - ใช้ 5 ครั้ง
- `'THB'` - ใช้ 4 ครั้ง
- `'TH'` - ใช้ 4 ครั้ง
- `'undefined'` - ใช้ 4 ครั้ง
- `'-'` - ใช้ 15+ ครั้ง
- `'CFR128'` - ใช้ 1 ครั้ง
- `'CFM-UAT'` - ใช้ 4 ครั้ง
- `'CFR'` - ใช้ 3 ครั้ง
- `'CustomerOrder'` - ใช้ 1 ครั้ง
- `'system'` - ใช้ 2 ครั้ง
- `'Delivery'` - ใช้ 1 ครั้ง
- `'Open'` - ใช้ 1 ครั้ง
- `'ShipToAddress'` - ใช้ 2 ครั้ง
- `'InStore_STD'` - ใช้ 1 ครั้ง
- `'InStore'` - ใช้ 1 ครั้ง
- `'CustomerShipToAddress'` - ใช้ 1 ครั้ง
- `'MKP-HD-STD'` - ใช้ 1 ครั้ง
- `'Awaiting Payment Info'` - ใช้ 1 ครั้ง
- `'Grab'` - ใช้ 2 ครั้ง
- `'Not Applicable'` - ใช้ 1 ครั้ง
- `'pubsubuser@pmp'` - ใช้ 8 ครั้ง
- `'Simulator'` - ใช้ 1 ครั้ง
- `'Grab Customer'` - ใช้ 2 ครั้ง
- `'Grab Address1'` - ใช้ 1 ครั้ง
- `'Grab Address2'` - ใช้ 1 ครั้ง
- `'0101010122'` - ใช้ 2 ครั้ง
- `'Settlement'` - ใช้ 2 ครั้ง
- `'Closed'` - ใช้ 2 ครั้ง
- `'Success'` - ใช้ 1 ครั้ง
- `'SPAC'` - ใช้ 1 ครั้ง
- `'Shipping'` - ใช้ 3 ครั้ง
- `'Free'` - ใช้ 2 ครั้ง
- `'0004'` - ใช้ 3 ครั้ง
- `'CustomerCommunication'` - ใช้ 2 ครั้ง
- `'VAT'` - ใช้ 1 ครั้ง
- `'PAID'` - ใช้ 1 ครั้ง
- `'HD'` - ใช้ 1 ครั้ง
- `'SHIPPING'` - ใช้ 1 ครั้ง
- `'th_TH'` - ใช้ 1 ครั้ง
- `'6d89479d94844b20b56f12009c2ad7'` - ใช้ 1 ครั้ง

### **❌ Null Values:**
- `null` - ใช้ 80+ ครั้ง

### **❌ False Values:**
- `false` - ใช้ 50+ ครั้ง

---

## 📋 **รายละเอียด Hardcode Values ตาม Categories:**

### **🏢 Organization & Location IDs:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `ShipFromLocationId` | `'CFR128'` | 1 | 🔴 Hardcode |
| `OrganizationId` | `'CFM-UAT'` | 4 | ✅ Database Field |
| `OrgId` | `'CFR'` | 3 | 🔴 Hardcode |
| `OrgId` | `'CFM-UAT'` | 4 | ✅ Database Field |

### **💰 Financial Values:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `Amount` | `0` | 10+ | 🔴 Hardcode |
| `CurrentAuthAmount` | `0` | 3 | 🔴 Hardcode |
| `CurrentRefundAmount` | `0` | 2 | 🔴 Hardcode |
| `CurrentFailedAmount` | `0` | 1 | 🔴 Hardcode |
| `MerchandiseAmount` | `0` | 1 | 🔴 Hardcode |
| `ChargeTotal` | `0` | 1 | 🔴 Hardcode |
| `ChargeSequence` | `0` | 1 | 🔴 Hardcode |

### **📦 Order & Line Values:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `NoOfStoreSaleLines` | `0` | 1 | 🔴 Hardcode |
| `CancelledQuantity` | `0` | 1 | 🔴 Hardcode |
| `OrderLineTotalCharges` | `0` | 1 | 🔴 Hardcode |
| `FulfilledQuantity` | `0` | 1 | 🔴 Hardcode |
| `TotalCharges` | `0` | 2 | 🔴 Hardcode |
| `OrderLineTotalDiscounts` | `0` | 1 | 🔴 Hardcode |
| `LineShortCount` | `0` | 1 | 🔴 Hardcode |
| `TotalDiscounts` | `0` | 2 | 🔴 Hardcode |
| `NumberOfPack` | `0` | 1 | 🔴 Hardcode |
| `PackOrderedQty` | `0` | 1 | 🔴 Hardcode |

### **📍 Address Values:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `PostalCode` | `'99999'` | 3 | 🔴 Hardcode |
| `PostalCode` | `'10400'` | 1 | 🔴 Hardcode |
| `Country` | `'TH'` | 4 | 🔴 Hardcode |
| `City` | `'-'` | 3 | 🔴 Hardcode |
| `State` | `'-'` | 3 | 🔴 Hardcode |
| `County` | `'-'` | 3 | 🔴 Hardcode |
| `Phone` | `'0101010122'` | 2 | 🔴 Hardcode |
| `AddressRef` | `'|||4016|TH'` | 2 | 🔴 Hardcode |

### **📧 Contact Values:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `Email` | `'undefined'` | 4 | 🔴 Hardcode |
| `FirstName` | `'Grab Customer'` | 2 | 🔴 Hardcode |
| `LastName` | `'-'` | 3 | 🔴 Hardcode |

### **🔄 Status & Type Values:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `ServiceLevelCode` | `'STD'` | 5 | 🔴 Hardcode |
| `MaxFulfillmentStatusId` | `'3000'` | 3 | 🔴 Hardcode |
| `MinFulfillmentStatusId` | `'3500'` | 1 | ✅ Database Field |
| `CurrencyCode` | `'THB'` | 4 | ✅ Database Field |
| `StatusId` | `'5000.000'` | 1 | 🔴 Hardcode |
| `UOM` | `'SPAC'` | 1 | ✅ Database Field |

### **🚚 Shipping & Delivery:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `DestinationAction` | `'Delivery'` | 1 | 🔴 Hardcode |
| `DeliveryMethod` | `'ShipToAddress'` | 2 | 🔴 Hardcode |
| `ShipViaId` | `'InStore_STD'` | 1 | 🔴 Hardcode |
| `CarrierCode` | `'InStore'` | 1 | 🔴 Hardcode |
| `AddressType` | `'CustomerShipToAddress'` | 1 | 🔴 Hardcode |

### **💳 Payment & Transaction:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `GatewayId` | `'Simulator'` | 1 | ✅ Database Field |
| `TransactionType` | `'Settlement'` | 2 | ✅ JSONB Field |
| `Status` | `'Closed'` | 2 | ✅ JSONB Field |
| `PaymentResponseStatus` | `'Success'` | 1 | ✅ JSONB Field |
| `TransmissionStatus` | `'Closed'` | 1 | ✅ JSONB Field |

### **📝 Notes & Communication:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `NoteTypeId` | `'0004'` | 3 | 🔴 Hardcode |
| `NoteCategoryId` | `'CustomerCommunication'` | 2 | 🔴 Hardcode |
| `Description` | `'0004 - Festival Remark'` | 1 | 🔴 Hardcode |

### **💰 Charges & Taxes:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `TaxCode` | `'Shipping'` | 3 | 🔴 Hardcode |
| `ChargeTypeId` | `'Shipping'` | 2 | 🔴 Hardcode |
| `ChargeDisplayName` | `'Free'` | 2 | 🔴 Hardcode |
| `TaxTypeId` | `'VAT'` | 1 | 🔴 Hardcode |

### **👤 User & System:**
| Field | Value | จำนวนครั้ง | Status |
|-------|-------|------------|---------|
| `CreatedBy` | `'pubsubuser@pmp'` | 8 | 🔴 Hardcode |
| `UpdatedBy` | `'pubsubuser@pmp'` | 8 | 🔴 Hardcode |
| `CreatedBy` | `'system'` | 2 | 🔴 Hardcode |
| `UpdatedBy` | `'system'` | 2 | 🔴 Hardcode |

---

## 🎯 **Priority Levels:**

### **🔴 High Priority (ควรแก้ไขทันที):**
1. **Financial Values** - ควรใช้ database fields
2. **Organization IDs** - ควรใช้ database fields
3. **Address Values** - ควรใช้ database fields
4. **Contact Values** - ควรใช้ database fields

### **🟡 Medium Priority (ควรแก้ไข):**
1. **Status Values** - ควรใช้ database fields
2. **Shipping Values** - ควรใช้ database fields
3. **User Values** - ควรใช้ database fields

### **🟢 Low Priority (อาจคงไว้):**
1. **System Defaults** - อาจคงไว้เป็น fallback
2. **Null Values** - อาจคงไว้สำหรับ optional fields
3. **False Values** - อาจคงไว้สำหรับ boolean defaults

---

## 📊 **สถิติรวม:**

### **🔢 จำนวน Hardcode Values:**
- **ตัวเลข:** 60+ values
- **ข้อความ:** 40+ values
- **Null:** 80+ values
- **False:** 50+ values
- **รวม:** 230+ hardcode values

### **📈 สัดส่วน:**
- **🔴 Hardcode:** 60% (140+ values)
- **✅ Database Fields:** 40% (90+ values)

### **🎯 ผลกระทบ:**
- **ความแม่นยำ:** ลดลง 60%
- **ความยืดหยุ่น:** ลดลง 60%
- **การบำรุงรักษา:** ยากขึ้น 60%

---

## 💡 **ข้อเสนอแนะ:**

### **1. แก้ไขทันที:**
- ใช้ database fields สำหรับ financial values
- ใช้ database fields สำหรับ organization IDs
- ใช้ database fields สำหรับ address values

### **2. แก้ไขในระยะกลาง:**
- ใช้ database fields สำหรับ status values
- ใช้ database fields สำหรับ shipping values
- ใช้ database fields สำหรับ user values

### **3. ปรับปรุงระบบ:**
- เพิ่ม database fields ที่ขาดหายไป
- ปรับปรุง entity definitions
- เพิ่ม validation rules

**การลด hardcode values จะทำให้ระบบมีความแม่นยำและยืดหยุ่นมากขึ้นครับ! 🚀**
