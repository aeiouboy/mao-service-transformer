# Test Organization

This directory contains all test scripts and validation tools organized by purpose.

## Directory Structure

### `/integration/` - Integration Tests
Tests that verify the complete system functionality by calling actual services.

- `test-real-service.js` - Tests the NestJS service endpoints
- `test-implementation.js` - Tests service implementation directly  
- `test-service-direct.js` - Direct service method testing

**Usage:**
```bash
# Test running service
node tests/integration/test-real-service.js

# Test implementation directly
node tests/integration/test-implementation.js

# Direct service testing
node tests/integration/test-service-direct.js
```

### `/validation/` - Validation & Verification
Scripts that validate outputs against expected results and templates.

- `compare-outputs.js` - Compares current vs expected outputs
- `validation-framework.js` - Comprehensive validation framework
- `validation-report.js` - Generates validation reports
- `order-release-validation.js` - Order release specific validation

**Usage:**
```bash
# Compare outputs
node tests/validation/compare-outputs.js

# Run validation framework
node tests/validation/validation-framework.js

# Generate validation report
node tests/validation/validation-report.js
```

### `/utilities/` - Test Utilities & Analysis
Helper scripts for debugging, analysis, and data manipulation.

- `debug-template.js` - Debug template generation process
- `field-analysis.js` - Analyze field mappings and structures
- `field-validation.js` - Validate field transformations
- `analyze-expected.js` - Analyze expected output structure

**Usage:**
```bash
# Debug template issues
node tests/utilities/debug-template.js

# Analyze field mappings
node tests/utilities/field-analysis.js

# Validate field transformations
node tests/utilities/field-validation.js
```

### `/outputs/` - Test Output Files
Generated test results and validation outputs.

- `test-output*.json` - Various test output files
- `validation-summary.txt` - Validation summary results

## Running Tests

### Quick Test Suite
```bash
# Run all integration tests
npm run test:integration

# Run all validation tests  
npm run test:validation

# Run analysis utilities
npm run test:analysis
```

### Individual Test Categories
```bash
# Integration testing
cd tests/integration && node test-real-service.js

# Validation testing
cd tests/validation && node compare-outputs.js

# Utility analysis
cd tests/utilities && node field-analysis.js
```

## Test Development

### Adding New Tests
1. Place integration tests in `/integration/`
2. Place validation scripts in `/validation/`
3. Place utilities in `/utilities/`
4. Update this README with new test descriptions

### Test Naming Convention
- `test-*.js` for integration tests
- `*-validation.js` for validation scripts
- `*-analysis.js` for analysis utilities
- `debug-*.js` for debugging tools

## Dependencies

Most tests require:
- Node.js runtime
- Access to the NestJS application
- Sample data files in `/data/samples/`
- Expected output files in `/release/`

## Troubleshooting

### Common Issues
1. **Service not running**: Start the NestJS app with `cd app && pnpm run start:dev`
2. **Missing files**: Ensure sample data exists in `/data/samples/`
3. **Port conflicts**: Check that port 3000 is available for service tests

### Debug Mode
Add `DEBUG=1` environment variable for verbose output:
```bash
DEBUG=1 node tests/integration/test-real-service.js
```