import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsISO8601,
  IsArray,
  ValidateNested,
  Min,
  Max,
  MaxLength,
  Length,
  IsObject,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

// PMP Order Input DTO
export class PMPOrderInputDto {
  @IsString()
  @IsNotEmpty()
  BU: string;

  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  CapturedDate: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  CurrencyCode: string;

  @IsOptional()
  @IsString()
  CustomerId?: string | null;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  CustomerEmail: string;

  @IsString()
  @IsOptional()
  DoNotReleaseBefore?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  CustomerFirstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  CustomerLastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  CustomerPhone: string;

  @IsString()
  @IsOptional()
  CustomerTypeId?: string;

  @ValidateNested()
  @Type(() => DocTypeDto)
  DocType: DocTypeDto;

  @IsBoolean()
  IsOnHold: boolean;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  OrderLocale: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderHoldDto)
  OrderHold: OrderHoldDto[];

  @IsBoolean()
  CancelAllowed: boolean;

  @ValidateNested()
  @Type(() => OrderActionsDto)
  OrderActions: OrderActionsDto;

  @ValidateNested()
  @Type(() => OrderExtension1Dto)
  OrderExtension1: OrderExtension1Dto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderChargeDetailDto)
  OrderChargeDetail: OrderChargeDetailDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderTaxDetailDto)
  OrderTaxDetail: OrderTaxDetailDto[];

  @ValidateNested()
  @Type(() => OrderTypeDto)
  OrderType: OrderTypeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderNoteDto)
  OrderNote: OrderNoteDto[];

  @ValidateNested()
  @Type(() => SellingChannelDto)
  SellingChannel: SellingChannelDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  OrderLine: OrderLineDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  Payment: PaymentDto[];

  @IsString()
  @IsNotEmpty()
  OrderId: string;

  @IsString()
  @IsNotEmpty()
  AlternateOrderId: string;

  @IsString()
  @IsNotEmpty()
  OrgId: string;
}

// Supporting DTOs
export class DocTypeDto {
  @IsString()
  @IsNotEmpty()
  DocTypeId: string;
}

export class OrderHoldDto {
  @IsString()
  @IsNotEmpty()
  HoldTypeId: string;

  @IsString()
  @IsNotEmpty()
  StatusId: string;

  @IsString()
  @IsNotEmpty()
  ResolveReasonId: string;
}

export class OrderActionsDto {
  @IsBoolean()
  IsAlreadyPriced: boolean;

  @IsBoolean()
  IsAlreadyCharged: boolean;

  @IsBoolean()
  IsAlreadyTaxed: boolean;
}

export class OrderExtension1Dto {
  @ValidateNested()
  @Type(() => ExtendedOrderDto)
  Extended: ExtendedOrderDto;
}

export class ExtendedOrderDto {
  @IsBoolean()
  FullTaxInvoice: boolean;

  @IsBoolean()
  AllowSubstitution: boolean;

  @IsBoolean()
  CancelAllowed: boolean;

  @IsOptional()
  @IsString()
  TaxId?: string;

  @IsOptional()
  @IsString()
  CompanyName?: string;

  @IsOptional()
  @IsString()
  BranchNo?: string;

  @IsString()
  @IsNotEmpty()
  ConfirmPaymentId: string;

  @IsBoolean()
  IsPSConfirmed: boolean;

  @IsOptional()
  @IsString()
  ExternalMPSellerId?: string | null;
}

export class OrderChargeDetailDto {
  @IsString()
  @IsNotEmpty()
  ChargeDisplayName: string;

  @IsString()
  @IsOptional()
  ChargeReferenceId?: string;

  @IsString()
  @IsNotEmpty()
  ChargeDetailId: string;

  @IsNumber()
  ChargeTotal: number | string;

  @ValidateNested()
  @Type(() => ChargeTypeDto)
  ChargeType: ChargeTypeDto;

  @IsBoolean()
  IsTaxIncluded: boolean;

  @IsBoolean()
  IsPostReturn: boolean;

  @IsBoolean()
  IsInformational: boolean;
}

export class ChargeTypeDto {
  @IsString()
  @IsNotEmpty()
  ChargeTypeId: string;
}

export class OrderTaxDetailDto {
  @IsBoolean()
  IsInformational: boolean;

  @IsNumber()
  @Min(0)
  TaxAmount: number;

  @IsOptional()
  @IsString()
  TaxCode?: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  TaxRate: number;

  @IsString()
  @IsNotEmpty()
  TaxTypeId: string;

  @IsNumber()
  @Min(0)
  TaxableAmount: number;
}

