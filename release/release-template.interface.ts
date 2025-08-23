/**
 * Release Template Interfaces
 * Type definitions for the complex nested release structure
 * Updated to align with new Sequelize models (camelCase naming)
 */

export interface ReleaseTemplate {
  // Top-level fields (camelCase)
  serviceLevelCode: string;
  email: string;
  maxFulfillmentStatusId: string;
  isOnHold: boolean;
  isConfirmed: boolean;
  orderSubtotal: number;
  modeId: string | null;
  sellingLocationId: string | null;
  currencyCode: string;
  customerPhone: string;
  customerFirstName: string;
  releaseTotal: number;
  extendedFields: {
    cancelAllowed: boolean;
  };
  totalCharges: number;
  externalShipFromLocationId: string | null;
  taxExemptId: string | null;
  addressId: string;
  
  // Nested Order structure
  order: {
    payment: PaymentTemplate[];
    orderLine: OrderLineTemplate[];
  };
  
  // Address fields
  postalCode: string;
  organizationId: string;
  invoiceId: string | null;
  county: string;
  isPostVoided: boolean | null;
  alternateOrderId: string;
  customerEmail: string;
  phone: string;
  orderTypeId: string;
  paymentStatusId: string;
  customerCommPref: string | null;
  sellingChannelId: string;
  minFulfillmentStatusId: string;
  releaseType: string | null;
  createOrderTimeStamp: string;
  externalOrganizationId: string | null;
  effectiveRank: string;
  shipToLocationId: string | null;
  deliveryMethod: string;
  noOfDeliveryLines: number;
  firstName: string;
  
  // Release Lines
  releaseLine: ReleaseLineTemplate[];
  
  // Address details
  address2: string;
  shipViaId: string;
  address3: string | null;
  address1: string;
  
  // Process Info
  processInfo: ProcessInfoTemplate;
  
  // Additional fields
  cancelReasonId: string | null;
  postVoIdReasonId: string | null;
  orderLocale: string;
  orderTotalCharges: number;
  totalTaxes: number;
  customerLastName: string;
  capturedDate: string;
  carrierCode: string;
  addressType: string;
  orderTotal: number;
  totalDiscounts: number;

  // Missing fields from Order model
  customerTypeId?: string;
  sellingChannel?: string;
  orderSubTotal?: number;
  cancelledOrderSubTotal?: number;
  cancelAllowed?: boolean;
  isCancelled?: boolean;
  orderStatus?: string;
  fulfillmentStatus?: string;
  paymentStatus?: string;
  doNotReleaseBefore?: Date;
  
  // JSONB fields
  docType?: object;
  orderHold?: object;
  orderActions?: object;
  orderExtension1?: object;
  orderChargeDetail?: object;
  orderTaxDetail?: object;
  orderType?: object;
  
  // Audit fields
  parentId?: number;
  version?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Missing fields from Release model
  releaseId?: string;
  orgId?: string;
  shipFromLocationId?: string;
  deliveryMethodId?: string;
  process?: string;
  destinationAction?: string;
  releaseExtension_1?: object;
}

export interface PaymentTemplate {
  actions: Record<string, any>;
  pk: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
  messages: any | null;
  orgId: string;
  purgeDate: string | null;
  orderId: string;
  paymentGroupId: string | null;
  customerId: string | null;
  isCancelled: boolean;
  alternateOrderId: string | null;
  isAnonymized: boolean;
  paymentMethod: PaymentMethodTemplate[];

  // Missing fields from Payment model
  paymentId: string;
  statusId?: string;
  message?: string;
  processingMode?: object;
  
  // Audit fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentMethodTemplate {
  actions: Record<string, any>;
  pk: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
  messages: any | null;
  orgId: string;
  paymentMethodId: string;
  currencyCode: string;
  alternateCurrencyCode: string | null;
  conversionRate: number | null;
  alternateCurrencyAmount: number | null;
  accountNumber: string | null;
  accountDisplayNumber: string | null;
  nameOnCard: string | null;
  swipeData: string | null;
  cardExpiryMonth: string | null;
  cardExpiryYear: string | null;
  giftCardPin: string | null;
  customerSignature: string | null;
  customerPaySignature: string | null;
  changeAmount: number | null;
  amount: number;
  currentAuthAmount: number;
  currentSettledAmount: number;
  currentRefundAmount: number;
  chargeSequence: string | null;
  isSuspended: boolean;
  entryTypeId: string | null;
  gatewayId: string;
  routingNumber: string | null;
  routingDisplayNumber: string | null;
  checkNumber: string | null;
  driversLicenseNumber: string | null;
  driversLicenseState: string | null;
  driversLicenseCountry: string | null;
  businessName: string | null;
  businessTaxId: string | null;
  checkQuantity: number | null;
  originalAmount: number | null;
  isModifiable: boolean;
  currentFailedAmount: number;
  parentOrderId: string | null;
  parentPaymentGroupId: string | null;
  parentPaymentMethodId: string | null;
  isVoided: boolean;
  isCopied: boolean;
  gatewayAccountId: string | null;
  locationId: string | null;
  transactionReferenceId: string | null;
  capturedInEdgeMode: boolean;
  merchandiseAmount: number;
  capturedSource: string | null;
  shopperReference: string | null;
  suggestedAmount: number | null;
  purgeDate: string | null;
  billingAddress: BillingAddressTemplate;

