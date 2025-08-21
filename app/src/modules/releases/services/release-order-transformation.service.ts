import { Injectable } from '@nestjs/common';

import {
  PMPOrderInputDTO,
  ReleaseOutputDTO,
} from '../dtos/release-create-order.dto';

import { OrderTransformationService } from '../../orders/services/order-transformation.service';
import { OrderTransformationOrchestratorService } from '../../orders/services/order-transformation-orchestrator.service';
import { CalculationService } from '../../transformations/services/calculation.service';
import { FileOutputService } from '../../../shared/services/file-output.service';

/**
 * Facade service for PMP to Release transformation.
 * Delegates to OrderTransformationOrchestratorService for complex workflows.
 * Maintains backward compatibility while providing clean service architecture.
 *
 * Architecture Pattern: Facade/Adapter
 * - Simple interface for external consumers
 * - Delegates complex orchestration to specialized service
 * - Maintains existing public API contract
 */
@Injectable()
export class ReleaseOrderTransformationService {
  constructor(
    private readonly calculationService: CalculationService,
    private readonly orderTransformationService: OrderTransformationService,
    private readonly orchestratorService: OrderTransformationOrchestratorService,
    private readonly fileOutputService: FileOutputService,
  ) {}

  /**
   * Calculate total charges from OrderChargeDetail (CSV compliant)
   * @deprecated Use calculationService.calculateTotalCharges instead
   */
  public calculateShippingCharge(input: PMPOrderInputDTO): number {
    return this.calculationService.calculateTotalCharges(input);
  }

  /**
   * Calculate order subtotal from input data
   * @deprecated Use calculationService.calculateOrderSubtotal instead
   */
  public calculateOrderSubtotal(input: PMPOrderInputDTO): number {
    return this.calculationService.calculateOrderSubtotal(input);
  }

  /**
   * Calculate total taxes for order
   * @deprecated Use calculationService.calculateOrderTotalTaxes instead
   */
  public calculateOrderTotalTaxes(input: PMPOrderInputDTO): number {
    return this.calculationService.calculateOrderTotalTaxes(input);
  }

  /**
   * Calculate discounts based on order data
   * @deprecated Use calculationService.calculateOrderDiscounts instead
   */
  public calculateOrderDiscounts(input: PMPOrderInputDTO): number {
    return this.calculationService.calculateOrderDiscounts(input);
  }

  /**
   * @deprecated Use orderTransformationService.generateMD5Hash instead
   */
  public generateMD5Hash(address: any): string {
    return this.orderTransformationService.generateMD5Hash(address);
  }

  /**
   * Main transformation method - delegates to orchestrator service
   * Supports dynamic number of order lines and any product type
   *
   * @param input PMP order input data
   * @returns Transformed release output
   */
  public transform(input: PMPOrderInputDTO): ReleaseOutputDTO {
    try {
      // Delegate to orchestrator for complete transformation workflow
      return this.orchestratorService.orchestrateTransformation(input);
    } catch (error) {
      throw new Error(
        `Facade transformation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Async version of transform method for future asynchronous workflows
   */
  public async transformAsync(
    input: PMPOrderInputDTO,
  ): Promise<ReleaseOutputDTO> {
    return Promise.resolve(
      this.orchestratorService.orchestrateTransformation(input),
    );
  }

  /**
   * Save transformed order to file system
   * @param input PMP order input data
   * @param outputDir Output directory path (optional)
   * @returns Promise resolving to file path of saved output
   */
  public async saveTransformedOrder(
    input: PMPOrderInputDTO,
    outputDir?: string,
  ): Promise<string> {
    const transformed = this.transform(input);
    // Use AlternateOrderId if available, otherwise OrderId
    const outputOrderId = input.AlternateOrderId || input.OrderId;

    // Delegate file operations to dedicated service
    return this.fileOutputService.saveOrderToFile(
      transformed,
      outputOrderId,
      outputDir,
    );
  }

  /**
   * Calculate line total
   * @deprecated Use calculationService.calculateLineTotal instead
   */
  public calculateLineTotal(line: any): number {
    return this.calculationService.calculateLineTotal(line);
  }
}
