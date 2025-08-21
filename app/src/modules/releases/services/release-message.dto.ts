import { Type } from 'class-transformer';
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

// Address Format
export class AddressFormatDTO {
  @IsOptional()
  @IsObject()
  Actions?: any;

  @IsOptional()
  @IsString()
  PK?: string;

  @IsOptional()
  @IsString()
  CreatedBy?: string;

  @IsOptional()
  @IsString()
  CreatedTimestamp?: string;

  @IsOptional()
  @IsString()
  UpdatedBy?: string;

  @IsOptional()
  @IsString()
  UpdatedTimestamp?: string;

  @IsOptional()
  @IsString()
  Messages?: string;

  @IsOptional()
  @IsString()
  OrgId?: string;

  @IsOptional()
  @IsString()
  AddressId?: string;

  @IsOptional()
  @IsString()
  AddressLine1?: string;

  @IsOptional()
  @IsString()
  AddressLine2?: string;

  @IsOptional()
  @IsString()
  AddressLine3?: string;

  @IsOptional()
  @IsString()
  City?: string;

  @IsOptional()
  @IsString()
  State?: string;

  @IsOptional()
  @IsString()
  ZipCode?: string;

  @IsOptional()
  @IsString()
  Country?: string;

  @IsOptional()
  @IsString()
  DaytimePhone?: string;

  @IsOptional()
  @IsString()
  EveningPhone?: string;

  @IsOptional()
  @IsString()
  MobilePhone?: string;

  @IsOptional()
  @IsString()
  FirstName?: string;

  @IsOptional()
  @IsString()
  LastName?: string;

  @IsOptional()
  @IsString()
  Company?: string;

  @IsOptional()
  @IsString()
  EmailId?: string;

  @IsOptional()
  @IsString()
  Title?: string;

  @IsOptional()
  @IsString()
  PurgeDate?: string;
}

// Payment Method Format
export class PaymentMethodFormatDTO {
  @IsOptional()
  @IsObject()
  Actions?: any;

  @IsOptional()
  @IsString()
  PK?: string;

  @IsOptional()
  @IsString()
  CreatedBy?: string;

  @IsOptional()
  @IsString()
  CreatedTimestamp?: string;

  @IsOptional()
  @IsString()
  UpdatedBy?: string;

  @IsOptional()
  @IsString()
  UpdatedTimestamp?: string;

  @IsOptional()
  @IsString()
  Messages?: string;

  @IsOptional()
  @IsString()
  OrgId?: string;

  @IsOptional()
  @IsString()
  PaymentMethodId?: string;

  @IsOptional()
  @IsString()
  CurrencyCode?: string;

  @IsOptional()
  @IsString()
  AlternateCurrencyCode?: string;

  @IsOptional()
  @IsNumber()
  ConversionRate?: number;

  @IsOptional()
  @IsNumber()
  AlternateCurrencyAmount?: number;

  @IsOptional()
  @IsString()
  AccountNumber?: string;

  @IsOptional()
  @IsString()
  AccountDisplayNumber?: string;

  @IsOptional()
  @IsString()
  NameOnCard?: string;

  @IsOptional()
  @IsString()
  SwipeData?: string;

  @IsOptional()
  @IsString()
  CardExpiryMonth?: string;

  @IsOptional()
  @IsString()
  CardExpiryYear?: string;

  @IsOptional()
  @IsString()
  GiftCardPin?: string;

  @IsOptional()
  @IsString()
  CustomerSignature?: string;

  @IsOptional()
  @IsString()
  CustomerPaySignature?: string;

  @IsOptional()
  @IsNumber()
  ChangeAmount?: number;

  @IsOptional()
  @IsNumber()
  Amount?: number;

  @IsOptional()
  @IsNumber()
  CurrentAuthAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrentSettledAmount?: number;

  @IsOptional()
  @IsNumber()
  CurrentRefundAmount?: number;

  @IsOptional()
  @IsString()
  ChargeSequence?: string;

  @IsOptional()
  @IsBoolean()
  IsSuspended?: boolean;

  @IsOptional()
  @IsString()
  EntryTypeId?: string;

  @IsOptional()
  @IsString()
  GatewayId?: string;

  @IsOptional()
  @IsString()
  RoutingNumber?: string;

  @IsOptional()
  @IsString()
  RoutingDisplayNumber?: string;

  @IsOptional()
  @IsString()
  CheckNumber?: string;

  @IsOptional()
  @IsString()
  DriversLicenseNumber?: string;

  @IsOptional()
  @IsString()
  DriversLicenseState?: string;

  @IsOptional()
  @IsString()
  DriversLicenseCountry?: string;

  @IsOptional()
  @IsString()
  BusinessName?: string;

  @IsOptional()
  @IsString()
  BusinessTaxId?: string;

  @IsOptional()
  @IsString()
  CheckQuantity?: string;

  @IsOptional()
  @IsNumber()
  OriginalAmount?: number;

  @IsOptional()
  @IsBoolean()
  IsModifiable?: boolean;

  @IsOptional()
  @IsNumber()
  CurrentFailedAmount?: number;

  @IsOptional()
  @IsString()
  ParentOrderId?: string;

  @IsOptional()
  @IsString()
  ParentPaymentGroupId?: string;

  @IsOptional()
  @IsString()
  ParentPaymentMethodId?: string;

  @IsOptional()
  @IsBoolean()
  IsVoided?: boolean;

  @IsOptional()
  @IsBoolean()
  IsCopied?: boolean;

  @IsOptional()
  @IsString()
  GatewayAccountId?: string;

  @IsOptional()
  @IsString()
  LocationId?: string;

