const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs').promises;
const path = require('path');

// Database configuration - you may need to adjust these values
const sequelize = new Sequelize({
  dialect: 'postgres', // or 'mysql' depending on your setup
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'mao_service_transformer',
  logging: false,
});

// Define models based on the entities
const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'order_id'
  },
  customerId: {
    type: DataTypes.STRING,
    field: 'customer_id'
  },
  customerFirstName: {
    type: DataTypes.STRING,
    field: 'customer_first_name'
  },
  customerLastName: {
    type: DataTypes.STRING,
    field: 'customer_last_name'
  },
  customerEmail: {
    type: DataTypes.STRING,
    field: 'customer_email'
  },
  customerPhone: {
    type: DataTypes.STRING,
    field: 'customer_phone'
  },
  currencyCode: {
    type: DataTypes.STRING,
    field: 'currency_code'
  },
  orderSubTotal: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'order_sub_total'
  },
  totalTaxes: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_taxes'
  },
  totalDiscounts: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_discounts'
  },
  orderTotal: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'order_total'
  },
  isOnHold: {
    type: DataTypes.BOOLEAN,
    field: 'is_on_hold'
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    field: 'is_cancelled'
  },
  cancelAllowed: {
    type: DataTypes.BOOLEAN,
    field: 'cancel_allowed'
  },
  maxFulfillmentStatusId: {
    type: DataTypes.STRING,
    field: 'max_fulfillment_status_id'
  },
  orgId: {
    type: DataTypes.STRING,
    field: 'org_id'
  },
  docType: {
    type: DataTypes.JSONB,
    field: 'doc_type'
  },
  orderType: {
    type: DataTypes.JSONB,
    field: 'order_type'
  },
  sellingChannel: {
    type: DataTypes.STRING,
    field: 'selling_channel'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true
});

const OrderLine = sequelize.define('OrderLine', {
  orderLineId: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'order_line_id'
  },
  orderId: {
    type: DataTypes.STRING,
    field: 'order_id'
  },
  itemId: {
    type: DataTypes.STRING,
    field: 'item_id'
  },
  itemDescription: {
    type: DataTypes.STRING,
    field: 'item_description'
  },
  quantity: {
    type: DataTypes.INTEGER,
    field: 'quantity'
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'unit_price'
  },
  minFulfillmentStatusId: {
    type: DataTypes.STRING,
    field: 'min_fulfillment_status_id'
  },
  orderLineTaxDetail: {
    type: DataTypes.JSONB,
    field: 'order_line_tax_detail'
  },
  orderLineChargeDetail: {
    type: DataTypes.JSONB,
    field: 'order_line_charge_detail'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'order_lines',
  timestamps: true,
  underscored: true
});

const Payment = sequelize.define('Payment', {
  paymentId: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'payment_id'
  },
  orderId: {
    type: DataTypes.STRING,
    field: 'order_id'
  },
  orgId: {
    type: DataTypes.STRING,
    field: 'org_id'
  },
  statusId: {
    type: DataTypes.STRING,
    field: 'status_id'
  },
  paymentStatus: {
    type: DataTypes.STRING,
    field: 'payment_status'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'payments',
  timestamps: true,
  underscored: true
});

const PaymentMethod = sequelize.define('PaymentMethod', {
  paymentMethodId: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'payment_method_id'
  },
  paymentId: {
    type: DataTypes.STRING,
    field: 'payment_id'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'amount'
  },
  currencyCode: {
    type: DataTypes.STRING,
    field: 'currency_code'
  },
  paymentTypeId: {
    type: DataTypes.STRING,
    field: 'payment_type_id'
  },
  gatewayId: {
    type: DataTypes.STRING,
    field: 'gateway_id'
  },
  currentAuthAmount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'current_auth_amount'
  },
  currentSettleAmount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'current_settle_amount'
  },
  currentRefundAmount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'current_refund_amount'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'payment_methods',
  timestamps: true,
  underscored: true
});

// Define associations
Order.hasMany(OrderLine, { foreignKey: 'orderId', sourceKey: 'orderId' });
OrderLine.belongsTo(Order, { foreignKey: 'orderId', targetKey: 'orderId' });

