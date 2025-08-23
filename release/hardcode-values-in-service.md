# 📋 รายการ Hardcode Values ใน release-order-transformer.service.ts

## 🔍 **ไฟล์ที่ตรวจสอบ:**
- `/Users/chongraktanaka/Projects/mao-service-transformer/app/src/modules/releases/services/release-order-transformer.service.ts`

---

## 📊 **Hardcode Values ที่พบใน buildPascalCasePayload:**

### **🔢 ตัวเลข (Numbers):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 217 | `OrderSubtotal` | `0` | fallback |
| 223 | `ReleaseTotal` | `0` | fallback |
| 227 | `TotalCharges` | `0` | fallback |
| 234 | `OrderTotalDiscounts` | `0` | fallback |
| 254 | `OrderTotalTaxes` | `0` | fallback |
| 267 | `NoOfStoreSaleLines` | `0` | Not in DB yet |
| 298 | `OrderTotalCharges` | `0` | fallback |
| 299 | `TotalTaxes` | `0` | fallback |
| 304 | `OrderTotal` | `0` | fallback |
| 305 | `TotalDiscounts` | `0` | fallback |

### **📝 ข้อความ (Strings):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 212 | `ServiceLevelCode` | `'STD'` | fallback |
| 213 | `Email` | `'undefined'` | fallback |
| 214 | `MaxFulfillmentStatusId` | `'3000'` | fallback |
| 220 | `CurrencyCode` | `'THB'` | fallback |
| 232 | `DocTypeId` | `'CustomerOrder'` | fallback |
| 233 | `CreatedBy` | `'system'` | fallback |
| 241 | `City` | `'-'` | fallback |
| 248 | `State` | `'-'` | fallback |
| 249 | `DestinationAction` | `'Delivery'` | Default value |
| 252 | `Country` | `'TH'` | fallback |
| 256 | `LastName` | `'-'` | fallback |
| 266 | `ShipFromLocationId` | `'CFR128'` | Fixed value |
| 268 | `PostalCode` | `'99999'` | fallback |
| 269 | `OrganizationId` | `'CFM-UAT'` | fallback |
| 271 | `County` | `'-'` | fallback |
| 274 | `CustomerEmail` | `'undefined'` | fallback |
| 276 | `OrderTypeId` | `'MKP-HD-STD'` | fallback |
| 279 | `SellingChannelId` | `'Grab'` | fallback |
| 280 | `MinFulfillmentStatusId` | `'Open'` | fallback |
| 286 | `DeliveryMethod` | `'ShipToAddress'` | Default value |
| 291 | `ShipViaId` | `'InStore_STD'` | Fixed value |
| 297 | `OrderLocale` | `'th'` | fallback |
| 300 | `CustomerLastName` | `'-'` | fallback |
| 302 | `CarrierCode` | `'InStore'` | Fixed value |
| 303 | `AddressType` | `'CustomerShipToAddress'` | Default value |

### **❌ Null Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 218 | `ModeId` | `null` | Not in DB yet |
| 219 | `SellingLocationId` | `null` | Not in DB yet |
| 228 | `ExternalShipFromLocationId` | `null` | Not in DB yet |
| 229 | `TaxExemptId` | `null` | Not in DB yet |
| 235 | `Priority` | `null` | Not in DB yet |
| 237 | `IsPublished` | `null` | Not in DB yet |
| 240 | `CustomerId` | `null` | fallback |
| 243 | `AVSReasonId` | `null` | Not in DB yet |
| 246 | `AddressName` | `null` | Not in DB yet |
| 255 | `HasAlerts` | `null` | Not in DB yet |
| 262 | `DeliveryMethodSubType` | `null` | Not in DB yet |
| 263 | `PickupExpiryDate` | `null` | Not in DB yet |
| 265 | `TaxExemptReasonId` | `null` | Not in DB yet |
| 270 | `InvoiceId` | `null` | Not in DB yet |
| 272 | `IsPostVoided` | `null` | Not in DB yet |
| 278 | `CustomerCommPref` | `null` | Not in DB yet |
| 281 | `ReleaseType` | `null` | Not in DB yet |
| 283 | `ExternalOrganizationId` | `null` | Not in DB yet |
| 285 | `ShipToLocationId` | `null` | Not in DB yet |
| 292 | `Address3` | `null` | fallback |
| 295 | `CancelReasonId` | `null` | Not in DB yet |
| 296 | `PostVoIdReasonId` | `null` | Not in DB yet |

