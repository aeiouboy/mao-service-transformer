import { Test, TestingModule } from '@nestjs/testing';

import { Payment } from '../.../../payments/entities/payment.entity';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { PaymentMethodDTO } from '../../release-message.dto';

describe('PaymentMapper', () => {
  let mapper: PaymentMapper;

  const mockPayment: Payment = {
    paymentId: 'PAY-123',
    orderId: 'ORDER-123',
    paymentType: 'CREDIT_CARD',
    amount: 157.5,
    status: 'AUTHORIZED',
    authorizationCode: 'AUTH-123456',
    transactionId: 'TXN-789012',
    processedDate: new Date('2025-08-21T10:05:00Z'),
    cardType: 'VISA',
    maskedCardNumber: '****-****-****-1234',
  } as Payment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMapper],
    }).compile();

    mapper = module.get<PaymentMapper>(PaymentMapper);
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('mapToPaymentMethodDTO', () => {
    it('should map payment entity to DTO format', () => {
      // Act
      const result = mapper.mapToPaymentMethodDTO(mockPayment);

      // Assert
      expect(result).toBeInstanceOf(PaymentMethodDTO);
      expect(result.paymentId).toBe('PAY-123');
      expect(result.paymentType).toBe('CREDIT_CARD');
      expect(result.amount).toBe(157.5);
      expect(result.status).toBe('AUTHORIZED');
      expect(result.authorizationCode).toBe('AUTH-123456');
      expect(result.transactionId).toBe('TXN-789012');
    });

    it('should format processed date to ISO string', () => {
      // Act
      const result = mapper.mapToPaymentMethodDTO(mockPayment);

      // Assert
      expect(result.processedDate).toBe('2025-08-21T10:05:00.000Z');
    });

    it('should include card information when available', () => {
      // Act
      const result = mapper.mapToPaymentMethodDTO(mockPayment);

      // Assert
      expect(result.cardType).toBe('VISA');
      expect(result.maskedCardNumber).toBe('****-****-****-1234');
    });

    it('should handle payment without card information', () => {
      // Arrange
      const cashPayment = {
        ...mockPayment,
        paymentType: 'CASH',
        cardType: undefined,
        maskedCardNumber: undefined,
      } as Payment;
      // Act
      const result = mapper.mapToPaymentMethodDTO(cashPayment);

      // Assert
      expect(result.paymentType).toBe('CASH');
      expect(result.cardType).toBeUndefined();
      expect(result.maskedCardNumber).toBeUndefined();
    });

    it('should round amount to 2 decimal places', () => {
      // Arrange
      const paymentWithPreciseAmount = {
        ...mockPayment,
        amount: 157.789,
      } as Payment;
      // Act
      const result = mapper.mapToPaymentMethodDTO(paymentWithPreciseAmount);

      // Assert
      expect(result.amount).toBe(157.79);
    });
  });

  describe('mapMultiplePayments', () => {
    it('should map array of payments to DTOs', () => {
      // Arrange
      const payments = [
        mockPayment,
        {
          ...mockPayment,
          paymentId: 'PAY-124',
          paymentType: 'DEBIT_CARD',
          amount: 50.0,
        } as Payment,
      ];
      // Act
      const result = mapper.mapMultiplePayments(payments);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].paymentId).toBe('PAY-123');
      expect(result[1].paymentId).toBe('PAY-124');
      expect(result[1].paymentType).toBe('DEBIT_CARD');
    });

    it('should handle empty array', () => {
      // Act
      const result = mapper.mapMultiplePayments([]);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('calculateTotalPaymentAmount', () => {
    it('should calculate total amount from multiple payments', () => {
      // Arrange
      const payments = [
        { ...mockPayment, amount: 100.0 },
        { ...mockPayment, amount: 57.5 },
      ] as Payment[];
      // Act
      const total = mapper.calculateTotalPaymentAmount(payments);

      // Assert
      expect(total).toBe(157.5);
    });

    it('should return 0 for empty payment array', () => {
      // Act
      const total = mapper.calculateTotalPaymentAmount([]);

      // Assert
      expect(total).toBe(0);
    });

    it('should handle single payment', () => {
      // Act
      const total = mapper.calculateTotalPaymentAmount([mockPayment]);

      // Assert
      expect(total).toBe(157.5);
    });
  });

  describe('validatePaymentSecurity', () => {
    it('should validate that card numbers are properly masked', () => {
      // Act
      const isSecure = mapper.validatePaymentSecurity(mockPayment);

      // Assert
      expect(isSecure).toBe(true);
    });

    it('should reject payments with unmasked card numbers', () => {
      // Arrange
      const insecurePayment = {
        ...mockPayment,
        maskedCardNumber: '4111111111111234', // Full card number
      } as Payment;
      // Act
      const isSecure = mapper.validatePaymentSecurity(insecurePayment);

      // Assert
      expect(isSecure).toBe(false);
    });

    it('should accept payments without card information', () => {
      // Arrange
      const cashPayment = {
        ...mockPayment,
        paymentType: 'CASH',
        maskedCardNumber: undefined,
      } as Payment;
      // Act
      const isSecure = mapper.validatePaymentSecurity(cashPayment);

      // Assert
      expect(isSecure).toBe(true);
    });
  });
});
