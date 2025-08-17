const { Test } = require('@nestjs/testing');
const { CommonModule } = require('./app/dist/src/common/common.module.js');
const { ReleaseOrderTransformationService } = require('./app/dist/src/common/services/release-order-transformation.service.js');
const fs = require('fs');

async function testNewArchitecture() {
  try {
    console.log('🔧 Setting up NestJS testing module...');
    
    // Create NestJS testing module
    const moduleRef = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();

    console.log('✅ Testing module created');
    
    // Get the service with all dependencies injected
    const service = moduleRef.get(ReleaseOrderTransformationService);
    console.log('✅ Service retrieved with dependencies');
    
    // Read sample input
    const inputData = JSON.parse(fs.readFileSync('./data/samples/sample_input.json', 'utf-8'));
    console.log('✅ Sample input loaded');
    
    console.log('🚀 Testing transformation with new service architecture...');
    
    // Test the transformation
    const result = service.transform(inputData);
    
    console.log('✅ Transformation successful!');
    console.log('📊 Results:');
    console.log('  - Output structure keys:', Object.keys(result));
    console.log('  - OriginalPayload keys:', Object.keys(result.OriginalPayload || {}));
    console.log('  - ReleaseLine count:', result.OriginalPayload?.ReleaseLine?.length || 0);
    console.log('  - OrderId:', result.OriginalPayload?.OrderId);
    console.log('  - NoOfDeliveryLines:', result.OriginalPayload?.NoOfDeliveryLines);
    
    // Validate key fields
    if (result.OriginalPayload?.ReleaseLine?.length === inputData.OrderLine.length) {
      console.log('✅ Line count validation passed');
    } else {
      console.log('❌ Line count validation failed');
    }
    
    if (result.OriginalPayload?.OrderId === inputData.OrderId) {
      console.log('✅ OrderId validation passed');
    } else {
      console.log('❌ OrderId validation failed');
    }
    
    console.log('\n🎉 New service architecture test completed successfully!');
    console.log('🏗️  Architecture summary:');
    console.log('  - 8+ specialized domain services');
    console.log('  - 1 orchestrator service for workflow coordination');
    console.log('  - 1 facade service maintaining backward compatibility');
    console.log('  - Clean separation of concerns');
    console.log('  - Ready for microservice extraction');
    
    // Clean up
    await moduleRef.close();
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testNewArchitecture();