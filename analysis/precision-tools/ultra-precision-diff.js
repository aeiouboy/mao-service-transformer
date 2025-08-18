/**
 * Ultra-Precision Structural Diff Tool
 * Analyzes EXACT structural differences between template and result for perfect matching
 */

const fs = require('fs');
const path = require('path');

class UltraPrecisionDiff {
  constructor() {
    this.differences = [];
    this.pathStack = [];
  }

  /**
   * Main analysis function - compares template vs result with ultra precision
   */
  analyze() {
    console.log('🔍 Ultra-Precision Structural Analysis\n');
    
    try {
      // Load files
      const templatePath = path.join(__dirname, 'data/samples/cancel_fully.json');
      const resultPath = path.join(__dirname, 'release/final-precision-cancel-result.json');
      
      const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
      const result = JSON.parse(fs.readFileSync(resultPath, 'utf-8'));
      
      // File metrics
      const templateLines = JSON.stringify(template, null, 2).split('\n').length;
      const resultLines = JSON.stringify(result, null, 2).split('\n').length;
      const templateSize = fs.statSync(templatePath).size;
      const resultSize = fs.statSync(resultPath).size;
      
      console.log('📊 Target vs Current:');
      console.log(`   • Target: ${templateLines} lines, ${(templateSize/1024).toFixed(2)} KB`);
      console.log(`   • Current: ${resultLines} lines, ${(resultSize/1024).toFixed(2)} KB`);
      console.log(`   • Gap: ${templateLines - resultLines} lines missing, ${((templateSize - resultSize)/1024).toFixed(2)} KB missing\n`);
      
      // Deep structural comparison
      this.compareStructures(template, result, 'ROOT');
      
      // Analyze differences
      this.analyzeDifferences();
      
      // Specific OrderLine analysis
      this.analyzeOrderLineStructure(template, result);
      
      // Generate reconstruction plan
      this.generateReconstructionPlan();
      
      return {
        success: true,
        targetLines: templateLines,
        currentLines: resultLines,
        missingLines: templateLines - resultLines,
        differences: this.differences
      };
      
    } catch (error) {
      console.error('❌ Ultra-precision analysis failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Recursively compare structures with ultra precision
   */
  compareStructures(template, result, path) {
    // Handle null/undefined cases
    if (template === null && result === null) return;
    if (template === null || result === null) {
      this.addDifference('NULL_MISMATCH', path, { template, result });
      return;
    }
    
    // Handle primitive types
    if (typeof template !== 'object' || typeof result !== 'object') {
      if (template !== result) {
        this.addDifference('VALUE_MISMATCH', path, { template, result });
      }
      return;
    }
    
    // Handle arrays
    if (Array.isArray(template) && Array.isArray(result)) {
      this.compareArrays(template, result, path);
      return;
    }
    
    if (Array.isArray(template) !== Array.isArray(result)) {
      this.addDifference('TYPE_MISMATCH', path, { 
        templateType: Array.isArray(template) ? 'array' : 'object',
        resultType: Array.isArray(result) ? 'array' : 'object'
      });
      return;
    }
    
    // Compare objects
    this.compareObjects(template, result, path);
  }

  /**
   * Compare arrays with exact length and content matching
   */
  compareArrays(templateArray, resultArray, path) {
    if (templateArray.length !== resultArray.length) {
      this.addDifference('ARRAY_LENGTH_MISMATCH', path, {
        expectedLength: templateArray.length,
        actualLength: resultArray.length,
        missingItems: templateArray.length - resultArray.length
      });
    }
    
    const maxLength = Math.max(templateArray.length, resultArray.length);
    for (let i = 0; i < maxLength; i++) {
      const itemPath = `${path}[${i}]`;
      if (i >= templateArray.length) {
        this.addDifference('EXTRA_ARRAY_ITEM', itemPath, { item: resultArray[i] });
      } else if (i >= resultArray.length) {
        this.addDifference('MISSING_ARRAY_ITEM', itemPath, { expectedItem: templateArray[i] });
      } else {
        this.compareStructures(templateArray[i], resultArray[i], itemPath);
      }
    }
  }

  /**
   * Compare objects with property order and completeness checking
   */
  compareObjects(templateObj, resultObj, path) {
    const templateKeys = Object.keys(templateObj);
    const resultKeys = Object.keys(resultObj);
    
    // Check for missing properties
    const missingKeys = templateKeys.filter(key => !resultKeys.includes(key));
    const extraKeys = resultKeys.filter(key => !templateKeys.includes(key));
    
    if (missingKeys.length > 0) {
      this.addDifference('MISSING_PROPERTIES', path, { 
        missingKeys, 
        count: missingKeys.length,
        missingValues: Object.fromEntries(missingKeys.map(k => [k, templateObj[k]]))
      });
    }
    
    if (extraKeys.length > 0) {
      this.addDifference('EXTRA_PROPERTIES', path, { 
        extraKeys, 
        count: extraKeys.length,
        extraValues: Object.fromEntries(extraKeys.map(k => [k, resultObj[k]]))
      });
    }
    
    // Check property order (important for exact JSON output matching)
    if (templateKeys.length === resultKeys.length && missingKeys.length === 0) {
      const orderMismatch = templateKeys.some((key, index) => resultKeys[index] !== key);
      if (orderMismatch) {
        this.addDifference('PROPERTY_ORDER_MISMATCH', path, {
          expectedOrder: templateKeys,
          actualOrder: resultKeys
        });
      }
    }
    
    // Recursively compare common properties
    const commonKeys = templateKeys.filter(key => resultKeys.includes(key));
    for (const key of commonKeys) {
      this.compareStructures(templateObj[key], resultObj[key], `${path}.${key}`);
    }
  }

  /**
   * Add a difference to the tracking list
   */
  addDifference(type, path, details) {
    this.differences.push({
      type,
      path,
      details,
      impact: this.estimateLineImpact(type, details)
    });
  }

  /**
   * Estimate how many lines this difference might account for
   */
  estimateLineImpact(type, details) {
    switch (type) {
      case 'MISSING_PROPERTIES':
        return details.count * 2; // Each property typically takes ~2 lines in formatted JSON
      case 'ARRAY_LENGTH_MISMATCH':
        return Math.abs(details.missingItems) * 10; // Arrays items can be complex
      case 'MISSING_ARRAY_ITEM':
        return 10; // Estimated lines per array item
      case 'PROPERTY_ORDER_MISMATCH':
        return 0; // Order doesn't affect line count
      default:
        return 1;
    }
  }

  /**
   * Analyze and categorize all differences
   */
  analyzeDifferences() {
    console.log('🔍 Structural Difference Analysis:\n');
    
    const byType = {};
    let totalEstimatedImpact = 0;
    
    this.differences.forEach(diff => {
      if (!byType[diff.type]) byType[diff.type] = [];
      byType[diff.type].push(diff);
      totalEstimatedImpact += diff.impact;
    });
    
    console.log(`📊 Total Differences Found: ${this.differences.length}`);
    console.log(`📊 Estimated Line Impact: ${totalEstimatedImpact} lines\n`);
    
    // Report by category
    Object.keys(byType).forEach(type => {
      const diffs = byType[type];
      console.log(`📋 ${type} (${diffs.length} occurrences):`);
      
      diffs.slice(0, 5).forEach(diff => {
        const pathShort = diff.path.length > 50 ? diff.path.substring(0, 47) + '...' : diff.path;
        console.log(`   • ${pathShort}`);
        
        if (diff.type === 'MISSING_PROPERTIES' && diff.details.missingKeys.length <= 10) {
          console.log(`     Missing: ${diff.details.missingKeys.join(', ')}`);
        } else if (diff.type === 'ARRAY_LENGTH_MISMATCH') {
          console.log(`     Expected: ${diff.details.expectedLength}, Got: ${diff.details.actualLength}`);
        }
      });
      
      if (diffs.length > 5) {
        console.log(`   ... and ${diffs.length - 5} more\n`);
      } else {
        console.log('');
      }
    });
  }

  /**
   * Specific analysis of OrderLine structure differences
   */
  analyzeOrderLineStructure(template, result) {
    console.log('🔍 OrderLine Structure Deep-Dive:\n');
    
    if (!template.OrderLine || !result.OrderLine || template.OrderLine.length === 0 || result.OrderLine.length === 0) {
      console.log('   ⚠️  OrderLine arrays not found or empty\n');
      return;
    }
    
    console.log(`📊 OrderLine Comparison:`);
    console.log(`   • Template OrderLines: ${template.OrderLine.length}`);
    console.log(`   • Result OrderLines: ${result.OrderLine.length}\n`);
    
    // Analyze first OrderLine in detail
    const templateOL = template.OrderLine[0];
    const resultOL = result.OrderLine[0];
    
    const templateOLKeys = Object.keys(templateOL);
    const resultOLKeys = Object.keys(resultOL);
    const missingOLKeys = templateOLKeys.filter(key => !resultOLKeys.includes(key));
    const extraOLKeys = resultOLKeys.filter(key => !templateOLKeys.includes(key));
    
    console.log(`📋 OrderLine[0] Field Analysis:`);
    console.log(`   • Template fields: ${templateOLKeys.length}`);
    console.log(`   • Result fields: ${resultOLKeys.length}`);
    console.log(`   • Missing: ${missingOLKeys.length} fields`);
    console.log(`   • Extra: ${extraOLKeys.length} fields\n`);
    
    if (missingOLKeys.length > 0) {
      console.log(`❌ Missing OrderLine Fields (${missingOLKeys.length}):`);
      missingOLKeys.slice(0, 15).forEach(key => {
        const value = templateOL[key];
        let valueType = Array.isArray(value) ? `Array[${value.length}]` : typeof value;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          valueType = `Object{${Object.keys(value).length}}`;
        }
        console.log(`   • ${key}: ${valueType}`);
      });
      if (missingOLKeys.length > 15) {
        console.log(`   ... and ${missingOLKeys.length - 15} more\n`);
      } else {
        console.log('');
      }
    }
    
    // Array-specific analysis for OrderLine
    console.log('📋 OrderLine Array Analysis:');
    const arrayFields = templateOLKeys.filter(key => Array.isArray(templateOL[key]));
    arrayFields.forEach(arrayKey => {
      const templateArray = templateOL[arrayKey];
      const resultArray = resultOL[arrayKey] || [];
      console.log(`   • ${arrayKey}: Template[${templateArray.length}] vs Result[${resultArray.length}]`);
      
      if (templateArray.length !== resultArray.length) {
        const diff = templateArray.length - resultArray.length;
        console.log(`     ⚠️  Missing ${diff} items in ${arrayKey}`);
      }
    });
    console.log('');
  }

  /**
   * Generate specific reconstruction plan
   */
  generateReconstructionPlan() {
    console.log('🔧 Reconstruction Plan:\n');
    
    // Group differences by priority
    const criticalDiffs = this.differences.filter(d => 
      d.type === 'MISSING_PROPERTIES' || 
      d.type === 'ARRAY_LENGTH_MISMATCH' || 
      d.type === 'MISSING_ARRAY_ITEM'
    );
    
    const orderDiffs = this.differences.filter(d => d.type === 'PROPERTY_ORDER_MISMATCH');
    
    console.log(`🎯 Priority 1: Critical Structure Issues (${criticalDiffs.length} items)`);
    console.log('   These directly impact line count and must be fixed first:\n');
    
    criticalDiffs.slice(0, 10).forEach((diff, i) => {
      const pathShort = diff.path.length > 40 ? diff.path.substring(0, 37) + '...' : diff.path;
      console.log(`   ${i + 1}. ${diff.type} at ${pathShort} (${diff.impact} lines)`);
      
      if (diff.type === 'MISSING_PROPERTIES') {
        console.log(`      Add: ${diff.details.missingKeys.slice(0, 3).join(', ')}`);
      } else if (diff.type === 'ARRAY_LENGTH_MISMATCH') {
        console.log(`      Fix array length: ${diff.details.actualLength} → ${diff.details.expectedLength}`);
      }
    });
    
    if (criticalDiffs.length > 10) {
      console.log(`   ... and ${criticalDiffs.length - 10} more critical issues\n`);
    } else {
      console.log('');
    }
    
    console.log(`🎯 Priority 2: Property Order Issues (${orderDiffs.length} items)`);
    console.log('   These affect exact JSON matching but not functionality:\n');
    
    orderDiffs.slice(0, 5).forEach((diff, i) => {
      const pathShort = diff.path.length > 40 ? diff.path.substring(0, 37) + '...' : diff.path;
      console.log(`   ${i + 1}. Reorder properties at ${pathShort}`);
    });
    
    if (orderDiffs.length > 5) {
      console.log(`   ... and ${orderDiffs.length - 5} more order issues\n`);
    } else {
      console.log('');
    }
    
    // Specific actionable recommendations
    console.log('📝 Specific Actions Required:\n');
    
    const orderLineDiffs = this.differences.filter(d => d.path.includes('OrderLine'));
    if (orderLineDiffs.length > 0) {
      console.log('   🔧 OrderLine Reconstruction:');
      console.log('      1. Add all missing properties to match template exactly');
      console.log('      2. Fix QuantityDetail arrays to have 6 items each');
      console.log('      3. Ensure OrderLineNote has exactly 3 items each');
      console.log('      4. Match exact property ordering within each OrderLine');
      console.log('');
    }
    
    const arrayDiffs = this.differences.filter(d => d.type === 'ARRAY_LENGTH_MISMATCH');
    if (arrayDiffs.length > 0) {
      console.log('   📋 Array Length Fixes:');
      arrayDiffs.slice(0, 5).forEach(diff => {
        const pathShort = diff.path.length > 40 ? diff.path.substring(0, 37) + '...' : diff.path;
        console.log(`      • ${pathShort}: ${diff.details.actualLength} → ${diff.details.expectedLength}`);
      });
      console.log('');
    }
    
    console.log('🎯 Expected Outcome: Exactly 3,735 lines matching template structure');
  }
}

// Run analysis
if (require.main === module) {
  const analyzer = new UltraPrecisionDiff();
  const result = analyzer.analyze();
  
  console.log('\n🏁 Ultra-Precision Analysis Complete');
  if (result.success) {
    console.log(`   • Target: ${result.targetLines} lines`);
    console.log(`   • Current: ${result.currentLines} lines`);
    console.log(`   • Gap: ${result.missingLines} lines to close`);
    console.log(`   • Differences: ${result.differences.length} structural issues identified`);
    console.log('\n✅ Ready for precision reconstruction');
  } else {
    console.log('   ❌ Analysis failed');
  }
  
  process.exit(result.success ? 0 : 1);
}

module.exports = { UltraPrecisionDiff };