#!/bin/bash

# Additional API Tests for OrderReleaseTemplateTransformerService
# Usage: ./additional-tests.sh

echo "🧪 Additional OrderReleaseTemplateTransformerService Tests"
echo "======================================================="

API_BASE="http://localhost:3000/api/order/release-template-save"

# Test 1: Valid Order ID (should succeed)
echo -e "\n✅ Test 1: Valid Order ID"
echo "Request: Valid order 123456789-C7L2LCDCTCC2AE"
curl -X POST "$API_BASE" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "123456789-C7L2LCDCTCC2AE"}' \
  -w "\nHTTP Status: %{http_code} | Response Time: %{time_total}s\n" \
  -s | head -3

# Test 2: Non-existent Order ID
echo -e "\n❌ Test 2: Non-existent Order ID"
echo "Request: non-existent-order-id"
curl -X POST "$API_BASE" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "non-existent-order-id"}' \
  -w "\nHTTP Status: %{http_code} | Response Time: %{time_total}s\n" \
  -s | head -3

# Test 3: Empty Order ID
echo -e "\n❌ Test 3: Empty Order ID"
echo "Request: Empty string"
curl -X POST "$API_BASE" \
  -H "Content-Type: application/json" \
  -d '{"orderId": ""}' \
  -w "\nHTTP Status: %{http_code} | Response Time: %{time_total}s\n" \
  -s | head -3

# Test 4: Invalid Order ID Format
echo -e "\n❌ Test 4: Invalid Order ID Format"
echo "Request: invalid-format-123"
curl -X POST "$API_BASE" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "invalid-format-123"}' \
  -w "\nHTTP Status: %{http_code} | Response Time: %{time_total}s\n" \
  -s | head -3

# Test 5: Missing orderId field
echo -e "\n❌ Test 5: Missing orderId Field"
echo "Request: Empty JSON"
curl -X POST "$API_BASE" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -w "\nHTTP Status: %{http_code} | Response Time: %{time_total}s\n" \
  -s | head -3

# Test 6: Invalid JSON
echo -e "\n❌ Test 6: Invalid JSON"
echo "Request: Malformed JSON"
curl -X POST "$API_BASE" \
  -H "Content-Type: application/json" \
  -d '{"orderId": "test"' \
  -w "\nHTTP Status: %{http_code} | Response Time: %{time_total}s\n" \
  -s | head -3

echo -e "\n🎯 Test Summary"
echo "==============="
echo "✅ Valid order: Should return HTTP 201"
echo "❌ Invalid orders: All returned HTTP 500 (should be 404/400)"
echo "⚠️  Error handling needs improvement - generic error messages"
echo "🔍 Service logs show proper error detection but poor HTTP status mapping"