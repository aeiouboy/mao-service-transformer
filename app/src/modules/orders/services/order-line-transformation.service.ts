import { Injectable } from '@nestjs/common';

import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';
import { TransformationContext } from '../../payments/services/payment-transformation.service';
import { PMPOrderInputDTO } from '../../releases/dtos/release-create-order.dto';
import { BusinessRulesService } from '../../transformations/services/business-rules.service';
import { CalculationService } from '../../transformations/services/calculation.service';

/**
 * Service responsible for order line transformation logic.
 * Handles dynamic product support and order line calculations.
 */
@Injectable()
export class OrderLineTransformationService {
  constructor(
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly businessRulesService: BusinessRulesService,
    private readonly timestampService: TimestampService,
    private readonly calculationService: CalculationService,
  ) {}

  /**
   * Map UOM from input format to expected output format
   */
  private mapUOM(inputUOM: string): string {
    const uomMapping: Record<string, string> = {
      EACH: 'SBTL',
      PIECE: 'SBTL',
      PCS: 'SBTL',
    };

    return uomMapping[inputUOM] || inputUOM;
  }

  /**
   * Extract product data from OrderLine input, replacing hardcoded variants
   */
  private extractProductData(
    orderLine: any,
    lineIndex: number,
  ): {
    itemId: string;
    unitPrice: number;
    originalUnitPrice: number;
    orderLineId: string;
    orderLineTotal: number;
    orderLineSubtotal: number;
    productNameEN: string;
    productNameTH: string;
    itemDescription: string;
    itemBrand: string;
    packUnitPrice: number;
    packOrderedQty: number;
    packItemDescriptionTH: string;
    primaryBarcode: string;
    bundleRefId: string;
    smallImageURI: string;
    packSmallImageURI: string;
  } {
    const extension = orderLine.OrderLineExtension1?.Extended;
    // Extract actual product data from input
    const itemId = orderLine.ItemId || '';
    const unitPrice = orderLine.UnitPrice || 0;
    const originalUnitPrice = orderLine.OriginalUnitPrice || unitPrice;
    const quantity = orderLine.Quantity || 1;
    const orderLineTotal = unitPrice * quantity;
    const orderLineSubtotal = orderLineTotal;
    // Extract product names from extension
    const productNameEN = extension?.ProductNameEN || `Product ${itemId}`;
    const productNameTH = extension?.ProductNameTH || productNameEN;
    const itemDescription = productNameEN;
    const itemBrand = extension?.ItemBrand || 'Unknown Brand';
    // Extract pack/bundle information
    const packUnitPrice = extension?.PackUnitPrice || unitPrice;
    const packOrderedQty = extension?.PackOrderedQty || quantity;
    const packItemDescriptionTH =
      extension?.PackItemDescriptionTH || productNameTH;
    // Extract barcode and bundle information
    const primaryBarcode = itemId; // Use ItemId as primary barcode if not specified
    const bundleRefId = extension?.BundleRefId || itemId;
    // Generate image URIs (fallback to assets.tops.co.th pattern)
    const smallImageURI = this.generateImageURI(itemId, productNameEN);
    const packSmallImageURI = smallImageURI;

    return {
      itemId,
      unitPrice,
      originalUnitPrice,
      orderLineId: `${String(lineIndex).padStart(3, '0')}-${lineIndex}-${lineIndex}`,
      orderLineTotal,
      orderLineSubtotal,
      productNameEN,
      productNameTH,
      itemDescription,
      itemBrand,
      packUnitPrice,
      packOrderedQty,
      packItemDescriptionTH,
      primaryBarcode,
      bundleRefId,
      smallImageURI,
      packSmallImageURI,
    };
  }

  /**
   * Generate image URI based on product information
   */
  private generateImageURI(itemId: string, productName: string): string {
    // Default pattern for Tops marketplace
    const normalizedName = productName.replace(/[^a-zA-Z0-9]/g, '');

    return `https://assets.tops.co.th/${normalizedName}-${itemId}-1?$JPEG$`;
  }

