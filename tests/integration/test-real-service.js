#!/usr/bin/env node

const http = require('http');

/**
 * Test the actual NestJS service endpoint
 */
async function testRealService() {
  console.log('=== Testing Real NestJS Service ===\n');
  
  const orderId = '123456789-C7L2LCDCTCC2AE_3';
  
  // Test data for the API call
  const postData = JSON.stringify({
    orderId: orderId
  });
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/order/release-template-save',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  return new Promise((resolve, reject) => {
    console.log(`🔄 Calling POST ${options.hostname}:${options.port}${options.path}`);
    console.log(`📦 Payload:`, JSON.parse(postData));
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📈 Response Status: ${res.statusCode}`);
        
        try {
          const response = JSON.parse(data);
          console.log('✅ Response received!');
          console.log('📄 Response:', JSON.stringify(response, null, 2));
          resolve(response);
        } catch (error) {
          console.log('❌ Failed to parse response:', data);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

// Test with a delay to ensure service is running
async function runTest() {
  try {
    console.log('⏳ Waiting 5 seconds for service to be ready...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const response = await testRealService();
    
    if (response.success) {
      console.log('\n🎉 Real service test completed successfully!');
      console.log(`📁 Output saved to: ${response.filePath}`);
    } else {
      console.log('\n❌ Service returned error:', response.message);
    }
    
  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    console.log('\n💡 Make sure the NestJS service is running on localhost:3000');
    console.log('   Run: cd app && npm run start:dev');
  }
}

runTest();
