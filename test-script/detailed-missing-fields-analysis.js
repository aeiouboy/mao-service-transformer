#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Detailed Missing Fields Analysis Script
 * Extracts ALL missing fields from comparison and categorizes them
 */

class DetailedMissingFieldsAnalysis {
  constructor() {
    this.resultPath = '/Users/chongraktanaka/oms-mapping/release/orderid403521240-C7LDVZNUTGAHMA.json';
    this.samplePath = '/Users/chongraktanaka/oms-mapping/sample_order.json';
    this.missingFields = [];
    this.categorizedFields = {};
  }

  loadFiles() {
    try {
      const resultData = fs.readFileSync(this.resultPath, 'utf8');
      const sampleData = fs.readFileSync(this.samplePath, 'utf8');
      
      this.result = JSON.parse(resultData);
      this.sample = JSON.parse(sampleData);
      
      console.log('📄 Files loaded successfully');
      return true;
    } catch (error) {
      console.error('❌ Error loading files:', error.message);
      return false;
    }
  }

  findMissingFields(sampleObj, resultObj, basePath = '', depth = 0) {
    if (depth > 15) return; // Prevent infinite recursion
    
    for (const key in sampleObj) {
      const currentPath = basePath ? `${basePath}.${key}` : key;
      
      if (!(key in resultObj)) {
        // Field is missing
        this.missingFields.push({
          path: currentPath,
          expectedValue: sampleObj[key],
          type: this.getValueType(sampleObj[key]),
          category: this.categorizeField(currentPath)
        });
        continue;
      }
      
      // If both exist and are objects, recurse
      if (sampleObj[key] && typeof sampleObj[key] === 'object' && !Array.isArray(sampleObj[key]) &&
          resultObj[key] && typeof resultObj[key] === 'object' && !Array.isArray(resultObj[key])) {
        this.findMissingFields(sampleObj[key], resultObj[key], currentPath, depth + 1);
      }
      
      // If both are arrays, check each element
      if (Array.isArray(sampleObj[key]) && Array.isArray(resultObj[key])) {
        for (let i = 0; i < sampleObj[key].length; i++) {
          if (i < resultObj[key].length && 
              sampleObj[key][i] && typeof sampleObj[key][i] === 'object' &&
              resultObj[key][i] && typeof resultObj[key][i] === 'object') {
            this.findMissingFields(sampleObj[key][i], resultObj[key][i], `${currentPath}[${i}]`, depth + 1);
          } else if (i >= resultObj[key].length) {
            // Array element is missing
            this.missingFields.push({
              path: `${currentPath}[${i}]`,
              expectedValue: sampleObj[key][i],
              type: this.getValueType(sampleObj[key][i]),
              category: this.categorizeField(`${currentPath}[${i}]`)
            });
          }
        }
      }
    }
  }

  getValueType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  categorizeField(fieldPath) {
    // Categorize fields by their path
    if (fieldPath.includes('OrderExtension1.Extended')) return 'OrderExtension1.Extended';
    if (fieldPath.includes('ReleaseLine')) return 'ReleaseLine';
    if (fieldPath.includes('Payment')) return 'Payment';
    if (fieldPath.includes('ShippingAddress')) return 'ShippingAddress';
    if (fieldPath.includes('BillingAddress')) return 'BillingAddress';
    if (fieldPath.includes('OrderLine')) return 'OrderLine';
    if (fieldPath.includes('OrderExtension2')) return 'OrderExtension2';
    if (fieldPath.includes('OrderExtension3')) return 'OrderExtension3';
    if (fieldPath.includes('OrderExtension4')) return 'OrderExtension4';
    if (fieldPath.includes('OrderExtension5')) return 'OrderExtension5';
    if (fieldPath.includes('OrderExtension6')) return 'OrderExtension6';
    if (fieldPath.includes('OrderExtension7')) return 'OrderExtension7';
    if (fieldPath.includes('OrderExtension8')) return 'OrderExtension8';
    if (fieldPath.includes('OrderExtension9')) return 'OrderExtension9';
    if (fieldPath.includes('OrderExtension10')) return 'OrderExtension10';
    if (fieldPath.includes('OriginalPayload.Order') && !fieldPath.includes('OrderLine') && !fieldPath.includes('OrderExtension')) return 'Order.Root';
    if (fieldPath.includes('OriginalPayload') && !fieldPath.includes('Order')) return 'OriginalPayload.Root';
    return 'Other';
  }

  categorizeMissingFields() {
    this.categorizedFields = {};
    
    this.missingFields.forEach(field => {
      const category = field.category;
      if (!this.categorizedFields[category]) {
        this.categorizedFields[category] = [];
      }
      this.categorizedFields[category].push(field);
    });
  }

