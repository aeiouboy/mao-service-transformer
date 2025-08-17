#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Deep structural analysis to find where 262 lines are missing
 * Current: 1,932 lines -> Target: 2,194 lines (+262 lines needed)
 */

function analyzeStructuralDifferences() {
  console.log('=== MAO Transformer Phase 2 Iteration 4: Line Gap Analysis ===');
  console.log('Current: 1,932 lines | Target: 2,194 lines | Gap: +262 lines needed\n');

  // Read both files
  const currentFile = '/Users/chongraktanaka/Projects/mao-service-transformer/release/orderid403521240-C7LDVZNUTGAHMA.json';
  const targetFile = '/Users/chongraktanaka/Projects/mao-service-transformer/release/release-output.json';

  if (!fs.existsSync(currentFile) || !fs.existsSync(targetFile)) {
    console.error('❌ Files not found');
    return;
  }

  const current = JSON.parse(fs.readFileSync(currentFile, 'utf8'));
  const target = JSON.parse(fs.readFileSync(targetFile, 'utf8'));

  // Structural comparison
  console.log('📊 STRUCTURAL ANALYSIS:\n');

  // 1. Top-level structure comparison
  console.log('1. TOP-LEVEL STRUCTURE:');
  const currentKeys = Object.keys(current.OriginalPayload);
  const targetKeys = Object.keys(target.OriginalPayload);
  console.log(`   Current keys: ${currentKeys.length}`);
  console.log(`   Target keys: ${targetKeys.length}`);
  console.log(`   Key difference: ${targetKeys.length - currentKeys.length}`);

  // Find missing top-level keys
  const missingTopLevel = targetKeys.filter(key => !currentKeys.includes(key));
  const extraTopLevel = currentKeys.filter(key => !targetKeys.includes(key));
  if (missingTopLevel.length > 0) {
    console.log(`   ❌ Missing keys: ${missingTopLevel.join(', ')}`);
  }
  if (extraTopLevel.length > 0) {
    console.log(`   ➕ Extra keys: ${extraTopLevel.join(', ')}`);
  }

  // 2. Array length analysis
  console.log('\n2. ARRAY LENGTH ANALYSIS:');
  
  // ReleaseLine array
  const currentReleaseLines = current.OriginalPayload.ReleaseLine || [];
  const targetReleaseLines = target.OriginalPayload.ReleaseLine || [];
  console.log(`   ReleaseLine: Current=${currentReleaseLines.length}, Target=${targetReleaseLines.length}, Diff=${targetReleaseLines.length - currentReleaseLines.length}`);

  // ChargeDetail array  
  const currentChargeDetail = current.OriginalPayload.ChargeDetail || [];
  const targetChargeDetail = target.OriginalPayload.ChargeDetail || [];
  console.log(`   ChargeDetail: Current=${currentChargeDetail.length}, Target=${targetChargeDetail.length}, Diff=${targetChargeDetail.length - currentChargeDetail.length}`);

  // TaxDetail array
  const currentTaxDetail = current.OriginalPayload.TaxDetail || [];
  const targetTaxDetail = target.OriginalPayload.TaxDetail || [];
  console.log(`   TaxDetail: Current=${currentTaxDetail.length}, Target=${targetTaxDetail.length}, Diff=${targetTaxDetail.length - currentTaxDetail.length}`);

  // Note array
  const currentNote = current.OriginalPayload.Note || [];
  const targetNote = target.OriginalPayload.Note || [];
  console.log(`   Note: Current=${currentNote.length}, Target=${targetNote.length}, Diff=${targetNote.length - currentNote.length}`);

  // Order.OrderChargeDetail
  const currentOrderChargeDetail = current.OriginalPayload.Order?.OrderChargeDetail || [];
  const targetOrderChargeDetail = target.OriginalPayload.Order?.OrderChargeDetail || [];
  console.log(`   Order.OrderChargeDetail: Current=${currentOrderChargeDetail.length}, Target=${targetOrderChargeDetail.length}, Diff=${targetOrderChargeDetail.length - currentOrderChargeDetail.length}`);

  // 3. ReleaseLine deep analysis
  console.log('\n3. RELEASELINE DEEP ANALYSIS:');
  if (currentReleaseLines.length === targetReleaseLines.length) {
    // Same number of lines, check internal structures
    for (let i = 0; i < currentReleaseLines.length; i++) {
      const currentLine = currentReleaseLines[i];
      const targetLine = targetReleaseLines[i];

      // ChargeDetail within each ReleaseLine
      const currentLineCharges = currentLine.ChargeDetail || [];
      const targetLineCharges = targetLine.ChargeDetail || [];
      if (currentLineCharges.length !== targetLineCharges.length) {
        console.log(`   Line ${i + 1} ChargeDetail: Current=${currentLineCharges.length}, Target=${targetLineCharges.length}, Diff=${targetLineCharges.length - currentLineCharges.length}`);
      }

      // OrderLineChargeDetail within each ReleaseLine
      const currentOrderLineCharges = currentLine.OrderLine?.OrderLineChargeDetail || [];
      const targetOrderLineCharges = targetLine.OrderLine?.OrderLineChargeDetail || [];
      if (currentOrderLineCharges.length !== targetOrderLineCharges.length) {
        console.log(`   Line ${i + 1} OrderLineChargeDetail: Current=${currentOrderLineCharges.length}, Target=${targetOrderLineCharges.length}, Diff=${targetOrderLineCharges.length - currentOrderLineCharges.length}`);
      }

      // Check for structural field differences
      const currentLineKeys = Object.keys(currentLine);
      const targetLineKeys = Object.keys(targetLine);
      const missingLineKeys = targetLineKeys.filter(key => !currentLineKeys.includes(key));
      if (missingLineKeys.length > 0) {
        console.log(`   Line ${i + 1} missing fields: ${missingLineKeys.join(', ')}`);
      }
    }
  }

  // 4. Property depth analysis
  console.log('\n4. PROPERTY DEPTH ANALYSIS:');
  
  // Count total properties recursively
  function countProperties(obj, depth = 0) {
    if (typeof obj !== 'object' || obj === null) return 0;
    if (Array.isArray(obj)) {
      return obj.reduce((sum, item) => sum + countProperties(item, depth + 1), 0);
    }
    return Object.keys(obj).reduce((sum, key) => {
      return sum + 1 + countProperties(obj[key], depth + 1);
    }, 0);
  }

  const currentPropertyCount = countProperties(current);
  const targetPropertyCount = countProperties(target);
  console.log(`   Current total properties: ${currentPropertyCount}`);
  console.log(`   Target total properties: ${targetPropertyCount}`);
  console.log(`   Property difference: ${targetPropertyCount - currentPropertyCount}`);

  // 5. JSON string length analysis (rough estimation)
  console.log('\n5. JSON SIZE ANALYSIS:');
  const currentJson = JSON.stringify(current, null, 2);
  const targetJson = JSON.stringify(target, null, 2);
  const currentLines = currentJson.split('\n').length;
  const targetLines = targetJson.split('\n').length;
  console.log(`   Current JSON lines: ${currentLines}`);
  console.log(`   Target JSON lines: ${targetLines}`);
  console.log(`   Actual line difference: ${targetLines - currentLines}`);

  // 6. Specific section analysis
  console.log('\n6. SECTION-BY-SECTION ANALYSIS:');
  
  // Estimate lines per section
  function estimateLines(obj) {
    return JSON.stringify(obj, null, 2).split('\n').length;
  }

  const sections = [
    'ExtendedFields',
    'Order',
    'ChargeDetail', 
    'Note',
    'ReleaseLine',
    'PaymentMethod'
  ];

  let totalDiff = 0;
  sections.forEach(section => {
    const currentSection = current.OriginalPayload[section];
    const targetSection = target.OriginalPayload[section];
    
    if (currentSection && targetSection) {
      const currentSectionLines = estimateLines(currentSection);
      const targetSectionLines = estimateLines(targetSection);
      const diff = targetSectionLines - currentSectionLines;
      console.log(`   ${section}: Current=${currentSectionLines} lines, Target=${targetSectionLines} lines, Diff=${diff}`);
      totalDiff += diff;
    }
  });

  console.log(`\n📈 SUMMARY:`)
  console.log(`   Total estimated difference: ${totalDiff} lines`);
  console.log(`   Actual gap to fill: 262 lines`);
  console.log(`   Analysis accuracy: ${Math.round((Math.min(totalDiff, 262) / 262) * 100)}%`);

  // 7. Priority recommendations
  console.log('\n🎯 PRIORITY RECOMMENDATIONS:');
  console.log('   Based on the analysis above, focus on:');
  console.log('   1. Sections with the largest line differences');
  console.log('   2. Arrays that need more elements');
  console.log('   3. Objects that need more properties');
  console.log('   4. Missing fields identified in the comparison');
}

// Run the analysis
try {
  analyzeStructuralDifferences();
} catch (error) {
  console.error('❌ Analysis failed:', error.message);
  console.error(error.stack);
}