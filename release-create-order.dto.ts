// Note: In a real Next.js project, you would import these from 'class-validator' and 'class-transformer'
// For this example, we're using decorator placeholders
const IsNumber = () => (target: any, propertyKey: string) => {};
const IsString = () => (target: any, propertyKey: string) => {};
const IsOptional = () => (target: any, propertyKey: string) => {};
const IsInt = () => (target: any, propertyKey: string) => {};
const IsDefined = () => (target: any, propertyKey: string) => {};
const IsObject = () => (target: any, propertyKey: string) => {};
const IsBoolean = () => (target: any, propertyKey: string) => {};
const IsArray = () => (target: any, propertyKey: string) => {};
const ArrayMinSize = (min: number) => (target: any, propertyKey: string) => {};
const ValidateNested = (options?: any) => (target: any, propertyKey: string) => {};
const Type = (fn: () => any) => (target: any, propertyKey: string) => {};
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';

// Input DTO Classes (PMP Order Creation)
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
  ChargeTotal: number;

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

  @IsOptional()
  Extended?: any;
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

export class OrderTypeDTO {
  @IsString()
  OrderTypeId: string;
}

export class NoteTypeDTO {
  @IsString()
  NoteTypeId: string;
}

export class NoteCategoryDTO {
  @IsString()
  NoteCategoryId: string;
}

export class OrderNoteDTO {
  @IsDefined()
  @IsObject()
  NoteType: NoteTypeDTO;

  @IsDefined()
  @IsObject()
  NoteCategory: NoteCategoryDTO;

  @IsString()
  NoteText: string;

  @IsOptional()
  @IsString()
  NoteId?: string;
}

export class SellingChannelDTO {
  @IsString()
  SellingChannelId: string;
}

export class DeliveryMethodDTO {
  @IsString()
  DeliveryMethodId: string;
}

export class OrderLineNoteDTO {
  @IsString()
  NoteId: string;

  @IsDefined()
  @IsObject()
  NoteType: NoteTypeDTO;

  @IsDefined()
  @IsObject()
  NoteCategory: NoteCategoryDTO;

  @IsOptional()
  @IsString()
  NoteText?: string;
}

export class OrderLineTaxDetailDTO {
  @IsDefined()
  @IsBoolean()
  IsInformational: boolean;

  @IsDefined()
  @IsNumber()
  TaxAmount: number;

  @IsOptional()
  @IsString()
  TaxCode?: string | null;

  @IsDefined()
  @IsNumber()
  TaxRate: number;

  @IsString()
  TaxTypeId: string;

  @IsDefined()
  @IsNumber()
  TaxableAmount: number;
}

export class OrderLinePromisingInfoDTO {
  @IsString()
  ShipFromLocationId: string;

  @IsDefined()
  @IsBoolean()
  IsForceAllocate: boolean;
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

export class ExtendedAddressDTO {
  @IsString()
  AddressRef: string;
}

export class ShipToAddressDTO {
  @IsDefined()
  @IsObject()
  Address: AddressDTO;

  @IsDefined()
  @IsObject()
  Extended: ExtendedAddressDTO;

  @IsDefined()
  @IsBoolean()
  IsAddressVerified: boolean;
}

export class ExtendedLineDTO {
  @IsDefined()
  @IsBoolean()
  IsBundle: boolean;

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

  @IsDefined()
  @IsNumber()
  PackUnitPrice: number;

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
  BundleRefId?: string;

  @IsOptional()
  @IsString()
  SlotBookingId?: string;

  @IsOptional()
  @IsString()
  SlotBookingFrom?: string;

  @IsOptional()
  @IsString()
  SlotBookingTo?: string;

  @IsDefined()
  @IsBoolean()
  IsWeightItem: boolean;

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

export class OrderLineDTO {
  @IsDefined()
  @IsObject()
  DeliveryMethod: DeliveryMethodDTO;

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
  @ValidateNested({ each: true })
  @Type(() => OrderLineTaxDetailDTO)
  OrderLineTaxDetail: OrderLineTaxDetailDTO[];

  @IsDefined()
  @IsObject()
  OrderLinePromisingInfo: OrderLinePromisingInfoDTO;

  @IsOptional()
  @IsString()
  PromisedDeliveryDate?: string;

  @IsString()
  UOM: string;

  @IsDefined()
  @IsInt()
  Quantity: number;

  @IsDefined()
  @IsNumber()
  UnitPrice: number;

  @IsDefined()
  @IsNumber()
  OriginalUnitPrice: number;

  @IsString()
  ShippingMethodId: string;

  @IsDefined()
  @IsObject()
  ShipToAddress: ShipToAddressDTO;

  @IsDefined()
  @IsObject()
  OrderLineExtension1: OrderLineExtension1DTO;

  @IsString()
  ReleaseGroupId: string;

  // Additional fields from schema
  @IsOptional()
  @IsString()
  FulfillmentStatus?: string;

  @IsOptional()
  @IsObject()
  ChangeLog?: any;

  // Relationship arrays from schema
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuantityDetailDTO)
  QuantityDetails?: QuantityDetailDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AllocationDTO)
  Allocations?: AllocationDTO[];
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

export class BillingAddressDTO {
  @IsDefined()
  @IsObject()
  Address: AddressDTO;

  @IsDefined()
  @IsObject()
  Extended: ExtendedAddressDTO;
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
  @ValidateNested({ each: true })
  @Type(() => PaymentTransactionDTO)
  PaymentTransaction: PaymentTransactionDTO[];
}

export class ProcessingModeDTO {
  @IsString()
  ProcessingModeId: string;
}

export class PaymentDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDTO)
  PaymentMethod: PaymentMethodDTO[];

  @IsDefined()
  @IsObject()
  ProcessingMode: ProcessingModeDTO;
}

// New DTOs for missing entities from schema

export class QuantityDetailDTO {
  @IsString()
  QuantityDetailId: string;

  @IsString()
  StatusId: string;

  @IsString()
  Process: string;

  @IsString()
  ItemId: string;

  @IsDefined()
  @IsInt()
  Quantity: number;

  @IsString()
  UOM: string;

  @IsOptional()
  @IsString()
  Reason?: string;

  @IsOptional()
  @IsString()
  ReasonType?: string;

  @IsOptional()
  @IsNumber()
  SubstitutionRatio?: number;

  @IsOptional()
  @IsString()
  SubstitutionType?: string;

  @IsOptional()
  @IsString()
  WebUrl?: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  @IsObject()
  Status?: any;

  @IsOptional()
  @IsObject()
  ChangeLog?: any;
}

export class AllocationDTO {
  @IsString()
  AllocationId: string;

  @IsString()
  AllocationType: string;

  @IsString()
  StatusId: string;

  @IsString()
  Process: string;

  @IsString()
  ItemId: string;

  @IsDefined()
  @IsInt()
  Quantity: number;

  @IsString()
  UOM: string;

  @IsOptional()
  @IsBoolean()
  IsVirtual?: boolean;

  @IsOptional()
  @IsString()
  ShipFromLocationId?: string;

  @IsOptional()
  @IsString()
  ShipToLocationId?: string;

  @IsOptional()
  @IsString()
  ShipViaId?: string;

  @IsOptional()
  @IsString()
  CarrierCode?: string;

  @IsOptional()
  @IsString()
  EarliestDeliveryDate?: string;

  @IsOptional()
  @IsString()
  EarliestShipDate?: string;

  @IsOptional()
  @IsString()
  CommittedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  CommittedShipDate?: string;

  @IsOptional()
  @IsString()
  LatestShipDate?: string;

  @IsOptional()
  @IsString()
  LatestReleaseDate?: string;

  @IsOptional()
  @IsString()
  AllocatedOn?: string;

  @IsOptional()
  @IsString()
  BatchNumber?: string;

