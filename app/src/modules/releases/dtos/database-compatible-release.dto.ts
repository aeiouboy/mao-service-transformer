import { Type, Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

/**
 * Database-compatible DTOs that align with migration schema
 * Uses exact field names and constraints from database schema
 */

// Address DTO aligned with database
export class DatabaseAddressDTO {
  @IsOptional()
  @IsString()
  addressId?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  addressLine3?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  county?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  emailId?: string;

  @IsOptional()
  @IsString()
  daytimePhone?: string;

  @IsOptional()
  @IsString()
  mobilePhone?: string;
}

// Allocation DTO aligned with database schema
export class DatabaseAllocationDTO {
  @IsNotEmpty()
  @IsString()
  allocationId: string;

  @IsNotEmpty()
  @IsString()
  facilityId: string;

  @IsNotEmpty()
  @IsString()
  facilityCode: string;

  @IsOptional()
  @IsString()
  facilityName?: string;

  @IsOptional()
  @IsString()
  facilityType?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Allocated quantity cannot be negative' })
  allocatedQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Available quantity cannot be negative' })
  availableQuantity: number;

  @IsOptional()
  @IsString()
  allocationStatus?: string;

  @IsOptional()
  @IsString()
  allocationDate?: string; // ISO string format
}

// Payment Method DTO aligned with database
export class DatabasePaymentMethodDTO {
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  @IsNotEmpty()
  @IsString()
  paymentType: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Payment amount cannot be negative' })
  amount: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsOptional()
  @IsString()
  authorizationCode?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  processedDate?: string; // ISO string format

  @IsOptional()
  @IsString()
  cardType?: string;

  @IsOptional()
  @IsString()
  maskedCardNumber?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DatabaseAddressDTO)
  billingAddress?: DatabaseAddressDTO;
}

// Release Line DTO with ALL database fields
export class DatabaseReleaseLineDTO {
  // REQUIRED fields from database schema (NOT NULL constraints)
  @IsNotEmpty()
  @IsString()
  orderId: string; // maps to order_id (REQUIRED)

  @IsNotEmpty()
  @IsString()
  orderLineId: string; // maps to order_line_id (REQUIRED)

  @IsNotEmpty()
  @IsString()
  releaseId: string; // maps to release_id (REQUIRED)

  @IsNotEmpty()
  @IsString()
  releaseLineId: string; // maps to release_line_id (REQUIRED)

  @IsNotEmpty()
  @IsString()
  allocationId: string; // maps to allocation_id (REQUIRED) - WAS MISSING

  @IsNotEmpty()
  @IsString()
  orgId: string; // maps to org_id (REQUIRED) - WAS MISSING

  @IsNotEmpty()
  @IsString()
  itemId: string; // maps to item_id (REQUIRED) - was ProductId

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number; // maps to quantity (REQUIRED)

  @IsNotEmpty()
  @IsString()
  uom: string; // maps to uom (REQUIRED) - WAS MISSING

  // Optional fields from database schema
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Fulfilled quantity cannot be negative' })
  fulfilledQuantity?: number; // maps to fulfilled_quantity

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Cancelled quantity cannot be negative' })
  cancelledQuantity?: number; // maps to cancelled_quantity

  @IsOptional()
  @IsNumber()
  effectiveRank?: number; // maps to effective_rank

  @IsOptional()
  @IsString()
  process?: string; // maps to process

  @IsOptional()
  @IsString()
  cancelledDate?: string; // maps to cancelled_date (ISO string format)

  // Additional fields for application compatibility (not in database)
  @IsOptional()
  @IsString()
  productName?: string; // For display purposes, not stored

  @IsOptional()
  @IsNumber()
  unitPrice?: number; // For calculations, not stored in release_lines

  @IsOptional()
  @IsNumber()
  lineTotal?: number; // For calculations, not stored in release_lines

  @IsOptional()
  @IsString()
  fulfillmentType?: string; // For application logic

  @IsOptional()
  @IsString()
  lineStatus?: string; // For application logic

  @IsOptional()
  @IsString()
  requestedDate?: string; // ISO string format

  @IsOptional()
  @IsString()
  promisedDate?: string; // ISO string format

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DatabaseAllocationDTO)
  allocations: DatabaseAllocationDTO[];
}

