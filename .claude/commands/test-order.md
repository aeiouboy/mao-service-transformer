---
allowed-tools: Bash(cd:*), Bash(npx:*), Bash(node:*), Bash(ls:*), Read, TodoWrite
argument-hint: [optional-order-id]
description: Transform test order and run comparison test against sample
---

# Transform & Test Order Command

You are tasked with running the complete order transformation and testing workflow.

## Context Files
- NestJS Transformation Service: @nestjs-boilerplate/src/common/services/release-order-transformation.service.ts
- Test Script: @test-script/compare-results.js
- Current Release Result: @release/orderid403521240-C7LDVZNUTGAHMA.json

## Current Status
- Project Status: !`ls -la /Users/chongraktanaka/oms-mapping/`
- NestJS Project: !`ls -la /Users/chongraktanaka/oms-mapping/nestjs-boilerplate/src/common/`
- Release Directory: !`ls -la /Users/chongraktanaka/oms-mapping/release/`

## Your Tasks

1. **Setup Task Management**:
   - Create TodoWrite with 3 tasks: transformation, comparison, analysis
   - Track progress through each step

2. **Run Order Transformation**:
   - Check if test-release-order.ts exists, create if missing
   - Navigate to the NestJS project directory
   - Execute the transformation test script
   - Generate the release order JSON file
   - Verify file creation and size

3. **Run Comparison Test**:
   - Execute the comparison test script
   - Compare generated result with sample order
   - Capture detailed test metrics and statistics

4. **Provide Comprehensive Analysis**:
   - Report transformation success/failure with evidence
   - Analyze test results with pass/fail rates and statistics
   - Categorize issues (missing fields, value mismatches, type errors)
   - Prioritize fixes by criticality
   - Provide specific remediation steps

## Enhanced Workflow

### Step 1: Transformation Setup & Execution
```bash
# Create test script if it doesn't exist (automated)
cd /Users/chongraktanaka/oms-mapping/nestjs-boilerplate

# Ensure test script exists and run transformation
npx ts-node src/test-release-order.ts
```

### Step 2: Validation & Comparison
```bash
# Run detailed comparison analysis
cd /Users/chongraktanaka/oms-mapping/test-script
node compare-results.js
```

### Step 3: Results Analysis
- **Pass Rate Calculation**: Report percentage of successful comparisons
- **Issue Categorization**: 
  - Missing Fields (critical for completeness)
  - Value Mismatches (calculation/format issues)
  - Type Mismatches (data type inconsistencies)
- **Priority Classification**:
  - Priority 1: Critical missing fields (breaks functionality)
  - Priority 2: Calculation precision (business logic)
  - Priority 3: Hash/ID generation (consistency)
  - Priority 4: Data type alignment (validation)

## Test Script Template

The transformation test script should:
```typescript
import { ReleaseOrderTransformationService } from './common/services/release-order-transformation.service';
import * as fs from 'fs';

async function runTest() {
  const sampleOrderPath = '/Users/chongraktanaka/oms-mapping/sample_order.json';
  const sampleOrder = JSON.parse(fs.readFileSync(sampleOrderPath, 'utf8'));
  const transformationService = new ReleaseOrderTransformationService();
  
  try {
    const outputPath = await transformationService.saveTransformedOrder(sampleOrder);
    console.log('✅ Transformation completed');
    console.log(`📁 Output: ${outputPath}`);
    
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
    }
  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
    process.exit(1);
  }
}

runTest();
```

## Expected Output Format

### Successful Execution
- ✅ Transformation completion confirmation
- 📁 Output file path and verification
- 📊 File size statistics
- 🧪 Comparison test results with pass/fail metrics
- 🔍 Detailed issue analysis with categorization
- 🛠️ Prioritized remediation recommendations

### Failed Execution
- ❌ Error identification and root cause analysis  
- 🚨 Specific failure points in transformation pipeline
- 💡 Immediate fixes required for basic functionality

Execute this enhanced workflow and provide structured analysis following the priority classification system.