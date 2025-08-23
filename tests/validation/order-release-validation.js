#!/usr/bin/env node

/**
 * OrderReleaseTemplateTransformerService Comprehensive Validation
 * Validates the service output against JSON templates
 * 
 * Usage: node order-release-validation.js
 */

const fs = require('fs');
const path = require('path');

// Paths configuration
const ACTUAL_OUTPUT_PATH = '/Users/chongraktanaka/Projects/mao-service-transformer/app/release/rel-123456789-C7L2LCDCTCC2AE.json';
const TEMPLATE_PATH = '/Users/chongraktanaka/Projects/mao-service-transformer/release/release-template.json';
const TEMPLATE_INTERFACE_PATH = '/Users/chongraktanaka/Projects/mao-service-transformer/release/release-template.interface.ts';
const DATABASE_ANALYSIS_PATH = '/Users/chongraktanaka/Projects/mao-service-transformer/release/database-real-data-analysis.md';

class OrderReleaseValidator {
    constructor() {
        this.validationResults = {
            timestamp: new Date().toISOString(),
            testName: 'OrderReleaseTemplateTransformerService Validation',
            orderId: '123456789-C7L2LCDCTCC2AE',
            overallStatus: 'PENDING',
            successRate: 0,
            issues: [],
            fieldCoverage: {
                expected: 0,
                found: 0,
                missing: [],
                extra: []
            },
            financialCalculations: {},
            structureValidation: {},
            errorHandling: {},
            recommendations: []
        };
    }

    /**
     * Main validation entry point
     */
    async validate() {
        console.log('🧪 Starting OrderReleaseTemplateTransformerService Validation');
        console.log('=' .repeat(70));

        try {
            // Load and parse actual output
            const actualOutput = this.loadActualOutput();
            console.log(`✅ Loaded actual output: ${(JSON.stringify(actualOutput).length / 1024).toFixed(1)}KB`);

            // Extract expected fields from template
            const expectedFields = this.extractExpectedFields();
            console.log(`📋 Identified ${expectedFields.length} expected template fields`);

            // Perform comprehensive validation
            await this.performFieldCoverageAnalysis(actualOutput, expectedFields);
            await this.validateFinancialCalculations(actualOutput);
            await this.validateStructureAndFormats(actualOutput);
            await this.testErrorHandlingScenarios();

            // Calculate overall results
            this.calculateOverallResults();

            // Generate reports
            this.generateValidationReport();
            this.displaySummary();

            return this.validationResults;

        } catch (error) {
            console.error('❌ Validation failed:', error.message);
            this.validationResults.overallStatus = 'ERROR';
            this.validationResults.issues.push({
                type: 'FATAL_ERROR',
                message: error.message,
                severity: 'CRITICAL'
            });
            throw error;
        }
    }

    /**
     * Load and validate the actual service output
     */
    loadActualOutput() {
        if (!fs.existsSync(ACTUAL_OUTPUT_PATH)) {
            throw new Error(`Actual output file not found: ${ACTUAL_OUTPUT_PATH}`);
        }

        const rawData = fs.readFileSync(ACTUAL_OUTPUT_PATH, 'utf8');
        
        try {
            const parsed = JSON.parse(rawData);
            console.log(`📄 Output file size: ${(rawData.length / 1024).toFixed(1)}KB`);
            return parsed;
        } catch (error) {
            throw new Error(`Invalid JSON in actual output: ${error.message}`);
        }
    }

