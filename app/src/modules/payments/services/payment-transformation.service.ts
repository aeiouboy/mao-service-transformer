import { Injectable } from '@nestjs/common';

import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';
import { PMPOrderInputDTO } from '../../releases/dtos/release-create-order.dto';

import { PaymentMethodTransformationService } from './payment-method-transformation.service';

export interface TransformationContext {
  orderId: string;
  orgId: string;
  input: PMPOrderInputDTO;
  timestamps: Record<string, string>;
  calculationResults: {
    orderSubtotal: number;
    totalCharges: number;
    orderTotalTaxes: number;
    orderDiscounts: number;
  };
}

@Injectable()
export class PaymentTransformationService {
  constructor(
    private readonly timestampService: TimestampService,
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly paymentMethodService: PaymentMethodTransformationService,
  ) {}

  /**
   * Transform payment objects from input to release format
   */
  public transformPayments(
    payments: any[],
    context: TransformationContext,
  ): any[] {
    return payments.map(payment => ({
      Actions: {},
      PK: this.idGenerator.generatePaymentId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: this.timestampService.getTimestamp('payment_created'),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: this.timestampService.getTimestamp('payment_updated'),
      Messages: null,
      OrgId: context.orgId,
      PurgeDate: null,
      OrderId: context.orderId,
      PaymentGroupId: null,
      CustomerId: context.input.CustomerId || null,
      IsCancelled: false,
      AlternateOrderId: null,
      IsAnonymized: false,
      PaymentMethod: this.paymentMethodService.transformPaymentMethods(
        payment.PaymentMethod || [],
        context,
      ),
      Status: {
        StatusId: '5000.000',
      },
      Extended: {},
    }));
  }

  /**
   * Transform payment summary for release header
   */
  public transformPaymentSummary(paymentMethods: any[]): any[] {
    // Handle cases where paymentMethods might be null/undefined or not an array
    const methods = Array.isArray(paymentMethods) ? paymentMethods : [];

    return methods.map(method => ({
      PaymentMethodId: 'fcf8e04e-f409-408d-b103-233af73af95e',
      CurrentAuthAmount: 0,
      AlternateCurrencyAmount: null,
      CurrencyCode: method.CurrencyCode,
      BillingAddress: {
        Email: method?.BillingAddress?.Address?.Email || '',
        BillingAddressId: '7543960028665647216',
        FirstName: method?.BillingAddress?.Address?.FirstName || '',
        Address2: method?.BillingAddress?.Address?.Address2 || '',
        Address3: method?.BillingAddress?.Address?.Address3 || null,
        PostalCode: method?.BillingAddress?.Address?.PostalCode || '',
        Address1: method?.BillingAddress?.Address?.Address1 || '',
        City: method?.BillingAddress?.Address?.City || '',
        County: method?.BillingAddress?.Address?.County || '',
        State: method?.BillingAddress?.Address?.State || '',
        Phone: method?.BillingAddress?.Address?.Phone || '',
        LastName: method?.BillingAddress?.Address?.LastName || '',
        CountryCode: method?.BillingAddress?.Address?.Country || '',
      },
      CardTypeId: null,
      CurrentSettleAmount: method.CurrentSettledAmount,
      AccountDisplayNumber: null,
      RoutingDisplayNumber: null,
      PaymentTypeId: 'Cash On Delivery',
      FrankedCheckQuantity: null,
      BusinessName: null,
      EntryTypeId: null,
      Amount: method.Amount,
      CheckQuantity: null,
      AlternateCurrencyCode: null,
      GatewayId: null,
      CheckNumber: null,
      OriginalAmount: null,
      IsSuspended: method.IsSuspended,
      IsVoided: method.IsVoided,
      ChargeSequence: null,
      AccountTypeId: null,
      ConversionRate: null,
      IsFranked: null,
      ChangeAmount: null,
      StatusId: null,
      CurrentRefundAmount: 0,
      CurrentPreSettleAmount: null,
    }));
  }
}
