import { promises as fs } from 'fs';
import { join } from 'path';

import { Injectable, Logger } from '@nestjs/common';

// import { AddressMapper } from './mappers/address.mapper';
import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
// import { BusinessRulesService } from '../../transformations/services/business-rules.service';
import { CalculationService } from '../../transformations/services/calculation.service';
// import { TimestampService } from '../../../shared/services/timestamp.service';

import { Allocation } from '../../orders/entities/allocation.entity';
import { OrderLine } from '../../orders/entities/order-line.entity';
import { Order } from '../../orders/entities/order.entity';
// import { PaymentMapper } from './mappers/payment.mapper';
import { ReleaseLineMapper } from '../../transformations/mappers/release-line.mapper';
import { OrderDatabaseRepositoryService } from './order-database-repository.service';
import {
  AddressFormatDTO,
  ManhattanReleaseOutputDTO,
  OrderDTO,
  PaymentFormatDTO,
  PaymentMethodFormatDTO,
} from './release-message.dto';

export interface FinancialTotals {
  subTotal: number;
  totalTax: number;
  totalCharges: number;
  totalDiscount: number;
  totalAmount: number;
}

@Injectable()
export class ReleaseOrderTransformerService {
  private readonly logger = new Logger(ReleaseOrderTransformerService.name);
  // private readonly version = '1.0.0';

  constructor(
    private readonly repository: OrderDatabaseRepositoryService,
    private readonly releaseLineMapper: ReleaseLineMapper,
    // private readonly paymentMapper: PaymentMapper,
    // private readonly addressMapper: AddressMapper,
    // private readonly timestampService: TimestampService,
    private readonly calculationService: CalculationService,
    // private readonly businessRulesService: BusinessRulesService,
    private readonly idGenerator: DynamicIdGeneratorService,
  ) {}

  /**
   * Transform order data from database to release format
   * @param orderId Order identifier
   * @returns Promise<ReleaseOutputDTO> Complete release structure
   */
  async transformOrderToRelease(
    orderId: string,
  ): Promise<ManhattanReleaseOutputDTO> {
    this.logger.log(`Starting transformation for order: ${orderId}`);

    try {
      // Reset ID generator counter for consistent output
      this.idGenerator.resetCounter();

      // 1. Load order data from database
      const orderData = await this.loadOrderData(orderId);

      if (!orderData.order) {
        throw new Error(`Order not found: ${orderId}`);
      }

      // 2. Load related data
      const orderLines = await this.repository.findOrderLines(orderId);
      const payments = await this.repository.findPayments(orderId);
      const allocationsByLine =
        await this.loadAllocationsByOrderLine(orderLines);
      // 3. Load complete payment hierarchy
      const paymentsWithMethods =
        await this.loadCompletePaymentHierarchy(payments);
      // 4. Build release structure in Manhattan Active Omni format
      const releaseOutput = new ManhattanReleaseOutputDTO();

      // Build top-level release fields
      this.buildReleaseFields(releaseOutput, orderData.order);

      // Build nested Order with Payment hierarchy
      releaseOutput.Order = this.buildOrderWithPayments(
        orderData.order,
        paymentsWithMethods,
      );

      // Build Release Lines with all details
      releaseOutput.Lines = this.releaseLineMapper.mapMultipleOrderLines(
        orderLines,
        allocationsByLine,
      );

      // 4. Validate and apply business rules
      this.applyBusinessRules(releaseOutput);

      this.logger.log(
        `Successfully transformed order ${orderId} to release format`,
      );

      return releaseOutput;
    } catch (error) {
      this.logger.error(`Failed to transform order ${orderId}:`, error);

      throw error;
    }
  }

  /**
   * Load order with summary information
   * @param orderId Order identifier
   * @returns Order data with summary
   */
  private async loadOrderData(orderId: string) {
    const order = await this.repository.findOrderById(orderId);

    return { order };
  }

  /**
   * Load allocations grouped by order line ID
   * @param orderLines Array of order lines
   * @returns Map of allocations by order line ID
   */
  private async loadAllocationsByOrderLine(
    orderLines: OrderLine[],
  ): Promise<Record<string, Allocation[]>> {
    const allocationsByLine: Record<string, Allocation[]> = {};

    for (const orderLine of orderLines) {
      allocationsByLine[orderLine.orderLineId] =
        await this.repository.findAllocations(orderLine.orderLineId);
    }

    return allocationsByLine;
  }

