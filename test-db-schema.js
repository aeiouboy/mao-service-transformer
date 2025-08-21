const { Client } = require('pg');

async function checkOrderSchema() {
  const client = new Client({
    host: 'cg-omnia-psql-flex-nonprd.central.co.th',
    port: 5432,
    database: 'Omnia-DEV',
    user: 'omniaqa',
    password: 'uYBXitqrwXU=25',
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    // Check the orders table schema
    console.log('\n📋 Checking orders table schema:');
    const schemaQuery = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'order' 
        AND table_name = 'orders'
      ORDER BY ordinal_position;
    `;
    
    const schemaResult = await client.query(schemaQuery);
    console.log('Orders table columns:', schemaResult.rows);

    // Check what the actual order record looks like
    console.log('\n🔍 Checking sample order record:');
    const sampleQuery = `
      SELECT * 
      FROM "order".orders 
      WHERE "order"."orders".order_id = 'SAN6-423924816-C7EJNB23JAUDN2'
      LIMIT 1;
    `;
    
    const sampleResult = await client.query(sampleQuery);
    if (sampleResult.rows.length > 0) {
      console.log('Sample order found:', sampleResult.rows[0]);
    } else {
      console.log('❌ No order found with that ID, trying ID field...');
      
      // Try with numeric id field instead
      const idQuery = `
        SELECT * 
        FROM "order".orders 
        WHERE id = 'SAN6-423924816-C7EJNB23JAUDN2'
        LIMIT 1;
      `;
      
      try {
        const idResult = await client.query(idQuery);
        console.log('ID query result:', idResult.rows);
      } catch (error) {
        console.log('ID query failed:', error.message);
        
        // Let's see what orders exist
        console.log('\n📊 Showing first few orders in table:');
        const listQuery = `SELECT id, order_id, order_number FROM "order".orders LIMIT 5;`;
        const listResult = await client.query(listQuery);
        console.log('Sample orders:', listResult.rows);
      }
    }

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await client.end();
  }
}

checkOrderSchema();