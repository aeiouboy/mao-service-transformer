import { Injectable } from '@nestjs/common';

import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { CalculationService } from '../services/calculation.service';
import { Allocation } from '../../orders/entities/allocation.entity';
import { OrderLine } from '../../orders/entities/order-line.entity';
import { ReleaseLineDTO } from '../../releases/services/release-message.dto';

import { AllocationMapper } from './allocation.mapper';

@Injectable()
export class ReleaseLineMapper {
  constructor(
    private readonly allocationMapper: AllocationMapper,
    private readonly calculationService: CalculationService,
    private readonly idGenerator: DynamicIdGeneratorService,
  ) {}

  /**
   * Map order line to release line DTO format
   * @param orderLine Order line entity
   * @param allocations Associated allocations
   * @returns ReleaseLineDTO
   */
  mapToReleaseLineDTO(
    orderLine: OrderLine,
    allocations: Allocation[],
  ): ReleaseLineDTO {
    const releaseLineDto = new ReleaseLineDTO();

    // Generate unique release line ID
    releaseLineDto.releaseLineId = this.generateReleaseLineId(
      orderLine.orderLineId,
    );

    // Basic product information
    releaseLineDto.productId = orderLine.itemId;
    releaseLineDto.sku = orderLine.itemId; // Using itemId for both
    releaseLineDto.productName = orderLine.itemId; // Default, can be enriched from product service
    releaseLineDto.quantity = orderLine.quantity;
    releaseLineDto.unitPrice = orderLine.unitPrice;

    // Calculate line total using calculation service
    releaseLineDto.lineTotal =
      this.calculationService.calculateLineTotal(orderLine);

    // Tax calculations
    const taxDetails =
      this.calculationService.calculateLineTaxDetails(orderLine);

    releaseLineDto.taxAmount = taxDetails.taxAmount;
    releaseLineDto.taxableAmount = taxDetails.taxableAmount;

    // Financial amounts - calculated from JSONB fields
    releaseLineDto.discountAmount =
      this.extractChargeAmount(orderLine.orderLineChargeDetail, 'discount') ||
      0;
    releaseLineDto.shippingAmount =
      this.extractChargeAmount(orderLine.orderLineChargeDetail, 'shipping') ||
      0;

    // Fulfillment information
    releaseLineDto.fulfillmentType = orderLine.fulfillmentStatus;
    releaseLineDto.lineStatus = orderLine.orderLineStatus;

    // Format dates to ISO strings
    if (orderLine.promisedDeliveryDate) {
      releaseLineDto.requestedDate =
        orderLine.promisedDeliveryDate.toISOString();
      releaseLineDto.promisedDate =
        orderLine.promisedDeliveryDate.toISOString();
    }

    // Map allocations
    releaseLineDto.allocations =
      this.allocationMapper.mapMultipleAllocations(allocations);

    return releaseLineDto;
  }

  /**
   * Map multiple order lines to release lines
   * @param orderLines Array of order lines
   * @param allocationsByLine Map of allocations by order line ID
   * @returns Array of ReleaseLineDTO
   */
  mapMultipleOrderLines(
    orderLines: OrderLine[],
    allocationsByLine: Record<string, Allocation[]>,
  ): ReleaseLineDTO[] {
    if (!orderLines || orderLines.length === 0) {
      return [];
    }

    return orderLines.map(orderLine => {
      const allocations = allocationsByLine[orderLine.orderLineId] || [];

      return this.mapToReleaseLineDTO(orderLine, allocations);
    });
  }

  /**
   * Generate unique release line ID
   * @param orderLineId Original order line ID (for future reference tracking)
   * @returns Unique release line ID
   */
  private generateReleaseLineId(_orderLineId: string): string {
    // Use ID generator to create unique release line ID
    return this.idGenerator.generateUniqueId('RL');
  }

