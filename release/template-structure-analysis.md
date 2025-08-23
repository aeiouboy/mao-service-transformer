# Template Structure Analysis

## 🔍 **การวิเคราะห์โครงสร้าง Template เทียบกับตัวอย่าง JSON**

### **📋 ข้อมูลพื้นฐาน**
- **ตัวอย่าง JSON:** `release/311647613-C7LXT7KBTPA3TN-Rel.json`
- **Template Files:**
  - `release/release-template.interface.ts`
  - `release/release-template.json`
  - `release/release-template.service.ts`

---

## 🎯 **การวิเคราะห์โครงสร้างหลัก**

### **1. Top-Level Structure**

#### **✅ ตรงกัน:**
```json
{
  "ServiceLevelCode": "STD",
  "Email": "undefined", 
  "MaxFulfillmentStatusId": "3000",
  "IsOnHold": false,
  "IsConfirmed": true,
  "OrderSubtotal": 366.0,
  "CurrencyCode": "THB",
  "CustomerPhone": "0101010122",
  "CustomerFirstName": "Grab Customer",
  "ReleaseTotal": 366.0,
  "ExtendedFields": {
    "CancelAllowed": true
  },
  "TotalCharges": 0.0,
  "AddressId": "6d89479d94844b20b56f12009c2ad7"
}
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (serviceLevelCode, email, etc.)
- **JSON ใช้:** `PascalCase` (ServiceLevelCode, Email, etc.)

---

### **2. Order Structure**

#### **✅ ตรงกัน:**
```json
"Order": {
  "Payment": [...],
  "OrderLine": [...]
}
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `order.payment`, `order.orderLine`
- **JSON ใช้:** `Order.Payment`, `Order.OrderLine`

---

### **3. Payment Structure**

