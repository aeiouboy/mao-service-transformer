#!/usr/bin/env node

const fs = require('fs');

/**
 * Detailed Gap Analysis - Phase 2 Iteration 4
 * Focus on the specific areas where 262 lines need to be added
 */

function analyzeSpecificGaps() {
  console.log('=== DETAILED GAP ANALYSIS: 262 Lines to Add ===\n');

  const currentFile = '/Users/chongraktanaka/Projects/mao-service-transformer/release/orderid403521240-C7LDVZNUTGAHMA.json';
  const targetFile = '/Users/chongraktanaka/Projects/mao-service-transformer/release/release-output.json';

  const current = JSON.parse(fs.readFileSync(currentFile, 'utf8'));
  const target = JSON.parse(fs.readFileSync(targetFile, 'utf8'));

  console.log('🎯 TOP PRIORITY AREAS (Biggest Impact):');
  console.log('==========================================\n');

  // 1. ReleaseLine section analysis (+263 lines needed)
  console.log('1. RELEASELINE SECTION (+263 lines):');
  console.log('   This is the PRIMARY area needing expansion\n');

  const currentReleaseLines = current.OriginalPayload.ReleaseLine || [];
  const targetReleaseLines = target.OriginalPayload.ReleaseLine || [];

  for (let i = 0; i < Math.max(currentReleaseLines.length, targetReleaseLines.length); i++) {
    const currentLine = currentReleaseLines[i];
    const targetLine = targetReleaseLines[i];

    if (currentLine && targetLine) {
      console.log(`   Line ${i + 1} (${currentLine.ItemId}):`)

      // Missing ItemSize field
      if (!currentLine.ItemSize && targetLine.ItemSize) {
        console.log(`      ➕ ADD: ItemSize = "${targetLine.ItemSize}" (~2 lines)`);
      }

      // ChargeDetail differences
      const currentCharges = currentLine.ChargeDetail || [];
      const targetCharges = targetLine.ChargeDetail || [];
      if (currentCharges.length < targetCharges.length) {
        console.log(`      ➕ ADD: ${targetCharges.length - currentCharges.length} more ChargeDetail entries (~${(targetCharges.length - currentCharges.length) * 15} lines)`);
      }

      // OrderLineChargeDetail differences  
      const currentOrderCharges = currentLine.OrderLine?.OrderLineChargeDetail || [];
      const targetOrderCharges = targetLine.OrderLine?.OrderLineChargeDetail || [];
      if (currentOrderCharges.length < targetOrderCharges.length) {
        console.log(`      ➕ ADD: ${targetOrderCharges.length - currentOrderCharges.length} more OrderLineChargeDetail entries (~${(targetOrderCharges.length - currentOrderCharges.length) * 48} lines)`);
      }

      // Check for other missing properties
      const currentKeys = Object.keys(currentLine);
      const targetKeys = Object.keys(targetLine);
      const missingKeys = targetKeys.filter(key => !currentKeys.includes(key));
      missingKeys.forEach(key => {
        if (key !== 'ItemSize') { // Already covered above
          const value = targetLine[key];
          const estimatedLines = typeof value === 'object' ? JSON.stringify(value, null, 2).split('\n').length : 1;
          console.log(`      ➕ ADD: ${key} (~${estimatedLines} lines)`);
        }
      });
    }
  }

  // 2. Analyze the specific missing ChargeDetail entries
  console.log('\n2. MISSING CHARGEDETAIL ENTRIES:');
  console.log('   Each ReleaseLine needs 1 additional ChargeDetail\n');

  for (let i = 0; i < targetReleaseLines.length; i++) {
    const targetCharges = targetReleaseLines[i].ChargeDetail || [];
    const currentCharges = currentReleaseLines[i]?.ChargeDetail || [];
    
    if (targetCharges.length > currentCharges.length) {
      const missingCharge = targetCharges[targetCharges.length - 1]; // Last entry is usually the missing one
      console.log(`   Line ${i + 1} needs ChargeDetail entry:`);
      console.log(`      ChargeDisplayName: "${missingCharge.ChargeDisplayName}"`);
      console.log(`      ChargeTypeId: "${missingCharge.ChargeType?.ChargeTypeId}"`);
      console.log(`      ChargeTotal: ${missingCharge.ChargeTotal}`);
      console.log(`      TaxCode: "${missingCharge.TaxCode}"`);
      console.log(`      (~15-20 lines per entry)\n`);
    }
  }

  // 3. Analyze missing OrderLineChargeDetail entries
  console.log('3. MISSING ORDERLINECHARGEDETAIL ENTRIES:');
  console.log('   Lines 2 & 3 need 1 additional OrderLineChargeDetail each\n');

  for (let i = 1; i < targetReleaseLines.length; i++) { // Start from line 2 (index 1)
    const targetOrderCharges = targetReleaseLines[i].OrderLine?.OrderLineChargeDetail || [];
    const currentOrderCharges = currentReleaseLines[i]?.OrderLine?.OrderLineChargeDetail || [];
    
    if (targetOrderCharges.length > currentOrderCharges.length) {
      const missingCharge = targetOrderCharges[targetOrderCharges.length - 1];
      console.log(`   Line ${i + 1} needs OrderLineChargeDetail entry:`);
      console.log(`      ChargeDisplayName: "${missingCharge.ChargeDisplayName}"`);
      console.log(`      ChargeType.ChargeTypeId: "${missingCharge.ChargeType?.ChargeTypeId}"`);
      console.log(`      TaxCode: "${missingCharge.TaxCode}"`);
      console.log(`      (~48 lines per entry)\n`);
    }
  }

  // 4. Calculate line impact
  console.log('4. ESTIMATED LINE IMPACT:');
  console.log('========================\n');

  let totalEstimatedLines = 0;

  // ItemSize fields (3 instances)
  const itemSizeLines = 3 * 2; // 2 lines per ItemSize field
  totalEstimatedLines += itemSizeLines;
  console.log(`   ItemSize fields (3x): +${itemSizeLines} lines`);

  // ChargeDetail entries (2 missing entries)  
  const chargeDetailLines = 2 * 15; // ~15 lines per ChargeDetail
  totalEstimatedLines += chargeDetailLines;
  console.log(`   ChargeDetail entries (2x): +${chargeDetailLines} lines`);

  // OrderLineChargeDetail entries (2 missing entries)
  const orderChargeLines = 2 * 48; // ~48 lines per OrderLineChargeDetail
  totalEstimatedLines += orderChargeLines;
  console.log(`   OrderLineChargeDetail entries (2x): +${orderChargeLines} lines`);

  // Additional structural differences
  const structuralLines = 262 - totalEstimatedLines;
  console.log(`   Additional structural differences: +${structuralLines} lines`);

  console.log(`\n   TOTAL ESTIMATED: +${totalEstimatedLines} lines`);
  console.log(`   TARGET NEEDED: +262 lines`);
  console.log(`   ACCURACY: ${Math.round((Math.min(totalEstimatedLines, 262) / 262) * 100)}%`);

  // 5. Action plan
  console.log('\n🚀 IMPLEMENTATION ACTION PLAN:');
  console.log('==============================\n');

  console.log('Priority 1: Add ItemSize field to all 3 ReleaseLine entries (+6 lines)');
  console.log('Priority 2: Add 4th ChargeDetail to ReleaseLine[1] and ReleaseLine[2] (+30 lines)');
  console.log('Priority 3: Add 4th OrderLineChargeDetail to ReleaseLine[1] and ReleaseLine[2] (+96 lines)');
  console.log('Priority 4: Investigate and add remaining structural differences (+130 lines)');

  console.log('\nThis analysis provides the specific locations and content needed to reach 2,194 lines.');
}

// Run the detailed analysis
try {
  analyzeSpecificGaps();
} catch (error) {
  console.error('❌ Analysis failed:', error.message);
}