// Release Header DTO aligned with database orders table
export class DatabaseReleaseHeaderDTO {
  // Core order identifiers
  @IsNotEmpty()
  @IsString()
  orderId: string; // maps to order_id

  @IsOptional()
  @IsString()
  shortOrderNumber?: string; // maps to short_order_number

  @IsOptional()
  @IsString()
  alternateOrderId?: string; // maps to alternate_order_id

  // Customer information
  @IsOptional()
  @IsString()
  customerId?: string; // maps to customer_id

  @IsOptional()
  @IsString()
  customerTypeId?: string; // maps to customer_type_id

  @IsOptional()
  @IsString()
  customerEmail?: string; // maps to customer_email

  @IsOptional()
  @IsString()
  customerFirstName?: string; // maps to customer_first_name

  @IsOptional()
  @IsString()
  customerLastName?: string; // maps to customer_last_name

  @IsOptional()
  @IsString()
  customerPhone?: string; // maps to customer_phone

  // Organization and channel
  @IsOptional()
  @IsString()
  orgId?: string; // maps to org_id

  @IsOptional()
  @IsString()
  sellingChannel?: string; // maps to selling_channel

  @IsOptional()
  @IsString()
  currencyCode?: string; // maps to currency_code

  // Financial totals
  @IsOptional()
  @IsNumber()
  orderSubTotal?: number; // maps to order_sub_total

  @IsOptional()
  @IsNumber()
  orderTotal?: number; // maps to order_total

  @IsOptional()
  @IsNumber()
  totalCharges?: number; // maps to total_charges

  @IsOptional()
  @IsNumber()
  totalDiscounts?: number; // maps to total_discounts

  @IsOptional()
  @IsNumber()
  totalTaxes?: number; // maps to total_taxes

  @IsOptional()
  @IsNumber()
  cancelledOrderSubTotal?: number; // maps to cancelled_order_sub_total

  // Status fields
  @IsOptional()
  @IsBoolean()
  isOnHold?: boolean; // maps to is_on_hold

  @IsOptional()
  @IsBoolean()
  cancelAllowed?: boolean; // maps to cancel_allowed

  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean; // maps to is_cancelled

  @IsOptional()
  @IsString()
  orderLocale?: string; // maps to order_locale

  @IsOptional()
  @IsString()
  orderStatus?: string; // maps to order_status

  @IsOptional()
  @IsString()
  fulfillmentStatus?: string; // maps to fulfillment_status

  @IsOptional()
  @IsString()
  paymentStatus?: string; // maps to payment_status

  // Fulfillment status IDs
  @IsOptional()
  @IsString()
  maxFulfillmentStatusId?: string; // maps to max_fulfillment_status_id

  @IsOptional()
  @IsString()
  minFulfillmentStatusId?: string; // maps to min_fulfillment_status_id

  // Timestamp fields
  @IsOptional()
  @IsString()
  doNotReleaseBefore?: string; // maps to do_not_release_before (ISO string)

  @IsOptional()
  @IsString()
  capturedDate?: string; // maps to captured_date (ISO string)

  // Address information
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DatabaseAddressDTO)
  billingAddress: DatabaseAddressDTO;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DatabaseAddressDTO)
  shippingAddress: DatabaseAddressDTO;

  // Generated release fields (not stored in orders table)
  @IsOptional()
  @IsString()
  releaseId?: string; // Generated for release

  @IsOptional()
  @IsString()
  releaseNumber?: string; // Generated for release

  @IsOptional()
  @IsString()
  releaseType?: string; // Generated for release

  @IsOptional()
  @IsString()
  releaseStatus?: string; // Generated for release
}

// Metadata DTO
export class DatabaseReleaseMetadataDTO {
  @IsNotEmpty()
  @IsString()
  transformedAt: string; // ISO string format

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsOptional()
  @IsString()
  transformerId?: string;

  @IsOptional()
  @IsObject()
  businessRules?: any;

  @IsOptional()
  @IsObject()
  validationResults?: {
    ordersTableValidation?: boolean;
    orderLinesTableValidation?: boolean;
    releaseLinesTableValidation?: boolean;
    missingRequiredFields?: string[];
  };
}

/**
 * Nested release structures
 * These DTOs match the required release format structure
 */

