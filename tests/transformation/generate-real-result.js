#!/usr/bin/env node

/**
 * Generate Real Transformation Result
 * 
 * This script uses the actual NestJS transformation service to generate
 * the real release output from the comprehensive sample data.
 * 
 * Usage: node tests/transformation/generate-real-result.js
 */

const fs = require('fs');
const path = require('path');

// Import the actual transformation service
const { ReleaseOrderTransformationService } = require('../../app/dist/src/common/services/release-order-transformation.service.js');

// Mock all the required services for standalone testing
class CompleteMockServices {
  static createIdGenerator() {
    let counter = 0;
    return {
      resetCounter() { counter = 0; },
      generateAllocationId() { return `7543960${String(Math.floor(Math.random() * 100000000000)).padStart(11, '0')}`; },
      generateChargeDetailId() { return `754396${String(Date.now()).slice(-12)}`; },
      generateSpanId() { return `span-${Date.now()}`; },
      generateTraceId() { return `trace-${Date.now()}`; },
      generateMsgIdPK() { return `msg-${Date.now()}`; },
      generateNoteId() { return `note-${++counter}`; },
      generatePaymentId() { return `7543960027815601342`; }, // Use realistic payment ID format
      generateSequenceNumber() { return ++counter; },
      generateReleaseId() { return `release-${++counter}`; },
      generatePaymentMethodId() { return `7543960027815601${String(++counter).padStart(3, '0')}`; },
      generateTransactionId() { return `tx-${++counter}`; },
      generatePaymentTransactionId() { return `7543960027815601${String(++counter).padStart(3, '0')}`; },
      generateBillingAddressId() { return `addr-${++counter}`; },
      generateMessageId() { return `msg-${++counter}`; }
    };
  }

  static createCalculationService() {
    return {
      calculateOrderSubtotal(input) {
        return input.OrderLine.reduce((sum, line) => {
          const packUnitPrice = line.OrderLineExtension1?.Extended?.PackUnitPrice;
          return sum + (packUnitPrice || (line.UnitPrice * line.Quantity) || 0);
        }, 0);
      },
      calculateShippingCharge(input) {
        const subtotal = this.calculateOrderSubtotal(input);
        return subtotal > 100 ? 0 : Math.round(subtotal * 0.025 * 100) / 100;
      },
      calculateOrderTotalTaxes(input) {
        return input.OrderLine.reduce((sum, line) => {
          return sum + (line.OrderLineTaxDetail?.[0]?.TaxAmount || 0);
        }, 0) + (input.OrderTaxDetail?.[0]?.TaxAmount || 0);
      },
      calculateOrderDiscounts(input) {
        return input.OrderChargeDetail?.reduce((sum, charge) => {
          return charge.ChargeType?.ChargeTypeId === 'Discount' ? 
            sum + Math.abs(parseFloat(charge.ChargeTotal) || 0) : sum;
        }, 0) || 0;
      },
      calculateLineTotal(line) { 
        return (line.UnitPrice || 0) * (line.Quantity || 1); 
      },
      calculateLineTaxDetails(line) {
        const taxDetail = line.OrderLineTaxDetail?.[0];
        return {
          taxAmount: taxDetail?.TaxAmount || 0,
          taxRate: taxDetail?.TaxRate || 0,
          taxableAmount: taxDetail?.TaxableAmount || 0
        };
      },
      calculateLineShippingCharge() { return 0; },
      calculateLineDiscountCharge() { return 0; }
    };
  }

  static createBusinessRulesService() {
    return {
      getShippingMethodMapping(input) {
        return {
          deliveryMethod: input.OrderLine?.[0]?.DeliveryMethod?.DeliveryMethodId || 'ShipToAddress',
          shippingMethodId: input.OrderLine?.[0]?.ShippingMethodId || 'Standard Delivery'
        };
      }
    };
  }

  static createTimestampService() {
    const baseTimestamp = '2025-08-05T12:13:22.781';
    return {
      getAllStandardTimestamps() {
        return {
          order_created: baseTimestamp,
          order_captured: baseTimestamp,
          order_confirmed: baseTimestamp,
          release_created: baseTimestamp,
          msg_submission_time: baseTimestamp,
          msg_submission_time_utc: baseTimestamp
        };
      },
      getTimestamp(type) {
        const timestamps = {
          'order_line_charge_created': baseTimestamp,
          'processing_timestamp': baseTimestamp,
          'compliance_date': baseTimestamp,
          'earliest_delivery_date': baseTimestamp,
          'earliest_ship_date': baseTimestamp,
          'heuristic_delivery_date': baseTimestamp,
          'heuristic_ship_date': baseTimestamp,
          'msg_submission_time': baseTimestamp,
          'msg_submission_time_utc': baseTimestamp
        };
        return timestamps[type] || baseTimestamp;
      }
    };
  }

