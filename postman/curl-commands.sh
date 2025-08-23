#!/bin/bash

# 🚀 MAO Service Transformer - cURL Commands
# ใช้สำหรับทดสอบ API endpoints ผ่าน command line

BASE_URL="http://localhost:3000"
ORDER_ID="123456789-C7L2LCDCTCC2AE"
TEST_ORDER_ID_1="123456789-C7L2LCDCTCC2AE"
TEST_ORDER_ID_2="403521240-C7LDVZNUTGAHMA"
NON_EXISTENT_ORDER="NON-EXISTENT-ORDER"

echo "🚀 MAO Service Transformer - API Testing with cURL"
echo "=================================================="
echo ""

# Function to print section header
print_section() {
    echo ""
    echo "📋 $1"
    echo "----------------------------------------"
}

# Function to execute curl command and show result
execute_curl() {
    local description="$1"
    local curl_command="$2"
    
    echo "🔍 $description"
    echo "Command: $curl_command"
    echo "Response:"
    eval "$curl_command"
    echo ""
    echo "----------------------------------------"
}

# 1. Health Check
print_section "1. Health Check"
execute_curl "Check service health" "curl -s -X GET \"$BASE_URL/api/order/release-health\" | jq '.'"

# 2. Get Orders List
print_section "2. Get Orders List"
execute_curl "Get all orders from database" "curl -s -X GET \"$BASE_URL/api/order/orders-list\" | jq '.'"

# 3. Get Order Status
print_section "3. Get Order Status"
execute_curl "Check order status for $ORDER_ID" "curl -s -X GET \"$BASE_URL/api/order/$ORDER_ID/release-status\" | jq '.'"

# 4. Transform Order to Sample Format
print_section "4. Transform Order to Sample Format"
execute_curl "Transform order to sample format" "curl -s -X POST \"$BASE_URL/api/order/release-transform-sample\" \
  -H \"Content-Type: application/json\" \
  -d '{\"orderId\": \"$ORDER_ID\"}' | jq '.'"

# 5. Transform Order to PascalCase Format (Main endpoint)
print_section "5. Transform Order to PascalCase Format (Main)"
execute_curl "Transform order to PascalCase format" "curl -s -X POST \"$BASE_URL/api/order/release-transform-pascal\" \
  -H \"Content-Type: application/json\" \
  -d '{\"orderId\": \"$ORDER_ID\"}' | jq '.'"

# 6. Transform Order to Release
print_section "6. Transform Order to Release"
execute_curl "Transform order to release format" "curl -s -X POST \"$BASE_URL/api/order/release-transform\" \
  -H \"Content-Type: application/json\" \
  -d '{\"orderId\": \"$ORDER_ID\"}' | jq '.'"

# 7. Transform and Save Order
print_section "7. Transform and Save Order"
execute_curl "Transform and save order to file" "curl -s -X POST \"$BASE_URL/api/order/release-transform-save\" \
  -H \"Content-Type: application/json\" \
  -d '{\"orderId\": \"$ORDER_ID\"}' | jq '.'"

# 8. Transform PMP Payload
print_section "8. Transform PMP Payload"
execute_curl "Transform PMP payload directly" "curl -s -X POST \"$BASE_URL/api/order/transform-payload\" \
  -H \"Content-Type: application/json\" \
  -d '{
    \"OrderId\": \"$ORDER_ID\",
    \"CustomerId\": \"CUST001\",
    \"CustomerEmail\": \"test@example.com\",
    \"CustomerFirstName\": \"John\",
    \"CustomerLastName\": \"Doe\",
    \"CustomerPhone\": \"+66123456789\",
    \"CurrencyCode\": \"THB\",
    \"OrderSubTotal\": 1000.00,
    \"OrderTotal\": 1100.00,
    \"TotalTaxes\": 70.00,
    \"TotalCharges\": 30.00,
    \"TotalDiscounts\": 0.00,
    \"OrderLines\": [
      {
        \"OrderLineId\": \"LINE001\",
        \"ItemId\": \"ITEM001\",
        \"Quantity\": 2,
        \"UnitPrice\": 500.00,
        \"OrderLineTotal\": 1000.00
      }
    ],
    \"Payments\": [
      {
        \"PaymentId\": \"PAY001\",
        \"Amount\": 1100.00,
        \"PaymentMethod\": \"Credit Card\",
        \"Status\": \"Completed\"
      }
    ]
  }' | jq '.'"

# 9. Test Different Order IDs
print_section "9. Test Different Order IDs"

echo "🔍 Test Order 1: $TEST_ORDER_ID_1"
curl -s -X POST "$BASE_URL/api/order/release-transform-pascal" \
  -H "Content-Type: application/json" \
  -d "{\"orderId\": \"$TEST_ORDER_ID_1\"}" | jq '.'
echo ""

echo "🔍 Test Order 2: $TEST_ORDER_ID_2"
curl -s -X POST "$BASE_URL/api/order/release-transform-pascal" \
  -H "Content-Type: application/json" \
  -d "{\"orderId\": \"$TEST_ORDER_ID_2\"}" | jq '.'
echo ""

# 10. Test Error Handling
print_section "10. Test Error Handling"
execute_curl "Test non-existent order error handling" "curl -s -X POST \"$BASE_URL/api/order/release-transform-pascal\" \
  -H \"Content-Type: application/json\" \
  -d '{\"orderId\": \"$NON_EXISTENT_ORDER\"}' | jq '.'"

# 11. Test Invalid Request
print_section "11. Test Invalid Request"
execute_curl "Test empty order ID" "curl -s -X POST \"$BASE_URL/api/order/release-transform-pascal\" \
  -H \"Content-Type: application/json\" \
  -d '{\"orderId\": \"\"}' | jq '.'"

execute_curl "Test missing order ID" "curl -s -X POST \"$BASE_URL/api/order/release-transform-pascal\" \
  -H \"Content-Type: application/json\" \
  -d '{}' | jq '.'"

echo ""
echo "🎉 Testing completed!"
echo ""
echo "📝 Notes:"
echo "- Make sure the service is running on $BASE_URL"
echo "- Install jq for better JSON formatting: brew install jq (macOS) or apt-get install jq (Ubuntu)"
echo "- Check the response status codes and error messages"
echo "- Compare the output with expected format"