  /**
   * Transform order lines with dynamic product support
   */
  public transformOrderLines(
    input: PMPOrderInputDTO,
    _transformationContext: TransformationContext,
  ): any[] {
    // Handle cases where OrderLine might be null/undefined or not an array
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    const shippingConfig =
      this.businessRulesService.getShippingMethodMapping(input);

    // Process actual OrderLine array - supports any number of lines
    return orderLines.map((orderLine, lineIndex) => {
      const productData = this.extractProductData(orderLine, lineIndex);
      const taxDetails =
        this.calculationService.calculateLineTaxDetails(orderLine);
      const lineDiscountCharge =
        this.calculationService.calculateLineDiscountCharge(input, lineIndex);

      return {
        CancelledQuantity: 0,
        ServiceLevelCode: null,
        LineTypeId: null,
        OrderLineTotalCharges: 0,
        FulfilledQuantity: 0,
        IsReturnable: true,
        IsTaxIncluded: orderLine.IsTaxIncluded || true,
        IsHazmat: false,
        RefundPrice: null,
        TaxOverrideValue: null,
        MaxFulfillmentStatusId: '3000',
        IsOnHold: false,
        ItemWebURL: null,
        ItemId: productData.itemId,
        ShippingMethodId: shippingConfig.shippingMethodId,
        SellingLocationId: null,
        IsGift: orderLine.IsGift || false,
        ParentOrderLineId: null,
        TotalCharges: 0,
        ParentOrderId: null,
        ItemStyle: '',
        TaxExemptId: null,
        Priority: null,
        SmallImageURI: productData.smallImageURI,
        DeliveryMethodId: shippingConfig.deliveryMethod,
        ShipDate: this.timestampService.getTimestamp('ship_date'),
        ExtendedFields: {
          AllowSubstitution: true,
        },
        UOM: this.mapUOM(orderLine.UOM || 'EACH'),
        IsPreorderItem: false,
        LineSeqNo: lineIndex + 1,
        ItemCost: productData.originalUnitPrice,
        StatusId: '5000.000',
        IsGiftCardItem: false,
        OrderLineId: productData.orderLineId,
        TaxableAmount: taxDetails.taxableAmount,
        ItemName: productData.productNameTH,
        TaxCode: 'VAT',
        CountryOfOrigin: orderLine.ShipToAddress?.Address?.Country || 'TH',
        HasChanges: false,
        RequiredDate:
          orderLine.PromisedDeliveryDate ||
          this.timestampService.getTimestamp('required_date'),
        RequestedDate:
          orderLine.PromisedDeliveryDate ||
          this.timestampService.getTimestamp('requested_date'),
        IsServiceItem: false,
        OrderedQuantity: orderLine.Quantity,
        TaxAmount: taxDetails.taxAmount,
        OriginalSellingPrice: productData.originalUnitPrice,
        TaxRate: taxDetails.taxRate,
        DiscountTypeId: 'Discount',
        ItemType: 'Physical',
        ItemSize: '',
        SellingPrice: productData.unitPrice,
        TotalDiscounts: lineDiscountCharge,
        LineTotal: productData.orderLineTotal,
        ExchangeRate: null,
        DiscountAmount: Math.abs(lineDiscountCharge),
        ConfirmedDate: this.timestampService.getTimestamp(
          'line_confirmed_date',
        ),
        PickupExpiryDate: null,
        PromiseDate:
          orderLine.PromisedDeliveryDate ||
          this.timestampService.getTimestamp('promise_date'),
        ItemColor: '',
        IsVirtual: false,
        IsRefundPending: false,
        ProductGroup: null,
        ReleaseLineExtension1: {
          Extended: {
            ExchangeRate: 1.0,
            SellableQty: orderLine.Quantity,
            SellerItemId: productData.itemId,
            ProductNameTH: productData.productNameTH,
            ProductNameEN: productData.productNameEN,
            IsBundle:
              orderLine.OrderLineExtension1?.Extended?.IsBundle || false,
            PackItemDescriptionTH: productData.packItemDescriptionTH,
            PackUnitPrice: productData.packUnitPrice,
            PackOrderedQty: productData.packOrderedQty,
            NumberOfPack:
              orderLine.OrderLineExtension1?.Extended?.NumberOfPack || 1,
            BundleRefId: productData.bundleRefId,
            SlotBookingId:
              orderLine.OrderLineExtension1?.Extended?.SlotBookingId ||
              input.OrderId,
            SlotBookingFrom:
              orderLine.OrderLineExtension1?.Extended?.SlotBookingFrom ||
              this.timestampService.getTimestamp('slot_booking_from'),
            SlotBookingTo:
              orderLine.OrderLineExtension1?.Extended?.SlotBookingTo ||
              this.timestampService.getTimestamp('slot_booking_to'),
            IsWeightItem:
              orderLine.OrderLineExtension1?.Extended?.IsWeightItem || false,
            PromotionType:
              orderLine.OrderLineExtension1?.Extended?.PromotionType || '',
            PromotionId:
              orderLine.OrderLineExtension1?.Extended?.PromotionId || '',
            // Additional fields with defaults
            PrimaryBarcode: productData.primaryBarcode,
            PackSmallImageURI: productData.packSmallImageURI,
            ItemBrand: productData.itemBrand,
            ItemDescription: productData.itemDescription,
          },
        },
        ReleaseLineNoteDetail: [
          {
            NoteId: this.idGenerator.generateNoteId(),
            Description: '0004 - Festival Remark',
            NoteTypeId: '0004',
            DisplaySequence: null,
            NoteText: 'GM-202',
            IsVisible: true,
            NoteCategoryId: 'CustomerCommunication',
            NoteCategory: {
              NoteCategoryId: 'CustomerCommunication',
            },
            NoteCode: null,
            NoteType: {
              NoteTypeId: '0004',
            },
          },
        ],
        AllocationInfo: [
          {
            AllocationId: this.idGenerator.generateAllocationId(),
            AllocationType: 'Normal',
            AllocatedQuantity: orderLine.Quantity,
            ProcessInfo: [
              {
                ProcessInfoId: this.idGenerator.generateChargeDetailId(),
                ProcessTypeId: 'Fulfillment',
                ProcessDate: this.timestampService.getTimestamp('process_date'),
                ProcessStatus: 'Ready',
                FulfillmentGroupId: this.idGenerator.generateChargeDetailId(),
                LocationId:
                  orderLine.OrderLinePromisingInfo?.ShipFromLocationId ||
                  'WAREHOUSE_001',
                WorkOrderId: this.idGenerator.generateChargeDetailId(),
                ShipFromLocationId:
                  orderLine.OrderLinePromisingInfo?.ShipFromLocationId ||
                  'WAREHOUSE_001',
              },
            ],
          },
        ],
        ReleaseBarcodeMap: [
          {
            Barcode: productData.primaryBarcode,
            BarcodeType: 'UPC',
            UOMQuantity: 1,
          },
        ],
      };
    });
  }

  /**
   * Get dynamic count of delivery lines based on actual OrderLine count
   */
  public getDeliveryLineCount(input: PMPOrderInputDTO): number {
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];

    return orderLines.length;
  }
}
