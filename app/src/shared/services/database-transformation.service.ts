import { Injectable } from '@nestjs/common';

import {
  FieldMappingConfig,
  FieldMappingUtil,
  ORDERS_FIELD_MAPPING,
  ORDER_LINES_FIELD_MAPPING,
  RELEASE_LINES_FIELD_MAPPING,
} from '../utils/field-mapping.util';

import { DynamicIdGeneratorService } from './dynamic-id-generator.service';
import { TimestampService } from './timestamp.service';

export interface DatabaseTransformationResult {
  ordersTableData: Record<string, any>;
  orderLinesTableData: Record<string, any>[];
  releaseLinesTableData: Record<string, any>[];
  validationResults: {
    ordersValidation: { isValid: boolean; missingFields: string[] };
    orderLinesValidation: { isValid: boolean; missingFields: string[] };
    releaseLinesValidation: { isValid: boolean; missingFields: string[] };
  };
  warnings: string[];
  errors: string[];
}

/**
 * Service for transforming application data to database-compatible format
 * Handles field mapping, validation, and database constraint compliance
 */
@Injectable()
export class DatabaseTransformationService {
  constructor(
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly timestampService: TimestampService,
  ) {}

  /**
   * Transform complete release data to database format
   */
  public transformToDatabase(
    releaseData: any,
    inputData: any,
  ): DatabaseTransformationResult {
    const warnings: string[] = [];
    const errors: string[] = [];

    try {
      // 1. Transform Orders table data
      const ordersTableData = this.transformOrdersData(
        releaseData,
        inputData,
        warnings,
      );
      // 2. Transform Order Lines table data
      const orderLinesTableData = this.transformOrderLinesData(
        releaseData,
        inputData,
        warnings,
      );
      // 3. Transform Release Lines table data (CRITICAL - was missing required fields)
      const releaseLinesTableData = this.transformReleaseLinesData(
        releaseData,
        inputData,
        warnings,
      );
      // 4. Validate all transformations
      const validationResults = this.validateTransformations({
        ordersTableData,
        orderLinesTableData,
        releaseLinesTableData,
      });

      return {
        ordersTableData,
        orderLinesTableData,
        releaseLinesTableData,
        validationResults,
        warnings,
        errors,
      };
    } catch (error) {
      errors.push(`Transformation failed: ${error.message}`);

      throw new Error(`Database transformation failed: ${error.message}`);
    }
  }

  /**
   * Transform data for orders table
   */
  private transformOrdersData(
    releaseData: any,
    inputData: any,
    warnings: string[],
  ): Record<string, any> {
    const ordersData = {
      // Primary identifiers
      OrderId: releaseData.OrderId || inputData.OrderId,
      ShortOrderNumber: inputData.AlternateOrderId || inputData.OrderId,
      AlternateOrderId: inputData.AlternateOrderId,

      // Customer information
      CustomerId: releaseData.CustomerId || inputData.CustomerId,
      CustomerTypeId: releaseData.CustomerTypeId || inputData.CustomerTypeId,
      CustomerEmail: releaseData.CustomerEmail || releaseData.Email,
      CustomerFirstName: releaseData.CustomerFirstName,
      CustomerLastName: releaseData.CustomerLastName,
      CustomerPhone: releaseData.Phone,
      CurrencyCode: releaseData.CurrencyCode,

      // Organization and channel
      OrgId: releaseData.OrganizationId || inputData.OrgId,
      SellingChannel:
        releaseData.SellingChannelId ||
        inputData.SellingChannel?.SellingChannelId ||
        'WEB',

      // Financial totals
      OrderSubTotal: releaseData.OrderSubTotal,
      OrderTotal: releaseData.OrderTotal,
      TotalCharges: releaseData.TotalCharges,
      TotalDiscounts: Math.abs(releaseData.TotalDiscounts || 0),
      TotalTaxes: releaseData.TotalTaxes,
      CancelledOrderSubTotal: releaseData.CancelledOrderSubTotal,

      // Status fields
      IsOnHold: releaseData.IsOnHold || false,
      CancelAllowed: releaseData.ExtendedFields?.CancelAllowed || false,
      IsCancelled: releaseData.IsCancelled || false,
      OrderLocale: inputData.OrderLocale,
      OrderStatus: 'Open', // Default status
      FulfillmentStatus: releaseData.FulfillmentStatus || 'Released',
      PaymentStatus: 'Paid', // Default status

      // Fulfillment status IDs
      MaxFulfillmentStatusId: releaseData.MaxFulfillmentStatusId || '3000',
      MinFulfillmentStatusId: releaseData.MinFulfillmentStatusId || '3000',

      // Timestamps
      DoNotReleaseBefore: inputData.DoNotReleaseBefore,
      CapturedDate: releaseData.CapturedDate,

      // JSONB fields (store complex objects)
      DocType: inputData.DocType || { DocTypeId: 'CustomerOrder' },
      OrderHold: inputData.OrderHold || [],
      OrderActions: [],
      OrderExtension1: inputData.OrderExtension1 || {},
      OrderChargeDetail: inputData.OrderChargeDetail || [],
      OrderTaxDetail: inputData.OrderTaxDetail || [],
      OrderType: inputData.OrderType || { OrderTypeId: 'Standard' },
      OrderNote: inputData.OrderNote || [],
      CancelReason: null,
      ChangeLog: { ModTypes: {} },

      // Audit fields
      Version: 1,
      IsActive: true,
      CreatedBy: 'system',
      UpdatedBy: 'system',
    };
    // Convert to database format using field mapping
    const databaseData = FieldMappingUtil.toDatabaseFormat(
      ordersData,
      ORDERS_FIELD_MAPPING,
    );

    // Add timestamps
    databaseData.created_at = new Date().toISOString();
    databaseData.updated_at = new Date().toISOString();

    return databaseData;
  }

