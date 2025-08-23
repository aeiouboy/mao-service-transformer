### Omnia-DEV Order 123456789-C7L2LCDCTCC2AE Field Summary

- ขอบเขตข้อมูล: รวมทั้งคอลัมน์ปกติและคอลัมน์ JSONB จากสคีมา `order` ครอบคลุม: `orders`, `releases`, `release_lines`, `order_lines`, `payments`, `payment_methods`, `payment_transactions`, `allocations`, `quantity_details`, `fulfillment_details`.

## orders
- ฟิลด์หลัก
  - **order_id**: 123456789-C7L2LCDCTCC2AE
  - **selling_channel**: Grab
  - **org_id**: CFM-UAT
  - **order_sub_total**: 127.96
  - **order_total**: 128.61
  - **total_charges**: 0
  - **total_discounts**: 0
  - **total_taxes**: 0.65
  - **payment_status**: Awaiting Payment Info
  - **created_at / updated_at**: 2025-08-22 08:25:22+00 / 2025-08-22 09:02:56+00
- JSONB
  - **doc_type**: { DocTypeId: "CustomerOrder" }
  - **order_hold**: [ { StatusId: "2000", HoldTypeId: "AwaitingPayment", ResolveReasonId: "AcceptPayment" } ]
  - **order_actions**: { IsAlreadyTaxed: true, IsAlreadyPriced: true, IsAlreadyCharged: true }
  - **order_extension1**: { Extended: { TaxId: "", BranchNo: "", CompanyName: "", CancelAllowed: true, IsPSConfirmed: true, FullTaxInvoice: false, ConfirmPaymentId: "Cash On Delivery", AllowSubstitution: true, ExternalMPSellerId: null } }
  - **order_charge_detail**: [
    { ChargeType.ChargeTypeId: "Shipping", ChargeTotal: 10, IsTaxIncluded: true, IsInformational: true, ChargeDetailId: "123456789-C7L2LCDCTCC2AE", ChargeDisplayName: "Free", ChargeReferenceId: "" },
    { ChargeType.ChargeTypeId: "Discount", ChargeTotal: -10, IsTaxIncluded: true, IsInformational: true, ChargeDetailId: "123456789-C7L2LCDCTCC2AE-Discount", ChargeDisplayName: "Discount Promotion" },
    { ChargeType.ChargeTypeId: "Shipping", ChargeTotal: 0, IsTaxIncluded: true, IsInformational: true, ChargeDetailId: "123456789-C7L2LCDCTCC2AE-ShippingFeeDiscount", ChargeDisplayName: "Shipping Fee Discount" }
  ]
  - **order_tax_detail**: [ { TaxCode: "SHIPPING", TaxTypeId: "VAT", TaxRate: 0.07, TaxAmount: 0.65, TaxableAmount: 9.34, IsInformational: true } ]
  - **order_type**: { OrderTypeId: "MKP-HD-STD" }
  - **order_note**: [ { NoteText: "GF-8718", NoteType.NoteTypeId: "0004", NoteCategory.NoteCategoryId: "CustomerCommunication" } ]
  - **cancel_reason**: null
  - **change_log**: null

## releases
- ฟิลด์หลัก (1 แถว)
  - **release_id**: REL_96fd0ab0-77cf-4462-a477-451bc29e89ed
  - **order_id**: 123456789-C7L2LCDCTCC2AE
  - **ship_from_location_id**: CFM6470
  - **delivery_method_id**: ShipToAddress
  - **service_level_code**: (ว่าง)
  - **created_at**: 2025-08-22 08:25:22+00
- JSONB
  - **release_extension_1**: null

## release_lines
- ฟิลด์หลัก (3 แถว)
  - release_line_id, release_id, order_line_id
  - **item_id**: 0000093362986, 4901133618567, 8850124003850
  - **quantity**: 1, 1, 12
  - **uom**: SPCS, SPCS, SBTL
  - **fulfilled_quantity**: 3, 1, 12
  - **cancelled_quantity**: (ว่าง)
  - **created_at**: 2025-08-22 08:25:23+00

## order_lines
- ฟิลด์หลัก (3 แถว)
  - **order_line_id**: 000-0-0, 001-1-1, 002-2-2
  - **item_id**: 0000093362986, 4901133618567, 8850124003850
  - **unit_price**: 41.00, 17.00, 5.83
  - **quantity**: 1, 1, 12
  - **uom**: SPCS, SPCS, SBTL
  - **fulfillment_status**: Open
  - **created_at**: 2025-08-22 08:25:22+00
