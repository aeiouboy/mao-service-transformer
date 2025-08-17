import {
  IsNumber,
  IsString,
  IsOptional,
  IsInt,
  IsDefined,
  IsObject,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExtendedLineDTO {
  @IsDefined()
  @IsBoolean()
  IsBundle: boolean;

  @IsDefined()
  @IsBoolean()
  IsWeightItem: boolean;

  @IsDefined()
  @IsBoolean()
  IsSubstitution: boolean;

  @IsDefined()
  @IsBoolean()
  IsGiftWrapping: boolean;

  @IsDefined()
  @IsBoolean()
  IsGWP: boolean;

  @IsOptional()
  @IsString()
  PackItemDescriptionTH?: string;

  @IsOptional()
  @IsNumber()
  PackUnitPrice?: number | null;

  @IsDefined()
  @IsInt()
  PackOrderedQty: number;

  @IsDefined()
  @IsInt()
  NumberOfPack: number;

  @IsString()
  ProductNameTH: string;

  @IsString()
  ProductNameEN: string;

  @IsOptional()
  @IsString()
  BundleRefId?: string | null;

  @IsOptional()
  @IsString()
  SlotBookingId?: string;

  @IsOptional()
  @IsString()
  SlotBookingFrom?: string;

  @IsOptional()
  @IsString()
  SlotBookingTo?: string;

  @IsOptional()
  @IsString()
  PromotionType?: string;

  @IsOptional()
  @IsString()
  PromotionId?: string;
}

export class OrderLineExtension1DTO {
  @IsDefined()
  @IsObject()
  Extended: ExtendedLineDTO;
}
export class AddressDTO {
  @IsString()
  Address1: string;

  @IsOptional()
  @IsString()
  Address2?: string;

  @IsOptional()
  @IsString()
  Address3?: string;

  @IsString()
  City: string;

  @IsOptional()
  @IsString()
  County?: string;

  @IsString()
  Email: string;

  @IsString()
  Country: string;

  @IsString()
  FirstName: string;

  @IsString()
  LastName: string;

  @IsString()
  Phone: string;

  @IsString()
  PostalCode: string;

  @IsString()
  State: string;
}
export class ExtendedAddressDTO {
  @IsString()
  AddressRef: string;
}
export class BillingAddressDTO {
  @IsDefined()
  @IsObject()
  Address: AddressDTO;

  @IsDefined()
  @IsObject()
  Extended: ExtendedAddressDTO;
}
export class PaymentTypeDTO {
  @IsString()
  PaymentTypeId: string;
}
export class PaymentResponseStatusDTO {
  @IsString()
  PaymentResponseStatusId: string;
}
export class PaymentTransactionStatusDTO {
  @IsString()
  PaymentTransactionStatusId: string;
}
export class PaymentTransmissionStatusDTO {
  @IsString()
  PaymentTransmissionStatusId: string;
}
export class PaymentTransactionTypeDTO {
  @IsString()
  PaymentTransactionTypeId: string;
}

export class PaymentTransactionDTO {
  @IsString()
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
  OrderId: string;

  @IsString()
  ReconciliationId: string;

  @IsString()
  RequestId: string;

  @IsString()
  RequestToken: string;

  @IsNumber()
  ProcessedAmount: number;

  @IsString()
  TransactionDate: string;

  @IsDefined()
  @IsObject()
  PaymentResponseStatus: PaymentResponseStatusDTO;

  @IsDefined()
  @IsObject()
  Status: PaymentTransactionStatusDTO;

  @IsDefined()
  @IsObject()
  TransmissionStatus: PaymentTransmissionStatusDTO;

  @IsNumber()
  RequestedAmount: number;

  @IsDefined()
  @IsObject()
  TransactionType: PaymentTransactionTypeDTO;
}

export class PaymentMethodDTO {
  @IsString()
  PaymentMethodId: string;

  @IsNumber()
  Amount: number;

  @IsString()
  CurrencyCode: string;

  @IsString()
  GatewayId: string;

  @IsDefined()
  @IsObject()
  PaymentType: PaymentTypeDTO;

  @IsNumber()
  CurrentSettledAmount: number;

  @IsBoolean()
  IsCopied: boolean;

  @IsBoolean()
  IsModifiable: boolean;

  @IsBoolean()
  IsSuspended: boolean;

  @IsBoolean()
  IsVoided: boolean;

  @IsDefined()
  @IsObject()
  BillingAddress: BillingAddressDTO;

  @IsArray()
  @ArrayMinSize(1)
  PaymentTransaction: PaymentTransactionDTO[];
}
export class ProcessingModeDTO {
  @IsString()
  ProcessingModeId: string;
}
export class PaymentDTO {
  @IsArray()
  @ArrayMinSize(1)
  PaymentMethod: PaymentMethodDTO[];

  @IsDefined()
  @IsObject()
  ProcessingMode: ProcessingModeDTO;
}

export class ShipToAddressDTO {
  @IsDefined()
  @IsObject()
  Address: AddressDTO;

  @IsDefined()
  @IsBoolean()
  IsAddressVerified: boolean;

  @IsDefined()
  @IsObject()
  Extended: ExtendedAddressDTO;
}

export class OrderLineNoteDTO {
  @IsString()
  NoteId: string;

  @IsDefined()
  @IsObject()
  NoteType: {
    NoteTypeId: string;
  };

  @IsDefined()
  @IsObject()
  NoteCategory: {
    NoteCategoryId: string;
  };

  @IsOptional()
  @IsString()
  NoteText?: string;
}

export class OrderLinePromisingInfoDTO {
  @IsString()
  ShipFromLocationId: string;

  @IsDefined()
  @IsBoolean()
  IsForceAllocate: boolean;
}

export class OrderLineDTO {
  @IsDefined()
  @IsObject()
  DeliveryMethod: {
    DeliveryMethodId: string;
  };

  @IsDefined()
  @IsBoolean()
  IsGift: boolean;

  @IsDefined()
  @IsBoolean()
  IsTaxIncluded: boolean;

  @IsString()
  ItemId: string;

  @IsString()
  OrderLineId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineNoteDTO)
  OrderLineNote: OrderLineNoteDTO[];

  @IsArray()
  OrderLineChargeDetail: any[];

  @IsArray()
  OrderLineTaxDetail: any[];

  @IsDefined()
  @IsObject()
  OrderLinePromisingInfo: OrderLinePromisingInfoDTO;

  @IsDefined()
  @IsObject()
  OrderLineExtension1: OrderLineExtension1DTO;

  @IsOptional()
  @IsString()
  PromisedDeliveryDate?: string;

  @IsDefined()
  @IsInt()
  Quantity: number;

  @IsDefined()
  @IsObject()
  ShipToAddress: ShipToAddressDTO;

  @IsString()
  ShippingMethodId: string;

  @IsString()
  UOM: string;

  @IsDefined()
  @IsNumber()
  OriginalUnitPrice: number;

  @IsDefined()
  @IsNumber()
  UnitPrice: number;

  @IsOptional()
  @IsNumber()
  CalculateUnitPrice?: number;

  @IsString()
  ReleaseGroupId: string;
}
export class OrderTaxDetailDTO {
  @IsDefined()
  @IsBoolean()
  IsInformational: boolean;

