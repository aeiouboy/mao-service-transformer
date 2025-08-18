/**
 * Compare Cancel Structure - Template vs Generated
 * Identifies structural differences between expected template and our result
 */

const fs = require('fs');
const path = require('path');

function compareStructures() {
  console.log('🔍 Comparing Cancel Response Structures\n');

  // Load both files
  const templatePath = path.join(__dirname, '../../data/samples/cancel_fully.json');
  const resultPath = path.join(__dirname, '../../release/final-cancel-with-6-lines.json');

  const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
  const result = JSON.parse(fs.readFileSync(resultPath, 'utf-8'));

  console.log('📊 File Comparison:');
  console.log(`   • Template: ${templatePath.split('/').pop()}`);
  console.log(`   • Result:   ${resultPath.split('/').pop()}\n`);

  // Compare top-level structure
  const templateKeys = Object.keys(template);
  const resultKeys = Object.keys(result);

  console.log('🔑 Top-Level Field Comparison:');
  console.log(`   • Template fields: ${templateKeys.length}`);
  console.log(`   • Result fields:   ${resultKeys.length}\n`);

  // Find missing fields in result
  const missingInResult = templateKeys.filter(key => !resultKeys.includes(key));
  const extraInResult = resultKeys.filter(key => !templateKeys.includes(key));

  if (missingInResult.length > 0) {
    console.log('❌ Missing Fields in Result:');
    missingInResult.forEach(field => {
      console.log(`   • ${field}: ${JSON.stringify(template[field])?.substring(0, 100)}...`);
    });
    console.log('');
  }

  if (extraInResult.length > 0) {
    console.log('➕ Extra Fields in Result:');
    extraInResult.forEach(field => {
      console.log(`   • ${field}: ${JSON.stringify(result[field])?.substring(0, 100)}...`);
    });
    console.log('');
  }

  // Compare common field values
  const commonFields = templateKeys.filter(key => resultKeys.includes(key));
  console.log('🔄 Field Value Comparison:');
  
  let matchCount = 0;
  let mismatchCount = 0;
  
  commonFields.forEach(field => {
    const templateValue = template[field];
    const resultValue = result[field];
    
    // Handle different data types
    if (JSON.stringify(templateValue) === JSON.stringify(resultValue)) {
      matchCount++;
      console.log(`   ✅ ${field}: MATCH`);
    } else {
      mismatchCount++;
      console.log(`   ❌ ${field}: MISMATCH`);
      console.log(`      Template: ${JSON.stringify(templateValue)?.substring(0, 80)}...`);
      console.log(`      Result:   ${JSON.stringify(resultValue)?.substring(0, 80)}...`);
    }
  });
  
  console.log(`\n📈 Summary:`)
  console.log(`   • Total common fields: ${commonFields.length}`);
  console.log(`   • Matches: ${matchCount} ✅`);
  console.log(`   • Mismatches: ${mismatchCount} ❌`);
  console.log(`   • Missing: ${missingInResult.length} 🚫`);
  console.log(`   • Extra: ${extraInResult.length} ➕`);

  // Analyze specific structural differences
  console.log(`\n🏗️  Structural Analysis:`);
  
  // Check Payment structure
  if (template.Payment && result.Order?.Payment) {
    console.log(`   • Payment Location: Template=root, Result=Order.Payment (MISMATCH)`);
  }
  
  // Check OrderHold presence
  if (template.OrderHold && !result.OrderHold) {
    console.log(`   • OrderHold: Missing in result`);
  }
  
  // Check OrderExtension fields
  const templateExtensions = templateKeys.filter(key => key.startsWith('OrderExtension'));
  const resultExtensions = resultKeys.filter(key => key.startsWith('OrderExtension'));
  console.log(`   • OrderExtensions: Template=${templateExtensions.length}, Result=${resultExtensions.length}`);

  return {
    missingFields: missingInResult,
    extraFields: extraInResult,
    matchCount,
    mismatchCount,
    totalFields: templateKeys.length
  };
}

// Run the comparison
if (require.main === module) {
  const results = compareStructures();
  
  console.log(`\n🎯 Recommended Fixes:`);
  if (results.missingFields.length > 0) {
    console.log(`   1. Add missing fields: ${results.missingFields.join(', ')}`);
  }
  if (results.mismatchCount > 0) {
    console.log(`   2. Fix ${results.mismatchCount} field value mismatches`);
  }
  console.log(`   3. Ensure payment structure matches template (root level vs Order.Payment)`);
  console.log(`   4. Add OrderHold array if missing`);
  console.log(`   5. Add OrderExtension1-4 fields to match template structure`);
  
  process.exit(results.missingFields.length + results.mismatchCount > 0 ? 1 : 0);
}

module.exports = { compareStructures };