// Template Order structure with full payment details
export class TemplateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplatePaymentDTO)
  payment: TemplatePaymentDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateOrderLineDTO)
  orderLine: TemplateOrderLineDTO[];
}

// Nested Order structure
export class ReleaseOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleasePaymentDTO)
  Payment: ReleasePaymentDTO[];
}

// Template Payment structure with all fields
export class TemplatePaymentDTO {
  @IsOptional()
  @IsObject()
  actions?: Record<string, any>;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;

  @IsOptional()
  messages?: any;

  @IsOptional()
  @IsString()
  orgId?: string;

  @IsOptional()
  @IsString()
  purgeDate?: string;

  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsString()
  paymentGroupId?: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean;

  @IsOptional()
  @IsString()
  alternateOrderId?: string;

  @IsOptional()
  @IsBoolean()
  isAnonymized?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplatePaymentMethodDTO)
  paymentMethod: TemplatePaymentMethodDTO[];
}

export class ReleasePaymentDTO {
  @IsOptional()
  @IsString()
  OrderId?: string;

  @IsOptional()
  @IsString()
  OrgId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleasePaymentMethodDTO)
  PaymentMethod: ReleasePaymentMethodDTO[];
}

// Template Payment Transaction with all fields
export class TemplatePaymentTransactionDTO {
  @IsOptional()
  @IsObject()
  actions?: Record<string, any>;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;

  @IsOptional()
  messages?: any;

  @IsOptional()
  @IsString()
  orgId?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  transactionTypeId?: string;

  @IsOptional()
  @IsString()
  transactionStatusId?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsOptional()
  @IsString()
  gatewayId?: string;

  @IsOptional()
  @IsString()
  gatewayTransactionId?: string;

  @IsOptional()
  @IsString()
  gatewayResponseCode?: string;

  @IsOptional()
  @IsString()
  gatewayResponseMessage?: string;

  @IsOptional()
  @IsString()
  gatewayResponseDate?: string;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeclined?: boolean;

  @IsOptional()
  @IsBoolean()
  isError?: boolean;

  @IsOptional()
  @IsBoolean()
  isVoided?: boolean;

  @IsOptional()
  @IsBoolean()
  isRefunded?: boolean;

  @IsOptional()
  @IsBoolean()
  isSettled?: boolean;

  @IsOptional()
  @IsString()
  settlementDate?: string;

  @IsOptional()
  @IsString()
  authorizationCode?: string;

  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @IsOptional()
  @IsString()
  batchNumber?: string;

  @IsOptional()
  @IsString()
  sequenceNumber?: string;

  @IsOptional()
  @IsString()
  entryMethod?: string;

  @IsOptional()
  @IsString()
  cardType?: string;

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  cardExpiryMonth?: string;

  @IsOptional()
  @IsString()
  cardExpiryYear?: string;

  @IsOptional()
  @IsString()
  cardHolderName?: string;

  @IsOptional()
  @IsString()
  avsResult?: string;

  @IsOptional()
  @IsString()
  cvvResult?: string;

  @IsOptional()
  @IsBoolean()
  isDuplicate?: boolean;

  @IsOptional()
  @IsNumber()
  duplicateWindow?: number;

  @IsOptional()
  @IsBoolean()
  isTest?: boolean;

  @IsOptional()
  @IsString()
  purgeDate?: string;
}

export class ReleasePaymentTransactionDTO {
  @IsOptional()
  @IsString()
  PaymentTransactionId?: string;

  @IsOptional()
  @IsNumber()
  ProcessedAmount?: number;

  @IsOptional()
  @IsString()
  TransactionDate?: string;

  @IsOptional()
  @IsObject()
  TransactionType?: {
    PaymentTransactionTypeId: string;
  };
}

// Template Billing Address with all fields
export class TemplateBillingAddressDTO {
  @IsOptional()
  @IsObject()
  actions?: Record<string, any>;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;

  @IsOptional()
  messages?: any;

  @IsOptional()
  @IsString()
  orgId?: string;

  @IsOptional()
  @IsString()
  addressId?: string;

  @IsOptional()
  @IsString()
  addressTypeId?: string;

  @IsOptional()
  @IsString()
  address1?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  address3?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isAnonymized?: boolean;

  @IsOptional()
  @IsString()
  purgeDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplatePaymentTransactionDTO)
  paymentTransaction: TemplatePaymentTransactionDTO[];
}

