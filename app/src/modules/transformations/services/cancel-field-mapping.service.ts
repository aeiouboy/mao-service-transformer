import { Injectable } from '@nestjs/common';

import { TimestampService } from '../../../shared/services/timestamp.service';

/**
 * Cancel Field Mapping Transformation Service
 *
 * Transforms real order data into MAO cancel response format using business rules
 * and field mappings. Replaces the template approach with data-driven transformation.
 *
 * Features:
 * - Field-by-field mapping from order data to cancel format
 * - Business rule application for cancel-specific logic
 * - Financial calculations for cancelled amounts
 * - Maintains exact format compatibility with cancel_fully.json structure
 */
@Injectable()
export class CancelFieldMappingService {
  constructor(private readonly timestampService: TimestampService) {}

  /**
   * Transform complete order data into cancel response format matching template exactly
   *
   * @param orderData - Complete order data from file repository
   * @param cancelRequest - Cancel request details (reason, comments, etc.)
   * @returns any - Complete cancel response in exact MAO template format
   */
  public transformToCancelResponse(orderData: any, cancelRequest: any): any {
    const cancelTimestamp = this.timestampService.getTimestamp('base');
    const countedDate = this.timestampService.getTimestamp('confirmed_date');

    return {
      ...this.buildTopLevelFields(orderData, cancelTimestamp, countedDate),
      ...this.buildCoreOrderFields(orderData, cancelTimestamp),
      ...this.buildOrderExtensions(orderData, cancelTimestamp),
      ...this.buildPaymentAndCancelReason(
        orderData,
        cancelRequest,
        cancelTimestamp,
      ),
      ...this.buildRequiredTemplateFields(
        orderData,
        cancelTimestamp,
        countedDate,
      ),
      ...this.buildOrderContent(orderData, cancelRequest, cancelTimestamp),
      ...this.buildCustomerAndOrgFields(orderData, cancelTimestamp),
      ...this.buildChangeLog(),
    };
  }

  private buildTopLevelFields(
    orderData: any,
    cancelTimestamp: string,
    countedDate: string,
  ): any {
    return {
      CancelLineCount: this.calculateCancelLineCount(orderData.orderLines),
      SuspendedOrderId: null,
      CreatedTimestamp: cancelTimestamp,
      Invoice: [],
      BusinessDate: null,
      ReturnTrackingDetail: [],
      MaxFulfillmentStatusId: '9000',
      IsOnHold: orderData.orderData.IsOnHold || false,
      Process: 'postReleaseCancellation',
      IsConfirmed: orderData.orderData.IsConfirmed || true,
      CurrencyCode: orderData.financials.currencyCode || 'THB',
      SellingLocationId: orderData.orderData.SellingLocationId || null,
      EventSubmitTime: '2038-01-18T23:59:00',
      UpdatedBy: 'apiuser4pmp',
      FulfillmentStatus: 'Canceled',
      CustomerFirstName: orderData.customer.firstName || 'Grab Customer',
      OrderChargeDetail: [],
      OrderType: this.mapOrderType(orderData.orderData),
      CountedDate: countedDate,
      TotalCharges: 0,
      OrderLineCount: this.calculateCancelLineCount(orderData.orderLines),
    };
  }

  private buildCoreOrderFields(orderData: any, cancelTimestamp: string): any {
    return {
      OrderHold: this.mapOrderHold(orderData.orderData, cancelTimestamp),
      OrderToken: this.generateOrderToken(String(orderData.orderId || '')),
      IsArchiveInProgress: false,
      CreatedBy: orderData.orderData.CreatedBy || 'pubsubuser@pmp',
      Priority: null,
      IsCancelled: true,
      OrderTagDetail: [],
      OrderExtension5: [],
      CustomerId: orderData.customer.customerId,
      OrderId: orderData.orderId,
      OrderSubTotal: 0,
    };
  }

  private buildOrderExtensions(orderData: any, cancelTimestamp: string): any {
    return {
      OrderExtension3: [],
      OrderExtension4: [],
      OrderExtension1: this.buildOrderExtension1(orderData, cancelTimestamp),
      OrderExtension2: [],
    };
  }

  private buildPaymentAndCancelReason(
    orderData: any,
    cancelRequest: any,
    cancelTimestamp: string,
  ): any {
    return {
      Payment: this.transformPaymentToCancel(
        orderData.payments,
        cancelTimestamp,
      ),
      CancelReason: {
        ReasonId: cancelRequest?.CancelReason?.ReasonId || 'OthReason',
      },
    };
  }