  @IsOptional()
  @IsString()
  ReservationRequestId?: string;

  @IsOptional()
  @IsString()
  ReservationRequestDetailId?: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  @IsString()
  CountryOfOrigin?: string;

  @IsOptional()
  @IsString()
  InventorySegmentId?: string;

  @IsOptional()
  @IsString()
  InventoryTypeId?: string;

  @IsOptional()
  @IsString()
  SubstitutionTypeId?: string;

  @IsOptional()
  @IsString()
  AllocationDependencyId?: string;

  @IsOptional()
  @IsString()
  GroupId?: string;

  @IsOptional()
  @IsString()
  ProductStatusId?: string;

  @IsOptional()
  @IsString()
  AsnId?: string;

  @IsOptional()
  @IsString()
  AsnDetailId?: string;

  @IsOptional()
  @IsObject()
  Extended?: any;
}

export class ReleaseDTO {
  @IsString()
  ReleaseId: string;

  @IsString()
  ReleaseNumber: string;

  @IsString()
  Process: string;

  @IsString()
  OrgId: string;

  @IsString()
  StatusId: string;

  @IsOptional()
  @IsString()
  ReleaseDate?: string;

  @IsOptional()
  @IsString()
  ExpectedShipDate?: string;

  @IsOptional()
  @IsString()
  ActualShipDate?: string;

  @IsString()
  WarehouseId: string;

  @IsOptional()
  @IsString()
  CarrierCode?: string;

  @IsOptional()
  @IsString()
  TrackingNumber?: string;

  @IsOptional()
  @IsString()
  ShipFromLocationId?: string;

  @IsOptional()
  @IsString()
  ShipToLocationId?: string;

  @IsOptional()
  @IsString()
  ShipViaId?: string;

  @IsOptional()
  @IsString()
  EarliestDeliveryDate?: string;

  @IsOptional()
  @IsString()
  EarliestShipDate?: string;

  @IsOptional()
  @IsString()
  CommittedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  CommittedShipDate?: string;

  @IsOptional()
  @IsString()
  LatestShipDate?: string;

  @IsOptional()
  @IsString()
  LatestReleaseDate?: string;

  @IsOptional()
  @IsString()
  AllocatedOn?: string;

  @IsOptional()
  @IsInt()
  Quantity?: number;

  @IsOptional()
  @IsString()
  UOM?: string;

  @IsOptional()
  @IsBoolean()
  IsVirtual?: boolean;

  @IsOptional()
  @IsString()
  BatchNumber?: string;

  @IsOptional()
  @IsString()
  ReservationRequestId?: string;

  @IsOptional()
  @IsString()
  ReservationRequestDetailId?: string;

  @IsOptional()
  @IsString()
  CountryOfOrigin?: string;

  @IsOptional()
  @IsString()
  InventorySegmentId?: string;

  @IsOptional()
  @IsString()
  InventoryTypeId?: string;

  @IsOptional()
  @IsString()
  SubstitutionTypeId?: string;

  @IsOptional()
  @IsNumber()
  SubstitutionRatio?: number;

  @IsOptional()
  @IsString()
  AllocationDependencyId?: string;

  @IsOptional()
  @IsString()
  GroupId?: string;

  @IsOptional()
  @IsString()
  ProductStatusId?: string;

  @IsOptional()
  @IsString()
  AsnId?: string;

  @IsOptional()
  @IsString()
  AsnDetailId?: string;

  @IsOptional()
  @IsString()
  PoId?: string;

  @IsOptional()
  @IsString()
  PoDetailId?: string;

  @IsOptional()
  @IsString()
  ServiceLevelCode?: string;

  @IsOptional()
  @IsString()
  AllocationType?: string;

  @IsOptional()
  @IsObject()
  Status?: any;

  @IsOptional()
  @IsObject()
  InventoryAttributes?: any;

  @IsOptional()
  @IsObject()
  Extended?: any;
}

export class ReleaseLineDetailDTO {
  @IsString()
  ReleaseLineId: string;

  @IsString()
  ItemId: string;

  @IsString()
  Process: string;

  @IsString()
  OrgId: string;

  @IsString()
  StatusId: string;

  @IsDefined()
  @IsInt()
  Quantity: number;

  @IsString()
  UOM: string;

  @IsOptional()
  @IsString()
  Reason?: string;

  @IsOptional()
  @IsString()
  ReasonType?: string;

  @IsOptional()
  @IsNumber()
  SubstitutionRatio?: number;

  @IsOptional()
  @IsString()
  SubstitutionType?: string;

  @IsOptional()
  @IsString()
  WebUrl?: string;

  @IsString()
  LocationId: string;

  @IsString()
  WarehouseId: string;

  @IsOptional()
  @IsInt()
  PickedQuantity?: number;

  @IsOptional()
  @IsInt()
  PackedQuantity?: number;

  @IsOptional()
  @IsInt()
  ShippedQuantity?: number;

  @IsOptional()
  @IsString()
  LineStatus?: string;

  @IsOptional()
  @IsString()
  ShipFromLocationId?: string;

  @IsOptional()
  @IsString()
  ShipToLocationId?: string;

  @IsOptional()
  @IsString()
  ShipViaId?: string;

  @IsOptional()
  @IsString()
  CarrierCode?: string;

  @IsOptional()
  @IsString()
  EarliestDeliveryDate?: string;

  @IsOptional()
  @IsString()
  EarliestShipDate?: string;

  @IsOptional()
  @IsString()
  CommittedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  CommittedShipDate?: string;

  @IsOptional()
  @IsString()
  LatestShipDate?: string;

  @IsOptional()
  @IsString()
  LatestReleaseDate?: string;

  @IsOptional()
  @IsString()
  AllocatedOn?: string;

  @IsOptional()
  @IsString()
  BatchNumber?: string;

  @IsOptional()
  @IsString()
  ReservationRequestId?: string;

  @IsOptional()
  @IsString()
  ReservationRequestDetailId?: string;

  @IsOptional()
  @IsString()
  CountryOfOrigin?: string;

  @IsOptional()
  @IsString()
  InventorySegmentId?: string;

  @IsOptional()
  @IsString()
  InventoryTypeId?: string;

  @IsOptional()
  @IsString()
  SubstitutionTypeId?: string;

  @IsOptional()
  @IsString()
  AllocationDependencyId?: string;

  @IsOptional()
  @IsString()
  GroupId?: string;

  @IsOptional()
  @IsString()
  ProductStatusId?: string;

  @IsOptional()
  @IsString()
  AsnId?: string;

  @IsOptional()
  @IsString()
  AsnDetailId?: string;

  @IsOptional()
  @IsString()
  PoId?: string;

  @IsOptional()
  @IsString()
  PoDetailId?: string;

  @IsOptional()
  @IsString()
  ServiceLevelCode?: string;

  @IsOptional()
  @IsString()
  AllocationType?: string;

  @IsOptional()
  @IsBoolean()
  IsVirtual?: boolean;

  @IsOptional()
  @IsObject()
  Status?: any;

  @IsOptional()
  @IsObject()
  InventoryAttributes?: any;

  @IsOptional()
  @IsObject()
  ChangeLog?: any;

  @IsOptional()
  @IsObject()
  Extended?: any;
}

export class PMPOrderInputDTO {
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

  @IsDefined()
  @IsBoolean()
  IsOnHold: boolean;

  @IsString()
  OrderLocale: string;

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

