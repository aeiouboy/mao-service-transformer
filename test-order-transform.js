/**
 * Test Order Release Transformation
 * Tests the order transformation with updated database configuration
 */

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs/promises');

// Database configuration from spec (updated with Omnia-DEV)
const dbConfig = {
  host: 'cg-omnia-psql-flex-nonprd.central.co.th',
  port: 5432,
  database: 'Omnia-DEV',
  username: 'omniaqa',
  password: 'uYBXitqrwXU=25',
  dialect: 'postgres',
  logging: console.log, // Enable logging to see queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // For development/testing
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig);

// Define Order model (based on actual database schema)
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.STRING,
    field: 'order_id'
  },
  shortOrderNumber: {
    type: DataTypes.STRING,
    field: 'short_order_number'
  },
  bu: {
    type: DataTypes.STRING,
    field: 'bu'
  },
  orgId: {
    type: DataTypes.STRING,
    field: 'org_id'
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
  orderStatus: {
    type: DataTypes.STRING,
    field: 'order_status'
  },
  fulfillmentStatus: {
    type: DataTypes.STRING,
    field: 'fulfillment_status'
  },
  paymentStatus: {
    type: DataTypes.STRING,
    field: 'payment_status'
  },
  cancelAllowed: {
    type: DataTypes.BOOLEAN,
    field: 'cancel_allowed'
  },
  isOnHold: {
    type: DataTypes.BOOLEAN,
    field: 'is_on_hold'
  },
  capturedDate: {
    type: DataTypes.DATE,
    field: 'captured_date'
  },
  orderChargeDetail: {
    type: DataTypes.JSONB,
    field: 'order_charge_detail'
  },
  orderTaxDetail: {
    type: DataTypes.JSONB,
    field: 'order_tax_detail'
  }
}, {
  tableName: 'orders',
  schema: 'order',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define OrderLine model (based on actual database schema)
const OrderLine = sequelize.define('OrderLine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.STRING,
    field: 'order_id'
  },
  orderLineId: {
    type: DataTypes.STRING,
    field: 'order_line_id'
  },
  itemId: {
    type: DataTypes.STRING,
    field: 'item_id'
  },
  quantity: {
    type: DataTypes.DECIMAL,
    field: 'quantity'
  },
  uom: {
    type: DataTypes.STRING,
    field: 'uom'
  },
  unitPrice: {
    type: DataTypes.DECIMAL,
    field: 'unit_price'
  },
  originalUnitPrice: {
    type: DataTypes.DECIMAL,
    field: 'original_unit_price'
  },
  isGift: {
    type: DataTypes.BOOLEAN,
    field: 'is_gift'
  },
  isTaxIncluded: {
    type: DataTypes.BOOLEAN,
    field: 'is_tax_included'
  },
  promisedDeliveryDate: {
    type: DataTypes.DATE,
    field: 'promised_delivery_date'
  },
  shippingMethodId: {
    type: DataTypes.STRING,
    field: 'shipping_method_id'
  },
  fulfillmentStatus: {
    type: DataTypes.STRING,
    field: 'fulfillment_status'
  },
  orderLineStatus: {
    type: DataTypes.STRING,
    field: 'order_line_status'
  },
  deliveryMethod: {
    type: DataTypes.JSONB,
    field: 'delivery_method'
  },
  orderLineChargeDetail: {
    type: DataTypes.JSONB,
    field: 'order_line_charge_detail'
  },
  orderLineTaxDetail: {
    type: DataTypes.JSONB,
    field: 'order_line_tax_detail'
  },
  shipToAddress: {
    type: DataTypes.JSONB,
    field: 'ship_to_address'
  }
}, {
  tableName: 'order_lines',
  schema: 'order',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define relationships - both tables use order_id string field
Order.hasMany(OrderLine, { 
  foreignKey: 'orderId', 
  sourceKey: 'orderId', // Use orderId string field instead of id
  as: 'orderLines' 
});
OrderLine.belongsTo(Order, { 
  foreignKey: 'orderId', 
  targetKey: 'orderId', // Use orderId string field instead of id
  as: 'order' 
});

// Business logic functions (simplified from spec)
function calculateOrderSubtotal(orderLines, order) {
  if (orderLines && orderLines.length > 0) {
    return orderLines.reduce((total, line) => {
      return total + (parseFloat(line.quantity || 0) * parseFloat(line.unitPrice || 0));
    }, 0);
  }
  return 0;
}

function calculateTotalCharges(order) {
  // Direct mapping from OrderChargeDetail[].ChargeTotal (CSV compliant)
  if (order.orderChargeDetail && Array.isArray(order.orderChargeDetail)) {
    return order.orderChargeDetail.reduce((total, charge) => {
      return total + parseFloat(charge.ChargeTotal || 0);
    }, 0);
  }
  return 0;
}

function calculateOrderTotalTaxes(order, orderLines) {
  // Set to 0 (current implementation matches target)
  // But we could potentially use order.orderTaxDetail if needed
  return 0;
}

function calculateOrderDiscounts(subTotal) {
  // Proportional allocation (0.05% for orders ≥100)
  if (subTotal >= 100) {
    return subTotal * 0.0005; // 0.05% discount
  }
  return 0;
}

function generateReleaseId() {
  return `REL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

// Transform order to release format
async function transformOrderToRelease(orderId) {
  console.log(`🔄 Starting transformation for order: ${orderId}`);
  
  try {
    // Find order with order lines
    const order = await Order.findOne({
      where: { orderId },
      include: [{
        model: OrderLine,
        as: 'orderLines'
      }]
    });

    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    console.log(`✅ Found order: ${order.shortOrderNumber || order.orderId} with ${order.orderLines?.length || 0} lines`);

    // Apply business rules for financial calculations
    const orderLines = order.orderLines || [];
    const subTotal = calculateOrderSubtotal(orderLines, order);
    const totalCharges = calculateTotalCharges(order);
    const totalTaxes = calculateOrderTotalTaxes(order, orderLines);
    const totalDiscounts = calculateOrderDiscounts(subTotal);
    const releaseTotal = subTotal + totalCharges + totalTaxes - totalDiscounts;

    console.log(`💰 Financial calculations:
      - Subtotal: ${subTotal}
      - Charges: ${totalCharges}
      - Taxes: ${totalTaxes}
      - Discounts: ${totalDiscounts}
      - Release Total: ${releaseTotal}`);

    // Create release structure
    const releaseData = {
      header: {
        releaseId: generateReleaseId(),
        releaseNumber: `REL-${order.shortOrderNumber || order.orderId}`,
        orderId: order.orderId,
        orderNumber: order.shortOrderNumber || order.orderId,
        releaseType: 'Standard',
        releaseStatus: 'Open',
        totalAmount: releaseTotal,
        subTotal: subTotal,
        totalTax: totalTaxes,
        totalCharges: totalCharges,
        totalDiscount: totalDiscounts,
        customerId: order.customerId,
        customerFirstName: order.customerFirstName,
        customerLastName: order.customerLastName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        currencyCode: order.currencyCode || 'THB',
        orgId: order.orgId,
        bu: order.bu,
        orderStatus: order.orderStatus,
        fulfillmentStatus: order.fulfillmentStatus,
        paymentStatus: order.paymentStatus,
        cancelAllowed: order.cancelAllowed,
        isOnHold: order.isOnHold,
        createdDate: getCurrentTimestamp(),
        modifiedDate: getCurrentTimestamp(),
        estimatedReleaseDate: getCurrentTimestamp(),
        actualReleaseDate: null,
        notes: `Release created for order ${order.shortOrderNumber || order.orderId}`,
      },
      lines: orderLines.map((line, index) => ({
        lineId: line.orderLineId,
        releaseLineId: `REL-LINE-${index + 1}`,
        itemId: line.itemId,
        productId: line.itemId, // Using itemId as productId
        sku: line.itemId, // Using itemId as SKU
        quantity: parseFloat(line.quantity || 0),
        uom: line.uom || 'EACH',
        unitPrice: parseFloat(line.unitPrice || 0),
        originalUnitPrice: parseFloat(line.originalUnitPrice || line.unitPrice || 0),
        lineAmount: parseFloat(line.quantity || 0) * parseFloat(line.unitPrice || 0),
        discountAmount: 0, // Could be calculated from line charges
        taxAmount: 0, // Could be calculated from line tax details
        shippingAmount: 0, // Could be calculated from line charges
        lineStatus: line.orderLineStatus || 'Open',
        fulfillmentStatus: line.fulfillmentStatus || 'CREATED',
        isGift: line.isGift || false,
        isTaxIncluded: line.isTaxIncluded || false,
        promisedDeliveryDate: line.promisedDeliveryDate?.toISOString(),
        shippingMethodId: line.shippingMethodId,
        deliveryMethod: line.deliveryMethod,
        shipToAddress: line.shipToAddress,
        orderLineChargeDetail: line.orderLineChargeDetail,
        orderLineTaxDetail: line.orderLineTaxDetail,
      })),
      payments: [], // Placeholder - would need payment table
      allocations: [], // Placeholder - would need allocation table
      metadata: {
        transformedBy: 'Order Release Transformer',
        transformedAt: getCurrentTimestamp(),
        version: '1.0.0',
        source: 'Database',
        database: dbConfig.database,
      }
    };

    console.log(`🎯 Release structure created with ${releaseData.lines.length} lines`);

    return releaseData;

  } catch (error) {
    console.error(`❌ Transformation failed:`, error.message);
    throw error;
  }
}

// Save release to file
async function saveReleaseToFile(releaseData, orderId) {
  try {
    const outputDir = path.join(__dirname, 'release');
    const outputPath = path.join(outputDir, 'release-output.json');
    
    // Ensure directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Save file
    await fs.writeFile(outputPath, JSON.stringify(releaseData, null, 2));
    
    console.log(`💾 Release saved to: ${outputPath}`);
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Failed to save release:`, error.message);
    throw error;
  }
}

