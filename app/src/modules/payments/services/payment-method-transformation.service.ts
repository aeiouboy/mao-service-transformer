import { Injectable } from '@nestjs/common';

import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';

import { PaymentTransactionTransformationService } from './payment-transaction-transformation.service';
import { TransformationContext } from '../../payments/services/payment-transformation.service';

@Injectable()
export class PaymentMethodTransformationService {
  constructor(
    private readonly timestampService: TimestampService,
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly paymentTransactionService: PaymentTransactionTransformationService,
  ) {}

  /**
   * Transform payment method objects from input to release format
   */
  public transformPaymentMethods(
    paymentMethods: any[],
    context: TransformationContext,
  ): any[] {
    // Handle cases where paymentMethods might be null/undefined or not an array
    const methods = Array.isArray(paymentMethods) ? paymentMethods : [];

    return methods.map(method => ({
      Actions: {},
      PK: this.idGenerator.generatePaymentMethodId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: this.timestampService.getTimestamp(
        'payment_method_created',
      ),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: this.timestampService.getTimestamp(
        'payment_method_updated',
      ),
      Messages: null,
      OrgId: context.orgId,
      PaymentMethodId: 'fcf8e04e-f409-408d-b103-233af73af95e',
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
      GatewayId: 'Simulator',
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
      IsModifiable: false,
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
      BillingAddress: this.transformBillingAddress(
        method.BillingAddress,
        context,
      ),
      PaymentMethodAttribute: [],
      PaymentMethodEncrAttribute: [],
      PaymentTransaction:
        this.paymentTransactionService.transformPaymentTransactions(
          method.PaymentTransaction || [],
          context,
        ),
      ParentOrderPaymentMethod: [],
      PaymentType: {
        PaymentTypeId: 'Cash On Delivery',
      },
      CardType: null,
      AccountType: null,
      PaymentCategory: null,
      Extended: {
        BillingNameString:
          `${method.BillingAddress?.Address?.FirstName || ''} ${method.BillingAddress?.Address?.LastName || ''}`.trim(),
        BillingAddressString: `${method.BillingAddress?.Address?.Address1 || ''},${method.BillingAddress?.Address?.Address2 || ''},`,
        InstallmentPlan: null,
        BillingAddressString2: `${method.BillingAddress?.Address?.City || ''},${method.BillingAddress?.Address?.County || ''},${method.BillingAddress?.Address?.State || ''},${method.BillingAddress?.Address?.Country || ''},${method.BillingAddress?.Address?.PostalCode || ''}`,
        InstallmentRate: null,
      },
    }));
  }

  /**
   * Transform billing address object
   */
  public transformBillingAddress(
    billingAddress: any,
    context: TransformationContext,
  ): any {
    // Handle cases where billingAddress might be null/undefined or missing Address
    const addressData = billingAddress?.Address || {};
    const extendedData = billingAddress?.Extended || {};

    return {
      Actions: {},
      PK: this.idGenerator.generateBillingAddressId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: this.timestampService.getTimestamp(
        'billing_address_created',
      ),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: this.timestampService.getTimestamp(
        'billing_address_updated',
      ),
      Messages: null,
      OrgId: context.orgId,
      Address: addressData,
      PurgeDate: null,
      Extended: {
        ...extendedData,
        AddressRef: '|||4016|TH',
      },
    };
  }
}
