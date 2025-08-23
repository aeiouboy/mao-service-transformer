const axios = require('axios');

/**
 * Test the actual OrderReleaseTemplateTransformerService endpoint
 */
async function testActualService(orderId) {
  console.log(`🔄 Testing actual service for order: ${orderId}`);
  
  const url = 'http://localhost:3000/api/order/release-template-save';
  const requestBody = {
    orderId: orderId
  };
  
  try {
    console.log(`📤 Making POST request to ${url}`);
    const response = await axios.post(url, requestBody, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Service response received!');
    console.log('📄 Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused - is the service running on port 3000?');
    } else if (error.code === 'ECONNRESET') {
      console.error('❌ Connection reset - service may be restarting');
    } else {
      console.error('❌ Error testing service:', error.message);
      if (error.response) {
        console.error('📄 Error response:', error.response.status, error.response.data);
      }
    }
    
    throw error;
  }
}

// Test with the specific order ID
const orderId = '123456789-C7L2LCDCTCC2AE';
testActualService(orderId)
  .then(() => {
    console.log('\n🎉 Actual service test completed!');
  })
  .catch(error => {
    console.error('\n💥 Service test failed:', error.message);
    process.exit(1);
  });