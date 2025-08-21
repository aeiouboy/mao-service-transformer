import { Test, TestingModule } from '@nestjs/testing';

import { DynamicIdGeneratorService } from '../../../../../shared/services/dynamic-id-generator.service';
import { CalculationService } from '../../../../transformations/services/calculation.service';
import { Allocation } from '../.../../orders/entities/allocation.entity';
import { OrderLine } from '../.../../orders/entities/order-line.entity';
import { AllocationMapper } from '../../mappers/allocation.mapper';
import { ReleaseLineMapper } from '../.../../transformations/mappers/release-line.mapper';
import { ReleaseLineDTO } from '../../release-message.dto';

describe('ReleaseLineMapper', () => {
  let mapper: ReleaseLineMapper;
  let mockAllocationMapper: jest.Mocked<AllocationMapper>;
  let mockCalculationService: jest.Mocked<CalculationService>;
  let mockIdGenerator: jest.Mocked<DynamicIdGeneratorService>;

  const mockOrderLine: OrderLine = {
    orderLineId: 'LINE-123',
    orderId: 'ORDER-123',
    productId: 'PROD-123',
    sku: 'TEST-SKU-001',
    productName: 'Test Product',
    quantity: 2,
    unitPrice: 50.0,
    lineAmount: 100.0,
    discountAmount: 5.0,
    taxAmount: 7.0,
    shippingAmount: 2.5,
    fulfillmentType: 'SHIP',
    lineStatus: 'ACTIVE',
    requestedDate: new Date('2025-08-25T10:00:00Z'),
    promisedDate: new Date('2025-08-25T10:00:00Z'),
  } as OrderLine;
  const mockAllocations: Allocation[] = [
    {
      allocationId: 'ALLOC-123',
      orderLineId: 'LINE-123',
      facilityId: 'FAC-456',
      allocatedQuantity: 2,
      availableQuantity: 10,
      allocationStatus: 'ALLOCATED',
      allocationDate: new Date('2025-08-21T11:00:00Z'),
      facilityCode: 'DC01',
      facilityName: 'Distribution Center 1',
      facilityType: 'WAREHOUSE',
    } as Allocation,
  ];

  beforeEach(async () => {
    mockAllocationMapper = {
      mapMultipleAllocations: jest.fn(),
      calculateTotalAllocatedQuantity: jest.fn(),
    } as any;

    mockCalculationService = {
      calculateLineTotal: jest.fn(),
      calculateLineTaxDetails: jest.fn(),
    } as any;

    mockIdGenerator = {
      generateUniqueId: jest.fn(),
      generateReleaseId: jest.fn(),
      resetCounter: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReleaseLineMapper,
        {
          provide: AllocationMapper,
          useValue: mockAllocationMapper,
        },
        {
          provide: CalculationService,
          useValue: mockCalculationService,
        },
        {
          provide: DynamicIdGeneratorService,
          useValue: mockIdGenerator,
        },
      ],
    }).compile();

    mapper = module.get<ReleaseLineMapper>(ReleaseLineMapper);
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('mapToReleaseLineDTO', () => {
    beforeEach(() => {
      mockAllocationMapper.mapMultipleAllocations.mockReturnValue([]);
      mockCalculationService.calculateLineTotal.mockReturnValue(100.0);
      mockCalculationService.calculateLineTaxDetails.mockReturnValue({
        taxableAmount: 95.0,
        taxAmount: 7.0,
        taxRate: 0.07,
      });
      mockIdGenerator.generateUniqueId.mockReturnValue('RL-123');
    });

    it('should map order line to release line DTO', () => {
      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, mockAllocations);

      // Assert
      expect(result).toBeInstanceOf(ReleaseLineDTO);
      expect(result.releaseLineId).toBeDefined();
      expect(result.productId).toBe('PROD-123');
      expect(result.sku).toBe('TEST-SKU-001');
      expect(result.productName).toBe('Test Product');
      expect(result.quantity).toBe(2);
      expect(result.unitPrice).toBe(50.0);
    });

    it('should calculate line total using calculation service', () => {
      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, mockAllocations);

      // Assert
      expect(mockCalculationService.calculateLineTotal).toHaveBeenCalledWith(
        mockOrderLine,
      );
      expect(result.lineTotal).toBe(100.0);
    });

    it('should include tax details from calculation service', () => {
      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, mockAllocations);

      // Assert
      expect(
        mockCalculationService.calculateLineTaxDetails,
      ).toHaveBeenCalledWith(mockOrderLine);
      expect(result.taxAmount).toBe(7.0);
      expect(result.taxableAmount).toBe(95.0);
    });

    it('should include discount and shipping amounts', () => {
      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, mockAllocations);

      // Assert
      expect(result.discountAmount).toBe(5.0);
      expect(result.shippingAmount).toBe(2.5);
    });

    it('should format dates to ISO strings', () => {
      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, mockAllocations);

      // Assert
      expect(result.requestedDate).toBe('2025-08-25T10:00:00.000Z');
      expect(result.promisedDate).toBe('2025-08-25T10:00:00.000Z');
    });

    it('should map allocations using allocation mapper', () => {
      // Arrange
      const expectedAllocations = [{ allocationId: 'ALLOC-123' }] as any;

      mockAllocationMapper.mapMultipleAllocations.mockReturnValue(
        expectedAllocations,
      );

      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, mockAllocations);

      // Assert
      expect(mockAllocationMapper.mapMultipleAllocations).toHaveBeenCalledWith(
        mockAllocations,
      );
      expect(result.allocations).toBe(expectedAllocations);
    });

    it('should handle order line with no allocations', () => {
      // Act
      const result = mapper.mapToReleaseLineDTO(mockOrderLine, []);

      // Assert
      expect(mockAllocationMapper.mapMultipleAllocations).toHaveBeenCalledWith(
        [],
      );
      expect(result.allocations).toEqual([]);
    });

    it('should generate unique release line ID', () => {
      // Arrange
      mockIdGenerator.generateUniqueId
        .mockReturnValueOnce('RL-123')
        .mockReturnValueOnce('RL-124');

      // Act
      const result1 = mapper.mapToReleaseLineDTO(
        mockOrderLine,
        mockAllocations,
      );
      const result2 = mapper.mapToReleaseLineDTO(
        mockOrderLine,
        mockAllocations,
      );

      // Assert
      expect(result1.releaseLineId).toBe('RL-123');
      expect(result2.releaseLineId).toBe('RL-124');
      expect(mockIdGenerator.generateUniqueId).toHaveBeenCalledWith('RL');
    });
  });

  describe('mapMultipleOrderLines', () => {
    it('should map multiple order lines to release lines', () => {
      // Arrange
      const orderLines = [
        mockOrderLine,
        {
          ...mockOrderLine,
          orderLineId: 'LINE-124',
          productId: 'PROD-124',
        } as OrderLine,
      ];
      const allocationsByLine = {
        'LINE-123': mockAllocations,
        'LINE-124': [],
      };

      mockCalculationService.calculateLineTotal.mockReturnValue(100.0);
      mockCalculationService.calculateLineTaxDetails.mockReturnValue({
        taxableAmount: 95.0,
        taxAmount: 7.0,
        taxRate: 0.07,
      });

      // Act
      const result = mapper.mapMultipleOrderLines(
        orderLines,
        allocationsByLine,
      );

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].productId).toBe('PROD-123');
      expect(result[1].productId).toBe('PROD-124');
    });

    it('should handle empty order lines array', () => {
      // Act
      const result = mapper.mapMultipleOrderLines([], {});

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('validateLineCalculations', () => {
    it('should validate correct line calculations', () => {
      // Arrange
      const releaseLineData = {
        quantity: 2,
        unitPrice: 50.0,
        lineTotal: 100.0,
        taxAmount: 7.0,
        discountAmount: 5.0,
      } as any;
      // Act
      const isValid = mapper.validateLineCalculations(releaseLineData);

      // Assert
      expect(isValid).toBe(true);
    });

    it('should detect incorrect line total calculation', () => {
      // Arrange
      const releaseLineData = {
        quantity: 2,
        unitPrice: 50.0,
        lineTotal: 90.0, // Should be 100.00
        taxAmount: 7.0,
        discountAmount: 5.0,
      } as any;
      // Act
      const isValid = mapper.validateLineCalculations(releaseLineData);

      // Assert
      expect(isValid).toBe(false);
    });

    it('should handle zero quantities and amounts', () => {
      // Arrange
      const releaseLineData = {
        quantity: 0,
        unitPrice: 50.0,
        lineTotal: 0,
        taxAmount: 0,
        discountAmount: 0,
      } as any;
      // Act
      const isValid = mapper.validateLineCalculations(releaseLineData);

      // Assert
      expect(isValid).toBe(true);
    });
  });
});
