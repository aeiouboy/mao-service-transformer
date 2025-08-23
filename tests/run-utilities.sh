#!/bin/bash

# Utilities Test Runner
# Runs analysis and debugging utilities

set -e

echo "🔧 Running MAO Service Transformer Analysis Utilities"
echo "===================================================="

echo "1️⃣  Running Field Analysis..."
node utilities/field-analysis.js
echo ""

echo "2️⃣  Running Field Validation..."
node utilities/field-validation.js
echo ""

echo "3️⃣  Analyzing Expected Output Structure..."
node utilities/analyze-expected.js
echo ""

echo "4️⃣  Running Template Debug..."
node utilities/debug-template.js
echo ""

echo "5️⃣  Running Additional Tests..."
bash utilities/additional-tests.sh
echo ""

echo "✅ Analysis utilities completed!"
echo ""
echo "💡 To run individual utilities:"
echo "   node utilities/field-analysis.js"
echo "   node utilities/field-validation.js"
echo "   node utilities/analyze-expected.js"
echo "   node utilities/debug-template.js"