{
  "BU" : "CFR",
  "CapturedDate" : "2025-08-05T12:13:12Z",
  "CurrencyCode" : "THB",
  "CustomerId" : null,
  "CustomerEmail" : "undefined",
  "DoNotReleaseBefore" : "",
  "CustomerFirstName" : "Grab Customer",
  "CustomerLastName" : "-",
  "CustomerPhone" : "0101010122",
  "CustomerTypeId" : "",
  "DocType" : {
    "DocTypeId" : "CustomerOrder"
  },
  "IsOnHold" : false,
  "OrderLocale" : "th",
  "OrderHold" : [
    {
      "HoldTypeId" : "AwaitingPayment",
      "StatusId" : "2000",
      "ResolveReasonId" : "AcceptPayment"
    }
  ],
  "CancelAllowed" : true,
  "OrderActions" : {
    "IsAlreadyPriced" : true,
    "IsAlreadyCharged" : true,
    "IsAlreadyTaxed" : true
  },
  "OrderExtension1" : {
    "Extended" : {
      "FullTaxInvoice" : false,
      "AllowSubstitution" : true,
      "CancelAllowed" : true,
      "TaxId" : "",
      "CompanyName" : "",
      "BranchNo" : "",
      "ConfirmPaymentId" : "Cash On Delivery",
      "IsPSConfirmed" : true,
      "ExternalMPSellerId" : null
    }
  },
  "OrderChargeDetail" : [
    {
      "ChargeDisplayName" : "Free",
      "ChargeReferenceId" : "",
      "ChargeDetailId" : "403521240-C7LDVZNUTGAHMA",
      "ChargeTotal" : 16,
      "ChargeType" : {
        "ChargeTypeId" : "Shipping"
      },
      "IsTaxIncluded" : true,
      "IsPostReturn" : true,
      "IsInformational" : true
    },
    {
      "ChargeDisplayName" : "Discount Promotion",
      "ChargeDetailId" : "403521240-C7LDVZNUTGAHMA-Discount",
      "ChargeTotal" : "0.00",
      "ChargeType" : {
        "ChargeTypeId" : "Discount"
      },
      "IsTaxIncluded" : true,
      "IsPostReturn" : true,
      "IsInformational" : true
    },
    {
      "ChargeDisplayName" : "Shipping Fee Discount",
      "ChargeDetailId" : "403521240-C7LDVZNUTGAHMA-ShippingFeeDiscount",
      "ChargeTotal" : "0.00",
      "ChargeType" : {
        "ChargeTypeId" : "Shipping"
      },
      "IsTaxIncluded" : true,
      "IsPostReturn" : true,
      "IsInformational" : true
    }
  ],
  "OrderTaxDetail" : [
    {
      "IsInformational" : true,
      "TaxAmount" : 1.04,
      "TaxCode" : "SHIPPING",
      "TaxRate" : 0.07,
      "TaxTypeId" : "VAT",
      "TaxableAmount" : 14.95
    }
  ],
  "OrderType" : {
    "OrderTypeId" : "MKP-HD-STD"
  },
  "OrderNote" : [
    {
      "NoteType" : {
        "NoteTypeId" : "0004"
      },
      "NoteCategory" : {
        "NoteCategoryId" : "CustomerCommunication"
      },
      "NoteText" : "GM-202"
    }
  ],
  "SellingChannel" : {
    "SellingChannelId" : "Grab"
  },
  "OrderLine" : [
    {
      "DeliveryMethod" : {
        "DeliveryMethodId" : "ShipToAddress"
      },
      "IsGift" : false,
      "IsTaxIncluded" : true,
      "ItemId" : "8853474090594",
      "OrderLineId" : "000-0-0",
      "OrderLineNote" : [
        {
          "NoteId" : "R02_403521240-C7LDVZNUTGAHMA",
          "NoteType" : {
            "NoteTypeId" : "0006"
          },
          "NoteCategory" : {
            "NoteCategoryId" : "CustomerCommunication"
          },
          "NoteText" : ""
        }
      ],
      "OrderLineChargeDetail" : [ ],
      "OrderLineTaxDetail" : [
        {
          "IsInformational" : true,
          "TaxAmount" : 2.55,
          "TaxCode" : null,
          "TaxRate" : 0.07,
          "TaxTypeId" : "VAT",
          "TaxableAmount" : 36.44
        }
      ],
      "OrderLinePromisingInfo" : {
        "ShipFromLocationId" : "CFR528",
        "IsForceAllocate" : true
      },
      "PromisedDeliveryDate" : "",
      "UOM" : "SBTL",
      "Quantity" : 12,
      "UnitPrice" : 3.25,
      "OriginalUnitPrice" : 3.25,
      "ShippingMethodId" : "Standard Delivery",
      "ShipToAddress" : {
        "Address" : {
          "Address1" : "Grab Address1",
          "Address2" : "Grab Address2",
          "Address3" : "",
          "City" : "-",
          "County" : "-",
          "Email" : "undefined",
          "Country" : "TH",
          "FirstName" : "Grab Customer",
          "LastName" : "-",
          "Phone" : "0101010122",
          "PostalCode" : "99999",
          "State" : "-",
          "BranchNo" : "",
          "TaxId" : "",
          "CompanyName" : "Grab Customer"
        },
        "Extended" : {
          "AddressRef" : "|||4016|TH"
        },
        "IsAddressVerified" : true
      },
      "OrderLineExtension1" : {
        "Extended" : {
          "IsBundle" : true,
          "IsSubstitution" : false,
          "IsGiftWrapping" : false,
          "IsGWP" : false,
          "PackItemDescriptionTH" : "ยินดีน้ำดื่ม 600มลX12 Yindee Drinking Water 600 X12",
          "PackUnitPrice" : 39,
          "PackOrderedQty" : 12,
          "NumberOfPack" : 1,
          "ProductNameTH" : "ยินดีน้ำดื่ม 600มล Yindee Drinking Water 600ml",
          "ProductNameEN" : "ยินดีน้ำดื่ม 600มล Yindee Drinking Water 600ml",
          "BundleRefId" : "8853474090600",
          "SlotBookingId" : "403521240-C7LDVZNUTGAHMA",
          "SlotBookingFrom" : "2025-08-05T19:43:12.000Z",
          "SlotBookingTo" : "2025-08-05T20:43:12.000Z",
          "IsWeightItem" : false,
          "PromotionType" : "",
          "PromotionId" : ""
        }
      },
      "ReleaseGroupId" : "3-CZDEEY5AAA2BNT"
    },
    {
      "DeliveryMethod" : {
        "DeliveryMethodId" : "ShipToAddress"
      },
      "IsGift" : false,
      "IsTaxIncluded" : true,
      "ItemId" : "8853474091232",
      "OrderLineId" : "001-1-1",
      "OrderLineNote" : [
        {
          "NoteId" : "R03_403521240-C7LDVZNUTGAHMA",
          "NoteType" : {
            "NoteTypeId" : "0006"
          },
          "NoteCategory" : {
            "NoteCategoryId" : "CustomerCommunication"
          },
          "NoteText" : ""
        }
      ],
      "OrderLineChargeDetail" : [ ],
      "OrderLineTaxDetail" : [
        {
          "IsInformational" : true,
          "TaxAmount" : 3.85,
          "TaxCode" : null,
          "TaxRate" : 0.07,
          "TaxTypeId" : "VAT",
          "TaxableAmount" : 55.14
        }
      ],
      "OrderLinePromisingInfo" : {
        "ShipFromLocationId" : "CFR528",
        "IsForceAllocate" : true
      },
      "PromisedDeliveryDate" : "",
      "UOM" : "SBTL",
      "Quantity" : 12,
      "UnitPrice" : 4.91,
      "OriginalUnitPrice" : 4.91,
      "ShippingMethodId" : "Standard Delivery",
      "ShipToAddress" : {
        "Address" : {
          "Address1" : "Grab Address1",
          "Address2" : "Grab Address2",
          "Address3" : "",
          "City" : "-",
          "County" : "-",
          "Email" : "undefined",
          "Country" : "TH",
          "FirstName" : "Grab Customer",
          "LastName" : "-",
          "Phone" : "0101010122",
          "PostalCode" : "99999",
          "State" : "-",
          "BranchNo" : "",
          "TaxId" : "",
          "CompanyName" : "Grab Customer"
        },
        "Extended" : {
          "AddressRef" : "|||4016|TH"
        },
        "IsAddressVerified" : true
      },
      "OrderLineExtension1" : {
        "Extended" : {
          "IsBundle" : true,
          "IsSubstitution" : false,
          "IsGiftWrapping" : false,
          "IsGWP" : false,
          "PackItemDescriptionTH" : "มอนเต้น้ำแร่ 600มล X12 Monte Mineral Water 600ml X12",
          "PackUnitPrice" : 59,
          "PackOrderedQty" : 12,
          "NumberOfPack" : 1,
          "ProductNameTH" : "มอนเต้น้ำแร่ธรรมชาติ 600มล Monte Mineral Water 600ml",
          "ProductNameEN" : "มอนเต้น้ำแร่ธรรมชาติ 600มล Monte Mineral Water 600ml",
          "BundleRefId" : "8853474091249",
          "SlotBookingId" : "403521240-C7LDVZNUTGAHMA",
          "SlotBookingFrom" : "2025-08-05T19:43:12.000Z",
          "SlotBookingTo" : "2025-08-05T20:43:12.000Z",
          "IsWeightItem" : false,
          "PromotionType" : "",
          "PromotionId" : ""
        }
      },
      "ReleaseGroupId" : "3-CZDEEY5AAA2BNT"
    },
    {
      "DeliveryMethod" : {
        "DeliveryMethodId" : "ShipToAddress"
      },
      "IsGift" : false,
      "IsTaxIncluded" : true,
      "ItemId" : "8853474091256",
      "OrderLineId" : "002-2-2",
      "OrderLineNote" : [
        {
          "NoteId" : "R04_403521240-C7LDVZNUTGAHMA",
          "NoteType" : {
            "NoteTypeId" : "0006"
          },
          "NoteCategory" : {
            "NoteCategoryId" : "CustomerCommunication"
          },
          "NoteText" : ""
        }
      ],
      "OrderLineChargeDetail" : [ ],
      "OrderLineTaxDetail" : [
        {
          "IsInformational" : true,
          "TaxAmount" : 3.85,
          "TaxCode" : null,
          "TaxRate" : 0.07,
          "TaxTypeId" : "VAT",
          "TaxableAmount" : 55.14
        }
      ],
      "OrderLinePromisingInfo" : {
        "ShipFromLocationId" : "CFR528",
        "IsForceAllocate" : true
      },
      "PromisedDeliveryDate" : "",
      "UOM" : "SBTL",
      "Quantity" : 6,
      "UnitPrice" : 9.83,
      "OriginalUnitPrice" : 9.83,
      "ShippingMethodId" : "Standard Delivery",
      "ShipToAddress" : {
        "Address" : {
          "Address1" : "Grab Address1",
          "Address2" : "Grab Address2",
          "Address3" : "",
          "City" : "-",
          "County" : "-",
          "Email" : "undefined",
          "Country" : "TH",
          "FirstName" : "Grab Customer",
          "LastName" : "-",
          "Phone" : "0101010122",
          "PostalCode" : "99999",
          "State" : "-",
          "BranchNo" : "",
          "TaxId" : "",
          "CompanyName" : "Grab Customer"
        },
        "Extended" : {
          "AddressRef" : "|||4016|TH"
        },
        "IsAddressVerified" : true
      },
      "OrderLineExtension1" : {
        "Extended" : {
          "IsBundle" : true,
          "IsSubstitution" : false,
          "IsGiftWrapping" : false,
          "IsGWP" : false,
          "PackItemDescriptionTH" : "มอนเต้น้ำแร่ 1500มลX6 Monte Mineral Water1500mlX6",
          "PackUnitPrice" : 59,
          "PackOrderedQty" : 6,
          "NumberOfPack" : 1,
          "ProductNameTH" : "มอนเต้น้ำแร่ 1500 มล. Monte Mineral Water 1500ml",
          "ProductNameEN" : "มอนเต้น้ำแร่ 1500 มล. Monte Mineral Water 1500ml",
          "BundleRefId" : "8853474091263",
          "SlotBookingId" : "403521240-C7LDVZNUTGAHMA",
          "SlotBookingFrom" : "2025-08-05T19:43:12.000Z",
          "SlotBookingTo" : "2025-08-05T20:43:12.000Z",
          "IsWeightItem" : false,
          "PromotionType" : "",
          "PromotionId" : ""
        }
      },
      "ReleaseGroupId" : "3-CZDEEY5AAA2BNT"
    }
  ],
  "Payment" : [
    {
      "PaymentMethod" : [
        {
          "PaymentMethodId" : "fcf8e04e-f409-408d-b103-233af73af95e",
          "Amount" : 157,
          "CurrencyCode" : "THB",
          "GatewayId" : "Simulator",
          "PaymentType" : {
            "PaymentTypeId" : "Cash On Delivery"
          },
          "CurrentSettledAmount" : 157,
          "IsCopied" : false,
          "IsModifiable" : false,
          "IsSuspended" : false,
          "IsVoided" : false,
          "BillingAddress" : {
            "Address" : {
              "Address1" : "Grab Address1",
              "Address2" : "Grab Address2",
              "Address3" : "",
              "City" : "-",
              "County" : "-",
              "Email" : "undefined",
              "Country" : "TH",
              "FirstName" : "Grab Customer",
              "LastName" : "-",
              "Phone" : "0101010122",
              "PostalCode" : "99999",
              "State" : "-",
              "BranchNo" : "",
              "TaxId" : "",
              "CompanyName" : "Grab Customer"
            },
            "Extended" : {
              "AddressRef" : "|||4016|TH"
            }
          },
          "PaymentTransaction" : [
            {
              "PaymentTransactionId" : "fcf8e04e-f409-408d-b103-233af73af95e",
              "IsActivation" : false,
              "IsActive" : true,
              "IsCopied" : false,
              "IsValidForRefund" : true,
              "OrderId" : "403521240-C7LDVZNUTGAHMA",
              "ReconciliationId" : "403521240-C7LDVZNUTGAHMA",
              "RequestId" : "403521240-C7LDVZNUTGAHMA",
              "RequestToken" : "403521240-C7LDVZNUTGAHMA",
              "ProcessedAmount" : 157,
              "TransactionDate" : "2025-08-05T12:13:12Z",
              "PaymentResponseStatus" : {
                "PaymentResponseStatusId" : "Success"
              },
              "Status" : {
                "PaymentTransactionStatusId" : "Closed"
              },
              "TransmissionStatus" : {
                "PaymentTransmissionStatusId" : "Closed"
              },
              "RequestedAmount" : 157,
              "TransactionType" : {
                "PaymentTransactionTypeId" : "Settlement"
              }
            }
          ]
        }
      ],
      "ProcessingMode" : {
        "ProcessingModeId" : "ExternalProcessing"
      }
    }
  ],
  "OrderId" : "403521240-C7LDVZNUTGAHMA",
  "AlternateOrderId" : "403521240-C7LDVZNUTGAHMA",
  "OrgId" : "CFR"
}