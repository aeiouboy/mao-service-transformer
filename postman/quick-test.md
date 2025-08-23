# 🚀 Quick Test Guide - MAO Service Transformer

## 📋 **การทดสอบแบบรวดเร็ว**

### **1. ตรวจสอบ Service Health**
```bash
curl -X GET "http://localhost:3000/api/order/release-health"
```

### **2. ดูรายการ Orders ใน Database**
```bash
curl -X GET "http://localhost:3000/api/order/orders-list"
```

### **3. ทดสอบ Transform Order (Main Endpoint)**
```bash
curl -X POST "http://localhost:3000/api/order/release-transform-pascal" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "123456789-C7L2LCDCTCC2AE"}'
```

### **4. ทดสอบ Error Handling**
```bash
curl -X POST "http://localhost:3000/api/order/release-transform-pascal" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "NON-EXISTENT-ORDER"}'
```

---

## 🎯 **ลำดับการทดสอบที่แนะนำ:**

1. **รัน Service:** `npm run start:dev`
2. **ตรวจสอบ Health:** ใช้ command ข้อ 1
3. **ดู Orders:** ใช้ command ข้อ 2
4. **ทดสอบ Transform:** ใช้ command ข้อ 3
5. **ทดสอบ Error:** ใช้ command ข้อ 4

---

## 📊 **Expected Responses:**

### **✅ Health Check Success:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "database": true
}
```

### **✅ Transform Success:**
```json
{
  "success": true,
  "data": {
    "ServiceLevelCode": "STD",
    "Email": "customer@example.com",
    "MaxFulfillmentStatusId": "3500",
    // ... more fields
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

## 🔧 **Troubleshooting:**

### **Service ไม่ตอบสนอง:**
- ตรวจสอบว่า service ทำงานอยู่: `npm run start:dev`
- ตรวจสอบ port 3000 ไม่ถูกใช้งาน

### **Database Error:**
- ตรวจสอบ database connection ใน `.env`
- ตรวจสอบ database server ทำงานอยู่

### **Order ไม่พบ:**
- ใช้ "Get Orders List" เพื่อดู order IDs ที่มีอยู่
- เปลี่ยน order ID ในคำสั่ง

---

## 📝 **Notes:**
- ใช้ `jq` เพื่อ format JSON: `curl ... | jq '.'`
- ตรวจสอบ logs ของ service หากมี error
- เปรียบเทียบ response กับ sample payload
