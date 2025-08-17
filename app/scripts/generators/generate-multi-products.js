const { Test } = require('@nestjs/testing');
const { CommonModule } = require('./dist/src/common/common.module.js');
const { ReleaseOrderTransformationService } = require('./dist/src/common/services/release-order-transformation.service.js');
const fs = require('fs');
const path = require('path');

// Multi-product Thai order
const multiProductOrder = {
  "OrderId": "MULTI001",
  "OrgId": "SampleOrg",
  "CustomerEmail": "customer@example.com",
  "CustomerPhone": "0812345678",
  "CustomerFirstName": "Somchai",
  "CustomerLastName": "Jaidee",
  "CustomerTypeId": "Customer",
  "CustomerId": "THAI123",
  "CurrencyCode": "THB",
  "IsOnHold": false,
  "CancelAllowed": true,
  "CapturedDate": "2025-08-16T14:15:00.000Z",
  "AlternateOrderId": "MULTI001-TH",
  "OrderLocale": "th-TH",
  "OrderLine": [
    {
      "OrderLineId": "LINE001",
      "ItemId": "PHONE123",
      "Quantity": 1,
      "UnitPrice": 25000.0,
      "OriginalUnitPrice": 25000.0,
      "IsTaxIncluded": true,
      "IsGift": false,
      "UOM": "EACH",
      "PromisedDeliveryDate": "2025-08-17T14:15:00.000Z",
      "ShippingMethodId": "EXPRESS",
      "ReleaseGroupId": "GROUP1",
      "DeliveryMethod": {
        "DeliveryMethodId": "HOME_DELIVERY"
      },
      "ShipToAddress": {
        "IsAddressVerified": true,
        "Extended": {
          "AddressRef": "TH_ADDR_001"
        },
        "Address": {
          "FirstName": "Somchai",
          "LastName": "Jaidee",
          "Address1": "123 ถนนสุขุมวิท",
          "Address2": "แขวงคลองเตย",
          "Address3": "",
          "City": "กรุงเทพฯ",
          "County": "คลองเตย",
          "State": "กรุงเทพฯ",
          "Country": "TH",
          "PostalCode": "10110",
          "Phone": "0812345678",
          "Email": "customer@example.com"
        }
      },
      "OrderLineExtension1": {
        "Extended": {
          "ProductNameTH": "สมาร์ทโฟน รุ่นใหม่",
          "ProductNameEN": "Smartphone Latest Model",
          "IsBundle": false,
          "IsSubstitution": false,
          "IsGiftWrapping": false,
          "IsGWP": false,
          "NumberOfPack": 1,
          "PackUnitPrice": 25000.0,
          "PackOrderedQty": 1,
          "BundleRefId": null,
          "IsWeightItem": false,
          "PromotionType": "",
          "PromotionId": ""
        }
      },
      "OrderLinePromisingInfo": {
        "ShipFromLocationId": "WAREHOUSE_TH",
        "IsForceAllocate": false
      }
    },
    {
      "OrderLineId": "LINE002",
      "ItemId": "LAPTOP456",
      "Quantity": 1,
      "UnitPrice": 45000.0,
      "OriginalUnitPrice": 50000.0,
      "IsTaxIncluded": true,
      "IsGift": false,
      "UOM": "EACH",
      "PromisedDeliveryDate": "2025-08-17T14:15:00.000Z",
      "ShippingMethodId": "EXPRESS",
      "ReleaseGroupId": "GROUP1",
      "DeliveryMethod": {
        "DeliveryMethodId": "HOME_DELIVERY"
      },
      "ShipToAddress": {
        "IsAddressVerified": true,
        "Extended": {
          "AddressRef": "TH_ADDR_001"
        },
        "Address": {
          "FirstName": "Somchai",
          "LastName": "Jaidee",
          "Address1": "123 ถนนสุขุมวิท",
          "Address2": "แขวงคลองเตย",
          "Address3": "",
          "City": "กรุงเทพฯ",
          "County": "คลองเตย",
          "State": "กรุงเทพฯ",
          "Country": "TH",
          "PostalCode": "10110",
          "Phone": "0812345678",
          "Email": "customer@example.com"
        }
      },
      "OrderLineExtension1": {
        "Extended": {
          "ProductNameTH": "แล็ปท็อป คอมพิวเตอร์",
          "ProductNameEN": "Laptop Computer",
          "IsBundle": false,
          "IsSubstitution": false,
          "IsGiftWrapping": false,
          "IsGWP": false,
          "NumberOfPack": 1,
          "PackUnitPrice": 45000.0,
          "PackOrderedQty": 1,
          "BundleRefId": null,
          "IsWeightItem": false,
          "PromotionType": "DISCOUNT",
          "PromotionId": "SAVE5K"
        }
      },
      "OrderLinePromisingInfo": {
        "ShipFromLocationId": "WAREHOUSE_TH",
        "IsForceAllocate": false
      }
    }
  ],
  "Payment": [
    {
      "PaymentMethod": [
        {
          "PaymentType": "CreditCard",
          "PaymentMethodId": "THAI_CC",
          "CurrencyCode": "THB",
          "TotalAmount": 70000.0,
          "BillingAddress": {
            "Address": {
              "FirstName": "Somchai",
              "LastName": "Jaidee",
              "Address1": "123 ถนนสุขุมวิท",
              "City": "กรุงเทพฯ",
              "State": "กรุงเทพฯ",
              "Country": "TH",
              "PostalCode": "10110",
              "Phone": "0812345678",
              "Email": "customer@example.com"
            }
          }
        }
      ]
    }
  ]
};

async function generateMultiProductResult() {
  try {
    console.log('🚀 Generating Multi-Product Thai Order Result');
    console.log('============================================');
    
    console.log('📥 Input loaded:', {
      OrderId: multiProductOrder.OrderId,
      Lines: multiProductOrder.OrderLine.length,
      Currency: multiProductOrder.CurrencyCode,
      Customer: `${multiProductOrder.CustomerFirstName} ${multiProductOrder.CustomerLastName}`,
      Products: multiProductOrder.OrderLine.map(line => line.OrderLineExtension1.Extended.ProductNameEN)
    });
    
    // Create testing module and get service
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();
    
    const service = moduleRef.get(ReleaseOrderTransformationService);
    console.log('✅ Service loaded successfully');
    
    // Transform the order
    console.log('🔄 Running transformation...');
    const result = service.transform(multiProductOrder);
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', 'release');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save the result as JSON
    const outputPath = path.join(outputDir, `orderid${result.OriginalPayload.OrderId}_multi_thai.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    
    console.log('✅ Transformation completed successfully!');
    console.log('📤 Output saved to:', outputPath);
    console.log('');
    console.log('📊 Result Summary:');
    console.log('  - Order ID:', result.OriginalPayload.OrderId);
    console.log('  - Release ID:', result.OriginalPayload.ReleaseId);
    console.log('  - Order Lines:', result.OriginalPayload.ReleaseLine.length);
    console.log('  - Payment Methods:', result.OriginalPayload.Order.Payment.length);
    console.log('  - Order Total:', result.OriginalPayload.ReleaseTotal);
    console.log('  - Currency:', result.OriginalPayload.CurrencyCode);
    console.log('  - Products:', result.OriginalPayload.ReleaseLine.map(line => line.ReleaseLineExtension1.Extended.ProductNameEN));
    
    await moduleRef.close();
    
    return outputPath;
    
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    console.error('Stack trace:');
    console.error(error.stack);
    process.exit(1);
  }
}

generateMultiProductResult();