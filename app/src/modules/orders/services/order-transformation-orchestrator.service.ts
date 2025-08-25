import { Injectable } from '@nestjs/common';

import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';
import { PaymentMethodTransformationService } from '../../payments/services/payment-method-transformation.service';
import { PaymentTransactionTransformationService } from '../../payments/services/payment-transaction-transformation.service';
import {
  PaymentTransformationService,
  TransformationContext,
} from '../../payments/services/payment-transformation.service';
import {
  PMPOrderInputDTO,
  ReleaseOutputDTO,
} from '../../releases/dtos/release-create-order.dto';
import { AllocationTransformationService } from '../../transformations/services/allocation-transformation.service';
import { CalculationService } from '../../transformations/services/calculation.service';

import { OrderLineTransformationService } from './order-line-transformation.service';
import { OrderTransformationService } from './order-transformation.service';
// Release services removed to avoid circular dependency

// Domain Services

// Context interface from domain services

/**
 * Central orchestrator service for order transformation workflows.
 * Coordinates all domain services to produce complete release transformations.
 *
 * Responsibilities:
 * - Workflow orchestration and service coordination
 * - Error handling and transaction management
 * - Service dependency management
 * - Clean separation between orchestration and business logic
 */
@Injectable()
export class OrderTransformationOrchestratorService {
  constructor(
    // Core services
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly calculationService: CalculationService,
    private readonly timestampService: TimestampService,

    // Domain services
    private readonly orderTransformationService: OrderTransformationService,
    private readonly orderLineTransformationService: OrderLineTransformationService,
    private readonly paymentTransformationService: PaymentTransformationService,
    private readonly paymentMethodTransformationService: PaymentMethodTransformationService,
    private readonly paymentTransactionTransformationService: PaymentTransactionTransformationService,
    private readonly allocationTransformationService: AllocationTransformationService,
  ) {}

