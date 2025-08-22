/**
 * Field mapping utilities for database schema alignment
 * Handles conversion between naming conventions and semantic mappings
 */

export interface FieldMappingConfig {
  databaseField: string;
  applicationField: string;
  dtoField: string;
  dataType: 'string' | 'number' | 'boolean' | 'date' | 'object';
  required: boolean;
  defaultValue?: any;
  transformer?: (value: any) => any;
}

/**
 * Database field mapping configurations
 */
export const ORDERS_FIELD_MAPPING: Record<string, FieldMappingConfig> = {
  // Primary identifiers
  order_id: {
    databaseField: 'order_id',
    applicationField: 'OrderId',
    dtoField: 'orderId',
    dataType: 'string',
    required: true,
  },
  short_order_number: {
    databaseField: 'short_order_number',
    applicationField: 'ShortOrderNumber',
    dtoField: 'orderNumber',
    dataType: 'string',
    required: false,
  },
  
  // Customer information
  customer_id: {
    databaseField: 'customer_id',
    applicationField: 'CustomerId',
    dtoField: 'customerId',
    dataType: 'string',
    required: false,
  },
  customer_email: {
    databaseField: 'customer_email',
    applicationField: 'CustomerEmail',
    dtoField: 'customerEmail',
    dataType: 'string',
    required: false,
  },
  customer_first_name: {
    databaseField: 'customer_first_name',
    applicationField: 'CustomerFirstName',
    dtoField: 'customerFirstName',
    dataType: 'string',
    required: false,
  },
  customer_last_name: {
    databaseField: 'customer_last_name',
    applicationField: 'CustomerLastName',
    dtoField: 'customerLastName',
    dataType: 'string',
    required: false,
  },
  customer_phone: {
    databaseField: 'customer_phone',
    applicationField: 'CustomerPhone',
    dtoField: 'customerPhone',
    dataType: 'string',
    required: false,
  },
  
  // Financial fields
  order_sub_total: {
    databaseField: 'order_sub_total',
    applicationField: 'OrderSubTotal',
    dtoField: 'subTotal',
    dataType: 'number',
    required: false,
  },
  order_total: {
    databaseField: 'order_total',
    applicationField: 'OrderTotal',
    dtoField: 'totalAmount',
    dataType: 'number',
    required: false,
  },
  total_charges: {
    databaseField: 'total_charges',
    applicationField: 'TotalCharges',
    dtoField: 'totalShipping',
    dataType: 'number',
    required: false,
  },
  total_discounts: {
    databaseField: 'total_discounts',
    applicationField: 'TotalDiscounts',
    dtoField: 'totalDiscount',
    dataType: 'number',
    required: false,
  },
  total_taxes: {
    databaseField: 'total_taxes',
    applicationField: 'TotalTaxes',
    dtoField: 'totalTax',
    dataType: 'number',
    required: false,
  },
  
  // Organization and channel
  org_id: {
    databaseField: 'org_id',
    applicationField: 'OrgId',
    dtoField: 'orgId',
    dataType: 'string',
    required: false,
  },
  selling_channel: {
    databaseField: 'selling_channel',
    applicationField: 'SellingChannel',
    dtoField: 'sellingChannel',
    dataType: 'string',
    required: false,
  },
  alternate_order_id: {
    databaseField: 'alternate_order_id',
    applicationField: 'AlternateOrderId',
    dtoField: 'alternateOrderId',
    dataType: 'string',
    required: false,
  },
  
  // Status fields
  is_on_hold: {
    databaseField: 'is_on_hold',
    applicationField: 'IsOnHold',
    dtoField: 'isOnHold',
    dataType: 'boolean',
    required: false,
    defaultValue: false,
  },
  is_cancelled: {
    databaseField: 'is_cancelled',
    applicationField: 'IsCancelled',
    dtoField: 'isCancelled',
    dataType: 'boolean',
    required: false,
    defaultValue: false,
  },
  order_status: {
    databaseField: 'order_status',
    applicationField: 'OrderStatus',
    dtoField: 'orderStatus',
    dataType: 'string',
    required: false,
  },
  fulfillment_status: {
    databaseField: 'fulfillment_status',
    applicationField: 'FulfillmentStatus',
    dtoField: 'fulfillmentStatus',
    dataType: 'string',
    required: false,
  },
  payment_status: {
    databaseField: 'payment_status',
    applicationField: 'PaymentStatus',
    dtoField: 'paymentStatus',
    dataType: 'string',
    required: false,
  },
};

