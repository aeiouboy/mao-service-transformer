import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CancelFieldMappingService } from '../../transformations/services/cancel-field-mapping.service';
import { FileBasedOrderRepositoryService } from './file-based-order-repository.service';

/**
 * Manhattan Active® Omni Order Cancellation Service
 *
 * Production-grade service for processing order cancellations in MAO (Manhattan Active Omni).
 * Transforms real order data into standardized cancel message format using business rules
 * and field mappings instead of static templates.
 *
 * Features:
 * - Data-driven transformation from real order information
 * - Field-by-field mapping with cancel business rules
 * - File-based order repository (no database required)
 * - Production-ready with comprehensive error handling
 * - Maintains format compatibility with cancel_fully.json structure
 */
@Injectable()
export class OrderCancellationService {
  constructor(
    private readonly orderRepository: FileBasedOrderRepositoryService,
    private readonly fieldMapping: CancelFieldMappingService,
  ) {}

  /**
   * Transform order cancellation request into standardized MAO cancel message format
   *
   * @param orderId - The order identifier to be cancelled
   * @param cancelRequest - Cancel request details (reason, comments, etc.)
   * @returns Promise<any> - Complete cancel message in MAO format
   *
   * @throws HttpException - When order not found or transformation fails
   */
  public async transformReleaseToCancel(
    orderId: string,
    cancelRequest?: any,
  ): Promise<any> {
    try {
      console.log(`🔄 Processing cancel request for OrderId: ${orderId}`);

      // 1. Validate order can be cancelled
      const canCancel = await this.orderRepository.canCancelOrder(orderId);

      if (!canCancel) {
        throw new HttpException(
          `Order ${orderId} cannot be cancelled. Either order not found or not eligible for cancellation.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // 2. Load complete order data from repository
      console.log(`📊 Loading order data for: ${orderId}`);

      const orderData = await this.orderRepository.loadOrderData(orderId);

      // 3. Transform using field mapping service
      console.log(`🔧 Applying cancel transformation with business rules`);

      const cancelResponse = this.fieldMapping.transformToCancelResponse(
        orderData,
        cancelRequest || {
          CancelReason: { ReasonId: '1000.000' },
          CancelComments: 'Order cancelled via API',
          OrgId: 'CFR',
        },
      );

      console.log(`✅ Cancel transformation completed for OrderId: ${orderId}`);

      return cancelResponse;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(`❌ Cancel transformation failed for ${orderId}:`, error);

      throw new HttpException(
        `Failed to transform release to cancel: ${error.message || String(error)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get available orders for testing purposes
   *
   * @returns Promise<string[]> - Array of available order IDs
   */
  public getAvailableOrders(): string[] {
    return this.orderRepository.getAvailableOrders();
  }

  /**
   * Check if an order can be cancelled
   *
   * @param orderId - The order identifier to check
   * @returns Promise<boolean> - True if order can be cancelled
   */
  public async canCancelOrder(orderId: string): Promise<boolean> {
    return this.orderRepository.canCancelOrder(orderId);
  }
}
