#!/usr/bin/env node

/**
 * Test Real Service - Direct API Call
 * 
 * This calls the transformation service directly through a simple Node.js script
 * without needing the full NestJS infrastructure.
 */

const fs = require('fs');
const path = require('path');

async function testRealService() {
  try {
    console.log('🎯 Testing REAL transformation service directly...');
    
    // Load the sample input
    const sampleInputPath = path.join(__dirname, '../../data/samples/sample_input.json');
    const realInputData = JSON.parse(fs.readFileSync(sampleInputPath, 'utf-8'));
    
    console.log(`📋 OrderId: ${realInputData.OrderId}`);
    console.log(`📦 Order lines: ${realInputData.OrderLine.length}`);
    
    // Import and instantiate the service directly
    console.log('🔧 Loading real transformation service...');
    
    // Try to load the service directly with minimal dependencies
    try {
      // Change to app directory for proper module resolution
      process.chdir('/Users/chongraktanaka/Projects/mao-service-transformer/app');
      
      // Simple direct service instantiation
      const { ReleaseOrderTransformationService } = require('./dist/src/common/services/release-order-transformation.service.js');
      
      // Create a basic service instance for testing
      const service = new ReleaseOrderTransformationService(
        null, // calculation service - will use defaults
        null, // order transformation service
        null, // orchestrator service  
        null  // file output service
      );
      
      console.log('⚡ Running real service transformation...');
      
      // Try the transform method
      const result = service.transform(realInputData);
      
      console.log('✅ Real service transformation completed!');
      
      // Save the result manually since file service might not work
      const outputFileName = `real-service-orderid${realInputData.OrderId}.json`;
      const outputPath = path.join('/Users/chongraktanaka/Projects/mao-service-transformer/release', outputFileName);
      
      const jsonContent = JSON.stringify(result, null, 2);
      fs.writeFileSync(outputPath, jsonContent, 'utf-8');
      
      console.log(`📁 Real service result saved to: ${outputPath}`);
      
      // Analyze the result
      const lineCount = jsonContent.split('\\n').length;
      const fileStats = fs.statSync(outputPath);
      
      console.log('\\n📊 REAL SERVICE ANALYSIS:');
      console.log(`📋 OrderId: ${result.OriginalPayload?.OrderId}`);
      console.log(`🆔 ReleaseId: ${result.OriginalPayload?.ReleaseId}`);
      console.log(`💰 OrderSubtotal: ${result.OriginalPayload?.OrderSubtotal}`);
      console.log(`💰 ReleaseTotal: ${result.OriginalPayload?.ReleaseTotal}`);
      console.log(`📄 File size: ${Math.round(fileStats.size / 1024)} KB`);
      console.log(`📏 Line count: ${lineCount} lines`);
      
      if (lineCount > 100) {
        console.log('🎉 SUCCESS: Generated output from REAL service!');
        console.log('🔍 This came directly from release-order-transformation.service.ts');
        
        return {
          success: true,
          outputPath,
          lineCount,
          isRealService: true
        };
      } else {
        console.log('⚠️  Generated simplified output');
        return {
          success: true,
          outputPath,
          lineCount,
          isRealService: true,
          note: 'Simplified output due to missing dependencies'
        };
      }
      
    } catch (serviceError) {
      console.log('❌ Direct service failed:', serviceError.message);
      console.log('🔄 This confirms the real service has dependency injection requirements');
      
      return {
        success: false,
        error: serviceError.message,
        conclusion: 'Real service requires full NestJS DI container - current output is from copied file'
      };
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the test
if (require.main === module) {
  testRealService()
    .then((result) => {
      console.log('\\n📝 CONCLUSION:');
      if (result.success && result.isRealService) {
        console.log('✅ Output came from REAL service');
        console.log(`📁 Location: ${result.outputPath}`);
        if (result.note) console.log(`ℹ️  Note: ${result.note}`);
      } else {
        console.log('❌ Real service cannot run standalone');
        console.log(`💡 Reason: ${result.error || result.conclusion}`);
        console.log('🔍 Current output is from copied/existing file, not real service');
      }
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Test runner failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testRealService };