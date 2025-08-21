import { OrderLine } from '../.../../orders/entities/order-line.entity';

describe('OrderLine Entity', () => {
  describe('Entity Definition', () => {
    it('should be defined', () => {
      expect(OrderLine).toBeDefined();
    });

    it('should be a function (class constructor)', () => {
      expect(typeof OrderLine).toBe('function');
    });
  });

  describe('Basic Properties', () => {
    it('should allow creation of plain order line objects', () => {
      const orderLineData = {
        orderLineId: 'LINE-123',
        orderId: 'ORDER-123',
        productId: 'PROD-123',
        sku: 'TEST-SKU-001',
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 50.0,
        lineAmount: 100.0,
        fulfillmentType: 'SHIP',
        lineStatus: 'ACTIVE',
      };

      expect(orderLineData.orderLineId).toBe('LINE-123');
      expect(orderLineData.quantity).toBe(2);
    });
  });
});
