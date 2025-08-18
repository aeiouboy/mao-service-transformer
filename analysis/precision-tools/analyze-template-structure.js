/**
 * Analyze Template Structure - Deep Analysis
 * Compare the detailed structure of template vs our result
 */

const fs = require('fs');
const path = require('path');

function analyzeTemplateStructure() {
  console.log('🔍 Deep Template Structure Analysis\n');
  
  try {
    // Load both files
    const templatePath = path.join(__dirname, 'data/samples/cancel_fully.json');
    const resultPath = path.join(__dirname, 'release/final-cancel-with-6-lines.json');
    
    const template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
    const result = JSON.parse(fs.readFileSync(resultPath, 'utf-8'));
    
    console.log('📊 File Size Comparison:');
    console.log(`   • Template: ${fs.statSync(templatePath).size} bytes`);
    console.log(`   • Result:   ${fs.statSync(resultPath).size} bytes`);
    console.log(`   • Difference: ${fs.statSync(templatePath).size - fs.statSync(resultPath).size} bytes missing`);
    
    console.log('\n📋 Line Count Comparison:');
    const templateLines = JSON.stringify(template, null, 2).split('\n').length;
    const resultLines = JSON.stringify(result, null, 2).split('\n').length;
    console.log(`   • Template: ${templateLines} lines`);
    console.log(`   • Result:   ${resultLines} lines`);
    console.log(`   • Missing:  ${templateLines - resultLines} lines`);
    
    // Focus on OrderLine structure
    console.log('\n📦 OrderLine Structure Analysis:');
    
    if (template.OrderLine && template.OrderLine.length > 0) {
      const templateOrderLine = template.OrderLine[0];
      const resultOrderLine = result.OrderLine && result.OrderLine[0];
      
      console.log(`   • Template OrderLine keys: ${Object.keys(templateOrderLine).length}`);
      if (resultOrderLine) {
        console.log(`   • Result OrderLine keys: ${Object.keys(resultOrderLine).length}`);
        console.log(`   • Missing keys: ${Object.keys(templateOrderLine).length - Object.keys(resultOrderLine).length}`);
      } else {
        console.log(`   • Result OrderLine: MISSING`);
      }
      
      console.log('\n🔍 Template OrderLine Key Analysis:');
      const templateKeys = Object.keys(templateOrderLine);
      const resultKeys = resultOrderLine ? Object.keys(resultOrderLine) : [];
      
      // Find missing keys
      const missingKeys = templateKeys.filter(key => !resultKeys.includes(key));
      const extraKeys = resultKeys.filter(key => !templateKeys.includes(key));
      
      console.log(`\n❌ Missing Keys in Result OrderLine (${missingKeys.length}):`);
      missingKeys.slice(0, 20).forEach(key => {
        const value = templateOrderLine[key];
        let valueType = Array.isArray(value) ? `Array[${value.length}]` : typeof value;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          valueType = `Object{${Object.keys(value).length} keys}`;
        }
        console.log(`   • ${key}: ${valueType}`);
      });
      
      if (missingKeys.length > 20) {
        console.log(`   ... and ${missingKeys.length - 20} more keys`);
      }
      
      if (extraKeys.length > 0) {
        console.log(`\n➕ Extra Keys in Result OrderLine (${extraKeys.length}):`);
        extraKeys.forEach(key => {
          console.log(`   • ${key}`);
        });
      }
      
      // Analyze array fields specifically
      console.log('\n📋 Array Fields in Template OrderLine:');
      templateKeys.forEach(key => {
        const value = templateOrderLine[key];
        if (Array.isArray(value)) {
          console.log(`   • ${key}: Array[${value.length} items]`);
          if (value.length > 0 && typeof value[0] === 'object') {
            console.log(`     - Item structure: ${Object.keys(value[0]).length} keys`);
            if (value[0] && Object.keys(value[0]).length > 0) {
              const itemKeys = Object.keys(value[0]).slice(0, 5).join(', ');
              console.log(`     - Sample keys: ${itemKeys}${Object.keys(value[0]).length > 5 ? '...' : ''}`);
            }
          }
        }
      });
      
      // Sample one complex nested structure
      console.log('\n🏗️ Complex Nested Structure Example:');
      if (templateOrderLine.OrderLineNote && templateOrderLine.OrderLineNote.length > 0) {
        const note = templateOrderLine.OrderLineNote[0];
        console.log(`   OrderLineNote[0] structure:`);
        console.log(`   • Keys: ${Object.keys(note).length}`);
        console.log(`   • Sample: ${Object.keys(note).slice(0, 8).join(', ')}`);
        
        if (note.NoteType) {
          console.log(`   • Nested NoteType: ${Object.keys(note.NoteType).join(', ')}`);
        }
        if (note.NoteCategory) {
          console.log(`   • Nested NoteCategory: ${Object.keys(note.NoteCategory).join(', ')}`);
        }
      }
    }
    
    console.log('\n🎯 Key Findings:');
    console.log('   1. Our OrderLine objects are missing most template fields');
    console.log('   2. Template has complex nested arrays (OrderLineNote, OrderLineCancelHistory, etc.)');
    console.log('   3. Missing product/item metadata (ItemBrand, ItemStyle, etc.)');
    console.log('   4. Missing fulfillment details (ShippingMethodId, ReleaseGroupId, etc.)');
    console.log('   5. Missing business logic fields (IsPerishable, IsExchangeable, etc.)');
    
    return {
      templateSize: fs.statSync(templatePath).size,
      resultSize: fs.statSync(resultPath).size,
      templateLines: templateLines,
      resultLines: resultLines,
      missingLines: templateLines - resultLines
    };
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the analysis
if (require.main === module) {
  const analysis = analyzeTemplateStructure();
  
  console.log('\n📈 Summary:');
  if (analysis.templateSize) {
    console.log(`   • Template complexity: ${analysis.templateLines} lines, ${(analysis.templateSize/1024).toFixed(2)} KB`);
    console.log(`   • Our result: ${analysis.resultLines} lines, ${(analysis.resultSize/1024).toFixed(2)} KB`);
    console.log(`   • Missing detail: ${analysis.missingLines} lines (~${((analysis.templateSize - analysis.resultSize)/1024).toFixed(2)} KB)`);
    console.log(`   • Completion: ${((analysis.resultSize/analysis.templateSize)*100).toFixed(1)}%`);
  }
  
  console.log('\n🔧 Next Steps:');
  console.log('   1. Update CancelFieldMappingService to include all missing OrderLine fields');
  console.log('   2. Add proper nested arrays (OrderLineNote, OrderLineCancelHistory, etc.)');
  console.log('   3. Include product/item metadata from source data');
  console.log('   4. Add all business logic fields with proper values');
  
  process.exit(0);
}

module.exports = { analyzeTemplateStructure };