  @IsDefined()
  @IsObject()
  OrderType: OrderTypeDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderNoteDTO)
  OrderNote: OrderNoteDTO[];

  @IsDefined()
  @IsObject()
  SellingChannel: SellingChannelDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDTO)
  OrderLine: OrderLineDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDTO)
  Payment: PaymentDTO[];

  @IsString()
  OrderId: string;

  @IsString()
  AlternateOrderId: string;

  @IsString()
  OrgId: string;

  // Additional fields from schema to match orders table
  @IsOptional()
  @IsString()
  ShortOrderNumber?: string;

  @IsOptional()
  @IsString()
  OrderStatus?: string;

  @IsOptional()
  @IsString()
  FulfillmentStatus?: string;

  @IsOptional()
  @IsString()
  PaymentStatus?: string;

  @IsOptional()
  @IsInt()
  ParentId?: number;

  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;

  // Additional relationship arrays from schema
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseDTO)
  Releases?: ReleaseDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineDetailDTO)
  ReleaseLines?: ReleaseLineDetailDTO[];
}

// Output DTO Classes (Release Message)
export class ExtendedFieldsDTO {
  @IsDefined()
  @IsBoolean()
  CancelAllowed: boolean;
}

export class ReleasePaymentMethodDTO {
  @IsString()
  PaymentMethodId: string;

  @IsNumber()
  CurrentAuthAmount: number;

  @IsOptional()
  AlternateCurrencyAmount?: number | null;

  @IsString()
  CurrencyCode: string;

  @IsObject()
  BillingAddress: any;

  @IsOptional()
  CardTypeId?: string | null;

  @IsNumber()
  CurrentSettleAmount: number;

  @IsOptional()
  AccountDisplayNumber?: string | null;

  @IsOptional()
  RoutingDisplayNumber?: string | null;

  @IsString()
  PaymentTypeId: string;

  @IsOptional()
  FrankedCheckQuantity?: number | null;

  @IsOptional()
  BusinessName?: string | null;

  @IsOptional()
  EntryTypeId?: string | null;

  @IsNumber()
  Amount: number;

  @IsOptional()
  CheckQuantity?: number | null;

  @IsOptional()
  AlternateCurrencyCode?: string | null;

  @IsOptional()
  GatewayId?: string | null;

  @IsOptional()
  CheckNumber?: string | null;

  @IsOptional()
  OriginalAmount?: number | null;

  @IsBoolean()
  IsSuspended: boolean;

  @IsBoolean()
  IsVoided: boolean;

  @IsOptional()
  ChargeSequence?: number | null;

  @IsOptional()
  AccountTypeId?: string | null;

  @IsOptional()
  ConversionRate?: number | null;

  @IsOptional()
  IsFranked?: boolean | null;

  @IsOptional()
  ChangeAmount?: number | null;

  @IsOptional()
  StatusId?: string | null;

  @IsNumber()
  CurrentRefundAmount: number;

  @IsOptional()
  CurrentPreSettleAmount?: number | null;
}

export class ReleaseChargeDetailDTO {
  @IsOptional()
  IsProrated?: boolean | null;

  @IsBoolean()
  IsInformational: boolean;

  @IsString()
  TaxCode: string;

  @IsNumber()
  ChargeTotal: number;

  @IsOptional()
  ChargeSubTypeId?: string | null;

  @IsString()
  ChargeDisplayName: string;

  @IsOptional()
  Extended?: any;

  @IsString()
  ChargeDetailId: string;

  @IsOptional()
  RelatedChargeType?: string | null;

  @IsString()
  ChargeTypeId: string;

  @IsOptional()
  RelatedChargeDetailId?: string | null;
}

export class ReleaseNoteDTO {
  @IsString()
  NoteId: string;

  @IsOptional()
  Description?: string;

  @IsString()
  NoteTypeId: string;

  @IsOptional()
  DisplaySequence?: number | null;

  @IsString()
  NoteText: string;

  @IsBoolean()
  IsVisible: boolean;

  @IsString()
  NoteCategoryId: string;

  @IsObject()
  NoteCategory: NoteCategoryDTO;

  @IsOptional()
  NoteCode?: string | null;
}

export class ReleaseLineDTO {
  @IsNumber()
  CancelledQuantity: number;

  @IsOptional()
  ServiceLevelCode?: string | null;

  @IsOptional()
  LineTypeId?: string | null;

  @IsNumber()
  OrderLineTotalCharges: number;

  @IsNumber()
  FulfilledQuantity: number;

  @IsBoolean()
  IsReturnable: boolean;

  @IsBoolean()
  IsTaxIncluded: boolean;

  @IsBoolean()
  IsHazmat: boolean;

  @IsOptional()
  RefundPrice?: number | null;

  @IsOptional()
  TaxOverrideValue?: number | null;

  @IsString()
  MaxFulfillmentStatusId: string;

  @IsBoolean()
  IsOnHold: boolean;

  @IsOptional()
  ItemWebURL?: string | null;

  @IsString()
  ItemId: string;

  @IsString()
  ShippingMethodId: string;

  @IsOptional()
  SellingLocationId?: string | null;

  @IsBoolean()
  IsGift: boolean;

  @IsOptional()
  ParentOrderLineId?: string | null;

  @IsNumber()
  TotalCharges: number;

  @IsOptional()
  ParentOrderId?: string | null;

  @IsString()
  ItemStyle: string;

  @IsOptional()
  TaxExemptId?: string | null;

  @IsOptional()
  Priority?: number | null;

  @IsString()
  SmallImageURI: string;

  @IsString()
  DeliveryMethodId: string;

  @IsBoolean()
  IsDiscountable: boolean;

  @IsBoolean()
  IsCancelled: boolean;

  @IsOptional()
  TaxOverrideTypeId?: string | null;

  @IsString()
  ItemBrand: string;

  @IsBoolean()
  IsPreOrder: boolean;

  @IsNumber()
  OrderLineTotalDiscounts: number;

  @IsOptional()
  ParentOrderLineTypeId?: string | null;

  @IsOptional()
  IsTaxExempt?: boolean | null;

  @IsOptional()
  PromisedDeliveryDate?: string | null;

  @IsArray()
  ChargeDetail: any[];

  @IsNumber()
  OrderLineTotal: number;

  @IsOptional()
  ItemSeason?: string | null;

  @IsArray()
  PickupDetail: any[];

  @IsOptional()
  ItemColorDescription?: string | null;

  @IsOptional()
  ItemBarCode?: string | null;

  @IsString()
  ItemDescription: string;

  @IsBoolean()
  IsReturn: boolean;

  @IsBoolean()
  IsTaxOverridden: boolean;

  @IsNumber()
  ReleaseLineTotal: number;

  @IsBoolean()
  CanShipToAddress: boolean;

  @IsObject()
  OrderLine: any;

  @IsArray()
  OrderLineVASInstructions: any[];

  @IsBoolean()
  IsPriceOverrIdden: boolean;

  @IsObject()
  AllocationInfo: any;

  @IsOptional()
  ProductClass?: string | null;

  @IsString()
  MinFulfillmentStatusId: string;

  @IsString()
  ItemSize: string;

  @IsOptional()
  AsnId?: string | null;

  @IsOptional()
  PaymentGroupId?: string | null;

  @IsOptional()
  ShipToLocationId?: string | null;

  @IsString()
  EffectiveRank: string;

  @IsObject()
  ExtendedLineFields: any;

  @IsNumber()
  LineShortCount: number;

  @IsOptional()
  Mode?: string | null;

  @IsObject()
  ReleaseLineExtendedFields: any;

  @IsNumber()
  Quantity: number;

  @IsOptional()
  ShipViaId?: string | null;

  @IsBoolean()
  IsItemNotOnFile: boolean;

  @IsBoolean()
  IsGiftCard: boolean;

  @IsBoolean()
  IsPackAndHold: boolean;

  @IsObject()
  ProcessInfo: any;

  @IsOptional()
  CancelReasonId?: string | null;

  @IsString()
  ReleaseLineId: string;

  @IsOptional()
  ParentItemId?: string | null;

  @IsBoolean()
  IsReturnableAtStore: boolean;

