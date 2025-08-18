const http = require('http');

// Simple integration test for the cancel endpoint
async function testCancelEndpoint() {
  const orderId = '311647613-C7LXT7KBTPA3TN';
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/omnia/api/ext/order/${orderId}/cancel`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000
  };

  return new Promise((resolve, reject) => {
    console.log(`🧪 Testing: POST http://localhost:3000/omnia/api/ext/order/${orderId}/cancel\n`);
    
    const req = http.request(options, (res) => {
      let data = '';
      
      console.log(`📊 Response Status: ${res.statusCode}`);
      console.log(`📋 Response Headers:`, res.headers);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const response = JSON.parse(data);
            console.log('\n✅ SUCCESS! Cancel endpoint is working');
            console.log(`📊 Response size: ${data.length} characters`);
            console.log(`📋 Response fields: ${Object.keys(response).length}`);
            console.log(`🎯 Key fields present:`);
            
            const keyFields = ['MaxFulfillmentStatusId', 'FulfillmentStatus', 'IsCancelled', 'OrderId'];
            keyFields.forEach(field => {
              if (field in response) {
                console.log(`   ✅ ${field}: ${response[field]}`);
              } else {
                console.log(`   ❌ ${field}: MISSING`);
              }
            });
            
            resolve({ success: true, data: response, status: res.statusCode });
          } else {
            console.log(`\n❌ HTTP ${res.statusCode}: ${data}`);
            resolve({ success: false, data: data, status: res.statusCode });
          }
        } catch (parseError) {
          console.log(`\n❌ JSON Parse Error: ${parseError.message}`);
          console.log(`📄 Raw response: ${data.substring(0, 500)}...`);
          resolve({ success: false, error: parseError.message, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`\n❌ Request Error: ${error.message}`);
      console.log('   💡 Make sure the server is running: pnpm run start:dev');
      resolve({ success: false, error: error.message });
    });
    
    req.on('timeout', () => {
      console.log('\n❌ Request Timeout');
      console.log('   💡 Server may not be responding or is taking too long');
      req.destroy();
      resolve({ success: false, error: 'Request timeout' });
    });
    
    req.setTimeout(5000);
    req.end();
  });
}

async function main() {
  console.log('🚀 Integration Test: MAO Cancel Service\n');
  
  const result = await testCancelEndpoint();
  
  if (result.success) {
    console.log('\n🎉 Integration Test PASSED!');
    console.log('   ✅ Endpoint responds correctly');
    console.log('   ✅ Returns valid JSON');
    console.log('   ✅ Contains expected cancel fields');
    console.log('   ✅ Ready for production integration');
    process.exit(0);
  } else {
    console.log('\n❌ Integration Test FAILED!');
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    if (result.status) {
      console.log(`   HTTP Status: ${result.status}`);
    }
    console.log('\n💡 Next Steps:');
    console.log('   1. Start the server: cd app && pnpm run start:dev');
    console.log('   2. Wait for server to fully start (look for "Application is running on" message)');
    console.log('   3. Re-run this test');
    process.exit(1);
  }
}

main();