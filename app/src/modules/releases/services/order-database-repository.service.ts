import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';

import { QueryTypes, Sequelize } from 'sequelize';

import { Allocation } from '../../orders/entities/allocation.entity';
import { OrderLine } from '../../orders/entities/order-line.entity';
import { Order } from '../../orders/entities/order.entity';
// import { PaymentMethod } from './entities/payment-method.entity';
// import { PaymentTransaction } from './entities/payment-transaction.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Injectable()
export class OrderDatabaseRepositoryService {
  private readonly logger = new Logger(OrderDatabaseRepositoryService.name);

  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderLine)
    private readonly orderLineModel: typeof OrderLine,
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
    // @InjectModel(PaymentMethod)
    // private readonly paymentMethodModel: typeof PaymentMethod,
    // @InjectModel(PaymentTransaction)
    // private readonly paymentTransactionModel: typeof PaymentTransaction,
    @InjectModel(Allocation)
    private readonly allocationModel: typeof Allocation,
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  /**
   * Find order by ID with all related data
   * @param orderId Order identifier
   * @returns Order with relations or null if not found
   */
  async findOrderById(orderId: string): Promise<Order | null> {
    try {
      // Simple query without complex relationships for now
      const order = await this.orderModel.findOne({
        where: { orderId },
      });

      return order;
    } catch (error: any) {
      throw new Error(
        `Failed to find order ${orderId}: ${error.message || error}`,
      );
    }
  }

  /**
   * Find all order lines for a specific order
   * @param orderId Order identifier
   * @returns Array of order lines
   */
  async findOrderLines(orderId: string): Promise<OrderLine[]> {
    try {
      return await this.orderLineModel.findAll({
        where: { orderId },
        order: [['orderLineId', 'ASC']],
      });
    } catch (error: any) {
      throw new Error(
        `Failed to find order lines for order ${orderId}: ${error.message || error}`,
      );
    }
  }

  /**
   * Find all payments for a specific order
   * @param orderId Order identifier
   * @returns Array of payments
   */
  async findPayments(orderId: string): Promise<Payment[]> {
    this.logger.debug(`Searching for payments with orderId: ${orderId}`);

    try {
      const payments = await this.paymentModel.findAll({
        where: { orderId },
        raw: true,
      });

      this.logger.debug(
        `Found ${payments.length} payments for order ${orderId}`,
      );

      return payments;
    } catch (error: any) {
      this.logger.error(`Error finding payments for order ${orderId}:`, error);

      throw error;
    }
  }

  /**
   * Find payment methods by payment ID
   * @param paymentId Payment identifier
   * @returns Promise<PaymentMethod[]> Array of payment methods
   */
  async findPaymentMethods(paymentId: string): Promise<any[]> {
    this.logger.debug(
      `Searching for payment methods with paymentId: ${paymentId}`,
    );

    try {
      // Direct query to avoid relationship complexity
      const query = `
        SELECT * FROM "order"."payment_methods" 
        WHERE payment_id = :paymentId
      `;
      const paymentMethods = await this.sequelize.query(query, {
        replacements: { paymentId },
        type: QueryTypes.SELECT,
        raw: true,
      });

      this.logger.debug(
        `Found ${paymentMethods.length} payment methods for payment ${paymentId}`,
      );

      return paymentMethods;
    } catch (error: any) {
      this.logger.error(
        `Error finding payment methods for payment ${paymentId}:`,
        error,
      );

      throw error;
    }
  }

  /**
   * Find payment transactions by payment method ID
   * @param paymentMethodId Payment method identifier
   * @returns Promise<PaymentTransaction[]> Array of payment transactions
   */
  async findPaymentTransactions(paymentMethodId: string): Promise<any[]> {
    this.logger.debug(
      `Searching for payment transactions with paymentMethodId: ${paymentMethodId}`,
    );

    try {
      // Direct query to avoid relationship complexity
      const query = `
        SELECT * FROM "order"."payment_transactions" 
        WHERE payment_method_id = :paymentMethodId
      `;
      const paymentTransactions = await this.sequelize.query(query, {
        replacements: { paymentMethodId },
        type: QueryTypes.SELECT,
        raw: true,
      });

      this.logger.debug(
        `Found ${paymentTransactions.length} payment transactions for payment method ${paymentMethodId}`,
      );

      return paymentTransactions;
    } catch (error: any) {
      this.logger.error(
        `Error finding payment transactions for payment method ${paymentMethodId}:`,
        error,
      );

      throw error;
    }
  }

  /**
   * Find all allocations for a specific order line
   * @param orderLineId Order line identifier
   * @returns Array of allocations
   */
  async findAllocations(orderLineId: string): Promise<Allocation[]> {
    try {
      return await this.allocationModel.findAll({
        where: { orderLineId },
        order: [['allocationDate', 'ASC']],
      });
    } catch (error: any) {
      throw new Error(
        `Failed to find allocations for order line ${orderLineId}: ${error.message || error}`,
      );
    }
  }

  /**
   * Get order summary with counts
   * @param orderId Order identifier
   * @returns Summary information about the order
   */
  async getOrderSummary(orderId: string): Promise<{
    order: Order | null;
    lineCount: number;
    paymentCount: number;
    totalAllocations: number;
  }> {
    const order = await this.findOrderById(orderId);

    if (!order) {
      return {
        order: null,
        lineCount: 0,
        paymentCount: 0,
        totalAllocations: 0,
      };
    }

    const lines = await this.findOrderLines(orderId);
    const payments = await this.findPayments(orderId);

    let totalAllocations = 0;

    for (const line of lines) {
      const allocations = await this.findAllocations(line.orderLineId);

      totalAllocations += allocations.length;
    }

    return {
      order,
      lineCount: lines.length,
      paymentCount: payments.length,
      totalAllocations,
    };
  }

  /**
   * Health check method to verify database connectivity
   * @returns Promise<boolean> indicating if database is accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.orderModel.sequelize.authenticate();

      return true;
    } catch (error) {
      return false;
    }
  }
}