Order.hasMany(Payment, { foreignKey: 'orderId', sourceKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId', targetKey: 'orderId' });

Payment.hasMany(PaymentMethod, { foreignKey: 'paymentId', sourceKey: 'paymentId' });
PaymentMethod.belongsTo(Payment, { foreignKey: 'paymentId', targetKey: 'paymentId' });

async function queryOrder(orderId) {
  try {
    console.log(`🔍 Querying order: ${orderId}`);
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Query order with all related data
    const order = await Order.findOne({
      where: { orderId },
      include: [
        {
          model: OrderLine,
          as: 'OrderLines'
        },
        {
          model: Payment,
          as: 'Payments',
          include: [
            {
              model: PaymentMethod,
              as: 'PaymentMethods'
            }
          ]
        }
      ]
    });

    if (!order) {
      console.log(`❌ Order not found: ${orderId}`);
      return null;
    }

    console.log('✅ Order found!');
    console.log('\n📊 ORDER DATA STRUCTURE:');
    console.log('========================');
    
    // Log order details
    console.log('\n🔹 Order Header:');
    console.log(JSON.stringify(order.toJSON(), null, 2));

    // Save raw database data to file
    const outputPath = path.join(__dirname, '..', 'release', `database-query-${orderId}.json`);
    await fs.writeFile(outputPath, JSON.stringify(order.toJSON(), null, 2));
    console.log(`\n💾 Raw database data saved to: ${outputPath}`);

    // Analyze hardcoded values in transformation service
    console.log('\n🔍 ANALYZING HARDCODED VALUES IN TRANSFORMATION SERVICE:');
    console.log('=====================================================');
    
    analyzeHardcodedValues(order);

    return order;

  } catch (error) {
    console.error('❌ Error querying order:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

function analyzeHardcodedValues(order) {
  console.log('\n🔹 Current Database Values vs Hardcoded Values:');
  console.log('-----------------------------------------------');
  
  // Check order-level hardcoded values
  const hardcodedChecks = [
    { field: 'ServiceLevelCode', dbValue: order.maxFulfillmentStatusId, hardcoded: 'STD' },
    { field: 'MaxFulfillmentStatusId', dbValue: order.maxFulfillmentStatusId, hardcoded: '3000' },
    { field: 'CurrencyCode', dbValue: order.currencyCode, hardcoded: 'THB' },
    { field: 'OrganizationId', dbValue: order.orgId, hardcoded: 'CFM-SIT' },
    { field: 'PaymentStatusId', dbValue: null, hardcoded: '5000.000' },
    { field: 'MinFulfillmentStatusId', dbValue: null, hardcoded: '3000' },
    { field: 'ShipViaId', dbValue: null, hardcoded: 'InStore_STD' },
    { field: 'CarrierCode', dbValue: null, hardcoded: 'InStore' },
    { field: 'OrderLocale', dbValue: null, hardcoded: 'th' },
    { field: 'ConfirmedDate', dbValue: null, hardcoded: '2025-08-22T08:34:45.141' },
    { field: 'CreateReleaseTimeStamp', dbValue: null, hardcoded: '2025-08-22T08:34:46.053' },
    { field: 'CreateOrderTimeStamp', dbValue: null, hardcoded: '2025-08-22T08:34:26.784' },
    { field: 'EffectiveRank', dbValue: null, hardcoded: '1020250822082102' },
    { field: 'PostalCode', dbValue: null, hardcoded: '99999' },
    { field: 'Address1', dbValue: null, hardcoded: 'Grab Address1' },
    { field: 'Address2', dbValue: null, hardcoded: 'Grab Address2' },
    { field: 'CreatedBy', dbValue: null, hardcoded: 'pubstestuser@twd' },
    { field: 'ShipFromLocationId', dbValue: null, hardcoded: 'CFM6470' },
    { field: 'CapturedDate', dbValue: null, hardcoded: '2025-08-22T08:21:02' }
  ];

  hardcodedChecks.forEach(check => {
    const status = check.dbValue ? '✅' : '❌';
    console.log(`${status} ${check.field}:`);
    console.log(`   Database: ${check.dbValue || 'NULL'}`);
    console.log(`   Hardcoded: ${check.hardcoded}`);
    console.log('');
  });

  // Check order lines
  if (order.OrderLines && order.OrderLines.length > 0) {
    console.log('\n🔹 Order Lines Analysis:');
    console.log('------------------------');
    order.OrderLines.forEach((line, index) => {
      console.log(`\nLine ${index + 1} (${line.itemId}):`);
      console.log(`  Quantity: ${line.quantity}`);
      console.log(`  Unit Price: ${line.unitPrice}`);
      console.log(`  Min Fulfillment Status: ${line.minFulfillmentStatusId || 'NULL (hardcoded: 3500)'}`);
      console.log(`  Tax Details: ${line.orderLineTaxDetail ? 'Present' : 'NULL'}`);
      console.log(`  Charge Details: ${line.orderLineChargeDetail ? 'Present' : 'NULL'}`);
    });
  }

  // Check payments
  if (order.Payments && order.Payments.length > 0) {
    console.log('\n🔹 Payments Analysis:');
    console.log('--------------------');
    order.Payments.forEach((payment, index) => {
      console.log(`\nPayment ${index + 1}:`);
      console.log(`  Status ID: ${payment.statusId || 'NULL (hardcoded: 5000.000)'}`);
      console.log(`  Org ID: ${payment.orgId || 'NULL'}`);
      
      if (payment.PaymentMethods && payment.PaymentMethods.length > 0) {
        payment.PaymentMethods.forEach((method, methodIndex) => {
          console.log(`  Method ${methodIndex + 1}:`);
          console.log(`    Amount: ${method.amount}`);
          console.log(`    Currency: ${method.currencyCode}`);
          console.log(`    Payment Type: ${method.paymentTypeId || 'NULL'}`);
          console.log(`    Gateway: ${method.gatewayId || 'NULL (hardcoded: Simulator)'}`);
        });
      }
    });
  }
}

// Main execution
const orderId = process.argv[2] || '123456789-C7L2LCDCTCC2AE';

console.log('🚀 Starting database query for order analysis...');
console.log(`📋 Target Order ID: ${orderId}`);
console.log('');

queryOrder(orderId)
  .then(() => {
    console.log('\n✅ Analysis completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Analysis failed:', error);
    process.exit(1);
  });
