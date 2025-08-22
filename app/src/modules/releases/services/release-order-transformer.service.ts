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
   * Build OriginalPayload structure with comprehensive template fields
   */
  private async buildOriginalPayload(order: Order, orderLines: OrderLine[], payments: any[]): Promise<OriginalPayloadDTO> {
    const payload = new OriginalPayloadDTO();

    // Calculate financial totals first
    const financialTotals = await this.calculateFinancialTotalsFromDatabase(order);

    // Header-level fields from template
    payload.serviceLevelCode = 'STD';
    payload.email = order.customerEmail || 'undefined';
    payload.maxFulfillmentStatusId = '3000';
    payload.isOnHold = order.isOnHold || false;
    payload.isConfirmed = true;
    payload.orderSubtotal = financialTotals.subTotal;
    payload.modeId = null;
    payload.sellingLocationId = null;
    payload.currencyCode = order.currencyCode || 'THB';
    payload.customerPhone = order.customerPhone;
    payload.customerFirstName = order.customerFirstName;
    payload.releaseTotal = financialTotals.subTotal + financialTotals.totalCharges + financialTotals.totalTax;
    payload.extendedFields = {
      cancelAllowed: order.cancelAllowed || true
    };
    payload.totalCharges = financialTotals.totalCharges;
    payload.externalShipFromLocationId = null;
    payload.taxExemptId = null;
    payload.addressId = this.generateAddressId();

    // Address fields
    payload.postalCode = '10400';
    payload.organizationId = order.orgId || 'CFR';
    payload.invoiceId = null;
    payload.county = 'Bangkok';
    payload.isPostVoided = null;
    payload.alternateOrderId = order.orderNumber || order.orderId;
    payload.customerEmail = order.customerEmail || 'undefined';
    payload.phone = order.customerPhone;
    payload.orderTypeId = 'STD';
    payload.paymentStatusId = 'PAID';
    payload.customerCommPref = null;
    payload.sellingChannelId = order.sellingChannel || 'Grab';
    payload.minFulfillmentStatusId = '1000';
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
    payload.orderLocale = 'th_TH';
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
    releasePayment.OrgId = payment.orgId || 'CFR';
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
    
    // Use stored totals from database if available, otherwise calculate
    const totalTax = order.totalTaxes || 0;
    const totalCharges = order.totalCharges || 0;
    const totalDiscount = Math.abs(order.totalDiscounts || 0);
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

      // Generate filename with order ID if available
      const orderId = releaseData.OriginalPayload?.customerFirstName || 'unknown';
      const filename = `release-${orderId}-${Date.now()}.json`;
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