  // Additional fields from PaymentMethod model
  processingMode?: object;
  
  // Audit fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BillingAddressTemplate {
  actions: Record<string, any>;
  pk: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
  messages: any | null;
  orgId: string;
  addressId: string;
  addressTypeId: string;
  address1: string;
  address2: string;
  address3: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string | null;
  isDefault: boolean;
  isActive: boolean;
  isVerified: boolean;
  isAnonymized: boolean;
  purgeDate: string | null;
  paymentTransaction: PaymentTransactionTemplate[];
}

export interface PaymentTransactionTemplate {
  actions: Record<string, any>;
  pk: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
  messages: any | null;
  orgId: string;
  transactionId: string;
  transactionTypeId: string;
  transactionStatusId: string;
  amount: number;
  currencyCode: string;
  gatewayId: string;
  gatewayTransactionId: string;
  gatewayResponseCode: string;
  gatewayResponseMessage: string;
  gatewayResponseDate: string;
  isApproved: boolean;
  isDeclined: boolean;
  isError: boolean;
  isVoided: boolean;
  isRefunded: boolean;
  isSettled: boolean;
  settlementDate: string | null;
  authorizationCode: string;
  referenceNumber: string;
  batchNumber: string;
  sequenceNumber: string;
  entryMethod: string;
  cardType: string;
  cardNumber: string;
  cardExpiryMonth: string | null;
  cardExpiryYear: string | null;
  cardHolderName: string;
  avsResult: string;
  cvvResult: string;
  isDuplicate: boolean;
  duplicateWindow: number;
  isTest: boolean;
  purgeDate: string | null;
}

export interface OrderLineTemplate {
  actions: Record<string, any>;
  pk: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
  messages: any | null;
  orgId: string;
  orderLineId: string;
  orderId: string;
  itemId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  orderLineStatusId: string;
  fulfillmentStatusId: string;
  deliveryMethodId: string;
  shippingMethodId: string;
  promisedDeliveryDate: string | null;
  requestedDeliveryDate: string | null;
  isGift: boolean;
  isTaxIncluded: boolean;
  isDiscountable: boolean;
  isReturnable: boolean;
  isHazmat: boolean;
  isPerishable: boolean;
  isPreOrder: boolean;
  isOnHold: boolean;
  isCancelled: boolean;
  taxAmount: number;
  discountAmount: number;
  shippingAmount: number;
  chargeAmount: number;
  refundAmount: number;
  fulfilledQuantity: number;
  cancelledQuantity: number;
  returnedQuantity: number;
  allocation: AllocationTemplate[];

  // Missing fields from OrderLine model
  releaseGroupId?: string;
  fulfillmentGroupId?: string;
  maxFulfillmentStatusId?: string;
  minFulfillmentStatusId?: string;
  shipToLocationId?: string;
  shipFromAddressId?: string;
  
  // Audit fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AllocationTemplate {
  actions: Record<string, any>;
  pk: string;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
  messages: any | null;
  orgId: string;
  allocationId: string;
  orderLineId: string;
  itemId: string;
  quantity: number;
  locationId: string;
  allocationDate: string;
  allocationStatusId: string;
  isActive: boolean;
  isCancelled: boolean;
  isReleased: boolean;
  releaseDate: string | null;
  purgeDate: string | null;

  // Missing fields from Allocations model
  allocationType?: string;
  statusId?: string;
  shipFromLocationId?: string;
  uom?: string;
  carrierCode?: string;
  allocatedOn?: Date;
  
