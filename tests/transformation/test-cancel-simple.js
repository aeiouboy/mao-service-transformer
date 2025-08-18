const fs = require('fs');
const path = require('path');

// Simple test of the cancel transformation without NestJS overhead
async function testCancelTransformation() {
  try {
    console.log('Testing cancel transformation...');
    
    // Load the original release file
    const releaseFile = path.join(process.cwd(), 'release/311647613-C7LXT7KBTPA3TN-Rel.json');
    console.log('Loading release file:', releaseFile);
    
    if (!fs.existsSync(releaseFile)) {
      console.error('Release file not found:', releaseFile);
      return;
    }
    
    const releaseData = JSON.parse(fs.readFileSync(releaseFile, 'utf-8'));
    console.log('Release data loaded successfully. Size:', JSON.stringify(releaseData).length + ' chars');
    
    // Simple shallow transformation
    const cancelResponse = { ...releaseData };
    
    // Apply basic cancel transformations
    cancelResponse.MaxFulfillmentStatusId = '9000';
    cancelResponse.Process = 'postReleaseCancellation';
    cancelResponse.FulfillmentStatus = 'Canceled';
    cancelResponse.IsCancelled = true;
    cancelResponse.TotalCharges = 0;
    cancelResponse.OrderSubTotal = 0;
    cancelResponse.TotalTaxes = 0;
    cancelResponse.StatusId = '9000';
    cancelResponse.DerivedOrderStatus = 'Cancelled';
    cancelResponse.ReleaseTotal = 0;
    
    console.log('Cancel transformation completed successfully');
    console.log('Result size:', JSON.stringify(cancelResponse).length + ' chars');
    
    // Write result
    const outputFile = path.join(process.cwd(), 'release/test-cancel-simple.json');
    fs.writeFileSync(outputFile, JSON.stringify(cancelResponse, null, 2));
    console.log('Result written to:', outputFile);
    
    // Count lines
    const lines = JSON.stringify(cancelResponse, null, 2).split('\n').length;
    console.log('Lines generated:', lines);
    
  } catch (error) {
    console.error('Error in cancel transformation:', error.message);
    console.error(error.stack);
  }
}

testCancelTransformation();