import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';

import { IsNotEmpty, IsString } from 'class-validator';

import { ManhattanReleaseOutputDTO } from '../services/release-message.dto';
import { ReleaseOrderTransformerService } from '../services/release-order-transformer.service';

export class ReleaseTransformRequestDTO {
  @IsString()
  @IsNotEmpty()
  orderId: string;
}

export class ReleaseTransformResponseDTO {
  success: boolean;
  data?: ManhattanReleaseOutputDTO;
  filePath?: string;
  error?: string;
  message: string;
}

@Controller('api/order')
export class ReleaseOrderController {
  private readonly logger = new Logger(ReleaseOrderController.name);

  constructor(
    private readonly releaseTransformerService: ReleaseOrderTransformerService,
  ) {}

  /**
   * Transform order to release format
   * POST /api/order/release-transform
   * @param request Order ID to transform
   * @returns Release data in JSON format
   */
  @Post('release-transform')
  async transformOrderToRelease(
    @Body() request: ReleaseTransformRequestDTO,
  ): Promise<ReleaseTransformResponseDTO> {
    this.logger.log(`Received transform request for order: ${request.orderId}`);

    try {
      // Validate request
      if (!request.orderId?.trim()) {
        throw new HttpException('Order ID is required', HttpStatus.BAD_REQUEST);
      }

      // Transform order
      const releaseData =
        await this.releaseTransformerService.transformOrderToRelease(
          request.orderId.trim(),
        );

      this.logger.log(`Successfully transformed order: ${request.orderId}`);

      return {
        success: true,
        data: releaseData,
        message: `Order ${request.orderId} transformed successfully`,
      };
    } catch (error: any) {
      this.logger.error(
        `Transform failed for order ${request.orderId}:`,
        error,
      );

      // Handle different error types
      if (error.message?.includes('Order not found')) {
        throw new HttpException(
          `Order not found: ${request.orderId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.message?.includes('Database')) {
        throw new HttpException(
          'Database connection error',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      throw new HttpException(
        error.message || 'Internal transformation error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Transform order and save to file
   * POST /api/order/release-transform-save
   * @param request Order ID to transform
   * @returns File path and release data
   */
  @Post('release-transform-save')
  async transformAndSaveOrderToRelease(
    @Body() request: ReleaseTransformRequestDTO,
  ): Promise<ReleaseTransformResponseDTO> {
    this.logger.log(
      `Received transform-save request for order: ${request.orderId}`,
    );

    try {
      // Validate request
      if (!request.orderId?.trim()) {
        throw new HttpException('Order ID is required', HttpStatus.BAD_REQUEST);
      }

      // Transform and save order
      const filePath = await this.releaseTransformerService.transformAndSave(
        request.orderId.trim(),
      );

      this.logger.log(
        `Successfully transformed and saved order: ${request.orderId} to ${filePath}`,
      );

      return {
        success: true,
        filePath,
        message: `Order ${request.orderId} transformed and saved to ${filePath}`,
      };
    } catch (error: any) {
      this.logger.error(
        `Transform-save failed for order ${request.orderId}:`,
        error,
      );

      // Handle different error types
      if (error.message?.includes('Order not found')) {
        throw new HttpException(
          `Order not found: ${request.orderId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (error.message?.includes('Database')) {
        throw new HttpException(
          'Database connection error',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      if (error.message?.includes('Failed to save')) {
        throw new HttpException(
          'File system error - unable to save release output',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        error.message || 'Internal transformation error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Health check endpoint
   * GET /api/order/release-health
   * @returns Service health status
   */
  @Get('release-health')
  async healthCheck(): Promise<{
    status: string;
    timestamp: string;
    database: boolean;
  }> {
    const isHealthy = await this.releaseTransformerService.healthCheck();

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: isHealthy,
    };
  }

  /**
   * Get transformation status for specific order
   * GET /api/order/:orderId/release-status
   * @param orderId Order to check
   * @returns Order status information
   */
  @Get(':orderId/release-status')
  async getReleaseStatus(@Param('orderId') orderId: string): Promise<{
    orderId: string;
    exists: boolean;
    canTransform: boolean;
    message: string;
  }> {
    try {
      // Check if order exists in database
      const orderData =
        await this.releaseTransformerService['loadOrderData'](orderId);

      return {
        orderId,
        exists: !!orderData.order,
        canTransform: !!orderData.order,
        message: orderData.order
          ? 'Order found and ready for transformation'
          : 'Order not found in database',
      };
    } catch (error: any) {
      this.logger.error(`Status check failed for order ${orderId}:`, error);

      return {
        orderId,
        exists: false,
        canTransform: false,
        message: 'Error checking order status',
      };
    }
  }
}