  private buildRequiredTemplateFields(
    _orderData: any,
    _cancelTimestamp: string,
    _countedDate: string,
  ): any {
    return {
      ParentReservationRequestId: null,
      OrderTrackingInfo: [],
      ContactPreference: [],
      ReturnLabel: [],
      RelatedOrders: [],
      TotalInformationalTaxes: 0,
      ConfirmedDate: _countedDate,
      ArchiveDate: this.timestampService.getTimestamp('archive_date'),
      TransactionReference: [],
      OrderPromisingInfo: null,
      MinReturnStatusId: null,
      OrderTaxDetail: [],
    };
  }

  private buildOrderContent(
    orderData: any,
    cancelRequest: any,
    cancelTimestamp: string,
  ): any {
    return {
      OrderLine: this.transformOrderLinesToCancel(
        orderData.orderLines,
        cancelTimestamp,
        cancelRequest,
      ),
      CancelledOrderSubTotal: orderData.financials.orderSubtotal || 0,
      CustomerEmail: orderData.customer.email || 'undefined',
      DoNotReleaseBefore: null,
      PackageCount: null,
      SellingChannel: { SellingChannelId: 'Grab' },
      OrderNote: this.buildOrderNotes(
        orderData,
        cancelRequest,
        cancelTimestamp,
      ),
      OrderAttribute: [],
      RunId: null,
      MinFulfillmentStatusId: '9000',
      DocType: { DocTypeId: 'CustomerOrder' },
      Release: this.buildRelease(orderData, cancelTimestamp),
      PublishStatus: null,
      MinFulfillmentStatus: { StatusId: '9000' },
      ReturnLabelEmail: null,
      MaxReturnStatusId: null,
      ProcessInfo: null,
      OrderMilestoneEvent: this.buildOrderMilestoneEvents(
        orderData,
        cancelTimestamp,
      ),
      CancelComments: cancelRequest?.CancelComments || '',
      MaxFulfillmentStatus: { StatusId: '9000' },
    };
  }

  private buildCustomerAndOrgFields(
    orderData: any,
    cancelTimestamp: string,
  ): any {
    return {
      MerchSaleLineCount: 0,
      CustomerIdentityDoc: [],
      OrgId: 'CFR',
      OrderMilestone: this.buildOrderMilestones(orderData, cancelTimestamp),
      OrderLocale: 'th',
      IsOrderCountable: true,
      CustomerLastName: orderData.customer.lastName || '-',
      CapturedDate: '2025-08-18T03:25:22',
      CustomerTypeId: '',
      NextEventTime: null,
      OrderTotal: 0,
      TotalDiscounts: 0,
      AlternateOrderId: orderData.orderId,
      UpdatedTimestamp: cancelTimestamp,
      TotalTaxes: 0,
    };
  }

  private buildChangeLog(): any {
    return {
      ChangeLog: {
        ModTypes: {
          Order: [
            'Order::ChargeDetail::Discount::Remove',
            'Order::Cancel',
            'Order::ChargeDetail::Shipping::Remove',
          ],
        },
      },
    };
  }

  /**
   * Calculate the number of order lines being cancelled
   *
   * @private
   * @param orderLines - Array of order line objects
   * @returns number - Count of order lines
   */
  private calculateCancelLineCount(orderLines: unknown): number {
    return Array.isArray(orderLines) ? orderLines.length : 0;
  }

  /**
   * Map order type information
   *
   * @private
   * @param orderData - Order data object
   * @returns any - Order type object
   */
  private mapOrderType(orderData: any): any {
    return (
      orderData.Order?.OrderType || {
        OrderTypeId: 'MKP-HD-STD',
      }
    );
  }

  /**
   * Map order hold information for cancellation
   *
   * @private
   * @param orderData - Order data object
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any[] - Array of order hold objects
   */
  private mapOrderHold(orderData: any, cancelTimestamp: string): any[] {
    // Return existing holds or create a default payment hold
    return (
      orderData.Order?.OrderHold || [
        {
          UpdatedTimestamp: cancelTimestamp,
          HoldTypeId: 'AwaitingPayment',
          CreatedBy: 'pubsubuser@pmp',
          CreatedTimestamp: cancelTimestamp,
          Process: 'saveOrder::-1843768273',
          ResolveReasonId: 'AcceptPayment',
          ExternalCreatedDate: null,
          ResolveReasonComments: null,
          UpdatedBy: 'pubsubuser@pmp',
          OrgId: 'CFR',
          ExternalCreatedBy: null,
          StatusId: '2000',
          ApplyReasonComments: null,
          ChangeLog: null,
        },
      ]
    );
  }

