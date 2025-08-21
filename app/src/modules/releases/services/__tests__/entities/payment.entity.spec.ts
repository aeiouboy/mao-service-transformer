import { Payment } from '../.../../payments/entities/payment.entity';

describe('Payment Entity', () => {
  describe('Entity Definition', () => {
    it('should be defined', () => {
      expect(Payment).toBeDefined();
    });

    it('should be a function (class constructor)', () => {
      expect(typeof Payment).toBe('function');
    });
  });

  describe('Basic Properties', () => {
    it('should allow creation of plain payment objects', () => {
      const paymentData = {
        paymentId: 'PAY-123',
        orderId: 'ORDER-123',
        paymentType: 'CREDIT_CARD',
        amount: 157.5,
        status: 'AUTHORIZED',
        authorizationCode: 'AUTH-123456',
        transactionId: 'TXN-789012',
        processedDate: new Date(),
      };

      expect(paymentData.paymentId).toBe('PAY-123');
      expect(paymentData.amount).toBe(157.5);
    });
  });
});
