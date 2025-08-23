# Release Template System

ระบบจัดการ Template สำหรับ Complex Nested Release Structure

## 📁 **ไฟล์ที่สร้างขึ้น:**

### 1. **`release-template.json`**
- Template หลักที่มี placeholder variables
- ใช้รูปแบบ `{{variableName}}` สำหรับการแทนที่ข้อมูล
- รองรับ complex nested structure

### 2. **`release-template.interface.ts`**
- TypeScript interfaces สำหรับ type safety
- ครอบคลุมทุก nested structure
- แบ่งเป็น interfaces ย่อยๆ ตามหน้าที่

### 3. **`release-template.service.ts`**
- Service สำหรับจัดการ template
- มี methods สำหรับ load, populate, และ save template
- รองรับ deep cloning และ placeholder replacement

## 🚀 **การใช้งาน:**

### 1. **Load Template:**
```typescript
const templateService = new ReleaseTemplateService();
await templateService.loadTemplate();
```

### 2. **Populate Template with Data:**
```typescript
const data = {
  serviceLevelCode: 'STD',
  customerEmail: 'customer@example.com',
  orderSubtotal: 366.0,
  // ... more data
};

const populatedTemplate = templateService.populateTemplate(data);
```

### 3. **Generate from Order Data:**
```typescript
const orderData = {
  orderId: '311647613-C7LXT7KBTPA3TN',
  customerEmail: 'customer@example.com',
  payments: [...],
  orderLines: [...],
  releaseLines: [...]
};

const release = templateService.generateReleaseFromOrder(orderData);
```

### 4. **Save Template:**
```typescript
await templateService.saveTemplate(release, 'output-release.json');
```

## 🔧 **โครงสร้าง Template:**

### **Top-Level Fields:**
```json
{
  "ServiceLevelCode": "{{serviceLevelCode}}",
  "Email": "{{customerEmail}}",
  "MaxFulfillmentStatusId": "{{maxFulfillmentStatusId}}",
  "IsOnHold": {{isOnHold}},
  "OrderSubtotal": {{orderSubtotal}}
}
```

### **Nested Order Structure:**
```json
{
  "Order": {
    "Payment": [{
      "PK": "{{paymentPK}}",
      "PaymentMethod": [{
        "PK": "{{paymentMethodPK}}",
        "BillingAddress": {
          "PK": "{{billingAddressPK}}",
          "PaymentTransaction": [...]
        }
      }]
    }],
    "OrderLine": [...]
  }
}
```

### **Release Lines:**
```json
{
  "ReleaseLine": [{
    "ItemId": "{{releaseLineItemId}}",
    "ChargeDetail": [...],
    "Note": [...],
    "Allocation": [...]
  }]
}
```

## 📋 **Interfaces ที่รองรับ:**

### **Main Interfaces:**
- `ReleaseTemplate` - Template หลัก
- `PaymentTemplate` - ข้อมูล Payment
- `PaymentMethodTemplate` - ข้อมูล Payment Method
- `BillingAddressTemplate` - ข้อมูล Billing Address
- `PaymentTransactionTemplate` - ข้อมูล Payment Transaction
- `OrderLineTemplate` - ข้อมูล Order Line
- `AllocationTemplate` - ข้อมูล Allocation
- `ReleaseLineTemplate` - ข้อมูล Release Line

### **Supporting Interfaces:**
- `ChargeDetailTemplate` - ข้อมูล Charge Detail
- `NoteTemplate` - ข้อมูล Note
- `ReleaseLineAllocationTemplate` - ข้อมูล Release Line Allocation
- `ProcessInfoTemplate` - ข้อมูล Process Info

## 💡 **Features:**

### 1. **Type Safety**
- ใช้ TypeScript interfaces
- Compile-time type checking
- IntelliSense support

### 2. **Deep Cloning**
- Safe object cloning
- ไม่กระทบ original template
- รองรับ nested objects และ arrays

### 3. **Placeholder Replacement**
- รองรับ `{{variableName}}` format
- Automatic type conversion
- Fallback values

### 4. **Flexible Mapping**
- Map จาก order data
- Map จาก custom data structure
- Default values handling

### 5. **File I/O**
- Load template จาก file
- Save populated template
- Error handling

## 🔄 **Workflow:**

```
1. Load Template
   ↓
2. Prepare Data
   ↓
3. Populate Template
   ↓
4. Validate Structure
   ↓
5. Save Output
```

## 📝 **ตัวอย่างการใช้งาน:**

```typescript
import { ReleaseTemplateService } from './release-template.service';

async function generateRelease() {
  const service = new ReleaseTemplateService();
  
  // 1. Load template
  await service.loadTemplate();
  
  // 2. Prepare data
  const orderData = {
    orderId: '311647613-C7LXT7KBTPA3TN',
    customerEmail: 'customer@example.com',
    orderSubtotal: 366.0,
    currencyCode: 'THB',
    payments: [
      {
        pk: '7554875310313495422',
        paymentMethods: [
          {
            pk: '7554875311143527290',
            amount: 366.0,
            billingAddress: {
              pk: '7554875311153537724',
              address1: 'Grab Address1',
              city: 'Bangkok'
            }
          }
        ]
      }
    ],
    orderLines: [
      {
        orderLineId: '003-3-3',
        itemId: '8850123110535',
        quantity: 1,
        unitPrice: 12.0
      }
    ]
  };
  
  // 3. Generate release
  const release = service.generateReleaseFromOrder(orderData);
  
  // 4. Save to file
  await service.saveTemplate(release, 'generated-release.json');
  
  return release;
}
```

## ⚠️ **ข้อควรระวัง:**

1. **Template Loading** - ต้อง load template ก่อนใช้งาน
2. **Data Structure** - ข้อมูลต้องตรงกับ interface
3. **File Paths** - ใช้ absolute paths สำหรับ file operations
4. **Memory Usage** - Large templates อาจใช้ memory มาก
5. **Error Handling** - ควรมี try-catch สำหรับ file operations

## 🎯 **ประโยชน์:**

1. **Consistency** - โครงสร้างเดียวกันทุกครั้ง
2. **Maintainability** - แก้ไข template ได้ง่าย
3. **Reusability** - ใช้ template เดียวกันได้หลายครั้ง
4. **Type Safety** - ลด runtime errors
5. **Flexibility** - รองรับข้อมูลหลากหลายรูปแบบ
