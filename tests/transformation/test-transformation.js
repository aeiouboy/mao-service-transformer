const fs = require('fs');
const path = require('path');

// Import the compiled transformation service
const { ReleaseOrderTransformationService } = require('./dist/src/common/services/release-order-transformation.service.js');

async function testTransformation() {
  try {
    // Read the sample input
    const inputFile = '/Users/chongraktanaka/oms-mapping/sample_input_thai.json';
    const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    
    // Create service instance and transform
    const service = new ReleaseOrderTransformationService();
    const result = await service.saveTransformedOrder(inputData);
    
    console.log('✅ Transformation completed successfully!');
    console.log('📁 Output file:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Error during transformation:', error.message);
    throw error;
  }
}

testTransformation().catch(console.error);