  /**
   * Validate line calculations for consistency
   * @param releaseLineData Release line data
   * @returns boolean indicating if calculations are correct
   */
  validateLineCalculations(releaseLineData: any): boolean {
    try {
      // Validate basic calculation: quantity * unitPrice should match lineTotal
      const expectedTotal =
        releaseLineData.quantity * releaseLineData.unitPrice;
      const actualTotal = releaseLineData.lineTotal;
      // Allow small rounding differences
      const tolerance = 0.01;

      return Math.abs(expectedTotal - actualTotal) <= tolerance;
    } catch (error) {
      return false;
    }
  }

  /**
   * Calculate line summary statistics
   * @param releaseLines Array of release lines
   * @returns Summary statistics
   */
  calculateLineSummary(releaseLines: ReleaseLineDTO[]): {
    totalLines: number;
    totalQuantity: number;
    totalAmount: number;
    totalTax: number;
    totalDiscount: number;
    totalShipping: number;
  } {
    if (!releaseLines || releaseLines.length === 0) {
      return {
        totalLines: 0,
        totalQuantity: 0,
        totalAmount: 0,
        totalTax: 0,
        totalDiscount: 0,
        totalShipping: 0,
      };
    }

    return releaseLines.reduce(
      (summary, line) => {
        summary.totalLines += 1;
        summary.totalQuantity += line.quantity;
        summary.totalAmount += line.lineTotal;
        summary.totalTax += line.taxAmount || 0;
        summary.totalDiscount += line.discountAmount || 0;
        summary.totalShipping += line.shippingAmount || 0;

        return summary;
      },
      {
        totalLines: 0,
        totalQuantity: 0,
        totalAmount: 0,
        totalTax: 0,
        totalDiscount: 0,
        totalShipping: 0,
      },
    );
  }

  /**
   * Validate allocation consistency across all lines
   * @param releaseLines Array of release lines
   * @returns boolean indicating if allocations are consistent
   */
  validateAllocationConsistency(releaseLines: ReleaseLineDTO[]): boolean {
    for (const line of releaseLines) {
      const totalAllocated =
        this.allocationMapper.calculateTotalAllocatedQuantity(
          line.allocations as any[], // Cast needed due to DTO vs Entity type difference
        );

      if (totalAllocated !== line.quantity) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get lines by fulfillment type
   * @param releaseLines Array of release lines
   * @param fulfillmentType Type to filter by
   * @returns Filtered release lines
   */
  getLinesByFulfillmentType(
    releaseLines: ReleaseLineDTO[],
    fulfillmentType: string,
  ): ReleaseLineDTO[] {
    return releaseLines.filter(
      line => line.fulfillmentType === fulfillmentType,
    );
  }

  /**
   * Group lines by status
   * @param releaseLines Array of release lines
   * @returns Lines grouped by status
   */
  groupLinesByStatus(
    releaseLines: ReleaseLineDTO[],
  ): Record<string, ReleaseLineDTO[]> {
    return releaseLines.reduce(
      (groups, line) => {
        const status = line.lineStatus || 'UNKNOWN';

        if (!groups[status]) {
          groups[status] = [];
        }

        groups[status].push(line);

        return groups;
      },
      {} as Record<string, ReleaseLineDTO[]>,
    );
  }

  /**
   * Extract charge amount from JSONB charge detail field
   * @param chargeDetail JSONB charge detail object
   * @param chargeType Type of charge to extract (discount, shipping, etc.)
   * @returns Extracted amount or 0
   */
  private extractChargeAmount(chargeDetail: any, chargeType: string): number {
    if (!chargeDetail || typeof chargeDetail !== 'object') {
      return 0;
    }

    // Handle different JSONB structures that might exist
    if (Array.isArray(chargeDetail)) {
      // If it's an array of charge objects
      const charge = chargeDetail.find(
        c => c.type === chargeType || c.chargeType === chargeType,
      );

      return charge ? parseFloat(charge.amount) || 0 : 0;
    }

    if (chargeDetail[chargeType]) {
      // If it's an object with charge type as key
      return parseFloat(chargeDetail[chargeType]) || 0;
    }

    if (chargeDetail.amount && chargeDetail.type === chargeType) {
      // If it's a single charge object
      return parseFloat(chargeDetail.amount) || 0;
    }

    return 0;
  }
}
