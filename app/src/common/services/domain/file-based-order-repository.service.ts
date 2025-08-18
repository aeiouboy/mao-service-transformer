import * as fs from 'fs';
import * as path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

/**
 * File-Based Order Repository Service
 *
 * Provides order data from release files without requiring a database.
 * Simulates database operations using JSON files stored in the release directory.
 *
 * Features:
 * - Load order data from release files
 * - Validate order existence
 * - Extract order components (lines, payments, shipping)
 * - Production-ready error handling
 */
@Injectable()
export class FileBasedOrderRepositoryService {
  /**
   * Load complete order data for the specified OrderId
   *
   * @param orderId - The order identifier to load
   * @returns Promise<OrderData> - Complete order information
   * @throws HttpException - When order not found or invalid
   */
  public async loadOrderData(orderId: string): Promise<any> {
    try {
      const releaseData = await this.loadReleaseFile(orderId);

      return {
        orderId,
        orderData: releaseData,
        orderLines: this.extractOrderLines(releaseData),
        payments: this.extractPayments(releaseData),
        customer: this.extractCustomerInfo(releaseData),
        shipping: this.extractShippingInfo(releaseData),
        financials: this.extractFinancialInfo(releaseData),
        metadata: this.extractMetadata(releaseData),
      };
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Failed to load order data for ${orderId}: ${error.message || String(error)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Check if order exists and can be cancelled
   *
   * @param orderId - The order identifier to check
   * @returns Promise<boolean> - True if order exists and can be cancelled
   */
  public async canCancelOrder(orderId: string): Promise<boolean> {
    try {
      const orderData = await this.loadOrderData(orderId);
      // Business rules for cancellation eligibility
      const isConfirmed = orderData.orderData.IsConfirmed;
      const isOnHold = orderData.orderData.IsOnHold;
      const cancelAllowed = orderData.orderData.ExtendedFields?.CancelAllowed;
      const maxFulfillmentStatusId = orderData.orderData.MaxFulfillmentStatusId;

      // Order can be cancelled if:
      // - Order is confirmed
      // - Not on hold (or hold allows cancellation)
      // - Cancel explicitly allowed
      // - Status allows cancellation (3000 = Active, allows cancel)
      return (
        isConfirmed &&
        (!isOnHold || cancelAllowed) &&
        cancelAllowed &&
        maxFulfillmentStatusId === '3000'
      );
    } catch (error) {
      console.warn(
        `Cannot determine cancel eligibility for ${orderId}:`,
        error,
      );

      return false;
    }
  }

  /**
   * Load release file for the specified OrderId
   *
   * @private
   * @param orderId - The order identifier
   * @returns Promise<any> - Parsed release data
   * @throws HttpException - When file not found or invalid
   */
  private loadReleaseFile(orderId: string): any {
    const releaseDir = path.join(process.cwd(), 'release');
    // Check multiple possible file naming patterns
    const possibleFiles = [
      `${orderId}-Rel.json`,
      `orderid${orderId}.json`,
      `${orderId}.json`,
    ];

    for (const fileName of possibleFiles) {
      const filePath = path.join(releaseDir, fileName);

      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');

          return JSON.parse(fileContent);
        } catch (parseError: any) {
          throw new HttpException(
            `Failed to parse release file for order ${orderId}: ${parseError.message || String(parseError)}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    throw new HttpException(
      `Order ${orderId} not found. No release file exists for this order.`,
      HttpStatus.NOT_FOUND,
    );
  }

  /**
   * Extract order lines from release data
   *
   * @private
   * @param releaseData - The release data object
   * @returns any[] - Array of order line objects
   */
  private extractOrderLines(releaseData: any): any[] {
    // Order lines are in ReleaseLine array at root level, not in Order.OrderLine
    return releaseData.ReleaseLine || [];
  }

  /**
   * Extract payment information from release data
   *
   * @private
   * @param releaseData - The release data object
   * @returns any[] - Array of payment objects
   */
  private extractPayments(releaseData: any): any[] {
    return releaseData.Order?.Payment || [];
  }

  /**
   * Extract customer information from release data
   *
   * @private
   * @param releaseData - The release data object
   * @returns any - Customer information object
   */
  private extractCustomerInfo(releaseData: any): any {
    return {
      customerId: releaseData.CustomerId || null,
      firstName: releaseData.CustomerFirstName || null,
      lastName: releaseData.CustomerLastName || null,
      email: releaseData.Email || null,
      phone: releaseData.CustomerPhone || null,
    };
  }

  /**
   * Extract shipping information from release data
   *
   * @private
   * @param releaseData - The release data object
   * @returns any - Shipping information object
   */
  private extractShippingInfo(releaseData: any): any {
    const firstOrderLine = this.extractOrderLines(releaseData)[0];

    return {
      addressId: releaseData.AddressId || null,
      shipToAddress: firstOrderLine?.ShipToAddress || null,
      serviceLevelCode: releaseData.ServiceLevelCode || 'STD',
      shippingMethod: firstOrderLine?.ShippingMethod || null,
    };
  }

  /**
   * Extract financial information from release data
   *
   * @private
   * @param releaseData - The release data object
   * @returns any - Financial summary object
   */
  private extractFinancialInfo(releaseData: any): any {
    return {
      orderSubtotal: releaseData.OrderSubtotal || 0,
      totalCharges: releaseData.TotalCharges || 0,
      totalTaxes: releaseData.TotalTaxes || 0,
      releaseTotal: releaseData.ReleaseTotal || 0,
      currencyCode: releaseData.CurrencyCode || 'THB',
    };
  }

  /**
   * Extract metadata from release data
   *
   * @private
   * @param releaseData - The release data object
   * @returns any - Metadata object
   */
  private extractMetadata(releaseData: any): any {
    return {
      orgId: releaseData.OrgId || 'CFR',
      maxFulfillmentStatusId: releaseData.MaxFulfillmentStatusId || '3000',
      isConfirmed: releaseData.IsConfirmed || false,
      isOnHold: releaseData.IsOnHold || false,
      extendedFields: releaseData.ExtendedFields || {},
      orderType: releaseData.Order?.OrderType || null,
    };
  }

  /**
   * Get all available orders (for testing purposes)
   *
   * @returns Promise<string[]> - Array of available order IDs
   */
  public getAvailableOrders(): string[] {
    try {
      const releaseDir = path.join(process.cwd(), 'release');

      if (!fs.existsSync(releaseDir)) {
        return [];
      }

      const files = fs.readdirSync(releaseDir);
      const orderIds: string[] = [];

      for (const file of files) {
        if (
          file.endsWith('.json') &&
          !file.includes('cancel') &&
          !file.includes('test')
        ) {
          // Extract OrderId from filename patterns
          let orderId = null;

          if (file.includes('-Rel.json')) {
            orderId = file.replace('-Rel.json', '');
          } else if (file.startsWith('orderid')) {
            orderId = file.replace('orderid', '').replace('.json', '');
          } else {
            orderId = file.replace('.json', '');
          }

          if (orderId && orderId.length > 3) {
            orderIds.push(orderId);
          }
        }
      }

      return orderIds;
    } catch (error) {
      console.warn('Failed to get available orders:', error);

      return [];
    }
  }
}
