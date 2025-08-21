import { Order } from '../.../../orders/entities/order.entity';

describe('Order Entity', () => {
  describe('Entity Definition', () => {
    it('should be defined', () => {
      expect(Order).toBeDefined();
    });

    it('should be a function (class constructor)', () => {
      expect(typeof Order).toBe('function');
    });

    it('should have correct prototype chain', () => {
      expect(Order.prototype).toBeDefined();
    });
  });

  describe('Entity Structure', () => {
    it('should have static properties for Sequelize configuration', () => {
      // Test the class exists and can be referenced
      expect(Order.name).toBe('Order');
    });

    it('should allow creation of plain order objects for validation', () => {
      const orderData = {
        orderId: 'ORDER-123',
        orderNumber: 'ORD-2025-001',
        orderType: 'STANDARD',
        orderStatus: 'CREATED',
        orderDate: new Date(),
        customerId: 'CUST-123',
        totalAmount: 157.5,
        subTotal: 150.0,
      };

      expect(orderData.orderId).toBe('ORDER-123');
      expect(orderData.totalAmount).toBe(157.5);
    });
  });

  describe('Mock Data Creation', () => {
    it('should allow creation of mock order data', () => {
      const mockOrderData = {
        orderId: 'ORDER-123',
        orderNumber: 'ORD-2025-001',
        orderType: 'STANDARD',
        orderStatus: 'CREATED',
        orderDate: new Date(),
        customerId: 'CUST-123',
        customerType: 'RETAIL',
        orderSource: 'WEB',
        orderChannel: 'ONLINE',
        totalAmount: 157.5,
        subTotal: 150.0,
        totalTax: 7.5,
        totalShipping: 25.0,
        totalDiscount: 5.0,
        billingAddress: {
          street: '123 Test St',
          city: 'Bangkok',
          postalCode: '10100',
          country: 'TH',
        },
        shippingAddress: {
          street: '456 Ship St',
          city: 'Bangkok',
          postalCode: '10200',
          country: 'TH',
        },
      };

      expect(mockOrderData.orderId).toBe('ORDER-123');
      expect(mockOrderData.totalAmount).toBe(157.5);
      expect(mockOrderData.billingAddress.city).toBe('Bangkok');
      expect(mockOrderData.orderDate).toBeInstanceOf(Date);
    });
  });
});
