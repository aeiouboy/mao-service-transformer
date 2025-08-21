import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// Input DTOs for Cancel Request
export class CancelReasonDTO {
  @IsString()
  @IsDefined()
  ReasonId: string;

  @IsString()
  @IsOptional()
  OthReason?: string;
}

export class CancelOrderRequestDTO {
  @IsString()
  @IsDefined()
  OrderId: string;

  @ValidateNested()
  @Type(() => CancelReasonDTO)
  @IsDefined()
  CancelReason: CancelReasonDTO;

  @IsString()
  @IsOptional()
  CancelComments?: string;

  @IsString()
  @IsDefined()
  OrgId: string;
}

// Address DTOs - comprehensive address structures matching cancel_fully.json
export class AddressDTO {
  @IsString()
  @IsOptional()
  Email?: string;

  @IsString()
  FirstName: string;

  @IsString()
  State: string;

  @IsString()
  @IsOptional()
  Phone?: string;

  @IsString()
  @IsOptional()
  Address2?: string;

  @IsString()
  @IsOptional()
  Address3?: string | null;

  @IsString()
  Country: string;

  @IsString()
  PostalCode: string;

  @IsString()
  LastName: string;

  @IsString()
  Address1: string;

  @IsString()
  City: string;

  @IsString()
  County: string;
}

export class AddressExtendedDTO {
  @IsString()
  AddressRef: string;
}

export class ShipToAddressDTO {
  @IsString()
  @IsOptional()
  AddressName?: string | null;

  @IsString()
  @IsOptional()
  AvsReason?: string | null;

  @ValidateNested()
  @Type(() => AddressDTO)
  Address: AddressDTO;

  @IsBoolean()
  IsAddressVerified: boolean;

  @ValidateNested()
  @Type(() => AddressExtendedDTO)
  Extended: AddressExtendedDTO;

  @IsString()
  AddressId: string;
}

export class BillingAddressDTO {
  @IsOptional()
  Actions?: any;

  @IsString()
  PK: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  CreatedTimestamp: string;

  @IsString()
  UpdatedBy: string;

  @IsString()
  UpdatedTimestamp: string;

  @IsOptional()
  Messages?: any;

  @IsString()
  OrgId: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  Address: AddressDTO;

  @IsOptional()
  PurgeDate?: any;

  @ValidateNested()
  @Type(() => AddressExtendedDTO)
  Extended: AddressExtendedDTO;
}

export class PaymentExtendedDTO {
  @IsString()
  BillingNameString: string;

  @IsString()
  BillingAddressString: string;

  @IsOptional()
  InstallmentPlan?: any;

  @IsString()
  BillingAddressString2: string;

  @IsOptional()
  InstallmentRate?: any;
}

// Payment Actions DTO - must be declared before BillingAddressDTO
export class PaymentActionsDTO {
  // Empty object based on cancel_fully.json
}

// Delivery Method DTO
export class DeliveryMethodDTO {
  @IsString()
  DeliveryMethodId: string;
}

// Output DTOs for Cancel Response - matching cancel_fully.json structure
export class OrderTypeDTO {
  @IsString()
  OrderTypeId: string;
}

export class StatusDTO {
  @IsString()
  StatusId: string;
}

export class OrderHoldDTO {
  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  HoldTypeId: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  CreatedTimestamp: string;

  @IsString()
  Process: string;

  @IsString()
  ResolveReasonId: string;

  @IsOptional()
  ExternalCreatedDate?: string | null;

  @IsOptional()
  ResolveReasonComments?: string | null;

  @IsString()
  UpdatedBy: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  ExternalCreatedBy?: string | null;

  @IsString()
  StatusId: string;

  @IsOptional()
  ApplyReasonComments?: string | null;

  @IsOptional()
  ChangeLog?: any;
}

export class ExtendedOrderDTO {
  @IsBoolean()
  IsPSConfirmed: boolean;

  @IsBoolean()
  CancelAllowed: boolean;

  @IsBoolean()
  FullTaxInvoice: boolean;

  @IsOptional()
  SourceOrderShippingTotal?: any;

  @IsOptional()
  AutoSettlement?: any;

  @IsString()
  TaxId: string;

  @IsOptional()
  SourceOrderTotal?: any;

  @IsOptional()
  T1ConversionRate?: any;

  @IsOptional()
  Extended1?: any;

  @IsBoolean()
  AllowSubstitution: boolean;

  @IsOptional()
  T1RedemptionPoint?: any;

  @IsString()
  CompanyName: string;

  @IsOptional()
  CustRef?: any;

  @IsOptional()
  SourceOrderTotalDiscount?: any;

  @IsString()
  BranchNo: string;

  @IsString()
  ConfirmPaymentId: string;

  @IsOptional()
  T1Number?: any;

  @IsOptional()
  T1PhoneNo?: any;

  @IsOptional()
  SourceOrderSubTotal?: any;

  @IsOptional()
  ExternalMPSellerId?: any;
}

export class OrderExtension1DTO {
  @IsString()
  UpdatedBy: string;

  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  OrgId: string;

  @IsString()
  CreatedTimestamp: string;

  @IsString()
  CreatedBy: string;

  @ValidateNested()
  @Type(() => ExtendedOrderDTO)
  Extended: ExtendedOrderDTO;

  @IsString()
  ContextId: string;

  @IsString()
  Process: string;

  @IsString()
  PK: string;

  @IsOptional()
  PurgeDate?: any;

  @IsString()
  Unique_Identifier: string;
}

export class PaymentDTO {
  @ValidateNested()
  @Type(() => PaymentActionsDTO)
  Actions: PaymentActionsDTO;

  @IsString()
  PK: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  CreatedTimestamp: string;

  @IsString()
  UpdatedBy: string;

  @IsString()
  UpdatedTimestamp: string;

  @IsOptional()
  Messages?: any;

  @IsString()
  OrgId: string;

  @IsOptional()
  PurgeDate?: any;

  @IsString()
  PaymentId: string;

  @IsString()
  PaymentKey: string;

  @IsString()
  PaymentTypeId: string;

  @IsString()
  PaymentDetailTypeId: string;

  @IsBoolean()
  IsUnidentified: boolean;

  @IsNumber()
  RequestedAmount: number;

  @IsOptional()
  MaxChargeLimit?: any;

  @IsOptional()
  ProcessedAmount?: any;

  @IsNumber()
  AuthorizedAmount: number;

  @IsOptional()
  ChargedAmount?: any;

  @IsOptional()
  CollectedAmount?: any;

  @IsString()
  CurrencyCode: string;

  @IsOptional()
  PaymentReferenceNumber?: any;

  @IsString()
  DisplayPaymentReferenceNumber: string;

  @IsOptional()
  AuthorizationId?: any;

  @IsOptional()
  AuthorizationExpirationDate?: any;

  @IsString()
  StatusId: string;

  @IsString()
  Process: string;

  @IsOptional()
  SuspendAnyOtherPayment?: any;

  @IsOptional()
  PaymentSequenceNo?: any;

  @IsOptional()
  PaymentExpDate?: any;

  @IsOptional()
  CVVNo?: any;

  @IsOptional()
  UseBillingAddressAsShippingAddress?: any;

  @IsOptional()
  CheckReference?: any;

  @IsOptional()
  CheckNumber?: any;

  @IsOptional()
  CheckDate?: any;

  @IsOptional()
  AssignedAmount?: any;

  @IsOptional()
  PaymentBankName?: any;

  @IsOptional()
  PaymentBankAccountNumber?: any;

  @IsOptional()
  PaymentBankRoutingNumber?: any;

  @IsString()
  AvsCode: string;

  @IsOptional()
  CvCode?: any;

  @IsOptional()
  HoldAgainstBook?: any;

  @IsString()
  AmountDue: string;

  @IsOptional()
  Tender?: any;

  @IsOptional()
  ChangeAmount?: any;

  @IsString()
  HoldReasonCode: string;

  @IsOptional()
  SourcePaymentTypeId?: any;

  @IsOptional()
  CallbackUrl?: any;

  @IsOptional()
  CollectPaymentInd?: any;

  @IsOptional()
  PaymentReference1?: any;

  @IsOptional()
  PaymentReference2?: any;

  @IsOptional()
  PaymentReference3?: any;

  @IsOptional()
  PaymentReference4?: any;

  @IsOptional()
  PaymentReference5?: any;

  @IsOptional()
  PaymentReference6?: any;

  @IsOptional()
  UnlimitedCharges?: any;

  @IsOptional()
  TotalAuthRequestAmount?: any;

  @IsOptional()
  IsPrimaryPaymentLine?: any;

  @IsOptional()
  OfflinePayment?: any;

  @IsOptional()
  IsPreAuth?: any;

  @IsString()
  OriginalPaymentKey: string;

  @IsString()
  CustomerPaymentMethodId: string;

  @IsBoolean()
  IsCustomerDataReceived: boolean;

  @ValidateNested()
  @Type(() => BillingAddressDTO)
  @IsOptional()
  BillingAddress?: BillingAddressDTO;

  @IsArray()
  PaymentMethodAttribute: any[];

  @IsArray()
  PaymentMethodEncrAttribute: any[];

  @IsArray()
  PaymentMethod: any[];

  @IsArray()
  PaymentTransaction: any[];

  @ValidateNested()
  @Type(() => PaymentExtendedDTO)
  @IsOptional()
  Extended?: PaymentExtendedDTO;
}

export class ChangeLogModTypesDTO {
  @IsArray()
  @IsOptional()
  Order?: string[];

  @IsArray()
  @IsOptional()
  OrderLine?: string[];

  @IsArray()
  @IsOptional()
  QuantityDetail?: string[];
}

export class ChangeLogDTO {
  @ValidateNested()
  @Type(() => ChangeLogModTypesDTO)
  ModTypes: ChangeLogModTypesDTO;
}

// Complex nested DTOs for OrderLine structure
export class OrderLineCancelHistoryDTO {
  @IsString()
  UpdatedBy: string;

  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  OrgId: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  CreatedTimestamp: string;

  @ValidateNested()
  @Type(() => CancelReasonDTO)
  CancelReason: CancelReasonDTO;

  @IsNumber()
  CancelQuantity: number;

  @IsString()
  Process: string;

  @IsString()
  CancelComments: string;
}

export class OrderLineNoteTypeDTO {
  @IsString()
  NoteTypeId: string;
}

export class OrderLineNoteCategoryDTO {
  @IsString()
  NoteCategoryId: string;
}

export class OrderLineNoteDTO {
  @IsString()
  UpdatedBy: string;

  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  OrgId: string;

  @IsString()
  NoteId: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  CreatedTimestamp: string;

  @ValidateNested()
  @Type(() => OrderLineNoteTypeDTO)
  NoteType: OrderLineNoteTypeDTO;

  @IsOptional()
  DisplaySequence?: any;

  @IsString()
  NoteText: string;

  @IsString()
  Process: string;

  @IsBoolean()
  IsVisible: boolean;

  @ValidateNested()
  @Type(() => OrderLineNoteCategoryDTO)
  NoteCategory: OrderLineNoteCategoryDTO;
}

export class QuantityDetailStatusDTO {
  @IsString()
  StatusId: string;
}

export class QuantityDetailReasonDTO {
  @IsString()
  ReasonId: string;
}

export class QuantityDetailReasonTypeDTO {
  @IsString()
  ReasonTypeId: string;
}

export class QuantityDetailChangeLogPropertyDTO {
  @IsString()
  New: string;

  @IsString()
  Old: string;

  @IsString()
  Property: string;
}

export class QuantityDetailChangeSetDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuantityDetailChangeLogPropertyDTO)
  Properties: QuantityDetailChangeLogPropertyDTO[];

  @IsString()
  ModType: string;
}

export class QuantityDetailChangeLogModTypesDTO {
  @IsArray()
  QuantityDetail: string[];
}

export class QuantityDetailChangeLogDTO {
  @ValidateNested()
  @Type(() => QuantityDetailChangeLogModTypesDTO)
  ModTypes: QuantityDetailChangeLogModTypesDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuantityDetailChangeSetDTO)
  ChangeSet: QuantityDetailChangeSetDTO[];
}

export class QuantityDetailDTO {
  @ValidateNested()
  @Type(() => QuantityDetailStatusDTO)
  Status: QuantityDetailStatusDTO;

  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  CreatedTimestamp: string;

  @IsString()
  QuantityDetailId: string;

  @IsOptional()
  WebURL?: any;

  @IsNumber()
  Quantity: number;

  @IsString()
  Process: string;

  @IsOptional()
  SubstitutionRatio?: any;

  @IsString()
  ItemId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuantityDetailReasonDTO)
  Reason?: QuantityDetailReasonDTO;

  @IsString()
  UpdatedBy: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  SubstitutionType?: any;

  @IsString()
  UOM: string;

  @IsString()
  StatusId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuantityDetailReasonTypeDTO)
  ReasonType?: QuantityDetailReasonTypeDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuantityDetailChangeLogDTO)
  ChangeLog?: QuantityDetailChangeLogDTO;
}

export class OrderLineChangeLogModTypesDTO {
  @IsArray()
  OrderLine: string[];

  @IsArray()
  QuantityDetail: string[];
}

export class OrderLineChangeLogPropertyDTO {
  @IsString()
  New: string;

  @IsString()
  Old: string;

  @IsString()
  Property: string;
}

export class OrderLineChangeSetDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineChangeLogPropertyDTO)
  Properties: OrderLineChangeLogPropertyDTO[];

  @IsString()
  ModType: string;
}

export class OrderLineChangeLogDTO {
  @ValidateNested()
  @Type(() => OrderLineChangeLogModTypesDTO)
  ModTypes: OrderLineChangeLogModTypesDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineChangeSetDTO)
  ChangeSet: OrderLineChangeSetDTO[];
}

export class OrderLineDTO {
  @IsOptional()
  ParentLineCreatedTimestamp?: any;

  @IsString()
  CreatedTimestamp: string;

  @IsOptional()
  BusinessDate?: any;

  @IsOptional()
  RefundPrice?: any;

  @IsBoolean()
  IsHazmat: boolean;

  @IsOptional()
  TaxOverrideValue?: any;

  @IsString()
  MaxFulfillmentStatusId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineCancelHistoryDTO)
  OrderLineCancelHistory: OrderLineCancelHistoryDTO[];

  @IsOptional()
  StoreSaleEntryMethod?: any;

  @IsBoolean()
  IsReturnAllowedByAgePolicy: boolean;

  @IsString()
  ShippingMethodId: string;

  @IsString()
  UpdatedBy: string;

  @IsOptional()
  ItemMaxDiscountPercentage?: any;

  @IsArray()
  OrderLineSalesAssociate: any[];

  @IsString()
  ReleaseGroupId: string;

  @IsNumber()
  OrderLineSubTotal: number;

  @IsString()
  ItemStyle: string;

  @IsOptional()
  ParentOrderId?: any;

  @IsNumber()
  ReturnableQuantity: number;

  @IsArray()
  OrderLineHold: any[];

  @IsString()
  CreatedBy: string;

  @IsString()
  SmallImageURI: string;

  @IsBoolean()
  IsCancelled: boolean;

  @IsNumber()
  CancelledOrderLineSubTotal: number;

  @IsString()
  ItemBrand: string;

  @IsOptional()
  ReturnType?: any;

  @IsBoolean()
  IsPerishable: boolean;

  @IsOptional()
  GiftCardValue?: any;

  @IsBoolean()
  IsPriceOverridden: boolean;

  @IsNumber()
  TotalInformationalTaxes: number;

  @IsBoolean()
  IsPreSale: boolean;

  @IsBoolean()
  HasComponents: boolean;

  @IsOptional()
  ItemMaxDiscountAmount?: any;

  @IsOptional()
  ItemDepartmentName?: any;

  @IsBoolean()
  IsExchangeable: boolean;

  @IsString()
  ItemColorDescription: string;

  @IsArray()
  OrderLineAttribute: any[];

  @IsBoolean()
  IsReturn: boolean;

  @IsBoolean()
  IsTaxOverridden: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineNoteDTO)
  OrderLineNote: OrderLineNoteDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuantityDetailDTO)
  QuantityDetail: QuantityDetailDTO[];

  @ValidateNested()
  @Type(() => OrderLineChangeLogDTO)
  ChangeLog: OrderLineChangeLogDTO;

  // Additional fields from the full structure
  @IsString()
  ItemId: string;

  @IsString()
  ItemName: string;

  @IsString()
  ItemShortDescription: string;

  @IsNumber()
  UnitPrice: number;

  @IsNumber()
  Quantity: number;

  @IsString()
  StatusId: string;

  @IsString()
  FulfillmentStatus: string;

  @IsString()
  PK: string;

  @IsString()
  OrderLineId: string;

  @IsString()
  Process: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  PurgeDate?: any;

  @IsString()
  UpdatedTimestamp: string;

  @IsOptional()
  SourceSystemId?: any;

  @IsOptional()
  ShipNode?: any;

  @IsString()
  UOM: string;

  @IsOptional()
  ExpectedShipDate?: any;

  @IsOptional()
  RequestedDate?: any;

  @IsOptional()
  PromisedDate?: any;

  // Address-related fields for OrderLine
  @IsString()
  @IsOptional()
  EffectiveRank?: string;

  @ValidateNested()
  @Type(() => DeliveryMethodDTO)
  @IsOptional()
  DeliveryMethod?: DeliveryMethodDTO;

  @IsOptional()
  TaxOverrideType?: any;

  @IsOptional()
  LatestFulfilledDate?: any;

  @IsOptional()
  TaxableAmount?: any;

  @IsNumber()
  @IsOptional()
  TotalDiscountOnItem?: number;

  @IsNumber()
  @IsOptional()
  TotalDiscounts?: number;

  @IsString()
  @IsOptional()
  AllocationConfigId?: string | null;

  @ValidateNested()
  @Type(() => ShipToAddressDTO)
  @IsOptional()
  ShipToAddress?: ShipToAddressDTO;

  @IsString()
  @IsOptional()
  ServiceLevelCode?: string | null;

  @IsNumber()
  @IsOptional()
  ItemDepartmentNumber?: number;

  @IsBoolean()
  @IsOptional()
  IsReturnable?: boolean;

  @IsBoolean()
  @IsOptional()
  IsTaxIncluded?: boolean;

  @IsNumber()
  @IsOptional()
  TotalCharges?: number;

  @IsString()
  @IsOptional()
  ParentOrderLineType?: string | null;

  @IsString()
  @IsOptional()
  AddressId?: string;

  @IsOptional()
  ShipFromAddress?: any;

  @IsOptional()
  VolumetricWeight?: any;

  @IsOptional()
  Priority?: any;

  @IsBoolean()
  @IsOptional()
  IsPreOrder?: boolean;

  @IsOptional()
  PromisedDeliveryDate?: any;

  @IsOptional()
  LineType?: any;

  @IsString()
  @IsOptional()
  ShipToLocationId?: string | null;

  @IsString()
  @IsOptional()
  ShipFromAddressId?: string | null;

  @IsBoolean()
  @IsOptional()
  IsActivationRequired?: boolean;

  @IsBoolean()
  @IsOptional()
  IsItemNotOnFile?: boolean;

  @IsBoolean()
  @IsOptional()
  IsPackAndHold?: boolean;

  @IsBoolean()
  @IsOptional()
  IsGiftCard?: boolean;
}

export class OrderNoteDTO {
  @IsString()
  PK: string;

  @IsString()
  CreatedTimestamp: string;

  @IsString()
  CreatedBy: string;

  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  UpdatedBy: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  PurgeDate?: any;

  @IsString()
  NoteId: string;

  @IsOptional()
  ContactReference?: any;

  @IsString()
  Priority: string;

  @IsString()
  VisibilityTypeId: string;

  @IsOptional()
  AuditTransactionId?: any;

  @IsOptional()
  TransactionName?: any;

  @IsOptional()
  ReasonCode?: any;

  @IsOptional()
  DisplaySequence?: any;

  @IsString()
  NoteText: string;

  @IsString()
  Process: string;

  @IsBoolean()
  IsVisible: boolean;

  @ValidateNested()
  @Type(() => OrderLineNoteCategoryDTO)
  NoteCategory: OrderLineNoteCategoryDTO;
}

