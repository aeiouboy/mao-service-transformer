const fs = require('fs');
const path = require('path');

// Import the compiled transformation service
const { ReleaseOrderTransformationService } = require('../../app/dist/src/common/services/release-order-transformation.service.js');

// Test input data that should produce the expected sample_order.json output
const testInputData = {
  "OrderId": "403521240-C7LDVZNUTGAHMA",
  "OrgId": "CFR",
  "CustomerEmail": "undefined",
  "CustomerPhone": "0101010122",
  "CustomerFirstName": "Grab Customer",
  "CustomerLastName": "-",
  "CustomerTypeId": "Customer",
  "CustomerId": null,
  "CurrencyCode": "THB",
  "IsOnHold": false,
  "CancelAllowed": true,
  "CapturedDate": "2025-08-05T12:13:22.781Z",
  "AlternateOrderId": "403521240-C7LDVZNUTGAHMA",
  "OrderLocale": "th",
  "OrderLine": [
    {
      "OrderLineId": "000-0-0",
      "ItemId": "8853474090594",
      "Quantity": 12,
      "UnitPrice": 3.25,
      "OriginalUnitPrice": 3.25,
      "IsTaxIncluded": true,
      "IsGift": false,
      "UOM": "EACH",
      "PromisedDeliveryDate": null,
      "ShippingMethodId": "STD",
      "ReleaseGroupId": "3-CZDEEY5AAA2BNT",
      "DeliveryMethod": {
        "DeliveryMethodId": "HOME_DELIVERY"
      },
      "ShipToAddress": {
        "IsAddressVerified": true,
        "Address": {
          "FirstName": "Grab Customer",
          "LastName": "-",
          "Address1": "",
          "Address2": "",
          "Address3": null,
          "City": "",
          "County": "",
          "State": "",
          "Country": "TH",
          "PostalCode": "99999",
          "Phone": "0101010122",
          "Email": "undefined"
        }
      },
      "OrderLinePromisingInfo": {
        "ShipFromLocationId": "CFR528"
      },
      "OrderLineExtension1": {
        "Extended": {
          "IsBundle": true,
          "PackItemDescriptionTH": "ยินดีน้ำดื่ม 600มลX12 Yindee Drinking Water 600 X12",
          "PackUnitPrice": 157,
          "PackOrderedQty": 12,
          "NumberOfPack": 1,
          "ProductNameTH": "ยินดีน้ำดื่ม 600มล Yindee Drinking Water 600ml",
          "ProductNameEN": "Yindee Drinking Water 600ml",
          "BundleRefId": "8853474090600",
          "SlotBookingId": "403521240-C7LDVZNUTGAHMA",
          "SlotBookingFrom": "2025-08-05T19:43:12.000Z",
          "SlotBookingTo": "2025-08-05T20:43:12.000Z",
          "IsWeightItem": false,
          "PromotionType": "",
          "PromotionId": ""
        }
      },
      "OrderLineChargeDetail": [],
      "OrderLineTaxDetail": []
    }
  ],
  "Payment": [
    {
      "PaymentMethod": [
        {
          "PaymentMethodId": "fcf8e04e-f409-408d-b103-233af73af95e",
          "Amount": 157,
          "CurrentSettledAmount": 157,
          "CurrencyCode": "THB",
          "GatewayId": "Simulator",
          "IsSuspended": false,
          "IsModifiable": false,
          "IsVoided": false,
          "IsCopied": false,
          "BillingAddress": {
            "Address": {
              "FirstName": "Grab Customer",
              "LastName": "-",
              "Address1": "",
              "Address2": "",
              "Address3": null,
              "City": "",
              "County": "",
              "State": "",
              "Country": "TH",
              "PostalCode": "99999",
              "Phone": "0101010122",
              "Email": "undefined"
            },
            "Extended": {
              "AddressRef": "|||4016|TH"
            }
          },
          "PaymentTransaction": [
            {
              "PaymentTransactionId": "fcf8e04e-f409-408d-b103-233af73af95e",
              "RequestedAmount": 157,
              "RequestId": "403521240-C7LDVZNUTGAHMA",
              "RequestToken": "403521240-C7LDVZNUTGAHMA",
              "TransactionDate": "2025-08-05T12:13:12Z",
              "ProcessedAmount": 157,
              "ReconciliationId": "403521240-C7LDVZNUTGAHMA",
              "IsValidForRefund": true,
              "IsActive": true,
              "IsCopied": false,
              "OrderId": "403521240-C7LDVZNUTGAHMA",
              "IsActivation": false,
              "TransactionType": {
                "PaymentTransactionTypeId": "Settlement"
              },
              "Status": {
                "PaymentTransactionStatusId": "Closed"
              },
              "PaymentResponseStatus": {
                "PaymentResponseStatusId": "Success"
              },
              "TransmissionStatus": {
                "PaymentTransmissionStatusId": "Closed"
              }
            }
          ],
          "PaymentType": {
            "PaymentTypeId": "Cash On Delivery"
          }
        }
      ]
    }
  ],
  "OrderNote": [
    {
      "NoteText": "GM-202",
      "NoteType": {
        "NoteTypeId": "0004"
      },
      "NoteCategory": {
        "NoteCategoryId": "CustomerCommunication"
      }
    }
  ],
  "OrderChargeDetail": [
    {
      "ChargeDetailId": "403521240-C7LDVZNUTGAHMA",
      "ChargeDisplayName": "Free",
      "ChargeTotal": 16,
      "IsInformational": true,
      "ChargeType": {
        "ChargeTypeId": "Shipping"
      }
    }
  ],
  "OrderTaxDetail": [],
  "DocType": {
    "DocTypeId": "CustomerOrder"
  },
  "OrderType": {
    "OrderTypeId": "STANDARD"
  },
  "SellingChannel": {
    "SellingChannelId": "Grab"
  },
  "OrderExtension1": {
    "Extended": {
      "FullTaxInvoice": false,
      "AllowSubstitution": true,
      "CancelAllowed": true,
      "TaxId": "",
      "CompanyName": "",
      "BranchNo": "",
      "ConfirmPaymentId": "Cash On Delivery",
      "IsPSConfirmed": true,
      "ExternalMPSellerId": null
    }
  }
};

