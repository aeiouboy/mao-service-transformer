const fs = require('fs');

// Create a simplified input without payments to isolate the issue
const simpleInput = {
  "OrderId": "403521240",
  "OrgId": "SampleOrg",
  "CustomerEmail": "test@example.com",
  "CustomerPhone": "1234567890",
  "CustomerFirstName": "John",
  "CustomerLastName": "Doe",
  "CustomerTypeId": "Customer",
  "CustomerId": "CUST123",
  "CurrencyCode": "USD",
  "IsOnHold": false,
  "CancelAllowed": true,
  "CapturedDate": "2025-08-05T12:38:12.000Z",
  "AlternateOrderId": "403521240-C7LDVZNUTGAHMA",
  "OrderLocale": "en-US",
  "OrderLine": [
    {
      "OrderLineId": "LINE001",
      "ItemId": "8853474090600",
      "Quantity": 1,
      "UnitPrice": 157.0,
      "OriginalUnitPrice": 157.0,
      "IsTaxIncluded": false,
      "IsGift": false,
      "UOM": "EACH",
      "PromisedDeliveryDate": "2025-08-06T12:38:12.000Z",
      "ShippingMethodId": "STD",
      "ReleaseGroupId": "GROUP1",
      "DeliveryMethod": {
        "DeliveryMethodId": "HOME_DELIVERY"
      },
      "ShipToAddress": {
        "IsAddressVerified": true,
        "Address": {
          "FirstName": "John",
          "LastName": "Doe",
          "Address1": "123 Main St",
          "Address2": "",
          "Address3": "",
          "City": "Anytown",
          "County": "AnyCounty",
          "State": "AnyState",
          "Country": "US",
          "PostalCode": "12345",
          "Phone": "1234567890",
          "Email": "test@example.com"
        }
      },
      "OrderLinePromisingInfo": {
        "ShipFromLocationId": "WAREHOUSE_001"
      }
    }
  ]
  // NOTE: NO Payment array - this should bypass payment transformation
};

console.log('Testing without payments...');
console.log('Input structure:', Object.keys(simpleInput));
console.log('Has Payment?', 'Payment' in simpleInput);

// Save to temp file for testing
fs.writeFileSync('./temp-simple-input.json', JSON.stringify(simpleInput, null, 2));
console.log('Simple input saved to temp-simple-input.json');

module.exports = simpleInput;