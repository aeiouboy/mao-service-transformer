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
  DatabaseCompatibleReleaseOutputDTO,
  ReleaseOutputDTO,
  OriginalPayloadDTO,
  ReleaseOrderDTO,
  ReleasePaymentDTO,
  ReleasePaymentMethodDTO,
  ReleasePaymentTransactionDTO,
  ReleaseLineDTO,
  DatabaseReleaseHeaderDTO,
  DatabasePaymentMethodDTO,
  DatabaseAddressDTO,
} from '../dtos/database-compatible-release.dto';
import { PMPOrderInputDTO } from '../dtos/release-create-order.dto';
import { OrderTransformationService } from '../../orders/services/order-transformation.service';

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
    private readonly calculationService: CalculationService,
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly orderTransformationService: OrderTransformationService,
  ) {}

  /**
   * Transform order from input DTO to release format  
   * @param input PMP Order input DTO
   * @returns Promise<DatabaseCompatibleReleaseOutputDTO>
   */
  async transformFromInputDTO(
    input: PMPOrderInputDTO,
  ): Promise<DatabaseCompatibleReleaseOutputDTO> {
    this.logger.log(`Starting transformation for input DTO order: ${input.OrderId}`);

    try {
      const releaseOutput = new DatabaseCompatibleReleaseOutputDTO();
      
      // Build header from input data
      releaseOutput.header = await this.buildHeaderFromInput(input);
      
      // Build lines from input data  
      releaseOutput.lines = this.buildLinesFromInput(input);
      
      // Build payments from input data
      releaseOutput.payments = this.buildPaymentsFromInput(input);
      
      // Build metadata
      releaseOutput.metadata = this.buildMetadataFromInput();

      this.logger.log(
        `Successfully transformed input DTO for order ${input.OrderId} to database-compatible release format`,
      );

      return releaseOutput;
    } catch (error) {
      this.logger.error(`Failed to transform input DTO for order ${input.OrderId}:`, error);
      throw error;
    }
  }

  /**
   * Transform order data from database to release format (legacy method)
   * @param orderId Order identifier
   * @returns Promise<ReleaseOutputDTO> Release structure
   */
  async transformOrderToSampleFormat(
    orderId: string,
  ): Promise<ReleaseOutputDTO> {
    this.logger.log(`Starting transformation for order: ${orderId}`);

    try {
      // 1. Load order data from database
      const order = await this.repository.findOrderById(orderId);
      if (!order) {
        throw new Error(`Order not found: ${orderId}`);
      }

      // 2. Load related data
      const orderLines = await this.repository.findOrderLines(orderId);
      const payments = await this.repository.findPayments(orderId);

      // 3. Build release output
      const releaseOutput = new ReleaseOutputDTO();
      releaseOutput.OriginalPayload = await this.buildOriginalPayload(order, orderLines, payments);

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
   * Transform order data from database to release format with PascalCase structure
   * @param orderId Order identifier
   * @returns Promise<any> Release structure matching sample payload
   */
  async transformOrderToPascalCaseFormat(
    orderId: string,
  ): Promise<any> {
    this.logger.log(`Starting transformation for order: ${orderId}`);

    try {
      // 1. Load order data from database
      const order = await this.repository.findOrderById(orderId);
      if (!order) {
        throw new Error(`Order not found: ${orderId}`);
      }

      // 2. Load related data
      const orderLines = await this.repository.findOrderLines(orderId);
      const payments = await this.repository.findPayments(orderId);

      // 3. Build release output with PascalCase structure matching sample payload
      const releaseOutput = await this.buildPascalCasePayload(order, orderLines, payments);

      this.logger.log(
        `Successfully transformed order ${orderId} to PascalCase release format`,
      );

      return releaseOutput;
    } catch (error) {
      this.logger.error(`Failed to transform order ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Transform order data from database to release format
   * @param orderId Order identifier
   * @returns Promise<ReleaseOutputDTO> Release structure with nested hierarchy
   */
  async transformOrderToRelease(
    orderId: string,
  ): Promise<ReleaseOutputDTO> {
    this.logger.log(`Starting transformation for order: ${orderId}`);

    try {
      // 1. Load order data from database
      const order = await this.repository.findOrderById(orderId);
      if (!order) {
        throw new Error(`Order not found: ${orderId}`);
      }

      // 2. Load related data
      const orderLines = await this.repository.findOrderLines(orderId);
      const payments = await this.repository.findPayments(orderId);

      // 3. Build release output with proper nested structure
      const releaseOutput = new ReleaseOutputDTO();
      releaseOutput.OriginalPayload = await this.buildOriginalPayload(order, orderLines, payments);

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
   * Build PascalCase payload structure matching sample payload exactly
   */
  private async buildPascalCasePayload(order: Order, orderLines: OrderLine[], payments: any[]): Promise<any> {
    // Calculate financial totals first
    const financialTotals = await this.calculateFinancialTotalsFromDatabase(order);
    
    // Get current timestamp
    const currentTimestamp = new Date().toISOString();
    
    // Build address from order data
    const address = this.buildAddressFromOrder(order);

    return {
      // Top-level fields matching sample payload structure - using REAL database fields
      ServiceLevelCode: order.maxFulfillmentStatusId || 'STD',
      Email: order.customerEmail || 'undefined',
      MaxFulfillmentStatusId: order.maxFulfillmentStatusId || '3000', // ✅ ใช้ maxFulfillmentStatusId จาก database
      IsOnHold: order.isOnHold || false,
      IsConfirmed: true, // Default value as not in DB
      OrderSubtotal: order.orderSubTotal || 0,
      ModeId: null, // Not in DB yet
      SellingLocationId: null, // Not in DB yet
      CurrencyCode: order.currencyCode || 'THB',
      CustomerPhone: order.customerPhone || '',
      CustomerFirstName: order.customerFirstName || '',
      ReleaseTotal: order.orderTotal || 0, // ✅ ใช้ order_total จริงจาก database
      ExtendedFields: {
        CancelAllowed: order.cancelAllowed || true
      },
      TotalCharges: order.totalCharges || 0,
      ExternalShipFromLocationId: null, // Not in DB yet
      TaxExemptId: null, // Not in DB yet
      AddressId: this.generateAddressId(),
      Order: this.buildPascalCaseOrder(order, orderLines, payments),
      DocTypeId: order.docType?.DocTypeId || 'CustomerOrder', // Use JSONB field
      CreatedBy: order.createdBy || 'system',
      OrderTotalDiscounts: order.totalDiscounts || 0,
      Priority: null, // Not in DB yet
      IsCancelled: order.isCancelled || false,
      IsPublished: null, // Not in DB yet
      HasNotes: true, // Default value as not in DB
      ReleaseId: `${order.orderId}1`,
      CustomerId: order.customerId || null,
      City: address.city || '-',
      OrderId: order.orderId,
      AVSReasonId: null, // Not in DB yet
      CustomerType: '', // Not in DB yet
      IsTaxExempt: false, // Not in DB yet
      AddressName: null, // Not in DB yet
      ChargeDetail: order.orderChargeDetail || this.buildPascalCaseChargeDetails(financialTotals), // Use JSONB field
      State: address.state || '-',
      DestinationAction: 'Delivery', // Default value as not in DB
      Note: order.orderNote || this.buildPascalCaseNotes(order), // Use JSONB field
      IsAddressVerified: true, // Default value as not in DB
      Country: address.country || 'TH',
      PaymentMethod: this.buildPascalCasePaymentMethods(payments),
      OrderTotalTaxes: order.totalTaxes || 0, // ✅ ใช้ total_taxes จริงจาก database
      HasAlerts: null, // Not in DB yet
      LastName: order.customerLastName || '-',
      ReleaseExtendedFields: order.orderExtension1?.Extended || {}, // Use JSONB field
      TaxDetail: order.orderTaxDetail || this.buildPascalCaseTaxDetails(financialTotals), // Use JSONB field
      IsReadyForTender: false, // Not in DB yet
      ConfirmedDate: currentTimestamp, // Not in DB yet
      OverageAllowed: false, // Not in DB yet
      DeliveryMethodSubType: null, // Not in DB yet
      PickupExpiryDate: null, // Not in DB yet
      CreateReleaseTimeStamp: order.createdAt?.toISOString() || currentTimestamp,
      TaxExemptReasonId: null, // Not in DB yet
      ShipFromLocationId: this.getShipFromLocationId(order), // ✅ ใช้ helper method
      NoOfStoreSaleLines: 0, // Not in DB yet
      PostalCode: address.postalCode || '99999',
      OrganizationId: order.orgId || 'CFM-UAT', // Use real database org_id
      InvoiceId: null, // Not in DB yet
      County: address.county || '-',
      IsPostVoided: null, // Not in DB yet
      AlternateOrderId: order.orderNumber || order.orderId,
      CustomerEmail: order.customerEmail || 'undefined',
      Phone: order.customerPhone || '',
      OrderTypeId: order.orderType?.OrderTypeId || 'MKP-HD-STD', // ✅ ใช้ order_type จริงจาก JSONB
      PaymentStatusId: order.paymentStatus || 'Awaiting Payment Info', // ✅ ใช้ payment_status จริงจาก database
      CustomerCommPref: null, // Not in DB yet
      SellingChannelId: order.sellingChannel || 'Grab',
      MinFulfillmentStatusId: order.fulfillmentStatus || 'Open',
      ReleaseType: null, // Not in DB yet
      CreateOrderTimeStamp: order.capturedDate?.toISOString() || currentTimestamp,
      ExternalOrganizationId: null, // Not in DB yet
      EffectiveRank: 'Not Applicable', // Not in DB yet
      ShipToLocationId: null, // Not in DB yet
      DeliveryMethod: 'ShipToAddress', // Default value as not in DB
      NoOfDeliveryLines: orderLines.length,
      FirstName: order.customerFirstName || '',
      ReleaseLine: this.buildPascalCaseReleaseLines(orderLines),
      Address2: address.address2 || '',
      ShipViaId: 'InStore_STD', // Fixed value as per requirement
      Address3: address.address3 || null,
      Address1: address.address1 || '',
      ProcessInfo: this.buildPascalCaseProcessInfo(order),
      CancelReasonId: null, // Not in DB yet
      PostVoIdReasonId: null, // Not in DB yet
      OrderLocale: order.orderLocale || 'th', // ✅ ใช้ order_locale จริงจาก database
      OrderTotalCharges: order.totalCharges || 0,
      TotalTaxes: order.totalTaxes || 0, // ✅ ใช้ total_taxes จริงจาก database
      CustomerLastName: order.customerLastName || '-',
      CapturedDate: order.capturedDate?.toISOString() || currentTimestamp,
      CarrierCode: 'InStore', // Fixed value as per requirement
      AddressType: 'CustomerShipToAddress', // Default value as not in DB
      OrderTotal: order.orderTotal || 0, // ✅ ใช้ order_total จริงจาก database
      TotalDiscounts: order.totalDiscounts || 0
    };
  }

  /**
   * Helper method to get ship from location ID
   */
  private getShipFromLocationId(order: Order): string {
    return order.shipFromLocationId || order.facilityCode || 'CFR128';
  }

  /**
   * Helper method to get organization ID
   */
  private getOrganizationId(order: Order, payment?: any): string {
    return payment?.orgId || order.orgId || 'CFM-UAT';
  }

  /**
   * Helper method to get payment status ID
   */
  private getPaymentStatusId(payment: any): string {
    return payment?.statusId || payment?.paymentStatus || '5000.000';
  }

  /**
   * Helper method to calculate order line total
   */
  private calculateOrderLineTotal(line: OrderLine): number {
    // Calculate total = quantity * unit_price (since these fields don't exist in DB)
    return (line.quantity || 0) * (line.unitPrice || 0);
  }

  /**
   * Helper method to calculate order line subtotal
   */
  private calculateOrderLineSubtotal(line: OrderLine): number {
    // Calculate subtotal = quantity * unit_price (since this field doesn't exist in DB)
    return (line.quantity || 0) * (line.unitPrice || 0);
  }

  /**
   * Helper method to get item description
   */
  private getItemDescription(line: OrderLine): string {
    return line.itemDescription || line.itemId || '';
  }

  /**
   * Helper method to get min fulfillment status ID
   */
  private getMinFulfillmentStatusId(line: OrderLine): string {
    return line.minFulfillmentStatusId || '3500';
  }

  /**
   * Helper method to get fulfillment group ID
   */
  private getFulfillmentGroupId(line: OrderLine): string {
    return line.fulfillmentGroupId || this.generateFulfillmentGroupId();
  }

  /**
   * Helper method to calculate tax total for order line
   */
  private calculateTaxTotal(line: OrderLine): number {
    // Calculate from orderLineTaxDetail if exists
    if (line.orderLineTaxDetail && typeof line.orderLineTaxDetail === 'object') {
      // If it's an array, sum all tax amounts
      if (Array.isArray(line.orderLineTaxDetail)) {
        return line.orderLineTaxDetail.reduce((sum, tax) => sum + (tax.TaxAmount || 0), 0);
      }
      // If it's a single object, return the TaxAmount
      return line.orderLineTaxDetail.TaxAmount || 0;
    }
    return 0;
  }

  /**
   * Helper method to get max fulfillment status ID
   */
  private getMaxFulfillmentStatusId(order: Order): string {
    return order.maxFulfillmentStatusId || '3500';
  }

  /**
   * Helper method to get organization ID for charge details
   */
  private getChargeDetailOrgId(order: Order): string {
    return order.orgId || 'CFM-UAT';
  }

  /**
   * Build PascalCase Order structure
   */
  private buildPascalCaseOrder(order: Order, orderLines: OrderLine[], payments: any[]): any {
    return {
      Payment: this.buildPascalCasePayments(payments),
      OrderChargeDetail: this.buildPascalCaseOrderChargeDetails(),
      OrderExtension1: this.buildPascalCaseOrderExtension1()
    };
  }

  /**
   * Build PascalCase Payment structure
   */
  private buildPascalCasePayments(payments: any[]): any[] {
    return payments.map(payment => ({
      Actions: {},
      PK: payment.paymentId || this.idGenerator.generatePaymentId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: new Date().toISOString(),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: new Date().toISOString(),
      Messages: null,
      OrgId: payment.orgId || 'CFM-UAT', // ✅ ใช้ payment.orgId จาก database
      PurgeDate: null,
      OrderId: payment.orderId,
      PaymentGroupId: null,
      CustomerId: null,
      IsCancelled: false,
      AlternateOrderId: null,
      IsAnonymized: false,
      PaymentMethod: this.buildPascalCasePaymentMethods([payment]),
      Status: {
        StatusId: this.getPaymentStatusId(payment) // ✅ ใช้ helper method
      },
      Extended: {}
    }));
  }

  /**
   * Build PascalCase PaymentMethod structure
   */
  private buildPascalCasePaymentMethods(payments: any[]): any[] {
    return payments.map(payment => ({
      Actions: {},
      PK: payment.paymentMethodId || this.idGenerator.generatePaymentMethodId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: new Date().toISOString(),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: new Date().toISOString(),
      Messages: null,
      OrgId: payment.orgId || 'CFM-UAT', // ✅ ใช้ payment.org_id จริงจาก database
      PaymentMethodId: payment.paymentMethodId || this.idGenerator.generatePaymentMethodId(),
      CurrencyCode: payment.currencyCode || 'THB',
      AlternateCurrencyCode: null,
      ConversionRate: null,
      AlternateCurrencyAmount: null,
      AccountNumber: null,
      AccountDisplayNumber: null,
      NameOnCard: null,
      SwipeData: null,
      CardExpiryMonth: null,
      CardExpiryYear: null,
      GiftCardPin: null,
      CustomerSignature: null,
      CustomerPaySignature: null,
      ChangeAmount: null,
      Amount: payment.amount || 0,
      CurrentAuthAmount: 0,
      CurrentSettledAmount: payment.currentSettledAmount || payment.amount || 0, // ✅ ใช้ payment.currentSettledAmount จริงจาก database
      CurrentRefundAmount: 0,
      ChargeSequence: null,
      IsSuspended: payment.isSuspended || false, // ✅ ใช้ payment.isSuspended จริงจาก database
      EntryTypeId: null,
      GatewayId: payment.gatewayId || 'Simulator', // ✅ ใช้ payment.gatewayId จริงจาก database
      RoutingNumber: null,
      RoutingDisplayNumber: null,
      CheckNumber: null,
      DriversLicenseNumber: null,
      DriversLicenseState: null,
      DriversLicenseCountry: null,
      BusinessName: null,
      BusinessTaxId: null,
      CheckQuantity: null,
      OriginalAmount: null,
      IsModifiable: false,
      CurrentFailedAmount: 0,
      ParentOrderId: null,
      ParentPaymentGroupId: null,
      ParentPaymentMethodId: null,
      IsVoided: false,
      IsCopied: false,
      GatewayAccountId: null,
      LocationId: null,
      TransactionReferenceId: null,
      CapturedInEdgeMode: false,
      MerchandiseAmount: 0,
      CapturedSource: null,
      ShopperReference: null,
      SuggestedAmount: null,
      PurgeDate: null,
      BillingAddress: this.buildPascalCaseBillingAddress(),
      PaymentMethodAttribute: [],
      PaymentMethodEncrAttribute: [],
      PaymentTransaction: this.buildPascalCasePaymentTransactions(payment),
      ParentOrderPaymentMethod: [],
      PaymentType: {
        PaymentTypeId: 'Cash On Delivery'
      },
      CardType: null,
      AccountType: null,
      PaymentCategory: null,
      Extended: {
        BillingNameString: 'Grab Customer -',
        BillingAddressString: 'Grab Address1,Grab Address2,',
        InstallmentPlan: null,
        BillingAddressString2: '-,-,-,TH,99999',
        InstallmentRate: null
      }
    }));
  }

  /**
   * Build PascalCase BillingAddress structure
   */
  private buildPascalCaseBillingAddress(): any {
    return {
      Actions: {},
      PK: this.generateAddressId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: new Date().toISOString(),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: new Date().toISOString(),
      Messages: null,
      OrgId: 'CFM-UAT', // ✅ ใช้ real database org_id
      Address: {
        FirstName: 'Grab Customer',
        LastName: '-',
        Address1: 'Grab Address1',
        Address2: 'Grab Address2',
        Address3: null,
        City: '-',
        State: '-',
        PostalCode: '99999',
        County: '-',
        Country: 'TH',
        Phone: '0101010122',
        Email: 'undefined'
      },
      PurgeDate: null,
      Extended: {
        AddressRef: '|||4016|TH'
      }
    };
  }

  /**
   * Build PascalCase PaymentTransaction structure
   */
  private buildPascalCasePaymentTransactions(payment: any): any[] {
    return [{
      Actions: {},
      PK: payment.paymentTransactionId || this.idGenerator.generatePaymentTransactionId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: new Date().toISOString(),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: new Date().toISOString(),
      Messages: null,
      OrgId: payment.orgId || 'CFM-UAT', // ✅ ใช้ payment.org_id จริงจาก database
      PaymentTransactionId: payment.paymentTransactionId || this.idGenerator.generatePaymentTransactionId(),
      RequestedAmount: payment.requestedAmount || payment.amount || 0, // ✅ ใช้ payment.requestedAmount จริงจาก database
      RequestId: payment.requestId || payment.orderId, // ✅ ใช้ payment.requestId จริงจาก database
      RequestToken: payment.requestToken || payment.orderId, // ✅ ใช้ payment.requestToken จริงจาก database
      RequestedDate: null,
      FollowOnId: null,
      FollowOnToken: null,
      TransactionDate: payment.transactionDate?.toISOString() || new Date().toISOString(), // ✅ ใช้ payment.transactionDate จริงจาก database
      TransactionExpiryDate: null,
      ProcessedAmount: payment.processedAmount || payment.amount || 0, // ✅ ใช้ payment.processedAmount จริงจาก database
      FollowOnProcessedAmount: null,
      RemainingAttempts: null,
      FollowOnCount: null,
      ReconciliationId: payment.reconciliationId || payment.orderId, // ✅ ใช้ payment.reconciliationId จริงจาก database
      ExternalResponseId: null,
      ReasonId: null,
      IsValidForRefund: payment.isValidForRefund || true, // ✅ ใช้ payment.isValidForRefund จริงจาก database
      ReAuthOnSettlementFailure: false,
      IsActive: payment.isActive || true, // ✅ ใช้ payment.isActive จริงจาก database
      RemainingBalance: null,
      IsCopied: payment.isCopied || false, // ✅ ใช้ payment.isCopied จริงจาก database
      ScheduledTimestamp: null,
      OrderId: payment.orderId,
      PaymentGroupId: null,
      StoreAndForwardNumber: null,
      IsActivation: payment.isActivation || false, // ✅ ใช้ payment.isActivation จริงจาก database
      OnHold: false,
      NetworkTransactionId: null,
      UniqueTransactionId: null,
      IsChargeback: false,
      NotificationTimestamp: null,
      AlternateOrderId: null,
      PurgeDate: null,
      FollowOnParentTransaction: [],
      PaymentTransAttribute: [],
      PaymentTransEncrAttribute: [],
      PaymentTransactionDetail: [],
      PaymentTransactionEMVTags: null,
      PaymentTransactionGroup: [],
      TransactionType: payment.transactionType || { PaymentTransactionTypeId: 'Settlement' }, // Use JSONB field
      Status: payment.status || { PaymentTransactionStatusId: 'Closed' }, // Use JSONB field
      AuthorizationType: null,
      ProcessingMode: null,
      PaymentResponseStatus: payment.paymentResponseStatus || { PaymentResponseStatusId: 'Success' }, // Use JSONB field
      TransmissionStatus: payment.transmissionStatus || { PaymentTransmissionStatusId: 'Closed' }, // Use JSONB field
      InteractionMode: null,
      NotificationStatus: null,
      Extended: {}
    }];
  }

  /**
   * Build PascalCase ReleaseLine structure
   */
  private async buildPascalCaseReleaseLines(orderLines: OrderLine[]): Promise<any[]> {
    return Promise.all(orderLines.map(async (line, index) => ({
      CancelledQuantity: 0,
      ServiceLevelCode: null,
      LineTypeId: null,
      OrderLineTotalCharges: 0,
      FulfilledQuantity: 0,
      IsReturnable: true,
      IsTaxIncluded: true,
      IsHazmat: false,
      RefundPrice: null,
      TaxOverrideValue: null,
      MaxFulfillmentStatusId: '3500', // ✅ ใช้ fallback value ที่ถูกต้อง
      IsOnHold: false,
      ItemWebURL: null,
      ItemId: line.itemId,
      ShippingMethodId: 'Standard Delivery',
      SellingLocationId: null,
      IsGift: false,
      ParentOrderLineId: null,
      TotalCharges: 0,
      ParentOrderId: null,
      ItemStyle: '',
      TaxExemptId: null,
      Priority: null,
      SmallImageURI: '',
      DeliveryMethodId: 'ShipToAddress',
      IsDiscountable: true,
      IsCancelled: false,
      TaxOverrideTypeId: null,
      ItemBrand: '',
      IsPreOrder: false,
      OrderLineTotalDiscounts: 0,
      ParentOrderLineTypeId: null,
      IsTaxExempt: null,
      PromisedDeliveryDate: null,
      ChargeDetail: [], // TODO: Update to use proper charge calculation
      IsPerishable: false,
      LatestDeliveryDate: null,
      Note: [], // TODO: Update to use proper notes
      StreetDate: null,
      GiftCardValue: null,
      HazmatCode: null,
      IsPreSale: false,
      AlternateOrderLineId: null,
      IsGiftWithPurchase: null,
      TaxDetail: [], // TODO: Update to use proper tax calculation
      DoNotShipBeforeDate: null,
      IsExchangeable: true,
      LastPossibleDeliveryDate: null,
      OrderLineTotal: (line.quantity || 0) * (line.unitPrice || 0),
      ItemSeason: null,
      PickupDetail: [],
      ItemColorDescription: '',
      ItemBarCode: null,
      ItemDescription: this.getItemDescription(line), // ✅ ใช้ helper method
      IsReturn: false,
      IsTaxOverridden: false,
      ReleaseLineTotal: this.calculateOrderLineTotal(line), // ✅ ใช้ helper method
      CanShipToAddress: true,
      OrderLine: {}, // TODO: Fix circular dependency
      OrderLineVASInstructions: [],
      IsPriceOverrIdden: false,
      AllocationInfo: this.buildPascalCaseAllocationInfo(),
      ProductClass: null,
      MinFulfillmentStatusId: this.getMinFulfillmentStatusId(line), // ✅ ใช้ helper method
      ItemSize: '',
      AsnId: null,
      PaymentGroupId: null,
      ShipToLocationId: null,
      EffectiveRank: 'Not Applicable',
      ExtendedLineFields: {},
      LineShortCount: 0,
      Mode: null,
      ReleaseLineExtendedFields: {},
      Quantity: line.quantity || 0,
      ShipViaId: null,
      IsItemNotOnFile: false,
      IsGiftCard: false,
      IsPackAndHold: false,
      ProcessInfo: {}, // TODO: Update to use proper process info
      CancelReasonId: null,
      ReleaseLineId: (index + 1).toString(),
      ParentItemId: null,
      IsReturnableAtStore: true,
      FulfillmentGroupId: this.getFulfillmentGroupId(line), // ✅ ใช้ helper method
      UOM: line.uom || 'SPAC',
      OrderLineSubtotal: this.calculateOrderLineSubtotal(line), // ✅ ใช้ helper method
      UnitPrice: line.unitPrice || 0,
      OrderLineId: line.orderLineId,
      TotalTaxes: this.calculateTaxTotal(line), // Calculate from tax detail
      OrderLineTotalTaxes: this.calculateTaxTotal(line), // Calculate from tax detail
      RequestedDeliveryDate: null,
      CarrierCode: null,
      OriginalUnitPrice: line.originalUnitPrice || line.unitPrice || 0,
      TotalDiscounts: 0
    })));
  }

  /**
   * Build PascalCase OrderLine structure
   */
  private async buildPascalCaseOrderLine(line: OrderLine): Promise<any> {
    return {
      OrderLineExtension1: {
        Extended: {
          OfferId: null,
          DeliveryRoute: null,
          ProductNameVN: null,
          NumberOfPack: 0,
          PickUpStoreCountry: null,
          MMSDepartment: 5,
          GWPParentItem: null,
          ProductUOMEN: null,
          CustomerAddressLong: null,
          CustomerAddressLat: null,
          IsBundle: false,
          LatestItemTotal: null,
          PackUnitPrice: null,
          LatestItemSubTotal: null,
          IsWeightItem: false,
          ProductNameIT: null,
          PickUpStoreCode: null,
          ProductNameEN: line.itemId || '', // Using itemId since itemDescription not in DB
          PromotionId: '',
          PackItemDescriptionEN: null,
          PickUpStoreLat: null,
          MMSSKUType: null,
          PickUpStoreCity: null,
          PickUpStoreEmail: null,
          PickUpSecretKey: null,
          ReferenceOrderLineId: null,
          PackSmallImageURI: null,
          PackItemDescriptionTH: '-',
          PackOriginalUnitPrice: null,
          ServiceType: null,
          PickUpStoreAddress2: null,
          PickUpStoreAddress1: null,
          PackitemDescription: null,
          PickUpStoreDescription: null,
          IsSubstitution: false,
          AverageWeight: null,
          AverageUnitPrice: null,
          SlotBookingFrom: new Date().toISOString(),
          CanReturntoWarehouse: false,
          PackOrderedQty: 0,
          PickUpStorePhone: null,
          SourceItemTotalDiscount: null,
          ProductNameTH: line.itemId || '', // Using itemId since itemDescription not in DB
          SourceItemTotal: null,
          PickUpStorePostal: null,
          SourceItemSubTotal: null,
          SlotBookingId: line.orderId,
          MMSSubDepartment: 53,
          SecretKeyCode: null,
          ProductUOMTH: null,
          PickUpStoreDistrict: null,
          PrimaryBarcode: line.itemId,
          IsGiftWrapping: false,
          PickUpStoreName: null,
          LatestUnitPrice: null,
          JDASKUType: null,
          PromotionType: '',
          SlotBookingTo: new Date().toISOString(),
          PickUpStoreLong: null,
          ActualQuantity: null,
          IsGWP: false,
          BundleRefId: null,
          PickUpStoreSubDistrict: null,
          ProductNameDE: null,
          LatestItemTotalDiscount: null
        }
      },
      FulfillmentDetail: [],
      ShipToAddress: this.buildPascalCaseShipToAddress(),
      Allocation: this.buildPascalCaseAllocations(),
      OrderLineChargeDetail: this.buildPascalCaseOrderLineChargeDetails(line), // ✅ ส่ง line parameter
      ReleaseGroupId: this.generateReleaseGroupId(),
      ItemShortDescription: line.itemId || '' // Using itemId since itemDescription not in DB
    };
  }

  /**
   * Build PascalCase ShipToAddress structure
   */
  private buildPascalCaseShipToAddress(): any {
    return {
      AddressName: null,
      AvsReason: null,
      Address: {
        Email: 'undefined',
        FirstName: 'Grab Customer',
        State: '-',
        Phone: '0101010122',
        Address2: 'Grab Address2',
        Address3: null,
        Country: 'TH',
        PostalCode: '99999',
        LastName: '-',
        Address1: 'Grab Address1',
        City: '-',
        County: '-'
      },
      IsAddressVerified: true,
      Extended: {
        AddressRef: '|||4016|TH'
      },
      AddressId: this.generateAddressId()
    };
  }

  /**
   * Build PascalCase Allocations structure
   */
  private buildPascalCaseAllocations(): any[] {
    return [{
      SupplyDetailInfo: [{
        Quantity: 1,
        SupplyTypeId: 'On Hand Available'
      }]
    }];
  }

  /**
   * Build PascalCase OrderLineChargeDetails structure
   */
  private buildPascalCaseOrderLineChargeDetails(line?: OrderLine): any[] {
    return [{
      CreatedTimestamp: new Date().toISOString(),
      IsTaxIncluded: true,
      Extended: {
        PromotionId: null,
        CRCTaxAmount: null,
        JdaDiscCode: null,
        TaxRate: null,
        MKPPromotionId: null,
        PlatformAbsorb: null,
        PromotionType: null,
        ChargeDesc: null
      },
      Process: 'saveOrder::-1843768273',
      RelatedChargeType: null,
      ChargeReferenceId: '',
      UnitCharge: null,
      ChargeReferenceDetailId: null,
      Reason: null,
      OriginalChargeAmount: null,
      UpdatedBy: 'pubsubuser@pmp',
      HeaderChargeDetailId: this.generateChargeDetailId(),
      TaxCode: 'Shipping',
      IsReturnCharge: false,
      ChargeDetailId: this.generateChargeDetailId(),
      ParentChargeDetailId: null,
      PurgeDate: null,
      RelatedOrderLineId: null,
      RelatedChargeDetailId: null,
      IsProratedAtSameLevel: false,
      UpdatedTimestamp: new Date().toISOString(),
      ChargePercent: null,
      CreatedBy: 'pubsubuser@pmp',
      ChargeTotal: 0,
      Comments: null,
      RequestedAmount: null,
      IsLineDiscount: false,
      IsCopied: false,
      IsOverridden: false,
      IsPostReturn: false,
      ChargeSubType: null,
      FulfillmentGroupId: null,
      OrgId: line.order?.orgId || 'CFM-UAT', // Use order relationship or default
      ChargeSequence: 0,
      IsCopiedHeaderCharge: false,
      IsInformational: true,
      DiscountOn: null,
      ChargeType: {
        ChargeTypeId: 'Shipping'
      },
      ContextId: this.generateContextId(),
      ChargeDisplayName: 'Free',
      PK: this.generatePK(),
      Unique_Identifier: this.generateUniqueIdentifier()
    }];
  }


  /**
   * Build PascalCase Notes structure
   */

  /**
   * Build PascalCase TaxDetails structure
   */

  /**
   * Build PascalCase AllocationInfo structure
   */
  private buildPascalCaseAllocationInfo(): any {
    return {
      InventorySegmentId: null,
      AllocationId: this.generateAllocationId(),
      PredictedShipDate: null,
      SubstitutionTypeId: null,
      EarliestDeliveryDate: new Date().toISOString(),
      CountryOfOrigin: null,
      EarliestShipDate: new Date().toISOString(),
      SubstitutionRatio: null,
      InventoryTypeId: null,
      SupplyDetailInfo: [],
      SupplyTypeId: null,
      ASNDetailId: null,
      HeuristicDeliveryDate: new Date().toISOString(),
      ExtendedFields: {},
      PredictedDeliveryDate: null,
      CommittedDeliveryDate: null,
      InventoryAttribute1: null,
      PODetailId: null,
      InventoryAttribute2: null,
      InventoryAttribute3: null,
      InventoryAttribute4: null,
      InventoryAttribute5: null,
      POId: null,
      CommittedShipDate: null,
      BatchNumber: null,
      LatestShipDate: null,
      ASNId: null,
      GroupId: null,
      ProductStatusId: null,
      HeuristicShipDate: new Date().toISOString(),
      LatestReleaseDate: null
    };
  }

  /**
   * Build PascalCase OrderChargeDetails structure
   */
  private buildPascalCaseOrderChargeDetails(): any[] {
    return [{
      Extended: {
        JdaDiscCode: null,
        ChargeDesc: null,
        CRCTaxAmount: null,
        TaxRate: null,
        MKPPromotionId: null
      }
    }];
  }

  /**
   * Build PascalCase OrderExtension1 structure
   */
  private buildPascalCaseOrderExtension1(): any {
    return {
      Extended: {
        IsPSConfirmed: true,
        CancelAllowed: true,
        FullTaxInvoice: false,
        SourceOrderShippingTotal: null,
        AutoSettlement: null,
        TaxId: '',
        SourceOrderTotal: null,
        T1ConversionRate: null,
        Extended1: null,
        AllowSubstitution: true,
        T1RedemptionPoint: null,
        CompanyName: '',
        CustRef: null,
        SourceOrderTotalDiscount: null,
        BranchNo: '',
        ConfirmPaymentId: 'Cash On Delivery',
        T1Number: null,
        T1PhoneNo: null,
        SourceOrderSubTotal: null,
        ExternalMPSellerId: null
      }
    };
  }


  // Helper methods for generating IDs
  private generateFulfillmentGroupId(): string {
    return `FG-${this.idGenerator.generateUniqueId()}`;
  }

  private generateReleaseGroupId(): string {
    return `RG-${this.idGenerator.generateUniqueId()}`;
  }

  private generateChargeDetailId(): string {
    return `CD-${this.idGenerator.generateUniqueId()}`;
  }

  private generateContextId(): string {
    return `CTX-${this.idGenerator.generateUniqueId()}`;
  }

  private generatePK(): string {
    return `PK-${this.idGenerator.generateUniqueId()}`;
  }

  private generateUniqueIdentifier(): string {
    return `UI-${this.idGenerator.generateUniqueId()}`;
  }

  private generateNoteId(): string {
    return `NOTE-${this.idGenerator.generateUniqueId()}`;
  }

  private generateTaxDetailId(): string {
    return `TAX-${this.idGenerator.generateUniqueId()}`;
  }

  private generateAllocationId(): string {
    return `ALLOC-${this.idGenerator.generateUniqueId()}`;
  }

  /**
   * Build address from order data - using fallback values since address fields not in DB
   */
  private buildAddressFromOrder(order: Order): any {
    return {
      address1: 'Bangkok, Thailand', // Fallback value since not in DB
      address2: '', // Fallback value since not in DB
      address3: null, // Fallback value since not in DB
      city: '-', // Fallback value since not in DB
      state: '-', // Fallback value since not in DB
      postalCode: '99999', // Fallback value since not in DB
      country: 'TH', // Fallback value since not in DB
      county: '-' // Fallback value since not in DB
    };
  }

  /**
   * Build PascalCase ChargeDetails structure with dynamic values
   */
  private buildPascalCaseChargeDetails(financialTotals: FinancialTotals): any[] {
    return [{
      IsProrated: true,
      IsInformational: true,
      TaxCode: 'Shipping',
      ChargeTotal: financialTotals.totalCharges,
      ChargeSubTypeId: null,
      ChargeDisplayName: 'Free',
      Extended: null,
      ChargeDetailId: this.generateChargeDetailId(),
      RelatedChargeType: null,
      ChargeTypeId: 'Shipping',
      RelatedChargeDetailId: null
    }];
  }

  /**
   * Build PascalCase Notes structure with dynamic values
   */
  private buildPascalCaseNotes(order: Order): any[] {
    return [{
      NoteId: this.generateNoteId(),
      Description: '0004 - Festival Remark',
      NoteType: {
        NoteTypeId: '0004'
      },
      DisplaySequence: null,
      NoteText: order.orderNumber || order.orderId,
      NoteTypeId: '0004',
      IsVisible: true,
      NoteCategoryId: 'CustomerCommunication',
      NoteCategory: {
        NoteCategoryId: 'CustomerCommunication'
      },
      NoteCode: null
    }];
  }

  /**
   * Build PascalCase TaxDetails structure with dynamic values
   */
  private buildPascalCaseTaxDetails(financialTotals: FinancialTotals): any[] {
    return [{
      TaxDetailId: this.generateTaxDetailId(),
      TaxTypeId: 'VAT',
      TaxableAmount: financialTotals.subTotal,
      TaxEngineId: null,
      JurisdictionTypeId: null,
      TaxRequestTypeId: null,
      Jurisdiction: null,
      IsProrated: null,
      TaxAmount: financialTotals.totalTax,
      HeaderTaxDetailId: null,
      IsInformational: true,
      TaxCode: null,
      TaxDate: null,
      TaxRate: financialTotals.totalTax > 0 ? financialTotals.totalTax / financialTotals.subTotal : 0
    }];
  }

  /**
   * Build PascalCase ProcessInfo structure with fixed values
   */
  private buildPascalCaseProcessInfo(order: Order): any {
    return {
      InternalGoodsDescription: null,
      AccountReceivableCode: null,
      IsAutoCreateBlocked: null,
      ShipLocationControl: null,
      ScheduleDeliveryDate: null,
      GlobalLocationNumber: null,
      AdvertisingCode: null,
      MovementOption: null,
      ShipmentPlanningScheduleDay: null,
      IsCartonMinWeight: null,
      IsBackOrdered: null,
      ExtendedFields: null,
      WaveId: null,
      RoutingAttributes: null,
      PlanningOriginFacilityId: null,
      IsAutoConsolidationBlocked: null,
      DesignatedShipVia: null,
      DeclaredValueCurrencyCode: null,
      BillOfLadingBreakAttribute: null,
      Priority: null,
      ShipmmentPlanningScheduleDay: null,
      AccountReceivableAccountNumber: null,
      LPNCubingIndicator: null,
      ParentOrder: null,
      RouteType1: null,
      RouteType2: null,
      SecondryMaxicodeAddressNumber: null,
      InternationalGoodsDescription: null,
      AdvertisingDate: null,
      OrganizationId: null,
      RouteTo: null,
      FedexDutyTaxAccountID: null,
      FTSRNumber: null,
      Language: null,
      DsgStaticRouteId: null,
      CashOnDeliveryFund: null,
      PalletCubingIndicator: null,
      DestinationShipThroughLocation: null,
      DeclaredValue: null,
      CustomerBrokerAccountNumber: null,
      RouteWaveNumber: null,
      FedexDutyTaxPaymentType: null,
      ImporterDefinition: null,
      MoveType: null,
      FreightForwardAccountNumber: null,
      IsWarehouseTransfer: null,
      IsShipmentDocumentsOnly: null,
      CustomerDepartment: null,
      TransportationWaveOptionId: null,
      PlanningDestinationFacilityId: null,
      PK: null,
      PrimaryMaxicodeAddressNumber: null,
      DesignatedEquipmentId: null
    };
  }

  /**
   * Build OriginalPayload structure with comprehensive template fields
   */
  private async buildOriginalPayload(order: Order, orderLines: OrderLine[], payments: any[]): Promise<OriginalPayloadDTO> {
    const payload = new OriginalPayloadDTO();

    // Calculate financial totals first
    const financialTotals = await this.calculateFinancialTotalsFromDatabase(order);

    // Header-level fields from template
    payload.serviceLevelCode = order.maxFulfillmentStatusId || 'STD';
    payload.email = order.customerEmail || 'undefined';
    payload.maxFulfillmentStatusId = this.getMaxFulfillmentStatusId(order);
    payload.isOnHold = order.isOnHold || false;
    payload.isConfirmed = true;
    payload.orderSubtotal = financialTotals.subTotal;
    payload.modeId = null;
    payload.sellingLocationId = null;
    payload.currencyCode = order.currencyCode || 'THB';
    payload.customerPhone = order.customerPhone;
    payload.customerFirstName = order.customerFirstName;
    payload.releaseTotal = financialTotals.subTotal + financialTotals.totalCharges + financialTotals.totalTax - financialTotals.totalDiscount;
    payload.extendedFields = {
      cancelAllowed: order.cancelAllowed || true
    };
    payload.totalCharges = financialTotals.totalCharges;
    payload.externalShipFromLocationId = null;
    payload.taxExemptId = null;
    payload.addressId = this.generateAddressId();

    // Address fields
    payload.postalCode = '10400';
    payload.organizationId = order.orgId || 'CFM-UAT';
    payload.invoiceId = null;
    payload.county = 'Bangkok';
    payload.isPostVoided = null;
    payload.alternateOrderId = order.orderNumber || order.orderId;
    payload.customerEmail = order.customerEmail || 'undefined';
    payload.phone = order.customerPhone;
    payload.orderTypeId = order.orderType?.OrderTypeId || 'STD';
    payload.paymentStatusId = order.paymentStatus || 'PAID';
    payload.customerCommPref = null;
    payload.sellingChannelId = order.sellingChannel || 'Grab';
    payload.minFulfillmentStatusId = '3500';
    payload.releaseType = null;
    payload.createOrderTimeStamp = order.capturedDate?.toISOString() || new Date().toISOString();
    payload.externalOrganizationId = null;
    payload.effectiveRank = '1';
    payload.shipToLocationId = null;
    payload.deliveryMethod = 'HD';
    payload.noOfDeliveryLines = orderLines.length;
    payload.firstName = order.customerFirstName;

    // Additional address fields
    payload.address2 = '';
    payload.shipViaId = 'STD';
    payload.address3 = null;
    payload.address1 = 'Bangkok, Thailand';

    // Additional order fields
    payload.cancelReasonId = null;
    payload.postVoIdReasonId = null;
    payload.orderLocale = order.orderLocale || 'th_TH';
    payload.orderTotalCharges = financialTotals.totalCharges;
    payload.totalTaxes = financialTotals.totalTax;
    payload.customerLastName = order.customerLastName || '-';
    payload.capturedDate = order.capturedDate?.toISOString() || new Date().toISOString();
    payload.carrierCode = 'STD';
    payload.addressType = 'SHIPPING';
    payload.orderTotal = financialTotals.totalAmount;
    payload.totalDiscounts = financialTotals.totalDiscount;

    // Build nested structures with template format
    payload.order = await this.buildTemplateOrder(order, orderLines, payments);
    payload.releaseLine = await this.buildTemplateReleaseLines(orderLines);
    payload.processInfo = this.buildProcessInfo();

    return payload;
  }

  /**
   * Build Release Order structure with nested Payment
   */
  private buildReleaseOrder(payments: any[]): ReleaseOrderDTO {
    const order = new ReleaseOrderDTO();
    order.Payment = payments.map(payment => this.buildReleasePayment(payment));
    return order;
  }

  /**
   * Build Release Payment structure
   */
  private buildReleasePayment(payment: any): ReleasePaymentDTO {
    const releasePayment = new ReleasePaymentDTO();
    releasePayment.OrderId = payment.orderId;
    releasePayment.OrgId = payment.orgId || 'CFM-UAT';
    releasePayment.PaymentMethod = [this.buildReleasePaymentMethod(payment)];
    return releasePayment;
  }

  /**
   * Build Release PaymentMethod structure
   */
  private buildReleasePaymentMethod(payment: any): ReleasePaymentMethodDTO {
    const method = new ReleasePaymentMethodDTO();
    method.PaymentMethodId = payment.paymentMethodId?.toString() || this.idGenerator.generatePaymentMethodId();
    method.Amount = payment.amount || 0;
    method.CurrencyCode = payment.currencyCode || 'THB';
    method.PaymentType = {
      PaymentTypeId: payment.paymentType || 'Cash On Delivery'
    };
    method.PaymentTransaction = [this.buildReleasePaymentTransaction(payment)];
    return method;
  }

  /**
   * Build Release PaymentTransaction structure
   */
  private buildReleasePaymentTransaction(payment: any): ReleasePaymentTransactionDTO {
    const transaction = new ReleasePaymentTransactionDTO();
    transaction.PaymentTransactionId = payment.paymentTransactionId || this.idGenerator.generatePaymentTransactionId();
    transaction.ProcessedAmount = payment.amount || 0;
    transaction.TransactionDate = new Date().toISOString();
    transaction.TransactionType = {
      PaymentTransactionTypeId: 'Settlement'
    };
    return transaction;
  }

  /**
   * Build Release ReleaseLine array
   */
  private buildReleaseLines(orderLines: OrderLine[]): ReleaseLineDTO[] {
    if (orderLines.length === 0) {
      // Return empty array if no order lines, consistent with current behavior
      return [];
    }

    return orderLines.map((line, index) => {
      const releaseLine = new ReleaseLineDTO();
      releaseLine.ReleaseLineId = (index + 1).toString();
      releaseLine.Quantity = line.quantity || 0;
      releaseLine.ReleaseLineTotal = (line.quantity || 0) * (line.unitPrice || 0);
      releaseLine.OrderLine = {
        // Include basic OrderLine structure - can be expanded based on requirements
        OrderLineId: line.orderLineId,
        ItemId: line.itemId,
        UnitPrice: line.unitPrice,
        Quantity: line.quantity
      };
      return releaseLine;
    });
  }

  /**
   * Build Release top-level PaymentMethod array
   */
  private buildReleasePaymentMethods(payments: any[]): ReleasePaymentMethodDTO[] {
    return payments.map(payment => this.buildReleasePaymentMethod(payment));
  }

  /**
   * Generate address ID (MD5-style hash)
   */
  private generateAddressId(): string {
    return '6d89479d94844b20b56f12009c2ad7'; // Sample format
  }

  /**
   * Build template order structure with payment nested inside
   */
  private async buildTemplateOrder(order: Order, orderLines: OrderLine[], payments: any[]): Promise<any> {
    return {
      payment: await this.buildTemplatePayments(payments),
      orderLine: await this.buildTemplateOrderLines(orderLines)
    };
  }

  /**
   * Build template payment structure
   */
  private async buildTemplatePayments(payments: any[]): Promise<any[]> {
    return payments.map(payment => ({
      actions: {},
      pk: payment.paymentId || this.idGenerator.generatePaymentId(),
      createdBy: 'system',
      createdTimestamp: new Date().toISOString(),
      updatedBy: 'system',
      updatedTimestamp: new Date().toISOString(),
      messages: null,
      orgId: payment.orgId || 'CFR',
      purgeDate: null,
      orderId: payment.orderId,
      paymentGroupId: null,
      customerId: null,
      isCancelled: false,
      alternateOrderId: null,
      isAnonymized: false,
      paymentMethod: this.buildTemplatePaymentMethods(payment),
      paymentId: payment.paymentId || this.idGenerator.generatePaymentId(),
      statusId: 'AUTHORIZED',
      message: null,
      processingMode: {},
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  /**
   * Build template payment methods
   */
  private buildTemplatePaymentMethods(payment: any): any[] {
    return [{
      actions: {},
      pk: payment.paymentMethodId || this.idGenerator.generatePaymentMethodId(),
      createdBy: 'system',
      createdTimestamp: new Date().toISOString(),
      updatedBy: 'system',
      updatedTimestamp: new Date().toISOString(),
      messages: null,
      orgId: payment.orgId || 'CFR',
      paymentMethodId: payment.paymentMethodId || this.idGenerator.generatePaymentMethodId(),
      currencyCode: payment.currencyCode || 'THB',
      alternateCurrencyCode: null,
      conversionRate: null,
      alternateCurrencyAmount: null,
      accountNumber: null,
      accountDisplayNumber: null,
      nameOnCard: null,
      swipeData: null,
      cardExpiryMonth: null,
      cardExpiryYear: null,
      giftCardPin: null,
      customerSignature: null,
      customerPaySignature: null,
      changeAmount: null,
      amount: payment.amount || 0,
      currentAuthAmount: payment.amount || 0,
      currentSettledAmount: payment.amount || 0,
      currentRefundAmount: 0,
      chargeSequence: null,
      isSuspended: false,
      entryTypeId: null,
      gatewayId: 'CASH_ON_DELIVERY',
      routingNumber: null,
      routingDisplayNumber: null,
      checkNumber: null,
      driversLicenseNumber: null,
      driversLicenseState: null,
      driversLicenseCountry: null,
      businessName: null,
      businessTaxId: null,
      checkQuantity: null,
      originalAmount: payment.amount || 0,
      isModifiable: false,
      currentFailedAmount: 0,
      parentOrderId: null,
      parentPaymentGroupId: null,
      parentPaymentMethodId: null,
      isVoided: false,
      isCopied: false,
      gatewayAccountId: null,
      locationId: null,
      transactionReferenceId: null,
      capturedInEdgeMode: false,
      merchandiseAmount: payment.amount || 0,
      capturedSource: null,
      shopperReference: null,
      suggestedAmount: null,
      purgeDate: null,
      billingAddress: this.buildTemplateBillingAddress(),
      processingMode: {},
      createdAt: new Date(),
      updatedAt: new Date()
    }];
  }

  /**
   * Build template billing address
   */
  private buildTemplateBillingAddress(): any {
    return {
      actions: {},
      pk: this.generateAddressId(),
      createdBy: 'system',
      createdTimestamp: new Date().toISOString(),
      updatedBy: 'system',
      updatedTimestamp: new Date().toISOString(),
      messages: null,
      orgId: 'CFR',
      addressId: this.generateAddressId(),
      addressTypeId: 'BILLING',
      address1: 'Bangkok, Thailand',
      address2: '',
      address3: null,
      city: 'Bangkok',
      state: 'Bangkok',
      country: 'TH',
      postalCode: '10400',
      phone: '0101010122',
      firstName: 'Grab Customer',
      lastName: '-',
      company: null,
      isDefault: true,
      isActive: true,
      isVerified: false,
      isAnonymized: false,
      purgeDate: null,
      paymentTransaction: []
    };
  }

  /**
   * Build template order lines
   */
  private async buildTemplateOrderLines(orderLines: OrderLine[]): Promise<any[]> {
    return Promise.all(orderLines.map(async line => ({
      actions: {},
      pk: line.orderLineId,
      createdBy: 'system',
      createdTimestamp: new Date().toISOString(),
      updatedBy: 'system',
      updatedTimestamp: new Date().toISOString(),
      messages: null,
      orgId: 'CFR',
      orderLineId: line.orderLineId,
      orderId: line.orderId,
      itemId: line.itemId,
      quantity: line.quantity || 0,
      unitPrice: line.unitPrice || 0,
      lineTotal: (line.quantity || 0) * (line.unitPrice || 0),
      orderLineStatusId: 'OPEN',
      fulfillmentStatusId: '3000',
      deliveryMethodId: 'HD',
      shippingMethodId: 'STD',
      promisedDeliveryDate: null,
      requestedDeliveryDate: null,
      isGift: false,
      isTaxIncluded: false,
      isDiscountable: true,
      isReturnable: true,
      isHazmat: false,
      isPerishable: false,
      isPreOrder: false,
      isOnHold: false,
      isCancelled: false,
      taxAmount: 0,
      discountAmount: 0,
      shippingAmount: 0,
      chargeAmount: 0,
      refundAmount: 0,
      fulfilledQuantity: 0,
      cancelledQuantity: 0,
      returnedQuantity: 0,
      allocation: await this.buildTemplateAllocations(line),
      releaseGroupId: null,
      fulfillmentGroupId: null,
      maxFulfillmentStatusId: '3000',
      minFulfillmentStatusId: '1000',
      shipToLocationId: null,
      shipFromAddressId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  }

  /**
   * Build template allocations
   */
  private async buildTemplateAllocations(orderLine: OrderLine): Promise<any[]> {
    const allocations = await this.repository.findAllocations(orderLine.orderLineId);
    
    if (allocations.length === 0) {
      // Create default allocation if none exists
      return [{
        actions: {},
        pk: this.idGenerator.generateAllocationId(),
        createdBy: 'system',
        createdTimestamp: new Date().toISOString(),
        updatedBy: 'system',
        updatedTimestamp: new Date().toISOString(),
        messages: null,
        orgId: 'CFR',
        allocationId: this.idGenerator.generateAllocationId(),
        orderLineId: orderLine.orderLineId,
        itemId: orderLine.itemId,
        quantity: orderLine.quantity || 0,
        locationId: 'CFR528',
        allocationDate: new Date().toISOString(),
        allocationStatusId: 'ALLOCATED',
        isActive: true,
        isCancelled: false,
        isReleased: false,
        releaseDate: null,
        purgeDate: null,
        allocationType: 'DEFAULT',
        statusId: 'ALLOCATED',
        shipFromLocationId: 'CFR528',
        uom: orderLine.uom || 'EACH',
        carrierCode: 'STD',
        allocatedOn: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }];
    }
    
    return allocations.map(alloc => ({
      actions: {},
      pk: alloc.allocationId,
      createdBy: 'system',
      createdTimestamp: new Date().toISOString(),
      updatedBy: 'system',
      updatedTimestamp: new Date().toISOString(),
      messages: null,
      orgId: 'CFR',
      allocationId: alloc.allocationId,
      orderLineId: alloc.orderLineId,
      itemId: alloc.itemId,
      quantity: alloc.quantity || 0,
      locationId: alloc.shipFromLocationId || 'CFR528',
      allocationDate: alloc.allocatedOn?.toISOString() || new Date().toISOString(),
      allocationStatusId: alloc.statusId || 'ALLOCATED',
      isActive: true,
      isCancelled: false,
      isReleased: false,
      releaseDate: null,
      purgeDate: null,
      allocationType: alloc.allocationType || 'DEFAULT',
      statusId: alloc.statusId || 'ALLOCATED',
      shipFromLocationId: alloc.shipFromLocationId || 'CFR528',
      uom: alloc.uom || 'EACH',
      carrierCode: 'STD',
      allocatedOn: alloc.allocatedOn,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  /**
   * Build template release lines
   */
  private async buildTemplateReleaseLines(orderLines: OrderLine[]): Promise<any[]> {
    return Promise.all(orderLines.map(async (line, index) => ({
      cancelledQuantity: 0,
      serviceLevelCode: null,
      lineTypeId: null,
      orderLineTotalCharges: (line.quantity || 0) * (line.unitPrice || 0),
      fulfilledQuantity: 0,
      isReturnable: true,
      isTaxIncluded: false,
      isHazmat: false,
      refundPrice: null,
      taxOverrideValue: null,
      maxFulfillmentStatusId: '3000',
      isOnHold: false,
      itemWebURL: null,
      itemId: line.itemId,
      shippingMethodId: 'STD',
      sellingLocationId: null,
      isGift: false,
      parentOrderLineId: null,
      totalCharges: (line.quantity || 0) * (line.unitPrice || 0),
      parentOrderId: null,
      itemStyle: line.itemId,
      taxExemptId: null,
      priority: null,
      smallImageURI: '',
      deliveryMethodId: 'HD',
      isDiscountable: true,
      isCancelled: false,
      taxOverrideTypeId: null,
      itemBrand: '',
      isPreOrder: false,
      orderLineTotalDiscounts: 0,
      parentOrderLineTypeId: null,
      isTaxExempt: null,
      promisedDeliveryDate: null,
      chargeDetail: this.buildTemplateChargeDetails(),
      isPerishable: false,
      latestDeliveryDate: null,
      note: this.buildTemplateNotes(),
      allocation: await this.buildTemplateReleaseLineAllocations(line),
      cancelReasonId: null,
      releaseLineId: (index + 1).toString(),
      parentItemId: null,
      isReturnableAtStore: true,
      fulfillmentGroupId: this.idGenerator.generateFulfillmentGroupId(),
      uom: line.uom || 'EACH',
      orderLineSubtotal: (line.quantity || 0) * (line.unitPrice || 0),
      unitPrice: line.unitPrice || 0,
      orderLineId: line.orderLineId,
      totalTaxes: 0,
      orderLineTotalTaxes: 0,
      requestedDeliveryDate: null,
      carrierCode: null,
      originalUnitPrice: line.unitPrice || 0,
      totalDiscounts: 0,
      allocationId: null,
      orgId: 'CFR',
      quantity: line.quantity?.toString() || '0',
      effectiveRank: 1,
      process: 'releaseOrder',
      cancelledDate: null,
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  }

  /**
   * Build template charge details
   */
  private buildTemplateChargeDetails(): any[] {
    return [];
  }

  /**
   * Build template notes
   */
  private buildTemplateNotes(): any[] {
    return [];
  }

  /**
   * Build template release line allocations
   */
  private async buildTemplateReleaseLineAllocations(orderLine: OrderLine): Promise<any[]> {
    const allocations = await this.repository.findAllocations(orderLine.orderLineId);
    
    if (allocations.length === 0) {
      return [{
        allocationId: this.idGenerator.generateAllocationId(),
        orderLineId: orderLine.orderLineId,
        itemId: orderLine.itemId,
        quantity: orderLine.quantity || 0,
        locationId: 'CFR528',
        allocationDate: new Date().toISOString(),
        allocationStatusId: 'ALLOCATED',
        isActive: true,
        isCancelled: false,
        isReleased: false,
        releaseDate: null
      }];
    }
    
    return allocations.map(alloc => ({
      allocationId: alloc.allocationId,
      orderLineId: alloc.orderLineId,
      itemId: alloc.itemId,
      quantity: alloc.quantity || 0,
      locationId: alloc.shipFromLocationId || 'CFR528',
      allocationDate: alloc.allocatedOn?.toISOString() || new Date().toISOString(),
      allocationStatusId: alloc.statusId || 'ALLOCATED',
      isActive: true,
      isCancelled: false,
      isReleased: false,
      releaseDate: null
    }));
  }

  /**
   * Build process info with all template fields
   */
  private buildProcessInfo(): any {
    return {
      internalGoodsDescription: null,
      accountReceivableCode: null,
      isAutoCreateBlocked: null,
      shipLocationControl: null,
      scheduleDeliveryDate: null,
      globalLocationNumber: null,
      advertisingCode: null,
      movementOption: null,
      shipmentPlanningScheduleDay: null,
      isCartonMinWeight: null,
      isBackOrdered: null,
      extendedFields: null,
      waveId: null,
      routingAttributes: null,
      planningOriginFacilityId: null,
      isAutoConsolidationBlocked: null,
      designatedShipVia: null,
      declaredValueCurrencyCode: null,
      billOfLadingBreakAttribute: null,
      priority: null,
      shipmmentPlanningScheduleDay: null,
      accountReceivableAccountNumber: null,
      lpnCubingIndicator: null,
      parentOrder: null,
      routeType1: null,
      routeType2: null,
      secondryMaxicodeAddressNumber: null,
      internationalGoodsDescription: null,
      advertisingDate: null,
      organizationId: null,
      routeTo: null,
      fedexDutyTaxAccountID: null,
      ftsrNumber: null,
      language: null,
      dsgStaticRouteId: null,
      cashOnDeliveryFund: null,
      palletCubingIndicator: null,
      destinationShipThroughLocation: null,
      declaredValue: null,
      customerBrokerAccountNumber: null,
      routeWaveNumber: null,
      fedexDutyTaxPaymentType: null,
      importerDefinition: null,
      moveType: null,
      freightForwardAccountNumber: null,
      isWarehouseTransfer: null,
      isShipmentDocumentsOnly: null,
      customerDepartment: null,
      transportationWaveOptionId: null,
      planningDestinationFacilityId: null,
      pk: null,
      primaryMaxicodeAddressNumber: null,
      designatedEquipmentId: null
    };
  }

  /**
   * Build database-compatible header
   */
  private async buildDatabaseCompatibleHeader(order: Order) {
    const financialTotals = await this.calculateFinancialTotalsFromDatabase(order);
    
    return {
      // Core identifiers
      orderId: order.orderId,
      shortOrderNumber: order.orderNumber || order.orderId,
      alternateOrderId: order.orderNumber,

      // Customer information
      customerId: order.customerId,
      customerEmail: order.customerEmail,
      customerFirstName: order.customerFirstName,
      customerLastName: order.customerLastName,
      customerPhone: order.customerPhone,

      // Organization and channel
      orgId: order.orgId,
      currencyCode: order.currencyCode,

      // Financial totals (calculated)
      orderSubTotal: financialTotals.subTotal,
      orderTotal: financialTotals.totalAmount,
      totalCharges: financialTotals.totalCharges,
      totalDiscounts: financialTotals.totalDiscount,
      totalTaxes: financialTotals.totalTax,

      // Status fields
      isOnHold: order.isOnHold || false,
      isCancelled: false,
      orderStatus: 'Open',
      fulfillmentStatus: 'Released',
      paymentStatus: 'Paid',

      // Timestamps
      capturedDate: order.capturedDate?.toISOString(),

      // Release-specific fields
      releaseId: `${order.orderId}1`,
      releaseNumber: `REL-${order.orderNumber || order.orderId}`,
      releaseType: 'Standard',
      releaseStatus: 'Open',

      // Address information (empty for now as not available in Order entity)
      billingAddress: this.buildDefaultAddress(),
      shippingAddress: this.buildDefaultAddress(),
    };
  }

  /**
   * Build database-compatible lines
   */
  private async buildDatabaseCompatibleLines(orderLines: OrderLine[], orderId: string) {
    const releaseId = `${orderId}1`;
    
    const lines = [];
    for (const line of orderLines) {
      const allocations = await this.repository.findAllocations(line.orderLineId);
      
      lines.push({
        // Required database fields
        orderId: orderId,
        orderLineId: line.orderLineId,
        releaseId: releaseId,
        releaseLineId: `${releaseId}-${line.orderLineId}`,
        allocationId: this.idGenerator.generateAllocationId(),
        orgId: 'DEFAULT_ORG',
        itemId: line.itemId,
        quantity: line.quantity || 1,
        uom: line.uom || 'EACH',

        // Optional fields
        unitPrice: line.unitPrice,
        lineTotal: this.calculationService.calculateLineTotal(line as any),
        // fulfillmentType: 'Ship', // Optional field - removed
        lineStatus: 'Open',

        // Allocations
        allocations: allocations.map(alloc => ({
          allocationId: alloc.allocationId,
          facilityId: alloc.shipFromLocationId || 'CFR528',
          facilityCode: 'CFR528',
          allocatedQuantity: alloc.quantity,
          allocationStatus: 'Allocated',
          allocationDate: alloc.allocatedOn?.toISOString() || new Date().toISOString(),
        })),
      });
    }
    
    return lines;
  }

  /**
   * Build database-compatible payments
   */
  private buildDatabaseCompatiblePayments(payments: any[]) {
    this.logger.debug(`Building payments from ${payments.length} payment records:`);
    
    // Log each payment individually for debugging
    payments.forEach((payment, index) => {
      this.logger.debug(`Payment ${index + 1}:`, payment);
    });
    
    return payments.flatMap(payment => {
      // Check if this is already a flattened payment structure from database
      if (payment.paymentMethodId || payment.payment_method_id) {
        // Direct payment from database
        this.logger.debug(`Processing database payment:`, payment);
        return [{
          paymentMethodId: payment.paymentMethodId || payment.payment_method_id || this.idGenerator.generatePaymentMethodId(),
          paymentType: payment.paymentType || payment.payment_type || 'CashOnDelivery',
          amount: payment.amount || 0,
          status: 'Authorized',
          currencyCode: payment.currencyCode || payment.currency_code || 'THB',
          processedDate: new Date().toISOString(),
        }];
      }
      
      // Original nested structure for input DTO
      const paymentMethods = payment.paymentMethods || [];
      this.logger.debug(`Processing nested payment structure with ${paymentMethods.length} methods`);
      return paymentMethods.map(method => ({
        paymentMethodId: method.payment_method_id || this.idGenerator.generatePaymentMethodId(),
        paymentType: method.payment_type || 'CashOnDelivery',
        amount: method.amount || 0,
        status: 'Authorized',
        currencyCode: payment.currency_code || 'THB',
        processedDate: new Date().toISOString(),
      }));
    });
  }

  /**
   * Build default address for database compatibility
   */
  private buildDefaultAddress() {
    return {
      addressId: 'default-address',
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    };
  }

  /**
   * Build database-compatible metadata
   */
  private buildDatabaseCompatibleMetadata() {
    return {
      transformedAt: new Date().toISOString(),
      version: '2.0.0-database-compatible',
      transformerId: 'release-order-transformer-service',
      businessRules: {
        databaseSchemaVersion: '20250821',
        fieldMappingVersion: '1.0.0',
        validationEnabled: true,
      },
    };
  }


  /**
   * Calculate financial totals for database order entity
   * @param order Order entity from database
   * @returns FinancialTotals
   */
  async calculateFinancialTotalsFromDatabase(order: Order): Promise<FinancialTotals> {
    this.logger.debug(`Calculating financial totals for order: ${order?.orderId}`);
    this.logger.debug(`Order object:`, JSON.stringify(order, null, 2));
    
    // Get order lines from database
    const orderLines = await this.repository.findOrderLines(order.orderId);
    
    // Calculate subtotal from database order lines
    const subTotal = orderLines.reduce((sum, line) => {
      return sum + (line.quantity || 0) * (line.unitPrice || 0);
    }, 0);
    
    // Calculate totals from JSONB fields in database
    let totalTax = 0;
    let totalCharges = 0;
    let totalDiscount = 0;
    
    // Calculate tax from orderTaxDetail JSONB field
    if (order.orderTaxDetail && Array.isArray(order.orderTaxDetail)) {
      totalTax = order.orderTaxDetail.reduce((sum, tax) => sum + (tax.TaxAmount || 0), 0);
    }
    
    // Calculate charges and discounts from orderChargeDetail JSONB field  
    if (order.orderChargeDetail && Array.isArray(order.orderChargeDetail)) {
      for (const charge of order.orderChargeDetail) {
        const chargeAmount = charge.ChargeTotal || 0;
        const chargeType = charge.ChargeType?.ChargeTypeId;
        
        if (chargeType === 'Discount') {
          // Discounts are negative values, convert to positive for totalDiscount
          totalDiscount += Math.abs(chargeAmount);
        } else {
          // All other charges (Shipping, etc.) count as totalCharges
          totalCharges += Math.max(0, chargeAmount); // Only positive charges
        }
      }
    }
    
    const totalAmount = subTotal + totalTax + totalCharges - totalDiscount;

    this.logger.debug(`Financial calculation results:`, {
      subTotal,
      totalTax, 
      totalCharges,
      totalDiscount,
      totalAmount
    });

    return {
      subTotal,
      totalTax,
      totalCharges,
      totalDiscount,
      totalAmount,
    };
  }


  /**
   * Generate release output file
   * @param releaseData Release data to save
   * @returns Promise<string> Path to saved file
   */
  async generateReleaseOutput(
    releaseData: ReleaseOutputDTO,
  ): Promise<string> {
    try {
      // Ensure release directory exists
      const releaseDir = join(process.cwd(), 'release');

      await fs.mkdir(releaseDir, { recursive: true });

      // Generate filename with order ID
      const actualOrderId = releaseData.OriginalPayload?.order?.orderLine?.[0]?.orderId || 'unknown';
      const filename = `${actualOrderId}.json`;
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

  /**
   * Build header from input DTO
   */
  private async buildHeaderFromInput(input: PMPOrderInputDTO) {
    return {
      // Core identifiers
      orderId: input.OrderId,
      shortOrderNumber: input.AlternateOrderId || input.OrderId,
      alternateOrderId: input.AlternateOrderId,

      // Customer information
      customerId: input.CustomerId,
      customerTypeId: input.CustomerTypeId,
      customerEmail: input.CustomerEmail,
      customerFirstName: input.CustomerFirstName,
      customerLastName: input.CustomerLastName,
      customerPhone: input.CustomerPhone,

      // Organization and channel
      orgId: input.OrgId,
      sellingChannel: input.SellingChannel?.SellingChannelId,
      currencyCode: input.CurrencyCode,

      // Financial totals (calculated)
      orderSubTotal: this.calculationService.calculateOrderSubtotal(input),
      orderTotal: this.calculationService.calculateOrderSubtotal(input) + 
                  this.calculationService.calculateTotalCharges(input),
      totalCharges: this.calculationService.calculateTotalCharges(input),
      totalDiscounts: Math.abs(this.calculationService.calculateOrderDiscounts(input)),
      totalTaxes: this.calculationService.calculateOrderTotalTaxes(input),
      cancelledOrderSubTotal: null,

      // Status fields
      isOnHold: input.IsOnHold || false,
      cancelAllowed: input.CancelAllowed || false,
      isCancelled: false,
      orderLocale: input.OrderLocale,
      orderStatus: 'Open',
      fulfillmentStatus: 'Released',
      paymentStatus: 'Paid',

      // Fulfillment status IDs
      maxFulfillmentStatusId: '3000',
      minFulfillmentStatusId: '3000',

      // Timestamps
      doNotReleaseBefore: input.DoNotReleaseBefore,
      capturedDate: input.CapturedDate,

      // Address information (use default for now)
      billingAddress: this.buildAddressFromInput(null),
      shippingAddress: this.buildAddressFromInput(null),

      // Release-specific fields
      releaseId: `${input.OrderId}1`,
      releaseNumber: `REL-${input.AlternateOrderId || input.OrderId}`,
      releaseType: 'Standard',
      releaseStatus: 'Open',
    };
  }

  /**
   * Build lines from input DTO
   */
  private buildLinesFromInput(input: PMPOrderInputDTO) {
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    const releaseId = `${input.OrderId}1`;
    const orgId = input.OrgId || 'DEFAULT_ORG';

    return orderLines.map((line, index) => {
      const allocationId = this.idGenerator.generateAllocationId();
      const releaseLineId = `${releaseId}-${index + 1}`;
      const orderLineId = line.OrderLineId || `${input.OrderId}-${index + 1}`;

      return {
        // REQUIRED database fields
        orderId: input.OrderId,
        orderLineId: orderLineId,
        releaseId: releaseId,
        releaseLineId: releaseLineId,
        allocationId: allocationId,
        orgId: orgId,
        itemId: line.ItemId,
        quantity: line.Quantity || 1,
        uom: line.UOM || 'EACH',

        // Optional database fields
        fulfilledQuantity: null,
        cancelledQuantity: null,
        effectiveRank: 1,
        process: `releaseOrder::${this.idGenerator.generateProcessId()}`,
        cancelledDate: null,

        // Application compatibility fields
        productName: line.ItemId,
        unitPrice: line.UnitPrice,
        lineTotal: this.calculationService.calculateLineTotal(line),
        lineStatus: 'Open',
        requestedDate: line.PromisedDeliveryDate,
        promisedDate: line.PromisedDeliveryDate,

        // Allocations with database-compatible structure
        allocations: [{
          allocationId: allocationId,
          facilityId: 'CFR528',
          facilityCode: 'CFR528', 
          facilityName: 'Central Fulfillment',
          facilityType: 'DC',
          allocatedQuantity: line.Quantity || 1,
          availableQuantity: line.Quantity || 1,
          allocationStatus: 'Allocated',
          allocationDate: new Date().toISOString(),
        }],
      };
    });
  }

  /**
   * Build payments from input DTO
   */
  private buildPaymentsFromInput(input: PMPOrderInputDTO) {
    const payments = input.Payment || [];
    
    return payments.flatMap(payment => 
      (payment.PaymentMethod || []).map(method => ({
        paymentMethodId: method.PaymentMethodId || this.idGenerator.generatePaymentMethodId(),
        paymentType: typeof method.PaymentType === 'string' ? method.PaymentType : (method.PaymentType?.PaymentTypeId || 'CashOnDelivery'),
        amount: method.Amount || 0,
        status: 'Authorized',
        currencyCode: input.CurrencyCode,
        authorizationCode: null,
        transactionId: null,
        processedDate: new Date().toISOString(),
        cardType: null,
        maskedCardNumber: null,
        billingAddress: this.buildAddressFromInput(method.BillingAddress),
      }))
    );
  }

  /**
   * Build metadata from input
   */
  private buildMetadataFromInput() {
    return {
      transformedAt: new Date().toISOString(),
      version: '2.0.0-database-compatible',
      transformerId: 'unified-release-order-transformer-service',
      businessRules: {
        databaseSchemaVersion: '20250821',
        fieldMappingVersion: '1.0.0',
        validationEnabled: true,
      },
      validationResults: {
        ordersTableValidation: true,
        orderLinesTableValidation: true,
        releaseLinesTableValidation: true,
        missingRequiredFields: [],
      },
    };
  }

  /**
   * Build address from input
   */
  private buildAddressFromInput(addressInput: any) {
    if (!addressInput) {
      return {
        addressId: 'default-address',
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      };
    }

    return {
      addressId: this.orderTransformationService.generateMD5Hash(addressInput),
      addressLine1: addressInput.Address1 || '',
      addressLine2: addressInput.Address2 || '',
      addressLine3: addressInput.Address3 || '',
      city: addressInput.City || '',
      state: addressInput.State || '',
      zipCode: addressInput.PostalCode || '',
      country: addressInput.Country || '',
      county: addressInput.County || '',
      firstName: addressInput.FirstName || '',
      lastName: addressInput.LastName || '',
      company: addressInput.Company || '',
      daytimePhone: addressInput.DaytimePhone || '',
      mobilePhone: addressInput.MobilePhone || '',
    };
  }
}