// Expected financial values from sample_order.json
const expectedFinancialValues = {
  // Order level
  OrderSubtotal: 157,
  ReleaseTotal: 157,
  TotalCharges: 0,
  OrderTotalTaxes: 0,
  TotalTaxes: 0,
  OrderTotalDiscounts: -0.08,
  OrderTotalCharges: 0,
  
  // Payment
  PaymentAmount: 157,
  CurrentSettledAmount: 157,
  
  // Release Lines
  ReleaseLine: [
    {
      index: 0,
      OrderLineTotal: 157,
      ReleaseLineTotal: 157,
      TotalTaxes: 0,
      OrderLineTotalTaxes: 0,
      ChargeDetails: [
        { type: "Shipping", ChargeTotal: 0 },
        { type: "ShippingFeeDiscount", ChargeTotal: 0 }
      ],
      TaxDetail: {
        TaxableAmount: 0,
        TaxAmount: 0,
        TaxRate: 0
      }
    }
  ],
  
  // Header ChargeDetail
  HeaderChargeDetails: [
    { type: "Shipping", ChargeTotal: 0 },
    { type: "ShippingFeeDiscount", ChargeTotal: 0 },
    { type: "Discount", ChargeTotal: -0.08 }
  ]
};

async function runComprehensiveTest() {
  console.log('🧪 Running Comprehensive Financial Calculation Test...\n');
  
  try {
    // Create service instance and transform
    const service = new ReleaseOrderTransformationService();
    const result = service.transform(testInputData);
    
    console.log('✅ Transformation completed successfully!\n');
    
    // Test all financial calculations
    const testResults = {
      passed: 0,
      failed: 0,
      details: []
    };
    
    // Helper function to test values
    function testValue(description, actual, expected, tolerance = 0.01) {
      const passed = Math.abs(actual - expected) <= tolerance;
      testResults[passed ? 'passed' : 'failed']++;
      testResults.details.push({
        description,
        actual,
        expected,
        passed,
        difference: actual - expected
      });
      
      const status = passed ? '✅' : '❌';
      console.log(`${status} ${description}: ${actual} (expected: ${expected})`);
    }
    
    // Test Order Level Financial Values
    console.log('📊 Order Level Financial Values:');
    testValue('OrderSubtotal', result.OriginalPayload.OrderSubtotal, expectedFinancialValues.OrderSubtotal);
    testValue('ReleaseTotal', result.OriginalPayload.ReleaseTotal, expectedFinancialValues.ReleaseTotal);
    testValue('TotalCharges', result.OriginalPayload.TotalCharges, expectedFinancialValues.TotalCharges);
    testValue('OrderTotalTaxes', result.OriginalPayload.OrderTotalTaxes, expectedFinancialValues.OrderTotalTaxes);
    testValue('TotalTaxes', result.OriginalPayload.TotalTaxes, expectedFinancialValues.TotalTaxes);
    testValue('OrderTotalDiscounts', result.OriginalPayload.OrderTotalDiscounts, expectedFinancialValues.OrderTotalDiscounts);
    testValue('OrderTotalCharges', result.OriginalPayload.OrderTotalCharges, expectedFinancialValues.OrderTotalCharges);
    
    console.log('\n💳 Payment Values:');
    testValue('Payment Amount', result.OriginalPayload.Order.Payment[0].PaymentMethod[0].Amount, expectedFinancialValues.PaymentAmount);
    testValue('Current Settled Amount', result.OriginalPayload.Order.Payment[0].PaymentMethod[0].CurrentSettledAmount, expectedFinancialValues.CurrentSettledAmount);
    
    console.log('\n📦 Release Line Values:');
    const releaseLine = result.OriginalPayload.ReleaseLine[0];
    const expectedLine = expectedFinancialValues.ReleaseLine[0];
    
    testValue('OrderLineTotal', releaseLine.OrderLineTotal, expectedLine.OrderLineTotal);
    testValue('ReleaseLineTotal', releaseLine.ReleaseLineTotal, expectedLine.ReleaseLineTotal);
    testValue('TotalTaxes', releaseLine.TotalTaxes, expectedLine.TotalTaxes);
    testValue('OrderLineTotalTaxes', releaseLine.OrderLineTotalTaxes, expectedLine.OrderLineTotalTaxes);
    
    console.log('\n💰 Line Charge Details:');
    releaseLine.ChargeDetail.forEach((charge, index) => {
      if (expectedLine.ChargeDetails[index]) {
        testValue(`${expectedLine.ChargeDetails[index].type} ChargeTotal`, 
                  charge.ChargeTotal, expectedLine.ChargeDetails[index].ChargeTotal);
      }
    });
    
    console.log('\n🏷️ Tax Details:');
    const taxDetail = releaseLine.TaxDetail[0];
    testValue('TaxableAmount', taxDetail.TaxableAmount, expectedLine.TaxDetail.TaxableAmount);
    testValue('TaxAmount', taxDetail.TaxAmount, expectedLine.TaxDetail.TaxAmount);
    testValue('TaxRate', taxDetail.TaxRate, expectedLine.TaxDetail.TaxRate);
    
    console.log('\n📋 Header Charge Details:');
    result.OriginalPayload.ChargeDetail.forEach((charge, index) => {
      if (expectedFinancialValues.HeaderChargeDetails[index]) {
        testValue(`Header ${expectedFinancialValues.HeaderChargeDetails[index].type} ChargeTotal`, 
                  charge.ChargeTotal, expectedFinancialValues.HeaderChargeDetails[index].ChargeTotal);
      }
    });
    
    // Test calculation methods directly
    console.log('\n🧮 Direct Calculation Method Tests:');
    testValue('calculateOrderSubtotal', service.calculateOrderSubtotal(testInputData), expectedFinancialValues.OrderSubtotal);
    testValue('calculateShippingCharge', service.calculateShippingCharge(testInputData), expectedFinancialValues.TotalCharges);
    testValue('calculateOrderTotalTaxes', service.calculateOrderTotalTaxes(testInputData), expectedFinancialValues.OrderTotalTaxes);
    testValue('calculateOrderDiscounts', service.calculateOrderDiscounts(testInputData), expectedFinancialValues.OrderTotalDiscounts);
    
    // Test address hash generation
    console.log('\n🔐 Hash Generation Tests:');
    const addressHash = service.generateMD5Hash(testInputData.OrderLine[0].ShipToAddress.Address);
    const expectedHash = "6d89479d94844b20b56f12009c2ad7";
    const hashPassed = addressHash === expectedHash;
    testResults[hashPassed ? 'passed' : 'failed']++;
    console.log(`${hashPassed ? '✅' : '❌'} Address Hash: ${addressHash} (expected: ${expectedHash})`);
    
    // Summary
    console.log('\n📈 Test Summary:');
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`📊 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
    
    if (testResults.failed > 0) {
      console.log('\n🔍 Failed Tests Details:');
      testResults.details.filter(t => !t.passed).forEach(test => {
        console.log(`   ${test.description}: ${test.actual} vs ${test.expected} (diff: ${test.difference.toFixed(4)})`);
      });
    }
    
    // Save the actual result for comparison
    const outputPath = '/Users/chongraktanaka/Projects/mao-service-transformer/release/test-output.json';
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`\n💾 Actual result saved to: ${outputPath}`);
    
    // Test business rules
    console.log('\n🎯 Business Rules Validation:');
    const orderSubtotal = service.calculateOrderSubtotal(testInputData);
    const shippingCharge = service.calculateShippingCharge(testInputData);
    
    console.log(`   Order Subtotal: ${orderSubtotal}`);
    console.log(`   Free Shipping Threshold: 100`);
    console.log(`   Shipping Charge: ${shippingCharge}`);
    console.log(`   Rule Applied: ${orderSubtotal >= 100 ? 'Free shipping (≥100)' : '2.5% of subtotal'}`);
    
    return testResults.failed === 0;
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return false;
  }
}

// Run the comprehensive test
runComprehensiveTest()
  .then(success => {
    console.log(`\n${success ? '🎉 All tests passed!' : '⚠️  Some tests failed!'}`);
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
  });