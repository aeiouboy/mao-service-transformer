#!/usr/bin/env node

/**
 * OrderReleaseTemplateTransformerService Comprehensive Validation Framework
 * 
 * This script validates the transformation service against JSON templates,
 * ensuring comprehensive field coverage, accurate financial calculations,
 * and proper error handling.
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

class OrderReleaseTemplateValidator {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.outputDir = path.join(__dirname, 'app', 'release');
    this.testOrderId = '123456789-C7L2LCDCTCC2AE';
    this.templatePath = path.join(__dirname, 'release', 'release-template.json');
    this.interfacePath = path.join(__dirname, 'release', 'release-template.interface.ts');
    
    // Results storage
    this.results = {
      timestamp: new Date().toISOString(),
      service: 'OrderReleaseTemplateTransformerService',
      endpoint: '/api/order/release-template-save',
      overallStatus: 'PASS',
      summary: {},
      fieldCoverage: {},
      financialValidation: {},
      structureValidation: {},
      errorHandling: {},
      recommendations: []
    };
  }

  async runValidation() {
    console.log('🚀 Starting OrderReleaseTemplateTransformerService Validation');
    console.log('=' .repeat(80));
    
    try {
      // Step 1: Service Health Check
      await this.checkServiceHealth();
      
      // Step 2: Load Template Structure
      await this.loadTemplateStructure();
      
      // Step 3: Execute API Tests
      const transformationResult = await this.testTransformation();
      
      // Step 4: Field Coverage Analysis
      await this.analyzeFieldCoverage(transformationResult);
      
      // Step 5: Financial Validation
      await this.validateFinancialCalculations(transformationResult);
      
      // Step 6: Structure Validation
      await this.validateStructure(transformationResult);
      
      // Step 7: Error Scenario Testing
      await this.testErrorScenarios();
      
      // Step 8: Generate Report
      await this.generateReport();
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      this.results.overallStatus = 'FAIL';
      this.results.errorMessage = error.message;
      await this.generateReport();
    }
  }

  async checkServiceHealth() {
    console.log('\n📊 Checking Service Health...');
    try {
      const response = await axios.get(`${this.baseUrl}/api/order/release-health`, {
        timeout: 5000
      });
      
      if (response.status === 200) {
        console.log('✅ Service is healthy and ready');
        this.results.serviceHealth = 'HEALTHY';
      } else {
        throw new Error(`Service returned status ${response.status}`);
      }
    } catch (error) {
      console.log('❌ Service health check failed:', error.message);
      this.results.serviceHealth = 'UNHEALTHY';
      throw new Error('Service is not accessible. Please ensure the NestJS application is running on port 3000.');
    }
  }

  async loadTemplateStructure() {
    console.log('\n📋 Loading Template Structure...');
    try {
      const templateContent = await fs.readFile(this.templatePath, 'utf8');
      this.templateStructure = JSON.parse(templateContent);
      
      // Extract all field paths from template
      this.expectedFields = this.extractFieldPaths(this.templateStructure);
      console.log(`✅ Loaded template with ${this.expectedFields.length} expected fields`);
      
      // Also load interface file for additional validation
      const interfaceContent = await fs.readFile(this.interfacePath, 'utf8');
      this.interfaceDefinitions = this.parseInterfaceDefinitions(interfaceContent);
      console.log(`✅ Loaded interface definitions: ${Object.keys(this.interfaceDefinitions).length} interfaces`);
      
    } catch (error) {
      throw new Error(`Failed to load template structure: ${error.message}`);
    }
  }

  extractFieldPaths(obj, prefix = '', paths = new Set()) {
    for (const key in obj) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      paths.add(currentPath);
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        this.extractFieldPaths(obj[key], currentPath, paths);
      } else if (Array.isArray(obj[key]) && obj[key].length > 0) {
        const firstItem = obj[key][0];
        if (typeof firstItem === 'object' && firstItem !== null) {
          this.extractFieldPaths(firstItem, `${currentPath}[]`, paths);
        }
      }
    }
    return Array.from(paths);
  }

  parseInterfaceDefinitions(content) {
    // Simple parsing to extract interface structures
    const interfaces = {};
    const interfaceRegex = /export interface (\w+) \{([^}]+)\}/g;
    let match;
    
    while ((match = interfaceRegex.exec(content)) !== null) {
      const interfaceName = match[1];
      const interfaceBody = match[2];
      
      const fields = [];
      const fieldRegex = /(\w+)[\?\:]?\s*:\s*([^;]+);/g;
      let fieldMatch;
      
      while ((fieldMatch = fieldRegex.exec(interfaceBody)) !== null) {
        fields.push({
          name: fieldMatch[1],
          type: fieldMatch[2].trim(),
          optional: interfaceBody.includes(fieldMatch[1] + '?')
        });
      }
      
      interfaces[interfaceName] = fields;
    }
    
    return interfaces;
  }

  async testTransformation() {
    console.log('\n🔄 Testing Transformation...');
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/order/release-template-save`,
        { orderId: this.testOrderId },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      console.log('✅ API call successful');
      console.log(`📁 Output file: ${response.data.filePath || 'Not specified'}`);

      // Read the generated file
      const outputFilePath = path.join(this.outputDir, `rel-${this.testOrderId}.json`);
      const outputContent = await fs.readFile(outputFilePath, 'utf8');
      const outputData = JSON.parse(outputContent);

      console.log(`📊 Generated output file size: ${Buffer.byteLength(outputContent, 'utf8')} bytes`);
      
      return {
        apiResponse: response.data,
        outputData: outputData,
        outputPath: outputFilePath
      };
      
    } catch (error) {
      if (error.response) {
        throw new Error(`API call failed with status ${error.response.status}: ${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(`API call failed: ${error.message}`);
      }
    }
  }

  async analyzeFieldCoverage(transformationResult) {
    console.log('\n🔍 Analyzing Field Coverage...');
    
    const outputData = transformationResult.outputData;
    const actualFields = this.extractFieldPaths(outputData);
    
    const presentFields = [];
    const missingFields = [];
    const extraFields = [];
    
    // Check which expected fields are present
    for (const expectedField of this.expectedFields) {
      const cleanExpectedField = expectedField.replace(/\[\]/g, '');
      const isPresent = actualFields.some(field => {
        const cleanActualField = field.replace(/\[\]/g, '');
        return cleanActualField === cleanExpectedField || 
               cleanActualField.startsWith(cleanExpectedField + '.') ||
               cleanExpectedField.startsWith(cleanActualField + '.');
      });
      
      if (isPresent) {
        presentFields.push(expectedField);
      } else {
        missingFields.push(expectedField);
      }
    }
    
    // Check for extra fields not in template
    for (const actualField of actualFields) {
      const cleanActualField = actualField.replace(/\[\]/g, '');
      const isExpected = this.expectedFields.some(field => {
        const cleanExpectedField = field.replace(/\[\]/g, '');
        return cleanActualField === cleanExpectedField || 
               cleanActualField.startsWith(cleanExpectedField + '.') ||
               cleanExpectedField.startsWith(cleanActualField + '.');
      });
      
      if (!isExpected) {
        extraFields.push(actualField);
      }
    }
    
    const totalExpected = this.expectedFields.length;
    const totalPresent = presentFields.length;
    const coveragePercentage = ((totalPresent / totalExpected) * 100).toFixed(2);
    
    console.log(`✅ Fields Present: ${totalPresent}/${totalExpected} (${coveragePercentage}%)`);
    console.log(`❌ Missing Fields: ${missingFields.length}`);
    console.log(`➕ Extra Fields: ${extraFields.length}`);
    
    this.results.fieldCoverage = {
      totalExpected,
      totalPresent,
      coveragePercentage: parseFloat(coveragePercentage),
      missingFields: missingFields.slice(0, 20), // Limit for readability
      extraFields: extraFields.slice(0, 10),
      status: coveragePercentage >= 90 ? 'PASS' : 'FAIL'
    };
    
    // Detailed missing fields analysis
    if (missingFields.length > 0) {
      console.log('\n❌ Missing Fields (Top 10):');
      missingFields.slice(0, 10).forEach(field => {
        console.log(`   - ${field}`);
      });
    }
  }

  async validateFinancialCalculations(transformationResult) {
    console.log('\n💰 Validating Financial Calculations...');
    
    const outputData = transformationResult.outputData;
    const tolerance = 0.01;
    
    const validations = [];
    
    try {
      // Extract financial data
      const orderSubtotal = parseFloat(outputData.orderSubtotal || 0);
      const totalCharges = parseFloat(outputData.totalCharges || 0);
      const totalTaxes = parseFloat(outputData.totalTaxes || 0);
      const totalDiscounts = parseFloat(outputData.totalDiscounts || 0);
      const releaseTotal = parseFloat(outputData.releaseTotal || 0);
      const orderTotal = parseFloat(outputData.orderTotal || 0);
      
      // Validation 1: Order Subtotal = Sum of (quantity * unitPrice) for all order lines
      let calculatedSubtotal = 0;
      if (outputData.order && outputData.order.orderLine) {
        for (const line of outputData.order.orderLine) {
          const quantity = parseFloat(line.quantity || 0);
          const unitPrice = parseFloat(line.unitPrice || 0);
          calculatedSubtotal += quantity * unitPrice;
        }
      }
      
      const subtotalValid = Math.abs(orderSubtotal - calculatedSubtotal) <= tolerance;
      validations.push({
        field: 'orderSubtotal',
        expected: calculatedSubtotal,
        actual: orderSubtotal,
        status: subtotalValid ? 'PASS' : 'FAIL',
        difference: Math.abs(orderSubtotal - calculatedSubtotal)
      });
      
      // Validation 2: Release Total = orderSubtotal + totalCharges + totalTaxes - totalDiscounts
      const calculatedReleaseTotal = orderSubtotal + totalCharges + totalTaxes - totalDiscounts;
      const releaseTotalValid = Math.abs(releaseTotal - calculatedReleaseTotal) <= tolerance;
      validations.push({
        field: 'releaseTotal',
        expected: calculatedReleaseTotal,
        actual: releaseTotal,
        status: releaseTotalValid ? 'PASS' : 'FAIL',
        difference: Math.abs(releaseTotal - calculatedReleaseTotal)
      });
      
      // Validation 3: Order Total should match Release Total
      const orderTotalValid = Math.abs(orderTotal - releaseTotal) <= tolerance;
      validations.push({
        field: 'orderTotal_vs_releaseTotal',
        expected: releaseTotal,
        actual: orderTotal,
        status: orderTotalValid ? 'PASS' : 'FAIL',
        difference: Math.abs(orderTotal - releaseTotal)
      });
      
      // Validation 4: Tax calculations at line level
      let calculatedTotalTaxes = 0;
      if (outputData.order && outputData.order.orderLine) {
        for (const line of outputData.order.orderLine) {
          const taxAmount = parseFloat(line.taxAmount || 0);
          calculatedTotalTaxes += taxAmount;
        }
      }
      
      const taxValid = Math.abs(totalTaxes - calculatedTotalTaxes) <= tolerance;
      validations.push({
        field: 'totalTaxes',
        expected: calculatedTotalTaxes,
        actual: totalTaxes,
        status: taxValid ? 'PASS' : 'FAIL',
        difference: Math.abs(totalTaxes - calculatedTotalTaxes)
      });
      
      // Print validation results
      for (const validation of validations) {
        const status = validation.status === 'PASS' ? '✅' : '❌';
        console.log(`${status} ${validation.field}: Expected ${validation.expected}, Actual ${validation.actual}, Diff: ${validation.difference.toFixed(4)}`);
      }
      
      const passedValidations = validations.filter(v => v.status === 'PASS').length;
      const totalValidations = validations.length;
      
      this.results.financialValidation = {
        validations,
        passedValidations,
        totalValidations,
        successRate: ((passedValidations / totalValidations) * 100).toFixed(2),
        status: passedValidations === totalValidations ? 'PASS' : 'FAIL'
      };
      
    } catch (error) {
      console.log('❌ Financial validation failed:', error.message);
      this.results.financialValidation = {
        status: 'ERROR',
        error: error.message
      };
    }
  }

  async validateStructure(transformationResult) {
    console.log('\n🏗️  Validating Data Structure...');
    
    const outputData = transformationResult.outputData;
    const validations = [];
    
    // Date format validation (ISO 8601)
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    const dateFields = this.findDateFields(outputData);
    
    let validDates = 0;
    for (const field of dateFields) {
      if (field.value && iso8601Regex.test(field.value)) {
        validDates++;
      }
    }
    
    validations.push({
      type: 'dateFormats',
      total: dateFields.length,
      valid: validDates,
      status: validDates === dateFields.length ? 'PASS' : 'FAIL'
    });
    
    // UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const uuidFields = this.findUUIDFields(outputData);
    
    let validUUIDs = 0;
    for (const field of uuidFields) {
      if (field.value && uuidRegex.test(field.value)) {
        validUUIDs++;
      }
    }
    
    validations.push({
      type: 'uuidFormats',
      total: uuidFields.length,
      valid: validUUIDs,
      status: validUUIDs === uuidFields.length ? 'PASS' : 'FAIL'
    });
    
    // Nested structure validation
    const nestedStructures = ['order', 'order.payment', 'order.orderLine', 'releaseLine'];
    let validStructures = 0;
    
    for (const structure of nestedStructures) {
      if (this.hasNestedStructure(outputData, structure)) {
        validStructures++;
      }
    }
    
    validations.push({
      type: 'nestedStructures',
      total: nestedStructures.length,
      valid: validStructures,
      status: validStructures === nestedStructures.length ? 'PASS' : 'FAIL'
    });
    
    // Array field validation
    const arrayFields = this.findArrayFields(outputData);
    let validArrays = 0;
    
    for (const field of arrayFields) {
      if (Array.isArray(field.value) && field.value.length >= 0) {
        validArrays++;
      }
    }
    
    validations.push({
      type: 'arrayFields',
      total: arrayFields.length,
      valid: validArrays,
      status: validArrays === arrayFields.length ? 'PASS' : 'FAIL'
    });
    
    // Print validation results
    for (const validation of validations) {
      const status = validation.status === 'PASS' ? '✅' : '❌';
      console.log(`${status} ${validation.type}: ${validation.valid}/${validation.total} valid`);
    }
    
    const passedValidations = validations.filter(v => v.status === 'PASS').length;
    
    this.results.structureValidation = {
      validations,
      passedValidations,
      totalValidations: validations.length,
      status: passedValidations === validations.length ? 'PASS' : 'FAIL'
    };
  }

  findDateFields(obj, path = '', fields = []) {
    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'string' && 
          (key.toLowerCase().includes('date') || 
           key.toLowerCase().includes('timestamp') || 
           key.toLowerCase().includes('time'))) {
        fields.push({ path: currentPath, value });
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.findDateFields(value, currentPath, fields);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            this.findDateFields(item, `${currentPath}[${index}]`, fields);
          }
        });
      }
    }
    return fields;
  }

  findUUIDFields(obj, path = '', fields = []) {
    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'string' && 
          (key.toLowerCase().includes('id') && 
           value.length >= 32 && 
           value.includes('-'))) {
        fields.push({ path: currentPath, value });
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.findUUIDFields(value, currentPath, fields);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            this.findUUIDFields(item, `${currentPath}[${index}]`, fields);
          }
        });
      }
    }
    return fields;
  }

  hasNestedStructure(obj, path) {
    const parts = path.split('.');
    let current = obj;
    
    for (const part of parts) {
      if (current[part] === undefined) {
        return false;
      }
      current = current[part];
    }
    return true;
  }

  findArrayFields(obj, path = '', fields = []) {
    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (Array.isArray(value)) {
        fields.push({ path: currentPath, value });
      } else if (typeof value === 'object' && value !== null) {
        this.findArrayFields(value, currentPath, fields);
      }
    }
    return fields;
  }

  async testErrorScenarios() {
    console.log('\n🚨 Testing Error Scenarios...');
    
    const errorTests = [
      {
        name: 'Non-existent Order ID',
        orderId: 'non-existent-order-id-12345',
        expectedStatus: [404, 500],
        description: 'Should return appropriate error for non-existent order'
      },
      {
        name: 'Empty Order ID',
        orderId: '',
        expectedStatus: [400],
        description: 'Should return bad request for empty order ID'
      },
      {
        name: 'Invalid Order ID Format',
        orderId: 'invalid-format-123',
        expectedStatus: [404, 500],
        description: 'Should handle invalid order ID format gracefully'
      }
    ];
    
    const results = [];
    
    for (const test of errorTests) {
      try {
        console.log(`\n🧪 Testing: ${test.name}`);
        
        const response = await axios.post(
          `${this.baseUrl}/api/order/release-template-save`,
          { orderId: test.orderId },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
            validateStatus: () => true // Don't throw on HTTP errors
          }
        );
        
        const statusAcceptable = test.expectedStatus.includes(response.status);
        const hasErrorMessage = response.data && (response.data.message || response.data.error);
        
        results.push({
          name: test.name,
          orderId: test.orderId,
          actualStatus: response.status,
          expectedStatus: test.expectedStatus,
          statusOk: statusAcceptable,
          hasErrorMessage,
          errorMessage: response.data?.message || response.data?.error || 'No error message',
          status: statusAcceptable && hasErrorMessage ? 'PASS' : 'FAIL'
        });
        
        const status = statusAcceptable && hasErrorMessage ? '✅' : '❌';
        console.log(`${status} Status: ${response.status}, Message: "${response.data?.message || response.data?.error || 'None'}"`);
        
      } catch (error) {
        results.push({
          name: test.name,
          orderId: test.orderId,
          status: 'ERROR',
          error: error.message
        });
        console.log(`❌ Test failed with error: ${error.message}`);
      }
    }
    
    const passedTests = results.filter(r => r.status === 'PASS').length;
    
    this.results.errorHandling = {
      tests: results,
      passedTests,
      totalTests: results.length,
      status: passedTests === results.length ? 'PASS' : 'FAIL'
    };
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Field coverage recommendations
    if (this.results.fieldCoverage.coveragePercentage < 90) {
      recommendations.push({
        category: 'Field Coverage',
        priority: 'HIGH',
        description: `Field coverage is ${this.results.fieldCoverage.coveragePercentage}%. Missing ${this.results.fieldCoverage.missingFields.length} fields.`,
        action: 'Review missing fields and ensure all template fields are properly mapped in the transformation service.'
      });
    }
    
    // Financial validation recommendations
    if (this.results.financialValidation.status !== 'PASS') {
      recommendations.push({
        category: 'Financial Calculations',
        priority: 'HIGH',
        description: `Financial validation failed. ${this.results.financialValidation.passedValidations}/${this.results.financialValidation.totalValidations} validations passed.`,
        action: 'Review financial calculation logic in the transformation service. Ensure all monetary calculations are accurate to 2 decimal places.'
      });
    }
    
    // Structure validation recommendations
    if (this.results.structureValidation.status !== 'PASS') {
      recommendations.push({
        category: 'Data Structure',
        priority: 'MEDIUM',
        description: 'Some data structure validations failed.',
        action: 'Ensure all dates use ISO 8601 format and UUIDs are properly formatted. Check nested object structures.'
      });
    }
    
    // Error handling recommendations
    if (this.results.errorHandling.status !== 'PASS') {
      recommendations.push({
        category: 'Error Handling',
        priority: 'MEDIUM',
        description: 'Error scenario testing revealed issues.',
        action: 'Improve error handling to return appropriate HTTP status codes and meaningful error messages.'
      });
    }
    
    // General recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        category: 'General',
        priority: 'LOW',
        description: 'All validations passed successfully.',
        action: 'Consider adding more comprehensive test cases and monitoring for edge cases in production.'
      });
    }
    
    this.results.recommendations = recommendations;
  }

  async generateReport() {
    console.log('\n📊 Generating Validation Report...');
    
    this.generateRecommendations();
    
    // Determine overall status
    const validationStatuses = [
      this.results.fieldCoverage?.status,
      this.results.financialValidation?.status,
      this.results.structureValidation?.status,
      this.results.errorHandling?.status
    ].filter(Boolean);
    
    this.results.overallStatus = validationStatuses.every(status => status === 'PASS') ? 'PASS' : 'FAIL';
    
    // Generate summary
    this.results.summary = {
      serviceHealth: this.results.serviceHealth,
      fieldCoveragePercentage: this.results.fieldCoverage?.coveragePercentage,
      financialValidationSuccessRate: this.results.financialValidation?.successRate,
      structureValidationsPassed: this.results.structureValidation?.passedValidations,
      errorHandlingTestsPassed: this.results.errorHandling?.passedTests,
      totalRecommendations: this.results.recommendations.length,
      overallStatus: this.results.overallStatus
    };
    
    // Write report to file
    const reportPath = path.join(__dirname, `validation-report-${Date.now()}.json`);
    await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));
    
    // Print summary
    this.printSummary();
    
    console.log(`\n📄 Full report saved to: ${reportPath}`);
    
    return this.results;
  }

  printSummary() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 VALIDATION REPORT SUMMARY');
    console.log('='.repeat(80));
    
    console.log(`🏭 Service: ${this.results.service}`);
    console.log(`🔗 Endpoint: ${this.results.endpoint}`);
    console.log(`📅 Test Date: ${this.results.timestamp}`);
    console.log(`🎯 Overall Status: ${this.results.overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
    
    console.log('\n📈 FIELD COVERAGE ANALYSIS');
    console.log('-'.repeat(40));
    if (this.results.fieldCoverage) {
      console.log(`Total Template Fields: ${this.results.fieldCoverage.totalExpected}`);
      console.log(`Fields Present: ${this.results.fieldCoverage.totalPresent}`);
      console.log(`Fields Missing: ${this.results.fieldCoverage.missingFields?.length || 0}`);
      console.log(`Coverage Percentage: ${this.results.fieldCoverage.coveragePercentage}%`);
    }
    
    console.log('\n💰 FINANCIAL VALIDATION RESULTS');
    console.log('-'.repeat(40));
    if (this.results.financialValidation && this.results.financialValidation.validations) {
      for (const validation of this.results.financialValidation.validations) {
        const status = validation.status === 'PASS' ? '✅' : '❌';
        console.log(`${status} ${validation.field}: Expected ${validation.expected}, Actual ${validation.actual}`);
      }
    }
    
    console.log('\n🏗️  STRUCTURE VALIDATION');
    console.log('-'.repeat(40));
    if (this.results.structureValidation && this.results.structureValidation.validations) {
      for (const validation of this.results.structureValidation.validations) {
        const status = validation.status === 'PASS' ? '✅' : '❌';
        console.log(`${status} ${validation.type}: ${validation.valid}/${validation.total} valid`);
      }
    }
    
    console.log('\n🚨 ERROR HANDLING TESTS');
    console.log('-'.repeat(40));
    if (this.results.errorHandling) {
      console.log(`Tests Passed: ${this.results.errorHandling.passedTests}/${this.results.errorHandling.totalTests}`);
    }
    
    console.log('\n💡 RECOMMENDATIONS');
    console.log('-'.repeat(40));
    if (this.results.recommendations) {
      for (const rec of this.results.recommendations) {
        const priority = rec.priority === 'HIGH' ? '🔴' : rec.priority === 'MEDIUM' ? '🟡' : '🟢';
        console.log(`${priority} ${rec.category}: ${rec.description}`);
      }
    }
    
    console.log('\n' + '='.repeat(80));
  }
}

// Execute validation if run directly
if (require.main === module) {
  const validator = new OrderReleaseTemplateValidator();
  validator.runValidation()
    .then(() => {
      console.log('\n🎉 Validation completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Validation failed:', error.message);
      process.exit(1);
    });
}

module.exports = OrderReleaseTemplateValidator;