### **❌ False Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 215 | `IsOnHold` | `false` | fallback |
| 236 | `IsCancelled` | `false` | fallback |
| 245 | `IsTaxExempt` | `false` | Not in DB yet |
| 259 | `IsReadyForTender` | `false` | Not in DB yet |
| 261 | `OverageAllowed` | `false` | Not in DB yet |

### **✅ True Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 216 | `IsConfirmed` | `true` | Default value |
| 238 | `HasNotes` | `true` | Default value |
| 250 | `IsAddressVerified` | `true` | Default value |

---

## 📊 **Hardcode Values ใน buildPascalCasePayments:**

### **📝 ข้อความ (Strings):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 332 | `CreatedBy` | `'pubsubuser@pmp'` | Hardcode |
| 334 | `UpdatedBy` | `'pubsubuser@pmp'` | Hardcode |
| 337 | `OrgId` | `'CFR'` | fallback |
| 342 | `StatusId` | `'5000.000'` | Hardcode |

### **❌ Null Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 331 | `Messages` | `null` | Hardcode |
| 333 | `PurgeDate` | `null` | Hardcode |
| 335 | `PaymentGroupId` | `null` | Hardcode |
| 336 | `CustomerId` | `null` | Hardcode |
| 338 | `AlternateOrderId` | `null` | Hardcode |

### **❌ False Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 337 | `IsCancelled` | `false` | Hardcode |
| 339 | `IsAnonymized` | `false` | Hardcode |

---

## 📊 **Hardcode Values ใน buildPascalCasePaymentMethods:**

### **📝 ข้อความ (Strings):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 359 | `CreatedBy` | `'pubsubuser@pmp'` | Hardcode |
| 361 | `UpdatedBy` | `'pubsubuser@pmp'` | Hardcode |
| 362 | `CurrencyCode` | `'THB'` | fallback |
| 383 | `GatewayId` | `'Simulator'` | fallback |

### **🔢 ตัวเลข (Numbers):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 377 | `CurrentAuthAmount` | `0` | Hardcode |
| 379 | `CurrentRefundAmount` | `0` | Hardcode |
| 395 | `CurrentFailedAmount` | `0` | Hardcode |
| 405 | `MerchandiseAmount` | `0` | Hardcode |

### **❌ Null Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 359 | `Messages` | `null` | Hardcode |
| 363 | `AlternateCurrencyCode` | `null` | Hardcode |
| 364 | `ConversionRate` | `null` | Hardcode |
| 365 | `AlternateCurrencyAmount` | `null` | Hardcode |
| 366 | `AccountNumber` | `null` | Hardcode |
| 367 | `AccountDisplayNumber` | `null` | Hardcode |
| 368 | `NameOnCard` | `null` | Hardcode |
| 369 | `SwipeData` | `null` | Hardcode |
| 370 | `CardExpiryMonth` | `null` | Hardcode |
| 371 | `CardExpiryYear` | `null` | Hardcode |
| 372 | `GiftCardPin` | `null` | Hardcode |
| 373 | `CustomerSignature` | `null` | Hardcode |
| 374 | `CustomerPaySignature` | `null` | Hardcode |
| 375 | `ChangeAmount` | `null` | Hardcode |
| 380 | `ChargeSequence` | `null` | Hardcode |
| 382 | `EntryTypeId` | `null` | Hardcode |
| 384 | `RoutingNumber` | `null` | Hardcode |
| 385 | `RoutingDisplayNumber` | `null` | Hardcode |
| 386 | `CheckNumber` | `null` | Hardcode |
| 387 | `DriversLicenseNumber` | `null` | Hardcode |
| 388 | `DriversLicenseState` | `null` | Hardcode |
| 389 | `DriversLicenseCountry` | `null` | Hardcode |
| 390 | `BusinessName` | `null` | Hardcode |
| 391 | `BusinessTaxId` | `null` | Hardcode |
| 392 | `CheckQuantity` | `null` | Hardcode |
| 393 | `OriginalAmount` | `null` | Hardcode |
| 396 | `ParentOrderId` | `null` | Hardcode |
| 397 | `ParentPaymentGroupId` | `null` | Hardcode |
| 398 | `ParentPaymentMethodId` | `null` | Hardcode |
| 401 | `GatewayAccountId` | `null` | Hardcode |
| 402 | `LocationId` | `null` | Hardcode |
| 403 | `TransactionReferenceId` | `null` | Hardcode |
| 406 | `CapturedSource` | `null` | Hardcode |
| 407 | `ShopperReference` | `null` | Hardcode |
| 408 | `SuggestedAmount` | `null` | Hardcode |
| 409 | `PurgeDate` | `null` | Hardcode |
| 418 | `CardType` | `null` | Hardcode |
| 419 | `AccountType` | `null` | Hardcode |
| 420 | `PaymentCategory` | `null` | Hardcode |
| 424 | `InstallmentPlan` | `null` | Hardcode |
| 426 | `InstallmentRate` | `null` | Hardcode |