  @IsString()
  FulfillmentGroupId: string;

  @IsString()
  UOM: string;

  @IsNumber()
  OrderLineSubtotal: number;

  @IsNumber()
  UnitPrice: number;

  @IsString()
  OrderLineId: string;

  @IsNumber()
  TotalTaxes: number;

  @IsNumber()
  OrderLineTotalTaxes: number;

  @IsOptional()
  RequestedDeliveryDate?: string | null;

  @IsOptional()
  CarrierCode?: string | null;

  @IsNumber()
  OriginalUnitPrice: number;

  @IsNumber()
  TotalDiscounts: number;
}

export class OriginalPayloadDTO {
  @IsString()
  ServiceLevelCode: string;

  @IsString()
  Email: string;

  @IsString()
  MaxFulfillmentStatusId: string;

  @IsBoolean()
  IsOnHold: boolean;

  @IsBoolean()
  IsConfirmed: boolean;

  @IsNumber()
  OrderSubtotal: number;

  @IsOptional()
  ModeId?: string | null;

  @IsOptional()
  SellingLocationId?: string | null;

  @IsString()
  CurrencyCode: string;

  @IsString()
  CustomerPhone: string;

  @IsString()
  CustomerFirstName: string;

  @IsNumber()
  ReleaseTotal: number;

  @IsObject()
  ExtendedFields: ExtendedFieldsDTO;

  @IsNumber()
  TotalCharges: number;

  @IsOptional()
  ExternalShipFromLocationId?: string | null;

  @IsOptional()
  TaxExemptId?: string | null;

  @IsString()
  AddressId: string;

  @IsObject()
  Order: any;

  @IsString()
  DocTypeId: string;

  @IsString()
  CreatedBy: string;

  @IsNumber()
  OrderTotalDiscounts: number;

  @IsOptional()
  Priority?: number | null;

  @IsBoolean()
  IsCancelled: boolean;

  @IsOptional()
  IsPublished?: boolean | null;

  @IsBoolean()
  HasNotes: boolean;

  @IsString()
  ReleaseId: string;

  @IsOptional()
  CustomerId?: string | null;

  @IsString()
  City: string;

  @IsString()
  OrderId: string;

  @IsOptional()
  AVSReasonId?: string | null;

  @IsString()
  CustomerType: string;

  @IsBoolean()
  IsTaxExempt: boolean;

  @IsOptional()
  AddressName?: string | null;

  @IsArray()
  ChargeDetail: ReleaseChargeDetailDTO[];

  @IsString()
  State: string;

  @IsString()
  DestinationAction: string;

  @IsArray()
  Note: ReleaseNoteDTO[];

  @IsBoolean()
  IsAddressVerified: boolean;

  @IsString()
  Country: string;

  @IsArray()
  PaymentMethod: ReleasePaymentMethodDTO[];

  @IsNumber()
  OrderTotalTaxes: number;

  @IsOptional()
  HasAlerts?: boolean | null;

  @IsString()
  LastName: string;

  @IsObject()
  ReleaseExtendedFields: any;

  @IsArray()
  TaxDetail: any[];

  @IsBoolean()
  IsReadyForTender: boolean;

  @IsString()
  ConfirmedDate: string;

  @IsBoolean()
  OverageAllowed: boolean;

  @IsOptional()
  DeliveryMethodSubType?: string | null;

  @IsOptional()
  PickupExpiryDate?: string | null;

  @IsString()
  CreateReleaseTimeStamp: string;

  @IsOptional()
  TaxExemptReasonId?: string | null;

  @IsString()
  ShipFromLocationId: string;

  @IsNumber()
  NoOfStoreSaleLines: number;

  @IsString()
  PostalCode: string;

  @IsString()
  OrganizationId: string;

  @IsOptional()
  InvoiceId?: string | null;

  @IsString()
  County: string;

  @IsOptional()
  IsPostVoided?: boolean | null;

  @IsString()
  AlternateOrderId: string;

  @IsString()
  CustomerEmail: string;

  @IsString()
  Phone: string;

  @IsString()
  OrderTypeId: string;

  @IsString()
  PaymentStatusId: string;

  @IsOptional()
  CustomerCommPref?: string | null;

  @IsString()
  SellingChannelId: string;

  @IsString()
  MinFulfillmentStatusId: string;

  @IsOptional()
  ReleaseType?: string | null;

  @IsString()
  CreateOrderTimeStamp: string;

  @IsOptional()
  ExternalOrganizationId?: string | null;

  @IsString()
  EffectiveRank: string;

  @IsOptional()
  ShipToLocationId?: string | null;

  @IsString()
  DeliveryMethod: string;

  @IsNumber()
  NoOfDeliveryLines: number;

  @IsString()
  FirstName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineDTO)
  ReleaseLine: ReleaseLineDTO[];

  @IsOptional()
  Address2?: string;

  @IsString()
  ShipViaId: string;

  @IsOptional()
  Address3?: string;

  @IsString()
  Address1: string;

  @IsObject()
  ProcessInfo: any;

  @IsOptional()
  CancelReasonId?: string | null;

  @IsOptional()
  PostVoIdReasonId?: string | null;

  @IsString()
  OrderLocale: string;

  @IsNumber()
  OrderTotalCharges: number;

  @IsNumber()
  TotalTaxes: number;

  @IsString()
  CustomerLastName: string;

  @IsString()
  CapturedDate: string;

  @IsString()
  CarrierCode: string;

  @IsString()
  AddressType: string;

  @IsNumber()
  OrderTotal: number;

  @IsNumber()
  TotalDiscounts: number;
}

export class ReleaseOutputDTO {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OriginalPayloadDTO)
  OriginalPayload: OriginalPayloadDTO;

  @IsObject()
  OriginalHeaders: any;
}

// Transformation Service
export class ReleaseOrderTransformationService {
  private static generateUniqueId(): string {
    return Math.floor(Math.random() * 1e15).toString();
  }

  private static generateMD5Hash(input: string): string {
    return createHash('md5').update(input).digest('hex').substring(0, 30);
  }


  private static getCurrentTimestampWithMs(): string {
    const now = new Date();
    const isoString = now.toISOString();
    return isoString.substring(0, isoString.length - 1);
  }

  private static addMinutesToDate(dateString: string, minutes: number): string {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString().replace('Z', '');
  }

  private static calculateOrderSubtotal(orderLines: OrderLineDTO[]): number {
    return orderLines.reduce((sum, line) => sum + (line.Quantity * line.UnitPrice), 0);
  }

  private static calculateReleaseTotal(orderLines: OrderLineDTO[], charges: OrderChargeDetailDTO[]): number {
    const lineTotal = this.calculateOrderSubtotal(orderLines);
    const chargesTotal = charges.reduce((sum, charge) => sum + charge.ChargeTotal, 0);
    return lineTotal + chargesTotal;
  }

  private static calculateTotalCharges(charges: OrderChargeDetailDTO[]): number {
    return charges
      .filter(charge => charge.ChargeType.ChargeTypeId !== 'Discount')
      .reduce((sum, charge) => sum + charge.ChargeTotal, 0);
  }

  private static calculateOrderTotalDiscounts(orderLines: OrderLineDTO[]): number {
    const discount = orderLines.reduce((sum, line) => {
      return sum + (line.Quantity * (line.OriginalUnitPrice - line.UnitPrice));
    }, 0);
    return -discount;
  }

  private static calculateOrderTotalTaxes(orderTaxDetail: OrderTaxDetailDTO[], orderLines: OrderLineDTO[]): number {
    const headerTaxes = orderTaxDetail.reduce((sum, tax) => sum + tax.TaxAmount, 0);
    const lineTaxes = orderLines.reduce((sum, line) => {
      return sum + line.OrderLineTaxDetail.reduce((lineSum: number, tax: { TaxAmount: number }) => lineSum + tax.TaxAmount, 0);
    }, 0);
    return headerTaxes + lineTaxes;
  }

