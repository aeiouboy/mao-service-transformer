#!/bin/bash

# Validation Test Runner
# Runs all validation and verification tests

set -e

echo "🔍 Running MAO Service Transformer Validation Tests"
echo "=================================================="

echo "1️⃣  Running Output Comparison..."
node validation/compare-outputs.js
echo ""

echo "2️⃣  Running Order Release Validation..."
node validation/order-release-validation.js
echo ""

echo "3️⃣  Running Comprehensive Validation Framework..."
node validation/validation-framework.js
echo ""

echo "4️⃣  Generating Validation Report..."
node validation/validation-report.js
echo ""

echo "✅ Validation tests completed!"
echo ""
echo "📄 Check outputs in tests/outputs/ directory"
echo ""
echo "💡 To run individual validations:"
echo "   node validation/compare-outputs.js"
echo "   node validation/order-release-validation.js"
echo "   node validation/validation-framework.js"
echo "   node validation/validation-report.js"