#!/bin/bash

# Integration Test Runner
# Runs all integration tests in proper order

set -e

echo "🚀 Running MAO Service Transformer Integration Tests"
echo "=================================================="

# Check if service is running
echo "📋 Checking if NestJS service is running..."
if ! curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "⚠️  Warning: NestJS service not detected on port 3000"
    echo "   Start the service with: cd app && pnpm run start:dev"
    echo ""
fi

echo "1️⃣  Testing Service Implementation..."
node integration/test-implementation.js
echo ""

echo "2️⃣  Testing Direct Service Access..."  
node integration/test-service-direct.js
echo ""

echo "3️⃣  Testing Real Service Endpoints..."
node integration/test-real-service.js
echo ""

echo "✅ Integration tests completed!"
echo ""
echo "💡 To run individual tests:"
echo "   node integration/test-implementation.js"
echo "   node integration/test-service-direct.js" 
echo "   node integration/test-real-service.js"