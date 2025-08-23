#!/usr/bin/env node

const fs = require('fs');

// Analyze the expected output structure
async function analyzeExpected() {
  try {
    console.log('=== Analyzing Expected MAO Output Structure ===\n');
    
    // Read the expected output
    const expectedOutputPath = './app/release/MAO-123456789-C7L2LCDCTCC2AE.json';
    const expectedOutput = JSON.parse(fs.readFileSync(expectedOutputPath, 'utf8'));
    
    console.log('1. TOP-LEVEL KEY ORDER (first 30):');
    const topKeys = Object.keys(expectedOutput);
    topKeys.slice(0, 30).forEach((key, i) => {
      console.log(`   ${(i+1).toString().padStart(2, ' ')}. ${key}`);
    });
    console.log(`   ... (${topKeys.length} total keys)\n`);
    
    console.log('2. FINANCIAL VALUES:');
    console.log(`   OrderSubtotal: ${expectedOutput.OrderSubtotal}`);
    console.log(`   ReleaseTotal: ${expectedOutput.ReleaseTotal}`);
    console.log(`   TotalCharges: ${expectedOutput.TotalCharges}`);
    console.log(`   OrderTotalDiscounts: ${expectedOutput.OrderTotalDiscounts}`);
    console.log(`   OrderTotalTaxes: ${expectedOutput.OrderTotalTaxes}\n`);
    
    console.log('3. ORDER STRUCTURE:');
    if (expectedOutput.Order) {
      console.log(`   Order keys: ${Object.keys(expectedOutput.Order).join(', ')}`);
      console.log(`   Payment count: ${expectedOutput.Order.Payment ? expectedOutput.Order.Payment.length : 0}`);
      console.log(`   OrderLine count: ${expectedOutput.Order.OrderLine ? expectedOutput.Order.OrderLine.length : 0}`);
      console.log(`   OrderChargeDetail count: ${expectedOutput.Order.OrderChargeDetail ? expectedOutput.Order.OrderChargeDetail.length : 0}\n`);
    }
    
    console.log('4. RELEASE LINES:');
    if (expectedOutput.ReleaseLine) {
      console.log(`   ReleaseLine count: ${expectedOutput.ReleaseLine.length}`);
      if (expectedOutput.ReleaseLine[0]) {
        console.log(`   First ReleaseLine keys: ${Object.keys(expectedOutput.ReleaseLine[0]).slice(0, 10).join(', ')}...`);
        console.log(`   First ReleaseLine ItemId: ${expectedOutput.ReleaseLine[0].ItemId}`);
        console.log(`   First ReleaseLine UOM: ${expectedOutput.ReleaseLine[0].UOM}`);
      }
    }
    
    console.log('\n5. KEY OBSERVATIONS:');
    console.log(`   - ServiceLevelCode: "${expectedOutput.ServiceLevelCode}"`);
    console.log(`   - Email: "${expectedOutput.Email}"`);
    console.log(`   - CurrencyCode: "${expectedOutput.CurrencyCode}"`);
    console.log(`   - AddressId: "${expectedOutput.AddressId}"`);
    console.log(`   - OrderId: "${expectedOutput.OrderId}"`);
    
    console.log('\n=== Analysis Complete ===');
    
  } catch (error) {
    console.error('Analysis failed:', error.message);
  }
}

analyzeExpected();
