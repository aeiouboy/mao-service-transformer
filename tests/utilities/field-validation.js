#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load both JSON files
const outputPath = './app/release/rel-123456789-C7L2LCDCTCC2AE.json';
const expectedPath = './app/release/MAO-123456789-C7L2LCDCTCC2AE.json';

console.log('🔍 COMPREHENSIVE FIELD-BY-FIELD VALIDATION');
console.log('==========================================');

let outputData, expectedData;

try {
  outputData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  expectedData = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
  console.log('✅ Successfully loaded both files');
} catch (error) {
  console.error('❌ Error loading files:', error.message);
  process.exit(1);
}

// Validation results
const results = {
  totalFields: 0,
  matchingFields: 0,
  differentFields: 0,
  missingInOutput: 0,
  extraInOutput: 0,
  structuralDifferences: [],
  dataDifferences: [],
  typeDifferences: []
};

// Deep comparison function
function deepCompare(obj1, obj2, path = '') {
  if (typeof obj1 !== typeof obj2) {
    results.typeDifferences.push({
      path,
      outputType: typeof obj1,
      expectedType: typeof obj2,
      outputValue: obj1,
      expectedValue: obj2
    });
    results.differentFields++;
    return false;
  }

  if (obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      results.dataDifferences.push({
        path,
        outputValue: obj1,
        expectedValue: obj2
      });
      results.differentFields++;
      return false;
    }
    results.matchingFields++;
    return true;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      results.structuralDifferences.push({
        path,
        issue: 'Array length mismatch',
        outputLength: obj1.length,
        expectedLength: obj2.length
      });
      results.differentFields++;
    }

    const maxLength = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLength; i++) {
      const newPath = `${path}[${i}]`;
      if (i >= obj1.length) {
        results.missingInOutput++;
        results.structuralDifferences.push({
          path: newPath,
          issue: 'Missing in output',
          expectedValue: obj2[i]
        });
      } else if (i >= obj2.length) {
        results.extraInOutput++;
        results.structuralDifferences.push({
          path: newPath,
          issue: 'Extra in output',
          outputValue: obj1[i]
        });
      } else {
        deepCompare(obj1[i], obj2[i], newPath);
      }
    }
    return obj1.length === obj2.length;
  }

  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);

    for (const key of allKeys) {
      const newPath = path ? `${path}.${key}` : key;
      results.totalFields++;

      if (!(key in obj1)) {
        results.missingInOutput++;
        results.structuralDifferences.push({
          path: newPath,
          issue: 'Missing in output',
          expectedValue: obj2[key]
        });
      } else if (!(key in obj2)) {
        results.extraInOutput++;
        results.structuralDifferences.push({
          path: newPath,
          issue: 'Extra in output',
          outputValue: obj1[key]
        });
      } else {
        deepCompare(obj1[key], obj2[key], newPath);
      }
    }
    return keys1.length === keys2.length;
  }

  // Primitive values
  results.totalFields++;
  if (obj1 === obj2) {
    results.matchingFields++;
    return true;
  } else {
    results.dataDifferences.push({
      path,
      outputValue: obj1,
      expectedValue: obj2
    });
    results.differentFields++;
    return false;
  }
}

// Perform the comparison
console.log('\n📊 STARTING DEEP COMPARISON...');
const startTime = Date.now();
deepCompare(outputData, expectedData);
const endTime = Date.now();

// Print results summary
console.log('\n📈 VALIDATION RESULTS SUMMARY');
console.log('============================');
console.log(`⏱️  Processing Time: ${endTime - startTime}ms`);
console.log(`📊 Total Fields Analyzed: ${results.totalFields}`);
console.log(`✅ Matching Fields: ${results.matchingFields}`);
console.log(`❌ Different Fields: ${results.differentFields}`);
console.log(`➖ Missing in Output: ${results.missingInOutput}`);
console.log(`➕ Extra in Output: ${results.extraInOutput}`);

const accuracyRate = results.totalFields > 0 ? 
  ((results.matchingFields / results.totalFields) * 100).toFixed(2) : 0;
console.log(`🎯 Accuracy Rate: ${accuracyRate}%`);

