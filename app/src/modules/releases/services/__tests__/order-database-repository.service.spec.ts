import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { OrderDatabaseRepositoryService } from '../order-database-repository.service';

import { Allocation } from '.../../orders/entities/allocation.entity';
import { OrderLine } from '.../../orders/entities/order-line.entity';
import { Order } from '.../../orders/entities/order.entity';
import { Payment } from '.../../payments/entities/payment.entity';

describe('OrderDatabaseRepositoryService', () => {
  let service: OrderDatabaseRepositoryService;
  let orderModel: jest.Mocked<typeof Order>;
  let orderLineModel: jest.Mocked<typeof OrderLine>;
  let paymentModel: jest.Mocked<typeof Payment>;
  let allocationModel: jest.Mocked<typeof Allocation>;

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
      discountAmount: 0,
      taxAmount: 7.5,
      shippingAmount: 0,
      fulfillmentType: 'SHIP',
      lineStatus: 'ACTIVE',
      requestedDate: new Date('2025-08-25T10:00:00Z'),
      promisedDate: new Date('2025-08-25T10:00:00Z'),
    } as OrderLine,
  ];
  const mockPayments: Payment[] = [
    {
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
    } as Payment,
  ];
  const mockAllocations: Allocation[] = [
    {
      allocationId: 'ALLOC-123',
      orderLineId: 'LINE-123',
      facilityId: 'FAC-456',
      allocatedQuantity: 1,
      availableQuantity: 10,
      allocationStatus: 'ALLOCATED',
      allocationDate: new Date('2025-08-21T11:00:00Z'),
      facilityCode: 'DC01',
      facilityName: 'Distribution Center 1',
      facilityType: 'WAREHOUSE',
    } as Allocation,
  ];

  beforeEach(async () => {
    const mockOrderModel = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      sequelize: {
        authenticate: jest.fn(),
      },
    };
    const mockOrderLineModel = {
      findAll: jest.fn(),
    };
    const mockPaymentModel = {
      findAll: jest.fn(),
    };
    const mockAllocationModel = {
      findAll: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDatabaseRepositoryService,
        {
          provide: getModelToken(Order),
          useValue: mockOrderModel,
        },
        {
          provide: getModelToken(OrderLine),
          useValue: mockOrderLineModel,
        },
        {
          provide: getModelToken(Payment),
          useValue: mockPaymentModel,
        },
        {
          provide: getModelToken(Allocation),
          useValue: mockAllocationModel,
        },
      ],
    }).compile();

    service = module.get<OrderDatabaseRepositoryService>(
      OrderDatabaseRepositoryService,
    );
    orderModel = module.get(getModelToken(Order));
    orderLineModel = module.get(getModelToken(OrderLine));
    paymentModel = module.get(getModelToken(Payment));
    allocationModel = module.get(getModelToken(Allocation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOrderById', () => {
    it('should return order with all relations when found', async () => {
      // Arrange
      orderModel.findOne.mockResolvedValue(mockOrder as any);

      // Act
      const result = await service.findOrderById('ORDER-123');

      // Assert
      expect(result).toEqual(mockOrder);
      expect(orderModel.findOne).toHaveBeenCalledWith({
        where: { orderId: 'ORDER-123' },
        include: [
          {
            model: OrderLine,
            as: 'orderLines',
            include: [
              {
                model: Allocation,
                as: 'allocations',
              },
            ],
          },
          {
            model: Payment,
            as: 'payments',
          },
        ],
      });
    });

    it('should return null when order is not found', async () => {
      // Arrange
      orderModel.findOne.mockResolvedValue(null);

      // Act
      const result = await service.findOrderById('NONEXISTENT');

      // Assert
      expect(result).toBeNull();
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      orderModel.findOne.mockRejectedValue(
        new Error('Database connection failed'),
      );

      // Act & Assert
      await expect(service.findOrderById('ORDER-123')).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('findOrderLines', () => {
    it('should return order lines for given order ID', async () => {
      // Arrange
      orderLineModel.findAll.mockResolvedValue(mockOrderLines as any);

      // Act
      const result = await service.findOrderLines('ORDER-123');

      // Assert
      expect(result).toEqual(mockOrderLines);
      expect(orderLineModel.findAll).toHaveBeenCalledWith({
        where: { orderId: 'ORDER-123' },
        order: [['orderLineId', 'ASC']],
      });
    });

    it('should return empty array when no order lines found', async () => {
      // Arrange
      orderLineModel.findAll.mockResolvedValue([]);

      // Act
      const result = await service.findOrderLines('NONEXISTENT');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findPayments', () => {
    it('should return payments for given order ID', async () => {
      // Arrange
      paymentModel.findAll.mockResolvedValue(mockPayments as any);

      // Act
      const result = await service.findPayments('ORDER-123');

      // Assert
      expect(result).toEqual(mockPayments);
      expect(paymentModel.findAll).toHaveBeenCalledWith({
        where: { orderId: 'ORDER-123' },
        order: [['processedDate', 'ASC']],
      });
    });

    it('should return empty array when no payments found', async () => {
      // Arrange
      paymentModel.findAll.mockResolvedValue([]);

      // Act
      const result = await service.findPayments('NONEXISTENT');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findAllocations', () => {
    it('should return allocations for given order line ID', async () => {
      // Arrange
      allocationModel.findAll.mockResolvedValue(mockAllocations as any);

      // Act
      const result = await service.findAllocations('LINE-123');

      // Assert
      expect(result).toEqual(mockAllocations);
      expect(allocationModel.findAll).toHaveBeenCalledWith({
        where: { orderLineId: 'LINE-123' },
        order: [['allocationDate', 'ASC']],
      });
    });

    it('should return empty array when no allocations found', async () => {
      // Arrange
      allocationModel.findAll.mockResolvedValue([]);

      // Act
      const result = await service.findAllocations('NONEXISTENT');

      // Assert
      expect(result).toEqual([]);
    });
  });
});
