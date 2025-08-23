# 📋 MAO Service Transformer - Testing Files Summary

## 🎯 **ไฟล์ที่สร้างขึ้นสำหรับการทดสอบ:**

### **1. Postman Collection**
- **ไฟล์:** `MAO-Service-Transformer.postman_collection.json`
- **คำอธิบาย:** Collection สำหรับ Postman ที่มี endpoints ทั้งหมด
- **การใช้งาน:** Import เข้า Postman เพื่อทดสอบ API

### **2. Postman Environment**
- **ไฟล์:** `MAO-Service-Transformer.postman_environment.json`
- **คำอธิบาย:** Environment variables สำหรับ Postman
- **การใช้งาน:** Import เข้า Postman Environment

### **3. cURL Script**
- **ไฟล์:** `curl-commands.sh`
- **คำอธิบาย:** Script สำหรับทดสอบ API ผ่าน command line
- **การใช้งาน:** `./curl-commands.sh`

### **4. Quick Test Guide**
- **ไฟล์:** `quick-test.md`
- **คำอธิบาย:** คู่มือการทดสอบแบบรวดเร็ว
- **การใช้งาน:** ดูคำสั่ง curl พื้นฐาน

### **5. README**
- **ไฟล์:** `README.md`
- **คำอธิบาย:** คู่มือการใช้งาน Postman Collection แบบละเอียด
- **การใช้งาน:** อ่านเพื่อเข้าใจการใช้งานทั้งหมด

---

## 🚀 **การใช้งาน:**

### **Option 1: ใช้ Postman (แนะนำ)**
1. Import `MAO-Service-Transformer.postman_collection.json`
2. Import `MAO-Service-Transformer.postman_environment.json`
3. เลือก Environment "MAO Service Transformer"
4. รัน requests ตามลำดับ

### **Option 2: ใช้ cURL Script**
```bash
cd postman
./curl-commands.sh
```

### **Option 3: ใช้ Quick Commands**
ดู `quick-test.md` สำหรับคำสั่งพื้นฐาน

---

## 📊 **API Endpoints ที่สามารถทดสอบ:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/order/release-health` | GET | Health check |
| `/api/order/orders-list` | GET | Get all orders |
| `/api/order/{orderId}/release-status` | GET | Check order status |
| `/api/order/release-transform-sample` | POST | Transform to sample format |
| `/api/order/release-transform-pascal` | POST | **Transform to PascalCase format** ⭐ |
| `/api/order/release-transform` | POST | Transform to release format |
| `/api/order/release-transform-save` | POST | Transform and save to file |
| `/api/order/transform-payload` | POST | Transform PMP payload |

---

## 🎯 **ลำดับการทดสอบที่แนะนำ:**

1. **Health Check** - ตรวจสอบ service
2. **Get Orders List** - ดูข้อมูลใน database
3. **Transform to PascalCase** - ทดสอบ main endpoint ⭐
4. **Error Handling** - ทดสอบ error cases

---

## 🔧 **การตั้งค่า:**

### **Environment Variables:**
- `baseUrl`: `http://localhost:3000`
- `orderId`: `123456789-C7L2LCDCTCC2AE`
- `testOrderId1`: `123456789-C7L2LCDCTCC2AE`
- `testOrderId2`: `403521240-C7LDVZNUTGAHMA`
- `nonExistentOrderId`: `NON-EXISTENT-ORDER`

### **Prerequisites:**
- Service ทำงานที่ `http://localhost:3000`
- Database connection ทำงาน
- Order IDs ที่มีอยู่จริงใน database

---

## 📝 **Notes:**
- ใช้ `jq` เพื่อ format JSON responses
- ตรวจสอบ logs ของ service หากมี error
- เปรียบเทียบ response กับ sample payload
- ทดสอบ error handling ด้วย non-existent orders

**Happy Testing! 🚀**