    /**
     * Extract expected fields from template JSON
     */
    extractExpectedFields() {
        const templateData = fs.readFileSync(TEMPLATE_PATH, 'utf8');
        const fieldMatches = templateData.match(/"(\w+)":\s*[{[]|\{\{(\w+)\}\}/g);
        
        if (!fieldMatches) {
            throw new Error('Could not extract fields from template');
        }

        const fields = new Set();
        fieldMatches.forEach(match => {
            // Extract field names from both "fieldName": and {{fieldName}} patterns
            const fieldMatch = match.match(/"(\w+)":|{{(\w+)}}/);
            if (fieldMatch) {
                const fieldName = fieldMatch[1] || fieldMatch[2];
                if (fieldName && !['actions', 'pk', 'messages'].includes(fieldName)) {
                    fields.add(fieldName);
                }
            }
        });

        return Array.from(fields).sort();
    }

    /**
     * Perform field coverage analysis
     */
    async performFieldCoverageAnalysis(actualOutput, expectedFields) {
        console.log('\n📊 Performing Field Coverage Analysis');
        console.log('-'.repeat(50));

        const actualFields = this.extractFieldsFromObject(actualOutput);
        
        this.validationResults.fieldCoverage.expected = expectedFields.length;
        this.validationResults.fieldCoverage.found = actualFields.size;

        // Find missing fields
        const missing = expectedFields.filter(field => !actualFields.has(field));
        this.validationResults.fieldCoverage.missing = missing;

        // Find extra fields (not expected but present)
        const extra = Array.from(actualFields).filter(field => !expectedFields.includes(field));
        this.validationResults.fieldCoverage.extra = extra;

        // Critical missing fields
        const criticalFields = [
            'orderSubtotal', 'releaseTotal', 'totalCharges', 'totalTaxes', 
            'totalDiscounts', 'orderTotal', 'maxFulfillmentStatusId',
            'minFulfillmentStatusId', 'processInfo'
        ];

        const missingCritical = missing.filter(field => criticalFields.includes(field));
        
        console.log(`📋 Expected fields: ${expectedFields.length}`);
        console.log(`✅ Found fields: ${actualFields.size}`);
        console.log(`❌ Missing fields: ${missing.length}`);
        console.log(`➕ Extra fields: ${extra.length}`);
        
        if (missing.length > 0) {
            console.log(`\n🚨 Missing Fields (${missing.length}):`);
            missing.slice(0, 10).forEach(field => console.log(`   - ${field}`));
            if (missing.length > 10) console.log(`   ... and ${missing.length - 10} more`);
        }

        if (missingCritical.length > 0) {
            console.log(`\n⚠️  Critical Missing Fields (${missingCritical.length}):`);
            missingCritical.forEach(field => console.log(`   - ${field}`));
            
            this.validationResults.issues.push({
                type: 'MISSING_CRITICAL_FIELDS',
                message: `Missing ${missingCritical.length} critical fields: ${missingCritical.join(', ')}`,
                severity: 'CRITICAL',
                fields: missingCritical
            });
        }

        // Calculate coverage percentage
        const coverage = ((expectedFields.length - missing.length) / expectedFields.length) * 100;
        console.log(`📈 Field Coverage: ${coverage.toFixed(1)}%`);
        
        return coverage;
    }

    /**
     * Extract all field names from an object recursively
     */
    extractFieldsFromObject(obj, prefix = '', fields = new Set()) {
        if (typeof obj !== 'object' || obj === null) {
            return fields;
        }

        if (Array.isArray(obj)) {
            // For arrays, check the first element
            if (obj.length > 0) {
                this.extractFieldsFromObject(obj[0], prefix, fields);
            }
            return fields;
        }

        Object.keys(obj).forEach(key => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            fields.add(key); // Add the key itself
            
            // Recursively extract from nested objects
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.extractFieldsFromObject(obj[key], fullKey, fields);
            }
        });

        return fields;
    }

