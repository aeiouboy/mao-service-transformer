// Custom test with different OrderId to generate new output filename
const fs = require('fs');
const path = require('path');

// Import the compiled transformation service
const { ReleaseOrderTransformationService } = require('./app/dist/src/common/services/release-order-transformation.service.js');

async function testTransformationWithCustomOrderId() {
  try {
    console.log('🧪 Running Custom Order Transformation Test...');
    
    // Read the sample input
    const inputFile = '/Users/chongraktanaka/Projects/mao-service-transformer/data/samples/sample_input.json';
    const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    
    // Modify the OrderId to create a different output filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const customOrderId = `TEST-ORDER-${timestamp}`;
    
    console.log(`📋 Original OrderId: ${inputData.OrderId}`);
    console.log(`📋 Custom OrderId: ${customOrderId}`);
    
    // Update the OrderId in the input data
    inputData.OrderId = customOrderId;
    inputData.AlternateOrderId = `${customOrderId}-CUSTOM`;
    
    // Create service instance and transform
    const service = new ReleaseOrderTransformationService();
    const result = await service.transform(inputData);
    
    // Save with custom filename
    const outputDir = '/Users/chongraktanaka/Projects/mao-service-transformer/release';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFilename = `orderid${customOrderId}.json`;
    const outputPath = path.join(outputDir, outputFilename);
    
    // Write the transformed result
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    
    console.log('✅ Transformation completed successfully!');
    console.log(`📁 Custom output saved to: ${outputPath}`);
    
    // Display key metrics
    console.log('\n🔄 Key transformations:');
    console.log(`- OrderId: ${inputData.OrderId} → ReleaseId: ${result.OriginalPayload.Order.ReleaseId}`);
    console.log(`- OrderSubtotal: ${result.OriginalPayload.OrderSubtotal}`);
    console.log(`- ReleaseTotal: ${result.OriginalPayload.ReleaseTotal}`);
    console.log(`- TotalCharges: ${result.OriginalPayload.TotalCharges}`);
    console.log(`- AddressId (MD5): ${result.OriginalPayload.AddressId.substring(0, 30)}...`);
    console.log(`- Number of Release Lines: ${result.OriginalPayload.Order.ReleaseLine.length}`);
    
    // Quick validation
    const hasValidStructure = result.OriginalPayload && 
                             result.OriginalPayload.Order && 
                             result.OriginalPayload.Order.ReleaseLine &&
                             result.OriginalPayload.Order.Payment;
    
    console.log(`\n🎯 Structure Validation: ${hasValidStructure ? 'Valid ✅' : 'Invalid ❌'}`);
    
    return {
      outputPath,
      result,
      customOrderId
    };
    
  } catch (error) {
    console.error('❌ Error during transformation:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

// Run the test
testTransformationWithCustomOrderId()
  .then((testResult) => {
    console.log('\n🎉 Custom transformation test completed successfully!');
    console.log(`📋 Custom Order ID: ${testResult.customOrderId}`);
    console.log(`📁 Output file: ${testResult.outputPath}`);
  })
  .catch((error) => {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  });