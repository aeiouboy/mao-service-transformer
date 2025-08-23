#!/bin/bash

# Complete Test Suite Runner
# Runs all test categories in proper order

set -e

echo "🎯 Running Complete MAO Service Transformer Test Suite"
echo "====================================================="
echo ""

# Change to tests directory
cd "$(dirname "$0")"

echo "🧪 Step 1: Running Utilities & Analysis..."
echo "==========================================="
bash run-utilities.sh
echo ""

echo "🔗 Step 2: Running Integration Tests..."
echo "======================================="
bash run-integration-tests.sh
echo ""

echo "✅ Step 3: Running Validation Tests..."
echo "======================================"
bash run-validation-tests.sh
echo ""

echo "🏆 Complete Test Suite Finished!"
echo "================================"
echo ""
echo "📊 Test Results Summary:"
echo "- Utilities & Analysis: ✅"
echo "- Integration Tests: ✅" 
echo "- Validation Tests: ✅"
echo ""
echo "📄 Check detailed results in tests/outputs/ directory"
echo ""
echo "💡 To run individual test suites:"
echo "   bash tests/run-utilities.sh"
echo "   bash tests/run-integration-tests.sh"
echo "   bash tests/run-validation-tests.sh"