// Template Payment Method with all fields
export class TemplatePaymentMethodDTO {
  @IsOptional()
  @IsObject()
  actions?: Record<string, any>;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;

  @IsOptional()
  messages?: any;

  @IsOptional()
  @IsString()
  orgId?: string;

  @IsOptional()
  @IsString()
  paymentMethodId?: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsOptional()
  @IsString()
  alternateCurrencyCode?: string;

  @IsOptional()
  @IsNumber()
  conversionRate?: number;

  @IsOptional()
  @IsNumber()
  alternateCurrencyAmount?: number;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  accountDisplayNumber?: string;

  @IsOptional()
  @IsString()
  nameOnCard?: string;

  @IsOptional()
  @IsString()
  swipeData?: string;

  @IsOptional()
  @IsString()
  cardExpiryMonth?: string;

  @IsOptional()
  @IsString()
  cardExpiryYear?: string;

  @IsOptional()
  @IsString()
  giftCardPin?: string;

  @IsOptional()
  @IsString()
  customerSignature?: string;

  @IsOptional()
  @IsString()
  customerPaySignature?: string;

  @IsOptional()
  @IsNumber()
  changeAmount?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  currentAuthAmount?: number;

  @IsOptional()
  @IsNumber()
  currentSettledAmount?: number;

  @IsOptional()
  @IsNumber()
  currentRefundAmount?: number;

  @IsOptional()
  @IsString()
  chargeSequence?: string;

  @IsOptional()
  @IsBoolean()
  isSuspended?: boolean;

  @IsOptional()
  @IsString()
  entryTypeId?: string;

  @IsOptional()
  @IsString()
  gatewayId?: string;

  @IsOptional()
  @IsString()
  routingNumber?: string;

  @IsOptional()
  @IsString()
  routingDisplayNumber?: string;

  @IsOptional()
  @IsString()
  checkNumber?: string;

  @IsOptional()
  @IsString()
  driversLicenseNumber?: string;

  @IsOptional()
  @IsString()
  driversLicenseState?: string;

  @IsOptional()
  @IsString()
  driversLicenseCountry?: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  businessTaxId?: string;

  @IsOptional()
  @IsNumber()
  checkQuantity?: number;

  @IsOptional()
  @IsNumber()
  originalAmount?: number;

  @IsOptional()
  @IsBoolean()
  isModifiable?: boolean;

  @IsOptional()
  @IsNumber()
  currentFailedAmount?: number;

  @IsOptional()
  @IsString()
  parentOrderId?: string;

  @IsOptional()
  @IsString()
  parentPaymentGroupId?: string;

  @IsOptional()
  @IsString()
  parentPaymentMethodId?: string;

  @IsOptional()
  @IsBoolean()
  isVoided?: boolean;

  @IsOptional()
  @IsBoolean()
  isCopied?: boolean;

  @IsOptional()
  @IsString()
  gatewayAccountId?: string;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsOptional()
  @IsString()
  transactionReferenceId?: string;

  @IsOptional()
  @IsBoolean()
  capturedInEdgeMode?: boolean;

  @IsOptional()
  @IsNumber()
  merchandiseAmount?: number;

  @IsOptional()
  @IsString()
  capturedSource?: string;

  @IsOptional()
  @IsString()
  shopperReference?: string;

  @IsOptional()
  @IsNumber()
  suggestedAmount?: number;

  @IsOptional()
  @IsString()
  purgeDate?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TemplateBillingAddressDTO)
  billingAddress?: TemplateBillingAddressDTO;
}

export class ReleasePaymentMethodDTO {
  @IsOptional()
  @IsString()
  PaymentMethodId?: string;

  @IsOptional()
  @IsNumber()
  Amount?: number;

  @IsOptional()
  @IsString()
  CurrencyCode?: string;

  @IsOptional()
  @IsObject()
  PaymentType?: {
    PaymentTypeId: string;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleasePaymentTransactionDTO)
  PaymentTransaction: ReleasePaymentTransactionDTO[];
}

// Template Allocation for Order Lines
export class TemplateAllocationDTO {
  @IsOptional()
  @IsObject()
  actions?: Record<string, any>;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;

  @IsOptional()
  messages?: any;

  @IsOptional()
  @IsString()
  orgId?: string;