    /**
     * Validate financial calculations
     */
    async validateFinancialCalculations(actualOutput) {
        console.log('\n💰 Validating Financial Calculations');
        console.log('-'.repeat(50));

        const calculations = {
            orderSubtotal: { expected: 0, actual: actualOutput.orderSubtotal, status: 'MISSING' },
            totalCharges: { expected: 0, actual: actualOutput.totalCharges, status: 'MISSING' },
            totalTaxes: { expected: 0, actual: actualOutput.totalTaxes, status: 'MISSING' },
            totalDiscounts: { expected: 0, actual: actualOutput.totalDiscounts, status: 'MISSING' },
            releaseTotal: { expected: 0, actual: actualOutput.releaseTotal, status: 'MISSING' },
            orderTotal: { expected: 0, actual: actualOutput.orderTotal, status: 'MISSING' }
        };

        // Calculate expected values from order lines and release lines
        if (actualOutput.order && actualOutput.order.orderLine) {
            // Calculate order subtotal from order lines
            let calculatedSubtotal = 0;
            actualOutput.order.orderLine.forEach(line => {
                calculatedSubtotal += (line.quantity || 0) * (line.unitPrice || 0);
            });
            calculations.orderSubtotal.expected = calculatedSubtotal;

            console.log(`📊 Calculated order subtotal from ${actualOutput.order.orderLine.length} lines: $${calculatedSubtotal.toFixed(2)}`);
        }

        // Calculate totals from release lines if available
        if (actualOutput.releaseLine) {
            let calculatedTotalTaxes = 0;
            let calculatedTotalDiscounts = 0;
            let calculatedTotalCharges = 0;

            actualOutput.releaseLine.forEach(line => {
                calculatedTotalTaxes += (line.totalTaxes || 0);
                calculatedTotalDiscounts += (line.totalDiscounts || 0);
                calculatedTotalCharges += (line.totalCharges || 0);
            });

            calculations.totalTaxes.expected = calculatedTotalTaxes;
            calculations.totalDiscounts.expected = calculatedTotalDiscounts;
            calculations.totalCharges.expected = calculatedTotalCharges;

            // Calculate release total
            const calculatedReleaseTotal = calculations.orderSubtotal.expected + 
                                        calculatedTotalCharges + 
                                        calculatedTotalTaxes + 
                                        calculatedTotalDiscounts; // discounts are typically negative

            calculations.releaseTotal.expected = calculatedReleaseTotal;
            calculations.orderTotal.expected = calculatedReleaseTotal;

            console.log(`💸 Calculated from ${actualOutput.releaseLine.length} release lines:`);
            console.log(`   - Total Taxes: $${calculatedTotalTaxes.toFixed(2)}`);
            console.log(`   - Total Discounts: $${calculatedTotalDiscounts.toFixed(2)}`);
            console.log(`   - Total Charges: $${calculatedTotalCharges.toFixed(2)}`);
            console.log(`   - Release Total: $${calculatedReleaseTotal.toFixed(2)}`);
        }

        // Validate each calculation
        const tolerance = 0.01; // ±$0.01 tolerance
        let passedCalculations = 0;
        let totalCalculations = 0;

        Object.keys(calculations).forEach(field => {
            const calc = calculations[field];
            totalCalculations++;

            if (calc.actual === undefined || calc.actual === null) {
                calc.status = 'MISSING';
                calc.message = 'Field not present in output';
                console.log(`❌ ${field}: MISSING in output`);
            } else if (Math.abs(calc.expected - calc.actual) <= tolerance) {
                calc.status = 'PASS';
                calc.message = 'Within tolerance';
                console.log(`✅ ${field}: $${calc.actual.toFixed(2)} (expected: $${calc.expected.toFixed(2)})`);
                passedCalculations++;
            } else {
                calc.status = 'FAIL';
                calc.difference = calc.actual - calc.expected;
                calc.message = `Difference: $${calc.difference.toFixed(2)}`;
                console.log(`❌ ${field}: $${calc.actual.toFixed(2)} (expected: $${calc.expected.toFixed(2)}, diff: $${calc.difference.toFixed(2)})`);
            }
        });

        this.validationResults.financialCalculations = calculations;
        
        // Add issues for failed calculations
        const failedCalculations = Object.keys(calculations).filter(key => 
            calculations[key].status === 'FAIL' || calculations[key].status === 'MISSING'
        );

        if (failedCalculations.length > 0) {
            this.validationResults.issues.push({
                type: 'FINANCIAL_CALCULATION_ERRORS',
                message: `${failedCalculations.length} financial calculation errors`,
                severity: 'HIGH',
                fields: failedCalculations
            });
        }

        const calculationAccuracy = (passedCalculations / totalCalculations) * 100;
        console.log(`🧮 Financial Calculation Accuracy: ${calculationAccuracy.toFixed(1)}%`);

        return calculationAccuracy;
    }