export const ORDER_LINES_FIELD_MAPPING: Record<string, FieldMappingConfig> = {
  order_id: {
    databaseField: 'order_id',
    applicationField: 'OrderId',
    dtoField: 'orderId',
    dataType: 'string',
    required: true,
  },
  order_line_id: {
    databaseField: 'order_line_id',
    applicationField: 'OrderLineId',
    dtoField: 'orderLineId',
    dataType: 'string',
    required: true,
  },
  
  // Item information - SEMANTIC MAPPING
  item_id: {
    databaseField: 'item_id',
    applicationField: 'ProductId', // Semantic mapping: item_id → ProductId
    dtoField: 'productId',
    dataType: 'string',
    required: false,
  },
  item_description: {
    databaseField: 'item_description',
    applicationField: 'ProductName', // Semantic mapping: item_description → ProductName
    dtoField: 'productName',
    dataType: 'string',
    required: false,
  },
  
  // Quantity and pricing
  quantity: {
    databaseField: 'quantity',
    applicationField: 'Quantity',
    dtoField: 'quantity',
    dataType: 'number',
    required: false,
  },
  unit_price: {
    databaseField: 'unit_price',
    applicationField: 'UnitPrice',
    dtoField: 'unitPrice',
    dataType: 'number',
    required: false,
  },
  order_line_total: {
    databaseField: 'order_line_total',
    applicationField: 'LineTotal',
    dtoField: 'lineTotal',
    dataType: 'number',
    required: false,
  },
  uom: {
    databaseField: 'uom',
    applicationField: 'UOM',
    dtoField: 'uom',
    dataType: 'string',
    required: false,
  },
  
  // Fulfillment fields - MISSING IN CURRENT TRANSFORMATION
  fulfillment_group_id: {
    databaseField: 'fulfillment_group_id',
    applicationField: 'FulfillmentGroupId',
    dtoField: 'fulfillmentGroupId',
    dataType: 'string',
    required: false,
  },
  shipping_method_id: {
    databaseField: 'shipping_method_id',
    applicationField: 'ShippingMethodId',
    dtoField: 'shippingMethodId',
    dataType: 'string',
    required: false,
  },
  max_fulfillment_status_id: {
    databaseField: 'max_fulfillment_status_id',
    applicationField: 'MaxFulfillmentStatusId',
    dtoField: 'maxFulfillmentStatusId',
    dataType: 'string',
    required: false,
  },
  ship_to_location_id: {
    databaseField: 'ship_to_location_id',
    applicationField: 'ShipToLocationId',
    dtoField: 'shipToLocationId',
    dataType: 'string',
    required: false,
  },
};

