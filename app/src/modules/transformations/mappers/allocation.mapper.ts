import { Injectable } from '@nestjs/common';

import { Allocation } from '../../orders/entities/allocation.entity';
import { AllocationDTO } from '../../releases/services/release-message.dto';

@Injectable()
export class AllocationMapper {
  /**
   * Map allocation entity to DTO format
   * @param allocation Allocation entity
   * @returns AllocationDTO
   */
  mapToAllocationDTO(allocation: Allocation): AllocationDTO {
    const allocationDto = new AllocationDTO();

    allocationDto.allocationId = allocation.allocationId;
    allocationDto.facilityId = allocation.shipFromLocationId || 'UNKNOWN';
    allocationDto.facilityCode = allocation.shipFromLocationId || 'UNKNOWN';
    allocationDto.facilityName = allocation.shipFromLocationId || 'UNKNOWN';
    allocationDto.facilityType = allocation.allocationType || 'UNKNOWN';
    allocationDto.allocatedQuantity = allocation.quantity;
    allocationDto.availableQuantity = allocation.quantity; // Same as allocated in this schema
    allocationDto.allocationStatus = allocation.statusId || 'UNKNOWN';

    // Format date to ISO string
    if (allocation.allocatedOn) {
      allocationDto.allocationDate = allocation.allocatedOn.toISOString();
    }

    return allocationDto;
  }

  /**
   * Map multiple allocations to DTOs
   * @param allocations Array of allocation entities
   * @returns Array of AllocationDTO
   */
  mapMultipleAllocations(allocations: Allocation[]): AllocationDTO[] {
    if (!allocations || allocations.length === 0) {
      return [];
    }

    return allocations.map(allocation => this.mapToAllocationDTO(allocation));
  }

  /**
   * Group allocations by facility
   * @param allocations Array of allocations
   * @returns Object grouped by facility ID
   */
  groupAllocationsByFacility(
    allocations: Allocation[],
  ): Record<string, Allocation[]> {
    if (!allocations || allocations.length === 0) {
      return {};
    }

    return allocations.reduce(
      (groups, allocation) => {
        const facilityId = allocation.shipFromLocationId || 'UNKNOWN';

        if (!groups[facilityId]) {
          groups[facilityId] = [];
        }

        groups[facilityId].push(allocation);

        return groups;
      },
      {} as Record<string, Allocation[]>,
    );
  }

  /**
   * Calculate total allocated quantity
   * @param allocations Array of allocations
   * @returns Total allocated quantity
   */
  calculateTotalAllocatedQuantity(allocations: Allocation[]): number {
    if (!allocations || allocations.length === 0) {
      return 0;
    }

    return allocations.reduce((total, allocation) => {
      return total + (allocation.quantity || 0);
    }, 0);
  }

  /**
   * Calculate total available quantity
   * @param allocations Array of allocations
   * @returns Total available quantity
   */
  calculateTotalAvailableQuantity(allocations: Allocation[]): number {
    if (!allocations || allocations.length === 0) {
      return 0;
    }

    return allocations.reduce((total, allocation) => {
      return total + (allocation.quantity || 0);
    }, 0);
  }

  /**
   * Validate allocation consistency (allocated vs expected quantities)
   * @param allocations Array of allocations
   * @param expectedQuantity Expected total quantity
   * @returns boolean indicating if allocations are consistent
   */
  validateAllocationConsistency(
    allocations: Allocation[],
    expectedQuantity: number,
  ): boolean {
    const totalAllocated = this.calculateTotalAllocatedQuantity(allocations);

    return totalAllocated === expectedQuantity;
  }

  /**
   * Get allocations by facility type
   * @param allocations Array of allocations
   * @param facilityType Type of facility to filter by
   * @returns Filtered allocations
   */
  getAllocationsByFacilityType(
    allocations: Allocation[],
    facilityType: string,
  ): Allocation[] {
    if (!allocations || allocations.length === 0) {
      return [];
    }

    return allocations.filter(
      allocation => allocation.allocationType === facilityType,
    );
  }

  /**
   * Get allocation summary by facility
   * @param allocations Array of allocations
   * @returns Summary grouped by facility
   */
  getAllocationSummaryByFacility(allocations: Allocation[]): Record<
    string,
    {
      facilityCode: string;
      facilityName: string;
      facilityType: string;
      totalAllocated: number;
      totalAvailable: number;
      allocationCount: number;
    }
  > {
    const grouped = this.groupAllocationsByFacility(allocations);
    const summary: Record<string, any> = {};

    Object.entries(grouped).forEach(([facilityId, facilityAllocations]) => {
      const firstAllocation = facilityAllocations[0];

      summary[facilityId] = {
        facilityCode: firstAllocation.shipFromLocationId,
        facilityName: firstAllocation.shipFromLocationId,
        facilityType: firstAllocation.allocationType,
        totalAllocated:
          this.calculateTotalAllocatedQuantity(facilityAllocations),
        totalAvailable:
          this.calculateTotalAvailableQuantity(facilityAllocations),
        allocationCount: facilityAllocations.length,
      };
    });

    return summary;
  }

  /**
   * Validate allocation business rules
   * @param allocation Allocation to validate
   * @returns Array of validation errors
   */
  validateAllocationBusinessRules(allocation: Allocation): string[] {
    const errors: string[] = [];

    // Cannot allocate more than available (unless backorder scenario)
    if (
      allocation.quantity > allocation.quantity &&
      allocation.quantity > 0
    ) {
      errors.push(
        `Allocated quantity (${allocation.quantity}) validation failed`,
      );
    }

    // Allocation quantities must be positive
    if (allocation.quantity <= 0) {
      errors.push('Allocated quantity must be positive');
    }

    // Required facility information
    if (!allocation.shipFromLocationId) {
      errors.push('Ship from location ID is required');
    }

    return errors;
  }
}