  static createFileOutputService() {
    return {
      async saveOrderToFile(transformedData, orderId, outputDir) {
        const targetOutputDir = outputDir || path.join(process.cwd(), 'release');
        
        if (!fs.existsSync(targetOutputDir)) {
          fs.mkdirSync(targetOutputDir, { recursive: true });
        }

        const fileName = `orderid${orderId}.json`;
        const filePath = path.join(targetOutputDir, fileName);

        const jsonContent = JSON.stringify(transformedData, null, 2);
        fs.writeFileSync(filePath, jsonContent, 'utf-8');

        return filePath;
      }
    };
  }
}

async function generateRealResult() {
  try {
    console.log('🎯 Generating REAL transformation result using full NestJS service...');
    console.log('📂 Loading real sample data...');
    
    // Load the actual sample data
    const sampleInputPath = path.join(__dirname, '../../data/samples/sample_input.json');
    const realInputData = JSON.parse(fs.readFileSync(sampleInputPath, 'utf-8'));
    
    console.log(`✅ Loaded sample data: OrderId ${realInputData.OrderId}`);
    console.log(`📦 Order lines: ${realInputData.OrderLine.length}`);
    console.log(`💳 Payment methods: ${realInputData.Payment?.[0]?.PaymentMethod?.length || 0}`);
    
    // Load all the compiled service classes
    console.log('🔧 Loading NestJS services...');
    
    const { OrderTransformationService } = require('../../app/dist/src/common/services/domain/order-transformation.service.js');
    const { OrderTransformationOrchestratorService } = require('../../app/dist/src/common/services/orchestration/order-transformation-orchestrator.service.js');
    const { OrderLineTransformationService } = require('../../app/dist/src/common/services/domain/order-line-transformation.service.js');
    const { PaymentTransformationService } = require('../../app/dist/src/common/services/domain/payment-transformation.service.js');
    const { PaymentMethodTransformationService } = require('../../app/dist/src/common/services/domain/payment-method-transformation.service.js');
    const { PaymentTransactionTransformationService } = require('../../app/dist/src/common/services/domain/payment-transaction-transformation.service.js');
    const { AllocationTransformationService } = require('../../app/dist/src/common/services/domain/allocation-transformation.service.js');
    const { ReleaseTransformationService } = require('../../app/dist/src/common/services/domain/release-transformation.service.js');
    const { ReleaseLineTransformationService } = require('../../app/dist/src/common/services/domain/release-line-transformation.service.js');
    
    // Create all mock services
    const idGenerator = CompleteMockServices.createIdGenerator();
    const calculationService = CompleteMockServices.createCalculationService();
    const businessRulesService = CompleteMockServices.createBusinessRulesService();
    const timestampService = CompleteMockServices.createTimestampService();
    const fileOutputService = CompleteMockServices.createFileOutputService();
    
    console.log('🏗️ Initializing transformation services...');
    
    // Create all domain services in proper dependency order
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
    
    // Create main transformation service
    const transformationService = new ReleaseOrderTransformationService(
      calculationService,
      orderTransformationService,
      orchestratorService,
      fileOutputService
    );
    
    console.log('⚡ Running complete transformation...');
    
    // Generate the real transformation
    const realResult = transformationService.transform(realInputData);
    
    console.log('✅ Transformation completed successfully!');
    
    // Save to the project release directory
    const outputPath = await transformationService.saveTransformedOrder(
      realInputData, 
      '/Users/chongraktanaka/Projects/mao-service-transformer/release'
    );
    
    console.log(`📁 Real result saved to: ${outputPath}`);
    
    // Show summary
    console.log('\n📊 REAL TRANSFORMATION SUMMARY:');
    console.log(`📋 OrderId: ${realResult.OriginalPayload?.OrderId}`);
    console.log(`🆔 ReleaseId: ${realResult.OriginalPayload?.ReleaseId}`);
    console.log(`💰 OrderSubtotal: ${realResult.OriginalPayload?.OrderSubtotal}`);
    console.log(`💰 ReleaseTotal: ${realResult.OriginalPayload?.ReleaseTotal}`);
    console.log(`🚚 TotalCharges: ${realResult.OriginalPayload?.TotalCharges}`);
    console.log(`🏷️ AddressId: ${realResult.OriginalPayload?.AddressId}`);
    console.log(`📦 Release Lines: ${realResult.OriginalPayload?.ReleaseLine?.length || 0}`);
    console.log(`💳 Payment Methods: ${realResult.OriginalPayload?.Order?.Payment?.length || 0}`);
    
    // Check file size and structure
    const fileStats = fs.statSync(outputPath);
    const fileContent = fs.readFileSync(outputPath, 'utf-8');
    const lineCount = fileContent.split('\n').length;
    
    console.log(`📄 File size: ${Math.round(fileStats.size / 1024)} KB`);
    console.log(`📏 Line count: ${lineCount} lines`);
    
    console.log('\n🎉 REAL transformation result generated successfully!');
    console.log('🔍 You can now examine the complete output with all business logic applied.');
    
    return outputPath;
    
  } catch (error) {
    console.error('❌ Real transformation failed:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  generateRealResult()
    .then((outputPath) => {
      console.log(`\n✨ Success! Real transformation saved to: ${outputPath}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Generation failed:', error.message);
      process.exit(1);
    });
}

module.exports = { generateRealResult };