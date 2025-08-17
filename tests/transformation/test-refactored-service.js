const fs = require('fs');
const path = require('path');

/**
 * Test script for refactored ReleaseOrderTransformationService with FileOutputService
 * Tests the new service architecture with proper dependency injection
 */

// Mock the NestJS DI system for testing
class MockDynamicIdGeneratorService {
  resetCounter() { }
  generateAllocationId() { return '1234567890'; }
  generateChargeDetailId() { return '9876543210'; }
  generateSpanId() { return 'span123'; }
  generateTraceId() { return 'trace456'; }
  generateMsgIdPK() { return 'msg789'; }
  generateNoteId() { return 'note123'; }
  generatePaymentId() { return 'payment123'; }
  generateSequenceNumber() { return 1; }
}

class MockCalculationService {
  calculateOrderSubtotal(input) {
    return input.OrderLine.reduce((sum, line) => {
      const packUnitPrice = line.OrderLineExtension1?.Extended?.PackUnitPrice;
      return sum + (packUnitPrice || line.UnitPrice || 0);
    }, 0);
  }
  
  calculateShippingCharge() { return 0; }
  calculateOrderTotalTaxes() { return 0; }
  calculateOrderDiscounts() { return 0; }
  calculateLineTotal(line) { return line.UnitPrice || 0; }
  calculateLineTaxDetails() { return { taxAmount: 0, taxRate: 0, taxableAmount: 0 }; }
  calculateLineShippingCharge() { return 0; }
  calculateLineDiscountCharge() { return 0; }
}

class MockBusinessRulesService {
  getShippingMethodMapping() {
    return {
      deliveryMethod: 'ShipToAddress',
      shippingMethodId: 'Standard Delivery'
    };
  }
}

class MockTimestampService {
  getAllStandardTimestamps() {
    const now = new Date().toISOString().replace('Z', '');
    return {
      order_created: now,
      order_captured: now,
      order_confirmed: now,
      release_created: now
    };
  }
  
  getTimestamp() {
    return new Date().toISOString().replace('Z', '');
  }
}

// Load the actual compiled services
const { ReleaseOrderTransformationService } = require('../../app/dist/src/common/services/release-order-transformation.service.js');
const { FileOutputService } = require('../../app/dist/src/common/services/shared/file-output.service.js');
const { OrderTransformationService } = require('../../app/dist/src/common/services/domain/order-transformation.service.js');
const { OrderTransformationOrchestratorService } = require('../../app/dist/src/common/services/orchestration/order-transformation-orchestrator.service.js');

// Additional mock services needed by orchestrator
const { OrderLineTransformationService } = require('../../app/dist/src/common/services/domain/order-line-transformation.service.js');
const { PaymentTransformationService } = require('../../app/dist/src/common/services/domain/payment-transformation.service.js');
const { PaymentMethodTransformationService } = require('../../app/dist/src/common/services/domain/payment-method-transformation.service.js');
const { PaymentTransactionTransformationService } = require('../../app/dist/src/common/services/domain/payment-transaction-transformation.service.js');
const { AllocationTransformationService } = require('../../app/dist/src/common/services/domain/allocation-transformation.service.js');
const { ReleaseTransformationService } = require('../../app/dist/src/common/services/domain/release-transformation.service.js');
const { ReleaseLineTransformationService } = require('../../app/dist/src/common/services/domain/release-line-transformation.service.js');