  generateDetailedReport() {
    const reportLines = [];
    
    reportLines.push('='.repeat(100));
    reportLines.push('📊 DETAILED MISSING FIELDS ANALYSIS REPORT');
    reportLines.push('='.repeat(100));
    reportLines.push('');
    reportLines.push(`📈 SUMMARY:`);
    reportLines.push(`   • Total Missing Fields: ${this.missingFields.length}`);
    reportLines.push(`   • Categories Found: ${Object.keys(this.categorizedFields).length}`);
    reportLines.push('');
    
    // Category breakdown
    reportLines.push('📂 CATEGORY BREAKDOWN:');
    Object.keys(this.categorizedFields).sort().forEach(category => {
      const count = this.categorizedFields[category].length;
      reportLines.push(`   • ${category}: ${count} fields`);
    });
    reportLines.push('');
    
    // Detailed field listing by category
    Object.keys(this.categorizedFields).sort().forEach(category => {
      const fields = this.categorizedFields[category];
      reportLines.push(`${'='.repeat(80)}`);
      reportLines.push(`📁 CATEGORY: ${category} (${fields.length} fields)`);
      reportLines.push(`${'='.repeat(80)}`);
      
      fields.forEach((field, index) => {
        reportLines.push(`${index + 1}. Path: ${field.path}`);
        reportLines.push(`   Type: ${field.type}`);
        reportLines.push(`   Expected Value: ${JSON.stringify(field.expectedValue)}`);
        reportLines.push('');
      });
      reportLines.push('');
    });
    
    // JSON structure for easy copying
    reportLines.push(`${'='.repeat(80)}`);
    reportLines.push('📋 COMPLETE MISSING FIELDS LIST (JSON FORMAT)');
    reportLines.push(`${'='.repeat(80)}`);
    reportLines.push('```json');
    reportLines.push(JSON.stringify(this.missingFields, null, 2));
    reportLines.push('```');
    reportLines.push('');
    
    // Field paths only for quick reference
    reportLines.push(`${'='.repeat(80)}`);
    reportLines.push('📝 FIELD PATHS ONLY (FOR QUICK REFERENCE)');
    reportLines.push(`${'='.repeat(80)}`);
    this.missingFields.forEach((field, index) => {
      reportLines.push(`${index + 1}. ${field.path}`);
    });
    
    return reportLines.join('\n');
  }

  saveDetailedReport(report) {
    const reportPath = '/Users/chongraktanaka/oms-mapping/test-script/detailed-missing-fields-report.txt';
    fs.writeFileSync(reportPath, report);
    console.log(`📄 Detailed report saved to: ${reportPath}`);
    
    // Also save JSON version
    const jsonReportPath = '/Users/chongraktanaka/oms-mapping/test-script/missing-fields.json';
    fs.writeFileSync(jsonReportPath, JSON.stringify({
      summary: {
        totalMissingFields: this.missingFields.length,
        categories: Object.keys(this.categorizedFields).length,
        categoryCounts: Object.keys(this.categorizedFields).reduce((acc, cat) => {
          acc[cat] = this.categorizedFields[cat].length;
          return acc;
        }, {})
      },
      categorizedFields: this.categorizedFields,
      allMissingFields: this.missingFields
    }, null, 2));
    console.log(`📄 JSON report saved to: ${jsonReportPath}`);
  }

  async run() {
    console.log('🔍 DETAILED MISSING FIELDS ANALYSIS');
    console.log('📋 Extracting ALL 371 missing fields from comparison\n');
    
    // Load files
    if (!this.loadFiles()) {
      return false;
    }
    
    // Find missing fields
    console.log('🔎 Analyzing missing fields...');
    this.findMissingFields(this.sample, this.result);
    
    // Categorize fields
    console.log('📂 Categorizing fields...');
    this.categorizeMissingFields();
    
    console.log(`✅ Found ${this.missingFields.length} missing fields in ${Object.keys(this.categorizedFields).length} categories`);
    
    // Generate and save report
    console.log('📝 Generating detailed report...');
    const report = this.generateDetailedReport();
    this.saveDetailedReport(report);
    
    // Print summary to console
    console.log('\n' + '='.repeat(80));
    console.log('📊 QUICK SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Missing Fields: ${this.missingFields.length}`);
    console.log('\nTop Categories:');
    Object.entries(this.categorizedFields)
      .sort(([,a], [,b]) => b.length - a.length)
      .slice(0, 10)
      .forEach(([category, fields]) => {
        console.log(`  • ${category}: ${fields.length} fields`);
      });
    
    return true;
  }
}

// Run the analysis
if (require.main === module) {
  const analysis = new DetailedMissingFieldsAnalysis();
  analysis.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Analysis execution failed:', error);
    process.exit(1);
  });
}

module.exports = DetailedMissingFieldsAnalysis;