  @IsOptional()
  @IsString()
  TransactionReferenceId?: string;

  @IsOptional()
  @IsBoolean()
  CapturedInEdgeMode?: boolean;

  @IsOptional()
  @IsNumber()
  MerchandiseAmount?: number;

  @IsOptional()
  @IsString()
  CapturedSource?: string;

  @IsOptional()
  @IsString()
  ShopperReference?: string;

  @IsOptional()
  @IsNumber()
  SuggestedAmount?: number;

  @IsOptional()
  @IsString()
  PurgeDate?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressFormatDTO)
  BillingAddress?: AddressFormatDTO;
}

// Payment Format
export class PaymentFormatDTO {
  @IsOptional()
  @IsObject()
  Actions?: any;

  @IsOptional()
  @IsString()
  PK?: string;

  @IsOptional()
  @IsString()
  CreatedBy?: string;

  @IsOptional()
  @IsString()
  CreatedTimestamp?: string;

  @IsOptional()
  @IsString()
  UpdatedBy?: string;

  @IsOptional()
  @IsString()
  UpdatedTimestamp?: string;

  @IsOptional()
  @IsString()
  Messages?: string;

  @IsOptional()
  @IsString()
  OrgId?: string;

  @IsOptional()
  @IsString()
  PurgeDate?: string;

  @IsOptional()
  @IsString()
  OrderId?: string;

  @IsOptional()
  @IsString()
  PaymentGroupId?: string;

  @IsOptional()
  @IsString()
  CustomerId?: string;

  @IsOptional()
  @IsBoolean()
  IsCancelled?: boolean;

  @IsOptional()
  @IsString()
  AlternateOrderId?: string;

  @IsOptional()
  @IsBoolean()
  IsAnonymized?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodFormatDTO)
  PaymentMethod?: PaymentMethodFormatDTO[];
}

// Order Format
export class OrderDTO {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentFormatDTO)
  Payment?: PaymentFormatDTO[];
}

// Manhattan Active Omni Release Output Format (matches sample exactly)
export class ManhattanReleaseOutputDTO {
  @IsOptional()
  @IsString()
  ServiceLevelCode?: string;

  @IsOptional()
  @IsString()
  Email?: string;

  @IsOptional()
  @IsString()
  MaxFulfillmentStatusId?: string;

  @IsOptional()
  @IsBoolean()
  IsOnHold?: boolean;

  @IsOptional()
  @IsBoolean()
  IsConfirmed?: boolean;

  @IsOptional()
  @IsNumber()
  OrderSubtotal?: number;

  @IsOptional()
  @IsString()
  ModeId?: string;

  @IsOptional()
  @IsString()
  SellingLocationId?: string;

  @IsOptional()
  @IsString()
  CurrencyCode?: string;

  @IsOptional()
  @IsString()
  CustomerPhone?: string;

  @IsOptional()
  @IsString()
  CustomerFirstName?: string;

  @IsOptional()
  @IsNumber()
  ReleaseTotal?: number;

  @IsOptional()
  @IsObject()
  ExtendedFields?: any;

  @IsOptional()
  @IsNumber()
  TotalCharges?: number;

  @IsOptional()
  @IsString()
  ExternalShipFromLocationId?: string;

  @IsOptional()
  @IsString()
  TaxExemptId?: string;

  @IsOptional()
  @IsString()
  AddressId?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderDTO)
  Order?: OrderDTO;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineDTO)
  Lines?: ReleaseLineDTO[];
}

// Legacy DTOs for backward compatibility
export class AddressDTO {
  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  address3?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  county?: string;

  @IsNotEmpty()
  @IsString()
  hash: string; // MD5 hash for deduplication
}

export class AllocationDTO {
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
  @Min(1, { message: 'Allocated quantity must be positive' })
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

export class PaymentMethodDTO {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

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
}

export class ReleaseLineDTO {
  @IsNotEmpty()
  @IsString()
  releaseLineId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be positive' })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Unit price cannot be negative' })
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  lineTotal: number;

  @IsOptional()
  @IsNumber()
  taxAmount?: number;

  @IsOptional()
  @IsNumber()
  taxableAmount?: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  shippingAmount?: number;

  @IsOptional()
  @IsString()
  fulfillmentType?: string;

  @IsOptional()
  @IsString()
  lineStatus?: string;

  @IsOptional()
  @IsString()
  requestedDate?: string; // ISO string format

  @IsOptional()
  @IsString()
  promisedDate?: string; // ISO string format

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AllocationDTO)
  allocations: AllocationDTO[];
}

export class ReleaseHeaderDTO {
  @IsNotEmpty()
  @IsString()
  releaseId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsString()
  orderType: string;

  @IsNotEmpty()
  @IsString()
  orderStatus: string;

  @IsNotEmpty()
  @IsString()
  orderDate: string; // ISO string format

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  customerType?: string;

  @IsOptional()
  @IsString()
  orderSource?: string;

  @IsOptional()
  @IsString()
  orderChannel?: string;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  subTotal: number;

  @IsOptional()
  @IsNumber()
  totalTax?: number;

  @IsOptional()
  @IsNumber()
  totalShipping?: number;

  @IsOptional()
  @IsNumber()
  totalDiscount?: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  billingAddress: AddressDTO;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  shippingAddress: AddressDTO;
}

export class ReleaseMetadataDTO {
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
}

export class ReleaseOutputDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ReleaseHeaderDTO)
  header: ReleaseHeaderDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineDTO)
  lines: ReleaseLineDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDTO)
  payments: PaymentMethodDTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ReleaseMetadataDTO)
  metadata: ReleaseMetadataDTO;
}
