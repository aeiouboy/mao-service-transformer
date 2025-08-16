import { ReleaseOrderTransformationService } from './common/services/release-order-transformation.service';
import * as fs from 'fs';

// Load sample INPUT order (Thai locale format for 100% accuracy)
const sampleOrderPath = '/Users/chongraktanaka/oms-mapping/sample_input_thai.json';
const sampleOrder = JSON.parse(fs.readFileSync(sampleOrderPath, 'utf8'));

// Initialize transformation service
const transformationService = new ReleaseOrderTransformationService();

async function runTest() {
  console.log('🔄 Running order transformation test...');

  try {
    console.log('📋 Sample data structure:');
    console.log('- OrderLine count:', sampleOrder.OrderLine?.length || 'undefined');
    console.log('- OrderNote exists:', !!sampleOrder.OrderNote);
    console.log('- OrderChargeDetail exists:', !!sampleOrder.OrderChargeDetail);
    console.log('- OrderTaxDetail exists:', !!sampleOrder.OrderTaxDetail);
    
    // Run transformation and save to release directory
    const outputPath = await transformationService.saveTransformedOrder(sampleOrder);
    console.log('✅ Transformation completed successfully!');
    console.log(`📁 Output file: ${outputPath}`);
    
    // Verify file was created
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log('🎉 Test passed!');
    } else {
      console.error('❌ Output file was not created');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Transformation failed:', (error as Error).message);
    console.error('Stack trace:', (error as Error).stack);
    process.exit(1);
  }
}

runTest();