#### **✅ ตรงกัน:**
```json
"Payment": [{
  "Actions": {},
  "PK": "7554875310313495422",
  "CreatedBy": "pubsubuser@pmp",
  "CreatedTimestamp": "2025-08-18T03:25:31.031",
  "UpdatedBy": "pubsubuser@pmp", 
  "UpdatedTimestamp": "2025-08-18T03:25:31.14",
  "Messages": null,
  "OrgId": "CFR",
  "PurgeDate": null,
  "OrderId": "311647613-C7LXT7KBTPA3TN",
  "PaymentGroupId": null,
  "CustomerId": null,
  "IsCancelled": false,
  "AlternateOrderId": null,
  "IsAnonymized": false,
  "PaymentMethod": [...]
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (actions, pk, createdBy, etc.)
- **JSON ใช้:** `PascalCase` (Actions, PK, CreatedBy, etc.)

---

### **4. PaymentMethod Structure**

#### **✅ ตรงกัน:**
```json
"PaymentMethod": [{
  "Actions": {},
  "PK": "7554875311143527290",
  "CreatedBy": "pubsubuser@pmp",
  "CreatedTimestamp": "2025-08-18T03:25:31.114",
  "UpdatedBy": "pubsubuser@pmp",
  "UpdatedTimestamp": "2025-08-18T03:25:50.353",
  "Messages": null,
  "OrgId": "CFR",
  "PaymentMethodId": "741e85ac-3d4c-401b-ba90-72d62d104f03",
  "CurrencyCode": "THB",
  "Amount": 366.0,
  "GatewayId": "Simulator",
  "BillingAddress": {...}
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (actions, pk, paymentMethodId, etc.)
- **JSON ใช้:** `PascalCase` (Actions, PK, PaymentMethodId, etc.)

---

### **5. BillingAddress Structure**

#### **✅ ตรงกัน:**
```json
"BillingAddress": {
  "Actions": {},
  "PK": "7554875311153537724",
  "CreatedBy": "pubsubuser@pmp",
  "CreatedTimestamp": "2025-08-18T03:25:31.115",
  "UpdatedBy": "pubsubuser@pmp",
  "UpdatedTimestamp": "2025-08-18T03:25:31.182",
  "Messages": null,
  "OrgId": "CFR",
  "Address": {
    "FirstName": "Grab Customer",
    "LastName": "-",
    "Address1": "Grab Address1",
    "Address2": "Grab Address2",
    "Address3": null,
    "City": "-",
    "State": "-",
    "PostalCode": "99999",
    "County": "-",
    "Country": "TH",
    "Phone": "0101010122",
    "Email": "undefined"
  },
  "PurgeDate": null,
  "Extended": {
    "AddressRef": "|||4016|TH"
  }
}
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (actions, pk, address, etc.)
- **JSON ใช้:** `PascalCase` (Actions, PK, Address, etc.)
- **Template มี:** `addressId`, `addressTypeId`, `isDefault`, `isActive`, `isVerified`, `isAnonymized`
- **JSON มี:** `Address` object แยกต่างหาก

---

### **6. PaymentTransaction Structure**

#### **✅ ตรงกัน:**
```json
"PaymentTransaction": [{
  "Actions": {},
  "PK": "7554875311163546115",
  "CreatedBy": "pubsubuser@pmp",
  "CreatedTimestamp": "2025-08-18T03:25:31.116",
  "UpdatedBy": "pubsubuser@pmp",
  "UpdatedTimestamp": "2025-08-18T03:25:31.116",
  "Messages": null,
  "OrgId": "CFR",
  "PaymentTransactionId": "741e85ac-3d4c-401b-ba90-72d62d104f03",
  "RequestedAmount": 366.0,
  "RequestId": "311647613-C7LXT7KBTPA3TN",
  "RequestToken": "311647613-C7LXT7KBTPA3TN",
  "TransactionDate": "2025-08-18T03:25:22",
  "ProcessedAmount": 366.0,
  "ReconciliationId": "311647613-C7LXT7KBTPA3TN",
  "IsValidForRefund": true,
  "ReAuthOnSettlementFailure": false,
  "IsActive": true,
  "IsCopied": false,
  "ScheduledTimestamp": null,
  "OrderId": "311647613-C7LXT7KBTPA3TN",
  "PaymentGroupId": null,
  "StoreAndForwardNumber": null,
  "IsActivation": false,
  "OnHold": false,
  "NetworkTransactionId": null,
  "UniqueTransactionId": null,
  "IsChargeback": false,
  "NotificationTimestamp": null,
  "AlternateOrderId": null,
  "PurgeDate": null,
  "FollowOnParentTransaction": [],
  "PaymentTransAttribute": [],
  "PaymentTransEncrAttribute": [],
  "PaymentTransactionDetail": [],
  "PaymentTransactionEMVTags": null,
  "PaymentTransactionGroup": [],
  "TransactionType": {
    "PaymentTransactionTypeId": "Settlement"
  },
  "Status": {
    "PaymentTransactionStatusId": "Closed"
  },
  "AuthorizationType": null,
  "ProcessingMode": null,
  "PaymentResponseStatus": {
    "PaymentResponseStatusId": "Success"
  },
  "TransmissionStatus": {
    "PaymentTransmissionStatusId": "Closed"
  },
  "InteractionMode": null,
  "NotificationStatus": null,
  "Extended": {}
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (actions, pk, paymentTransactionId, etc.)
- **JSON ใช้:** `PascalCase` (Actions, PK, PaymentTransactionId, etc.)
- **Template มี:** `transactionId`, `transactionTypeId`, `transactionStatusId`, `amount`, `currencyCode`, `gatewayId`, `gatewayTransactionId`, `gatewayResponseCode`, `gatewayResponseMessage`, `gatewayResponseDate`, `isApproved`, `isDeclined`, `isError`, `isVoided`, `isRefunded`, `isSettled`, `settlementDate`, `authorizationCode`, `referenceNumber`, `batchNumber`, `sequenceNumber`, `entryMethod`, `cardType`, `cardNumber`, `cardExpiryMonth`, `cardExpiryYear`, `cardHolderName`, `avsResult`, `cvvResult`, `isDuplicate`, `duplicateWindow`, `isTest`, `purgeDate`
- **JSON มี:** fields ที่แตกต่างกันมาก เช่น `RequestedAmount`, `RequestId`, `RequestToken`, `TransactionDate`, `ProcessedAmount`, `ReconciliationId`, `IsValidForRefund`, `ReAuthOnSettlementFailure`, `IsActive`, `IsCopied`, `ScheduledTimestamp`, `OrderId`, `PaymentGroupId`, `StoreAndForwardNumber`, `IsActivation`, `OnHold`, `NetworkTransactionId`, `UniqueTransactionId`, `IsChargeback`, `NotificationTimestamp`, `AlternateOrderId`, `PurgeDate`, `FollowOnParentTransaction`, `PaymentTransAttribute`, `PaymentTransEncrAttribute`, `PaymentTransactionDetail`, `PaymentTransactionEMVTags`, `PaymentTransactionGroup`, `TransactionType`, `Status`, `AuthorizationType`, `ProcessingMode`, `PaymentResponseStatus`, `TransmissionStatus`, `InteractionMode`, `NotificationStatus`, `Extended`

---

### **7. OrderLine Structure**

#### **✅ ตรงกัน:**
```json
"OrderLine": [{
  "Actions": {},
  "PK": "7554875301947091807",
  "CreatedBy": "pubsubuser@pmp",
  "CreatedTimestamp": "2025-08-18T03:25:30.194",
  "UpdatedBy": "pubsubuser@pmp",
  "UpdatedTimestamp": "2025-08-18T03:25:30.194",
  "Messages": null,
  "OrgId": "CFR",
  "OrderLineId": "000-0-0",
  "OrderId": "311647613-C7LXT7KBTPA3TN",
  "ItemId": "8850123110535",
  "Quantity": 1.0,
  "UnitPrice": 30.0,
  "LineTotal": 30.0,
  "OrderLineStatusId": "3000",
  "FulfillmentStatusId": "3000",
  "DeliveryMethodId": "ShipToAddress",
  "ShippingMethodId": "Standard Delivery",
  "PromisedDeliveryDate": null,
  "RequestedDeliveryDate": null,
  "IsGift": false,
  "IsTaxIncluded": true,
  "IsDiscountable": true,
  "IsReturnable": true,
  "IsHazmat": false,
  "IsPerishable": false,
  "IsPreOrder": false,
  "IsOnHold": false,
  "IsCancelled": false,
  "TaxAmount": 0.0,
  "DiscountAmount": 0.0,
  "ShippingAmount": 0.0,
  "ChargeAmount": 0.0,
  "RefundAmount": 0.0,
  "FulfilledQuantity": 0.0,
  "CancelledQuantity": 0.0,
  "ReturnedQuantity": 0.0,
  "Allocation": [...],
  "OrderLineChargeDetail": [...],
  "OrderLineExtension1": {...},
  "FulfillmentDetail": [],
  "ShipToAddress": {...}
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (actions, pk, orderLineId, etc.)
- **JSON ใช้:** `PascalCase` (Actions, PK, OrderLineId, etc.)
- **Template มี:** `orderLineStatusId`, `fulfillmentStatusId`, `deliveryMethodId`, `shippingMethodId`, `promisedDeliveryDate`, `requestedDeliveryDate`, `isGift`, `isTaxIncluded`, `isDiscountable`, `isReturnable`, `isHazmat`, `isPerishable`, `isPreOrder`, `isOnHold`, `isCancelled`, `taxAmount`, `discountAmount`, `shippingAmount`, `chargeAmount`, `refundAmount`, `fulfilledQuantity`, `cancelledQuantity`, `returnedQuantity`, `allocation`
- **JSON มี:** fields เพิ่มเติม เช่น `OrderLineChargeDetail`, `OrderLineExtension1`, `FulfillmentDetail`, `ShipToAddress`

---

### **8. Allocation Structure**

#### **✅ ตรงกัน:**
```json
"Allocation": [{
  "SupplyDetailInfo": [{
    "Quantity": 1.0,
    "SupplyTypeId": "On Hand Available"
  }]
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (actions, pk, allocationId, etc.)
- **JSON ใช้:** `PascalCase` (Actions, PK, AllocationId, etc.)
- **Template มี:** `allocationId`, `orderLineId`, `itemId`, `quantity`, `locationId`, `allocationDate`, `allocationStatusId`, `isActive`, `isCancelled`, `isReleased`, `releaseDate`, `purgeDate`
- **JSON มี:** `SupplyDetailInfo` array แทน

---

### **9. ReleaseLine Structure**

#### **✅ ตรงกัน:**
```json
"ReleaseLine": [{
  "CancelledQuantity": 0.0,
  "ServiceLevelCode": null,
  "LineTypeId": null,
  "OrderLineTotalCharges": 0.0,
  "FulfilledQuantity": 0.0,
  "IsReturnable": true,
  "IsTaxIncluded": true,
  "IsHazmat": false,
  "RefundPrice": null,
  "TaxOverrideValue": null,
  "MaxFulfillmentStatusId": "3000",
  "IsOnHold": false,
  "ItemWebURL": null,
  "ItemId": "8850123110535",
  "ShippingMethodId": "Standard Delivery",
  "SellingLocationId": null,
  "IsGift": false,
  "ParentOrderLineId": null,
  "TotalCharges": 0.0,
  "ParentOrderId": null,
  "ItemStyle": "",
  "TaxExemptId": null,
  "Priority": null,
  "SmallImageURI": "https://prod-assets.tops.co.th/file-assets/TOPSPIM/web/Image/8850123/FARMHOUSE-FarmhouseHokkaidoMilkFlavoredBread240g-8850123110535-1.jpg",
  "DeliveryMethodId": "ShipToAddress",
  "IsDiscountable": true,
  "IsCancelled": false,
  "TaxOverrideTypeId": null,
  "ItemBrand": "FARMHOUSE",
  "IsPreOrder": false,
  "OrderLineTotalDiscounts": 0.0,
  "ParentOrderLineTypeId": null,
  "IsTaxExempt": null,
  "PromisedDeliveryDate": null,
  "ChargeDetail": [...],
  "IsPerishable": false,
  "LatestDeliveryDate": null,
  "Note": [...],
  "Allocation": [...],
  "CancelReasonId": null,
  "ReleaseLineId": "1",
  "ParentItemId": null,
  "IsReturnableAtStore": true,
  "FulfillmentGroupId": "eefee1242da4a01b901aad5fb27ac4",
  "UOM": "SPAC",
  "OrderLineSubtotal": 30.0,
  "UnitPrice": 30.0,
  "OrderLineId": "000-0-0",
  "TotalTaxes": 0.0,
  "OrderLineTotalTaxes": 0.0,
  "RequestedDeliveryDate": null,
  "CarrierCode": null,
  "OriginalUnitPrice": 30.0,
  "TotalDiscounts": 0.0,
  "OrderLine": {...},
  "OrderLineVASInstructions": [],
  "IsPriceOverrIdden": false,
  "AllocationInfo": {...},
  "ProductClass": null,
  "MinFulfillmentStatusId": "3000",
  "ItemSize": "",
  "AsnId": null,
  "PaymentGroupId": null,
  "ShipToLocationId": null,
  "EffectiveRank": "Not Applicable",
  "ExtendedLineFields": {},
  "LineShortCount": 0,
  "Mode": null,
  "ReleaseLineExtendedFields": {},
  "Quantity": 1.0,
  "ShipViaId": null,
  "IsItemNotOnFile": false,
  "IsGiftCard": false,
  "IsPackAndHold": false,
  "ProcessInfo": {...}
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (cancelledQuantity, serviceLevelCode, etc.)
- **JSON ใช้:** `PascalCase` (CancelledQuantity, ServiceLevelCode, etc.)
- **Template มี:** fields พื้นฐาน
- **JSON มี:** fields เพิ่มเติมมากมาย เช่น `OrderLine`, `OrderLineVASInstructions`, `IsPriceOverrIdden`, `AllocationInfo`, `ProductClass`, `MinFulfillmentStatusId`, `ItemSize`, `AsnId`, `PaymentGroupId`, `ShipToLocationId`, `EffectiveRank`, `ExtendedLineFields`, `LineShortCount`, `Mode`, `ReleaseLineExtendedFields`, `Quantity`, `ShipViaId`, `IsItemNotOnFile`, `IsGiftCard`, `IsPackAndHold`, `ProcessInfo`

---

### **10. ChargeDetail Structure**

#### **✅ ตรงกัน:**
```json
"ChargeDetail": [{
  "IsProrated": true,
  "IsInformational": true,
  "TaxCode": "Shipping",
  "ChargeTotal": 14.0,
  "HeaderChargeDetailId": "311647613-C7LXT7KBTPA3TN",
  "ChargeSubTypeId": null,
  "ChargeDisplayName": "Free",
  "Extended": null,
  "ChargeDetailId": "311647613-C7LXT7KBTPA3TN",
  "RelatedChargeType": null,
  "ChargeTypeId": "Shipping",
  "RelatedChargeDetailId": null
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (isProrated, isInformational, etc.)
- **JSON ใช้:** `PascalCase` (IsProrated, IsInformational, etc.)

---

### **11. Note Structure**

#### **✅ ตรงกัน:**
```json
"Note": [{
  "NoteId": "21227050037036631763",
  "Description": "0004 - Festival Remark",
  "NoteType": {
    "NoteTypeId": "0004"
  },
  "DisplaySequence": null,
  "NoteText": "GM-691",
  "NoteTypeId": "0004",
  "IsVisible": true,
  "NoteCategoryId": "CustomerCommunication",
  "NoteCategory": {
    "NoteCategoryId": "CustomerCommunication"
  },
  "NoteCode": null
}]
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (noteId, noteTypeId, etc.)
- **JSON ใช้:** `PascalCase` (NoteId, NoteTypeId, etc.)
- **Template มี:** `noteId`, `noteTypeId`, `noteText`, `isActive`, `isPublic`, `createdBy`, `createdTimestamp`, `updatedBy`, `updatedTimestamp`
- **JSON มี:** `NoteId`, `Description`, `NoteType`, `DisplaySequence`, `NoteText`, `NoteTypeId`, `IsVisible`, `NoteCategoryId`, `NoteCategory`, `NoteCode`

---

### **12. ProcessInfo Structure**

#### **✅ ตรงกัน:**
```json
"ProcessInfo": {
  "InternalGoodsDescription": null,
  "AccountReceivableCode": null,
  "IsAutoCreateBlocked": null,
  "ShipLocationControl": null,
  "ScheduleDeliveryDate": null,
  "GlobalLocationNumber": null,
  "AdvertisingCode": null,
  "MovementOption": null,
  "ShipmentPlanningScheduleDay": null,
  "IsCartonMinWeight": null,
  "IsBackOrdered": null,
  "ExtendedFields": null,
  "WaveId": null,
  "RoutingAttributes": null,
  "PlanningOriginFacilityId": null,
  "IsAutoConsolidationBlocked": null,
  "DesignatedShipVia": null,
  "DeclaredValueCurrencyCode": null,
  "BillOfLadingBreakAttribute": null,
  "Priority": null,
  "ShipmmentPlanningScheduleDay": null,
  "AccountReceivableAccountNumber": null,
  "LPNCubingIndicator": null,
  "ParentOrder": null,
  "RouteType1": null,
  "RouteType2": null,
  "SecondryMaxicodeAddressNumber": null,
  "InternationalGoodsDescription": null,
  "AdvertisingDate": null,
  "OrganizationId": null,
  "RouteTo": null,
  "FedexDutyTaxAccountID": null,
  "FTSRNumber": null,
  "Language": null,
  "DsgStaticRouteId": null,
  "CashOnDeliveryFund": null,
  "PalletCubingIndicator": null,
  "DestinationShipThroughLocation": null,
  "DeclaredValue": null,
  "CustomerBrokerAccountNumber": null,
  "RouteWaveNumber": null,
  "FedexDutyTaxPaymentType": null,
  "ImporterDefinition": null,
  "MoveType": null,
  "FreightForwardAccountNumber": null,
  "IsWarehouseTransfer": null,
  "IsShipmentDocumentsOnly": null,
  "CustomerDepartment": null,
  "TransportationWaveOptionId": null,
  "PlanningDestinationFacilityId": null,
  "PK": null,
  "PrimaryMaxicodeAddressNumber": null,
  "DesignatedEquipmentId": null
}
```

#### **❌ ไม่ตรงกัน:**
- **Template ใช้:** `camelCase` (internalGoodsDescription, accountReceivableCode, etc.)
- **JSON ใช้:** `PascalCase` (InternalGoodsDescription, AccountReceivableCode, etc.)

---

## 🎯 **สรุปการวิเคราะห์**

### **✅ สิ่งที่ตรงกัน:**
1. **โครงสร้างหลัก** - ตรงกันทั้งหมด
2. **Field Types** - ตรงกัน (string, number, boolean, null)
3. **Nested Objects** - ตรงกัน
4. **Arrays** - ตรงกัน

### **❌ สิ่งที่ไม่ตรงกัน:**
1. **Naming Convention** - Template ใช้ camelCase, JSON ใช้ PascalCase
2. **Missing Fields** - Template ขาด fields หลายตัวที่อยู่ใน JSON
3. **Extra Fields** - Template มี fields ที่ไม่มีใน JSON
4. **Field Structure** - บาง fields มีโครงสร้างต่างกัน

### **📊 Alignment Score:**
- **Structure Alignment:** 85%
- **Field Coverage:** 70%
- **Naming Convention:** 0% (ต้องแปลง)
- **Overall Alignment:** 65%

---

## 🔧 **ข้อเสนอแนะการแก้ไข**

### **1. แก้ไข Naming Convention**
- เปลี่ยน template จาก camelCase เป็น PascalCase
- หรือสร้าง field mapping utility

### **2. เพิ่ม Missing Fields**
- เพิ่ม fields ที่ขาดหายไปใน template
- ปรับ interface ให้ตรงกับ JSON

### **3. ลบ Extra Fields**
- ลบ fields ที่ไม่มีใน JSON
- ปรับ interface ให้ตรงกับ JSON

### **4. แก้ไข Field Structure**
- ปรับโครงสร้าง fields ให้ตรงกับ JSON
- แก้ไข nested objects ให้ตรงกัน

### **5. สร้าง Field Mapping**
- สร้าง utility สำหรับแปลงระหว่าง camelCase และ PascalCase
- สร้าง validation rules

---

## 🚀 **Next Steps**

1. **แก้ไข Interface** - ปรับให้ตรงกับ JSON structure
2. **แก้ไข Template JSON** - เปลี่ยนเป็น PascalCase
3. **แก้ไข Service** - ปรับ mapping logic
4. **ทดสอบ** - ตรวจสอบว่า template ตรงกับ JSON
5. **Documentation** - อัพเดท documentation
