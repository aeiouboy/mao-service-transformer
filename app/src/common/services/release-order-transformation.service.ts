import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { 
  PMPOrderInputDTO, 
  ReleaseOutputDTO
} from '../dtos/release-create-order.dto';
import { CalculationService } from './shared/calculation.service';
import { OrderTransformationService } from './domain/order-transformation.service';
import { OrderTransformationOrchestratorService } from './orchestration/order-transformation-orchestrator.service';

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
    private readonly orchestratorService: OrderTransformationOrchestratorService
  ) {}

  /**
   * Calculate shipping charges based on order data
   * @deprecated Use calculationService.calculateShippingCharge instead
   */
  public calculateShippingCharge(input: PMPOrderInputDTO): number {
    return this.calculationService.calculateShippingCharge(input);
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
      throw new Error(`Facade transformation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Async version of transform method for future asynchronous workflows
   */
  public async transformAsync(input: PMPOrderInputDTO): Promise<ReleaseOutputDTO> {
    return Promise.resolve(this.orchestratorService.orchestrateTransformation(input));
  }

  public async saveTransformedOrder(input: PMPOrderInputDTO, outputDir: string = '/Users/chongraktanaka/oms-mapping/release'): Promise<string> {
    const transformed = this.transform(input);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Use AlternateOrderId if available, otherwise OrderId
    const outputOrderId = input.AlternateOrderId || input.OrderId;
    const fileName = `orderid${outputOrderId}.json`;
    const filePath = path.join(outputDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(transformed, null, 2), 'utf-8');

    return filePath;
  }

  /**
   * Calculate line total
   * @deprecated Use calculationService.calculateLineTotal instead
   */
  public calculateLineTotal(line: any): number {
    return this.calculationService.calculateLineTotal(line);
  }
}