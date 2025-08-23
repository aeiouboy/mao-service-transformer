const { Sequelize, DataTypes } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'Omnia-DEV',
  username: 'postgres',
  password: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

// Order model
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
  customerEmail: {
    type: DataTypes.STRING,
    field: 'customer_email'
  },
  customerFirstName: {
    type: DataTypes.STRING,
    field: 'customer_first_name'
  },
  customerLastName: {
    type: DataTypes.STRING,
    field: 'customer_last_name'
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
  orderTotal: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'order_total'
  },
  totalTaxes: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_taxes'
  },
  totalCharges: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_charges'
  },
  totalDiscounts: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'total_discounts'
  },
  orderStatus: {
    type: DataTypes.STRING,
    field: 'order_status'
  },
  paymentStatus: {
    type: DataTypes.STRING,
    field: 'payment_status'
  },
  fulfillmentStatus: {
    type: DataTypes.STRING,
    field: 'fulfillment_status'
  },
  orderType: {
    type: DataTypes.JSONB,
    field: 'order_type'
  },
  orderChargeDetail: {
    type: DataTypes.JSONB,
    field: 'order_charge_detail'
  },
  orderTaxDetail: {
    type: DataTypes.JSONB,
    field: 'order_tax_detail'
  },
  orderNote: {
    type: DataTypes.JSONB,
    field: 'order_note'
  },
  orderExtension1: {
    type: DataTypes.JSONB,
    field: 'order_extension1'
  },
  orderLocale: {
    type: DataTypes.STRING,
    field: 'order_locale'
  },
  orgId: {
    type: DataTypes.STRING,
    field: 'org_id'
  },
  facilityCode: {
    type: DataTypes.STRING,
    field: 'facility_code'
  },
  shipFromLocationId: {
    type: DataTypes.STRING,
    field: 'ship_from_location_id'
  },
  maxFulfillmentStatusId: {
    type: DataTypes.STRING,
    field: 'max_fulfillment_status_id'
  },
  minFulfillmentStatusId: {
    type: DataTypes.STRING,
    field: 'min_fulfillment_status_id'
  },
  sellingChannel: {
    type: DataTypes.STRING,
    field: 'selling_channel'
  },
  cancelAllowed: {
    type: DataTypes.BOOLEAN,
    field: 'cancel_allowed'
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    field: 'is_cancelled'
  },
  isOnHold: {
    type: DataTypes.BOOLEAN,
    field: 'is_on_hold'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  },
  capturedDate: {
    type: DataTypes.DATE,
    field: 'captured_date'
  },
  createdBy: {
    type: DataTypes.STRING,
    field: 'created_by'
  },
  docType: {
    type: DataTypes.JSONB,
    field: 'doc_type'
  }
}, {
  tableName: 'orders',
  schema: 'order'
});

// OrderLine model
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
  orderLineTotal: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'order_line_total'
  },
  orderLineSubtotal: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'order_line_subtotal'
  },
  orderLineTaxTotal: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'order_line_tax_total'
  },
  minFulfillmentStatusId: {
    type: DataTypes.STRING,
    field: 'min_fulfillment_status_id'
  },
  fulfillmentGroupId: {
    type: DataTypes.STRING,
    field: 'fulfillment_group_id'
  },
  orderLineChargeDetail: {
    type: DataTypes.JSONB,
    field: 'order_line_charge_detail'
  },
  orderLineTaxDetail: {
    type: DataTypes.JSONB,
    field: 'order_line_tax_detail'
  },
  orderLineExtension1: {
    type: DataTypes.JSONB,
    field: 'order_line_extension1'
  }
}, {
  tableName: 'order_lines',
  schema: 'order'
});