  private static hasNotes(orderNotes: OrderNoteDTO[]): boolean {
    return orderNotes.length > 0 && orderNotes.some(note => note.NoteText && note.NoteText.trim() !== '');
  }

  private static countDeliveryLines(orderLines: OrderLineDTO[]): number {
    return orderLines.filter(line => line.DeliveryMethod.DeliveryMethodId === 'ShipToAddress').length;
  }

  private static countStoreSaleLines(orderLines: OrderLineDTO[]): number {
    return orderLines.filter(line => line.DeliveryMethod.DeliveryMethodId === 'StorePickup').length;
  }

  public static transform(input: PMPOrderInputDTO): ReleaseOutputDTO {
    const currentTimestampWithMs = this.getCurrentTimestampWithMs();
    
    // Generate address hash
    const firstOrderLine = input.OrderLine[0];
    const addressString = [
      firstOrderLine.ShipToAddress.Address.Address1,
      firstOrderLine.ShipToAddress.Address.Address2,
      firstOrderLine.ShipToAddress.Address.Address3,
      firstOrderLine.ShipToAddress.Address.City,
      firstOrderLine.ShipToAddress.Address.State,
      firstOrderLine.ShipToAddress.Address.Country,
      firstOrderLine.ShipToAddress.Address.PostalCode
    ].join('|');
    const addressId = this.generateMD5Hash(addressString);

    // Calculate values
    const orderSubtotal = this.calculateOrderSubtotal(input.OrderLine);
    const releaseTotal = this.calculateReleaseTotal(input.OrderLine, input.OrderChargeDetail);
    const totalCharges = this.calculateTotalCharges(input.OrderChargeDetail);
    const orderTotalDiscounts = this.calculateOrderTotalDiscounts(input.OrderLine);
    const orderTotalTaxes = this.calculateOrderTotalTaxes(input.OrderTaxDetail, input.OrderLine);
    const hasNotes = this.hasNotes(input.OrderNote);
    const noOfDeliveryLines = this.countDeliveryLines(input.OrderLine);
    const noOfStoreSaleLines = this.countStoreSaleLines(input.OrderLine);

    const releaseOutput = new ReleaseOutputDTO();
    const originalPayload = new OriginalPayloadDTO();
    
    // Map basic fields
    originalPayload.ServiceLevelCode = 'STD';
    originalPayload.Email = input.CustomerEmail;
    originalPayload.MaxFulfillmentStatusId = '3000';
    originalPayload.IsOnHold = input.OrderHold[0]?.StatusId !== '2000';
    originalPayload.IsConfirmed = true;
    originalPayload.OrderSubtotal = orderSubtotal;
    originalPayload.ModeId = null;
    originalPayload.SellingLocationId = null;
    originalPayload.CurrencyCode = input.CurrencyCode;
    originalPayload.CustomerPhone = input.CustomerPhone;
    originalPayload.CustomerFirstName = input.CustomerFirstName;
    originalPayload.ReleaseTotal = releaseTotal;
    
    const extendedFields = new ExtendedFieldsDTO();
    extendedFields.CancelAllowed = input.OrderExtension1.Extended.CancelAllowed;
    originalPayload.ExtendedFields = extendedFields;
    
    originalPayload.TotalCharges = totalCharges;
    originalPayload.ExternalShipFromLocationId = null;
    originalPayload.TaxExemptId = null;
    originalPayload.AddressId = addressId;
    originalPayload.Order = this.transformOrder(input, currentTimestampWithMs);
    originalPayload.DocTypeId = input.DocType.DocTypeId;
    originalPayload.CreatedBy = 'pubsubuser@pmp';
    originalPayload.OrderTotalDiscounts = orderTotalDiscounts;
    originalPayload.Priority = null;
    originalPayload.IsCancelled = false;
    originalPayload.IsPublished = null;
    originalPayload.HasNotes = hasNotes;
    originalPayload.ReleaseId = input.OrderId + '1';
    originalPayload.CustomerId = input.CustomerId || null;
    originalPayload.City = firstOrderLine.ShipToAddress.Address.City;
    originalPayload.OrderId = input.OrderId;
    originalPayload.AVSReasonId = null;
    originalPayload.CustomerType = input.CustomerTypeId || '';
    originalPayload.IsTaxExempt = false;
    originalPayload.AddressName = null;
    originalPayload.ChargeDetail = this.transformChargeDetail(input.OrderChargeDetail, input.OrderTaxDetail);
    originalPayload.State = firstOrderLine.ShipToAddress.Address.State;
    originalPayload.DestinationAction = 'Delivery';
    originalPayload.Note = this.transformNotes(input.OrderNote);
    originalPayload.IsAddressVerified = firstOrderLine.ShipToAddress.IsAddressVerified;
    originalPayload.Country = firstOrderLine.ShipToAddress.Address.Country;
    originalPayload.PaymentMethod = this.transformPaymentMethods(input.Payment);
    originalPayload.OrderTotalTaxes = orderTotalTaxes;
    originalPayload.HasAlerts = null;
    originalPayload.LastName = input.CustomerLastName;
    originalPayload.ReleaseExtendedFields = {};
    originalPayload.TaxDetail = [];
    originalPayload.IsReadyForTender = false;
    originalPayload.ConfirmedDate = currentTimestampWithMs;
    originalPayload.OverageAllowed = false;
    originalPayload.DeliveryMethodSubType = null;
    originalPayload.PickupExpiryDate = null;
    originalPayload.CreateReleaseTimeStamp = currentTimestampWithMs;
    originalPayload.TaxExemptReasonId = null;
    originalPayload.ShipFromLocationId = firstOrderLine.OrderLinePromisingInfo.ShipFromLocationId;
    originalPayload.NoOfStoreSaleLines = noOfStoreSaleLines;
    originalPayload.PostalCode = firstOrderLine.ShipToAddress.Address.PostalCode;
    originalPayload.OrganizationId = input.OrgId;
    originalPayload.InvoiceId = null;
    originalPayload.County = firstOrderLine.ShipToAddress.Address.County;
    originalPayload.IsPostVoided = null;
    originalPayload.AlternateOrderId = input.AlternateOrderId;
    originalPayload.CustomerEmail = input.CustomerEmail;
    originalPayload.Phone = firstOrderLine.ShipToAddress.Address.Phone;
    originalPayload.OrderTypeId = input.OrderType.OrderTypeId;
    originalPayload.PaymentStatusId = '5000.000';
    originalPayload.CustomerCommPref = null;
    originalPayload.SellingChannelId = input.SellingChannel.SellingChannelId;
    originalPayload.MinFulfillmentStatusId = '3000';
    originalPayload.ReleaseType = null;
    originalPayload.CreateOrderTimeStamp = currentTimestampWithMs;
    originalPayload.ExternalOrganizationId = null;
    originalPayload.EffectiveRank = 'Not Applicable';
    originalPayload.ShipToLocationId = null;
    originalPayload.DeliveryMethod = firstOrderLine.DeliveryMethod.DeliveryMethodId;
    originalPayload.NoOfDeliveryLines = noOfDeliveryLines;
    originalPayload.FirstName = input.CustomerFirstName;
    originalPayload.ReleaseLine = this.transformReleaseLines(input.OrderLine, input.OrderChargeDetail, input.CapturedDate);
    originalPayload.Address2 = firstOrderLine.ShipToAddress.Address.Address2;
    originalPayload.ShipViaId = 'InStore_STD';
    originalPayload.Address3 = firstOrderLine.ShipToAddress.Address.Address3;
    originalPayload.Address1 = firstOrderLine.ShipToAddress.Address.Address1;
    originalPayload.ProcessInfo = this.createProcessInfo();
    originalPayload.CancelReasonId = null;
    originalPayload.PostVoIdReasonId = null;
    originalPayload.OrderLocale = input.OrderLocale;
    originalPayload.OrderTotalCharges = totalCharges;
    originalPayload.TotalTaxes = orderTotalTaxes;
    originalPayload.CustomerLastName = input.CustomerLastName;
    originalPayload.CapturedDate = input.CapturedDate;
    originalPayload.CarrierCode = 'InStore';
    originalPayload.AddressType = 'CustomerShipToAddress';
    originalPayload.OrderTotal = releaseTotal;
    originalPayload.TotalDiscounts = orderTotalDiscounts;

    releaseOutput.OriginalPayload = originalPayload;
    releaseOutput.OriginalHeaders = this.createOriginalHeaders(currentTimestampWithMs);

    return releaseOutput;
  }