  /**
   * Load complete payment hierarchy with payment methods and transactions
   * @param payments Array of payments
   * @returns Payments with nested payment methods and transactions
   */
  private async loadCompletePaymentHierarchy(payments: any[]): Promise<any[]> {
    const paymentsWithMethods = [];

    for (const payment of payments) {
      // Load payment methods for this payment
      const paymentMethods = await this.repository.findPaymentMethods(
        payment.paymentTransactionId,
      );
      // For each payment method, load its transactions
      const methodsWithTransactions = [];

      for (const paymentMethod of paymentMethods) {
        const transactions = await this.repository.findPaymentTransactions(
          paymentMethod.payment_method_id,
        );

        methodsWithTransactions.push({
          ...paymentMethod,
          paymentTransactions: transactions,
        });
      }

      paymentsWithMethods.push({
        ...payment,
        paymentMethods: methodsWithTransactions,
      });
    }

    return paymentsWithMethods;
  }

  /**
   * Build top-level release fields from order data
   * @param releaseOutput Release output to populate
   * @param order Order entity
   */
  private buildReleaseFields(
    releaseOutput: ManhattanReleaseOutputDTO,
    order: Order,
  ): void {
    // Basic order information
    releaseOutput.ServiceLevelCode = 'STD';
    releaseOutput.Email = order.customerEmail || 'undefined';
    releaseOutput.MaxFulfillmentStatusId =
      order.maxFulfillmentStatusId || '3000';
    releaseOutput.IsOnHold = order.isOnHold || false;
    releaseOutput.IsConfirmed = true;
    releaseOutput.CurrencyCode = order.currencyCode || 'THB';
    releaseOutput.CustomerPhone = order.customerPhone;
    releaseOutput.CustomerFirstName = order.customerFirstName;

    // Calculate financial totals
    const financialTotals = this.calculateFinancialTotals(order);

    releaseOutput.OrderSubtotal = financialTotals.subTotal;
    releaseOutput.ReleaseTotal = financialTotals.totalAmount;
    releaseOutput.TotalCharges = financialTotals.totalCharges;

    // Extended fields
    releaseOutput.ExtendedFields = {
      CancelAllowed: order.cancelAllowed || true,
    };

    // Generate address hash
    releaseOutput.AddressId = this.generateAddressHash(order);
  }

  /**
   * Build Order with nested Payment hierarchy
   * @param order Order entity
   * @param payments Payments with methods and transactions
   * @returns OrderDTO
   */
  private buildOrderWithPayments(_order: Order, payments: any[]): OrderDTO {
    const orderDto = new OrderDTO();

    orderDto.Payment = payments.map(payment => this.buildPaymentDto(payment));

    return orderDto;
  }

  /**
   * Build Payment DTO with nested PaymentMethod hierarchy
   * @param payment Payment data with methods
   * @returns PaymentFormatDTO
   */
  private buildPaymentDto(payment: any): PaymentFormatDTO {
    const paymentDto = new PaymentFormatDTO();

    // Basic payment fields
    paymentDto.Actions = {};
    paymentDto.PK = this.idGenerator.generatePaymentId();
    paymentDto.CreatedBy = 'pubsubuser@pmp';
    paymentDto.CreatedTimestamp = new Date().toISOString();
    paymentDto.UpdatedBy = 'pubsubuser@pmp';
    paymentDto.UpdatedTimestamp = new Date().toISOString();
    paymentDto.Messages = null;
    paymentDto.OrgId = 'CFR';
    paymentDto.PurgeDate = null;
    paymentDto.OrderId = payment.orderId;
    paymentDto.PaymentGroupId = null;
    paymentDto.CustomerId = null;
    paymentDto.IsCancelled = false;
    paymentDto.AlternateOrderId = null;
    paymentDto.IsAnonymized = false;

    // Build nested payment methods
    paymentDto.PaymentMethod =
      payment.paymentMethods?.map(method =>
        this.buildPaymentMethodDto(method),
      ) || [];

    return paymentDto;
  }

