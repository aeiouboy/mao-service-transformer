import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ReleaseTemplate, PaymentTemplate, PaymentMethodTemplate, BillingAddressTemplate, PaymentTransactionTemplate, OrderLineTemplate, AllocationTemplate, ReleaseLineTemplate, ChargeDetailTemplate, NoteTemplate, ReleaseLineAllocationTemplate, ProcessInfoTemplate } from './release-template.interface';

/**
 * Release Template Service
 * Handles complex nested release structure template generation and population
 */
@Injectable()
export class ReleaseTemplateService {
  private readonly logger = new Logger(ReleaseTemplateService.name);
  private templateCache: ReleaseTemplate | null = null;

  /**
   * Load template from file
   */
  async loadTemplate(): Promise<ReleaseTemplate> {
    if (this.templateCache) {
      return this.templateCache;
    }

    try {
      const templatePath = join(__dirname, 'release-template.json');
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      this.templateCache = JSON.parse(templateContent) as ReleaseTemplate;
      return this.templateCache;
    } catch (error) {
      this.logger.error('Failed to load template:', error);
      throw new Error(`Template loading failed: ${error.message}`);
    }
  }

  /**
   * Populate template with data
   */
  populateTemplate(data: Record<string, any>): ReleaseTemplate {
    const template = this.deepClone(this.templateCache);
    
    if (!template) {
      throw new Error('Template not loaded');
    }

    return this.replacePlaceholders(template, data);
  }

  /**
   * Generate release from order data
   */
  generateReleaseFromOrder(orderData: any): ReleaseTemplate {
    const template = this.deepClone(this.templateCache);
    
    if (!template) {
      throw new Error('Template not loaded');
    }

    // Field names now match, no need for complex mapping
    return this.replacePlaceholders(template, orderData);
  }