    /**
     * Validate structure and data formats
     */
    async validateStructureAndFormats(actualOutput) {
        console.log('\n🏗️  Validating Structure and Formats');
        console.log('-'.repeat(50));

        const validations = {
            dateFormats: { total: 0, valid: 0, invalid: [] },
            arrayFields: { total: 0, valid: 0, invalid: [] },
            requiredStructures: { total: 0, valid: 0, invalid: [] },
            uuidFields: { total: 0, valid: 0, invalid: [] }
        };

        // Validate date formats (ISO 8601)
        const dateFields = this.findDateFields(actualOutput);
        validations.dateFormats.total = dateFields.length;
        
        dateFields.forEach(({path, value}) => {
            const isValidDate = this.isValidISO8601(value);
            if (isValidDate) {
                validations.dateFormats.valid++;
            } else {
                validations.dateFormats.invalid.push({path, value});
            }
        });

        console.log(`📅 Date Formats: ${validations.dateFormats.valid}/${validations.dateFormats.total} valid`);
        if (validations.dateFormats.invalid.length > 0) {
            console.log('   Invalid dates:');
            validations.dateFormats.invalid.slice(0, 3).forEach(({path, value}) => {
                console.log(`     - ${path}: ${value}`);
            });
        }

        // Validate required array structures
        const requiredArrays = ['order.payment', 'order.orderLine', 'releaseLine'];
        requiredArrays.forEach(arrayPath => {
            const arrayData = this.getNestedProperty(actualOutput, arrayPath);
            validations.arrayFields.total++;
            
            if (Array.isArray(arrayData) && arrayData.length > 0) {
                validations.arrayFields.valid++;
                console.log(`✅ ${arrayPath}: ${arrayData.length} items`);
            } else {
                validations.arrayFields.invalid.push(arrayPath);
                console.log(`❌ ${arrayPath}: Missing or empty`);
            }
        });

        // Validate required nested structures
        const requiredStructures = [
            'order', 'order.payment[0]', 'order.orderLine[0]', 'releaseLine[0]',
            'extendedFields'
        ];
        
        requiredStructures.forEach(structurePath => {
            const structure = this.getNestedProperty(actualOutput, structurePath);
            validations.requiredStructures.total++;
            
            if (structure && typeof structure === 'object') {
                validations.requiredStructures.valid++;
                console.log(`✅ Structure ${structurePath}: Present`);
            } else {
                validations.requiredStructures.invalid.push(structurePath);
                console.log(`❌ Structure ${structurePath}: Missing`);
            }
        });

        this.validationResults.structureValidation = validations;

        // Add issues for structural problems
        const structuralIssues = [
            ...validations.arrayFields.invalid,
            ...validations.requiredStructures.invalid
        ];

        if (structuralIssues.length > 0) {
            this.validationResults.issues.push({
                type: 'STRUCTURAL_ISSUES',
                message: `${structuralIssues.length} structural validation failures`,
                severity: 'HIGH',
                fields: structuralIssues
            });
        }

        return validations;
    }

    /**
     * Test error handling scenarios
     */
    async testErrorHandlingScenarios() {
        console.log('\n🚨 Testing Error Handling Scenarios');
        console.log('-'.repeat(50));

        const errorTests = [
            {
                name: 'Non-existent Order ID',
                orderId: 'non-existent-order-id',
                expectedStatus: 404
            },
            {
                name: 'Invalid Order ID Format',
                orderId: 'invalid-format',
                expectedStatus: 400
            },
            {
                name: 'Empty Order ID',
                orderId: '',
                expectedStatus: 400
            }
        ];

        const results = [];
        
        for (const test of errorTests) {
            try {
                console.log(`🧪 Testing: ${test.name}`);
                
                // This would normally make HTTP requests, but since we're in validation mode,
                // we'll simulate the test results
                const result = {
                    testName: test.name,
                    orderId: test.orderId,
                    status: 'SIMULATED',
                    message: 'Error handling test simulated - requires live service'
                };
                
                results.push(result);
                console.log(`   ⚠️  Simulated (requires live API testing)`);
                
            } catch (error) {
                results.push({
                    testName: test.name,
                    orderId: test.orderId,
                    status: 'ERROR',
                    message: error.message
                });
                console.log(`   ❌ Error: ${error.message}`);
            }
        }

        this.validationResults.errorHandling = {
            tests: results,
            summary: 'Error handling tests require live API - simulated for validation'
        };

        return results;
    }

