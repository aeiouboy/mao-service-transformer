const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  host: 'cg-omnia-psql-flex-nonprd.central.co.th',
  port: 5432,
  database: 'postgres',
  user: 'omniaqa',
  password: 'uYBXitqrwXU=25',
  ssl: false,
  connectionTimeoutMillis: 5000
});

// Simple transformation function
async function transformOrderToRelease(orderId) {
  const client = await pool.connect();
  
  try {
    console.log(`Starting transformation for order: ${orderId}`);

    // Get order data
    const orderResult = await client.query(
      'SELECT * FROM "order".orders WHERE order_id = $1',
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      throw new Error(`Order not found: ${orderId}`);
    }

    const order = orderResult.rows[0];
    console.log(`Found order: ${order.order_id}`);

    // Get payment transactions
    const paymentResult = await client.query(
      'SELECT * FROM "order".payment_transactions WHERE order_id = $1',
      [orderId]
    );

    console.log(`Found ${paymentResult.rows.length} payment transactions`);

    // Create release format (matching the sample structure)
    const result = {
      ServiceLevelCode: 'STD',
      Email: order.customer_email || 'undefined',
      MaxFulfillmentStatusId: '3000',
      IsOnHold: order.is_on_hold || false,
      IsConfirmed: true,
      OrderSubtotal: parseFloat(order.order_sub_total || 0),
      ModeId: null,
      SellingLocationId: null,
      CurrencyCode: order.currency_code || 'THB',
      CustomerPhone: order.customer_phone || '0101010122',
      CustomerFirstName: order.customer_first_name || 'Grab Customer',
      ReleaseTotal: parseFloat(order.order_total || order.order_sub_total || 0),
      ExtendedFields: {
        CancelAllowed: order.cancel_allowed !== false
      },
      TotalCharges: parseFloat(order.total_charges || 0),
      ExternalShipFromLocationId: null,
      TaxExemptId: null,
      AddressId: generateAddressHash(order),
      Order: {
        Payment: []
      }
    };

    // Transform payments
    paymentResult.rows.forEach((payment, index) => {
      const releasePayment = {
        Actions: {},
        PK: payment.id?.toString() || (Date.now() + index).toString(),
        CreatedBy: payment.created_by || 'pubsubuser@pmp',
        CreatedTimestamp: payment.created_at?.toISOString() || new Date().toISOString(),
        UpdatedBy: payment.updated_by || 'pubsubuser@pmp',
        UpdatedTimestamp: payment.updated_at?.toISOString() || new Date().toISOString(),
        Messages: null,
        OrgId: payment.org_id || 'CFR',
        PurgeDate: null,
        OrderId: payment.order_id,
        PaymentGroupId: null,
        CustomerId: null,
        IsCancelled: false,
        AlternateOrderId: null,
        IsAnonymized: false,
        PaymentMethod: [{
          Actions: {},
          PK: (parseInt(payment.id?.toString() || '0') + 1000 + index).toString(),
          CreatedBy: 'pubsubuser@pmp',
          CreatedTimestamp: payment.created_at?.toISOString() || new Date().toISOString(),
          UpdatedBy: 'pubsubuser@pmp',
          UpdatedTimestamp: payment.updated_at?.toISOString() || new Date().toISOString(),
          Messages: null,
          OrgId: 'CFR',
          PaymentMethodId: payment.payment_transaction_id || `${payment.order_id}-PM-${index + 1}`,
          CurrencyCode: order.currency_code || 'THB',
          AlternateCurrencyCode: null,
          ConversionRate: null,
          AlternateCurrencyAmount: null,
          AccountNumber: null,
          AccountDisplayNumber: null,
          NameOnCard: null,
          SwipeData: null,
          CardExpiryMonth: null,
          CardExpiryYear: null,
          GiftCardPin: null,
          CustomerSignature: null,
          CustomerPaySignature: null,
          ChangeAmount: null,
          Amount: parseFloat(payment.processed_amount || 0),
          CurrentAuthAmount: 0,
          CurrentSettledAmount: parseFloat(payment.processed_amount || 0),
          CurrentRefundAmount: 0,
          ChargeSequence: null,
          IsSuspended: false,
          EntryTypeId: null,
          GatewayId: 'Simulator',
          RoutingNumber: null,
          RoutingDisplayNumber: null,
          CheckNumber: null,
          DriversLicenseNumber: null,
          DriversLicenseState: null,
          DriversLicenseCountry: null,
          BusinessName: null,
          BusinessTaxId: null,
          CheckQuantity: null,
          OriginalAmount: null,
          IsModifiable: false,
          CurrentFailedAmount: 0,
          ParentOrderId: null,
          ParentPaymentGroupId: null,
          ParentPaymentMethodId: null,
          IsVoided: false,
          IsCopied: false,
          GatewayAccountId: null,
          LocationId: null,
          TransactionReferenceId: null,
          CapturedInEdgeMode: false,
          MerchandiseAmount: 0,
          CapturedSource: null,
          ShopperReference: null,
          SuggestedAmount: null,
          PurgeDate: null,
          BillingAddress: {
            Actions: {},
            PK: (Date.now() + 2000 + index).toString(),
            CreatedBy: 'pubsubuser@pmp',
            CreatedTimestamp: new Date().toISOString(),
            UpdatedBy: 'pubsubuser@pmp',
            UpdatedTimestamp: new Date().toISOString(),
            Messages: null,
            OrgId: 'CFR',
            AddressId: generateAddressHash(order),
            AddressLine1: '123 Main Street',
            AddressLine2: null,
            AddressLine3: null,
            City: 'Bangkok',
            State: null,
            ZipCode: '10100',
            Country: 'TH',
            DaytimePhone: order.customer_phone || '0101010122',
            EveningPhone: null,
            MobilePhone: order.customer_phone || '0101010122',
            FirstName: order.customer_first_name || 'Grab Customer',
            LastName: order.customer_last_name || '-',
            Company: null,
            EmailId: order.customer_email || 'undefined',
            Title: null,
            PurgeDate: null
          }
        }]
      };
      
      result.Order.Payment.push(releasePayment);
    });

    console.log(`Transformation completed for order: ${orderId}`);
    return result;

  } finally {
    client.release();
  }
}

