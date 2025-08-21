const axios = require('axios');

async function testReleaseTransformation() {
  try {
    console.log('🚀 Testing Order Release Transformation Service');
    console.log('📍 Endpoint: http://localhost:3001/api/order/release-transform');
    
    // Test request payload with our database order ID
    const requestPayload = {
      orderId: 'SAN6-423924816-C7EJNB23JAUDN2'
    };
    
    console.log('📤 Request payload:', JSON.stringify(requestPayload, null, 2));
    
    const response = await axios.post('http://localhost:3001/api/order/release-transform', requestPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });
    
    console.log('✅ Response Status:', response.status);
    console.log('📄 Response Headers:', response.headers);
    
    // Save the response to a file
    const fs = require('fs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `service-release-output-${timestamp}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(response.data, null, 2));
    console.log(`💾 Response saved to: ${filename}`);
    
    console.log('🎯 Transformation Result:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Error testing service:', error.message);
    if (error.response) {
      console.error('📄 Response status:', error.response.status);
      console.error('📄 Response headers:', error.response.headers);
      console.error('📄 Response data:', error.response.data);
    }
    if (error.code) {
      console.error('📄 Error code:', error.code);
    }
    throw error;
  }
}

// Run the test
testReleaseTransformation()
  .then(() => {
    console.log('✅ Service test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Service test failed:', error.message);
    process.exit(1);
  });