import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { OrderCancellationService } from '../services/domain/order-cancellation.service';

@Controller('omnia/api/ext/order')
export class CancelOrderController {
  constructor(
    private readonly orderCancellationService: OrderCancellationService,
  ) {}

  /**
   * Cancel Order Endpoint
   * POST /omnia/api/ext/order/:orderId/cancel
   */
  @Post(':orderId/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelOrder(
    @Param('orderId') orderId: string,
  ): Promise<Record<string, unknown>> {
    try {
      // Validate orderId
      if (!orderId || orderId.trim().length === 0) {
        throw new HttpException(
          'OrderId is required and cannot be empty',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Basic order ID validation
      if (orderId.length < 3) {
        throw new HttpException(
          `Order with ID '${orderId}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Transform order cancellation using MAO-compliant service
      const cancelResponse =
        await this.orderCancellationService.transformReleaseToCancel(orderId);

      return cancelResponse;
    } catch (error) {
      // Handle known HTTP exceptions
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle validation errors
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new HttpException(
          `Validation failed: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Handle unexpected errors
      console.error('Unexpected error in cancel order:', error);

      throw new HttpException(
        'Internal server error occurred during order cancellation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Health check endpoint for cancel service
   */
  @Post('health')
  @HttpCode(HttpStatus.OK)
  healthCheck(): {
    status: string;
    service: string;
    timestamp: string;
  } {
    return {
      status: 'OK',
      service: 'MAO Cancel Service',
      timestamp: new Date().toISOString(),
    };
  }
}