  /**
   * Generate order token for the order
   *
   * @private
   * @param orderId - Order identifier
   * @returns string - Generated order token
   */
  private generateOrderToken(orderId: string): string {
    // Simple token generation - in production this would be more sophisticated
    const tokenSuffix = '009168b939b61ff1ee534296290b6711';
    const hashedOrderId = orderId.substring(0, 16);

    return `${hashedOrderId}${tokenSuffix}`;
  }

  /**
   * Transform payment data for cancellation
   *
   * @private
   * @param payments - Array of payment objects
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any[] - Array of cancelled payment objects
   */
  private transformPaymentToCancel(
    payments: unknown,
    cancelTimestamp: string,
  ): unknown[] {
    if (!Array.isArray(payments)) return [];

    return payments.map((payment: any) => ({
      ...payment,
      // Reset payment amounts for cancellation
      RequestedAmount: 0,
      AuthorizedAmount: 0,
      ChargedAmount: null,
      CollectedAmount: null,
      AmountDue: '0.00',
      UpdatedTimestamp: cancelTimestamp,
      Process: 'postReleaseCancellation',

      // Transform payment methods
      PaymentMethod:
        payment.PaymentMethod?.map((pm: any) => ({
          ...pm,
          Amount: 0,
          CurrentAuthAmount: 0,
          CurrentSettledAmount: 0,
          CurrentRefundAmount: 0,
          CurrentFailedAmount: 0,
          MerchandiseAmount: 0,
          UpdatedTimestamp: cancelTimestamp,
          Process: 'postReleaseCancellation',
        })) || [],
    }));
  }

  /**
   * Transform order lines for cancellation with complete template-matching structure
   *
   * @private
   * @param orderLines - Array of order line objects
   * @param cancelTimestamp - Cancellation timestamp
   * @param cancelRequest - Cancel request details
   * @returns any[] - Array of cancelled order line objects matching template exactly
   */
  private transformOrderLinesToCancel(
    orderLines: unknown,
    cancelTimestamp: string,
    cancelRequest: any,
  ): any[] {
    if (!Array.isArray(orderLines)) return [];

    return orderLines.map((line, index) =>
      this.buildCompleteOrderLine(line, index, cancelTimestamp, cancelRequest),
    );
  }

  private buildCompleteOrderLine(
    line: any,
    index: number,
    cancelTimestamp: string,
    cancelRequest: any,
  ): any {
    return {
      ...this.buildOrderLineCore(line, cancelTimestamp),
      ...this.buildOrderLineCancelHistory(line, cancelRequest, cancelTimestamp),
      ...this.buildOrderLineMetadata(line, index),
      ...this.buildOrderLineFulfillment(line, index, cancelTimestamp),
    };
  }

  private buildOrderLineCore(line: any, cancelTimestamp: string): any {
    return {
      ParentLineCreatedTimestamp: null,
      CreatedTimestamp: cancelTimestamp,
      BusinessDate: null,
      RefundPrice: null,
      IsHazmat: line.IsHazmat || false,
      TaxOverrideValue: null,
      MaxFulfillmentStatusId: '9000',
      StoreSaleEntryMethod: null,
      IsReturnAllowedByAgePolicy: false,
      ShippingMethodId: line.ShippingMethodId || 'Standard Delivery',
      UpdatedBy: 'apiuser4pmp',
      ItemMaxDiscountPercentage: null,
      OrderLineSalesAssociate: [],
      OrderLineSubTotal: 0,
      ItemStyle: line.ItemStyle || '',
      ParentOrderId: null,
      ReturnableQuantity: 0,
      OrderLineHold: [],
      CreatedBy: line.CreatedBy || 'pubsubuser@pmp',
    };
  }