### **❌ False Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 394 | `IsModifiable` | `false` | Hardcode |
| 399 | `IsVoided` | `false` | Hardcode |
| 400 | `IsCopied` | `false` | Hardcode |
| 404 | `CapturedInEdgeMode` | `false` | Hardcode |

---

## 📊 **Hardcode Values ใน buildPascalCaseBillingAddress:**

### **📝 ข้อความ (Strings):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 443 | `OrgId` | `'CFM-UAT'` | Hardcode |
| 446 | `FirstName` | `'Grab Customer'` | Hardcode |
| 447 | `LastName` | `'-'` | Hardcode |
| 448 | `Address1` | `'Grab Address1'` | Hardcode |
| 449 | `Address2` | `'Grab Address2'` | Hardcode |
| 450 | `City` | `'-'` | Hardcode |
| 451 | `State` | `'-'` | Hardcode |
| 452 | `PostalCode` | `'99999'` | Hardcode |
| 453 | `County` | `'-'` | Hardcode |
| 454 | `Country` | `'TH'` | Hardcode |
| 455 | `Phone` | `'0101010122'` | Hardcode |
| 456 | `Email` | `'undefined'` | Hardcode |
| 460 | `AddressRef` | `'|||4016|TH'` | Hardcode |

### **❌ Null Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 442 | `Messages` | `null` | Hardcode |
| 449 | `Address3` | `null` | Hardcode |
| 458 | `PurgeDate` | `null` | Hardcode |

---

## 📊 **Hardcode Values ใน buildPascalCasePaymentTransactions:**

### **📝 ข้อความ (Strings):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 477 | `CreatedBy` | `'pubsubuser@pmp'` | Hardcode |
| 479 | `UpdatedBy` | `'pubsubuser@pmp'` | Hardcode |
| 517 | `PaymentTransactionTypeId` | `'Settlement'` | fallback |
| 518 | `PaymentTransactionStatusId` | `'Closed'` | fallback |
| 521 | `PaymentResponseStatusId` | `'Success'` | fallback |
| 522 | `PaymentTransmissionStatusId` | `'Closed'` | fallback |

### **🔢 ตัวเลข (Numbers):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 488 | `FollowOnProcessedAmount` | `0` | Hardcode |
| 489 | `RemainingAttempts` | `0` | Hardcode |
| 490 | `FollowOnCount` | `0` | Hardcode |
| 497 | `RemainingBalance` | `0` | Hardcode |

### **❌ Null Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 476 | `Messages` | `null` | Hardcode |
| 482 | `RequestedDate` | `null` | Hardcode |
| 483 | `FollowOnId` | `null` | Hardcode |
| 484 | `FollowOnToken` | `null` | Hardcode |
| 486 | `TransactionExpiryDate` | `null` | Hardcode |
| 492 | `ExternalResponseId` | `null` | Hardcode |
| 493 | `ReasonId` | `null` | Hardcode |
| 499 | `ScheduledTimestamp` | `null` | Hardcode |
| 501 | `PaymentGroupId` | `null` | Hardcode |
| 502 | `StoreAndForwardNumber` | `null` | Hardcode |
| 505 | `NetworkTransactionId` | `null` | Hardcode |
| 506 | `UniqueTransactionId` | `null` | Hardcode |
| 508 | `NotificationTimestamp` | `null` | Hardcode |
| 509 | `AlternateOrderId` | `null` | Hardcode |
| 510 | `PurgeDate` | `null` | Hardcode |
| 515 | `PaymentTransactionEMVTags` | `null` | Hardcode |
| 519 | `AuthorizationType` | `null` | Hardcode |
| 520 | `ProcessingMode` | `null` | Hardcode |
| 523 | `InteractionMode` | `null` | Hardcode |
| 524 | `NotificationStatus` | `null` | Hardcode |