  private static transformOrder(input: PMPOrderInputDTO, timestamp: string): any {
    return {
      Payment: this.transformPayments(input.Payment, input.OrgId, timestamp),
      OrderChargeDetail: this.transformOrderChargeDetail(input.OrderChargeDetail),
      OrderExtension1: {
        Extended: input.OrderExtension1.Extended
      }
    };
  }

  private static transformPayments(payments: PaymentDTO[], orgId: string, timestamp: string): any[] {
    return payments.map(payment => ({
      Actions: {},
      PK: this.generateUniqueId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: timestamp,
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: timestamp,
      Messages: null,
      OrgId: orgId,
      PurgeDate: null,
      OrderId: payment.PaymentMethod[0].PaymentTransaction[0].OrderId,
      PaymentGroupId: null,
      CustomerId: null,
      IsCancelled: false,
      AlternateOrderId: null,
      IsAnonymized: false,
      PaymentMethod: payment.PaymentMethod.map((method: PaymentMethodDTO) => ({
        ...this.transformPaymentMethod(method, orgId, timestamp)
      })),
      Status: {
        StatusId: '5000.000'
      },
      Extended: {}
    }));
  }

  private static transformPaymentMethod(method: PaymentMethodDTO, orgId: string, timestamp: string): any {
    return {
      Actions: {},
      PK: this.generateUniqueId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: timestamp,
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: timestamp,
      Messages: null,
      OrgId: orgId,
      PaymentMethodId: method.PaymentMethodId,
      CurrencyCode: method.CurrencyCode,
      AlternateCurrencyCode: null,
      ConversionRate: null,
      AlternateCurrencyAmount: null,
      AccountNumber: null,
      AccountDisplayNumber: null,
      NameOnCard: null,
      SwipeData: null,
      CardExpiryMonth: null,
      CardExpiryYear: null,
      GiftCardPin: null,
      CustomerSignature: null,
      CustomerPaySignature: null,
      ChangeAmount: null,
      Amount: method.Amount,
      CurrentAuthAmount: 0,
      CurrentSettledAmount: method.CurrentSettledAmount,
      CurrentRefundAmount: 0,
      ChargeSequence: null,
      IsSuspended: method.IsSuspended,
      EntryTypeId: null,
      GatewayId: method.GatewayId,
      RoutingNumber: null,
      RoutingDisplayNumber: null,
      CheckNumber: null,
      DriversLicenseNumber: null,
      DriversLicenseState: null,
      DriversLicenseCountry: null,
      BusinessName: null,
      BusinessTaxId: null,
      CheckQuantity: null,
      OriginalAmount: null,
      IsModifiable: method.IsModifiable,
      CurrentFailedAmount: 0,
      ParentOrderId: null,
      ParentPaymentGroupId: null,
      ParentPaymentMethodId: null,
      IsVoided: method.IsVoided,
      IsCopied: method.IsCopied,
      GatewayAccountId: null,
      LocationId: null,
      TransactionReferenceId: null,
      CapturedInEdgeMode: false,
      MerchandiseAmount: 0,
      CapturedSource: null,
      ShopperReference: null,
      SuggestedAmount: null,
      PurgeDate: null,
      BillingAddress: this.transformBillingAddress(method.BillingAddress, orgId, timestamp),
      PaymentMethodAttribute: [],
      PaymentMethodEncrAttribute: [],
      PaymentTransaction: method.PaymentTransaction.map((txn: PaymentTransactionDTO) => ({
        ...this.transformPaymentTransaction(txn, orgId, timestamp)
      })),
      ParentOrderPaymentMethod: [],
      PaymentType: {
        PaymentTypeId: method.PaymentType.PaymentTypeId
      },
      CardType: null,
      AccountType: null,
      PaymentCategory: null,
      Extended: {
        BillingNameString: `${method.BillingAddress.Address.FirstName} ${method.BillingAddress.Address.LastName}`,
        BillingAddressString: `${method.BillingAddress.Address.Address1},${method.BillingAddress.Address.Address2},`,
        InstallmentPlan: null,
        BillingAddressString2: `${method.BillingAddress.Address.City},${method.BillingAddress.Address.State},${method.BillingAddress.Address.County},${method.BillingAddress.Address.Country},${method.BillingAddress.Address.PostalCode}`,
        InstallmentRate: null
      }
    };
  }

  private static transformBillingAddress(billingAddress: BillingAddressDTO, orgId: string, timestamp: string): any {
    return {
      Actions: {},
      PK: this.generateUniqueId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: timestamp,
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: timestamp,
      Messages: null,
      OrgId: orgId,
      Address: billingAddress.Address,
      PurgeDate: null,
      Extended: billingAddress.Extended
    };
  }

  private static transformPaymentTransaction(transaction: PaymentTransactionDTO, orgId: string, timestamp: string): any {
    return {
      Actions: {},
      PK: this.generateUniqueId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: timestamp,
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: timestamp,
      Messages: null,
      OrgId: orgId,
      PaymentTransactionId: transaction.PaymentTransactionId,
      RequestedAmount: transaction.RequestedAmount,
      RequestId: transaction.RequestId,
      RequestToken: transaction.RequestToken,
      RequestedDate: null,
      FollowOnId: null,
      FollowOnToken: null,
      TransactionDate: transaction.TransactionDate.replace('Z', ''),
      TransactionExpiryDate: null,
      ProcessedAmount: transaction.ProcessedAmount,
      FollowOnProcessedAmount: null,
      RemainingAttempts: null,
      FollowOnCount: null,
      ReconciliationId: transaction.ReconciliationId,
      ExternalResponseId: null,
      ReasonId: null,
      IsValidForRefund: transaction.IsValidForRefund,
      ReAuthOnSettlementFailure: false,
      IsActive: transaction.IsActive,
      RemainingBalance: null,
      IsCopied: transaction.IsCopied,
      ScheduledTimestamp: null,
      OrderId: transaction.OrderId,
      PaymentGroupId: null,
      StoreAndForwardNumber: null,
      IsActivation: transaction.IsActivation,
      OnHold: false,
      NetworkTransactionId: null,
      UniqueTransactionId: null,
      IsChargeback: false,
      NotificationTimestamp: null,
      AlternateOrderId: null,
      PurgeDate: null,
      FollowOnParentTransaction: [],
      PaymentTransAttribute: [],
      PaymentTransEncrAttribute: [],
      PaymentTransactionDetail: [],
      PaymentTransactionEMVTags: null,
      PaymentTransactionGroup: [],
      TransactionType: {
        PaymentTransactionTypeId: transaction.TransactionType.PaymentTransactionTypeId
      },
      Status: {
        PaymentTransactionStatusId: transaction.Status.PaymentTransactionStatusId
      },
      AuthorizationType: null,
      ProcessingMode: null,
      PaymentResponseStatus: {
        PaymentResponseStatusId: transaction.PaymentResponseStatus.PaymentResponseStatusId
      },
      TransmissionStatus: {
        PaymentTransmissionStatusId: transaction.TransmissionStatus.PaymentTransmissionStatusId
      },
      InteractionMode: null,
      NotificationStatus: null,
      Extended: {}
    };
  }