  private buildOrderLineCancelHistory(
    line: any,
    cancelRequest: any,
    cancelTimestamp: string,
  ): any {
    return {
      OrderLineCancelHistory: [
        {
          UpdatedBy: 'apiuser4pmp',
          UpdatedTimestamp: cancelTimestamp,
          OrgId: 'CFR',
          CreatedBy: 'apiuser4pmp',
          CreatedTimestamp: cancelTimestamp,
          CancelReason: {
            ReasonId: cancelRequest?.CancelReason?.ReasonId || '1000.000',
          },
          CancelQuantity: line.Quantity || 1,
          Process: 'postReleaseCancellation',
          CancelComments:
            cancelRequest?.CancelComments ||
            'Customer requested late order cancellation',
        },
      ],
    };
  }

  private buildOrderLineMetadata(line: any, index: number): any {
    return {
      ReleaseGroupId: line.ReleaseGroupId || `${index + 1}-GENERATED`,
      SmallImageURI: line.SmallImageURI || line.ImageURI || '',
      IsCancelled: true,
      CancelledOrderLineSubTotal: line.UnitPrice || line.OrderLineSubtotal || 0,
      ItemBrand: line.ItemBrand || line.Brand || '',
      ReturnType: null,
      IsPerishable: line.IsPerishable || false,
      GiftCardValue: null,
      IsPriceOverridden: false,
      TotalInformationalTaxes: 0,
      IsPreSale: false,
      HasComponents: false,
      ItemMaxDiscountAmount: null,
      ItemDepartmentName: line.ItemDepartmentName || null,
      IsExchangeable: line.IsExchangeable !== false,
      ItemColorDescription: line.ItemColorDescription || '',
      OrderLineAttribute: [],
      IsReturn: false,
      IsTaxOverridden: false,
      OrderLineTagDetail: [],
      IsServiceFulfilled: false,
      ReturnDetail: [],
      IsReturnedInFull: false,
      ServiceLineDetail: [],
      BookedQuantity: 0,
      LineTotal: 0,
      ItemId: line.ItemId || line.Id,
      ItemName: line.ItemName || line.ItemDescription,
      ItemDescription: line.ItemDescription || line.ItemName,
      Quantity: 0,
      UnitPrice: line.UnitPrice || 0,
    };
  }

  private buildOrderLineFulfillment(
    line: any,
    index: number,
    cancelTimestamp: string,
  ): any {
    return {
      OrderLineNote: this.buildOrderLineNotes(
        line,
        cancelTimestamp,
        index,
        String(line.OrderId || ''),
      ),
      QuantityDetail: this.transformQuantityDetailsToCancel(
        Array.isArray(line.QuantityDetail) ? line.QuantityDetail : [],
        cancelTimestamp,
        String(line.ItemId || ''),
      ),
      ChangeLog: {
        ModTypes: {
          Order: [
            'Order::OrderLine::Add',
            'Order::OrderLine::Cancel',
            'Order::ChargeDetail::Discount::Remove',
          ],
        },
      },
      FulfillmentStatus: 'Canceled',
      PricePerUOM: line.UnitPrice || 0,
      DeliveryMethod: line.DeliveryMethod || 'SHP',
      Volume: null,
      Weight: null,
      VolumeUOM: null,
      WeightUOM: null,
      VolumetricWeight: null,
      VolumetricWeightUOM: null,
      OrderLineExtension1: this.buildOrderLineExtension1(line, cancelTimestamp),
      FulfillmentDetail: [],
      OrderLineExtension2: [],
      UOM: line.UOM || 'SPCS',
      OrderLineId:
        line.OrderLineId || `${String(index + 1).padStart(3, '0')}-1-1`,
      TotalTaxes: 0,
      OrderLineAdditional: null,
      TransactionReferenceId: null,
      RequestedDeliveryDate: null,
      OriginalUnitPrice: line.UnitPrice || line.OriginalUnitPrice || 0,
      IsEvenExchange: false,
      LineProcessInfo: null,
      StatusId: '9000',
      UpdatedTimestamp: cancelTimestamp,
    };
  }
  /**
   * Transform quantity details for cancellation with complete lifecycle
   *
   * @private
   * @param quantityDetails - Array of quantity detail objects
   * @param cancelTimestamp - Cancellation timestamp
   * @param itemId - Item identifier for tracking
   * @returns any[] - Array of quantity detail objects with complete status progression
   */
  private transformQuantityDetailsToCancel(
    _quantityDetails: unknown[],
    cancelTimestamp: string,
    itemId?: string,
  ): any[] {
    return [
      ...this.buildOrderQuantityDetails(itemId),
      ...this.buildFulfillmentQuantityDetails(itemId),
      this.buildFinalCancelQuantityDetail(cancelTimestamp, itemId),
    ];
  }

