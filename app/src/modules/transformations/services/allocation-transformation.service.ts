import { Injectable } from '@nestjs/common';

import { PMPOrderInputDTO } from '../../releases/dtos/release-create-order.dto';
import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';

import { TransformationContext } from '../../payments/services/payment-transformation.service';

/**
 * Service responsible for allocation transformation logic.
 * Handles inventory allocation, quantity management, and fulfillment coordination.
 *
 * Domain: Allocations
 * Tables: allocations, quantity_details
 * Responsibilities: Inventory allocation, quantity management
 */
@Injectable()
export class AllocationTransformationService {
  constructor(
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly timestampService: TimestampService,
  ) {}

  /**
   * Transform allocation information for a single order line
   */
  public transformAllocationInfo(
    orderLine: any,
    _lineIndex: number,
    transformationContext: TransformationContext,
  ): any[] {
    return [
      {
        AllocationId: this.idGenerator.generateAllocationId(),
        AllocationType: 'Normal',
        AllocatedQuantity: orderLine.Quantity,
        ProcessInfo: this.transformProcessInfo(
          orderLine,
          transformationContext,
        ),
      },
    ];
  }

  /**
   * Transform process information for allocation
   */
  private transformProcessInfo(
    orderLine: any,
    _transformationContext: TransformationContext,
  ): any[] {
    return [
      {
        ProcessInfoId: this.idGenerator.generateChargeDetailId(),
        ProcessTypeId: 'Fulfillment',
        ProcessDate: this.timestampService.getTimestamp('process_date'),
        ProcessStatus: 'Ready',
        FulfillmentGroupId: this.idGenerator.generateChargeDetailId(),
        LocationId:
          orderLine.OrderLinePromisingInfo?.ShipFromLocationId ||
          'WAREHOUSE_001',
        WorkOrderId: this.idGenerator.generateChargeDetailId(),
        ShipFromLocationId:
          orderLine.OrderLinePromisingInfo?.ShipFromLocationId ||
          'WAREHOUSE_001',
      },
    ];
  }

  /**
   * Transform multiple allocations for order lines
   */
  public transformOrderLineAllocations(
    input: PMPOrderInputDTO,
    transformationContext: TransformationContext,
  ): Record<number, any[]> {
    const allocations: Record<number, any[]> = {};

    input.OrderLine.forEach((orderLine, lineIndex) => {
      allocations[lineIndex] = this.transformAllocationInfo(
        orderLine,
        lineIndex,
        transformationContext,
      );
    });

    return allocations;
  }

  /**
   * Get total allocated quantity across all order lines
   */
  public getTotalAllocatedQuantity(input: PMPOrderInputDTO): number {
    return input.OrderLine.reduce((total, orderLine) => {
      return total + (orderLine.Quantity || 0);
    }, 0);
  }

  /**
   * Validate allocation data integrity
   */
  public validateAllocationData(
    orderLine: any,
    allocation: any,
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate required fields
    if (!allocation.AllocationId) {
      errors.push('AllocationId is required');
    }

    if (!allocation.AllocatedQuantity || allocation.AllocatedQuantity <= 0) {
      errors.push('AllocatedQuantity must be greater than 0');
    }

    // Validate quantity consistency
    if (orderLine.Quantity !== allocation.AllocatedQuantity) {
      errors.push(
        `Allocated quantity (${allocation.AllocatedQuantity}) does not match ordered quantity (${orderLine.Quantity})`,
      );
    }

    // Validate process info
    if (!allocation.ProcessInfo || allocation.ProcessInfo.length === 0) {
      errors.push('ProcessInfo is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get allocation summary for reporting
   */
  public getAllocationSummary(
    input: PMPOrderInputDTO,
    transformationContext: TransformationContext,
  ): {
    totalLines: number;
    totalQuantity: number;
    allocations: any[];
  } {
    const allocations = this.transformOrderLineAllocations(
      input,
      transformationContext,
    );

    return {
      totalLines: input.OrderLine.length,
      totalQuantity: this.getTotalAllocatedQuantity(input),
      allocations: Object.values(allocations).flat(),
    };
  }
}
