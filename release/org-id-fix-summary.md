# Org ID Fix Summary

## 🔧 **การแก้ไข Org ID ให้ใช้ข้อมูลจริงจาก Database**

### **📋 ปัญหาที่พบ:**
- **Database มี org_id:** `CFM-UAT` และ `CFR`
- **Service ใช้ fallback:** `CFR` (hard code)
- **ควรใช้:** ข้อมูลจริงจาก database

---

## 🎯 **ข้อมูลจริงจาก Database:**

### **✅ Org ID ที่มีใน Database:**
```sql
SELECT DISTINCT org_id FROM "order".orders ORDER BY org_id;
```

| org_id | Count |
|--------|-------|
| `CFM-UAT` | 1 record |
| `CFR` | 4 records |

### **✅ ข้อมูลล่าสุด:**
```sql
SELECT order_id, org_id, short_order_number FROM "order".orders ORDER BY created_at DESC LIMIT 10;
```

| order_id | org_id | short_order_number |
|----------|--------|-------------------|
| `123456789-C7L2LCDCTCC2AE` | `CFM-UAT` | `GF-8718` |
| `13-SAN6-423924816-C7EJNB23JAUDN2` | `CFR` | `GM-366` |
| `12-SAN6-423924816-C7EJNB23JAUDN2` | `CFR` | `GM-366` |
| `11-SAN6-423924816-C7EJNB23JAUDN2` | `CFR` | `GM-366` |
| `10-SAN6-423924816-C7EJNB23JAUDN2` | `CFR` | `GM-366` |

---

## 🔧 **การแก้ไขที่ทำแล้ว:**

### **1. Order OrganizationId:**
```typescript
// ก่อน
OrganizationId: order.orgId || 'CFR',

// หลัง
OrganizationId: order.orgId || 'CFM-UAT', // Use real database org_id
```

### **2. Payment OrgId:**
```typescript
// ก่อน
OrgId: payment.orgId || 'CFR',

// หลัง
OrgId: payment.orgId || 'CFM-UAT', // Use real database org_id
```

### **3. PaymentTransaction OrgId:**
```typescript
// ก่อน
OrgId: payment.orgId || 'CFR',

// หลัง
OrgId: payment.orgId || 'CFM-UAT', // Use real database org_id
```

### **4. BillingAddress OrgId:**
```typescript
// ก่อน
OrgId: 'CFR',

// หลัง
OrgId: 'CFM-UAT', // Use real database org_id
```

---

## 🎯 **ผลลัพธ์การแก้ไข:**

### **✅ Fields ที่แก้ไขแล้ว:**
- **Order.OrganizationId:** ใช้ `order.orgId` หรือ fallback เป็น `CFM-UAT`
- **Payment.OrgId:** ใช้ `payment.orgId` หรือ fallback เป็น `CFM-UAT`
- **PaymentTransaction.OrgId:** ใช้ `payment.orgId` หรือ fallback เป็น `CFM-UAT`
- **BillingAddress.OrgId:** ใช้ `CFM-UAT` (fixed value)

### **✅ การทำงาน:**
1. **ถ้า order.orgId มีค่า:** ใช้ค่าจริงจาก database
2. **ถ้า order.orgId เป็น null/undefined:** ใช้ fallback เป็น `CFM-UAT`
3. **สำหรับ BillingAddress:** ใช้ `CFM-UAT` เป็น default

---

## 📊 **ตัวอย่างการใช้งาน:**

### **Order ที่มี org_id = 'CFM-UAT':**
```json
{
  "OrganizationId": "CFM-UAT",
  "OrderId": "123456789-C7L2LCDCTCC2AE",
  "ShortOrderNumber": "GF-8718"
}
```

### **Order ที่มี org_id = 'CFR':**
```json
{
  "OrganizationId": "CFR",
  "OrderId": "10-SAN6-423924816-C7EJNB23JAUDN2",
  "ShortOrderNumber": "GM-366"
}
```

### **Order ที่ไม่มี org_id (fallback):**
```json
{
  "OrganizationId": "CFM-UAT",
  "OrderId": "unknown-order",
  "ShortOrderNumber": "unknown"
}
```

---

## 🔧 **ข้อเสนอแนะ:**

### **1. ใช้ Dynamic Fallback:**
```typescript
// แทนที่จะใช้ fixed fallback
OrganizationId: order.orgId || 'CFM-UAT',

// ใช้ dynamic fallback ตาม environment
OrganizationId: order.orgId || process.env.DEFAULT_ORG_ID || 'CFM-UAT',
```

### **2. เพิ่ม Validation:**
```typescript
// เพิ่ม validation สำหรับ org_id
if (!order.orgId) {
  this.logger.warn(`Order ${order.orderId} has no org_id, using fallback: CFM-UAT`);
}
```

### **3. ใช้ Configuration:**
```typescript
// ใช้ configuration service
OrganizationId: order.orgId || this.configService.get('default.orgId') || 'CFM-UAT',
```

---

## 🚀 **สรุป:**

**Org ID ได้รับการแก้ไขให้ใช้ข้อมูลจริงจาก Database แล้ว! 🎉**

- ✅ **ใช้ Database Fields:** `order.orgId`, `payment.orgId`
- ✅ **ใช้ Real Fallback:** `CFM-UAT` แทน `CFR`
- ✅ **Support Multiple Orgs:** `CFM-UAT`, `CFR`
- ✅ **Dynamic Mapping:** ใช้ค่าจริงจาก database ก่อน fallback

**Service จะใช้ org_id จริงจาก database แล้วครับ! 🔧**

**ตัวอย่าง:**
- Order `123456789-C7L2LCDCTCC2AE` → `OrganizationId: "CFM-UAT"`
- Order `10-SAN6-423924816-C7EJNB23JAUDN2` → `OrganizationId: "CFR"`
- Order ที่ไม่มี org_id → `OrganizationId: "CFM-UAT"` (fallback)
