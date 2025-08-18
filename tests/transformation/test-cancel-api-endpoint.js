/**
 * Test the actual NestJS cancel API endpoint
 * This tests if the service is accessible via HTTP
 */

const axios = require('axios').default;

// Test configuration
const API_BASE_URL = 'http://localhost:3000';
const CANCEL_ENDPOINT = '/order/cancel';

// Test request payload
const cancelRequest = {
  OrderId: '311647613-C7LXT7KBTPA3TN',
  CancelReason: {
    ReasonId: 'CC-WrongPrice&PromoBySeller-Backorder',
    OthReason: 'Manual fulfilment test'
  },
  CancelComments: 'Customer requested cancellation',
  OrgId: 'CFR'
};

// Test headers
const testHeaders = {
  'Authorization': 'Bearer test-token-123',
  'Organization': 'CFR',
  'Content-Type': 'application/json',
  'basicAuth': 'Basic dGVzdDp0ZXN0' // test:test in base64
};

async function testCancelApiEndpoint() {
  console.log('🧪 Testing Manhattan Active® Omni Cancel API Endpoint\n');

  try {
    console.log(`🔗 API Base URL: ${API_BASE_URL}`);
    console.log(`🎯 Endpoint: POST ${CANCEL_ENDPOINT}`);
    console.log(`📦 OrderId: ${cancelRequest.OrderId}\n`);

    console.log('📋 Request Headers:');
    Object.keys(testHeaders).forEach(key => {
      console.log(`   • ${key}: ${key === 'Authorization' ? 'Bearer ***' : testHeaders[key]}`);
    });

    console.log('\n📝 Request Body:');
    console.log(JSON.stringify(cancelRequest, null, 2));

    console.log('\n🚀 Sending cancel request...\n');

    const startTime = Date.now();
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}${CANCEL_ENDPOINT}`,
        cancelRequest,
        {
          headers: testHeaders,
          timeout: 30000, // 30 second timeout
          validateStatus: () => true // Accept any status code
        }
      );

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      console.log(`⏱️  Response received in ${responseTime}ms`);
      console.log(`🌐 Status: ${response.status} ${response.statusText}`);

      // Log response headers
      console.log('\n📤 Response Headers:');
      Object.keys(response.headers).forEach(key => {
        console.log(`   • ${key}: ${response.headers[key]}`);
      });

      // Log response body
      console.log('\n📄 Response Body:');
      if (typeof response.data === 'object') {
        console.log(JSON.stringify(response.data, null, 2));
      } else {
        console.log(response.data);
      }

      // Analyze response
      console.log('\n🔍 Response Analysis:');
      console.log(`   • Status Code: ${response.status}`);
      console.log(`   • Response Time: ${responseTime}ms`);
      console.log(`   • Content Type: ${response.headers['content-type'] || 'Not specified'}`);
      console.log(`   • Body Type: ${typeof response.data}`);

      if (response.status === 200 || response.status === 201) {
        console.log('\n✅ API Test Results:');
        console.log('   • Endpoint accessible: ✅');
        console.log('   • Authentication accepted: ✅');
        console.log('   • Request processed: ✅');
        console.log('   • Response received: ✅');

        // Check if response matches expected format
        if (response.data && typeof response.data === 'object') {
          if (response.data.success !== undefined) {
            console.log(`   • API response format: ✅ (success: ${response.data.success})`);
          } else {
            console.log('   • API response format: ⚠️ (unexpected format)');
          }
        }

        return {
          success: true,
          status: response.status,
          responseTime,
          data: response.data
        };

      } else {
        console.log('\n⚠️ API Test Results:');
        console.log(`   • Status: ${response.status} (${response.statusText})`);
        console.log('   • Endpoint accessible: ✅');
        
        if (response.status === 401) {
          console.log('   • Authentication: ❌ (Unauthorized)');
        } else if (response.status === 404) {
          console.log('   • Endpoint: ❌ (Not Found)');
        } else if (response.status === 400) {
          console.log('   • Request: ❌ (Bad Request)');
        } else {
          console.log(`   • Server: ❌ (${response.status} error)`);
        }

        return {
          success: false,
          status: response.status,
          responseTime,
          error: response.statusText,
          data: response.data
        };
      }

    } catch (requestError) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      console.log(`⏱️  Request failed after ${responseTime}ms`);

      if (requestError.code === 'ECONNREFUSED') {
        console.log('\n❌ Connection Error:');
        console.log('   • Server status: ❌ (Connection refused)');
        console.log('   • Possible causes:');
        console.log('     - NestJS server not running');
        console.log('     - Server running on different port');
        console.log('     - Database connection blocking startup');
        console.log('\n💡 Suggestions:');
        console.log('   • Check if server is running: ps aux | grep node');
        console.log('   • Check server logs for errors');
        console.log('   • Try: cd app && pnpm run start:dev');

        return {
          success: false,
          error: 'Connection refused - server not accessible',
          responseTime
        };

      } else if (requestError.code === 'ETIMEDOUT') {
        console.log('\n❌ Timeout Error:');
        console.log('   • Request timeout: ❌ (30 second limit exceeded)');
        console.log('   • Server may be starting up or processing slowly');

        return {
          success: false,
          error: 'Request timeout',
          responseTime
        };

      } else {
        console.log('\n❌ Request Error:');
        console.log(`   • Error Code: ${requestError.code || 'Unknown'}`);
        console.log(`   • Error Message: ${requestError.message}`);

        return {
          success: false,
          error: requestError.message,
          responseTime
        };
      }
    }

  } catch (error) {
    console.error('❌ Test setup error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Health check function
async function checkServerHealth() {
  console.log('🏥 Checking server health...\n');

  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000,
      validateStatus: () => true
    });

    console.log(`🌡️  Health check: ${response.status} ${response.statusText}`);
    if (response.data) {
      console.log('📊 Health data:', JSON.stringify(response.data, null, 2));
    }

    return response.status === 200;

  } catch (error) {
    console.log(`❌ Health check failed: ${error.message}`);
    return false;
  }
}

// Main test execution
async function main() {
  console.log('🎯 Manhattan Active® Omni Cancel Service API Test\n');
  console.log('=' .repeat(60) + '\n');

  // Check server health first
  const isHealthy = await checkServerHealth();
  console.log('\n' + '-'.repeat(60) + '\n');

  // Run cancel endpoint test
  const result = await testCancelApiEndpoint();

  console.log('\n' + '='.repeat(60));
  console.log('\n📈 Final Test Summary:');
  console.log(`   • Server Health: ${isHealthy ? '✅' : '❌'}`);
  console.log(`   • API Test: ${result.success ? '✅' : '❌'}`);
  
  if (result.success) {
    console.log(`   • Status: ${result.status}`);
    console.log(`   • Response Time: ${result.responseTime}ms`);
    console.log('\n🎉 Cancel API endpoint is working correctly!');
  } else {
    console.log(`   • Error: ${result.error}`);
    console.log('\n💡 Server may need to be started or configuration adjusted.');
  }

  return result.success;
}

// Run if called directly
if (require.main === module) {
  main().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { testCancelApiEndpoint, checkServerHealth };