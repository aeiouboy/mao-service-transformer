import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CancelOrderTransformationException,
  CancelledOrderNotFoundException,
  InvalidOrderIdException,
  OrderNotCancelledException,
} from '../exceptions/cancel-order.exceptions';
import { CancelOrderTransformerService } from '../services/cancel-order-transformer.service';

@ApiTags('Cancel Orders - Database')
@Controller('api/orders/cancelled')
export class CancelOrderDatabaseController {
  constructor(
    private cancelOrderTransformerService: CancelOrderTransformerService,
  ) {}

  @Get(':orderId/transform')
  @ApiOperation({
    summary: 'Transform cancelled order to MAO format',
    description:
      'Query cancelled order from database and transform to MAO format',
  })
  @ApiParam({
    name: 'orderId',
    description: 'Order ID to transform',
    example: '311647613-C7LXT7KBTPA3TN',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully transformed cancelled order',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object', description: 'MAO formatted cancelled order' },
        message: { type: 'string' },
        orderId: { type: 'string' },
        transformedAt: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Cancelled order not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid order ID or order is not cancelled',
  })
  async transformCancelledOrder(@Param('orderId') orderId: string): Promise<{
    success: boolean;
    data: any;
    message: string;
    orderId: string;
    transformedAt: string;
    metadata: {
      cancelLineCount: number;
      orderLineCount: number;
      cancelledAmount: number;
      processType: string;
    };
  }> {
    try {
      console.log(`[DEBUG] Transforming cancelled order: ${orderId}`);

      const result =
        await this.cancelOrderTransformerService.transformCancelledOrder(
          orderId,
        );

      console.log(`[DEBUG] Transformation successful for order: ${orderId}`);

      return {
        success: true,
        data: result,
        message: `Successfully transformed cancelled order ${orderId}`,
        orderId,
        transformedAt: new Date().toISOString(),
        metadata: {
          cancelLineCount: result.CancelLineCount,
          orderLineCount: result.OrderLineCount,
          cancelledAmount: result.CancelledOrderSubTotal,
          processType: result.Process,
        },
      };
    } catch (error) {
      console.error(`[DEBUG] Error transforming order ${orderId}:`, error);

      if (error instanceof CancelledOrderNotFoundException) {
        throw new HttpException(
          {
            success: false,
            error: 'ORDER_NOT_FOUND',
            message: error.message,
            orderId,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (error instanceof OrderNotCancelledException) {
        throw new HttpException(
          {
            success: false,
            error: 'ORDER_NOT_CANCELLED',
            message: error.message,
            orderId,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof InvalidOrderIdException) {
        throw new HttpException(
          {
            success: false,
            error: 'INVALID_ORDER_ID',
            message: error.message,
            orderId,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof CancelOrderTransformationException) {
        throw new HttpException(
          {
            success: false,
            error: 'TRANSFORMATION_FAILED',
            message: error.message,
            orderId,
            timestamp: new Date().toISOString(),
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw new HttpException(
        {
          success: false,
          error: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred during transformation',
          orderId,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
