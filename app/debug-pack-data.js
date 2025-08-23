const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://localhost:5432/mao_db', { 
  logging: false 
});

async function checkOrderData() {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        ol.id,
        ol.item_id,
        ol.quantity,
        ol.unit_price,
        ol.order_line_charge_detail,
        ol.order_line_tax_detail
      FROM order.order_lines ol 
      WHERE ol.order_id = '123456789-C7L2LCDCTCC2AE'
      ORDER BY ol.id
    `);
    
    console.log('=== Order Lines Data ===');
    results.forEach((row, index) => {
      console.log(`\nLine ${index + 1}: ${row.item_id}`);
      console.log(`  quantity: ${row.quantity}, unit_price: ${row.unit_price}`);
      console.log(`  order_line_charge_detail:`, JSON.stringify(row.order_line_charge_detail, null, 2));
      console.log(`  order_line_tax_detail:`, JSON.stringify(row.order_line_tax_detail, null, 2));
    });
    
    // Also check order level charges
    const [orderResults] = await sequelize.query(`
      SELECT 
        o.order_id,
        o.order_charge_detail,
        o.order_tax_detail
      FROM order.orders o 
      WHERE o.order_id = '123456789-C7L2LCDCTCC2AE'
    `);
    
    console.log('\n\n=== Order Level Data ===');
    orderResults.forEach((row) => {
      console.log(`\nOrder: ${row.order_id}`);
      console.log(`  order_charge_detail:`, JSON.stringify(row.order_charge_detail, null, 2));
      console.log(`  order_tax_detail:`, JSON.stringify(row.order_tax_detail, null, 2));
    });
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkOrderData();