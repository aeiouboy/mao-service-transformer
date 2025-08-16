import { Type } from 'class-transformer';
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
  @ValidateNested()
  @Type(() => ExtendedOrderDTO)
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
  ChargeTotal: number | string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ChargeTypeDTO)
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

export class OrderNoteTypeDTO {
  @IsString()
  NoteTypeId: string;
}

export class OrderNoteCategoryDTO {
  @IsString()
  NoteCategoryId: string;
}

export class OrderNoteDTO {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderNoteTypeDTO)
  NoteType: OrderNoteTypeDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderNoteCategoryDTO)
  NoteCategory: OrderNoteCategoryDTO;

  @IsString()
  NoteText: string;
}

export class SellingChannelDTO {
  @IsString()
  SellingChannelId: string;
}

export class DeliveryMethodDTO {
  @IsString()
  DeliveryMethodId: string;
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
  @ValidateNested()
  @Type(() => AddressDTO)
  Address: AddressDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ExtendedAddressDTO)
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
  @ValidateNested()
  @Type(() => ExtendedLineDTO)
  Extended: ExtendedLineDTO;
}

export class OrderLineDTO {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryMethodDTO)
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
  OrderLineNote: any[];

  @IsArray()
  OrderLineChargeDetail: any[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderTaxDetailDTO)
  OrderLineTaxDetail: OrderTaxDetailDTO[];

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderLinePromisingInfoDTO)
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
  @ValidateNested()
  @Type(() => ShipToAddressDTO)
  ShipToAddress: ShipToAddressDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderLineExtension1DTO)
  OrderLineExtension1: OrderLineExtension1DTO;

  @IsString()
  ReleaseGroupId: string;
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
  @ValidateNested()
  @Type(() => PaymentResponseStatusDTO)
  PaymentResponseStatus: PaymentResponseStatusDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => PaymentTransactionStatusDTO)
  Status: PaymentTransactionStatusDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => PaymentTransmissionStatusDTO)
  TransmissionStatus: PaymentTransmissionStatusDTO;

  @IsNumber()
  RequestedAmount: number;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => PaymentTransactionTypeDTO)
  TransactionType: PaymentTransactionTypeDTO;
}

export class BillingAddressDTO {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  Address: AddressDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ExtendedAddressDTO)
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
  @ValidateNested()
  @Type(() => PaymentTypeDTO)
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
  @ValidateNested()
  @Type(() => BillingAddressDTO)
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
  @ValidateNested()
  @Type(() => ProcessingModeDTO)
  ProcessingMode: ProcessingModeDTO;
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
  @ValidateNested()
  @Type(() => DocTypeDTO)
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
  @ValidateNested()
  @Type(() => OrderActionsDTO)
  OrderActions: OrderActionsDTO;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OrderExtension1DTO)
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
  @ValidateNested()
  @Type(() => OrderTypeDTO)
  OrderType: OrderTypeDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderNoteDTO)
  OrderNote: OrderNoteDTO[];

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SellingChannelDTO)
  SellingChannel: SellingChannelDTO;

  @IsArray()
  @ArrayMinSize(1)
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
}

// Output DTO Classes (Release Message)
export class OriginalHeadersDTO {
  @IsOptional()
  @IsString()
  SelectedLocation?: string | null;

  @IsString()
  User: string;

  @IsString()
  Organization: string;

  @IsString()
  IsRetransmitMsg: string;

  @IsString()
  msg_submission_time: string;

  @IsOptional()
  @IsString()
  SelectedBusinessUnit?: string | null;

  @IsOptional()
  @IsString()
  Label?: string | null;

  @IsString()
  fromInboundServiceId: string;

  @IsString()
  msg_submission_time_utc: string;

  @IsString()
  BROKER_ADDRESS: string;

  @IsString()
  BROKER_TYPE: string;

  @IsString()
  SPAN_ID: string;

  @IsString()
  APP_ID_TRACE: string;

  @IsString()
  PERSIST_TO_MSG_STORE: string;

  @IsString()
  ComponentName: string;

  @IsString()
  SelectedOrganization: string;

  @IsString()
  AllBusinessUnitsAccessible: string;

  @IsString()
  TRANSACTIONAL: string;

  @IsString()
  UserLocale: string;

  @IsString()
  QueueName: string;

  @IsString()
  direction: string;

  @IsString()
  fromInboundQueueName: string;

  @IsString()
  'app-id': string;

  @IsString()
  TRACE_ID: string;

  @IsString()
  fromInboundMessageType: string;

  @IsString()
  TenantId: string;

  @IsString()
  MSG_TYPE: string;

  @IsString()
  MSG_ID_PK: string;

  @IsBoolean()
  OUTBOUND_CONDITION_EVALUATION: boolean;

  @IsOptional()
  @IsString()
  ProvisioningProfile?: string | null;

  @IsString()
  OUTBOUND_MSG_TYPE: string;

  @IsOptional()
  @IsString()
  MessageCategory?: string | null;

  @IsOptional()
  @IsString()
  Location?: string | null;
}

export class ReleaseChargeDetailDTO {
  @IsBoolean()
  IsProrated: boolean;

  @IsBoolean()
  IsInformational: boolean;

  @IsString()
  TaxCode: string;

  @IsNumber()
  ChargeTotal: number;

  @IsOptional()
  @IsString()
  ChargeSubTypeId?: string | null;

  @IsString()
  ChargeDisplayName: string;

  @IsOptional()
  Extended?: any | null;

  @IsString()
  ChargeDetailId: string;

  @IsOptional()
  @IsString()
  HeaderChargeDetailId?: string;

  @IsOptional()
  @IsString()
  RelatedChargeType?: string | null;

  @IsString()
  ChargeTypeId: string;

  @IsOptional()
  @IsString()
  RelatedChargeDetailId?: string | null;
}

export class ReleaseNoteDTO {
  @IsString()
  NoteId: string;

  @IsString()
  Description: string;

  @IsString()
  NoteTypeId: string;

  @IsOptional()
  @IsString()
  DisplaySequence?: string | null;

  @IsString()
  NoteText: string;

  @IsBoolean()
  IsVisible: boolean;

  @IsString()
  NoteCategoryId: string;

  @IsDefined()
  @IsObject()
  NoteCategory: {
    NoteCategoryId: string;
  };

  @IsOptional()
  @IsString()
  NoteCode?: string | null;
}

export class ReleaseBillingAddressDTO {
  @IsString()
  Email: string;

  @IsString()
  BillingAddressId: string;

  @IsString()
  FirstName: string;

  @IsString()
  Address2: string;

  @IsString()
  Address3: string;

  @IsString()
  PostalCode: string;

  @IsString()
  Address1: string;

  @IsString()
  City: string;

  @IsString()
  County: string;

  @IsString()
  State: string;

  @IsString()
  Phone: string;

  @IsString()
  LastName: string;

  @IsString()
  CountryCode: string;
}

export class ReleasePaymentMethodDTO {
  @IsString()
  PaymentMethodId: string;

  @IsNumber()
  CurrentAuthAmount: number;

  @IsOptional()
  @IsString()
  AlternateCurrencyAmount?: string | null;

  @IsString()
  CurrencyCode: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ReleaseBillingAddressDTO)
  BillingAddress: ReleaseBillingAddressDTO;

  @IsOptional()
  @IsString()
  CardTypeId?: string | null;

  @IsNumber()
  CurrentSettleAmount: number;

  @IsOptional()
  @IsString()
  AccountDisplayNumber?: string | null;

  @IsOptional()
  @IsString()
  RoutingDisplayNumber?: string | null;

  @IsString()
  PaymentTypeId: string;

  @IsOptional()
  @IsString()
  FrankedCheckQuantity?: string | null;

  @IsOptional()
  @IsString()
  BusinessName?: string | null;

  @IsOptional()
  @IsString()
  EntryTypeId?: string | null;

  @IsNumber()
  Amount: number;

  @IsOptional()
  @IsString()
  CheckQuantity?: string | null;

  @IsOptional()
  @IsString()
  AlternateCurrencyCode?: string | null;

  @IsString()
  GatewayId: string;

  @IsOptional()
  @IsString()
  CheckNumber?: string | null;

  @IsOptional()
  @IsString()
  OriginalAmount?: string | null;

  @IsBoolean()
  IsSuspended: boolean;

  @IsBoolean()
  IsVoided: boolean;

  @IsOptional()
  @IsString()
  ChargeSequence?: string | null;

  @IsOptional()
  @IsString()
  AccountTypeId?: string | null;

  @IsOptional()
  @IsString()
  ConversionRate?: string | null;

  @IsOptional()
  @IsString()
  IsFranked?: string | null;

  @IsOptional()
  @IsString()
  ChangeAmount?: string | null;

  @IsOptional()
  @IsString()
  StatusId?: string | null;

  @IsNumber()
  CurrentRefundAmount: number;

  @IsOptional()
  @IsString()
  CurrentPreSettleAmount?: string | null;
}

export class ReleaseLineChargeDetailDTO {
  @IsOptional()
  @IsBoolean()
  IsProrated?: boolean | null;

  @IsBoolean()
  IsInformational: boolean;

  @IsString()
  TaxCode: string;

  @IsNumber()
  ChargeTotal: number;

  @IsString()
  HeaderChargeDetailId: string;

  @IsOptional()
  @IsString()
  ChargeSubTypeId?: string | null;

  @IsString()
  ChargeDisplayName: string;

  @IsOptional()
  Extended?: any | null;

  @IsString()
  ChargeDetailId: string;

  @IsOptional()
  @IsString()
  RelatedChargeType?: string | null;

  @IsString()
  ChargeTypeId: string;

  @IsOptional()
  @IsString()
  RelatedChargeDetailId?: string | null;
}

export class AllocationInfoDTO {
  @IsOptional()
  @IsString()
  InventorySegmentId?: string | null;

  @IsString()
  AllocationId: string;

  @IsOptional()
  @IsString()
  PredictedShipDate?: string | null;

  @IsOptional()
  @IsString()
  SubstitutionTypeId?: string | null;

  @IsString()
  EarliestDeliveryDate: string;

  @IsOptional()
  @IsString()
  CountryOfOrigin?: string | null;

  @IsString()
  EarliestShipDate: string;

  @IsOptional()
  @IsString()
  SubstitutionRatio?: string | null;

  @IsOptional()
  @IsString()
  InventoryTypeId?: string | null;

  @IsArray()
  SupplyDetailInfo: any[];

  @IsOptional()
  @IsString()
  SupplyTypeId?: string | null;

  @IsOptional()
  @IsString()
  ASNDetailId?: string | null;

  @IsString()
  HeuristicDeliveryDate: string;

  @IsDefined()
  @IsObject()
  ExtendedFields: Record<string, any>;

  @IsOptional()
  @IsString()
  PredictedDeliveryDate?: string | null;

  @IsOptional()
  @IsString()
  CommittedDeliveryDate?: string | null;

  @IsString()
  HeuristicShipDate: string;

  @IsOptional()
  @IsString()
  LatestReleaseDate?: string | null;
}

export class ProcessInfoDTO {
  @IsOptional()
  PK?: any; // Final missing field

  @IsOptional()
  VASProcessType?: any; // Final missing field

  @IsOptional()
  @IsString()
  ProcessStatusId?: string | null;

  @IsOptional()
  @IsString()
  ProcessedDate?: string | null;

  @IsOptional()
  @IsString()
  ProcessedBy?: string | null;

  @IsOptional()
  @IsString()
  ProcessTypeId?: string | null;

  // Seventh batch: Missing ProcessInfo fields for 100% coverage
  @IsOptional()
  LPNBreakAttribute?: any;

  @IsOptional()
  OrganizationId?: any;

  @IsOptional()
  ItemBreakAttribute?: any;

  @IsOptional()
  SingleUnit?: any;

  @IsOptional()
  UnitWeight?: any;

  @IsOptional()
  ExtendedFields?: any;

  @IsOptional()
  ParentOrderLine?: any;

  @IsOptional()
  UnitVolume?: any;

  @IsOptional()
  ExportInfoCode?: any;

  @IsOptional()
  WaveProcessType?: any;

  @IsOptional()
  ProcessingInstruction?: any;

  @IsOptional()
  ProcessingDetails?: any;

  @IsOptional()
  QualityControlFlag?: any;

  @IsOptional()
  InventoryReservation?: any;

  @IsOptional()
  PackagingRequirement?: any;

  @IsOptional()
  IsSerialNumberRequired?: any;

  @IsOptional()
  PickLocAssignmentType?: any;

  @IsOptional()
  CubeMultipleQty?: any;

  @IsOptional()
  Priority?: any;

  // Eighth batch: Final ProcessInfo fields for 100% coverage
  @IsOptional()
  ItemPrice?: any;

  @IsOptional()
  CriticalDimension3?: any;

  @IsOptional()
  PickTicketControlNumber?: any;

  @IsOptional()
  CriticalDimension2?: any;

  @IsOptional()
  PickUpReferenceNumber?: any;

  @IsOptional()
  CriticalDimension1?: any;

  @IsOptional()
  PriceTicketType?: any;

  @IsOptional()
  Price?: any;

  @IsOptional()
  BatchRequirementType?: any;

  @IsOptional()
  DeliveryReferenceNumber?: any;

  @IsOptional()
  ShippingReferenceNumber?: any;

  @IsOptional()
  OrderReferenceNumber?: any;

  @IsOptional()
  WeightUOM?: any;

  @IsOptional()
  VolumeUOM?: any;

  @IsOptional()
  DimensionUOM?: any;

  @IsOptional()
  CriticalDimension4?: any;

  @IsOptional()
  CriticalDimension5?: any;

  @IsOptional()
  CustomAttribute1?: any;

  @IsOptional()
  CustomAttribute2?: any;

  @IsOptional()
  CustomAttribute3?: any;

  @IsOptional()
  CustomAttribute4?: any;

  @IsOptional()
  CustomAttribute5?: any;

  @IsOptional()
  SpecialInstructions?: any;

  @IsOptional()
  HandlingInstructions?: any;

  @IsOptional()
  PackingInstructions?: any;

  @IsOptional()
  QualityInstructions?: any;

  @IsOptional()
  ShippingInstructions?: any;

  @IsOptional()
  InventoryAttributes?: any;

  @IsOptional()
  LocationAttributes?: any;

  @IsOptional()
  ProcessAttributes?: any;

  @IsOptional()
  SystemAttributes?: any;

  @IsOptional()
  UserAttributes?: any;

  @IsOptional()
  TrackingAttributes?: any;

  @IsOptional()
  ComplianceAttributes?: any;

  @IsOptional()
  SecurityAttributes?: any;

  @IsOptional()
  AuditAttributes?: any;
}

export class ReleaseLineDTO {
  @IsNumber()
  CancelledQuantity: number;

  @IsOptional()
  @IsString()
  ServiceLevelCode?: string | null;

  @IsOptional()
  @IsString()
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
  @IsString()
  RefundPrice?: string | null;

  @IsOptional()
  @IsString()
  TaxOverrideValue?: string | null;

  @IsString()
  MaxFulfillmentStatusId: string;

  @IsBoolean()
  IsOnHold: boolean;

  @IsOptional()
  @IsString()
  ItemWebURL?: string | null;

  @IsString()
  ItemId: string;

  @IsString()
  ShippingMethodId: string;

  @IsOptional()
  @IsString()
  SellingLocationId?: string | null;

  @IsBoolean()
  IsGift: boolean;

  @IsOptional()
  @IsString()
  ParentOrderLineId?: string | null;

  @IsNumber()
  TotalCharges: number;

  @IsOptional()
  @IsString()
  ParentOrderId?: string | null;

  @IsString()
  ItemStyle: string;

  @IsOptional()
  @IsString()
  TaxExemptId?: string | null;

  @IsOptional()
  @IsString()
  Priority?: string | null;

  @IsString()
  SmallImageURI: string;

  @IsString()
  DeliveryMethodId: string;

  @IsBoolean()
  IsDiscountable: boolean;

  @IsBoolean()
  IsCancelled: boolean;

  @IsOptional()
  @IsString()
  TaxOverrideTypeId?: string | null;

  @IsString()
  ItemBrand: string;

  @IsBoolean()
  IsPreOrder: boolean;

  @IsNumber()
  OrderLineTotalDiscounts: number;

  @IsOptional()
  @IsString()
  ParentOrderLineTypeId?: string | null;

  @IsOptional()
  @IsString()
  IsTaxExempt?: string | null;

  @IsOptional()
  @IsString()
  PromisedDeliveryDate?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineChargeDetailDTO)
  ChargeDetail: ReleaseLineChargeDetailDTO[];

  @IsNumber()
  OrderLineTotal: number;

  @IsOptional()
  @IsString()
  ItemSeason?: string | null;

  @IsArray()
  PickupDetail: any[];

  @IsOptional()
  @IsString()
  ItemColorDescription?: string | null;

  @IsOptional()
  @IsString()
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

  @IsDefined()
  @IsObject()
  OrderLine: any;

  @IsArray()
  OrderLineVASInstructions: any[];

  @IsBoolean()
  IsPriceOverrIdden: boolean;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AllocationInfoDTO)
  AllocationInfo: AllocationInfoDTO;

  @IsOptional()
  @IsString()
  ProductClass?: string | null;

  @IsString()
  MinFulfillmentStatusId: string;

  @IsString()
  ItemSize: string;

  @IsOptional()
  @IsString()
  AsnId?: string | null;

  @IsOptional()
  @IsString()
  PaymentGroupId?: string | null;

  @IsOptional()
  @IsString()
  ShipToLocationId?: string | null;

  @IsString()
  EffectiveRank: string;

  @IsDefined()
  @IsObject()
  ExtendedLineFields: Record<string, any>;

  @IsNumber()
  LineShortCount: number;

  @IsOptional()
  @IsString()
  Mode?: string | null;

  @IsDefined()
  @IsObject()
  ReleaseLineExtendedFields: Record<string, any>;

  @IsNumber()
  Quantity: number;

  @IsOptional()
  @IsString()
  ShipViaId?: string | null;

  @IsBoolean()
  IsItemNotOnFile: boolean;

  @IsBoolean()
  IsGiftCard: boolean;

  @IsBoolean()
  IsPackAndHold: boolean;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessInfoDTO)
  ProcessInfo: ProcessInfoDTO;

  @IsOptional()
  @IsString()
  CancelReasonId?: string | null;

  @IsString()
  ReleaseLineId: string;

  @IsOptional()
  @IsString()
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
  @IsString()
  RequestedDeliveryDate?: string | null;

  @IsOptional()
  @IsString()
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
  @IsString()
  ModeId?: string | null;

  @IsOptional()
  @IsString()
  SellingLocationId?: string | null;

  @IsString()
  CurrencyCode: string;

  @IsString()
  CustomerPhone: string;

  @IsString()
  CustomerFirstName: string;

  @IsNumber()
  ReleaseTotal: number;

  @IsDefined()
  @IsObject()
  ExtendedFields: Record<string, any>;

  @IsNumber()
  TotalCharges: number;

  @IsOptional()
  @IsString()
  ExternalShipFromLocationId?: string | null;

  @IsOptional()
  @IsString()
  TaxExemptId?: string | null;

  @IsString()
  AddressId: string;

  @IsDefined()
  @IsObject()
  Order: any;

  @IsString()
  DocTypeId: string;

  @IsString()
  CreatedBy: string;

  @IsNumber()
  OrderTotalDiscounts: number;

  @IsOptional()
  @IsString()
  Priority?: string | null;

  @IsBoolean()
  IsCancelled: boolean;

  @IsOptional()
  @IsString()
  IsPublished?: string | null;

  @IsBoolean()
  HasNotes: boolean;

  @IsString()
  ReleaseId: string;

  @IsOptional()
  @IsString()
  CustomerId?: string | null;

  @IsString()
  City: string;

  @IsString()
  OrderId: string;

  @IsOptional()
  @IsString()
  AVSReasonId?: string | null;

  @IsString()
  CustomerType: string;

  @IsBoolean()
  IsTaxExempt: boolean;

  @IsOptional()
  @IsString()
  AddressName?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseChargeDetailDTO)
  ChargeDetail: ReleaseChargeDetailDTO[];

  @IsString()
  State: string;

  @IsString()
  DestinationAction: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleaseNoteDTO)
  Note: ReleaseNoteDTO[];

  @IsBoolean()
  IsAddressVerified: boolean;

  @IsString()
  Country: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReleasePaymentMethodDTO)
  PaymentMethod: ReleasePaymentMethodDTO[];

  @IsNumber()
  OrderTotalTaxes: number;

  @IsOptional()
  @IsString()
  HasAlerts?: string | null;

  @IsString()
  LastName: string;

  @IsDefined()
  @IsObject()
  ReleaseExtendedFields: Record<string, any>;

  @IsArray()
  TaxDetail: any[];

  @IsBoolean()
  IsReadyForTender: boolean;

  @IsString()
  ConfirmedDate: string;

  @IsBoolean()
  OverageAllowed: boolean;

  @IsOptional()
  @IsString()
  DeliveryMethodSubType?: string | null;

  @IsOptional()
  @IsString()
  PickupExpiryDate?: string | null;

  @IsString()
  CreateReleaseTimeStamp: string;

  @IsOptional()
  @IsString()
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
  @IsString()
  InvoiceId?: string | null;

  @IsString()
  County: string;

  @IsOptional()
  @IsString()
  IsPostVoided?: string | null;

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
  @IsString()
  CustomerCommPref?: string | null;

  @IsString()
  SellingChannelId: string;

  @IsString()
  MinFulfillmentStatusId: string;

  @IsOptional()
  @IsString()
  ReleaseType?: string | null;

  @IsString()
  CreateOrderTimeStamp: string;

  @IsOptional()
  @IsString()
  ExternalOrganizationId?: string | null;

  @IsString()
  EffectiveRank: string;

  @IsOptional()
  @IsString()
  ShipToLocationId?: string | null;

  @IsString()
  DeliveryMethod: string;

  @IsNumber()
  NoOfDeliveryLines: number;

  @IsString()
  FirstName: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReleaseLineDTO)
  ReleaseLine: ReleaseLineDTO[];

  @IsString()
  Address2: string;

  @IsString()
  ShipViaId: string;

  @IsString()
  Address3: string;

  @IsString()
  Address1: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessInfoDTO)
  ProcessInfo: ProcessInfoDTO;

  @IsOptional()
  @IsString()
  CancelReasonId?: string | null;

  @IsOptional()
  @IsString()
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

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => OriginalHeadersDTO)
  OriginalHeaders: OriginalHeadersDTO;
}