  // Audit fields
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReleaseLineTemplate {
  cancelledQuantity: number;
  serviceLevelCode: string | null;
  lineTypeId: string | null;
  orderLineTotalCharges: number;
  fulfilledQuantity: number;
  isReturnable: boolean;
  isTaxIncluded: boolean;
  isHazmat: boolean;
  refundPrice: number | null;
  taxOverrideValue: number | null;
  maxFulfillmentStatusId: string;
  isOnHold: boolean;
  itemWebURL: string | null;
  itemId: string;
  shippingMethodId: string;
  sellingLocationId: string | null;
  isGift: boolean;
  parentOrderLineId: string | null;
  totalCharges: number;
  parentOrderId: string | null;
  itemStyle: string;
  taxExemptId: string | null;
  priority: string | null;
  smallImageURI: string;
  deliveryMethodId: string;
  isDiscountable: boolean;
  isCancelled: boolean;
  taxOverrideTypeId: string | null;
  itemBrand: string;
  isPreOrder: boolean;
  orderLineTotalDiscounts: number;
  parentOrderLineTypeId: string | null;
  isTaxExempt: boolean | null;
  promisedDeliveryDate: string | null;
  chargeDetail: ChargeDetailTemplate[];
  isPerishable: boolean;
  latestDeliveryDate: string | null;
  note: NoteTemplate[];
  allocation: ReleaseLineAllocationTemplate[];
  cancelReasonId: string | null;
  releaseLineId: string;
  parentItemId: string | null;
  isReturnableAtStore: boolean;
  fulfillmentGroupId: string;
  uom: string;
  orderLineSubtotal: number;
  unitPrice: number;
  orderLineId: string;
  totalTaxes: number;
  orderLineTotalTaxes: number;
  requestedDeliveryDate: string | null;
  carrierCode: string | null;
  originalUnitPrice: number;
  totalDiscounts: number;

  // Missing fields from ReleaseLines model
  allocationId?: string;
  orgId?: string;
  quantity?: string;
  effectiveRank?: number;
  process?: string;
  cancelledDate?: Date;
  
  // Audit fields
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChargeDetailTemplate {
  isProrated: boolean | null;
  isInformational: boolean;
  taxCode: string;
  chargeTotal: number;
  headerChargeDetailId: string;
  chargeSubTypeId: string | null;
  chargeDisplayName: string;
  extended: any | null;
  chargeDetailId: string;
  relatedChargeType: string | null;
  chargeTypeId: string;
  relatedChargeDetailId: string | null;
}

export interface NoteTemplate {
  noteId: string;
  noteTypeId: string;
  noteText: string;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string;
  createdTimestamp: string;
  updatedBy: string;
  updatedTimestamp: string;
}

export interface ReleaseLineAllocationTemplate {
  allocationId: string;
  orderLineId: string;
  itemId: string;
  quantity: number;
  locationId: string;
  allocationDate: string;
  allocationStatusId: string;
  isActive: boolean;
  isCancelled: boolean;
  isReleased: boolean;
  releaseDate: string | null;
}

export interface ProcessInfoTemplate {
  internalGoodsDescription: string | null;
  accountReceivableCode: string | null;
  isAutoCreateBlocked: boolean | null;
  shipLocationControl: string | null;
  scheduleDeliveryDate: string | null;
  globalLocationNumber: string | null;
  advertisingCode: string | null;
  movementOption: string | null;
  shipmentPlanningScheduleDay: string | null;
  isCartonMinWeight: boolean | null;
  isBackOrdered: boolean | null;
  extendedFields: any | null;
  waveId: string | null;
  routingAttributes: any | null;
  planningOriginFacilityId: string | null;
  isAutoConsolidationBlocked: boolean | null;
  designatedShipVia: string | null;
  declaredValueCurrencyCode: string | null;
  billOfLadingBreakAttribute: string | null;
  priority: string | null;
  shipmmentPlanningScheduleDay: string | null;
  accountReceivableAccountNumber: string | null;
  lpnCubingIndicator: boolean | null;
  parentOrder: any | null;
  routeType1: string | null;
  routeType2: string | null;
  secondryMaxicodeAddressNumber: string | null;
  internationalGoodsDescription: string | null;
  advertisingDate: string | null;
  organizationId: string | null;
  routeTo: string | null;
  fedexDutyTaxAccountID: string | null;
  ftsrNumber: string | null;
  language: string | null;
  dsgStaticRouteId: string | null;
  cashOnDeliveryFund: string | null;
  palletCubingIndicator: boolean | null;
  destinationShipThroughLocation: string | null;
  declaredValue: number | null;
  customerBrokerAccountNumber: string | null;
  routeWaveNumber: string | null;
  fedexDutyTaxPaymentType: string | null;
  importerDefinition: string | null;
  moveType: string | null;
  freightForwardAccountNumber: string | null;
  isWarehouseTransfer: boolean | null;
  isShipmentDocumentsOnly: boolean | null;
  customerDepartment: string | null;
  transportationWaveOptionId: string | null;
  planningDestinationFacilityId: string | null;
  pk: string | null;
  primaryMaxicodeAddressNumber: string | null;
  designatedEquipmentId: string | null;
}