  @IsOptional()
  @IsString()
  allocationId?: string;

  @IsOptional()
  @IsString()
  orderLineId?: string;

  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsOptional()
  @IsString()
  allocationDate?: string;

  @IsOptional()
  @IsString()
  allocationStatusId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean;

  @IsOptional()
  @IsBoolean()
  isReleased?: boolean;

  @IsOptional()
  @IsString()
  releaseDate?: string;

  @IsOptional()
  @IsString()
  purgeDate?: string;
}

// Template Order Line with all fields
export class TemplateOrderLineDTO {
  @IsOptional()
  @IsObject()
  actions?: Record<string, any>;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;

  @IsOptional()
  messages?: any;

  @IsOptional()
  @IsString()
  orgId?: string;

  @IsOptional()
  @IsString()
  orderLineId?: string;

  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @IsNumber()
  lineTotal?: number;

  @IsOptional()
  @IsString()
  orderLineStatusId?: string;

  @IsOptional()
  @IsString()
  fulfillmentStatusId?: string;

  @IsOptional()
  @IsString()
  deliveryMethodId?: string;

  @IsOptional()
  @IsString()
  shippingMethodId?: string;

  @IsOptional()
  @IsString()
  promisedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  requestedDeliveryDate?: string;

  @IsOptional()
  @IsBoolean()
  isGift?: boolean;

  @IsOptional()
  @IsBoolean()
  isTaxIncluded?: boolean;

  @IsOptional()
  @IsBoolean()
  isDiscountable?: boolean;

  @IsOptional()
  @IsBoolean()
  isReturnable?: boolean;

  @IsOptional()
  @IsBoolean()
  isHazmat?: boolean;

  @IsOptional()
  @IsBoolean()
  isPerishable?: boolean;

  @IsOptional()
  @IsBoolean()
  isPreOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  isOnHold?: boolean;

  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean;

  @IsOptional()
  @IsNumber()
  taxAmount?: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  shippingAmount?: number;

  @IsOptional()
  @IsNumber()
  chargeAmount?: number;

  @IsOptional()
  @IsNumber()
  refundAmount?: number;

  @IsOptional()
  @IsNumber()
  fulfilledQuantity?: number;

  @IsOptional()
  @IsNumber()
  cancelledQuantity?: number;

  @IsOptional()
  @IsNumber()
  returnedQuantity?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateAllocationDTO)
  allocation: TemplateAllocationDTO[];
}

// Release Line Allocation
export class ReleaseLineAllocationDTO {
  @IsOptional()
  @IsString()
  allocationId?: string;

  @IsOptional()
  @IsString()
  orderLineId?: string;

  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsOptional()
  @IsString()
  allocationDate?: string;

  @IsOptional()
  @IsString()
  allocationStatusId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean;

  @IsOptional()
  @IsBoolean()
  isReleased?: boolean;

  @IsOptional()
  @IsString()
  releaseDate?: string;
}

// Template Release Line with all fields
export class TemplateReleaseLineDTO {
  @IsOptional()
  @IsNumber()
  cancelledQuantity?: number;

  @IsOptional()
  @IsString()
  serviceLevelCode?: string;

  @IsOptional()
  @IsString()
  lineTypeId?: string;

  @IsOptional()
  @IsNumber()
  orderLineTotalCharges?: number;

  @IsOptional()
  @IsNumber()
  fulfilledQuantity?: number;

  @IsOptional()
  @IsBoolean()
  isReturnable?: boolean;

  @IsOptional()
  @IsBoolean()
  isTaxIncluded?: boolean;

  @IsOptional()
  @IsBoolean()
  isHazmat?: boolean;

  @IsOptional()
  @IsNumber()
  refundPrice?: number;

  @IsOptional()
  @IsNumber()
  taxOverrideValue?: number;

  @IsOptional()
  @IsString()
  maxFulfillmentStatusId?: string;

  @IsOptional()
  @IsBoolean()
  isOnHold?: boolean;

  @IsOptional()
  @IsString()
  itemWebURL?: string;

  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsString()
  shippingMethodId?: string;

  @IsOptional()
  @IsString()
  sellingLocationId?: string;

  @IsOptional()
  @IsBoolean()
  isGift?: boolean;

  @IsOptional()
  @IsString()
  parentOrderLineId?: string;