// Test database connection
async function testDatabaseConnection() {
  try {
    console.log('🔗 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // Test basic query to see available tables and schemas
    const [schemaResults] = await sequelize.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY schema_name
    `);
    
    console.log(`📋 Available schemas:`, schemaResults.map(r => r.schema_name).join(', '));
    
    const [results] = await sequelize.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
        AND table_type = 'BASE TABLE'
      ORDER BY table_schema, table_name
    `);
    
    console.log(`📊 Found ${results.length} tables in database:`);
    results.slice(0, 15).forEach(table => {
      console.log(`  - ${table.table_schema}.${table.table_name}`);
    });
    if (results.length > 15) {
      console.log(`  ... and ${results.length - 15} more tables`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Find sample order for testing
async function findSampleOrder() {
  try {
    console.log('🔍 Looking for sample orders...');
    
    // First, let's inspect the orders table structure
    const [orderColumns] = await sequelize.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'order' AND table_name = 'orders'
      ORDER BY ordinal_position
    `);
    
    console.log('📋 Orders table columns:');
    orderColumns.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type})`);
    });
    
    // Now let's check order_lines table structure
    const [lineColumns] = await sequelize.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'order' AND table_name = 'order_lines'
      ORDER BY ordinal_position
    `);
    
    console.log('📋 Order lines table columns:');
    lineColumns.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type})`);
    });
    
    // Try to find any order with order lines (using actual column names)
    const [results] = await sequelize.query(`
      SELECT o.order_id, 
             COUNT(ol.order_line_id) as line_count
      FROM "order".orders o 
      LEFT JOIN "order".order_lines ol ON o.order_id = ol.order_id 
      GROUP BY o.order_id
      HAVING COUNT(ol.order_line_id) > 0
      ORDER BY o.order_id DESC 
      LIMIT 5
    `);
    
    if (results.length > 0) {
      console.log(`📋 Found ${results.length} orders with lines:`);
      results.forEach((order, i) => {
        console.log(`  ${i + 1}. ${order.order_id} - ${order.line_count} lines`);
      });
      return results[0].order_id; // Return first order ID
    } else {
      console.log('⚠️ No orders with lines found');
      
      // Let's check if there are any orders at all
      const [allOrders] = await sequelize.query(`
        SELECT order_id, short_order_number, customer_id, created_at
        FROM "order".orders 
        ORDER BY created_at DESC 
        LIMIT 3
      `);
      
      if (allOrders.length > 0) {
        console.log(`📋 Found ${allOrders.length} orders (without lines):`);
        allOrders.forEach((order, i) => {
          console.log(`  ${i + 1}. ${order.order_id} (${order.short_order_number || 'no number'}) - Customer: ${order.customer_id}`);
        });
        
        // Let's create a mock transformation for the first order
        return allOrders[0].order_id;
      }
      
      // Check if there are any order lines at all
      const [allLines] = await sequelize.query(`
        SELECT order_id, order_line_id, item_id, quantity, unit_price
        FROM "order".order_lines 
        ORDER BY created_at DESC 
        LIMIT 3
      `);
      
      if (allLines.length > 0) {
        console.log(`📋 Found ${allLines.length} order lines (possibly orphaned):`);
        allLines.forEach((line, i) => {
          console.log(`  ${i + 1}. ${line.order_line_id} - Order: ${line.order_id} - Item: ${line.item_id}`);
        });
      } else {
        console.log('📋 No order lines found either');
      }
      
      return null;
    }
    
  } catch (error) {
    console.error('❌ Failed to find sample orders:', error.message);
    return null;
  }
}

// Main test function
async function main() {
  console.log('🚀 Starting Order Release Transformer Test\n');
  console.log(`📡 Database: ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}\n`);

  try {
    // Test database connection
    const connected = await testDatabaseConnection();
    if (!connected) {
      console.log('❌ Cannot proceed without database connection');
      return;
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Find a sample order
    const sampleOrderId = await findSampleOrder();
    if (!sampleOrderId) {
      console.log('❌ Cannot proceed without sample order');
      return;
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Transform the sample order
    const releaseData = await transformOrderToRelease(sampleOrderId);
    
    console.log('\n' + '='.repeat(50) + '\n');

    // Save to file
    const outputPath = await saveReleaseToFile(releaseData, sampleOrderId);
    
    console.log('\n✅ Order Release Transformation Complete!');
    console.log(`📄 Output file: ${outputPath}`);
    console.log(`🎯 Order ID: ${sampleOrderId}`);
    console.log(`💰 Total Amount: $${releaseData.header.totalAmount}`);
    console.log(`📦 Lines: ${releaseData.lines.length}`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    // Close database connection
    await sequelize.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  transformOrderToRelease,
  testDatabaseConnection,
  findSampleOrder
};