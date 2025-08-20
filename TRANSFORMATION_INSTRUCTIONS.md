# MAO Service Transformer - คู่มือการใช้งาน Transformation

คู่มือ step-by-step สำหรับการทำ Order Release และ Cancel Transformation ในระบบ Manhattan Active® Omni

## 📋 Table of Contents
1. [Order Release Transformation](#order-release-transformation)
2. [Cancel Transformation](#cancel-transformation)
3. [Test Scripts และ Output Files](#test-scripts-และ-output-files)
4. [การตรวจสอบผลลัพธ์](#การตรวจสอบผลลัพธ์)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Order Release Transformation

### Step 1: เตรียม Environment
```bash
# เข้าไปใน app directory
cd app

# ติดตั้ง dependencies
pnpm install

# Build application
pnpm run build
```

### Step 2: เตรียม Input Data
```bash
# ตรวจสอบ sample input file
ls -la data/samples/sample_input.json

# ดู content ของ input file
head -20 data/samples/sample_input.json
```

**Input Structure ที่ต้องมี:**
- `OrderId`: รหัสคำสั่งซื้อ
- `OrderLine[]`: รายการสินค้า
- `CustomerFirstName`, `CustomerLastName`: ข้อมูลลูกค้า
- `CurrencyCode`: สกุลเงิน (เช่น THB)
- `Payment[]`: ข้อมูลการชำระเงิน
- `OrderChargeDetail[]`: ค่าใช้จ่ายเพิ่มเติม

### Step 3: รัน Release Transformation Test
```bash
# กลับไป root directory
cd ..

# รัน release transformation test
node test-csv-alignment.js
```

**Expected Output:**
```
🧪 Testing CSV Alignment - RELEASE Case Only...

📁 Loaded release sample input: {
  OrderId: '403521240-C7LDVZNUTGAHMA',
  OrderLines: 3,
  Customer: 'สมชาย ใจดี',
  CurrencyCode: 'THB'
}

🔄 Running transformation...

✅ CSV Field Alignment Verification:
  ✅ CancelLineCount: 0
  ✅ MaxFulfillmentStatusId: "3000"
  ✅ FulfillmentStatus: "Released"
  ✅ OrderToken: "GTJ6vaiD0ubWi0lTaXjk..."

💾 Release result saved to: tests/outputs/release/csv-aligned-test-result.json

🎯 CSV Alignment Test (Release): PASSED ✅
```

### Step 4: ตรวจสอบ Output File
```bash
# ดู release output
cat tests/outputs/release/csv-aligned-test-result.json | jq '.'

# ตรวจสอบ key fields
cat tests/outputs/release/csv-aligned-test-result.json | jq '.OriginalPayload | {OrderId, FulfillmentStatus, OrderSubTotal, TotalCharges}'
```

---

## 🚫 Cancel Transformation

### Step 1: เตรียม Cancel Input Data
```bash
# ตรวจสอบ cancel input file
ls -la data/samples/cancel_fully.json

# ดู cancel input structure
head -50 data/samples/cancel_fully.json
```

**Cancel Input Structure:**
- `OrderId`: รหัสคำสั่งซื้อที่ต้องการยกเลิก
- `IsCancelled`: true
- `FulfillmentStatus`: "Canceled"
- `CancelLineCount`: จำนวน line ที่ยกเลิก
- `OrderLine[]`: รายการที่ยกเลิกพร้อม `CancelledOrderLineSubTotal`

### Step 2: รัน Cancel Transformation
```bash
# รัน cancel transformation ผ่าน API endpoint
node tests/cancel/test-complete-fixed-service.js

# หรือรัน enhanced test ที่มีทั้ง release และ cancel
node test-csv-alignment-enhanced.js
```

### Step 3: ตรวจสอบ Cancel Output
```bash
# ดู cancel output
cat tests/outputs/cancel/csv-aligned-cancel-result.json | jq '.'

# ตรวจสอบ cancel-specific fields
cat tests/outputs/cancel/csv-aligned-cancel-result.json | jq '.OriginalPayload | {OrderId, IsCancelled, CancelLineCount, CancelledOrderSubTotal}'
```

---

## 🧪 Test Scripts และ Output Files

### Test Scripts Overview

| Script | Purpose | Input | Output Location |
|--------|---------|-------|-----------------|
| `test-csv-alignment.js` | Release transformation only | `data/samples/sample_input.json` | `tests/outputs/release/csv-aligned-test-result.json` |
| `test-csv-alignment-enhanced.js` | Release + Cancel comprehensive | Both sample files | `tests/outputs/release/` + `tests/outputs/cancel/` |
| `tests/cancel/test-complete-fixed-service.js` | Cancel service test | `data/samples/cancel_fully.json` | `tests/outputs/cancel/` |
| `tests/dto/test-full-dto.js` | DTO validation test | Sample input data | Console output |
| `tests/transformation/test-transformation-comprehensive.js` | Comprehensive transformation | Sample input data | Console + file output |

### Step-by-Step Test Execution

#### 1. รัน Release Test เดี่ยว
```bash
# รัน release transformation
node test-csv-alignment.js

# ตรวจสอบ output
ls -la tests/outputs/release/
cat tests/outputs/release/csv-aligned-test-result.json | jq '.OriginalPayload.OrderId'
```

#### 2. รัน Enhanced Test (ทั้ง Release และ Cancel)
```bash
# รัน comprehensive test
node test-csv-alignment-enhanced.js

# ตรวจสอบ outputs ทั้งหมด
ls -la tests/outputs/
ls -la tests/outputs/release/
ls -la tests/outputs/cancel/

# ดู summary report
cat tests/outputs/csv-alignment-test-summary.json | jq '.'
```

**Expected Enhanced Test Output:**
```
🚀 Starting Enhanced CSV Alignment Tests...

📦 Testing RELEASE Case...
📁 Loaded release sample input: { OrderId: '403521240-C7LDVZNUTGAHMA', ... }
✅ Release transformation completed
💾 Release result saved to: tests/outputs/release/csv-aligned-release-result.json

🚫 Testing CANCEL Case...
📁 Loaded cancel sample input: { OrderId: '311647613-C7LXT7KBTPA3TN', ... }
✅ Cancel transformation completed
💾 Cancel result saved to: tests/outputs/cancel/csv-aligned-cancel-result.json

📋 Test Summary:
  Release Case: ✅ 403521240-C7LDVZNUTGAHMA
  Cancel Case:  ✅ 311647613-C7LXT7KBTPA3TN
  Output Files: tests/outputs/[release|cancel]/
  Summary:      tests/outputs/csv-alignment-test-summary.json

🎯 Enhanced CSV Alignment Test: PASSED ✅
```

#### 3. รัน Cancel Service Test
```bash
# รัน cancel service test
node tests/cancel/test-complete-fixed-service.js

# ตรวจสอบ cancel output
ls -la tests/outputs/cancel/
```

### Output File Structure
```
tests/outputs/
├── release/
│   ├── csv-aligned-test-result.json          # Release test result (original script)
│   └── csv-aligned-release-result.json      # Release test result (enhanced script)
├── cancel/
│   ├── csv-aligned-cancel-result.json       # Cancel test result (enhanced script)
│   └── real-order-cancel-result-311647613-C7LXT7KBTPA3TN.json  # Real cancel order result
└── csv-alignment-test-summary.json          # Test execution summary
```

---

## 🔍 การตรวจสอบผลลัพธ์

### 1. ตรวจสอบ Release Output
```bash
# Basic validation
jq '.OriginalPayload | {
  OrderId,
  FulfillmentStatus,
  OrderSubTotal,
  TotalCharges,
  OrderLineCount,
  IsCancelled
}' tests/outputs/release/csv-aligned-test-result.json

# CSV field validation
jq '.OriginalPayload | {
  CancelLineCount,
  MaxFulfillmentStatusId,
  MinFulfillmentStatusId,
  EventSubmitTime,
  OrderToken
}' tests/outputs/release/csv-aligned-test-result.json
```

**Expected Release Values:**
- `FulfillmentStatus`: "Released"
- `IsCancelled`: false
- `CancelLineCount`: 0
- `MaxFulfillmentStatusId`: "3000"

### 2. ตรวจสอบ Cancel Output
```bash
# Basic cancel validation
jq '.OriginalPayload | {
  OrderId,
  FulfillmentStatus,
  IsCancelled,
  CancelLineCount,
  CancelledOrderSubTotal
}' tests/outputs/cancel/csv-aligned-cancel-result.json

# Cancel-specific fields
jq '.OriginalPayload.Order | {
  CancelReason,
  CancelComments,
  OrderLineCount: (.OrderLine | length)
}' tests/outputs/cancel/csv-aligned-cancel-result.json
```

**Expected Cancel Values:**
- `FulfillmentStatus`: "Canceled"
- `IsCancelled`: true
- `CancelLineCount`: > 0
- `CancelledOrderSubTotal`: > 0

### 3. ตรวจสอบ Summary Report
```bash
jq '{
  testRun: .testRun,
  releaseCase: .releaseCase | {orderId, fulfillmentStatus, isCancelled},
  cancelCase: .cancelCase | {orderId, fulfillmentStatus, isCancelled}
}' tests/outputs/csv-alignment-test-summary.json
```

---

## 🛠️ การรัน Application Services

### 1. รัน Development Server
```bash
cd app
pnpm run start:dev
```

### 2. ทดสอบผ่าน API

#### Release Transformation API
```bash
# POST /api/v1/orders/transform
curl -X POST http://localhost:3000/api/v1/orders/transform \
  -H "Content-Type: application/json" \
  -d @data/samples/sample_input.json
```

#### Cancel Transformation API
```bash
# POST /api/v1/orders/cancel/{orderId}
curl -X POST http://localhost:3000/api/v1/orders/cancel/311647613-C7LXT7KBTPA3TN \
  -H "Content-Type: application/json" \
  -d '{
    "CancelReason": {"ReasonId": "1000.000"},
    "CancelComments": "Customer requested cancellation",
    "OrgId": "CFR"
  }'
```

---

## ⚠️ Troubleshooting

### Common Issues และ Solutions

#### 1. "Module not found" Error
```bash
# Solution: Build the application first
cd app
pnpm run build
cd ..
node test-csv-alignment.js
```

#### 2. "File not found" Error
```bash
# Solution: ตรวจสอบ path และ create directories
mkdir -p tests/outputs/release
mkdir -p tests/outputs/cancel
```

#### 3. JSON Parse Error
```bash
# Solution: ตรวจสอบ input file format
jq '.' data/samples/sample_input.json
jq '.' data/samples/cancel_fully.json
```

#### 4. Transformation Failed
```bash
# Debug steps:
# 1. ตรวจสอบ input data structure
jq 'keys' data/samples/sample_input.json

# 2. ตรวจสอบ required fields
jq '{OrderId, OrderLine: (.OrderLine | length), CurrencyCode}' data/samples/sample_input.json

# 3. รัน with verbose logging
DEBUG=* node test-csv-alignment.js
```

### Log Analysis
```bash
# ดู transformation logs
tail -f app/logs/application.log

# ดู error logs
grep -i error app/logs/application.log
```

### Performance Monitoring
```bash
# ตรวจสอบ memory usage
node --max-old-space-size=4096 test-csv-alignment-enhanced.js

# ตรวจสอบ execution time
time node test-csv-alignment.js
```

---

## 📊 Expected Results Summary

### Release Transformation Success Criteria
- ✅ `FulfillmentStatus` = "Released"
- ✅ `IsCancelled` = false  
- ✅ `OrderSubTotal` > 0
- ✅ `TotalCharges` ≥ 0
- ✅ `MaxFulfillmentStatusId` = "3000"
- ✅ CSV fields มีครบถ้วน

### Cancel Transformation Success Criteria
- ✅ `FulfillmentStatus` = "Canceled"
- ✅ `IsCancelled` = true
- ✅ `CancelLineCount` > 0
- ✅ `CancelledOrderSubTotal` > 0
- ✅ `MaxFulfillmentStatusId` = "9000"
- ✅ Cancel history records มีครบถ้วน

---

## 🔄 Next Steps

หลังจากรัน transformation สำเร็จแล้ว:

1. **Validation**: เปรียบเทียบผลลัพธ์กับ expected output
2. **Integration Testing**: ทดสอบกับ downstream systems
3. **Performance Testing**: วัดประสิทธิภาพการทำงาน
4. **Monitoring Setup**: ติดตั้ง monitoring และ alerting
5. **Documentation**: อัพเดท documentation และ field mappings

สำหรับข้อมูลเพิ่มเติม โปรดดูที่ `CLAUDE.md` และ `README.md`