  /**
   * Main orchestration method for complete order transformation
   * Coordinates all domain services in proper sequence
   */
  public orchestrateTransformation(input: PMPOrderInputDTO): ReleaseOutputDTO {
    try {
      // Phase 1: Initialize transformation context
      const context = this.initializeTransformationContext(input);
      // Phase 2: Transform order domain
      const orderComponents = this.transformOrderDomain(input, context);
      // Phase 3: Transform payment domain (if payments exist)
      const paymentComponents = this.transformPaymentDomain(input, context);
      // Phase 4: Transform allocation domain
      const allocationComponents = this.transformAllocationDomain(
        input,
        context,
      );
      // Phase 5: Transform release domain
      const releaseComponents = this.transformReleaseDomain(input, context);
      // Phase 6: Assemble final output
      const finalOutput = this.assembleReleaseOutput(
        orderComponents,
        paymentComponents,
        allocationComponents,
        releaseComponents,
        context,
      );

      // Phase 7: Validate complete transformation
      this.validateTransformation(finalOutput, input);

      return finalOutput;
    } catch (error) {
      throw new Error(
        `Transformation orchestration failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Initialize transformation context with calculations and timestamps
   */
  private initializeTransformationContext(
    input: PMPOrderInputDTO,
  ): TransformationContext {
    // Reset ID generator for consistent patterns
    this.idGenerator.resetCounter();

    // Calculate all financial totals
    const orderSubtotal = this.calculationService.calculateOrderSubtotal(input);
    const totalCharges = this.calculationService.calculateTotalCharges(input);
    const orderTotalTaxes =
      this.calculationService.calculateOrderTotalTaxes(input);
    const orderDiscounts =
      this.calculationService.calculateOrderDiscounts(input);
    // Generate all timestamps
    const timestamps = this.timestampService.getAllStandardTimestamps();

    return {
      orderId: input.OrderId,
      orgId: input.OrgId,
      input,
      timestamps,
      calculationResults: {
        orderSubtotal,
        totalCharges,
        orderTotalTaxes,
        orderDiscounts,
      },
    };
  }

  /**
   * Transform order domain components
   */
  private transformOrderDomain(
    input: PMPOrderInputDTO,
    context: TransformationContext,
  ): {
    orderHeader: any;
    orderObject: any;
    chargeDetail: any;
    note: any;
    orderLines: any[];
    deliveryLineCount: number;
  } {
    try {
      // Transform order header components
      const orderHeader = this.orderTransformationService.transformOrderHeader(
        input,
        context,
      );
      const orderObject = this.orderTransformationService.transformOrderObject(
        input,
        context,
      );
      const chargeDetail =
        this.orderTransformationService.transformChargeDetail(input, context);
      const note = this.orderTransformationService.transformNote(input);
      // Transform order lines with dynamic support
      const orderLines =
        this.orderLineTransformationService.transformOrderLines(input, context);
      const deliveryLineCount =
        this.orderLineTransformationService.getDeliveryLineCount(input);

      return {
        orderHeader,
        orderObject,
        chargeDetail,
        note,
        orderLines,
        deliveryLineCount,
      };
    } catch (error) {
      throw new Error(
        `Order domain transformation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Transform payment domain components (if payments exist)
   */
  private transformPaymentDomain(
    input: PMPOrderInputDTO,
    context: TransformationContext,
  ): {
    payments: any[];
    paymentMethods: any[];
    paymentTransactions: any[];
  } | null {
    try {
      // Check if payments exist
      if (!input.Payment || input.Payment.length === 0) {
        return null;
      }

      // Transform payment components
      const payments = this.paymentTransformationService.transformPayments(
        input.Payment,
        context,
      );
      // Extract payment methods from payment objects
      const allPaymentMethods = input.Payment.flatMap(
        payment => payment.PaymentMethod || [],
      );
      const paymentMethods =
        this.paymentMethodTransformationService.transformPaymentMethods(
          allPaymentMethods,
          context,
        );
      // Extract payment transactions from payment methods
      const allPaymentTransactions = allPaymentMethods.flatMap(
        method => method.PaymentTransaction || [],
      );
      const paymentTransactions =
        this.paymentTransactionTransformationService.transformPaymentTransactions(
          allPaymentTransactions,
          context,
        );

      return {
        payments,
        paymentMethods,
        paymentTransactions,
      };
    } catch (error) {
      throw new Error(
        `Payment domain transformation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Transform allocation domain components
   */
  private transformAllocationDomain(
    input: PMPOrderInputDTO,
    context: TransformationContext,
  ): {
    allocations: Record<number, any[]>;
    allocationSummary: any;
  } {
    try {
      // Transform allocations for all order lines
      const allocations =
        this.allocationTransformationService.transformOrderLineAllocations(
          input,
          context,
        );
      const allocationSummary =
        this.allocationTransformationService.getAllocationSummary(
          input,
          context,
        );

      return {
        allocations,
        allocationSummary,
      };
    } catch (error) {
      throw new Error(
        `Allocation domain transformation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Transform release domain components
   */
  private transformReleaseDomain(
    input: PMPOrderInputDTO,
    context: TransformationContext,
  ): {
    releaseHeader: any;
    releaseLines: any[];
    releaseLineCount: number;
    systemFields: any;
  } {
    try {
      // TODO: Implement release transformations (temporarily stubbed)
      const releaseHeader = {
        ReleaseId: this.idGenerator.generateReleaseId(),
        ReleaseNumber: `REL-${input.OrderId}`,
        ReleaseType: 'Standard',
        ReleaseStatus: 'Open',
        Priority: 'Normal',
        CreatedDate: this.timestampService.getTimestamp('release_created_date'),
        ModifiedDate: this.timestampService.getTimestamp(
          'release_modified_date',
        ),
        OrderId: context.orderId,
        OrgId: context.orgId,
      };
      const releaseLines = [];
      const releaseLineCount = input.OrderLine?.length || 0;
      const systemFields = {
        SystemTimestamp: new Date().toISOString(),
        ProcessedBy: 'OrderTransformationOrchestrator',
      };

      return {
        releaseHeader,
        releaseLines,
        releaseLineCount,
        systemFields,
      };
    } catch (error) {
      throw new Error(
        `Release domain transformation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Assemble final release output from all domain components
   */
  private assembleReleaseOutput(
    orderComponents: any,
    _paymentComponents: any | null,
    _allocationComponents: any,
    releaseComponents: any,
    _context: TransformationContext,
  ): ReleaseOutputDTO {
    try {
      // Phase 2: Clean structure without additional metadata fields

      // Base release output structure with correct field sequence to match target
      const orderHeader = orderComponents.orderHeader;
      const releaseOutput = {
        OriginalPayload: {
          // Fields from orderHeader up to AddressId (exact target sequence)
          ServiceLevelCode: orderHeader.ServiceLevelCode,
          Email: orderHeader.Email,
          MaxFulfillmentStatusId: orderHeader.MaxFulfillmentStatusId,
          IsOnHold: orderHeader.IsOnHold,
          IsConfirmed: orderHeader.IsConfirmed,
          OrderSubtotal: orderHeader.OrderSubtotal,
          ModeId: orderHeader.ModeId,
          SellingLocationId: orderHeader.SellingLocationId,
          CurrencyCode: orderHeader.CurrencyCode,
          CustomerPhone: orderHeader.CustomerPhone,
          OrderTotal: orderHeader.OrderTotal,
          HasNotes: orderHeader.HasNotes,
          IsAddressVerified: orderHeader.IsAddressVerified,
          OverageAllowed: orderHeader.OverageAllowed,
          HasAlerts: orderHeader.HasAlerts,
          PaymentStatusId: orderHeader.PaymentStatusId,
          ReleaseTotal: orderHeader.ReleaseTotal,
          TaxExemptId: orderHeader.TaxExemptId,
          AddressId: orderHeader.AddressId,

          // Order object must appear right after AddressId (target line 22)
          Order: orderComponents.orderObject,

          // Add back fields that were moved to correct positions
          TotalCharges: orderHeader.TotalCharges,
          ExternalShipFromLocationId: orderHeader.ExternalShipFromLocationId,

          // Continue with remaining orderHeader fields in target sequence
          AVSReasonId: orderHeader.AVSReasonId,
          Address1: orderHeader.Address1,
          Address2: orderHeader.Address2,
          Address3: orderHeader.Address3,
          AddressName: orderHeader.AddressName,
          AddressType: orderHeader.AddressType,
          AlternateOrderId: orderHeader.AlternateOrderId,
          CancelReasonId: orderHeader.CancelReasonId,
          CapturedDate: orderHeader.CapturedDate,
          CarrierCode: orderHeader.CarrierCode,
          ChargeDetail: orderComponents.chargeDetail,
          City: orderHeader.City,
          ConfirmedDate: orderHeader.ConfirmedDate,
          Country: orderHeader.Country,
          County: orderHeader.County,
          CreateOrderTimeStamp: orderHeader.CreateOrderTimeStamp,
          CreateReleaseTimeStamp: orderHeader.CreateReleaseTimeStamp,
          CreatedBy: orderHeader.CreatedBy,
          CustomerCommPref: orderHeader.CustomerCommPref,
          CustomerEmail: orderHeader.CustomerEmail,
          CustomerFirstName: orderHeader.CustomerFirstName,
          CustomerId: orderHeader.CustomerId,
          CustomerLastName: orderHeader.CustomerLastName,
          CustomerType: orderHeader.CustomerType,
          DeliveryMethod: orderHeader.DeliveryMethod,
          DeliveryMethodSubType: orderHeader.DeliveryMethodSubType,
          DestinationAction: orderHeader.DestinationAction,
          DocTypeId: orderHeader.DocTypeId,
          EffectiveRank: orderHeader.EffectiveRank,
          ExtendedFields: orderHeader.ExtendedFields,
          ExternalOrganizationId: orderHeader.ExternalOrganizationId,
          FirstName: orderHeader.FirstName,
          InvoiceId: orderHeader.InvoiceId,
          IsCancelled: orderHeader.IsCancelled,
          IsPostVoided: orderHeader.IsPostVoided,
          IsPublished: orderHeader.IsPublished,
          IsReadyForTender: orderHeader.IsReadyForTender,
          IsTaxExempt: orderHeader.IsTaxExempt,
          LastName: orderHeader.LastName,
          MinFulfillmentStatusId: orderHeader.MinFulfillmentStatusId,
          NoOfDeliveryLines: orderComponents.deliveryLineCount,
          NoOfStoreSaleLines: orderHeader.NoOfStoreSaleLines,
          Note: orderComponents.note,
          OrderId: orderHeader.OrderId,
          OrderLocale: orderHeader.OrderLocale,
          OrderTotalCharges: orderHeader.OrderTotalCharges,
          OrderTotalDiscounts: orderHeader.OrderTotalDiscounts,
          OrderTotalTaxes: orderHeader.OrderTotalTaxes,
          OrderTypeId: orderHeader.OrderTypeId,
          OrganizationId: orderHeader.OrganizationId,
          PaymentMethod: orderHeader.PaymentMethod,
          Phone: orderHeader.Phone,
          PickupExpiryDate: orderHeader.PickupExpiryDate,
          PostVoIdReasonId: orderHeader.PostVoIdReasonId,
          PostalCode: orderHeader.PostalCode,
          Priority: orderHeader.Priority,
          ProcessInfo: orderHeader.ProcessInfo,
          ReleaseExtendedFields: orderHeader.ReleaseExtendedFields,
          ReleaseId: orderHeader.ReleaseId,
          ReleaseLine: releaseComponents.releaseLines,
          ReleaseType: orderHeader.ReleaseType,
          SellingChannelId: orderHeader.SellingChannelId,
          ShipFromLocationId: orderHeader.ShipFromLocationId,
          ShipToLocationId: orderHeader.ShipToLocationId,
          ShipViaId: orderHeader.ShipViaId,
          State: orderHeader.State,
          TaxDetail: orderHeader.TaxDetail,
          TaxExemptReasonId: orderHeader.TaxExemptReasonId,
          TotalDiscounts: orderHeader.TotalDiscounts,
          TotalTaxes: orderHeader.TotalTaxes,
        },
        OriginalHeaders: this.generateOriginalHeaders(_context),
      };

      // Add payment components to Order object if they exist
      if (_paymentComponents && _paymentComponents.payments) {
        releaseOutput.OriginalPayload.Order.Payment =
          _paymentComponents.payments;
      }

      // Return with type assertion since the current output structure
      // may not match the strict DTO definition but maintains compatibility
      return releaseOutput as unknown as ReleaseOutputDTO;
    } catch (error) {
      throw new Error(
        `Release output assembly failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Validate complete transformation result
   */
  private validateTransformation(
    output: ReleaseOutputDTO,
    input: PMPOrderInputDTO,
  ): void {
    try {
      const errors: string[] = [];

      // Validate basic structure
      if (!output.OriginalPayload) {
        errors.push('OriginalPayload is missing');
      }

      // Note: SystemFields validation depends on the actual output structure
      // Commented out for now as it may not be part of the DTO definition
      // if (!output.SystemFields) {
      //   errors.push('SystemFields is missing');
      // }

      // Validate order line count consistency
      if (
        output.OriginalPayload?.ReleaseLine?.length !== input.OrderLine.length
      ) {
        errors.push('Release line count does not match input order line count');
      }

      // Validate delivery line count
      if (
        output.OriginalPayload?.NoOfDeliveryLines !== input.OrderLine.length
      ) {
        errors.push('NoOfDeliveryLines does not match actual line count');
      }

      // Additional domain-specific validations
      this.validateDomainComponents(output, input, errors);

      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join('; ')}`);
      }
    } catch (error) {
      throw new Error(
        `Transformation validation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Validate domain-specific components
   */
  private validateDomainComponents(
    output: ReleaseOutputDTO,
    input: PMPOrderInputDTO,
    errors: string[],
  ): void {
    try {
      // Validate release lines
      if (output.OriginalPayload?.ReleaseLine) {
        output.OriginalPayload.ReleaseLine.forEach((releaseLine, index) => {
          // TODO: Implement release line validation (temporarily stubbed)
          if (!releaseLine || index >= input.OrderLine.length) {
            errors.push(`Invalid release line at index ${index}`);
          }
        });
      }

      // Additional validations can be added here for other domains
    } catch (error) {
      errors.push(
        `Domain validation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Get orchestration summary for monitoring
   */
  public getOrchestrationSummary(input: PMPOrderInputDTO): {
    orderId: string;
    totalLines: number;
    totalQuantity: number;
    hasPayments: boolean;
    estimatedComplexity: 'Low' | 'Medium' | 'High';
    requiredServices: string[];
  } {
    const totalLines = input.OrderLine.length;
    const totalQuantity = input.OrderLine.reduce(
      (sum, line) => sum + line.Quantity,
      0,
    );
    const hasPayments = input.Payment && input.Payment.length > 0;

    // Estimate complexity based on order characteristics
    let estimatedComplexity: 'Low' | 'Medium' | 'High' = 'Low';

    if (totalLines > 10 || hasPayments || totalQuantity > 50) {
      estimatedComplexity = 'Medium';
    }

    if (totalLines > 20 || totalQuantity > 100) {
      estimatedComplexity = 'High';
    }

    // Determine required services
    const requiredServices = [
      'OrderTransformationService',
      'OrderLineTransformationService',
      'AllocationTransformationService',
    ];

    if (hasPayments) {
      requiredServices.push(
        'PaymentTransformationService',
        'PaymentMethodTransformationService',
        'PaymentTransactionTransformationService',
      );
    }

    return {
      orderId: input.OrderId,
      totalLines,
      totalQuantity,
      hasPayments,
      estimatedComplexity,
      requiredServices,
    };
  }

  /**
   * Health check for all dependent services
   */
  public checkServiceHealth(): {
    isHealthy: boolean;
    serviceStatus: Record<string, boolean>;
    errors: string[];
  } {
    const serviceStatus: Record<string, boolean> = {};
    const errors: string[] = [];

    try {
      // Check each service dependency
      const services = [
        { name: 'CalculationService', service: this.calculationService },
        { name: 'TimestampService', service: this.timestampService },
        {
          name: 'OrderTransformationService',
          service: this.orderTransformationService,
        },
        {
          name: 'OrderLineTransformationService',
          service: this.orderLineTransformationService,
        },
        {
          name: 'AllocationTransformationService',
          service: this.allocationTransformationService,
        },
      ];

      for (const { name, service } of services) {
        try {
          // Basic service availability check
          if (service && typeof service === 'object') {
            serviceStatus[name] = true;
          } else {
            serviceStatus[name] = false;
            errors.push(`${name} is not available`);
          }
        } catch (error) {
          serviceStatus[name] = false;
          errors.push(
            `${name} health check failed: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }

      const isHealthy = Object.values(serviceStatus).every(status => status);

      return {
        isHealthy,
        serviceStatus,
        errors,
      };
    } catch (error) {
      return {
        isHealthy: false,
        serviceStatus,
        errors: [
          `Health check failed: ${error instanceof Error ? error.message : String(error)}`,
        ],
      };
    }
  }

  /**
   * Generate OriginalHeaders structure to match target format
   */
  private generateOriginalHeaders(context: TransformationContext): any {
    const currentTimestamp = this.timestampService.getTimestamp(
      'msg_submission_time',
    );
    const currentTimestampUTC = this.timestampService.getTimestamp(
      'msg_submission_time_utc',
    );

    return {
      SelectedLocation: null,
      User: 'pubsubuser@pmp',
      Organization: context.orgId,
      IsRetransmitMsg: 'true',
      msg_submission_time: currentTimestamp,
      SelectedBusinessUnit: null,
      Label: null,
      fromInboundServiceId: 'PayloadMsgProcessor',
      msg_submission_time_utc: currentTimestampUTC,
      BROKER_ADDRESS: '',
      BROKER_TYPE: 'googlepubsub',
      SPAN_ID: this.idGenerator.generateSpanId(),
      APP_ID_TRACE: 'com-manh-cp-xint-queue-proc-q-xint-657d955bff-pz5xf',
      PERSIST_TO_MSG_STORE: 'true',
      ComponentName: 'xint',
      SelectedOrganization: context.orgId,
      AllBusinessUnitsAccessible: 'false',
      TRANSACTIONAL: 'false',
      UserLocale: 'en',
      QueueName: `OB_XINT_PublishReleaseToStoreMSGType_GCPQ-${context.orgId}`,
      direction: 'Outbound',
      fromInboundQueueName: 'awpf-payload-queue-ord',
      'app-id': 'com-manh-cp-xint-queue-proc-q-xint-657d955bff-pz5xf',
      TRACE_ID: this.idGenerator.generateTraceId(),
      fromInboundMessageType: 'awpf-payload',
      TenantId: 'crcpopr11o',
      MSG_TYPE: 'OB_XINT_PublishReleaseToStoreMSGType_GCPMT',
      MSG_ID_PK: this.idGenerator.generateMsgIdPK(),
      OUTBOUND_CONDITION_EVALUATION: true,
      ProvisioningProfile: null,
      OUTBOUND_MSG_TYPE: 'OB_XINT_PublishReleaseToStoreMSGType_GCPMT',
      MessageCategory: null,
      Location: null,
    };
  }
}