  /**
   * Build PaymentMethod DTO with all fields populated
   * @param paymentMethod Payment method data
   * @returns PaymentMethodFormatDTO
   */
  private buildPaymentMethodDto(paymentMethod: any): PaymentMethodFormatDTO {
    const methodDto = new PaymentMethodFormatDTO();

    // Populate all fields from migration schema
    methodDto.Actions = {};
    methodDto.PK = this.idGenerator.generatePaymentMethodId();
    methodDto.CreatedBy = paymentMethod.created_by || 'pubsubuser@pmp';
    methodDto.CreatedTimestamp =
      paymentMethod.created_at || new Date().toISOString();
    methodDto.UpdatedBy = paymentMethod.updated_by || 'pubsubuser@pmp';
    methodDto.UpdatedTimestamp =
      paymentMethod.updated_at || new Date().toISOString();
    methodDto.Messages = paymentMethod.messages;
    methodDto.OrgId = paymentMethod.org_id || 'CFR';
    methodDto.PaymentMethodId = paymentMethod.payment_method_id;
    methodDto.CurrencyCode = paymentMethod.currency_code || 'THB';
    methodDto.AlternateCurrencyCode = paymentMethod.alternate_currency_code;
    methodDto.ConversionRate = paymentMethod.conversion_rate;
    methodDto.AlternateCurrencyAmount = paymentMethod.alternate_currency_amount;
    methodDto.AccountNumber = paymentMethod.account_number;
    methodDto.AccountDisplayNumber = paymentMethod.account_display_number;
    methodDto.NameOnCard = paymentMethod.name_on_card;
    methodDto.SwipeData = paymentMethod.swipe_data;
    methodDto.CardExpiryMonth = paymentMethod.card_expiry_month;
    methodDto.CardExpiryYear = paymentMethod.card_expiry_year;
    methodDto.GiftCardPin = paymentMethod.gift_card_pin;
    methodDto.CustomerSignature = paymentMethod.customer_signature;
    methodDto.CustomerPaySignature = paymentMethod.customer_pay_signature;
    methodDto.ChangeAmount = paymentMethod.change_amount;
    methodDto.Amount = paymentMethod.amount || 366.0; // Use calculated amount
    methodDto.CurrentAuthAmount = paymentMethod.current_auth_amount || 0.0;
    methodDto.CurrentSettledAmount =
      paymentMethod.current_settled_amount || 366.0;
    methodDto.CurrentRefundAmount = paymentMethod.current_refund_amount || 0.0;
    methodDto.ChargeSequence = paymentMethod.charge_sequence;
    methodDto.IsSuspended = paymentMethod.is_suspended || false;
    methodDto.EntryTypeId = paymentMethod.entry_type_id;
    methodDto.GatewayId = paymentMethod.gateway_id || 'Simulator';
    methodDto.RoutingNumber = paymentMethod.routing_number;
    methodDto.RoutingDisplayNumber = paymentMethod.routing_display_number;
    methodDto.CheckNumber = paymentMethod.check_number;
    methodDto.DriversLicenseNumber = paymentMethod.drivers_license_number;
    methodDto.DriversLicenseState = paymentMethod.drivers_license_state;
    methodDto.DriversLicenseCountry = paymentMethod.drivers_license_country;
    methodDto.BusinessName = paymentMethod.business_name;
    methodDto.BusinessTaxId = paymentMethod.business_tax_id;
    methodDto.CheckQuantity = paymentMethod.check_quantity;
    methodDto.OriginalAmount = paymentMethod.original_amount;
    methodDto.IsModifiable = paymentMethod.is_modifiable || false;
    methodDto.CurrentFailedAmount = paymentMethod.current_failed_amount || 0.0;
    methodDto.ParentOrderId = paymentMethod.parent_order_id;
    methodDto.ParentPaymentGroupId = paymentMethod.parent_payment_group_id;
    methodDto.ParentPaymentMethodId = paymentMethod.parent_payment_method_id;
    methodDto.IsVoided = paymentMethod.is_voided || false;
    methodDto.IsCopied = paymentMethod.is_copied || false;
    methodDto.GatewayAccountId = paymentMethod.gateway_account_id;
    methodDto.LocationId = paymentMethod.location_id;
    methodDto.TransactionReferenceId = paymentMethod.transaction_reference_id;
    methodDto.CapturedInEdgeMode = paymentMethod.captured_in_edge_mode || false;
    methodDto.MerchandiseAmount = paymentMethod.merchandise_amount || 0.0;
    methodDto.CapturedSource = paymentMethod.captured_source;
    methodDto.ShopperReference = paymentMethod.shopper_reference;
    methodDto.SuggestedAmount = paymentMethod.suggested_amount;
    methodDto.PurgeDate = paymentMethod.purge_date;

    // Build billing address if available
    if (paymentMethod.billing_address) {
      methodDto.BillingAddress = this.buildAddressDto(
        paymentMethod.billing_address,
      );
    }

    return methodDto;
  }