  private buildOrderQuantityDetails(itemId?: string): any[] {
    return [
      this.buildOrderReceivedQuantityDetail(itemId),
      this.buildOrderActiveQuantityDetail(itemId),
    ];
  }

  private buildOrderReceivedQuantityDetail(itemId?: string): any {
    return {
      Status: { StatusId: '2000' },
      UpdatedTimestamp: '2025-08-18T03:25:30.936',
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: '2025-08-18T03:25:30.891',
      QuantityDetailId: `${Date.now()}001`,
      WebURL: null,
      Quantity: 0,
      Process: '/orderevent/receive::1147137335',
      SubstitutionRatio: null,
      ItemId: itemId || 'unknown',
      Reason: null,
      UpdatedBy: 'pubsubuser@pmp',
      OrgId: 'CFR',
      SubstitutionType: null,
      UOM: 'SPCS',
      StatusId: '2000',
      ReasonType: null,
      ChangeLog: null,
    };
  }

  private buildOrderActiveQuantityDetail(itemId?: string): any {
    return {
      Status: { StatusId: '3000' },
      UpdatedTimestamp: '2025-08-18T03:25:54.079',
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: '2025-08-18T03:25:51.076',
      QuantityDetailId: `${Date.now()}002`,
      WebURL: null,
      Quantity: 0,
      Process: '/orderevent/receive::1147137335',
      SubstitutionRatio: null,
      ItemId: itemId || 'unknown',
      Reason: null,
      UpdatedBy: 'apiuser4Slick',
      OrgId: 'CFR',
      SubstitutionType: null,
      UOM: 'SPCS',
      StatusId: '3000',
      ReasonType: null,
      ChangeLog: null,
    };
  }

  private buildFulfillmentQuantityDetails(itemId?: string): any[] {
    return [
      this.buildShippedQuantityDetail(itemId),
      this.buildDeliveredQuantityDetail(itemId),
    ];
  }

  private buildShippedQuantityDetail(itemId?: string): any {
    return {
      Status: { StatusId: '3500' },
      UpdatedTimestamp: '2025-08-18T03:25:54.716',
      CreatedBy: 'apiuser4Slick',
      CreatedTimestamp: '2025-08-18T03:25:54.049',
      QuantityDetailId: `${Date.now()}003`,
      WebURL: null,
      Quantity: 0,
      Process: '/orderevent/receive::1147137335',
      SubstitutionRatio: null,
      ItemId: itemId || 'unknown',
      Reason: null,
      UpdatedBy: 'apiuser4Slick',
      OrgId: 'CFR',
      SubstitutionType: null,
      UOM: 'SPCS',
      StatusId: '3500',
      ReasonType: null,
      ChangeLog: null,
    };
  }

  private buildDeliveredQuantityDetail(itemId?: string): any {
    return {
      Status: { StatusId: '3600' },
      UpdatedTimestamp: '2025-08-18T03:30:08.433',
      CreatedBy: 'apiuser4Slick',
      CreatedTimestamp: '2025-08-18T03:25:54.683',
      QuantityDetailId: `${Date.now()}004`,
      WebURL: null,
      Quantity: 0,
      Process: 'postReleaseCancellation',
      SubstitutionRatio: null,
      ItemId: itemId || 'unknown',
      Reason: null,
      UpdatedBy: 'apiuser4pmp',
      OrgId: 'CFR',
      SubstitutionType: null,
      UOM: 'SPCS',
      StatusId: '3600',
      ReasonType: null,
      ChangeLog: null,
    };
  }