export class OrderTypeDto {
  @IsString()
  @IsNotEmpty()
  OrderTypeId: string;
}

export class OrderNoteDto {
  @ValidateNested()
  @Type(() => NoteTypeDto)
  NoteType: NoteTypeDto;

  @ValidateNested()
  @Type(() => NoteCategoryDto)
  NoteCategory: NoteCategoryDto;

  @IsString()
  @IsOptional()
  NoteText?: string;
}

export class NoteTypeDto {
  @IsString()
  @IsNotEmpty()
  NoteTypeId: string;
}

export class NoteCategoryDto {
  @IsString()
  @IsNotEmpty()
  NoteCategoryId: string;
}

export class SellingChannelDto {
  @IsString()
  @IsNotEmpty()
  SellingChannelId: string;
}

export class OrderLineDto {
  @ValidateNested()
  @Type(() => DeliveryMethodDto)
  DeliveryMethod: DeliveryMethodDto;

  @IsBoolean()
  IsGift: boolean;

  @IsBoolean()
  IsTaxIncluded: boolean;

  @IsString()
  @IsNotEmpty()
  ItemId: string;

  @IsString()
  @IsNotEmpty()
  OrderLineId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineNoteDto)
  OrderLineNote: OrderLineNoteDto[];

  @IsArray()
  OrderLineChargeDetail: any[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineTaxDetailDto)
  OrderLineTaxDetail: OrderLineTaxDetailDto[];

  @ValidateNested()
  @Type(() => OrderLinePromisingInfoDto)
  OrderLinePromisingInfo: OrderLinePromisingInfoDto;

  @IsString()
  @IsOptional()
  PromisedDeliveryDate?: string;

  @IsString()
  @IsNotEmpty()
  UOM: string;

  @IsInt()
  @Min(1)
  Quantity: number;

  @IsNumber()
  @Min(0)
  UnitPrice: number;

  @IsNumber()
  @Min(0)
  OriginalUnitPrice: number;

  @IsString()
  @IsNotEmpty()
  ShippingMethodId: string;

  @ValidateNested()
  @Type(() => ShipToAddressDto)
  ShipToAddress: ShipToAddressDto;

  @ValidateNested()
  @Type(() => OrderLineExtension1Dto)
  OrderLineExtension1: OrderLineExtension1Dto;

  @IsString()
  @IsNotEmpty()
  ReleaseGroupId: string;
}

export class DeliveryMethodDto {
  @IsString()
  @IsNotEmpty()
  DeliveryMethodId: string;
}

export class OrderLineNoteDto {
  @IsString()
  @IsNotEmpty()
  NoteId: string;

  @ValidateNested()
  @Type(() => NoteTypeDto)
  NoteType: NoteTypeDto;

  @ValidateNested()
  @Type(() => NoteCategoryDto)
  NoteCategory: NoteCategoryDto;

  @IsString()
  @IsOptional()
  NoteText?: string;
}

export class OrderLineTaxDetailDto {
  @IsBoolean()
  IsInformational: boolean;

  @IsNumber()
  @Min(0)
  TaxAmount: number;

  @IsOptional()
  @IsString()
  TaxCode?: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  TaxRate: number;

  @IsString()
  @IsNotEmpty()
  TaxTypeId: string;

  @IsNumber()
  @Min(0)
  TaxableAmount: number;
}

export class OrderLinePromisingInfoDto {
  @IsString()
  @IsNotEmpty()
  ShipFromLocationId: string;

  @IsBoolean()
  IsForceAllocate: boolean;
}

export class ShipToAddressDto {
  @ValidateNested()
  @Type(() => AddressDto)
  Address: AddressDto;

  @ValidateNested()
  @Type(() => ExtendedAddressDto)
  Extended: ExtendedAddressDto;

  @IsBoolean()
  IsAddressVerified: boolean;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Address1: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  Address2?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  Address3?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  City: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  County?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  Country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  LastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  Phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  PostalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  State: string;

  @IsOptional()
  @IsString()
  BranchNo?: string;

  @IsOptional()
  @IsString()
  TaxId?: string;

  @IsOptional()
  @IsString()
  CompanyName?: string;
}

export class ExtendedAddressDto {
  @IsString()
  @IsNotEmpty()
  AddressRef: string;
}

export class OrderLineExtension1Dto {
  @ValidateNested()
  @Type(() => ExtendedLineDto)
  Extended: ExtendedLineDto;
}

export class ExtendedLineDto {
  @IsBoolean()
  IsBundle: boolean;

  @IsBoolean()
  IsWeightItem: boolean;

