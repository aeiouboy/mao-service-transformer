#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Test script to compare transformation result with sample order
 * Task 3: Compare /release/orderid403521240-C7LDVZNUTGAHMA.json with /oms-mapping/sample_order.json
 */

class OrderComparisonTest {
  constructor() {
    this.resultPath = '/Users/chongraktanaka/oms-mapping/release/orderid403521240-C7LDVZNUTGAHMA.json';
    this.samplePath = '/Users/chongraktanaka/oms-mapping/sample_order.json';
    this.missingFields = [];
    this.differentFields = [];
    this.passCount = 0;
    this.totalCount = 0;
  }

  loadFiles() {
    try {
      const resultData = fs.readFileSync(this.resultPath, 'utf8');
      const sampleData = fs.readFileSync(this.samplePath, 'utf8');
      
      this.result = JSON.parse(resultData);
      this.sample = JSON.parse(sampleData);
      
      console.log('📄 Files loaded successfully');
      console.log(`📁 Result: ${this.resultPath}`);
      console.log(`📁 Sample: ${this.samplePath}`);
      
      return true;
    } catch (error) {
      console.error('❌ Error loading files:', error.message);
      return false;
    }
  }

  compareValue(path, resultValue, sampleValue, depth = 0) {
    this.totalCount++;
    
    // Handle different data types
    if (typeof resultValue !== typeof sampleValue) {
      this.differentFields.push({
        path,
        expected: `${typeof sampleValue}: ${sampleValue}`,
        actual: `${typeof resultValue}: ${resultValue}`,
        issue: 'Type mismatch'
      });
      return false;
    }

    // For objects, compare recursively
    if (resultValue && typeof resultValue === 'object' && !Array.isArray(resultValue)) {
      return this.compareObject(path, resultValue, sampleValue, depth + 1);
    }

    // For arrays, compare length and elements
    if (Array.isArray(resultValue)) {
      return this.compareArray(path, resultValue, sampleValue, depth + 1);
    }

    // For primitive values, check equality (with some tolerance for numbers)
    if (typeof resultValue === 'number' && typeof sampleValue === 'number') {
      const tolerance = 0.01;
      const isEqual = Math.abs(resultValue - sampleValue) <= tolerance;
      if (!isEqual) {
        this.differentFields.push({
          path,
          expected: sampleValue,
          actual: resultValue,
          issue: 'Number value difference'
        });
      } else {
        this.passCount++;
      }
      return isEqual;
    }

    // For strings and other primitives
    const isEqual = resultValue === sampleValue;
    if (!isEqual) {
      this.differentFields.push({
        path,
        expected: sampleValue,
        actual: resultValue,
        issue: 'Value mismatch'
      });
    } else {
      this.passCount++;
    }
    
    return isEqual;
  }

  compareObject(basePath, resultObj, sampleObj, depth = 0) {
    if (depth > 10) return true; // Prevent infinite recursion
    
    let allMatch = true;
    
    // Check all fields in sample exist in result
    for (const key in sampleObj) {
      const currentPath = basePath ? `${basePath}.${key}` : key;
      
      if (!(key in resultObj)) {
        this.missingFields.push({
          path: currentPath,
          expectedValue: sampleObj[key],
          issue: 'Missing field'
        });
        this.totalCount++;
        allMatch = false;
        continue;
      }
      
      const match = this.compareValue(currentPath, resultObj[key], sampleObj[key], depth);
      if (!match) allMatch = false;
    }
    
    return allMatch;
  }

  compareArray(basePath, resultArray, sampleArray, depth = 0) {
    if (depth > 10) return true; // Prevent infinite recursion
    
    if (resultArray.length !== sampleArray.length) {
      this.differentFields.push({
        path: `${basePath}.length`,
        expected: sampleArray.length,
        actual: resultArray.length,
        issue: 'Array length mismatch'
      });
      this.totalCount++;
      return false;
    }

    let allMatch = true;
    for (let i = 0; i < sampleArray.length; i++) {
      const currentPath = `${basePath}[${i}]`;
      const match = this.compareValue(currentPath, resultArray[i], sampleArray[i], depth);
      if (!match) allMatch = false;
    }
    
    return allMatch;
  }

