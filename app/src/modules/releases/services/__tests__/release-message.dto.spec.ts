import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import {
  AddressDTO,
  AllocationDTO,
  PaymentMethodDTO,
  ReleaseHeaderDTO,
  ReleaseLineDTO,
  ReleaseOutputDTO,
} from '../release-message.dto';

describe('Release Message DTOs', () => {
  describe('AddressDTO', () => {
    it('should validate address with required fields', async () => {
      const addressData = {
        address1: '123 Test Street',
        city: 'Bangkok',
        postalCode: '10100',
        country: 'TH',
        hash: 'abc123def456',
      };
      const address = plainToClass(AddressDTO, addressData);
      const errors = await validate(address);

      expect(errors.length).toBe(0);
      expect(address.address1).toBe('123 Test Street');
      expect(address.city).toBe('Bangkok');
      expect(address.postalCode).toBe('10100');
      expect(address.country).toBe('TH');
      expect(address.hash).toBe('abc123def456');
    });

    it('should fail validation when required fields are missing', async () => {
      const addressData = {
        address1: '123 Test Street',
        // Missing required fields
      };
      const address = plainToClass(AddressDTO, addressData);
      const errors = await validate(address);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('AllocationDTO', () => {
    it('should validate allocation with required fields', async () => {
      const allocationData = {
        allocationId: 'ALLOC-123',
        facilityId: 'FAC-456',
        facilityCode: 'DC01',
        facilityName: 'Distribution Center 1',
        allocatedQuantity: 2,
        availableQuantity: 10,
        allocationStatus: 'ALLOCATED',
      };
      const allocation = plainToClass(AllocationDTO, allocationData);
      const errors = await validate(allocation);

      expect(errors.length).toBe(0);
      expect(allocation.allocatedQuantity).toBe(2);
      expect(allocation.availableQuantity).toBe(10);
    });

    it('should fail validation with invalid quantities', async () => {
      const allocationData = {
        allocationId: 'ALLOC-123',
        facilityId: 'FAC-456',
        facilityCode: 'DC01',
        allocatedQuantity: 0, // Invalid
        availableQuantity: -1, // Invalid
      };
      const allocation = plainToClass(AllocationDTO, allocationData);
      const errors = await validate(allocation);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('PaymentMethodDTO', () => {
    it('should validate payment method with required fields', async () => {
      const paymentData = {
        paymentId: 'PAY-123',
        paymentType: 'CREDIT_CARD',
        amount: 157.5,
        status: 'AUTHORIZED',
        authorizationCode: 'AUTH-123456',
        transactionId: 'TXN-789012',
      };
      const payment = plainToClass(PaymentMethodDTO, paymentData);
      const errors = await validate(payment);

      expect(errors.length).toBe(0);
      expect(payment.amount).toBe(157.5);
      expect(payment.paymentType).toBe('CREDIT_CARD');
    });

    it('should fail validation with negative amount', async () => {
      const paymentData = {
        paymentId: 'PAY-123',
        paymentType: 'CREDIT_CARD',
        amount: -100.0, // Invalid
      };
      const payment = plainToClass(PaymentMethodDTO, paymentData);
      const errors = await validate(payment);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('ReleaseLineDTO', () => {
    it('should validate release line with required fields', async () => {
      const lineData = {
        releaseLineId: 'RL-123',
        productId: 'PROD-123',
        sku: 'TEST-SKU-001',
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 50.0,
        lineTotal: 100.0,
        taxAmount: 7.0,
        discountAmount: 0,
        shippingAmount: 0,
        allocations: [],
      };
      const releaseLine = plainToClass(ReleaseLineDTO, lineData);
      const errors = await validate(releaseLine);

      expect(errors.length).toBe(0);
      expect(releaseLine.quantity).toBe(2);
      expect(releaseLine.unitPrice).toBe(50.0);
      expect(releaseLine.lineTotal).toBe(100.0);
    });

    it('should validate nested allocations', async () => {
      const lineData = {
        releaseLineId: 'RL-123',
        productId: 'PROD-123',
        sku: 'TEST-SKU-001',
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 50.0,
        lineTotal: 100.0,
        allocations: [
          {
            allocationId: 'ALLOC-123',
            facilityId: 'FAC-456',
            facilityCode: 'DC01',
            facilityName: 'Distribution Center 1',
            allocatedQuantity: 2,
            availableQuantity: 10,
            allocationStatus: 'ALLOCATED',
          },
        ],
      };
      const releaseLine = plainToClass(ReleaseLineDTO, lineData);
      const errors = await validate(releaseLine);

      expect(errors.length).toBe(0);
      expect(releaseLine.allocations).toHaveLength(1);
      expect(releaseLine.allocations[0].allocatedQuantity).toBe(2);
    });
  });

  describe('ReleaseHeaderDTO', () => {
    it('should validate release header with required fields', async () => {
      const headerData = {
        releaseId: 'REL-123',
        orderId: 'ORDER-123',
        orderNumber: 'ORD-2025-001',
        orderType: 'STANDARD',
        orderStatus: 'CREATED',
        orderDate: '2025-08-21T10:00:00.000',
        customerId: 'CUST-123',
        totalAmount: 157.5,
        subTotal: 150.0,
        totalTax: 7.5,
        totalShipping: 0,
        totalDiscount: 0,
        billingAddress: {
          address1: '123 Test Street',
          city: 'Bangkok',
          postalCode: '10100',
          country: 'TH',
          hash: 'abc123',
        },
        shippingAddress: {
          address1: '123 Test Street',
          city: 'Bangkok',
          postalCode: '10100',
          country: 'TH',
          hash: 'abc123',
        },
      };
      const header = plainToClass(ReleaseHeaderDTO, headerData);
      const errors = await validate(header);

      expect(errors.length).toBe(0);
      expect(header.totalAmount).toBe(157.5);
      expect(header.billingAddress.city).toBe('Bangkok');
    });
  });

  describe('ReleaseOutputDTO', () => {
    it('should validate complete release output structure', async () => {
      const releaseData = {
        header: {
          releaseId: 'REL-123',
          orderId: 'ORDER-123',
          orderNumber: 'ORD-2025-001',
          orderType: 'STANDARD',
          orderStatus: 'CREATED',
          orderDate: '2025-08-21T10:00:00.000',
          customerId: 'CUST-123',
          totalAmount: 157.5,
          subTotal: 150.0,
          totalTax: 7.5,
          totalShipping: 0,
          totalDiscount: 0,
          billingAddress: {
            address1: '123 Test Street',
            city: 'Bangkok',
            postalCode: '10100',
            country: 'TH',
            hash: 'abc123',
          },
          shippingAddress: {
            address1: '123 Test Street',
            city: 'Bangkok',
            postalCode: '10100',
            country: 'TH',
            hash: 'abc123',
          },
        },
        lines: [
          {
            releaseLineId: 'RL-123',
            productId: 'PROD-123',
            sku: 'TEST-SKU-001',
            productName: 'Test Product',
            quantity: 1,
            unitPrice: 150.0,
            lineTotal: 150.0,
            allocations: [],
          },
        ],
        payments: [
          {
            paymentId: 'PAY-123',
            paymentType: 'CREDIT_CARD',
            amount: 157.5,
            status: 'AUTHORIZED',
          },
        ],
        metadata: {
          transformedAt: '2025-08-21T10:00:00.000',
          version: '1.0.0',
        },
      };
      const release = plainToClass(ReleaseOutputDTO, releaseData);
      const errors = await validate(release);

      expect(errors.length).toBe(0);
      expect(release.header.orderId).toBe('ORDER-123');
      expect(release.lines).toHaveLength(1);
      expect(release.payments).toHaveLength(1);
      expect(release.metadata.version).toBe('1.0.0');
    });

    it('should validate required nested structures', async () => {
      const releaseData = {
        // Missing required header, lines, payments
        metadata: {
          transformedAt: '2025-08-21T10:00:00.000',
          version: '1.0.0',
        },
      };
      const release = plainToClass(ReleaseOutputDTO, releaseData);
      const errors = await validate(release);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