- JSONB ต่อรายการ
  - **delivery_method**: { DeliveryMethodId: "ShipToAddress" }
  - **ship_to_address**: { Address{ FirstName, LastName, Address1, Address2, Address3, City, State, PostalCode, County, Country, Phone, Email, TaxId, BranchNo, CompanyName }, Extended{ AddressRef }, IsAddressVerified }
  - **order_line_extension1**: { Extended{ IsBundle, BundleRefId?, IsGWP, IsWeightItem, NumberOfPack, PackUnitPrice?, ProductNameEN, ProductNameTH, PromotionId, PromotionType, SlotBookingId, SlotBookingFrom, SlotBookingTo, IsSubstitution, IsGiftWrapping, PackOrderedQty, PackItemDescriptionTH } }
  - **order_line_tax_detail**: [ { TaxTypeId, TaxRate, TaxAmount, TaxableAmount, IsInformational, TaxCode? } ]
  - **order_line_charge_detail**:
    - 000-0-0: 1 รายการ Discount (Product Discount Promotion) พร้อม Extended{ TaxRate, ChargeDesc, PlatformAbsorb ... }
    - 001-1-1: []
    - 002-2-2: []
  - **order_line_promising_info**: { IsForceAllocate: true, ShipFromLocationId: "CFM6470" }
  - **change_log**: null

## payments
- ฟิลด์หลัก (1 แถว)
  - **payment_id**: 7991a525-e6c8-4086-b739-73ca3bfca903
  - **status_id**: Not Applicable
  - **created_at**: 2025-08-22 08:25:22+00
- JSONB
  - **actions**: null
  - **processing_mode**: { ProcessingModeId: "ExternalProcessing" }

## payment_methods
- ฟิลด์หลัก (1 แถว)
  - **payment_method_id**: 7991a525-e6c8-4086-b739-73ca3bfca903
  - **order_id**: 123456789-C7L2LCDCTCC2AE
  - **currency_code**: THB
  - **amount / current_settled_amount**: 128.00 / 128.00
  - **created_at**: 2025-08-22 08:25:22+00
- JSONB
  - **actions**: null
  - **billing_address**: { Address{ ... }, Extended{ AddressRef } }
  - **payment_method_attribute**: null
  - **payment_method_encr_attribute**: null
  - **payment_type**: { PaymentTypeId: "Cash On Delivery" }
  - **card_type**: null
  - **extended**: { AddressRef: "|||4016|TH" }

## payment_transactions
- ฟิลด์หลัก (1 แถว)
  - **payment_transaction_id**: 7991a525-e6c8-4086-b739-73ca3bfca903
  - **processed_amount / requested_amount**: 128.00 / 128.00
  - **transaction_date**: 2025-08-22 08:21:02+00
  - **created_at**: 2025-08-22 08:25:22+00
- JSONB
  - **payment_response_status**: { PaymentResponseStatusId: "Success" }
  - **status**: { PaymentTransactionStatusId: "Closed" }
  - **transmission_status**: { PaymentTransmissionStatusId: "Closed" }
  - **transaction_type**: { PaymentTransactionTypeId: "Settlement" }

## allocations
- ฟิลด์หลัก (3 แถว)
  - allocation_id, order_line_id, item_id, uom, quantity, status_id, allocated_on, created_at
- JSONB
  - **extended**: null

## quantity_details
- ฟิลด์หลัก (12 แถว รวมสถานะหลายขั้น)
  - quantity_detail_id, order_line_id, item_id, uom, quantity, status_id, created_at
- JSONB
  - **change_log**: null หรือ {}

## fulfillment_details
- ฟิลด์หลัก (3 แถว)
  - **fulfillment_id**: WY20230729010
  - **event_type_id / status_id**: Ship / 7000
  - **order_line_id / release_id / release_line_id**: ครบสำหรับ 3 รายการ
  - **item_id / quantity / uom / created_at**
- JSONB
  - **fulfillment_info**: { PackageId, ShipmentId, CarrierCode, TrackingURL, FulfillmentId, TrackingNumber, ServiceLevelCode, FulfillmentDetailId }


