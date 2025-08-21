import { Test, TestingModule } from '@nestjs/testing';

import { Allocation } from '../.../../orders/entities/allocation.entity';
import { AllocationMapper } from '../../mappers/allocation.mapper';
import { AllocationDTO } from '../../release-message.dto';

describe('AllocationMapper', () => {
  let mapper: AllocationMapper;

  const mockAllocation: Allocation = {
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
  } as Allocation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllocationMapper],
    }).compile();

    mapper = module.get<AllocationMapper>(AllocationMapper);
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('mapToAllocationDTO', () => {
    it('should map allocation entity to DTO format', () => {
      // Act
      const result = mapper.mapToAllocationDTO(mockAllocation);

      // Assert
      expect(result).toBeInstanceOf(AllocationDTO);
      expect(result.allocationId).toBe('ALLOC-123');
      expect(result.facilityId).toBe('FAC-456');
      expect(result.facilityCode).toBe('DC01');
      expect(result.facilityName).toBe('Distribution Center 1');
      expect(result.facilityType).toBe('WAREHOUSE');
      expect(result.allocatedQuantity).toBe(2);
      expect(result.availableQuantity).toBe(10);
      expect(result.allocationStatus).toBe('ALLOCATED');
    });

    it('should format allocation date to ISO string', () => {
      // Act
      const result = mapper.mapToAllocationDTO(mockAllocation);

      // Assert
      expect(result.allocationDate).toBe('2025-08-21T11:00:00.000Z');
    });

    it('should handle allocation with zero available quantity', () => {
      // Arrange
      const zeroAvailableAllocation = {
        ...mockAllocation,
        availableQuantity: 0,
      } as Allocation;
      // Act
      const result = mapper.mapToAllocationDTO(zeroAvailableAllocation);

      // Assert
      expect(result.availableQuantity).toBe(0);
      expect(result.allocatedQuantity).toBe(2);
    });
  });

  describe('mapMultipleAllocations', () => {
    it('should map array of allocations to DTOs', () => {
      // Arrange
      const allocations = [
        mockAllocation,
        {
          ...mockAllocation,
          allocationId: 'ALLOC-124',
          facilityCode: 'STORE-01',
          facilityName: 'Store Location 1',
          facilityType: 'RETAIL',
        } as Allocation,
      ];
      // Act
      const result = mapper.mapMultipleAllocations(allocations);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].allocationId).toBe('ALLOC-123');
      expect(result[1].allocationId).toBe('ALLOC-124');
      expect(result[1].facilityType).toBe('RETAIL');
    });

    it('should handle empty array', () => {
      // Act
      const result = mapper.mapMultipleAllocations([]);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('groupAllocationsByFacility', () => {
    it('should group allocations by facility', () => {
      // Arrange
      const allocations = [
        mockAllocation,
        {
          ...mockAllocation,
          allocationId: 'ALLOC-124',
          facilityId: 'FAC-456', // Same facility
          allocatedQuantity: 3,
        } as Allocation,
        {
          ...mockAllocation,
          allocationId: 'ALLOC-125',
          facilityId: 'FAC-789', // Different facility
          facilityCode: 'STORE-01',
        } as Allocation,
      ];
      // Act
      const result = mapper.groupAllocationsByFacility(allocations);

      // Assert
      expect(Object.keys(result)).toHaveLength(2);
      expect(result['FAC-456']).toHaveLength(2);
      expect(result['FAC-789']).toHaveLength(1);
    });

    it('should handle empty allocation array', () => {
      // Act
      const result = mapper.groupAllocationsByFacility([]);

      // Assert
      expect(result).toEqual({});
    });
  });

  describe('calculateTotalAllocatedQuantity', () => {
    it('should calculate total allocated quantity', () => {
      // Arrange
      const allocations = [
        { ...mockAllocation, allocatedQuantity: 2 },
        { ...mockAllocation, allocatedQuantity: 3 },
        { ...mockAllocation, allocatedQuantity: 1 },
      ] as Allocation[];
      // Act
      const total = mapper.calculateTotalAllocatedQuantity(allocations);

      // Assert
      expect(total).toBe(6);
    });

    it('should return 0 for empty allocation array', () => {
      // Act
      const total = mapper.calculateTotalAllocatedQuantity([]);

      // Assert
      expect(total).toBe(0);
    });

    it('should handle single allocation', () => {
      // Act
      const total = mapper.calculateTotalAllocatedQuantity([mockAllocation]);

      // Assert
      expect(total).toBe(2);
    });
  });

  describe('validateAllocationConsistency', () => {
    it('should validate consistent allocations', () => {
      // Arrange
      const consistentAllocations = [
        { ...mockAllocation, allocatedQuantity: 2 },
      ] as Allocation[];
      // Act
      const isValid = mapper.validateAllocationConsistency(
        consistentAllocations,
        2,
      );

      // Assert
      expect(isValid).toBe(true);
    });

    it('should detect over-allocation', () => {
      // Arrange
      const overAllocated = [
        { ...mockAllocation, allocatedQuantity: 3 },
        { ...mockAllocation, allocatedQuantity: 2 },
      ] as Allocation[];
      // Act
      const isValid = mapper.validateAllocationConsistency(overAllocated, 4); // Expected 4, got 5

      // Assert
      expect(isValid).toBe(false);
    });

    it('should detect under-allocation', () => {
      // Arrange
      const underAllocated = [
        { ...mockAllocation, allocatedQuantity: 1 },
      ] as Allocation[];
      // Act
      const isValid = mapper.validateAllocationConsistency(underAllocated, 3); // Expected 3, got 1

      // Assert
      expect(isValid).toBe(false);
    });

    it('should handle empty allocations for zero expected quantity', () => {
      // Act
      const isValid = mapper.validateAllocationConsistency([], 0);

      // Assert
      expect(isValid).toBe(true);
    });
  });
});