  @IsOptional()
  @IsNumber()
  totalCharges?: number;

  @IsOptional()
  @IsString()
  parentOrderId?: string;

  @IsOptional()
  @IsString()
  itemStyle?: string;

  @IsOptional()
  @IsString()
  taxExemptId?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  smallImageURI?: string;

  @IsOptional()
  @IsString()
  deliveryMethodId?: string;

  @IsOptional()
  @IsBoolean()
  isDiscountable?: boolean;

  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean;

  @IsOptional()
  @IsString()
  taxOverrideTypeId?: string;

  @IsOptional()
  @IsString()
  itemBrand?: string;

  @IsOptional()
  @IsBoolean()
  isPreOrder?: boolean;

  @IsOptional()
  @IsNumber()
  orderLineTotalDiscounts?: number;

  @IsOptional()
  @IsString()
  parentOrderLineTypeId?: string;

  @IsOptional()
  @IsBoolean()
  isTaxExempt?: boolean;

  @IsOptional()
  @IsString()
  promisedDeliveryDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChargeDetailDTO)
  chargeDetail?: ChargeDetailDTO[];

  @IsOptional()
  @IsBoolean()
  isPerishable?: boolean;

  @IsOptional()
  @IsString()
  latestDeliveryDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NoteDTO)
  note?: NoteDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineAllocationDTO)
  allocation?: ReleaseLineAllocationDTO[];

  @IsOptional()
  @IsString()
  cancelReasonId?: string;

  @IsOptional()
  @IsString()
  releaseLineId?: string;

  @IsOptional()
  @IsString()
  parentItemId?: string;

  @IsOptional()
  @IsBoolean()
  isReturnableAtStore?: boolean;

  @IsOptional()
  @IsString()
  fulfillmentGroupId?: string;

  @IsOptional()
  @IsString()
  uom?: string;

  @IsOptional()
  @IsNumber()
  orderLineSubtotal?: number;

  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @IsString()
  orderLineId?: string;

  @IsOptional()
  @IsNumber()
  totalTaxes?: number;

  @IsOptional()
  @IsNumber()
  orderLineTotalTaxes?: number;

  @IsOptional()
  @IsString()
  requestedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  carrierCode?: string;

  @IsOptional()
  @IsNumber()
  originalUnitPrice?: number;

  @IsOptional()
  @IsNumber()
  totalDiscounts?: number;
}

export class ReleaseLineDTO {
  @IsOptional()
  @IsString()
  ReleaseLineId?: string;

  @IsOptional()
  @IsNumber()
  Quantity?: number;

  @IsOptional()
  @IsNumber()
  ReleaseLineTotal?: number;

  @IsOptional()
  @IsObject()
  OrderLine?: any; // Complex nested structure
}

// Create ProcessInfo DTO
export class ProcessInfoDTO {
  @IsOptional()
  @IsString()
  internalGoodsDescription?: string;

  @IsOptional()
  @IsString()
  accountReceivableCode?: string;

  @IsOptional()
  @IsBoolean()
  isAutoCreateBlocked?: boolean;

  @IsOptional()
  @IsString()
  shipLocationControl?: string;

  @IsOptional()
  @IsString()
  scheduleDeliveryDate?: string;

  @IsOptional()
  @IsString()
  globalLocationNumber?: string;

  @IsOptional()
  @IsString()
  advertisingCode?: string;

  @IsOptional()
  @IsString()
  movementOption?: string;

  @IsOptional()
  @IsString()
  shipmentPlanningScheduleDay?: string;

  @IsOptional()
  @IsBoolean()
  isCartonMinWeight?: boolean;

  @IsOptional()
  @IsBoolean()
  isBackOrdered?: boolean;

  @IsOptional()
  @IsObject()
  extendedFields?: any;

  @IsOptional()
  @IsString()
  waveId?: string;

  @IsOptional()
  @IsObject()
  routingAttributes?: any;

  @IsOptional()
  @IsString()
  planningOriginFacilityId?: string;

  @IsOptional()
  @IsBoolean()
  isAutoConsolidationBlocked?: boolean;

  @IsOptional()
  @IsString()
  designatedShipVia?: string;

  @IsOptional()
  @IsString()
  declaredValueCurrencyCode?: string;