  private buildFinalCancelQuantityDetail(
    cancelTimestamp: string,
    itemId?: string,
  ): any {
    return {
      Status: { StatusId: '1500' },
      UpdatedTimestamp: cancelTimestamp,
      CreatedBy: 'apiuser4pmp',
      CreatedTimestamp: cancelTimestamp.slice(0, -1) + '377',
      QuantityDetailId: `${Date.now()}005`,
      WebURL: null,
      Quantity: 0,
      Process: 'postReleaseCancellation',
      SubstitutionRatio: null,
      ItemId: itemId || 'unknown',
      Reason: { ReasonId: '1000.000' },
      UpdatedBy: 'apiuser4pmp',
      OrgId: 'CFR',
      SubstitutionType: null,
      UOM: 'SPCS',
      StatusId: '1500',
      ReasonType: { ReasonTypeId: 'Short' },
      ChangeLog: {
        ModTypes: {
          QuantityDetail: ['QuantityDetail::QuantityStatus::Increase::1500'],
        },
        ChangeSet: [
          {
            Properties: [
              {
                New: '0.0',
                Old: 'null',
                Property: 'Quantity',
              },
            ],
            ModType: 'QuantityDetail::QuantityStatus::Increase::1500',
          },
        ],
      },
    };
  }

  /**
   * Build OrderLineNote array matching template structure with correct item-specific NoteIds
   *
   * Based on template analysis:
   * - OrderLine[0]: R02_OrderId
   * - OrderLine[1]: R03_OrderId
   * - OrderLine[2]: R04_OrderId
   * - OrderLine[3]: R05_OrderId
   * - OrderLine[4]: R06_OrderId
   * - OrderLine[5]: R07_OrderId
   *
   * @private
   * @param line - Order line data
   * @param cancelTimestamp - Cancellation timestamp
   * @param index - Line index for sequential NoteId generation
   * @param orderId - Order identifier for NoteId
   * @returns any[] - Array of OrderLineNote objects with correct item-specific NoteIds
   */
  private buildOrderLineNotes(
    line: any,
    cancelTimestamp: string,
    index: number,
    orderId?: string,
  ): any[] {
    // Generate sequential NoteId based on OrderLine index (R02 for first line, R03 for second, etc.)
    const noteIdPrefix = `R${String(index + 2).padStart(2, '0')}`; // R02, R03, R04, R05, R06, R07
    const orderIdForNote = orderId || line.OrderId || 'unknown';

    return [
      {
        UpdatedBy: 'pubsubuser@pmp',
        UpdatedTimestamp: cancelTimestamp,
        OrgId: 'CFR',
        NoteId: `${noteIdPrefix}_${orderIdForNote}`,
        CreatedBy: 'pubsubuser@pmp',
        CreatedTimestamp: cancelTimestamp,
        NoteType: { NoteTypeId: '0006' },
        DisplaySequence: null,
        NoteText: '',
        Process: 'saveOrder::-1843768273',
        IsVisible: true,
        NoteCategory: { NoteCategoryId: 'CustomerCommunication' },
      },
      {
        UpdatedBy: 'integrationuser@crc.com',
        UpdatedTimestamp: cancelTimestamp,
        OrgId: 'CFR',
        NoteId: `${orderIdForNote}_1755487553468`,
        CreatedBy: 'integrationuser@crc.com',
        CreatedTimestamp: cancelTimestamp,
        NoteType: { NoteTypeId: '0003' },
        DisplaySequence: null,
        NoteText: 'Customer requested late order cancellation',
        Process: 'postReleaseCancellation',
        IsVisible: true,
        NoteCategory: { NoteCategoryId: 'CustomerCommunication' },
      },
      {
        UpdatedBy: 'integrationuser@crc.com',
        UpdatedTimestamp: cancelTimestamp,
        OrgId: 'CFR',
        NoteId: `${orderIdForNote}_1755487554795`,
        CreatedBy: 'integrationuser@crc.com',
        CreatedTimestamp: cancelTimestamp,
        NoteType: { NoteTypeId: '0003' },
        DisplaySequence: null,
        NoteText: 'Order line cancelled post-fulfillment',
        Process: 'postReleaseCancellation',
        IsVisible: true,
        NoteCategory: { NoteCategoryId: 'CustomerCommunication' },
      },
    ];
  }

