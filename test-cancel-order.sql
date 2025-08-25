-- Update an existing order to be cancelled for testing
UPDATE "order"."orders" 
SET 
  is_cancelled = 't',
  order_status = 'Cancelled',
  fulfillment_status = 'Cancelled',
  cancelled_order_sub_total = order_sub_total,
  cancel_reason = 'Customer requested cancellation',
  updated_at = NOW()
WHERE order_id = '10-SAN6-423924816-C7EJNB23JAUDN2';

-- Verify the update
SELECT order_id, is_cancelled, order_status, fulfillment_status, cancelled_order_sub_total, cancel_reason
FROM "order"."orders" 
WHERE order_id = '10-SAN6-423924816-C7EJNB23JAUDN2';