export const RELEASE_LINES_FIELD_MAPPING: Record<string, FieldMappingConfig> = {
  // CRITICAL: All required fields for database insertion
  order_id: {
    databaseField: 'order_id',
    applicationField: 'OrderId',
    dtoField: 'orderId',
    dataType: 'string',
    required: true, // NOT NULL constraint
  },
  order_line_id: {
    databaseField: 'order_line_id',
    applicationField: 'OrderLineId',
    dtoField: 'orderLineId',
    dataType: 'string',
    required: true, // NOT NULL constraint
  },
  release_id: {
    databaseField: 'release_id',
    applicationField: 'ReleaseId',
    dtoField: 'releaseId',
    dataType: 'string',
    required: true, // NOT NULL constraint
  },
  release_line_id: {
    databaseField: 'release_line_id',
    applicationField: 'ReleaseLineId',
    dtoField: 'releaseLineId',
    dataType: 'string',
    required: true, // NOT NULL constraint
  },
  allocation_id: {
    databaseField: 'allocation_id',
    applicationField: 'AllocationId',
    dtoField: 'allocationId',
    dataType: 'string',
    required: true, // NOT NULL constraint - MISSING IN CURRENT TRANSFORMATION
  },
  org_id: {
    databaseField: 'org_id',
    applicationField: 'OrgId',
    dtoField: 'orgId',
    dataType: 'string',
    required: true, // NOT NULL constraint - MISSING IN CURRENT TRANSFORMATION
  },
  item_id: {
    databaseField: 'item_id',
    applicationField: 'ProductId', // Semantic mapping
    dtoField: 'productId',
    dataType: 'string',
    required: true, // NOT NULL constraint
  },
  quantity: {
    databaseField: 'quantity',
    applicationField: 'Quantity',
    dtoField: 'quantity',
    dataType: 'number',
    required: true, // NOT NULL constraint
  },
  uom: {
    databaseField: 'uom',
    applicationField: 'UOM',
    dtoField: 'uom',
    dataType: 'string',
    required: true, // NOT NULL constraint - MISSING IN CURRENT TRANSFORMATION
  },
  
  // Optional fields - but should be included for completeness
  fulfilled_quantity: {
    databaseField: 'fulfilled_quantity',
    applicationField: 'FulfilledQuantity',
    dtoField: 'fulfilledQuantity',
    dataType: 'number',
    required: false,
    defaultValue: null,
  },
  cancelled_quantity: {
    databaseField: 'cancelled_quantity',
    applicationField: 'CancelledQuantity',
    dtoField: 'cancelledQuantity',
    dataType: 'number',
    required: false,
    defaultValue: null,
  },
  effective_rank: {
    databaseField: 'effective_rank',
    applicationField: 'EffectiveRank',
    dtoField: 'effectiveRank',
    dataType: 'number',
    required: false,
    defaultValue: null,
  },
  process: {
    databaseField: 'process',
    applicationField: 'Process',
    dtoField: 'process',
    dataType: 'string',
    required: false,
    defaultValue: null,
  },
};

/**
 * Field mapping utility functions
 */
export class FieldMappingUtil {
  /**
   * Convert application object to database format
   */
  static toDatabaseFormat(
    data: Record<string, any>,
    mapping: Record<string, FieldMappingConfig>,
  ): Record<string, any> {
    const result: Record<string, any> = {};
    
    for (const [mappingKey, config] of Object.entries(mapping)) {
      const applicationValue = data[config.applicationField];
      
      if (applicationValue !== undefined) {
        // Apply transformer if available
        const transformedValue = config.transformer 
          ? config.transformer(applicationValue)
          : applicationValue;
        
        result[config.databaseField] = transformedValue;
      } else if (config.required && config.defaultValue !== undefined) {
        // Use default value for required fields
        result[config.databaseField] = config.defaultValue;
      } else if (config.required) {
        throw new Error(
          `Required field ${config.applicationField} is missing for database field ${config.databaseField}`
        );
      }
    }
    
    return result;
  }
  
  /**
   * Convert database object to application format
   */
  static toApplicationFormat(
    data: Record<string, any>,
    mapping: Record<string, FieldMappingConfig>,
  ): Record<string, any> {
    const result: Record<string, any> = {};
    
    for (const [mappingKey, config] of Object.entries(mapping)) {
      const databaseValue = data[config.databaseField];
      
      if (databaseValue !== undefined) {
        result[config.applicationField] = databaseValue;
      }
    }
    
    return result;
  }
  
  /**
   * Convert application object to DTO format
   */
  static toDTOFormat(
    data: Record<string, any>,
    mapping: Record<string, FieldMappingConfig>,
  ): Record<string, any> {
    const result: Record<string, any> = {};
    
    for (const [mappingKey, config] of Object.entries(mapping)) {
      const applicationValue = data[config.applicationField];
      
      if (applicationValue !== undefined) {
        result[config.dtoField] = applicationValue;
      }
    }
    
    return result;
  }
  
  /**
   * Validate required fields for database insertion
   */
  static validateRequiredFields(
    data: Record<string, any>,
    mapping: Record<string, FieldMappingConfig>,
  ): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];
    
    for (const [mappingKey, config] of Object.entries(mapping)) {
      if (config.required) {
        const applicationValue = data[config.applicationField];
        
        if (applicationValue === undefined || applicationValue === null) {
          missingFields.push(config.applicationField);
        }
      }
    }
    
    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  }
  
  /**
   * Get all required fields for a mapping
   */
  static getRequiredFields(mapping: Record<string, FieldMappingConfig>): string[] {
    return Object.values(mapping)
      .filter(config => config.required)
      .map(config => config.applicationField);
  }
}