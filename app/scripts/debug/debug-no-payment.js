const { Test } = require('@nestjs/testing');
const { CommonModule } = require('./dist/src/common/common.module.js');
const { ReleaseOrderTransformationService } = require('./dist/src/common/services/release-order-transformation.service.js');

// Minimal test case with no payments
const noPaymentOrder = {
  "OrderId": "DEBUG001",
  "OrgId": "TestOrg",
  "CustomerEmail": "debug@example.com",
  "CustomerPhone": "1111111111",
  "CustomerFirstName": "Debug",
  "CustomerLastName": "User",
  "CustomerTypeId": "Customer",
  "CustomerId": "DEBUG001",
  "CurrencyCode": "USD",
  "IsOnHold": false,
  "CancelAllowed": true,
  "CapturedDate": "2025-08-16T10:00:00.000Z",
  "AlternateOrderId": "DEBUG001-TEST",
  "OrderLocale": "en-US",
  "OrderLine": [
    {
      "OrderLineId": "LINE001",
      "ItemId": "DEBUG123",
      "Quantity": 1,
      "UnitPrice": 10.0,
      "OriginalUnitPrice": 10.0,
      "IsTaxIncluded": false,
      "IsGift": false,
      "UOM": "EACH",
      "PromisedDeliveryDate": "2025-08-17T10:00:00.000Z",
      "ShippingMethodId": "STD",
      "ReleaseGroupId": "GROUP1",
      "DeliveryMethod": {
        "DeliveryMethodId": "HOME_DELIVERY"
      },
      "ShipToAddress": {
        "IsAddressVerified": true,
        "Address": {
          "FirstName": "Debug",
          "LastName": "User",
          "Address1": "123 Debug St",
          "Address2": "",
          "Address3": "",
          "City": "Test City",
          "County": "Test County",
          "State": "TS",
          "Country": "US",
          "PostalCode": "12345",
          "Phone": "1111111111",
          "Email": "debug@example.com"
        }
      },
      "OrderLineExtension1": {
        "Extended": {
          "ProductNameTH": "สินค้าทดสอบ",
          "ProductNameEN": "Test Product",
          "PackUnitPrice": 10.0,
          "PackOrderedQty": 1,
          "BundleRefId": null,
          "ImageUri": "https://example.com/test.jpg"
        }
      },
      "OrderLinePromisingInfo": {
        "ShipFromLocationId": "WAREHOUSE_TEST"
      }
    }
  ]
  // NO Payment field at all
};

async function debugNoPayment() {
  try {
    console.log('🐛 Debugging No-Payment Order Transformation');
    console.log('============================================');
    console.log('Input structure:', Object.keys(noPaymentOrder));
    console.log('Has Payment field?', 'Payment' in noPaymentOrder);
    console.log('OrderLine count:', noPaymentOrder.OrderLine.length);
    console.log('');
    
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();
    
    const service = moduleRef.get(ReleaseOrderTransformationService);
    console.log('✅ Service loaded');
    
    console.log('🚀 Testing transformation...');
    const result = service.transform(noPaymentOrder);
    
    console.log('✅ Success! Transformation completed');
    console.log('Result keys:', Object.keys(result));
    console.log('OriginalPayload keys:', Object.keys(result.OriginalPayload || {}));
    
    await moduleRef.close();
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    console.error('Stack trace:');
    console.error(error.stack);
    
    // More detailed error analysis
    if (error.message.includes('map')) {
      console.error('\n🔍 Analysis: The error involves a .map() call on undefined');
      console.error('This suggests an array is expected but undefined/null is received');
      console.error('Check for missing null/undefined checks in array processing');
    }
    
    process.exit(1);
  }
}

debugNoPayment();