// Generate address hash for deduplication
function generateAddressHash(order) {
  const addressComponents = [
    order.customer_first_name || 'Customer',
    order.customer_last_name || 'User', 
    order.customer_phone || '0101010122',
    order.customer_email || 'undefined',
    'Bangkok',
    'TH'
  ].join('|');
  
  // Simple hash generation
  let hash = 0;
  for (let i = 0; i < addressComponents.length; i++) {
    const char = addressComponents.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16).padStart(8, '0').substring(0, 30);
}

// Test the transformation
async function test() {
  try {
    const orderId = 'SAN6-423924816-C7EJNB23JAUDN2';
    const result = await transformOrderToRelease(orderId);
    
    // Save to file
    const fs = require('fs');
    const outputPath = '/Users/chongraktanaka/Projects/mao-service-transformer/release/complete-release-output.json';
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    
    console.log(`\n✅ SUCCESS! Complete release transformation saved to: ${outputPath}`);
    console.log(`📊 Result summary:`);
    console.log(`   - ServiceLevelCode: ${result.ServiceLevelCode}`);
    console.log(`   - OrderSubtotal: ${result.OrderSubtotal}`);
    console.log(`   - ReleaseTotal: ${result.ReleaseTotal}`);
    console.log(`   - TotalCharges: ${result.TotalCharges}`);
    console.log(`   - Customer: ${result.CustomerFirstName}`);
    console.log(`   - Email: ${result.Email}`);
    console.log(`   - Phone: ${result.CustomerPhone}`);
    console.log(`   - Currency: ${result.CurrencyCode}`);
    console.log(`   - Payment Count: ${result.Order.Payment.length}`);
    
    if (result.Order.Payment.length > 0) {
      const payment = result.Order.Payment[0];
      console.log(`   - Payment Amount: ${payment.PaymentMethod[0].Amount}`);
      console.log(`   - Payment Method ID: ${payment.PaymentMethod[0].PaymentMethodId}`);
      console.log(`   - Gateway: ${payment.PaymentMethod[0].GatewayId}`);
    }
    
  } catch (error) {
    console.error('❌ Transformation failed:', error.message);
  } finally {
    await pool.end();
  }
}

// Run the test
test();