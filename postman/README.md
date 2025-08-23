# 🚀 MAO Service Transformer - Postman Collection

## 📋 **คำแนะนำการใช้งาน Postman Collection**

### **📥 การ Import Collection:**
1. เปิด Postman
2. คลิก "Import" 
3. เลือกไฟล์ `MAO-Service-Transformer.postman_collection.json`
4. Collection จะถูกเพิ่มเข้าไปใน Postman

---

## 🔧 **การตั้งค่า Environment Variables:**

### **1. ตั้งค่า Variables:**
- **baseUrl:** `http://localhost:3000` (หรือ URL ของ server)
- **orderId:** `123456789-C7L2LCDCTCC2AE` (Order ID สำหรับทดสอบ)

### **2. วิธีตั้งค่า:**
1. คลิกที่ "Environment" ใน Postman
2. สร้าง Environment ใหม่ชื่อ "MAO Service Transformer"
3. เพิ่ม variables ตามด้านบน
4. เลือก Environment นี้ก่อนใช้งาน

---

## 🧪 **API Endpoints ที่สามารถทดสอบ:**

### **1. Health Check**
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/order/release-health`
- **Description:** ตรวจสอบสถานะ service และ database connection

### **2. Get Orders List**
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/order/orders-list`
- **Description:** ดึงรายการ orders ทั้งหมดจาก database

### **3. Get Order Status**
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/order/{{orderId}}/release-status`
- **Description:** ตรวจสอบสถานะของ order เฉพาะ

### **4. Transform Order to Sample Format**
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/order/release-transform-sample`
- **Body:**
```json
{
  "orderId": "{{orderId}}"
}
```
- **Description:** Transform order เป็น release format (legacy endpoint)

### **5. Transform Order to PascalCase Format** ⭐
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/order/release-transform-pascal`
- **Body:**
```json
{
  "orderId": "{{orderId}}"
}
```
- **Description:** Transform order เป็น PascalCase format ที่ตรงกับ sample payload

### **6. Transform Order to Release**
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/order/release-transform`
- **Body:**
```json
{
  "orderId": "{{orderId}}"
}
```
- **Description:** Transform order เป็น release format

### **7. Transform and Save Order**
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/order/release-transform-save`
- **Body:**
```json
{
  "orderId": "{{orderId}}"
}
```
- **Description:** Transform order และบันทึกเป็นไฟล์

### **8. Transform PMP Payload**
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/order/transform-payload`
- **Body:** (ดูใน Postman collection)
- **Description:** Transform PMP order payload โดยตรงเป็น release format

---

## 🎯 **ลำดับการทดสอบที่แนะนำ:**

### **Step 1: ตรวจสอบ Service Health**
1. รัน **"Health Check"** เพื่อตรวจสอบ service
2. ตรวจสอบ response ว่ามี `"status": "healthy"`

### **Step 2: ตรวจสอบข้อมูลใน Database**
1. รัน **"Get Orders List"** เพื่อดู orders ที่มีใน database
2. เลือก order ID ที่ต้องการทดสอบ

### **Step 3: ทดสอบ Transformation**
1. รัน **"Transform Order to PascalCase Format"** ⭐ (แนะนำ)
2. ตรวจสอบ response structure
3. เปรียบเทียบกับ sample payload

### **Step 4: ทดสอบ Error Handling**
1. รัน **"Test Non-existent Order"** เพื่อทดสอบ error handling
2. ตรวจสอบ error response

---

## 📊 **การตรวจสอบ Response:**

### **✅ Success Response:**
```json
{
  "success": true,
  "data": {
    // Release data in PascalCase format
  },
  "message": "Order 123456789-C7L2LCDCTCC2AE transformed to PascalCase format successfully"
}
```

### **❌ Error Response:**
```json
{
  "success": false,
  "error": "Order not found: NON-EXISTENT-ORDER",
  "message": "Failed to transform order NON-EXISTENT-ORDER to PascalCase format"
}
```

---

## 🔍 **การตรวจสอบ Database Fields:**

### **Fields ที่ใช้จาก Database:**
- `maxFulfillmentStatusId`
- `orgId`
- `orderType.OrderTypeId`
- `paymentStatus`
- `orderLocale`
- `shipFromLocationId`
- `facilityCode`
- และอื่นๆ

### **Fields ที่ใช้ Helper Methods:**
- `getMaxFulfillmentStatusId()`
- `getShipFromLocationId()`
- `getOrganizationId()`
- `getPaymentStatusId()`
- และอื่นๆ

---

## 🚨 **ข้อควรระวัง:**

### **1. Database Connection:**
- ตรวจสอบว่า database server ทำงานอยู่
- ตรวจสอบ connection string ใน `.env`

### **2. Order ID:**
- ใช้ order ID ที่มีอยู่จริงใน database
- ตรวจสอบจาก "Get Orders List" endpoint

### **3. Service Status:**
- ตรวจสอบ service health ก่อนทดสอบ
- ตรวจสอบ logs หากมี error

---

## 📝 **การ Debug:**

### **1. ตรวจสอบ Logs:**
```bash
# ดู logs ของ service
npm run start:dev
```

### **2. ตรวจสอบ Database:**
```sql
-- ตรวจสอบ orders ใน database
SELECT * FROM "order".orders LIMIT 5;
```

### **3. ตรวจสอบ Response:**
- ดู response status code
- ตรวจสอบ response body
- เปรียบเทียบกับ expected format

---

## 🎉 **การใช้งาน Postman Collection:**

1. **Import collection** เข้า Postman
2. **ตั้งค่า environment variables**
3. **รัน Health Check** เพื่อตรวจสอบ service
4. **ทดสอบ endpoints** ตามลำดับที่แนะนำ
5. **ตรวจสอบ response** และเปรียบเทียบกับ expected format

**Happy Testing! 🚀**