export class CancelOrderResponseDTO {
  @IsNumber()
  CancelLineCount: number;

  @IsOptional()
  SuspendedOrderId?: any;

  @IsString()
  CreatedTimestamp: string;

  @IsArray()
  Invoice: any[];

  @IsOptional()
  BusinessDate?: any;

  @IsArray()
  ReturnTrackingDetail: any[];

  @IsString()
  MaxFulfillmentStatusId: string;

  @IsBoolean()
  IsOnHold: boolean;

  @IsString()
  Process: string;

  @IsBoolean()
  IsConfirmed: boolean;

  @IsString()
  CurrencyCode: string;

  @IsOptional()
  SellingLocationId?: any;

  @IsString()
  EventSubmitTime: string;

  @IsString()
  UpdatedBy: string;

  @IsString()
  FulfillmentStatus: string;

  @IsString()
  CustomerFirstName: string;

  @IsArray()
  OrderChargeDetail: any[];

  @ValidateNested()
  @Type(() => OrderTypeDTO)
  OrderType: OrderTypeDTO;

  @IsString()
  CountedDate: string;

  @IsNumber()
  TotalCharges: number;

  @IsNumber()
  OrderLineCount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderHoldDTO)
  OrderHold: OrderHoldDTO[];

  @IsString()
  OrderToken: string;

  @IsBoolean()
  IsArchiveInProgress: boolean;

  @IsString()
  CreatedBy: string;

  @IsOptional()
  Priority?: any;

  @IsBoolean()
  IsCancelled: boolean;

  @IsArray()
  OrderTagDetail: any[];

  @IsArray()
  OrderExtension5: any[];

  @IsOptional()
  CustomerId?: any;

  @IsString()
  OrderId: string;

  @IsArray()
  OrderExtension3: any[];

  @IsArray()
  OrderExtension4: any[];

  @ValidateNested()
  @Type(() => OrderExtension1DTO)
  OrderExtension1: OrderExtension1DTO;

  @IsArray()
  OrderExtension2: any[];

  @IsNumber()
  OrderSubTotal: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDTO)
  Payment: PaymentDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDTO)
  OrderLine: OrderLineDTO[];

  @ValidateNested()
  @Type(() => ShipToAddressDTO)
  @IsOptional()
  ShipToAddress?: ShipToAddressDTO;

  @IsString()
  @IsOptional()
  ShipToAddressString?: string;

  @IsString()
  CustomerTypeId: string;

  @IsOptional()
  NextEventTime?: any;

  @ValidateNested()
  @Type(() => ChangeLogDTO)
  ChangeLog: ChangeLogDTO;

  @IsOptional()
  SourceSystemId?: any;

  @IsNumber()
  TotalTaxes: number;

  @IsOptional()
  CustomerEMailId?: any;

  @IsString()
  CustomerLastName: string;

  @IsString()
  StatusId: string;

  @IsOptional()
  PickupLocationId?: any;

  @IsString()
  PromisedDate: string;

  @IsOptional()
  ShipToKey?: any;

  @IsOptional()
  CustomerPhoneNumber?: any;

  @IsString()
  FulfillmentType: string;

  @IsString()
  OrgId: string;

  @IsOptional()
  BillToKey?: any;

  @IsString()
  DocumentTypeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderNoteDTO)
  OrderNote: OrderNoteDTO[];

  @IsOptional()
  SourceEnterprise?: any;

  @IsArray()
  HeaderCharge: any[];

  @IsArray()
  Release: any[];

  @IsString()
  EntryMethod: string;

  @IsOptional()
  DeliveryMethod?: any;

  @IsArray()
  Milestone: any[];

  @IsString()
  DerivedOrderStatus: string;

  @IsNumber()
  ReleaseTotal: number;

  @IsOptional()
  ShipNode?: any;

  @IsString()
  UpdatedTimestamp: string;

  @IsString()
  PK: string;

  @IsOptional()
  PurgeDate?: any;

  // Additional fields from target structure
  @IsArray()
  OrderTaxDetail: any[];

  @IsString()
  AlternateOrderId: string;
}