  @IsBoolean()
  IsSubstitution: boolean;

  @IsBoolean()
  IsGiftWrapping: boolean;

  @IsBoolean()
  IsGWP: boolean;

  @IsOptional()
  @IsString()
  PackItemDescriptionTH?: string;

  @IsNumber()
  @Min(0)
  PackUnitPrice: number;

  @IsInt()
  @Min(1)
  PackOrderedQty: number;

  @IsInt()
  @Min(1)
  NumberOfPack: number;

  @IsString()
  @IsNotEmpty()
  ProductNameTH: string;

  @IsString()
  @IsNotEmpty()
  ProductNameEN: string;

  @IsOptional()
  @IsString()
  BundleRefId?: string;

  @IsOptional()
  @IsString()
  SlotBookingId?: string;

  @IsOptional()
  @IsString()
  @IsISO8601()
  SlotBookingFrom?: string;

  @IsOptional()
  @IsString()
  @IsISO8601()
  SlotBookingTo?: string;

  @IsOptional()
  @IsString()
  PromotionType?: string;

  @IsOptional()
  @IsString()
  PromotionId?: string;
}

export class PaymentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDto)
  PaymentMethod: PaymentMethodDto[];

  @ValidateNested()
  @Type(() => ProcessingModeDto)
  ProcessingMode: ProcessingModeDto;
}

export class PaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  PaymentMethodId: string;

  @IsNumber()
  @Min(0)
  Amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  CurrencyCode: string;

  @IsString()
  @IsNotEmpty()
  GatewayId: string;

  @ValidateNested()
  @Type(() => PaymentTypeDto)
  PaymentType: PaymentTypeDto;

  @IsNumber()
  @Min(0)
  CurrentSettledAmount: number;

  @IsBoolean()
  IsCopied: boolean;

  @IsBoolean()
  IsModifiable: boolean;

  @IsBoolean()
  IsSuspended: boolean;

  @IsBoolean()
  IsVoided: boolean;

  @ValidateNested()
  @Type(() => BillingAddressDto)
  BillingAddress: BillingAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentTransactionDto)
  PaymentTransaction: PaymentTransactionDto[];
}

export class PaymentTypeDto {
  @IsString()
  @IsNotEmpty()
  PaymentTypeId: string;
}

export class BillingAddressDto {
  @ValidateNested()
  @Type(() => AddressDto)
  Address: AddressDto;

  @ValidateNested()
  @Type(() => ExtendedAddressDto)
  Extended: ExtendedAddressDto;
}

export class PaymentTransactionDto {
  @IsString()
  @IsNotEmpty()
  PaymentTransactionId: string;

  @IsBoolean()
  IsActivation: boolean;

  @IsBoolean()
  IsActive: boolean;

  @IsBoolean()
  IsCopied: boolean;

  @IsBoolean()
  IsValidForRefund: boolean;

  @IsString()
  @IsNotEmpty()
  OrderId: string;

  @IsString()
  @IsNotEmpty()
  ReconciliationId: string;

  @IsString()
  @IsNotEmpty()
  RequestId: string;

  @IsString()
  @IsNotEmpty()
  RequestToken: string;

  @IsNumber()
  @Min(0)
  ProcessedAmount: number;

  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  TransactionDate: string;

  @ValidateNested()
  @Type(() => PaymentResponseStatusDto)
  PaymentResponseStatus: PaymentResponseStatusDto;

  @ValidateNested()
  @Type(() => PaymentTransactionStatusDto)
  Status: PaymentTransactionStatusDto;

  @ValidateNested()
  @Type(() => PaymentTransmissionStatusDto)
  TransmissionStatus: PaymentTransmissionStatusDto;

  @IsNumber()
  @Min(0)
  RequestedAmount: number;

  @ValidateNested()
  @Type(() => PaymentTransactionTypeDto)
  TransactionType: PaymentTransactionTypeDto;
}

export class PaymentResponseStatusDto {
  @IsString()
  @IsNotEmpty()
  PaymentResponseStatusId: string;
}

export class PaymentTransactionStatusDto {
  @IsString()
  @IsNotEmpty()
  PaymentTransactionStatusId: string;
}

export class PaymentTransmissionStatusDto {
  @IsString()
  @IsNotEmpty()
  PaymentTransmissionStatusId: string;
}

export class PaymentTransactionTypeDto {
  @IsString()
  @IsNotEmpty()
  PaymentTransactionTypeId: string;
}

export class ProcessingModeDto {
  @IsString()
  @IsNotEmpty()
  ProcessingModeId: string;
}