### **❌ False Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 495 | `ReAuthOnSettlementFailure` | `false` | Hardcode |
| 504 | `OnHold` | `false` | Hardcode |
| 507 | `IsChargeback` | `false` | Hardcode |

---

## 📊 **Hardcode Values ใน buildPascalCaseReleaseLines:**

### **🔢 ตัวเลข (Numbers):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 534 | `CancelledQuantity` | `0` | Hardcode |
| 537 | `OrderLineTotalCharges` | `0` | Hardcode |
| 538 | `FulfilledQuantity` | `0` | Hardcode |
| 552 | `TotalCharges` | `0` | Hardcode |
| 564 | `OrderLineTotalDiscounts` | `0` | Hardcode |
| 604 | `LineShortCount` | `0` | Hardcode |
| 627 | `TotalDiscounts` | `0` | Hardcode |

### **📝 ข้อความ (Strings):**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 544 | `MaxFulfillmentStatusId` | `'3000'` | Hardcode |
| 558 | `DeliveryMethodId` | `'ShipToAddress'` | Hardcode |
| 618 | `UOM` | `'SPAC'` | fallback |

### **❌ Null Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 535 | `ServiceLevelCode` | `null` | Hardcode |
| 536 | `LineTypeId` | `null` | Hardcode |
| 542 | `RefundPrice` | `null` | Hardcode |
| 543 | `TaxOverrideValue` | `null` | Hardcode |
| 546 | `ItemWebURL` | `null` | Hardcode |

### **❌ False Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 541 | `IsHazmat` | `false` | Hardcode |
| 545 | `IsOnHold` | `false` | Hardcode |
| 550 | `IsGift` | `false` | Hardcode |
| 560 | `IsCancelled` | `false` | Hardcode |
| 563 | `IsPreOrder` | `false` | Hardcode |
| 569 | `IsPerishable` | `false` | Hardcode |
| 575 | `IsPreSale` | `false` | Hardcode |
| 588 | `IsReturn` | `false` | Hardcode |
| 589 | `IsTaxOverridden` | `false` | Hardcode |
| 594 | `IsPriceOverrIdden` | `false` | Hardcode |
| 609 | `IsItemNotOnFile` | `false` | Hardcode |
| 610 | `IsGiftCard` | `false` | Hardcode |
| 611 | `IsPackAndHold` | `false` | Hardcode |

### **✅ True Values:**
| Line | Field | Value | Comment |
|------|-------|-------|---------|
| 539 | `IsReturnable` | `true` | Hardcode |
| 540 | `IsTaxIncluded` | `true` | Hardcode |
| 549 | `IsDiscountable` | `true` | Hardcode |
| 593 | `CanShipToAddress` | `true` | Hardcode |

---

## 📊 **สรุปสถิติ:**

### **🔢 จำนวน Hardcode Values:**
- **ตัวเลข:** 30+ values
- **ข้อความ:** 25+ values
- **Null:** 60+ values
- **False:** 25+ values
- **True:** 5+ values
- **รวม:** 150+ hardcode values

### **🎯 Priority Levels:**

#### **🔴 High Priority (ควรแก้ไขทันที):**
1. **Financial Values** - `0` ใช้ 30+ ครั้ง
2. **Organization IDs** - `'CFR128'`, `'CFR'`, `'CFM-UAT'`
3. **Address Values** - `'99999'`, `'TH'`, `'-'`, `'0101010122'`
4. **Contact Values** - `'undefined'`, `'Grab Customer'`, `'-'`

#### **🟡 Medium Priority (ควรแก้ไข):**
1. **Status Values** - `'STD'`, `'3000'`, `'5000.000'`
2. **Shipping Values** - `'Delivery'`, `'ShipToAddress'`, `'InStore_STD'`
3. **User Values** - `'pubsubuser@pmp'`, `'system'`

#### **🟢 Low Priority (อาจคงไว้):**
1. **System Defaults** - fallback values
2. **Null Values** - optional fields
3. **False Values** - boolean defaults

---

## 💡 **ข้อเสนอแนะการแก้ไข:**

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