  @IsOptional()
  @IsString()
  billOfLadingBreakAttribute?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  shipmmentPlanningScheduleDay?: string;

  @IsOptional()
  @IsString()
  accountReceivableAccountNumber?: string;

  @IsOptional()
  @IsBoolean()
  lpnCubingIndicator?: boolean;

  @IsOptional()
  @IsObject()
  parentOrder?: any;

  @IsOptional()
  @IsString()
  routeType1?: string;

  @IsOptional()
  @IsString()
  routeType2?: string;

  @IsOptional()
  @IsString()
  secondryMaxicodeAddressNumber?: string;

  @IsOptional()
  @IsString()
  internationalGoodsDescription?: string;

  @IsOptional()
  @IsString()
  advertisingDate?: string;

  @IsOptional()
  @IsString()
  organizationId?: string;

  @IsOptional()
  @IsString()
  routeTo?: string;

  @IsOptional()
  @IsString()
  fedexDutyTaxAccountID?: string;

  @IsOptional()
  @IsString()
  ftsrNumber?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  dsgStaticRouteId?: string;

  @IsOptional()
  @IsString()
  cashOnDeliveryFund?: string;

  @IsOptional()
  @IsBoolean()
  palletCubingIndicator?: boolean;

  @IsOptional()
  @IsString()
  destinationShipThroughLocation?: string;

  @IsOptional()
  @IsNumber()
  declaredValue?: number;

  @IsOptional()
  @IsString()
  customerBrokerAccountNumber?: string;

  @IsOptional()
  @IsString()
  routeWaveNumber?: string;

  @IsOptional()
  @IsString()
  fedexDutyTaxPaymentType?: string;

  @IsOptional()
  @IsString()
  importerDefinition?: string;

  @IsOptional()
  @IsString()
  moveType?: string;

  @IsOptional()
  @IsString()
  freightForwardAccountNumber?: string;

  @IsOptional()
  @IsBoolean()
  isWarehouseTransfer?: boolean;

  @IsOptional()
  @IsBoolean()
  isShipmentDocumentsOnly?: boolean;

  @IsOptional()
  @IsString()
  customerDepartment?: string;

  @IsOptional()
  @IsString()
  transportationWaveOptionId?: string;

  @IsOptional()
  @IsString()
  planningDestinationFacilityId?: string;

  @IsOptional()
  @IsString()
  pk?: string;

  @IsOptional()
  @IsString()
  primaryMaxicodeAddressNumber?: string;

  @IsOptional()
  @IsString()
  designatedEquipmentId?: string;
}

// ChargeDetail DTO
export class ChargeDetailDTO {
  @IsOptional()
  @IsBoolean()
  isProrated?: boolean;

  @IsOptional()
  @IsBoolean()
  isInformational?: boolean;

  @IsOptional()
  @IsString()
  taxCode?: string;

  @IsOptional()
  @IsNumber()
  chargeTotal?: number;

  @IsOptional()
  @IsString()
  headerChargeDetailId?: string;

  @IsOptional()
  @IsString()
  chargeSubTypeId?: string;

  @IsOptional()
  @IsString()
  chargeDisplayName?: string;

  @IsOptional()
  @IsObject()
  extended?: any;

  @IsOptional()
  @IsString()
  chargeDetailId?: string;

  @IsOptional()
  @IsString()
  relatedChargeType?: string;

  @IsOptional()
  @IsString()
  chargeTypeId?: string;

  @IsOptional()
  @IsString()
  relatedChargeDetailId?: string;
}

// Note DTO
export class NoteDTO {
  @IsOptional()
  @IsString()
  noteId?: string;

  @IsOptional()
  @IsString()
  noteTypeId?: string;

  @IsOptional()
  @IsString()
  noteText?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  createdTimestamp?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  updatedTimestamp?: string;
}

