#!/usr/bin/env node

const fs = require('fs');

// Compare the current output with expected output
async function compareOutputs() {
  try {
    console.log('=== Comparing Current vs Expected Output ===\n');
    
    // Read both files
    const currentPath = '../../app/release/rel-123456789-C7L2LCDCTCC2AE.json';
    const expectedPath = '../../app/release/MAO-123456789-C7L2LCDCTCC2AE.json';
    
    if (!fs.existsSync(currentPath)) {
      console.log('❌ Current output file not found:', currentPath);
      return;
    }
    
    if (!fs.existsSync(expectedPath)) {
      console.log('❌ Expected output file not found:', expectedPath);
      return;
    }
    
    const currentOutput = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
    const expectedOutput = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
    
    console.log('1. KEY ORDER COMPARISON:');
    const currentKeys = Object.keys(currentOutput);
    const expectedKeys = Object.keys(expectedOutput);
    
    console.log(`   Current keys: ${currentKeys.length}`);
    console.log(`   Expected keys: ${expectedKeys.length}`);
    
    // Check first 20 keys for order
    console.log('\n   First 20 keys comparison:');
    for (let i = 0; i < Math.min(20, Math.max(currentKeys.length, expectedKeys.length)); i++) {
      const current = currentKeys[i] || '(missing)';
      const expected = expectedKeys[i] || '(missing)';
      const match = current === expected ? '✅' : '❌';
      console.log(`   ${(i+1).toString().padStart(2, ' ')}. ${match} ${current.padEnd(25)} | ${expected}`);
    }
    
    console.log('\n2. FINANCIAL VALUES COMPARISON:');
    const financialFields = ['OrderSubtotal', 'ReleaseTotal', 'TotalCharges', 'OrderTotalDiscounts', 'OrderTotalTaxes'];
    financialFields.forEach(field => {
      const current = currentOutput[field];
      const expected = expectedOutput[field];
      const match = current === expected ? '✅' : '❌';
      console.log(`   ${match} ${field}: ${current} | ${expected}`);
    });
    
    console.log('\n3. ORDER STRUCTURE COMPARISON:');
    if (currentOutput.Order && expectedOutput.Order) {
      const currentOrderKeys = Object.keys(currentOutput.Order);
      const expectedOrderKeys = Object.keys(expectedOutput.Order);
      console.log(`   Order keys match: ${JSON.stringify(currentOrderKeys) === JSON.stringify(expectedOrderKeys) ? '✅' : '❌'}`);
      console.log(`   Current: [${currentOrderKeys.join(', ')}]`);
      console.log(`   Expected: [${expectedOrderKeys.join(', ')}]`);
      
      // Check OrderLine count
      const currentOrderLines = currentOutput.Order.OrderLine ? currentOutput.Order.OrderLine.length : 0;
      const expectedOrderLines = expectedOutput.Order.OrderLine ? expectedOutput.Order.OrderLine.length : 0;
      console.log(`   OrderLine count: ${currentOrderLines} | ${expectedOrderLines} ${currentOrderLines === expectedOrderLines ? '✅' : '❌'}`);
    }
    
    console.log('\n4. RELEASE LINES COMPARISON:');
    const currentReleaseLines = currentOutput.ReleaseLine ? currentOutput.ReleaseLine.length : 0;
    const expectedReleaseLines = expectedOutput.ReleaseLine ? expectedOutput.ReleaseLine.length : 0;
    console.log(`   ReleaseLine count: ${currentReleaseLines} | ${expectedReleaseLines} ${currentReleaseLines === expectedReleaseLines ? '✅' : '❌'}`);
    
    if (currentOutput.ReleaseLine && expectedOutput.ReleaseLine && currentOutput.ReleaseLine[0] && expectedOutput.ReleaseLine[0]) {
      const currentFirstItem = currentOutput.ReleaseLine[0].ItemId;
      const expectedFirstItem = expectedOutput.ReleaseLine[0].ItemId;
      console.log(`   First ReleaseLine ItemId: ${currentFirstItem} | ${expectedFirstItem} ${currentFirstItem === expectedFirstItem ? '✅' : '❌'}`);
    }
    
    console.log('\n5. KEY OBSERVATIONS:');
    const keyFields = ['ServiceLevelCode', 'Email', 'CurrencyCode', 'AddressId', 'OrderId'];
    keyFields.forEach(field => {
      const current = currentOutput[field];
      const expected = expectedOutput[field];
      const match = JSON.stringify(current) === JSON.stringify(expected) ? '✅' : '❌';
      console.log(`   ${match} ${field}: "${current}" | "${expected}"`);
    });
    
    console.log('\n=== Comparison Complete ===');
    
  } catch (error) {
    console.error('Comparison failed:', error.message);
  }
}

compareOutputs();