  private static transformOrderChargeDetail(charges: OrderChargeDetailDTO[]): any[] {
    return charges.map(charge => ({
      Extended: {
        JdaDiscCode: charge.Extended?.JdaDiscCode || null,
        ChargeDesc: charge.Extended?.ChargeDesc || null,
        CRCTaxAmount: charge.Extended?.CRCTaxAmount || null,
        TaxRate: charge.Extended?.TaxRate || null,
        MKPPromotionId: charge.Extended?.MKPPromotionId || null
      }
    }));
  }

  private static transformChargeDetail(orderChargeDetail: OrderChargeDetailDTO[], orderTaxDetail: OrderTaxDetailDTO[]): ReleaseChargeDetailDTO[] {
    return orderChargeDetail.map((charge, index) => {
      const releaseCharge = new ReleaseChargeDetailDTO();
      releaseCharge.IsProrated = true;
      releaseCharge.IsInformational = charge.IsInformational;
      releaseCharge.TaxCode = index === 0 ? (orderTaxDetail[0]?.TaxCode || 'Shipping') : 
                              index === 2 ? 'Discount' : 'Shipping';
      releaseCharge.ChargeTotal = charge.ChargeTotal;
      releaseCharge.ChargeSubTypeId = null;
      releaseCharge.ChargeDisplayName = charge.ChargeDisplayName;
      releaseCharge.Extended = null;
      releaseCharge.ChargeDetailId = charge.ChargeDetailId;
      releaseCharge.RelatedChargeType = null;
      releaseCharge.ChargeTypeId = charge.ChargeType.ChargeTypeId;
      releaseCharge.RelatedChargeDetailId = null;
      return releaseCharge;
    });
  }

  private static transformNotes(orderNotes: OrderNoteDTO[]): ReleaseNoteDTO[] {
    return orderNotes.map(note => {
      const releaseNote = new ReleaseNoteDTO();
      releaseNote.NoteId = this.generateUniqueId();
      releaseNote.Description = `${note.NoteType.NoteTypeId} - Festival Remark`;
      releaseNote.NoteTypeId = note.NoteType.NoteTypeId;
      releaseNote.DisplaySequence = null;
      releaseNote.NoteText = note.NoteText;
      releaseNote.IsVisible = true;
      releaseNote.NoteCategoryId = note.NoteCategory.NoteCategoryId;
      releaseNote.NoteCategory = note.NoteCategory;
      releaseNote.NoteCode = null;
      return releaseNote;
    });
  }

  private static transformPaymentMethods(payments: PaymentDTO[]): ReleasePaymentMethodDTO[] {
    return payments[0].PaymentMethod.map((method: PaymentMethodDTO) => {
      const releaseMethod = new ReleasePaymentMethodDTO();
      releaseMethod.PaymentMethodId = method.PaymentMethodId;
      releaseMethod.CurrentAuthAmount = 0;
      releaseMethod.AlternateCurrencyAmount = null;
      releaseMethod.CurrencyCode = method.CurrencyCode;
      releaseMethod.BillingAddress = {
        Email: method.BillingAddress.Address.Email,
        BillingAddressId: this.generateUniqueId(),
        FirstName: method.BillingAddress.Address.FirstName,
        Address2: method.BillingAddress.Address.Address2,
        Address3: method.BillingAddress.Address.Address3,
        PostalCode: method.BillingAddress.Address.PostalCode,
        Address1: method.BillingAddress.Address.Address1,
        City: method.BillingAddress.Address.City,
        County: method.BillingAddress.Address.County,
        State: method.BillingAddress.Address.State,
        Phone: method.BillingAddress.Address.Phone,
        LastName: method.BillingAddress.Address.LastName,
        CountryCode: method.BillingAddress.Address.Country
      };
      releaseMethod.CardTypeId = null;
      releaseMethod.CurrentSettleAmount = method.CurrentSettledAmount;
      releaseMethod.AccountDisplayNumber = null;
      releaseMethod.RoutingDisplayNumber = null;
      releaseMethod.PaymentTypeId = method.PaymentType.PaymentTypeId;
      releaseMethod.FrankedCheckQuantity = null;
      releaseMethod.BusinessName = null;
      releaseMethod.EntryTypeId = null;
      releaseMethod.Amount = method.Amount;
      releaseMethod.CheckQuantity = null;
      releaseMethod.AlternateCurrencyCode = null;
      releaseMethod.GatewayId = method.GatewayId;
      releaseMethod.CheckNumber = null;
      releaseMethod.OriginalAmount = null;
      releaseMethod.IsSuspended = method.IsSuspended;
      releaseMethod.IsVoided = method.IsVoided;
      releaseMethod.ChargeSequence = null;
      releaseMethod.AccountTypeId = null;
      releaseMethod.ConversionRate = null;
      releaseMethod.IsFranked = null;
      releaseMethod.ChangeAmount = null;
      releaseMethod.StatusId = null;
      releaseMethod.CurrentRefundAmount = 0;
      releaseMethod.CurrentPreSettleAmount = null;
      return releaseMethod;
    });
  }