  /**
   * Deep clone object
   */
  private deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as unknown as T;
    }

    if (typeof obj === 'object') {
      const cloned = {} as T;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = this.deepClone(obj[key]);
        }
      }
      return cloned;
    }

    return obj;
  }

  /**
   * Replace placeholders in template
   */
  private replacePlaceholders(template: any, data: Record<string, any>): any {
    if (typeof template === 'string') {
      return this.replaceStringPlaceholders(template, data);
    }

    if (Array.isArray(template)) {
      return template.map(item => this.replacePlaceholders(item, data));
    }

    if (typeof template === 'object' && template !== null) {
      const result: any = {};
      for (const [key, value] of Object.entries(template)) {
        result[key] = this.replacePlaceholders(value, data);
      }
      return result;
    }

    return template;
  }

  /**
   * Replace string placeholders
   */
  private replaceStringPlaceholders(str: string, data: Record<string, any>): any {
    const placeholderRegex = /\{\{(\w+)\}\}/g;
    let result = str;
    let match;

    while ((match = placeholderRegex.exec(str)) !== null) {
      const placeholder = match[1];
      const value = data[placeholder];
      
      if (value !== undefined) {
        result = result.replace(match[0], String(value));
      }
    }

    return result;
  }

  /**
   * Map order data to template structure
   */
  private mapOrderToTemplate(template: ReleaseTemplate, orderData: any): ReleaseTemplate {
    const mapped = this.deepClone(template);

    // Map top-level fields
    mapped.serviceLevelCode = orderData.serviceLevelCode || 'STD';
    mapped.email = orderData.customerEmail || 'undefined';
    mapped.maxFulfillmentStatusId = orderData.maxFulfillmentStatusId || '3000';
    mapped.isOnHold = orderData.isOnHold || false;
    mapped.isConfirmed = orderData.isConfirmed || true;
    mapped.orderSubtotal = orderData.orderSubtotal || 0;
    mapped.currencyCode = orderData.currencyCode || 'THB';
    mapped.customerPhone = orderData.customerPhone || '';
    mapped.customerFirstName = orderData.customerFirstName || 'Grab Customer';
    mapped.releaseTotal = orderData.releaseTotal || orderData.orderSubtotal || 0;
    mapped.totalCharges = orderData.totalCharges || 0;
    mapped.addressId = orderData.addressId || '';

    // Map Order structure
    if (orderData.payments) {
      mapped.order.payment = this.mapPayments(orderData.payments);
    }

    if (orderData.orderLines) {
      mapped.order.orderLine = this.mapOrderLines(orderData.orderLines);
    }

    // Map Release Lines
    if (orderData.releaseLines) {
      mapped.releaseLine = this.mapReleaseLines(orderData.releaseLines);
    }

    // Map address fields
    mapped.postalCode = orderData.postalCode || '';
    mapped.organizationId = orderData.organizationId || 'CFM';
    mapped.alternateOrderId = orderData.alternateOrderId || orderData.orderId || '';
    mapped.customerEmail = orderData.customerEmail || 'undefined';
    mapped.phone = orderData.phone || '';
    mapped.orderTypeId = orderData.orderTypeId || 'MKP-HD-STD';
    mapped.paymentStatusId = orderData.paymentStatusId || '5000.000';
    mapped.sellingChannelId = orderData.sellingChannelId || 'Grab';
    mapped.minFulfillmentStatusId = orderData.minFulfillmentStatusId || '3000';
    mapped.createOrderTimeStamp = orderData.createOrderTimeStamp || new Date().toISOString();
    mapped.effectiveRank = orderData.effectiveRank || 'Not Applicable';
    mapped.deliveryMethod = orderData.deliveryMethod || 'ShipToAddress';
    mapped.noOfDeliveryLines = orderData.noOfDeliveryLines || 0;
    mapped.firstName = orderData.firstName || 'Grab Customer';

    // Map address details
    mapped.address2 = orderData.address2 || '';
    mapped.shipViaId = orderData.shipViaId || 'InStore_STD';
    mapped.address3 = orderData.address3 || null;
    mapped.address1 = orderData.address1 || '';

    // Map additional fields
    mapped.orderLocale = orderData.orderLocale || 'th';
    mapped.orderTotalCharges = orderData.orderTotalCharges || 0;
    mapped.totalTaxes = orderData.totalTaxes || 0;
    mapped.customerLastName = orderData.customerLastName || '-';
    mapped.capturedDate = orderData.capturedDate || new Date().toISOString();
    mapped.carrierCode = orderData.carrierCode || 'InStore';
    mapped.addressType = orderData.addressType || 'CustomerShipToAddress';
    mapped.orderTotal = orderData.orderTotal || orderData.orderSubtotal || 0;
    mapped.totalDiscounts = orderData.totalDiscounts || 0;

    return mapped;
  }

  /**
   * Map payments to template structure
   */
  private mapPayments(payments: any[]): PaymentTemplate[] {
    return payments.map(payment => ({
      actions: {},
      pk: payment.pk || '',
      createdBy: payment.createdBy || 'pubsubuser@pmp',
      createdTimestamp: payment.createdTimestamp || new Date().toISOString(),
      updatedBy: payment.updatedBy || 'pubsubuser@pmp',
      updatedTimestamp: payment.updatedTimestamp || new Date().toISOString(),
      messages: payment.messages || null,
      orgId: payment.orgId || 'CFM-UAT',
      purgeDate: payment.purgeDate || null,
      orderId: payment.orderId || '',
      paymentGroupId: payment.paymentGroupId || null,
      customerId: payment.customerId || null,
      isCancelled: payment.isCancelled || false,
      alternateOrderId: payment.alternateOrderId || null,
      isAnonymized: payment.isAnonymized || false,
      paymentMethod: this.mapPaymentMethods(payment.paymentMethods || []),
      paymentId: payment.paymentId || payment.pk || ''
    }));
  }

  /**
   * Map payment methods to template structure
   */
  private mapPaymentMethods(paymentMethods: any[]): PaymentMethodTemplate[] {
    return paymentMethods.map(pm => ({
      Actions: {},
      PK: pm.pk || '',
      CreatedBy: pm.createdBy || 'pubsubuser@pmp',
      CreatedTimestamp: pm.createdTimestamp || new Date().toISOString(),
      UpdatedBy: pm.updatedBy || 'pubsubuser@pmp',
      UpdatedTimestamp: pm.updatedTimestamp || new Date().toISOString(),
      Messages: pm.messages || null,
      OrgId: pm.orgId || 'CFM-UAT',
      PaymentMethodId: pm.paymentMethodId || '',
      CurrencyCode: pm.currencyCode || 'THB',
      AlternateCurrencyCode: pm.alternateCurrencyCode || null,
      ConversionRate: pm.conversionRate || null,
      AlternateCurrencyAmount: pm.alternateCurrencyAmount || null,
      AccountNumber: pm.accountNumber || null,
      AccountDisplayNumber: pm.accountDisplayNumber || null,
      NameOnCard: pm.nameOnCard || null,
      SwipeData: pm.swipeData || null,
      CardExpiryMonth: pm.cardExpiryMonth || null,
      CardExpiryYear: pm.cardExpiryYear || null,
      GiftCardPin: pm.giftCardPin || null,
      CustomerSignature: pm.customerSignature || null,
      CustomerPaySignature: pm.customerPaySignature || null,
      ChangeAmount: pm.changeAmount || null,
      Amount: pm.amount || 0,
      CurrentAuthAmount: pm.currentAuthAmount || 0,
      CurrentSettledAmount: pm.currentSettledAmount || 0,
      CurrentRefundAmount: pm.currentRefundAmount || 0,
      ChargeSequence: pm.chargeSequence || null,
      IsSuspended: pm.isSuspended || false,
      EntryTypeId: pm.entryTypeId || null,
      GatewayId: pm.gatewayId || 'Simulator',
      RoutingNumber: pm.routingNumber || null,
      RoutingDisplayNumber: pm.routingDisplayNumber || null,
      CheckNumber: pm.checkNumber || null,
      DriversLicenseNumber: pm.driversLicenseNumber || null,
      DriversLicenseState: pm.driversLicenseState || null,
      DriversLicenseCountry: pm.driversLicenseCountry || null,
      BusinessName: pm.businessName || null,
      BusinessTaxId: pm.businessTaxId || null,
      CheckQuantity: pm.checkQuantity || null,
      OriginalAmount: pm.originalAmount || null,
      IsModifiable: pm.isModifiable || false,
      CurrentFailedAmount: pm.currentFailedAmount || 0,
      ParentOrderId: pm.parentOrderId || null,
      ParentPaymentGroupId: pm.parentPaymentGroupId || null,
      ParentPaymentMethodId: pm.parentPaymentMethodId || null,
      IsVoided: pm.isVoided || false,
      IsCopied: pm.isCopied || false,
      GatewayAccountId: pm.gatewayAccountId || null,
      LocationId: pm.locationId || null,
      TransactionReferenceId: pm.transactionReferenceId || null,
      CapturedInEdgeMode: pm.capturedInEdgeMode || false,
      MerchandiseAmount: pm.merchandiseAmount || 0,
      CapturedSource: pm.capturedSource || null,
      ShopperReference: pm.shopperReference || null,
      SuggestedAmount: pm.suggestedAmount || null,
      PurgeDate: pm.purgeDate || null,
      BillingAddress: this.mapBillingAddress(pm.billingAddress || {})
    }));
  }

  /**
   * Map billing address to template structure
   */
  private mapBillingAddress(billingAddress: any): BillingAddressTemplate {
    return {
      Actions: {},
      PK: billingAddress.pk || '',
      CreatedBy: billingAddress.createdBy || 'pubsubuser@pmp',
      CreatedTimestamp: billingAddress.createdTimestamp || new Date().toISOString(),
      UpdatedBy: billingAddress.updatedBy || 'pubsubuser@pmp',
      UpdatedTimestamp: billingAddress.updatedTimestamp || new Date().toISOString(),
      Messages: billingAddress.messages || null,
      OrgId: billingAddress.orgId || 'CFM-UAT',
      AddressId: billingAddress.addressId || '',
      AddressTypeId: billingAddress.addressTypeId || '',
      Address1: billingAddress.address1 || '',
      Address2: billingAddress.address2 || '',
      Address3: billingAddress.address3 || null,
      City: billingAddress.city || '',
      State: billingAddress.state || '',
      Country: billingAddress.country || '',
      PostalCode: billingAddress.postalCode || '',
      Phone: billingAddress.phone || '',
      FirstName: billingAddress.firstName || '',
      LastName: billingAddress.lastName || '',
      Company: billingAddress.company || null,
      IsDefault: billingAddress.isDefault || false,
      IsActive: billingAddress.isActive || true,
      IsVerified: billingAddress.isVerified || false,
      IsAnonymized: billingAddress.isAnonymized || false,
      PurgeDate: billingAddress.purgeDate || null,
      PaymentTransaction: this.mapPaymentTransactions(billingAddress.paymentTransactions || [])
    };
  }

  /**
   * Map payment transactions to template structure
   */
  private mapPaymentTransactions(transactions: any[]): PaymentTransactionTemplate[] {
    return transactions.map(tx => ({
      Actions: {},
      PK: tx.pk || '',
      CreatedBy: tx.createdBy || 'pubsubuser@pmp',
      CreatedTimestamp: tx.createdTimestamp || new Date().toISOString(),
      UpdatedBy: tx.updatedBy || 'pubsubuser@pmp',
      UpdatedTimestamp: tx.updatedTimestamp || new Date().toISOString(),
      Messages: tx.messages || null,
      OrgId: tx.orgId || 'CFM-UAT',
      TransactionId: tx.transactionId || '',
      TransactionTypeId: tx.transactionTypeId || '',
      TransactionStatusId: tx.transactionStatusId || '',
      Amount: tx.amount || 0,
      CurrencyCode: tx.currencyCode || 'THB',
      GatewayId: tx.gatewayId || 'Simulator',
      GatewayTransactionId: tx.gatewayTransactionId || '',
      GatewayResponseCode: tx.gatewayResponseCode || '',
      GatewayResponseMessage: tx.gatewayResponseMessage || '',
      GatewayResponseDate: tx.gatewayResponseDate || new Date().toISOString(),
      IsApproved: tx.isApproved || false,
      IsDeclined: tx.isDeclined || false,
      IsError: tx.isError || false,
      IsVoided: tx.isVoided || false,
      IsRefunded: tx.isRefunded || false,
      IsSettled: tx.isSettled || false,
      SettlementDate: tx.settlementDate || null,
      AuthorizationCode: tx.authorizationCode || '',
      ReferenceNumber: tx.referenceNumber || '',
      BatchNumber: tx.batchNumber || '',
      SequenceNumber: tx.sequenceNumber || '',
      EntryMethod: tx.entryMethod || '',
      CardType: tx.cardType || '',
      CardNumber: tx.cardNumber || '',
      CardExpiryMonth: tx.cardExpiryMonth || null,
      CardExpiryYear: tx.cardExpiryYear || null,
      CardHolderName: tx.cardHolderName || '',
      AVSResult: tx.avsResult || '',
      CVVResult: tx.cvvResult || '',
      IsDuplicate: tx.isDuplicate || false,
      DuplicateWindow: tx.duplicateWindow || 0,
      IsTest: tx.isTest || false,
      PurgeDate: tx.purgeDate || null
    }));
  }

  /**
   * Map order lines to template structure
   */
  private mapOrderLines(orderLines: any[]): OrderLineTemplate[] {
    return orderLines.map(line => ({
      Actions: {},
      PK: line.pk || '',
      CreatedBy: line.createdBy || 'pubsubuser@pmp',
      CreatedTimestamp: line.createdTimestamp || new Date().toISOString(),
      UpdatedBy: line.updatedBy || 'pubsubuser@pmp',
      UpdatedTimestamp: line.updatedTimestamp || new Date().toISOString(),
      Messages: line.messages || null,
      OrgId: line.orgId || 'CFM-UAT',
      OrderLineId: line.orderLineId || '',
      OrderId: line.orderId || '',
      ItemId: line.itemId || '',
      Quantity: line.quantity || 0,
      UnitPrice: line.unitPrice || 0,
      LineTotal: line.lineTotal || 0,
      OrderLineStatusId: line.orderLineStatusId || '',
      FulfillmentStatusId: line.fulfillmentStatusId || '',
      DeliveryMethodId: line.deliveryMethodId || '',
      ShippingMethodId: line.shippingMethodId || '',
      PromisedDeliveryDate: line.promisedDeliveryDate || null,
      RequestedDeliveryDate: line.requestedDeliveryDate || null,
      IsGift: line.isGift || false,
      IsTaxIncluded: line.isTaxIncluded || false,
      IsDiscountable: line.isDiscountable || false,
      IsReturnable: line.isReturnable || false,
      IsHazmat: line.isHazmat || false,
      IsPerishable: line.isPerishable || false,
      IsPreOrder: line.isPreOrder || false,
      IsOnHold: line.isOnHold || false,
      IsCancelled: line.isCancelled || false,
      TaxAmount: line.taxAmount || 0,
      DiscountAmount: line.discountAmount || 0,
      ShippingAmount: line.shippingAmount || 0,
      ChargeAmount: line.chargeAmount || 0,
      RefundAmount: line.refundAmount || 0,
      FulfilledQuantity: line.fulfilledQuantity || 0,
      CancelledQuantity: line.cancelledQuantity || 0,
      ReturnedQuantity: line.returnedQuantity || 0,
      Allocation: this.mapAllocations(line.allocations || [])
    }));
  }

  /**
   * Map allocations to template structure
   */
  private mapAllocations(allocations: any[]): AllocationTemplate[] {
    return allocations.map(allocation => ({
      Actions: {},
      PK: allocation.pk || '',
      CreatedBy: allocation.createdBy || 'pubsubuser@pmp',
      CreatedTimestamp: allocation.createdTimestamp || new Date().toISOString(),
      UpdatedBy: allocation.updatedBy || 'pubsubuser@pmp',
      UpdatedTimestamp: allocation.updatedTimestamp || new Date().toISOString(),
      Messages: allocation.messages || null,
      OrgId: allocation.orgId || 'CFM-UAT',
      AllocationId: allocation.allocationId || '',
      OrderLineId: allocation.orderLineId || '',
      ItemId: allocation.itemId || '',
      Quantity: allocation.quantity || 0,
      LocationId: allocation.locationId || '',
      AllocationDate: allocation.allocationDate || new Date().toISOString(),
      AllocationStatusId: allocation.allocationStatusId || '',
      IsActive: allocation.isActive || true,
      IsCancelled: allocation.isCancelled || false,
      IsReleased: allocation.isReleased || false,
      ReleaseDate: allocation.releaseDate || null,
      PurgeDate: allocation.purgeDate || null
    }));
  }

  /**
   * Map release lines to template structure
   */
  private mapReleaseLines(releaseLines: any[]): ReleaseLineTemplate[] {
    return releaseLines.map(line => ({
      CancelledQuantity: line.cancelledQuantity || 0,
      ServiceLevelCode: line.serviceLevelCode || null,
      LineTypeId: line.lineTypeId || null,
      OrderLineTotalCharges: line.orderLineTotalCharges || 0,
      FulfilledQuantity: line.fulfilledQuantity || 0,
      IsReturnable: line.isReturnable || false,
      IsTaxIncluded: line.isTaxIncluded || false,
      IsHazmat: line.isHazmat || false,
      RefundPrice: line.refundPrice || null,
      TaxOverrideValue: line.taxOverrideValue || null,
      MaxFulfillmentStatusId: line.maxFulfillmentStatusId || '3000',
      IsOnHold: line.isOnHold || false,
      ItemWebURL: line.itemWebURL || null,
      ItemId: line.itemId || '',
      ShippingMethodId: line.shippingMethodId || '',
      SellingLocationId: line.sellingLocationId || null,
      IsGift: line.isGift || false,
      ParentOrderLineId: line.parentOrderLineId || null,
      TotalCharges: line.totalCharges || 0,
      ParentOrderId: line.parentOrderId || null,
      ItemStyle: line.itemStyle || '',
      TaxExemptId: line.taxExemptId || null,
      Priority: line.priority || null,
      SmallImageURI: line.smallImageURI || '',
      DeliveryMethodId: line.deliveryMethodId || '',
      IsDiscountable: line.isDiscountable || false,
      IsCancelled: line.isCancelled || false,
      TaxOverrideTypeId: line.taxOverrideTypeId || null,
      ItemBrand: line.itemBrand || '',
      IsPreOrder: line.isPreOrder || false,
      OrderLineTotalDiscounts: line.orderLineTotalDiscounts || 0,
      ParentOrderLineTypeId: line.parentOrderLineTypeId || null,
      IsTaxExempt: line.isTaxExempt || null,
      PromisedDeliveryDate: line.promisedDeliveryDate || null,
      ChargeDetail: this.mapChargeDetails(line.chargeDetail || []),
      IsPerishable: line.isPerishable || false,
      LatestDeliveryDate: line.latestDeliveryDate || null,
      Note: this.mapNotes(line.notes || []),
      Allocation: this.mapReleaseLineAllocations(line.allocations || []),
      CancelReasonId: line.cancelReasonId || null,
      ReleaseLineId: line.releaseLineId || '',
      ParentItemId: line.parentItemId || null,
      IsReturnableAtStore: line.isReturnableAtStore || false,
      FulfillmentGroupId: line.fulfillmentGroupId || '',
      UOM: line.uom || '',
      OrderLineSubtotal: line.orderLineSubtotal || 0,
      UnitPrice: line.unitPrice || 0,
      OrderLineId: line.orderLineId || '',
      TotalTaxes: line.totalTaxes || 0,
      OrderLineTotalTaxes: line.orderLineTotalTaxes || 0,
      RequestedDeliveryDate: line.requestedDeliveryDate || null,
      CarrierCode: line.carrierCode || null,
      OriginalUnitPrice: line.originalUnitPrice || 0,
      TotalDiscounts: line.totalDiscounts || 0
    }));
  }

  /**
   * Map charge details to template structure
   */
  private mapChargeDetails(chargeDetails: any[]): ChargeDetailTemplate[] {
    return chargeDetails.map(charge => ({
      IsProrated: charge.isProrated || null,
      IsInformational: charge.isInformational || false,
      TaxCode: charge.taxCode || '',
      ChargeTotal: charge.chargeTotal || 0,
      HeaderChargeDetailId: charge.headerChargeDetailId || '',
      ChargeSubTypeId: charge.chargeSubTypeId || null,
      ChargeDisplayName: charge.chargeDisplayName || '',
      Extended: charge.extended || null,
      ChargeDetailId: charge.chargeDetailId || '',
      RelatedChargeType: charge.relatedChargeType || null,
      ChargeTypeId: charge.chargeTypeId || '',
      RelatedChargeDetailId: charge.relatedChargeDetailId || null
    }));
  }

  /**
   * Map notes to template structure
   */
  private mapNotes(notes: any[]): NoteTemplate[] {
    return notes.map(note => ({
      NoteId: note.noteId || '',
      NoteTypeId: note.noteTypeId || '',
      NoteText: note.noteText || '',
      IsActive: note.isActive || true,
      IsPublic: note.isPublic || false,
      CreatedBy: note.createdBy || 'pubsubuser@pmp',
      CreatedTimestamp: note.createdTimestamp || new Date().toISOString(),
      UpdatedBy: note.updatedBy || 'pubsubuser@pmp',
      UpdatedTimestamp: note.updatedTimestamp || new Date().toISOString()
    }));
  }

  /**
   * Map release line allocations to template structure
   */
  private mapReleaseLineAllocations(allocations: any[]): ReleaseLineAllocationTemplate[] {
    return allocations.map(allocation => ({
      AllocationId: allocation.allocationId || '',
      OrderLineId: allocation.orderLineId || '',
      ItemId: allocation.itemId || '',
      Quantity: allocation.quantity || 0,
      LocationId: allocation.locationId || '',
      AllocationDate: allocation.allocationDate || new Date().toISOString(),
      AllocationStatusId: allocation.allocationStatusId || '',
      IsActive: allocation.isActive || true,
      IsCancelled: allocation.isCancelled || false,
      IsReleased: allocation.isReleased || false,
      ReleaseDate: allocation.releaseDate || null
    }));
  }

  /**
   * Save populated template to file
   */
  async saveTemplate(template: ReleaseTemplate, filename: string): Promise<void> {
    try {
      const outputPath = join(__dirname, filename);
      await fs.writeFile(outputPath, JSON.stringify(template, null, 2));
      this.logger.log(`Template saved to: ${outputPath}`);
    } catch (error) {
      this.logger.error('Failed to save template:', error);
      throw new Error(`Template saving failed: ${error.message}`);
    }
  }
}
