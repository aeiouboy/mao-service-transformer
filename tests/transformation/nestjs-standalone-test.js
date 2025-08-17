#!/usr/bin/env node

/**
 * NestJS Standalone Test
 * 
 * Run the real transformation service without full app infrastructure.
 * Uses NestJS Test utilities to create a minimal testing module.
 */

const fs = require('fs');
const path = require('path');

async function runStandaloneNestJSTest() {
  try {
    console.log('🧪 Creating NestJS standalone test environment...');
    
    // Import NestJS testing utilities
    const { Test } = require('@nestjs/testing');
    
    // Import all the services we need
    console.log('📦 Loading transformation services...');
    const { ReleaseOrderTransformationService } = require('../../app/dist/src/common/services/release-order-transformation.service.js');
    const { OrderTransformationOrchestratorService } = require('../../app/dist/src/common/services/orchestration/order-transformation-orchestrator.service.js');
    
    // Import domain services
    const { OrderTransformationService } = require('../../app/dist/src/common/services/domain/order-transformation.service.js');
    const { OrderLineTransformationService } = require('../../app/dist/src/common/services/domain/order-line-transformation.service.js');
    const { PaymentTransformationService } = require('../../app/dist/src/common/services/domain/payment-transformation.service.js');
    const { PaymentMethodTransformationService } = require('../../app/dist/src/common/services/domain/payment-method-transformation.service.js');
    const { PaymentTransactionTransformationService } = require('../../app/dist/src/common/services/domain/payment-transaction-transformation.service.js');
    const { AllocationTransformationService } = require('../../app/dist/src/common/services/domain/allocation-transformation.service.js');
    const { ReleaseTransformationService } = require('../../app/dist/src/common/services/domain/release-transformation.service.js');
    const { ReleaseLineTransformationService } = require('../../app/dist/src/common/services/domain/release-line-transformation.service.js');
    
    // Import shared services
    const { DynamicIdGeneratorService } = require('../../app/dist/src/common/services/dynamic-id-generator.service.js');
    const { CalculationService } = require('../../app/dist/src/common/services/shared/calculation.service.js');
    const { BusinessRulesService } = require('../../app/dist/src/common/services/shared/business-rules.service.js');
    const { TimestampService } = require('../../app/dist/src/common/services/shared/timestamp.service.js');
    const { FileOutputService } = require('../../app/dist/src/common/services/shared/file-output.service.js');
    
    console.log('🏗️ Creating NestJS testing module...');
    
    // Create a minimal testing module with all required services
    const moduleRef = await Test.createTestingModule({
      providers: [
        // Main service
        ReleaseOrderTransformationService,
        
        // Orchestration
        OrderTransformationOrchestratorService,
        
        // Domain services
        OrderTransformationService,
        OrderLineTransformationService,
        PaymentTransformationService,
        PaymentMethodTransformationService,
        PaymentTransactionTransformationService,
        AllocationTransformationService,
        ReleaseTransformationService,
        ReleaseLineTransformationService,
        
        // Shared services
        DynamicIdGeneratorService,
        CalculationService,
        BusinessRulesService,
        TimestampService,
        FileOutputService,
      ],
    }).compile();
    
    console.log('✅ Testing module created successfully!');
    
    // Get the main transformation service
    const transformationService = moduleRef.get(ReleaseOrderTransformationService);
    
    console.log('📂 Loading real sample data...');
    
    // Load the real sample input
    const sampleInputPath = path.join(__dirname, '../../data/samples/sample_input.json');
    const realInputData = JSON.parse(fs.readFileSync(sampleInputPath, 'utf-8'));
    
    console.log(`📋 OrderId: ${realInputData.OrderId}`);
    console.log(`📦 Order lines: ${realInputData.OrderLine.length}`);
    console.log(`💳 Payment methods: ${realInputData.Payment?.[0]?.PaymentMethod?.length || 0}`);
    
    console.log('⚡ Running REAL NestJS transformation...');
    
    // Run the transformation
    const realResult = transformationService.transform(realInputData);
    
    console.log('✅ Transformation completed successfully!');
    
    // Save the result
    const outputPath = await transformationService.saveTransformedOrder(
      realInputData,
      '/Users/chongraktanaka/Projects/mao-service-transformer/release'
    );
    
    console.log(`📁 Real NestJS result saved to: ${outputPath}`);
    
    // Analyze the result
    console.log('\\n📊 REAL NESTJS TRANSFORMATION ANALYSIS:');
    console.log(`📋 OrderId: ${realResult.OriginalPayload?.OrderId}`);
    console.log(`🆔 ReleaseId: ${realResult.OriginalPayload?.ReleaseId}`);
    console.log(`💰 OrderSubtotal: ${realResult.OriginalPayload?.OrderSubtotal}`);
    console.log(`💰 ReleaseTotal: ${realResult.OriginalPayload?.ReleaseTotal}`);
    console.log(`🚚 TotalCharges: ${realResult.OriginalPayload?.TotalCharges}`);
    console.log(`🏷️ AddressId: ${realResult.OriginalPayload?.AddressId}`);
    console.log(`📦 Release Lines: ${realResult.OriginalPayload?.ReleaseLine?.length || 0}`);
    console.log(`💳 Payment Methods: ${realResult.OriginalPayload?.Order?.Payment?.length || 0}`);
    
    // Check file structure
    const fileContent = fs.readFileSync(outputPath, 'utf-8');
    const lineCount = fileContent.split('\\n').length;
    const fileStats = fs.statSync(outputPath);
    
    console.log(`📄 File size: ${Math.round(fileStats.size / 1024)} KB`);
    console.log(`📏 Line count: ${lineCount} lines`);
    
    if (lineCount > 2000) {
      console.log('🎉 SUCCESS: Generated comprehensive REAL NestJS transformation!');
      console.log('🔍 This is the true output from the real release-order-transformation.service.ts');
    } else {
      console.log('⚠️  Generated simplified result.');
    }
    
    // Clean up
    await moduleRef.close();
    
    return {
      success: true,
      outputPath,
      lineCount,
      result: realResult
    };
    
  } catch (error) {
    console.error('❌ NestJS standalone test failed:', error.message);
    console.error('Stack trace:', error.stack);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run if called directly
if (require.main === module) {
  runStandaloneNestJSTest()
    .then((result) => {
      if (result.success) {
        console.log(`\\n✨ SUCCESS: Real NestJS transformation completed!`);
        console.log(`📁 Output: ${result.outputPath}`);
        console.log(`📏 Lines: ${result.lineCount}`);
        console.log(`🎯 This is the TRUE output from release-order-transformation.service.ts`);
        process.exit(0);
      } else {
        console.log(`\\n💥 Test failed: ${result.error}`);
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('\\n💥 Test runner failed:', error.message);
      process.exit(1);
    });
}

module.exports = { runStandaloneNestJSTest };