// Detailed reports
if (results.structuralDifferences.length > 0) {
  console.log('\n🏗️  STRUCTURAL DIFFERENCES');
  console.log('==========================');
  results.structuralDifferences.slice(0, 20).forEach((diff, index) => {
    console.log(`${index + 1}. ${diff.path}`);
    console.log(`   Issue: ${diff.issue}`);
    if (diff.outputValue !== undefined) console.log(`   Output: ${JSON.stringify(diff.outputValue).slice(0, 100)}...`);
    if (diff.expectedValue !== undefined) console.log(`   Expected: ${JSON.stringify(diff.expectedValue).slice(0, 100)}...`);
    if (diff.outputLength !== undefined) console.log(`   Output Length: ${diff.outputLength}, Expected Length: ${diff.expectedLength}`);
    console.log('');
  });
  if (results.structuralDifferences.length > 20) {
    console.log(`... and ${results.structuralDifferences.length - 20} more structural differences`);
  }
}

if (results.typeDifferences.length > 0) {
  console.log('\n🔢 TYPE DIFFERENCES');
  console.log('===================');
  results.typeDifferences.slice(0, 10).forEach((diff, index) => {
    console.log(`${index + 1}. ${diff.path}`);
    console.log(`   Output Type: ${diff.outputType}, Expected Type: ${diff.expectedType}`);
    console.log(`   Output Value: ${JSON.stringify(diff.outputValue)}`);
    console.log(`   Expected Value: ${JSON.stringify(diff.expectedValue)}`);
    console.log('');
  });
  if (results.typeDifferences.length > 10) {
    console.log(`... and ${results.typeDifferences.length - 10} more type differences`);
  }
}

if (results.dataDifferences.length > 0) {
  console.log('\n📊 DATA DIFFERENCES');
  console.log('===================');
  results.dataDifferences.slice(0, 15).forEach((diff, index) => {
    console.log(`${index + 1}. ${diff.path}`);
    console.log(`   Output: ${JSON.stringify(diff.outputValue)}`);
    console.log(`   Expected: ${JSON.stringify(diff.expectedValue)}`);
    console.log('');
  });
  if (results.dataDifferences.length > 15) {
    console.log(`... and ${results.dataDifferences.length - 15} more data differences`);
  }
}

// Critical fields analysis
console.log('\n🔍 CRITICAL FIELDS ANALYSIS');
console.log('============================');

const criticalFields = [
  'ServiceLevelCode', 'Email', 'OrderId', 'CustomerId', 'OrderSubtotal', 
  'ReleaseTotal', 'TotalCharges', 'CurrencyCode', 'Order.OrderId',
  'Order.Payment', 'Order.ReleaseLine'
];

criticalFields.forEach(field => {
  const outputValue = getNestedValue(outputData, field);
  const expectedValue = getNestedValue(expectedData, field);
  const status = JSON.stringify(outputValue) === JSON.stringify(expectedValue) ? '✅' : '❌';
  console.log(`${status} ${field}: ${status === '✅' ? 'MATCH' : 'DIFFERENT'}`);
  if (status === '❌') {
    console.log(`   Output: ${JSON.stringify(outputValue)}`);
    console.log(`   Expected: ${JSON.stringify(expectedValue)}`);
  }
});

// Array analysis
console.log('\n📋 ARRAY ANALYSIS');
console.log('=================');

const arrayFields = [
  'ChargeDetail', 'Order.Payment', 'Order.ReleaseLine', 
  'Order.Payment[0].PaymentMethod', 'Order.Payment[0].PaymentMethod[0].PaymentTransaction'
];

arrayFields.forEach(field => {
  const outputArray = getNestedValue(outputData, field);
  const expectedArray = getNestedValue(expectedData, field);
  
  if (Array.isArray(outputArray) && Array.isArray(expectedArray)) {
    const status = outputArray.length === expectedArray.length ? '✅' : '❌';
    console.log(`${status} ${field}: Output[${outputArray.length}] vs Expected[${expectedArray.length}]`);
  } else {
    console.log(`❓ ${field}: Not both arrays or not found`);
  }
});

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    if (key.includes('[') && key.includes(']')) {
      const arrayKey = key.substring(0, key.indexOf('['));
      const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
      return current?.[arrayKey]?.[index];
    }
    return current?.[key];
  }, obj);
}

// Final assessment
console.log('\n🎯 FINAL ASSESSMENT');
console.log('===================');

if (results.differentFields === 0 && results.missingInOutput === 0 && results.extraInOutput === 0) {
  console.log('🎉 PERFECT MATCH! All fields are identical.');
} else if (accuracyRate >= 95) {
  console.log('✅ EXCELLENT MATCH! Minor differences detected but overall structure is correct.');
} else if (accuracyRate >= 85) {
  console.log('⚠️  GOOD MATCH with some differences. Review recommended.');
} else {
  console.log('❌ SIGNIFICANT DIFFERENCES detected. Major review required.');
}

console.log(`\n📝 SUMMARY: ${results.matchingFields}/${results.totalFields} fields match (${accuracyRate}%)`);