  /**
   * Transform data for order_lines table
   */
  private transformOrderLinesData(
    releaseData: any,
    inputData: any,
    warnings: string[],
  ): Record<string, any>[] {
    const orderLines = inputData.OrderLine || [];

    return orderLines.map((line: any, index: number) => {
      const orderLineData = {
        // Primary identifiers
        OrderId: releaseData.OrderId || inputData.OrderId,
        OrderLineId: line.OrderLineId || `${inputData.OrderId}-${index + 1}`,

        // Item information (semantic mapping: item_id ↔ ProductId)
        ProductId: line.ItemId, // This will map to item_id in database
        ItemDescription: line.ItemDescription,

        // Quantity and pricing
        Quantity: line.Quantity,
        UnitPrice: line.UnitPrice,
        OriginalUnitPrice: line.OriginalUnitPrice,
        LineTotal: line.OrderLineTotal,
        UOM: line.UOM,

        // Fulfillment information - PREVIOUSLY MISSING
        FulfillmentGroupId: line.FulfillmentGroupId,
        ShippingMethodId: line.ShippingMethodId,
        MaxFulfillmentStatusId: line.MaxFulfillmentStatusId || '3000',
        MinFulfillmentStatusId: line.MinFulfillmentStatusId || '3000',
        ShipToLocationId: line.ShipToLocationId,
        ShipFromAddressId: line.ShipFromAddressId,
        ReleaseGroupId: line.ReleaseGroupId,

        // Financial totals
        OrderLineSubTotal: line.OrderLineSubTotal,
        OrderLineTaxTotal: line.OrderLineTaxTotal,
        TotalDiscountOnItem: line.TotalDiscountOnItem,
        TotalDiscounts: line.TotalDiscounts,
        TotalCharges: line.TotalCharges,
        MaxAppeasementAmount: line.MaxAppeasementAmount,
        CancelledOrderLineSubTotal: line.CancelledOrderLineSubTotal,
        CancelledTotalDiscounts: line.CancelledTotalDiscounts,

        // Status and flags
        IsGift: line.IsGift || false,
        IsTaxIncluded: line.IsTaxIncluded || false,
        IsPreOrder: line.IsPreOrder || false,
        IsCancelled: line.IsCancelled || false,
        FulfillmentStatus: line.FulfillmentStatus || 'Open',
        OrderLineStatus: line.OrderLineStatus || 'Open',

        // Delivery information
        PromisedDeliveryDate: line.PromisedDeliveryDate,
        SmallImageUri: line.SmallImageURI,

        // JSONB fields
        DeliveryMethod: line.DeliveryMethod || {},
        OrderLineNote: line.OrderLineNote || [],
        OrderLineChargeDetail: line.OrderLineChargeDetail || [],
        OrderLineTaxDetail: line.OrderLineTaxDetail || [],
        OrderLinePromisingInfo: line.OrderLinePromisingInfo || {},
        ShipToAddress: line.ShipToAddress || {},
        OrderLineExtension1: line.OrderLineExtension1 || {},
        ChangeLog: { ModTypes: {} },

        // Audit fields
        Version: 1,
        IsActive: true,
        CreatedBy: 'system',
        UpdatedBy: 'system',
      };
      // Convert to database format
      const databaseData = FieldMappingUtil.toDatabaseFormat(
        orderLineData,
        ORDER_LINES_FIELD_MAPPING,
      );

      // Add timestamps
      databaseData.created_at = new Date().toISOString();
      databaseData.updated_at = new Date().toISOString();

      return databaseData;
    });
  }