    /**
     * Find date fields in the object
     */
    findDateFields(obj, prefix = '', dates = []) {
        if (typeof obj !== 'object' || obj === null) {
            return dates;
        }

        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                this.findDateFields(item, `${prefix}[${index}]`, dates);
            });
            return dates;
        }

        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const path = prefix ? `${prefix}.${key}` : key;

            if (typeof value === 'string' && this.looksLikeDate(key, value)) {
                dates.push({path, value});
            } else if (typeof value === 'object' && value !== null) {
                this.findDateFields(value, path, dates);
            }
        });

        return dates;
    }

    /**
     * Check if a field name and value look like a date
     */
    looksLikeDate(fieldName, value) {
        const dateFieldPatterns = [
            /date/i, /timestamp/i, /time/i, /created/i, /updated/i, /captured/i
        ];
        
        const hasDateName = dateFieldPatterns.some(pattern => pattern.test(fieldName));
        const hasDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
        
        return hasDateName || hasDateFormat;
    }

    /**
     * Validate ISO 8601 date format
     */
    isValidISO8601(dateString) {
        if (typeof dateString !== 'string') return false;
        
        try {
            const date = new Date(dateString);
            return date.toISOString().substring(0, 19) === dateString.substring(0, 19);
        } catch {
            return false;
        }
    }

    /**
     * Get nested property from object using dot notation
     */
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => {
            if (key.includes('[') && key.includes(']')) {
                const [arrayKey, indexStr] = key.split('[');
                const index = parseInt(indexStr.replace(']', ''), 10);
                return current?.[arrayKey]?.[index];
            }
            return current?.[key];
        }, obj);
    }

    /**
     * Calculate overall validation results
     */
    calculateOverallResults() {
        const totalChecks = this.validationResults.fieldCoverage.expected + 
                           Object.keys(this.validationResults.financialCalculations).length +
                           (this.validationResults.structureValidation.arrayFields?.total || 0) +
                           (this.validationResults.structureValidation.requiredStructures?.total || 0);

        const passedChecks = (this.validationResults.fieldCoverage.expected - this.validationResults.fieldCoverage.missing.length) +
                            Object.values(this.validationResults.financialCalculations).filter(calc => calc.status === 'PASS').length +
                            (this.validationResults.structureValidation.arrayFields?.valid || 0) +
                            (this.validationResults.structureValidation.requiredStructures?.valid || 0);

        this.validationResults.successRate = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;
        
        // Determine overall status
        if (this.validationResults.successRate >= 90) {
            this.validationResults.overallStatus = 'PASS';
        } else if (this.validationResults.successRate >= 70) {
            this.validationResults.overallStatus = 'WARNING';
        } else {
            this.validationResults.overallStatus = 'FAIL';
        }

        // Generate recommendations
        this.generateRecommendations();
    }

    /**
     * Generate recommendations based on validation results
     */
    generateRecommendations() {
        const recommendations = [];

        // Field coverage recommendations
        if (this.validationResults.fieldCoverage.missing.length > 0) {
            recommendations.push({
                priority: 'HIGH',
                category: 'Field Coverage',
                action: `Implement ${this.validationResults.fieldCoverage.missing.length} missing template fields`,
                details: `Missing critical fields: ${this.validationResults.fieldCoverage.missing.slice(0, 5).join(', ')}`,
                estimatedEffort: '4-6 hours'
            });
        }

        // Financial calculations recommendations
        const failedFinancialCalcs = Object.keys(this.validationResults.financialCalculations)
            .filter(key => this.validationResults.financialCalculations[key].status !== 'PASS');

        if (failedFinancialCalcs.length > 0) {
            recommendations.push({
                priority: 'CRITICAL',
                category: 'Financial Calculations',
                action: 'Implement financial aggregation logic',
                details: `Missing calculations for: ${failedFinancialCalcs.join(', ')}`,
                estimatedEffort: '2-4 hours'
            });
        }

        // Error handling recommendations
        recommendations.push({
            priority: 'MEDIUM',
            category: 'Error Handling',
            action: 'Improve error handling and HTTP status codes',
            details: 'Add proper error responses for invalid/missing orders',
            estimatedEffort: '2-3 hours'
        });

        this.validationResults.recommendations = recommendations;
    }

    /**
     * Generate detailed validation report
     */
    generateValidationReport() {
        const reportPath = `/Users/chongraktanaka/Projects/mao-service-transformer/OrderReleaseTemplateTransformerService_Validation_Report.md`;
        
        const reportContent = `# OrderReleaseTemplateTransformerService Validation Report

## Executive Summary

- **Test Date**: ${this.validationResults.timestamp}
- **Service**: OrderReleaseTemplateTransformerService
- **Test Order ID**: ${this.validationResults.orderId}
- **Overall Status**: ${this.validationResults.overallStatus}
- **Success Rate**: ${this.validationResults.successRate.toFixed(1)}%

## Field Coverage Analysis

### Summary
- **Expected Fields**: ${this.validationResults.fieldCoverage.expected}
- **Found Fields**: ${this.validationResults.fieldCoverage.found}
- **Missing Fields**: ${this.validationResults.fieldCoverage.missing.length}
- **Coverage**: ${(((this.validationResults.fieldCoverage.expected - this.validationResults.fieldCoverage.missing.length) / this.validationResults.fieldCoverage.expected) * 100).toFixed(1)}%

### Missing Fields
${this.validationResults.fieldCoverage.missing.map(field => `- \`${field}\``).join('\n')}