  @IsDefined()
  @IsNumber()
  TaxAmount: number;

  @IsOptional()
  @IsString()
  TaxCode?: string;

  @IsDefined()
  @IsNumber()
  TaxRate: number;

  @IsString()
  TaxTypeId: string;

  @IsDefined()
  @IsNumber()
  TaxableAmount: number;
}
export class ChargeTypeDTO {
  @IsString()
  ChargeTypeId: string;
}

export class OrderChargeDetailDTO {
  @IsString()
  ChargeDisplayName: string;

  @IsOptional()
  @IsString()
  ChargeReferenceId?: string;

  @IsString()
  ChargeDetailId: string;

  @IsDefined()
  ChargeTotal: number | string;

  @IsDefined()
  @IsObject()
  ChargeType: ChargeTypeDTO;

  @IsDefined()
  @IsBoolean()
  IsTaxIncluded: boolean;

  @IsDefined()
  @IsBoolean()
  IsPostReturn: boolean;

  @IsDefined()
  @IsBoolean()
  IsInformational: boolean;
}
export class OrderTypeDTO {
  @IsString()
  OrderTypeId: string;
}
export class DocTypeDTO {
  @IsString()
  DocTypeId: string;
}
export class OrderHoldDTO {
  @IsString()
  HoldTypeId: string;

  @IsString()
  StatusId: string;

  @IsString()
  ResolveReasonId: string;
}
export class SellingChannelDTO {
  @IsString()
  SellingChannelId: string;
}
export class OrderActionsDTO {
  @IsDefined()
  @IsBoolean()
  IsAlreadyPriced: boolean;

  @IsDefined()
  @IsBoolean()
  IsAlreadyCharged: boolean;

  @IsDefined()
  @IsBoolean()
  IsAlreadyTaxed: boolean;
}
export class ExtendedOrderDTO {
  @IsDefined()
  @IsBoolean()
  FullTaxInvoice: boolean;

  @IsDefined()
  @IsBoolean()
  AllowSubstitution: boolean;

  @IsDefined()
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
  ConfirmPaymentId: string;

  @IsDefined()
  @IsBoolean()
  IsPSConfirmed: boolean;

  @IsOptional()
  @IsString()
  ExternalMPSellerId?: string | null;
}
export class OrderExtension1DTO {
  @IsDefined()
  @IsObject()
  Extended: ExtendedOrderDTO;
}
export class MaoPayloadDto {
  @IsString()
  BU: string;

  @IsString()
  CapturedDate: string;

  @IsString()
  CurrencyCode: string;

  @IsOptional()
  @IsString()
  CustomerId?: string | null;

  @IsString()
  CustomerEmail: string;

  @IsString()
  DoNotReleaseBefore: string;

  @IsString()
  CustomerFirstName: string;

  @IsString()
  CustomerLastName: string;

  @IsString()
  CustomerPhone: string;

  @IsString()
  CustomerTypeId: string;

  @IsDefined()
  @IsObject()
  DocType: DocTypeDTO;

  @IsString()
  OrderLocale: string;

  @IsDefined()
  @IsBoolean()
  IsOnHold: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderHoldDTO)
  OrderHold: OrderHoldDTO[];

  @IsDefined()
  @IsBoolean()
  CancelAllowed: boolean;

  @IsDefined()
  @IsObject()
  OrderActions: OrderActionsDTO;

  @IsDefined()
  @IsObject()
  OrderExtension1: OrderExtension1DTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderChargeDetailDTO)
  OrderChargeDetail: OrderChargeDetailDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderTaxDetailDTO)
  OrderTaxDetail: OrderTaxDetailDTO[];

  @IsString()
  OrderId: string;

  @IsString()
  AlternateOrderId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDTO)
  OrderLine: OrderLineDTO[];

  @IsDefined()
  @IsObject()
  OrderType: OrderTypeDTO;

  @IsString()
  OrgId: string;

  @IsDefined()
  @IsObject()
  SellingChannel: SellingChannelDTO;

  @IsArray()
  @ValidateNested({ each: true })
  Payment: PaymentDTO[];
}