  /**
   * Transform data for release_lines table - CRITICAL IMPLEMENTATION
   */
  private transformReleaseLinesData(
    releaseData: any,
    inputData: any,
    warnings: string[],
  ): Record<string, any>[] {
    const orderLines = inputData.OrderLine || [];
    const releaseId = releaseData.ReleaseId || `${inputData.OrderId}1`;
    const orgId = releaseData.OrganizationId || inputData.OrgId;

    if (!orgId) {
      warnings.push('Missing OrgId - using default value');
    }

    return orderLines.map((line: any, index: number) => {
      // Generate required IDs that were missing in original transformation
      const allocationId = this.idGenerator.generateAllocationId();
      const releaseLineId = `${releaseId}-${index + 1}`;
      const releaseLineData = {
        // REQUIRED fields (NOT NULL constraints) - THESE WERE MISSING!
        OrderId: releaseData.OrderId || inputData.OrderId,
        OrderLineId: line.OrderLineId || `${inputData.OrderId}-${index + 1}`,
        ReleaseId: releaseId,
        ReleaseLineId: releaseLineId,
        AllocationId: allocationId, // CRITICAL: Was missing, required NOT NULL
        OrgId: orgId || 'DEFAULT_ORG', // CRITICAL: Was missing, required NOT NULL
        ProductId: line.ItemId, // Maps to item_id in database
        Quantity: line.Quantity || 1,
        UOM: line.UOM || 'EACH', // CRITICAL: Was missing, required NOT NULL

        // Optional fields - but should be populated for completeness
        FulfilledQuantity: line.FulfilledQuantity || null,
        CancelledQuantity: line.CancelledQuantity || null,
        EffectiveRank: line.EffectiveRank || 1,
        Process: `releaseOrder::${this.idGenerator.generateProcessId()}`,
        CancelledDate: line.CancelledDate || null,

        // Audit fields
        CreatedBy: 'system',
        UpdatedBy: 'system',
      };
      // Validate required fields before transformation
      const requiredFields = [
        'OrderId',
        'OrderLineId',
        'ReleaseId',
        'ReleaseLineId',
        'AllocationId',
        'OrgId',
        'ProductId',
        'Quantity',
        'UOM',
      ];

      for (const field of requiredFields) {
        if (!releaseLineData[field]) {
          warnings.push(`Missing required field for release line: ${field}`);
        }
      }

      // Convert to database format
      const databaseData = FieldMappingUtil.toDatabaseFormat(
        releaseLineData,
        RELEASE_LINES_FIELD_MAPPING,
      );

      // Add timestamps
      databaseData.created_at = new Date().toISOString();
      databaseData.updated_at = new Date().toISOString();

      return databaseData;
    });
  }

  /**
   * Validate all database transformations
   */
  private validateTransformations(data: {
    ordersTableData: Record<string, any>;
    orderLinesTableData: Record<string, any>[];
    releaseLinesTableData: Record<string, any>[];
  }) {
    return {
      ordersValidation: FieldMappingUtil.validateRequiredFields(
        data.ordersTableData,
        ORDERS_FIELD_MAPPING,
      ),
      orderLinesValidation: this.validateArrayData(
        data.orderLinesTableData,
        ORDER_LINES_FIELD_MAPPING,
      ),
      releaseLinesValidation: this.validateArrayData(
        data.releaseLinesTableData,
        RELEASE_LINES_FIELD_MAPPING,
      ),
    };
  }

  /**
   * Validate array of data objects
   */
  private validateArrayData(
    dataArray: Record<string, any>[],
    mapping: Record<string, FieldMappingConfig>,
  ): { isValid: boolean; missingFields: string[] } {
    const allMissingFields: string[] = [];

    for (const [index, data] of dataArray.entries()) {
      const validation = FieldMappingUtil.validateRequiredFields(data, mapping);

      if (!validation.isValid) {
        validation.missingFields.forEach(field => {
          allMissingFields.push(`${field} (item ${index})`);
        });
      }
    }

    return {
      isValid: allMissingFields.length === 0,
      missingFields: allMissingFields,
    };
  }

  /**
   * Get database table schemas for reference
   */
  public getDatabaseSchemas() {
    return {
      orders: {
        requiredFields:
          FieldMappingUtil.getRequiredFields(ORDERS_FIELD_MAPPING),
        allFields: Object.keys(ORDERS_FIELD_MAPPING),
      },
      orderLines: {
        requiredFields: FieldMappingUtil.getRequiredFields(
          ORDER_LINES_FIELD_MAPPING,
        ),
        allFields: Object.keys(ORDER_LINES_FIELD_MAPPING),
      },
      releaseLines: {
        requiredFields: FieldMappingUtil.getRequiredFields(
          RELEASE_LINES_FIELD_MAPPING,
        ),
        allFields: Object.keys(RELEASE_LINES_FIELD_MAPPING),
      },
    };
  }
}