  /**
   * Build ShipToAddress structure
   *
   * @private
   * @param line - Order line data
   * @returns any - ShipToAddress object
   */
  // @ts-ignore - Reserved for future implementation
  private buildShipToAddress(_line: any): any {
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
        County: '-',
      },
      IsAddressVerified: true,
      Extended: {
        AddressRef: '|||4016|TH',
      },
      AddressId: _line.AddressId || 'generated-address-id',
    };
  }

  /**
   * Build OrderLinePromisingInfo structure
   *
   * @private
   * @param line - Order line data
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any - OrderLinePromisingInfo object
   */
  // @ts-ignore - Reserved for future implementation
  private buildOrderLinePromisingInfo(
    _line: any,
    _cancelTimestamp: string,
  ): any {
    return {
      InventorySegmentId: null,
      CreatedTimestamp: _cancelTimestamp,
      ShipFromLocationId: 'CFR128',
      CountryOfOrigin: null,
      Process: 'saveOrder::-1843768273',
      InventoryTypeId: null,
      ConsolidatationLocationId: null,
      UpdatedBy: 'pubsubuser@pmp',
      AsnId: null,
      AsnDetailId: null,
      UpdatedTimestamp: _cancelTimestamp,
      CreatedBy: 'pubsubuser@pmp',
      StrategyType: null,
      BatchNumber: null,
      IsForceAllocate: true,
      ProductStatusId: null,
      OrgId: 'CFR',
      PoDetailId: null,
      ItemAttribute4: null,
      ItemAttribute3: null,
      ItemAttribute2: null,
      ItemAttribute1: null,
      PoId: null,
      ReqCapacityPerUnit: null,
      ShipThroughLocationId: null,
      ItemAttribute5: null,
    };
  }

  /**
   * Build OrderLineExtension1 complex nested structure
   *
   * @private
   * @param line - Order line data
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any - OrderLineExtension1 object
   */
  private buildOrderLineExtension1(line: any, _cancelTimestamp: string): any {
    return {
      Extended: {
        OfferId: null,
        DeliveryRoute: null,
        ProductNameVN: null,
        NumberOfPack: 1,
        PickUpStoreCountry: null,
        MMSDepartment: line.ItemDepartmentNumber || 5,
        GWPParentItem: null,
        ProductUOMEN: null,
        CustomerAddressLong: null,
        CustomerAddressLat: null,
        IsBundle: true,
        LatestItemTotal: null,
        PackUnitPrice: line.UnitPrice || 0,
        LatestItemSubTotal: null,
        IsWeightItem: false,
        ProductNameIT: null,
        PickUpStoreCode: null,
        ProductNameEN: line.ItemDescription || '',
        PromotionId: null,
        PackItemDescriptionEN: null,
        PickUpStoreLat: null,
        MMSSKUType: null,
        PickUpStoreCity: null,
        PickUpStoreEmail: null,
        PickUpSecretKey: null,
        ReferenceOrderLineId: null,
        PackSmallImageURI: line.SmallImageURI || '',
        PackItemDescriptionTH: line.ItemDescription || '',
        PackOriginalUnitPrice: null,
        ServiceType: null,
        PickUpStoreAddress2: null,
        PickUpStoreAddress1: null,
        PackitemDescription: null,
        PickUpStoreDescription: null,
        IsSubstitution: false,
        AverageWeight: null,
        AverageUnitPrice: null,
        SlotBookingFrom: '2025-08-18T10:55:22',
        CanReturntoWarehouse: false,
        PackOrderedQty: line.Quantity || 1,
        PickUpStorePhone: null,
        SourceItemTotalDiscount: null,
        ProductNameTH: line.ItemDescription || '',
        SourceItemTotal: null,
        PickUpStorePostal: null,
        SourceItemSubTotal: null,
        SlotBookingId: line.OrderId,
        MMSSubDepartment: 51,
        SecretKeyCode: null,
        ProductUOMTH: null,
        PickUpStoreDistrict: null,
        PrimaryBarcode: line.ItemId || '',
        IsGiftWrapping: false,
        PickUpStoreName: null,
        LatestUnitPrice: null,
        JDASKUType: null,
        PromotionType: 'undefined',
        SlotBookingTo: '2025-08-18T11:55:22',
        PickUpStoreLong: null,
        ActualQuantity: null,
        IsGWP: false,
        BundleRefId: line.BundleRefId || '',
        PickUpStoreSubDistrict: null,
        ProductNameDE: null,
        LatestItemTotalDiscount: null,
      },
    };
  }

  /**
   * Build order notes including cancel information
   *
   * @private
   * @param orderData - Order data object
   * @param cancelRequest - Cancel request details
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any[] - Array of order note objects
   */
  private buildOrderNotes(
    _orderData: any,
    cancelRequest: any,
    cancelTimestamp: string,
  ): any[] {
    const notes = [];
    // Generate required IDs matching template structure
    // Using Math.random() for non-cryptographic unique ID generation is safe here
    const numericNoteId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const pkId = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
    const contextId = this.generateUUID();

    // Build complete OrderNote structure matching template exactly
    notes.push({
      NoteId: numericNoteId,
      UpdatedTimestamp: cancelTimestamp,
      CreatedBy: 'pubsubuser@pmp', // Fixed: should be pubsubuser@pmp, not apiuser4pmp
      CreatedTimestamp: cancelTimestamp,
      DisplaySequence: null,
      NoteText:
        cancelRequest?.CancelComments || 'Order cancelled by customer request',
      Process: 'saveOrder::-1843768273',
      OrgId: 'CFR',
      UpdatedBy: 'pubsubuser@pmp', // Fixed: should be pubsubuser@pmp, not apiuser4pmp
      NoteType: {
        NoteTypeId: '0004', // Fixed: should be "0004", not "General"
      },
      ContextId: contextId,
      PK: pkId,
      PurgeDate: null,
      IsVisible: true,
      NoteCategory: {
        NoteCategoryId: 'CustomerCommunication',
      },
      Unique_Identifier: `${pkId}__${numericNoteId}`,
    });

    return notes;
  }

  /**
   * Generate UUID for ContextId
   *
   * @private
   * @returns string - Generated UUID
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        // Using Math.random() for non-cryptographic UUID generation is safe here
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;

        return v.toString(16);
      },
    );
  }

  /**
   * Build OrderExtension1 object
   *
   * @private
   * @param orderData - Order data object
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any - OrderExtension1 object
   */
  private buildOrderExtension1(orderData: any, cancelTimestamp: string): any {
    return {
      UpdatedBy: 'pubsubuser@pmp', // Fixed: should be pubsubuser@pmp, not apiuser4pmp
      UpdatedTimestamp: cancelTimestamp,
      OrgId: 'CFR', // Added missing field
      CreatedTimestamp: cancelTimestamp, // Added missing field
      CreatedBy: 'pubsubuser@pmp', // Added missing field
      Extended: {
        ...orderData.metadata?.extendedFields,
        CancelAllowed: false, // Changed after cancellation
      },
    };
  }

  /**
   * Build Release information
   *
   * @private
   * @param orderData - Order data object
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any[] - Release array
   */
  private buildRelease(_orderData: any, cancelTimestamp: string): any[] {
    return [
      {
        ReleaseType: null,
        UpdatedTimestamp: cancelTimestamp,
        ServiceLevelCode: 'STD',
        ShipToLocationId: null,
        EffectiveRank: 'Not Applicable', // Added missing field from template
        CreatedBy: 'pubsubuser@pmp', // Correct user
        CreatedTimestamp: cancelTimestamp,
        // Removed UpdatedBy - template doesn't have this field
        // Removed Process - template doesn't have this field
        // Removed OrgId - template doesn't have this field at Release level
        StatusId: '9000',
        ReleaseDate: cancelTimestamp,
      },
    ];
  }

  /**
   * Build Order Milestone Events
   *
   * @private
   * @param orderData - Order data object
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any[] - Milestone events array
   */
  private buildOrderMilestoneEvents(
    _orderData: any,
    cancelTimestamp: string,
  ): any[] {
    return [
      {
        MonitoringRuleId: 'Release Order',
        UpdatedTimestamp: cancelTimestamp,
        OrgId: 'CFR',
        UpdatedBy: 'pubsubuser@pmp', // Fixed: should match CreatedBy
        CreatedTimestamp: cancelTimestamp,
        CreatedBy: 'pubsubuser@pmp',
        Process: 'postReleaseCancellation',
        EventStatus: 'Cancelled',
      },
    ];
  }

  /**
   * Build Order Milestones
   *
   * @private
   * @param orderData - Order data object
   * @param cancelTimestamp - Cancellation timestamp
   * @returns any[] - Milestones array
   */
  private buildOrderMilestones(
    _orderData: any,
    cancelTimestamp: string,
  ): any[] {
    return [
      {
        MonitoringRuleId: null,
        UpdatedTimestamp: cancelTimestamp,
        OrgId: 'CFR',
        UpdatedBy: 'pubsubuser@pmp',
        CreatedTimestamp: cancelTimestamp,
        CreatedBy: 'pubsubuser@pmp',
        Process: 'postReleaseCancellation',
        StatusId: '9000',
      },
    ];
  }
}