// Payment model
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'amount'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    field: 'payment_method'
  },
  status: {
    type: DataTypes.STRING,
    field: 'status'
  },
  orgId: {
    type: DataTypes.STRING,
    field: 'org_id'
  },
  statusId: {
    type: DataTypes.STRING,
    field: 'status_id'
  },
  paymentType: {
    type: DataTypes.JSONB,
    field: 'payment_type'
  },
  paymentMethodDetail: {
    type: DataTypes.JSONB,
    field: 'payment_method_detail'
  },
  paymentTransactionDetail: {
    type: DataTypes.JSONB,
    field: 'payment_transaction_detail'
  }
}, {
  tableName: 'payments',
  schema: 'order'
});

async function queryOrder() {
  try {
    console.log('🔍 Querying order: 123456789-C7L2LCDCTCC2AE');
    console.log('==========================================');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Query order
    const order = await Order.findOne({
      where: { orderId: '123456789-C7L2LCDCTCC2AE' },
      include: [
        {
          model: OrderLine,
          as: 'orderLines',
          required: false
        },
        {
          model: Payment,
          as: 'payments',
          required: false
        }
      ]
    });

    if (!order) {
      console.log('❌ Order not found');
      return;
    }

    console.log('\n📋 Order Details:');
    console.log('================');
    console.log('Order ID:', order.orderId);
    console.log('Customer Email:', order.customerEmail);
    console.log('Customer First Name:', order.customerFirstName);
    console.log('Customer Last Name:', order.customerLastName);
    console.log('Customer Phone:', order.customerPhone);
    console.log('Currency Code:', order.currencyCode);
    console.log('Order Sub Total:', order.orderSubTotal);
    console.log('Order Total:', order.orderTotal);
    console.log('Total Taxes:', order.totalTaxes);
    console.log('Total Charges:', order.totalCharges);
    console.log('Total Discounts:', order.totalDiscounts);
    console.log('Order Status:', order.orderStatus);
    console.log('Payment Status:', order.paymentStatus);
    console.log('Fulfillment Status:', order.fulfillmentStatus);
    console.log('Order Locale:', order.orderLocale);
    console.log('Org ID:', order.orgId);
    console.log('Facility Code:', order.facilityCode);
    console.log('Ship From Location ID:', order.shipFromLocationId);
    console.log('Max Fulfillment Status ID:', order.maxFulfillmentStatusId);
    console.log('Min Fulfillment Status ID:', order.minFulfillmentStatusId);
    console.log('Selling Channel:', order.sellingChannel);
    console.log('Cancel Allowed:', order.cancelAllowed);
    console.log('Is Cancelled:', order.isCancelled);
    console.log('Is On Hold:', order.isOnHold);
    console.log('Created At:', order.createdAt);
    console.log('Updated At:', order.updatedAt);
    console.log('Captured Date:', order.capturedDate);
    console.log('Created By:', order.createdBy);

    console.log('\n📦 JSONB Fields:');
    console.log('===============');
    console.log('Order Type:', JSON.stringify(order.orderType, null, 2));
    console.log('Order Charge Detail:', JSON.stringify(order.orderChargeDetail, null, 2));
    console.log('Order Tax Detail:', JSON.stringify(order.orderTaxDetail, null, 2));
    console.log('Order Note:', JSON.stringify(order.orderNote, null, 2));
    console.log('Order Extension1:', JSON.stringify(order.orderExtension1, null, 2));
    console.log('Doc Type:', JSON.stringify(order.docType, null, 2));

    console.log('\n📋 Order Lines:');
    console.log('==============');
    if (order.orderLines && order.orderLines.length > 0) {
      order.orderLines.forEach((line, index) => {
        console.log(`\nOrder Line ${index + 1}:`);
        console.log('  Order Line ID:', line.orderLineId);
        console.log('  Item ID:', line.itemId);
        console.log('  Item Description:', line.itemDescription);
        console.log('  Quantity:', line.quantity);
        console.log('  Unit Price:', line.unitPrice);
        console.log('  Order Line Total:', line.orderLineTotal);
        console.log('  Order Line Subtotal:', line.orderLineSubtotal);
        console.log('  Order Line Tax Total:', line.orderLineTaxTotal);
        console.log('  Min Fulfillment Status ID:', line.minFulfillmentStatusId);
        console.log('  Fulfillment Group ID:', line.fulfillmentGroupId);
        console.log('  Order Line Charge Detail:', JSON.stringify(line.orderLineChargeDetail, null, 2));
        console.log('  Order Line Tax Detail:', JSON.stringify(line.orderLineTaxDetail, null, 2));
        console.log('  Order Line Extension1:', JSON.stringify(line.orderLineExtension1, null, 2));
      });
    } else {
      console.log('No order lines found');
    }

    console.log('\n💳 Payments:');
    console.log('===========');
    if (order.payments && order.payments.length > 0) {
      order.payments.forEach((payment, index) => {
        console.log(`\nPayment ${index + 1}:`);
        console.log('  Payment ID:', payment.paymentId);
        console.log('  Amount:', payment.amount);
        console.log('  Payment Method:', payment.paymentMethod);
        console.log('  Status:', payment.status);
        console.log('  Org ID:', payment.orgId);
        console.log('  Status ID:', payment.statusId);
        console.log('  Payment Type:', JSON.stringify(payment.paymentType, null, 2));
        console.log('  Payment Method Detail:', JSON.stringify(payment.paymentMethodDetail, null, 2));
        console.log('  Payment Transaction Detail:', JSON.stringify(payment.paymentTransactionDetail, null, 2));
      });
    } else {
      console.log('No payments found');
    }

    console.log('\n🎯 Fields to Map:');
    console.log('================');
    console.log('✅ Available fields that can be mapped:');
    console.log('- orderId -> OrderId');
    console.log('- customerEmail -> Email, CustomerEmail');
    console.log('- customerFirstName -> CustomerFirstName, FirstName');
    console.log('- customerLastName -> CustomerLastName, LastName');
    console.log('- customerPhone -> CustomerPhone, Phone');
    console.log('- currencyCode -> CurrencyCode');
    console.log('- orderSubTotal -> OrderSubtotal');
    console.log('- orderTotal -> OrderTotal, ReleaseTotal');
    console.log('- totalTaxes -> TotalTaxes, OrderTotalTaxes');
    console.log('- totalCharges -> TotalCharges, OrderTotalCharges');
    console.log('- totalDiscounts -> TotalDiscounts, OrderTotalDiscounts');
    console.log('- orderStatus -> OrderStatus');
    console.log('- paymentStatus -> PaymentStatusId');
    console.log('- fulfillmentStatus -> FulfillmentStatus');
    console.log('- orderLocale -> OrderLocale');
    console.log('- orgId -> OrgId, OrganizationId');
    console.log('- facilityCode -> FacilityCode');
    console.log('- shipFromLocationId -> ShipFromLocationId');
    console.log('- maxFulfillmentStatusId -> MaxFulfillmentStatusId');
    console.log('- minFulfillmentStatusId -> MinFulfillmentStatusId');
    console.log('- sellingChannel -> SellingChannelId');
    console.log('- cancelAllowed -> CancelAllowed (in ExtendedFields)');
    console.log('- isCancelled -> IsCancelled');
    console.log('- isOnHold -> IsOnHold');
    console.log('- createdAt -> CreateOrderTimeStamp, CreateReleaseTimeStamp');
    console.log('- updatedAt -> UpdatedTimestamp');
    console.log('- capturedDate -> CapturedDate');
    console.log('- createdBy -> CreatedBy');

    console.log('\n📦 JSONB fields that can be mapped:');
    console.log('- orderType -> OrderTypeId, DocTypeId');
    console.log('- orderChargeDetail -> ChargeDetail');
    console.log('- orderTaxDetail -> TaxDetail');
    console.log('- orderNote -> Note');
    console.log('- orderExtension1 -> ReleaseExtendedFields');
    console.log('- docType -> DocTypeId');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

queryOrder();