async function testRefactoredService() {
  try {
    console.log('🧪 Testing refactored ReleaseOrderTransformationService...');
    
    // Create mock services
    const idGenerator = new MockDynamicIdGeneratorService();
    const calculationService = new MockCalculationService();
    const businessRulesService = new MockBusinessRulesService();
    const timestampService = new MockTimestampService();
    const fileOutputService = new FileOutputService();
    
    // Create domain services in dependency order
    const paymentTransformationService = new PaymentTransformationService(idGenerator, timestampService);
    const orderTransformationService = new OrderTransformationService(idGenerator, businessRulesService, timestampService, paymentTransformationService);
    const orderLineTransformationService = new OrderLineTransformationService(idGenerator, businessRulesService, timestampService, calculationService);
    const paymentMethodTransformationService = new PaymentMethodTransformationService(idGenerator, timestampService);
    const paymentTransactionTransformationService = new PaymentTransactionTransformationService(idGenerator, timestampService);
    const allocationTransformationService = new AllocationTransformationService(idGenerator, timestampService);
    const releaseTransformationService = new ReleaseTransformationService(idGenerator, timestampService);
    const releaseLineTransformationService = new ReleaseLineTransformationService(idGenerator, businessRulesService, timestampService, calculationService);
    
    // Create orchestrator
    const orchestratorService = new OrderTransformationOrchestratorService(
      idGenerator,
      calculationService,
      timestampService,
      orderTransformationService,
      orderLineTransformationService,
      paymentTransformationService,
      paymentMethodTransformationService,
      paymentTransactionTransformationService,
      allocationTransformationService,
      releaseTransformationService,
      releaseLineTransformationService
    );
    
    // Create main service with all dependencies
    const mainService = new ReleaseOrderTransformationService(
      calculationService,
      orderTransformationService,
      orchestratorService,
      fileOutputService
    );
    
    // Test data
    const testInput = {
      "BU": "CFR",
      "CapturedDate": "2025-08-05T12:13:12Z",
      "CurrencyCode": "THB",
      "CustomerId": null,
      "CustomerEmail": "test@example.com",
      "CustomerFirstName": "Test Customer",
      "CustomerLastName": "Test",
      "CustomerPhone": "0101010122",
      "OrderId": "TEST-ORDER-123",
      "AlternateOrderId": "TEST-ALT-123",
      "OrgId": "CFR",
      "OrderLine": [
        {
          "ItemId": "TEST-ITEM-001",
          "Quantity": 1,
          "UnitPrice": 25.50,
          "UOM": "EACH",
          "OrderLineExtension1": {
            "Extended": {
              "PackUnitPrice": 25.50,
              "ProductNameEN": "Test Product"
            }
          },
          "ShipToAddress": {
            "Address": {
              "Address1": "123 Test Street",
              "City": "Test City",
              "PostalCode": "12345",
              "Country": "TH"
            }
          }
        }
      ]
    };
    
    console.log('🔄 Testing transformation...');
    const result = mainService.transform(testInput);
    console.log('✅ Transformation successful!');
    
    console.log('🔄 Testing saveTransformedOrder with new FileOutputService...');
    const outputPath = await mainService.saveTransformedOrder(testInput, '/Users/chongraktanaka/Projects/mao-service-transformer/release');
    console.log(`✅ File saved successfully to: ${outputPath}`);
    
    // Verify file exists and has content
    if (fs.existsSync(outputPath)) {
      const fileContent = fs.readFileSync(outputPath, 'utf-8');
      const parsedContent = JSON.parse(fileContent);
      
      console.log('📊 File verification:');
      console.log(`- File size: ${fileContent.length} characters`);
      console.log(`- Has OriginalPayload: ${!!parsedContent.OriginalPayload}`);
      console.log(`- OrderId: ${parsedContent.OriginalPayload?.OrderId}`);
      console.log(`- Release lines: ${parsedContent.OriginalPayload?.ReleaseLine?.length || 0}`);
      
      console.log('🎯 Refactored service test PASSED! ✅');
      return true;
    } else {
      throw new Error('Output file was not created');
    }
    
  } catch (error) {
    console.error('❌ Refactored service test FAILED:', error.message);
    return false;
  }
}

// Run the test
testRefactoredService().then(success => {
  if (success) {
    console.log('\n🎉 All refactored service tests completed successfully!');
  } else {
    console.log('\n⚠️ Some refactored service tests failed!');
    process.exit(1);
  }
}).catch(error => {
  console.error('\n💥 Test execution failed:', error);
  process.exit(1);
});