## Financial Calculations

${Object.keys(this.validationResults.financialCalculations).map(field => {
    const calc = this.validationResults.financialCalculations[field];
    return `### ${field}
- **Status**: ${calc.status}
- **Expected**: $${calc.expected.toFixed(2)}
- **Actual**: ${calc.actual !== undefined ? '$' + calc.actual.toFixed(2) : 'Missing'}
- **Message**: ${calc.message}`;
}).join('\n\n')}

## Issues Identified

${this.validationResults.issues.map(issue => `### ${issue.type} (${issue.severity})
${issue.message}
${issue.fields ? '**Affected Fields**: ' + issue.fields.join(', ') : ''}
`).join('\n')}

## Recommendations

${this.validationResults.recommendations.map(rec => `### ${rec.category} - ${rec.priority} Priority
**Action**: ${rec.action}
**Details**: ${rec.details}  
**Estimated Effort**: ${rec.estimatedEffort}
`).join('\n')}

## Test Environment
- **Service Endpoint**: POST /api/order/release-template-save
- **Output File**: ${ACTUAL_OUTPUT_PATH}
- **File Size**: ${fs.existsSync(ACTUAL_OUTPUT_PATH) ? (fs.statSync(ACTUAL_OUTPUT_PATH).size / 1024).toFixed(1) + 'KB' : 'Unknown'}

---
*Report generated by OrderReleaseValidator on ${new Date().toLocaleString()}*
`;

        fs.writeFileSync(reportPath, reportContent);
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);

        // Also save JSON results for machine processing
        const jsonReportPath = `/Users/chongraktanaka/Projects/mao-service-transformer/validation-report-${Date.now()}.json`;
        fs.writeFileSync(jsonReportPath, JSON.stringify(this.validationResults, null, 2));
        console.log(`📊 JSON results saved to: ${jsonReportPath}`);
    }

    /**
     * Display validation summary
     */
    displaySummary() {
        console.log('\n' + '='.repeat(70));
        console.log('🎯 VALIDATION SUMMARY');
        console.log('='.repeat(70));
        
        const status = this.validationResults.overallStatus;
        const statusEmoji = {
            'PASS': '✅',
            'WARNING': '⚠️',
            'FAIL': '❌',
            'ERROR': '🚨'
        }[status] || '❓';

        console.log(`\n${statusEmoji} Overall Status: ${status}`);
        console.log(`📊 Success Rate: ${this.validationResults.successRate.toFixed(1)}%`);
        console.log(`🔍 Issues Found: ${this.validationResults.issues.length}`);
        
        // Field coverage summary
        const fieldCoverage = ((this.validationResults.fieldCoverage.expected - this.validationResults.fieldCoverage.missing.length) / this.validationResults.fieldCoverage.expected) * 100;
        console.log(`📋 Field Coverage: ${fieldCoverage.toFixed(1)}% (${this.validationResults.fieldCoverage.found}/${this.validationResults.fieldCoverage.expected})`);
        
        // Financial calculations summary
        const financialPassed = Object.values(this.validationResults.financialCalculations).filter(calc => calc.status === 'PASS').length;
        const financialTotal = Object.keys(this.validationResults.financialCalculations).length;
        console.log(`💰 Financial Calculations: ${((financialPassed / financialTotal) * 100).toFixed(1)}% (${financialPassed}/${financialTotal})`);

        // Priority recommendations
        const highPriorityRecs = this.validationResults.recommendations.filter(rec => rec.priority === 'CRITICAL' || rec.priority === 'HIGH');
        if (highPriorityRecs.length > 0) {
            console.log(`\n🚨 High Priority Actions (${highPriorityRecs.length}):`);
            highPriorityRecs.forEach(rec => {
                console.log(`   ${rec.priority === 'CRITICAL' ? '🔴' : '🟡'} ${rec.action}`);
            });
        }

        console.log('\n' + '='.repeat(70));
        
        if (status === 'FAIL') {
            process.exit(1);
        }
    }
}

// Main execution
async function main() {
    const validator = new OrderReleaseValidator();
    
    try {
        const results = await validator.validate();
        console.log('\n✅ Validation completed successfully');
        return results;
    } catch (error) {
        console.error('\n❌ Validation failed:', error.message);
        process.exit(1);
    }
}

// Run validation if this script is executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { OrderReleaseValidator };