  runComparison() {
    console.log('\n🔍 Starting detailed comparison...\n');
    
    // Reset counters
    this.missingFields = [];
    this.differentFields = [];
    this.passCount = 0;
    this.totalCount = 0;

    // Compare the main structure
    const isMatch = this.compareObject('', this.result, this.sample);
    
    return {
      isMatch,
      passCount: this.passCount,
      totalCount: this.totalCount,
      missingFields: this.missingFields,
      differentFields: this.differentFields
    };
  }

  generateReport(comparisonResult) {
    const { isMatch, passCount, totalCount, missingFields, differentFields } = comparisonResult;
    const failCount = totalCount - passCount;
    const passRate = totalCount > 0 ? ((passCount / totalCount) * 100).toFixed(1) : '0';

    console.log('=' .repeat(80));
    console.log('📊 COMPARISON REPORT');
    console.log('=' .repeat(80));
    
    // Overall Result
    if (isMatch && missingFields.length === 0 && differentFields.length === 0) {
      console.log('🎉 RESULT: PASS ✅');
      console.log('✅ All fields match exactly with the sample order!');
    } else {
      console.log('❌ RESULT: FAIL ⚠️');
      console.log(`❌ ${failCount + missingFields.length} issues found out of ${totalCount} comparisons`);
    }

    console.log(`\n📈 STATISTICS:`);
    console.log(`   • Pass Rate: ${passRate}% (${passCount}/${totalCount})`);
    console.log(`   • Missing Fields: ${missingFields.length}`);
    console.log(`   • Different Values: ${differentFields.length}`);

    // Missing Fields
    if (missingFields.length > 0) {
      console.log(`\n❗ MISSING FIELDS (${missingFields.length}):`);
      missingFields.slice(0, 10).forEach((missing, index) => {
        console.log(`   ${index + 1}. ${missing.path}`);
        console.log(`      Expected: ${JSON.stringify(missing.expectedValue).substring(0, 100)}...`);
      });
      if (missingFields.length > 10) {
        console.log(`   ... and ${missingFields.length - 10} more missing fields`);
      }
    }

    // Different Values
    if (differentFields.length > 0) {
      console.log(`\n🔄 DIFFERENT VALUES (${differentFields.length}):`);
      differentFields.forEach((diff, index) => {
        console.log(`   ${index + 1}. ${diff.path} (${diff.issue})`);
        console.log(`      Expected: ${JSON.stringify(diff.expected)}`);
        console.log(`      Actual:   ${JSON.stringify(diff.actual)}`);
      });
    }

    // Suggestions
    if (!isMatch || missingFields.length > 0 || differentFields.length > 0) {
      console.log(`\n💡 SUGGESTIONS TO FIX:`);
      
      if (missingFields.length > 0) {
        console.log(`   1. Add missing fields to transformation logic:`);
        missingFields.slice(0, 5).forEach(missing => {
          console.log(`      • ${missing.path}`);
        });
      }
      
      if (differentFields.some(d => d.issue.includes('calculation') || d.issue.includes('Number'))) {
        console.log(`   2. Check calculation formulas in transformation service`);
        console.log(`      • Verify CSV mapping rules are followed correctly`);
        console.log(`      • Check Quantity * UnitPrice vs PackUnitPrice usage`);
      }
      
      if (differentFields.some(d => d.issue.includes('Type'))) {
        console.log(`   3. Fix data type mismatches in DTO classes`);
        console.log(`      • Check string/number/boolean type assignments`);
      }
      
      if (differentFields.some(d => d.path.includes('Timestamp') || d.path.includes('Date'))) {
        console.log(`   4. Standardize timestamp and date formats`);
        console.log(`      • Ensure consistent ISO format usage`);
      }
    }

    console.log('=' .repeat(80));
    return isMatch && missingFields.length === 0 && differentFields.length === 0;
  }

  async run() {
    console.log('🧪 ORDER TRANSFORMATION COMPARISON TEST');
    console.log('📋 Task 3: Compare generated result with sample order\n');
    
    // Load files
    if (!this.loadFiles()) {
      return false;
    }
    
    // Run comparison
    const comparisonResult = this.runComparison();
    
    // Generate report
    const passed = this.generateReport(comparisonResult);
    
    // Return overall result
    return passed;
  }
}

// Run the test
if (require.main === module) {
  const test = new OrderComparisonTest();
  test.run().then(passed => {
    process.exit(passed ? 0 : 1);
  }).catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = OrderComparisonTest;