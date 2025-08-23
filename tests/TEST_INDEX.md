# MAO Service Transformer - Test Index

Complete index of all test scripts, utilities, and validation tools.

## Test Categories

### 🔗 Integration Tests (`/integration/`)
Test complete system functionality with actual services.

| Script | Purpose | Usage |
|--------|---------|-------|
| `test-implementation.js` | Test service implementation directly | `node integration/test-implementation.js` |
| `test-real-service.js` | Test NestJS service endpoints | `node integration/test-real-service.js` |
| `test-service-direct.js` | Direct service method testing | `node integration/test-service-direct.js` |

### ✅ Validation Tests (`/validation/`)
Validate outputs against expected results and templates.

| Script | Purpose | Usage |
|--------|---------|-------|
| `compare-outputs.js` | Compare current vs expected outputs | `node validation/compare-outputs.js` |
| `order-release-validation.js` | Order release specific validation | `node validation/order-release-validation.js` |
| `validation-framework.js` | Comprehensive validation framework | `node validation/validation-framework.js` |
| `validation-report.js` | Generate validation reports | `node validation/validation-report.js` |

### 🔧 Utilities (`/utilities/`)
Analysis, debugging, and data manipulation tools.

| Script | Purpose | Usage |
|--------|---------|-------|
| `analyze-expected.js` | Analyze expected output structure | `node utilities/analyze-expected.js` |
| `debug-template.js` | Debug template generation process | `node utilities/debug-template.js` |
| `field-analysis.js` | Analyze field mappings and structures | `node utilities/field-analysis.js` |
| `field-validation.js` | Validate field transformations | `node utilities/field-validation.js` |
| `additional-tests.sh` | Additional test utilities | `bash utilities/additional-tests.sh` |

### 📄 Output Files (`/outputs/`)
Generated test results and validation outputs.

| File | Type | Description |
|------|------|-------------|
| `test-output*.json` | Result | Various test output files |
| `validation-summary.txt` | Report | Validation summary results |
| `TASK_4_IMPLEMENTATION_COMPLETE.json` | Status | Task completion record |

## Test Runners

### Quick Runners
| Script | Purpose | Command |
|--------|---------|---------|
| `run-all-tests.sh` | Complete test suite | `bash tests/run-all-tests.sh` |
| `run-integration-tests.sh` | Integration tests only | `bash tests/run-integration-tests.sh` |
| `run-validation-tests.sh` | Validation tests only | `bash tests/run-validation-tests.sh` |
| `run-utilities.sh` | Utilities and analysis | `bash tests/run-utilities.sh` |

### NPM Scripts
Add these to your `package.json` for easy access:

```json
{
  "scripts": {
    "test:all": "bash tests/run-all-tests.sh",
    "test:integration": "bash tests/run-integration-tests.sh", 
    "test:validation": "bash tests/run-validation-tests.sh",
    "test:utilities": "bash tests/run-utilities.sh"
  }
}
```

## Test Data Dependencies

### Required Files
- `/data/samples/sample_input.json` - Sample transformation input
- `/data/samples/sample_order.json` - Expected order output  
- `/app/release/MAO-123456789-C7L2LCDCTCC2AE.json` - Expected template
- `/release/311647613-C7LXT7KBTPA3TN-Rel.json` - Source release data

### Service Dependencies
- NestJS application running on `localhost:3000`
- Database connection (for integration tests)
- Sample data files in correct locations

## Test Workflow

### Development Testing
```bash
# Quick validation during development
node tests/validation/compare-outputs.js

# Debug specific issues
node tests/utilities/debug-template.js

# Test service endpoints
node tests/integration/test-real-service.js
```

### Pre-Commit Testing
```bash
# Run complete suite before committing
bash tests/run-all-tests.sh
```

### CI/CD Pipeline Testing
```bash
# Automated testing sequence
bash tests/run-utilities.sh
bash tests/run-integration-tests.sh  
bash tests/run-validation-tests.sh
```

## Troubleshooting

### Common Issues

**Service Connection Errors**
- Ensure NestJS app is running: `cd app && pnpm run start:dev`
- Check port 3000 is available
- Verify database connection

**File Not Found Errors**  
- Check sample data exists in `/data/samples/`
- Verify output files exist in `/app/release/`
- Ensure proper relative paths from test location

**Path Resolution Issues**
- All scripts use relative paths from their location
- Use `../../` to navigate up from `/tests/category/` to project root

### Debug Mode
Set `DEBUG=1` for verbose output:
```bash
DEBUG=1 node tests/integration/test-real-service.js
```

### Log Files
Check service logs:
- `app/service.log` - Application logs
- `app/server.log` - Server logs

## Test Coverage

### Current Coverage Areas
- ✅ Service endpoint testing
- ✅ Output validation and comparison
- ✅ Field mapping analysis
- ✅ Template structure validation
- ✅ Error handling verification

### Areas for Enhancement
- [ ] Performance benchmarking
- [ ] Load testing
- [ ] Edge case validation
- [ ] Regression test automation
- [ ] Cross-environment testing