// Main OriginalPayload structure
export class OriginalPayloadDTO {
  // Header-level fields from template with PascalCase serialization
  @IsOptional()
  @IsString()
  @Expose({ name: 'ServiceLevelCode' })
  serviceLevelCode?: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'Email' })
  email?: string;

  @IsOptional()
  @IsString()
  maxFulfillmentStatusId?: string;

  @IsOptional()
  @IsBoolean()
  isOnHold?: boolean;

  @IsOptional()
  @IsBoolean()
  isConfirmed?: boolean;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'OrderSubtotal' })
  orderSubtotal?: number;

  @IsOptional()
  @IsString()
  modeId?: string;

  @IsOptional()
  @IsString()
  sellingLocationId?: string;

  @IsOptional()
  @IsString()
  currencyCode?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsString()
  customerFirstName?: string;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'ReleaseTotal' })
  releaseTotal?: number;

  @IsOptional()
  @IsObject()
  extendedFields?: {
    cancelAllowed?: boolean;
  };

  @IsOptional()
  @IsNumber()
  totalCharges?: number;

  @IsOptional()
  @IsString()
  externalShipFromLocationId?: string;

  @IsOptional()
  @IsString()
  taxExemptId?: string;

  @IsOptional()
  @IsString()
  addressId?: string;

  // Missing top-level fields from expected template
  @IsOptional()
  @IsString()
  @Expose({ name: 'DocTypeId' })
  docTypeId?: string;

  // Address fields
  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  organizationId?: string;

  @IsOptional()
  @IsString()
  invoiceId?: string;

  @IsOptional()
  @IsString()
  county?: string;

  @IsOptional()
  @IsBoolean()
  isPostVoided?: boolean;

  @IsOptional()
  @IsString()
  alternateOrderId?: string;

  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  orderTypeId?: string;

  @IsOptional()
  @IsString()
  paymentStatusId?: string;

  @IsOptional()
  @IsString()
  customerCommPref?: string;

  @IsOptional()
  @IsString()
  sellingChannelId?: string;

  @IsOptional()
  @IsString()
  minFulfillmentStatusId?: string;

  @IsOptional()
  @IsString()
  releaseType?: string;

  @IsOptional()
  @IsString()
  createOrderTimeStamp?: string;

  @IsOptional()
  @IsString()
  externalOrganizationId?: string;

  @IsOptional()
  @IsString()
  effectiveRank?: string;

  @IsOptional()
  @IsString()
  shipToLocationId?: string;

  @IsOptional()
  @IsString()
  deliveryMethod?: string;

  @IsOptional()
  @IsNumber()
  noOfDeliveryLines?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  shipViaId?: string;

  @IsOptional()
  @IsString()
  address3?: string;

  @IsOptional()
  @IsString()
  address1?: string;

  @IsOptional()
  @IsString()
  cancelReasonId?: string;

  @IsOptional()
  @IsString()
  postVoIdReasonId?: string;

  @IsOptional()
  @IsString()
  orderLocale?: string;

  @IsOptional()
  @IsNumber()
  orderTotalCharges?: number;

  @IsOptional()
  @IsNumber()
  totalTaxes?: number;

  @IsOptional()
  @IsString()
  customerLastName?: string;

  @IsOptional()
  @IsString()
  capturedDate?: string;

  @IsOptional()
  @IsString()
  carrierCode?: string;

  @IsOptional()
  @IsString()
  addressType?: string;

  @IsOptional()
  @IsNumber()
  orderTotal?: number;

  @IsOptional()
  @IsNumber()
  totalDiscounts?: number;

  // Nested structures
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TemplateOrderDTO)
  order?: TemplateOrderDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateReleaseLineDTO)
  releaseLine: TemplateReleaseLineDTO[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessInfoDTO)
  processInfo?: ProcessInfoDTO;
}

// Main release output DTO
export class ReleaseOutputDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => OriginalPayloadDTO)
  OriginalPayload: OriginalPayloadDTO;
}

// Main Release Output DTO with database compatibility
export class DatabaseCompatibleReleaseOutputDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DatabaseReleaseHeaderDTO)
  header: DatabaseReleaseHeaderDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DatabaseReleaseLineDTO)
  lines: DatabaseReleaseLineDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DatabasePaymentMethodDTO)
  payments: DatabasePaymentMethodDTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DatabaseReleaseMetadataDTO)
  metadata: DatabaseReleaseMetadataDTO;

  // Database insertion utilities
  @IsOptional()
  @IsObject()
  databaseObjects?: {
    ordersTableData?: Record<string, any>;
    orderLinesTableData?: Record<string, any>[];
    releaseLinesTableData?: Record<string, any>[];
    paymentsTableData?: Record<string, any>[];
    paymentMethodsTableData?: Record<string, any>[];
  };
}