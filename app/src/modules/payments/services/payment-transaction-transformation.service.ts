import { Injectable } from '@nestjs/common';

import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';

import { TransformationContext } from '../../payments/services/payment-transformation.service';

@Injectable()
export class PaymentTransactionTransformationService {
  constructor(
    private readonly timestampService: TimestampService,
    private readonly idGenerator: DynamicIdGeneratorService,
  ) {}

  /**
   * Transform payment transaction objects from input to release format
   */
  public transformPaymentTransactions(
    transactions: any[],
    context: TransformationContext,
  ): any[] {
    // Handle cases where transactions might be null/undefined or not an array
    const transactionList = Array.isArray(transactions) ? transactions : [];

    return transactionList.map(transaction => ({
      Actions: {},
      PK: this.idGenerator.generatePaymentTransactionId(),
      CreatedBy: 'pubsubuser@pmp',
      CreatedTimestamp: this.timestampService.getTimestamp(
        'payment_transaction_created',
      ),
      UpdatedBy: 'pubsubuser@pmp',
      UpdatedTimestamp: this.timestampService.getTimestamp(
        'payment_transaction_updated',
      ),
      Messages: null,
      OrgId: context.orgId,
      PaymentTransactionId: 'fcf8e04e-f409-408d-b103-233af73af95e',
      RequestedAmount: transaction.RequestedAmount,
      RequestId: context.orderId,
      RequestToken: context.orderId,
      RequestedDate: null,
      FollowOnId: null,
      FollowOnToken: null,
      TransactionDate: '2025-08-05T12:13:12',
      TransactionExpiryDate: null,
      ProcessedAmount: transaction.ProcessedAmount,
      FollowOnProcessedAmount: null,
      RemainingAttempts: null,
      FollowOnCount: null,
      ReconciliationId: context.orderId,
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
        ...transaction.TransactionType,
        PaymentTransactionTypeId: 'Settlement',
      },
      Status: {
        ...transaction.Status,
        PaymentTransactionStatusId: 'Closed',
      },
      AuthorizationType: null,
      ProcessingMode: null,
      PaymentResponseStatus: {
        ...transaction.PaymentResponseStatus,
        PaymentResponseStatusId: 'Success',
      },
      TransmissionStatus: {
        ...transaction.TransmissionStatus,
        PaymentTransmissionStatusId: 'Closed',
      },
      InteractionMode: null,
      NotificationStatus: null,
      Extended: {},
    }));
  }
}
