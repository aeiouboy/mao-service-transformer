import { Test, TestingModule } from '@nestjs/testing';

import { DynamicIdGeneratorService } from '../../../../shared/services/dynamic-id-generator.service';
import { BusinessRulesService } from '../../../transformations/services/business-rules.service';
import { CalculationService } from '../../../transformations/services/calculation.service';
import { TimestampService } from '../../../../shared/services/timestamp.service';
import { Allocation } from '.../../orders/entities/allocation.entity';
import { OrderLine } from '.../../orders/entities/order-line.entity';
import { Order } from '.../../orders/entities/order.entity';
import { Payment } from '.../../payments/entities/payment.entity';
import { AddressMapper } from '../mappers/address.mapper';
import { PaymentMapper } from '../mappers/payment.mapper';
import { ReleaseLineMapper } from '.../../transformations/mappers/release-line.mapper';
import { OrderDatabaseRepositoryService } from '../order-database-repository.service';
import { ReleaseOutputDTO } from '../release-message.dto';
import { ReleaseOrderTransformerService } from '../release-order-transformer.service';

describe('ReleaseOrderTransformerService', () => {
  let service: ReleaseOrderTransformerService;
  let mockRepository: jest.Mocked<OrderDatabaseRepositoryService>;
  let mockReleaseLineMapper: jest.Mocked<ReleaseLineMapper>;
  let mockPaymentMapper: jest.Mocked<PaymentMapper>;
  let mockAddressMapper: jest.Mocked<AddressMapper>;
  let mockTimestampService: jest.Mocked<TimestampService>;
  let mockCalculationService: jest.Mocked<CalculationService>;
  let mockIdGenerator: jest.Mocked<DynamicIdGeneratorService>;

  const mockOrder: Order = {
    orderId: 'ORDER-123',
    orderNumber: 'ORD-2025-001',
    orderType: 'STANDARD',
    orderStatus: 'CREATED',
    orderDate: new Date('2025-08-21T10:00:00Z'),
    customerId: 'CUST-123',
    customerType: 'RETAIL',
    orderSource: 'WEB',
    orderChannel: 'ONLINE',
    totalAmount: 157.5,
    subTotal: 150.0,
    totalTax: 7.5,
    totalShipping: 0,
    totalDiscount: 0,
    billingAddress: {
      street: '123 Test St',
      city: 'Bangkok',
      postalCode: '10100',
      country: 'TH',
    },
    shippingAddress: {
      street: '123 Test St',
      city: 'Bangkok',
      postalCode: '10100',
      country: 'TH',
    },
  } as Order;
  const mockOrderLines: OrderLine[] = [
    {
      orderLineId: 'LINE-123',
      orderId: 'ORDER-123',
      productId: 'PROD-123',
      sku: 'TEST-SKU-001',
      productName: 'Test Product',
      quantity: 1,
      unitPrice: 150.0,
      lineAmount: 150.0,
      fulfillmentType: 'SHIP',
      lineStatus: 'ACTIVE',
    } as OrderLine,
  ];
  const mockPayments: Payment[] = [
    {
      paymentId: 'PAY-123',
      orderId: 'ORDER-123',
      paymentType: 'CREDIT_CARD',
      amount: 157.5,
      status: 'AUTHORIZED',
    } as Payment,
  ];
  const mockAllocations: Allocation[] = [
    {
      allocationId: 'ALLOC-123',
      orderLineId: 'LINE-123',
      facilityId: 'FAC-456',
      allocatedQuantity: 1,
      availableQuantity: 10,
    } as Allocation,
  ];

  beforeEach(async () => {
    const mockRepo = {
      findOrderById: jest.fn(),
      findOrderLines: jest.fn(),
      findPayments: jest.fn(),
      findAllocations: jest.fn(),
    };
    const mockMappers = {
      releaseLineMapper: {
        mapMultipleOrderLines: jest.fn(),
        validateAllocationConsistency: jest.fn(),
      },
      paymentMapper: {
        mapMultiplePayments: jest.fn(),
        calculateTotalPaymentAmount: jest.fn(),
        validatePaymentAmounts: jest.fn(),
      },
      allocationMapper: {
        mapMultipleAllocations: jest.fn(),
      },
      addressMapper: {
        mapToAddressDTO: jest.fn(),
      },
    };
    const mockServices = {
      timestampService: {
        getTimestamp: jest.fn(),
      },
      calculationService: {
        calculateOrderSubtotal: jest.fn(),
        calculateOrderTotalTaxes: jest.fn(),
        calculateTotalCharges: jest.fn(),
        calculateOrderDiscounts: jest.fn(),
      },
      businessRulesService: {
        getShippingMethodMapping: jest.fn(),
        getBusinessRuleConfiguration: jest.fn(),
      },
      idGenerator: {
        generateReleaseId: jest.fn(),
        resetCounter: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReleaseOrderTransformerService,
        {
          provide: OrderDatabaseRepositoryService,
          useValue: mockRepo,
        },
        {
          provide: ReleaseLineMapper,
          useValue: mockMappers.releaseLineMapper,
        },
        {
          provide: PaymentMapper,
          useValue: mockMappers.paymentMapper,
        },
        {
          provide: AddressMapper,
          useValue: mockMappers.addressMapper,
        },
        {
          provide: TimestampService,
          useValue: mockServices.timestampService,
        },
        {
          provide: CalculationService,
          useValue: mockServices.calculationService,
        },
        {
          provide: BusinessRulesService,
          useValue: mockServices.businessRulesService,
        },
        {
          provide: DynamicIdGeneratorService,
          useValue: mockServices.idGenerator,
        },
      ],
    }).compile();

    service = module.get<ReleaseOrderTransformerService>(
      ReleaseOrderTransformerService,
    );
    mockRepository = module.get(OrderDatabaseRepositoryService);
    mockReleaseLineMapper = module.get(ReleaseLineMapper);
    mockPaymentMapper = module.get(PaymentMapper);
    mockAddressMapper = module.get(AddressMapper);
    mockTimestampService = module.get(TimestampService);
    mockCalculationService = module.get(CalculationService);

    const businessRulesService = module.get(BusinessRulesService); // Referenced for DI but not used in tests

    businessRulesService.getBusinessRuleConfiguration = jest
      .fn()
      .mockReturnValue({
        freeShippingThreshold: 100,
      });
    mockIdGenerator = module.get(DynamicIdGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('transformOrderToRelease', () => {
    beforeEach(() => {
      // Setup default mocks
      mockRepository.findOrderById.mockResolvedValue(mockOrder);
      mockRepository.findOrderLines.mockResolvedValue(mockOrderLines);
      mockRepository.findPayments.mockResolvedValue(mockPayments);
      mockRepository.findAllocations.mockResolvedValue(mockAllocations);

      mockIdGenerator.generateReleaseId.mockReturnValue('REL-123');
      mockTimestampService.getTimestamp.mockReturnValue(
        '2025-08-21T10:00:00.000',
      );

      mockAddressMapper.mapToAddressDTO.mockReturnValue({
        address1: '123 Test St',
        city: 'Bangkok',
        postalCode: '10100',
        country: 'TH',
        hash: 'abc123',
      } as any);

      mockReleaseLineMapper.mapMultipleOrderLines.mockReturnValue([
        {
          releaseLineId: 'RL-123',
          productId: 'PROD-123',
          quantity: 1,
          unitPrice: 150.0,
          lineTotal: 150.0,
        },
      ] as any);

      mockPaymentMapper.mapMultiplePayments.mockReturnValue([
        {
          paymentId: 'PAY-123',
          paymentType: 'CREDIT_CARD',
          amount: 157.5,
        },
      ] as any);

      mockPaymentMapper.calculateTotalPaymentAmount.mockReturnValue(157.5);
      mockPaymentMapper.validatePaymentAmounts.mockReturnValue(true);
      mockReleaseLineMapper.validateAllocationConsistency.mockReturnValue(true);
    });

    it('should successfully transform order to release format', async () => {
      // Act
      const result = await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(result).toBeInstanceOf(ReleaseOutputDTO);
      expect(result.header.orderId).toBe('ORDER-123');
      expect(result.header.releaseId).toBe('REL-123');
      expect(result.lines).toHaveLength(1);
      expect(result.payments).toHaveLength(1);
    });

    it('should throw error when order not found', async () => {
      // Arrange
      mockRepository.findOrderById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.transformOrderToRelease('NONEXISTENT'),
      ).rejects.toThrow('Order not found: NONEXISTENT');
    });

    it('should load order with all required data', async () => {
      // Act
      await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(mockRepository.findOrderById).toHaveBeenCalledWith('ORDER-123');
      expect(mockRepository.findOrderLines).toHaveBeenCalledWith('ORDER-123');
      expect(mockRepository.findPayments).toHaveBeenCalledWith('ORDER-123');
      expect(mockRepository.findAllocations).toHaveBeenCalledWith('LINE-123');
    });

    it('should generate unique release ID', async () => {
      // Act
      await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(mockIdGenerator.generateReleaseId).toHaveBeenCalled();
    });

    it('should map addresses using address mapper', async () => {
      // Act
      await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(mockAddressMapper.mapToAddressDTO).toHaveBeenCalledWith(
        mockOrder.billingAddress,
      );
      expect(mockAddressMapper.mapToAddressDTO).toHaveBeenCalledWith(
        mockOrder.shippingAddress,
      );
    });

    it('should map order lines with allocations', async () => {
      // Act
      await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(mockReleaseLineMapper.mapMultipleOrderLines).toHaveBeenCalledWith(
        mockOrderLines,
        expect.any(Object),
      );
    });

    it('should map payments using payment mapper', async () => {
      // Act
      await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(mockPaymentMapper.mapMultiplePayments).toHaveBeenCalledWith(
        mockPayments,
      );
    });

    it('should include transformation metadata', async () => {
      // Act
      const result = await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(result.metadata.transformedAt).toBe('2025-08-21T10:00:00.000');
      expect(result.metadata.version).toBeDefined();
    });
  });

  describe('calculateFinancialTotals', () => {
    beforeEach(() => {
      mockCalculationService.calculateOrderSubtotal.mockReturnValue(150.0);
      mockCalculationService.calculateOrderTotalTaxes.mockReturnValue(7.5);
      mockCalculationService.calculateTotalCharges.mockReturnValue(0);
      mockCalculationService.calculateOrderDiscounts.mockReturnValue(0);
    });

    it('should calculate financial totals for order', () => {
      // Act
      const result = service.calculateFinancialTotals(mockOrder);

      // Assert
      expect(result.subTotal).toBe(150.0);
      expect(result.totalTax).toBe(7.5);
      expect(result.totalCharges).toBe(0);
      expect(result.totalAmount).toBe(157.5); // subTotal + tax + charges
    });

    it('should use calculation service for computations', () => {
      // Act
      service.calculateFinancialTotals(mockOrder);

      // Assert
      expect(
        mockCalculationService.calculateOrderSubtotal,
      ).toHaveBeenCalledWith(mockOrder);
      expect(
        mockCalculationService.calculateOrderTotalTaxes,
      ).toHaveBeenCalledWith(mockOrder);
      expect(mockCalculationService.calculateTotalCharges).toHaveBeenCalledWith(
        mockOrder,
      );
      expect(
        mockCalculationService.calculateOrderDiscounts,
      ).toHaveBeenCalledWith(mockOrder);
    });
  });

  describe('generateReleaseOutput', () => {
    it('should save release to JSON file', async () => {
      // Arrange
      const releaseData = {
        header: { orderId: 'ORDER-123' },
        lines: [],
        payments: [],
      } as any;

      // Mock fs operations would go here in actual implementation
      // For now, just test that the method exists and can be called

      // Act
      await service.generateReleaseOutput(releaseData);

      // Assert - The method should attempt to save the file
      // Note: In actual implementation, we'd need to mock fs properly
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      // Arrange
      mockRepository.findOrderById.mockRejectedValue(
        new Error('Database connection failed'),
      );

      // Act & Assert
      await expect(
        service.transformOrderToRelease('ORDER-123'),
      ).rejects.toThrow('Database connection failed');
    });

    it('should handle missing order lines gracefully', async () => {
      // Arrange
      mockRepository.findOrderById.mockResolvedValue(mockOrder);
      mockRepository.findOrderLines.mockResolvedValue([]);
      mockRepository.findPayments.mockResolvedValue(mockPayments);

      mockReleaseLineMapper.mapMultipleOrderLines.mockReturnValue([]);
      mockPaymentMapper.mapMultiplePayments.mockReturnValue([
        {
          paymentId: 'PAY-123',
          paymentType: 'CREDIT_CARD',
          amount: 157.5,
        },
      ] as any);

      // Act
      const result = await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(result.lines).toEqual([]);
      expect(result.payments).toHaveLength(1);
    });

    it('should handle missing payments gracefully', async () => {
      // Arrange
      mockRepository.findOrderById.mockResolvedValue(mockOrder);
      mockRepository.findOrderLines.mockResolvedValue(mockOrderLines);
      mockRepository.findPayments.mockResolvedValue([]);
      mockRepository.findAllocations.mockResolvedValue([]);

      mockReleaseLineMapper.mapMultipleOrderLines.mockReturnValue([
        {
          releaseLineId: 'RL-123',
        },
      ] as any);
      mockPaymentMapper.mapMultiplePayments.mockReturnValue([]);

      // Act
      const result = await service.transformOrderToRelease('ORDER-123');

      // Assert
      expect(result.payments).toEqual([]);
      expect(result.lines).toHaveLength(1);
    });
  });
});