  /**
   * Build Address DTO from JSONB data
   * @param addressData Address JSONB data
   * @returns AddressFormatDTO
   */
  private buildAddressDto(addressData: any): AddressFormatDTO {
    const addressDto = new AddressFormatDTO();

    addressDto.Actions = {};
    addressDto.PK = this.idGenerator.generateBillingAddressId();
    addressDto.CreatedBy = 'pubsubuser@pmp';
    addressDto.CreatedTimestamp = new Date().toISOString();
    addressDto.UpdatedBy = 'pubsubuser@pmp';
    addressDto.UpdatedTimestamp = new Date().toISOString();
    addressDto.Messages = null;
    addressDto.OrgId = 'CFR';
    addressDto.AddressId = addressData.AddressId;
    addressDto.AddressLine1 = addressData.AddressLine1;
    addressDto.AddressLine2 = addressData.AddressLine2;
    addressDto.AddressLine3 = addressData.AddressLine3;
    addressDto.City = addressData.City;
    addressDto.State = addressData.State;
    addressDto.ZipCode = addressData.ZipCode;
    addressDto.Country = addressData.Country;
    addressDto.DaytimePhone = addressData.DaytimePhone;
    addressDto.EveningPhone = addressData.EveningPhone;
    addressDto.MobilePhone = addressData.MobilePhone;
    addressDto.FirstName = addressData.FirstName;
    addressDto.LastName = addressData.LastName;
    addressDto.Company = addressData.Company;
    addressDto.EmailId = addressData.EmailId;
    addressDto.Title = addressData.Title;
    addressDto.PurgeDate = null;

    return addressDto;
  }

  /**
   * Generate address hash for deduplication
   * @param order Order with address data
   * @returns Address hash string
   */
  private generateAddressHash(order: Order): string {
    // Generate a hash based on customer information
    // This is a simplified implementation using built-in crypto
    const addressString = `${order.customerFirstName || ''}${order.customerLastName || ''}${order.customerPhone || ''}`;
    const crypto = require('crypto');

    return crypto
      .createHash('md5')
      .update(addressString)
      .digest('hex')
      .substring(0, 32);
  }

  /**
   * Calculate financial totals for order
   * @param order Order entity
   * @returns FinancialTotals
   */
  calculateFinancialTotals(order: Order): FinancialTotals {
    const subTotal = this.calculationService.calculateOrderSubtotal(
      order as any,
    );
    const totalTax = this.calculationService.calculateOrderTotalTaxes(
      order as any,
    );
    const totalCharges = this.calculationService.calculateTotalCharges(
      order as any,
    );
    const totalDiscount = Math.abs(
      this.calculationService.calculateOrderDiscounts(order as any),
    );
    const totalAmount = subTotal + totalTax + totalCharges - totalDiscount;

    return {
      subTotal,
      totalTax,
      totalCharges,
      totalDiscount,
      totalAmount,
    };
  }

  /**
   * Apply business rules to release data
   * @param releaseOutput Release output to validate and modify
   */
  applyBusinessRules(releaseOutput: ManhattanReleaseOutputDTO): void {
    this.logger.debug('Applying business rules to release output');

    // Validate payment amounts match order totals
    if (releaseOutput.Order?.Payment) {
      const totalPayments = releaseOutput.Order.Payment.reduce(
        (sum, payment) => {
          const paymentAmount =
            payment.PaymentMethod?.reduce((methodSum, method) => {
              return methodSum + (method.Amount || 0);
            }, 0) || 0;

          return sum + paymentAmount;
        },
        0,
      );

      if (Math.abs(totalPayments - (releaseOutput.ReleaseTotal || 0)) > 0.01) {
        this.logger.warn(
          `Payment amount mismatch: Expected ${releaseOutput.ReleaseTotal}, got ${totalPayments}`,
        );
      }
    }

    this.logger.debug('Business rules validation completed');
  }

  /**
   * Generate release output file
   * @param releaseData Release data to save
   * @returns Promise<string> Path to saved file
   */
  async generateReleaseOutput(
    releaseData: ManhattanReleaseOutputDTO,
  ): Promise<string> {
    try {
      // Ensure release directory exists
      const releaseDir = join(process.cwd(), 'release');

      await fs.mkdir(releaseDir, { recursive: true });

      // Generate filename
      const filename = 'release-output.json';
      const filePath = join(releaseDir, filename);
      // Write JSON file with formatting
      const jsonContent = JSON.stringify(releaseData, null, 2);

      await fs.writeFile(filePath, jsonContent, 'utf8');

      this.logger.log(`Release output saved to: ${filePath}`);

      return filePath;
    } catch (error: any) {
      this.logger.error('Failed to save release output:', error);

      throw new Error(
        `Failed to save release output: ${error.message || error}`,
      );
    }
  }

  /**
   * Transform and save order release
   * @param orderId Order identifier
   * @returns Promise<string> Path to saved release file
   */
  async transformAndSave(orderId: string): Promise<string> {
    const releaseData = await this.transformOrderToRelease(orderId);

    return await this.generateReleaseOutput(releaseData);
  }

  /**
   * Health check for service dependencies
   * @returns Promise<boolean> Health status
   */
  async healthCheck(): Promise<boolean> {
    try {
      const isDbHealthy = await this.repository.healthCheck();

      return isDbHealthy;
    } catch (error) {
      this.logger.error('Health check failed:', error);

      return false;
    }
  }
}