  private static transformReleaseLines(orderLines: OrderLineDTO[], orderChargeDetail: OrderChargeDetailDTO[], capturedDate: string): ReleaseLineDTO[] {
    const chargePerLine = orderChargeDetail.length > 0 ? orderChargeDetail[0].ChargeTotal / orderLines.length : 0;
    
    return orderLines.map((line, index) => {
      const releaseLine = new ReleaseLineDTO();
      releaseLine.CancelledQuantity = 0;
      releaseLine.ServiceLevelCode = null;
      releaseLine.LineTypeId = null;
      releaseLine.OrderLineTotalCharges = 0;
      releaseLine.FulfilledQuantity = 0;
      releaseLine.IsReturnable = true;
      releaseLine.IsTaxIncluded = line.IsTaxIncluded;
      releaseLine.IsHazmat = false;
      releaseLine.RefundPrice = null;
      releaseLine.TaxOverrideValue = null;
      releaseLine.MaxFulfillmentStatusId = '3000';
      releaseLine.IsOnHold = false;
      releaseLine.ItemWebURL = null;
      releaseLine.ItemId = line.ItemId;
      releaseLine.ShippingMethodId = line.ShippingMethodId;
      releaseLine.SellingLocationId = null;
      releaseLine.IsGift = line.IsGift;
      releaseLine.ParentOrderLineId = null;
      releaseLine.TotalCharges = 0;
      releaseLine.ParentOrderId = null;
      releaseLine.ItemStyle = '';
      releaseLine.TaxExemptId = null;
      releaseLine.Priority = null;
      releaseLine.SmallImageURI = this.getProductImageURI(line.OrderLineExtension1.Extended.BundleRefId || line.ItemId);
      releaseLine.DeliveryMethodId = line.DeliveryMethod.DeliveryMethodId;
      releaseLine.IsDiscountable = true;
      releaseLine.IsCancelled = false;
      releaseLine.TaxOverrideTypeId = null;
      releaseLine.ItemBrand = this.getProductBrand(line.ItemId);
      releaseLine.IsPreOrder = false;
      releaseLine.OrderLineTotalDiscounts = (line.OriginalUnitPrice - line.UnitPrice) * line.Quantity;
      releaseLine.ParentOrderLineTypeId = null;
      releaseLine.IsTaxExempt = null;
      releaseLine.PromisedDeliveryDate = line.PromisedDeliveryDate || null;
      releaseLine.ChargeDetail = [{
        IsProrated: null,
        IsInformational: true,
        TaxCode: 'Shipping',
        ChargeTotal: Math.round(chargePerLine * 100) / 100,
        HeaderChargeDetailId: orderChargeDetail[0]?.ChargeDetailId || '',
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Free',
        Extended: null,
        ChargeDetailId: this.generateUniqueId(),
        RelatedChargeType: null,
        ChargeTypeId: 'Shipping',
        RelatedChargeDetailId: null
      }];
      releaseLine.OrderLineTotal = (line.Quantity * line.UnitPrice) + chargePerLine;
      releaseLine.ItemSeason = null;
      releaseLine.PickupDetail = [];
      releaseLine.ItemColorDescription = null;
      releaseLine.ItemBarCode = null;
      releaseLine.ItemDescription = this.getProductDescription(line.ItemId);
      releaseLine.IsReturn = false;
      releaseLine.IsTaxOverridden = false;
      releaseLine.ReleaseLineTotal = (line.Quantity * line.UnitPrice) + chargePerLine;
      releaseLine.CanShipToAddress = true;
      releaseLine.OrderLine = {
        OrderLineExtension1: line.OrderLineExtension1,
        FulfillmentDetail: [],
        ShipToAddress: line.ShipToAddress,
        Allocation: [{
          SupplyDetailInfo: [{
            Quantity: line.Quantity,
            SupplyTypeId: 'On Hand Available'
          }]
        }],
        OrderLineChargeDetail: line.OrderLineChargeDetail,
        ReleaseGroupId: line.ReleaseGroupId,
        ItemShortDescription: this.getProductDescription(line.ItemId)
      };
      releaseLine.OrderLineVASInstructions = [];
      releaseLine.IsPriceOverrIdden = false;
      releaseLine.AllocationInfo = {
        InventorySegmentId: null,
        AllocationId: this.generateUniqueId(),
        PredictedShipDate: null,
        SubstitutionTypeId: null,
        EarliestDeliveryDate: this.addMinutesToDate(capturedDate, 25),
        CountryOfOrigin: null,
        EarliestShipDate: this.addMinutesToDate(capturedDate, 25),
        SubstitutionRatio: null,
        InventoryTypeId: null,
        SupplyDetailInfo: [],
        SupplyTypeId: null,
        ASNDetailId: null,
        HeuristicDeliveryDate: this.addMinutesToDate(capturedDate, 25),
        ExtendedFields: {},
        PredictedDeliveryDate: null,
        CommittedDeliveryDate: null,
        HeuristicShipDate: this.addMinutesToDate(capturedDate, 25),
        LatestReleaseDate: null
      };
      releaseLine.ProductClass = null;
      releaseLine.MinFulfillmentStatusId = '3000';
      releaseLine.ItemSize = '';
      releaseLine.AsnId = null;
      releaseLine.PaymentGroupId = null;
      releaseLine.ShipToLocationId = null;
      releaseLine.EffectiveRank = 'Not Applicable';
      releaseLine.ExtendedLineFields = {};
      releaseLine.LineShortCount = 0;
      releaseLine.Mode = null;
      releaseLine.ReleaseLineExtendedFields = {};
      releaseLine.Quantity = line.Quantity;
      releaseLine.ShipViaId = null;
      releaseLine.IsItemNotOnFile = false;
      releaseLine.IsGiftCard = false;
      releaseLine.IsPackAndHold = false;
      releaseLine.ProcessInfo = {
        ProcessStatusId: null,
        ProcessedDate: null,
        ProcessedBy: null,
        ProcessTypeId: null
      };
      releaseLine.CancelReasonId = null;
      releaseLine.ReleaseLineId = (index + 1).toString();
      releaseLine.ParentItemId = null;
      releaseLine.IsReturnableAtStore = true;
      releaseLine.FulfillmentGroupId = this.generateMD5Hash(`${line.ItemId}-${Date.now()}`);
      releaseLine.UOM = line.UOM;
      releaseLine.OrderLineSubtotal = line.Quantity * line.UnitPrice;
      releaseLine.UnitPrice = line.UnitPrice;
      releaseLine.OrderLineId = line.OrderLineId;
      releaseLine.TotalTaxes = 0;
      releaseLine.OrderLineTotalTaxes = line.OrderLineTaxDetail.reduce((sum, tax) => sum + tax.TaxAmount, 0);
      releaseLine.RequestedDeliveryDate = null;
      releaseLine.CarrierCode = null;
      releaseLine.OriginalUnitPrice = line.OriginalUnitPrice;
      releaseLine.TotalDiscounts = (line.OriginalUnitPrice - line.UnitPrice) * line.Quantity;
      return releaseLine;
    });
  }

  private static createProcessInfo(): any {
    return {
      ProcessStatusId: null,
      ProcessedDate: null,
      ProcessedBy: null,
      ProcessTypeId: null
    };
  }

  private static createOriginalHeaders(timestamp: string): any {
    return {
      SelectedLocation: null,
      User: 'pubsubuser@pmp',
      Organization: 'CFR',
      IsRetransmitMsg: 'true',
      msg_submission_time: timestamp.replace('T', ' ').substring(0, 23),
      SelectedBusinessUnit: null,
      Label: null,
      fromInboundServiceId: 'PayloadMsgProcessor',
      msg_submission_time_utc: timestamp.replace('T', ' ').substring(0, 23) + 'Z',
      BROKER_ADDRESS: '',
      BROKER_TYPE: 'googlepubsub',
      SPAN_ID: this.generateUniqueId().substring(0, 16),
      APP_ID_TRACE: 'com-manh-cp-xint-queue-proc-q-xint-657d955bff-pz5xf',
      PERSIST_TO_MSG_STORE: 'true',
      ComponentName: 'xint',
      SelectedOrganization: 'CFR',
      AllBusinessUnitsAccessible: 'false',
      TRANSACTIONAL: 'false',
      UserLocale: 'en',
      QueueName: 'OB_XINT_PublishReleaseToStoreMSGType_GCPQ-CFR',
      direction: 'Outbound',
      fromInboundQueueName: 'awpf-payload-queue-ord',
      'app-id': 'com-manh-cp-xint-queue-proc-q-xint-657d955bff-pz5xf',
      TRACE_ID: this.generateUniqueId().substring(0, 16),
      fromInboundMessageType: 'awpf-payload',
      TenantId: 'crcpopr11o',
      MSG_TYPE: 'OB_XINT_PublishReleaseToStoreMSGType_GCPMT',
      MSG_ID_PK: this.generateUniqueId(),
      OUTBOUND_CONDITION_EVALUATION: true,
      ProvisioningProfile: null,
      OUTBOUND_MSG_TYPE: 'OB_XINT_PublishReleaseToStoreMSGType_GCPMT',
      MessageCategory: null,
      Location: null
    };
  }

  private static getProductImageURI(_itemId: string): string {
    // This would typically lookup from a product catalog
    return `https://assets.tops.co.th/YINDEE-YindeeDrinkingWater600mlPack12-8853474090600-1?$JPEG$`;
  }

  private static getProductBrand(_itemId: string): string {
    // This would typically lookup from a product catalog
    return 'YINDEE/ ยินดี';
  }

  private static getProductDescription(_itemId: string): string {
    // This would typically lookup from a product catalog
    return 'Yindee Drinking Water 600ml.';
  }

  public static async saveTransformedOrder(input: PMPOrderInputDTO, outputDir: string = '/Users/chongraktanaka/oms-mapping/release'): Promise<string> {
    const transformed = this.transform(input);
    const fileName = `orderid${input.OrderId}.json`;
    const filePath = path.join(outputDir, fileName);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the transformed data
    fs.writeFileSync(filePath, JSON.stringify(transformed, null, 2));
    
    return filePath;
  }
}