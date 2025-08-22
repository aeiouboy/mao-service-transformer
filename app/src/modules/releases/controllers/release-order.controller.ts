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

import { DatabaseCompatibleReleaseOutputDTO, ReleaseOutputDTO } from '../dtos/database-compatible-release.dto';
import { PMPOrderInputDTO } from '../dtos/release-create-order.dto';
import { ReleaseOrderTransformerService } from '../services/release-order-transformer.service';
import { OrderDatabaseRepositoryService } from '../services/order-database-repository.service';

export class ReleaseTransformRequestDTO {
  @IsString()
  @IsNotEmpty()
  orderId: string;
}

export class ReleaseTransformResponseDTO {
  success: boolean;
  data?: DatabaseCompatibleReleaseOutputDTO | ReleaseOutputDTO; // Allow both database and release formats
  filePath?: string;
  error?: string;
  message: string;
}

@Controller('api/order')
export class ReleaseOrderController {
  private readonly logger = new Logger(ReleaseOrderController.name);

  constructor(
    private readonly releaseTransformerService: ReleaseOrderTransformerService,
    private readonly repository: OrderDatabaseRepositoryService,
  ) {}

  /**
   * Get all orders in database for testing
   * GET /api/order/orders-list
   * @returns List of orders
   */
  @Get('orders-list')
  async getOrdersList() {
    try {
      const orders = await this.repository.getAllOrders();
      
      return {
        successful: true,
        data: orders,
        count: orders.length,
        requestId: this.generateRequestId(),
      };
    } catch (error: any) {
      this.logger.error('Failed to fetch orders list:', error);
      
      return {
        errorCode: 'DB_ERROR',
        successful: false,
        message: error.message || 'Failed to fetch orders',
        requestId: this.generateRequestId(),
      };
    }
  }

  /**
   * Transform order to release format (legacy endpoint)
   * POST /api/order/release-transform-sample
   * @param request Order ID to transform
   * @returns Release data in sample-compatible JSON format
   */
  @Post('release-transform-sample')
  async transformOrderToSampleFormat(
    @Body() request: ReleaseTransformRequestDTO,
  ): Promise<ReleaseTransformResponseDTO> {
    this.logger.log(`Received sample-compatible transform request for order: ${request.orderId}`);

    try {
      // Validate request
      if (!request.orderId?.trim()) {
        throw new HttpException('Order ID is required', HttpStatus.BAD_REQUEST);
      }

      // Transform order to release format
      const releaseData =
        await this.releaseTransformerService.transformOrderToSampleFormat(
          request.orderId.trim(),
        );

      this.logger.log(`Successfully transformed order to release format: ${request.orderId}`);

      return {
        success: true,
        data: releaseData,
        message: `Order ${request.orderId} transformed to release format successfully`,
      };
    } catch (error: any) {
      this.logger.error(`Failed to transform order to release format: ${request.orderId}`, error);

      return {
        success: false,
        error: error.message || 'Failed to transform order to release format',
        message: `Failed to transform order ${request.orderId} to release format`,
      };
    }
  }

  /**
   * Transform order to PascalCase format matching sample payload
   * POST /api/order/release-transform-pascal
   * @param request Order ID to transform
   * @returns Release data in PascalCase format matching sample payload
   */
  @Post('release-transform-pascal')
  async transformOrderToPascalCaseFormat(
    @Body() request: ReleaseTransformRequestDTO,
  ): Promise<ReleaseTransformResponseDTO> {
    this.logger.log(`Received PascalCase transform request for order: ${request.orderId}`);

    try {
      // Validate request
      if (!request.orderId?.trim()) {
        throw new HttpException('Order ID is required', HttpStatus.BAD_REQUEST);
      }

      // Transform order to PascalCase format
      const releaseData =
        await this.releaseTransformerService.transformOrderToPascalCaseFormat(
          request.orderId.trim(),
        );

      this.logger.log(`Successfully transformed order to PascalCase format: ${request.orderId}`);

      return {
        success: true,
        data: releaseData,
        message: `Order ${request.orderId} transformed to PascalCase format successfully`,
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
   * Transform order to release format
   * POST /api/order/release-transform
   * @param request Order ID to transform
   * @returns Release data in sample-compatible JSON format
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
   * Transform PMP order payload directly to release format
   * POST /api/order/transform-payload
   * @param orderData Complete PMP order payload
   * @returns Release data in database-compatible format
   */
  @Post('transform-payload')
  async transformPayloadToRelease(
    @Body() orderData: PMPOrderInputDTO,
  ): Promise<ReleaseTransformResponseDTO> {
    this.logger.log(`Received direct payload transform request for order: ${orderData.OrderId}`);

    try {
      // Transform the payload directly
      const releaseData = await this.releaseTransformerService.transformFromInputDTO(orderData);

      this.logger.log(`Successfully transformed payload for order: ${orderData.OrderId}`);

      return {
        success: true,
        data: releaseData,
        message: `Order ${orderData.OrderId} payload transformed successfully`,
      };
    } catch (error: any) {
      this.logger.error(
        `Payload transform failed for order ${orderData.OrderId}:`,
        error,
      );

      throw new HttpException(
        error.message || 'Internal transformation error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      // Check if order exists in database using health check
      const isHealthy = await this.releaseTransformerService.healthCheck();

      return {
        orderId,
        exists: isHealthy,
        canTransform: isHealthy,
        message: isHealthy
          ? 'Service healthy and ready for transformation'
          : 'Service not ready for transformation',
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

  /**
   * Generate unique request ID
   * @returns Unique request identifier
   */
  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}
