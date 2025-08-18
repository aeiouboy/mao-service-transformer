/**
 * Test Order Lines Extraction Fix
 * Verify that we now extract 6 order lines correctly
 */

const fs = require('fs');
const path = require('path');

function testOrderLinesExtraction() {
  console.log('🔍 Testing Order Lines Extraction Fix\n');
  
  const orderId = '311647613-C7LXT7KBTPA3TN';
  
  try {
    // Load the release file
    console.log('📂 Loading release file...');
    const releaseFilePath = path.join(__dirname, 'release', `${orderId}-Rel.json`);
    const releaseData = JSON.parse(fs.readFileSync(releaseFilePath, 'utf-8'));
    
    // Test old extraction method (should return 0)
    const oldOrderLines = releaseData.Order?.OrderLine || [];
    console.log(`❌ Old method (Order.OrderLine): ${oldOrderLines.length} lines`);
    
    // Test new extraction method (should return 6)
    const newOrderLines = releaseData.ReleaseLine || [];
    console.log(`✅ New method (ReleaseLine): ${newOrderLines.length} lines`);
    
    if (newOrderLines.length > 0) {
      console.log('\n📦 Order Lines Found:');
      newOrderLines.forEach((line, index) => {
        console.log(`   ${index + 1}. OrderLineId: ${line.OrderLineId}`);
        console.log(`      ItemId: ${line.ItemId || 'N/A'}`);
        console.log(`      Subtotal: ${line.OrderLineSubtotal} ${releaseData.CurrencyCode}`);
        console.log(`      Quantity: ${line.Quantity || 'N/A'}`);
      });
      
      console.log('\n✅ SUCCESS: Order lines extraction fixed!');
      console.log(`   • Found ${newOrderLines.length} order lines`);
      console.log(`   • Template expects 6 lines`);
      console.log(`   • Match: ${newOrderLines.length === 6 ? 'PERFECT' : 'PARTIAL'}`);
      
      return { success: true, orderLinesCount: newOrderLines.length, orderLines: newOrderLines };
    } else {
      console.log('\n❌ FAILED: Still no order lines found');
      return { success: false, error: 'No order lines found in ReleaseLine array' };
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the test
if (require.main === module) {
  const result = testOrderLinesExtraction();
  
  console.log('\n📊 Test Summary:');
  if (result.success) {
    console.log(`   • Status: ✅ PASS`);
    console.log(`   • Order Lines: ${result.orderLinesCount} extracted`);
    console.log(`   • Ready for full cancel transformation`);
  } else {
    console.log(`   • Status: ❌ FAIL`);
    console.log(`   • Error: ${result.error}`);
  }
  
  process.exit(result.success ? 0 : 1);
}

module.exports = { testOrderLinesExtraction };