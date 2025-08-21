import { Injectable } from '@nestjs/common';

import { PMPOrderInputDTO } from '../dtos/release-create-order.dto';
import { DynamicIdGeneratorService } from '../../../shared/services/dynamic-id-generator.service';
import { TimestampService } from '../../../shared/services/timestamp.service';

import { TransformationContext } from '../../payments/services/payment-transformation.service';

/**
 * Service responsible for release header transformation logic.
 * Handles release-level metadata, configuration, and coordination with release lines.
 *
 * Domain: Releases
 * Tables: releases
 * Responsibilities: Release creation, metadata management, release coordination
 */
@Injectable()
export class ReleaseTransformationService {
  constructor(
    private readonly idGenerator: DynamicIdGeneratorService,
    private readonly timestampService: TimestampService,
  ) {}

  /**
   * Transform release header information
   */
  public transformReleaseHeader(
    input: PMPOrderInputDTO,
    transformationContext: TransformationContext,
  ): any {
    return {
      ReleaseId: this.idGenerator.generateReleaseId(),
      ReleaseNumber: `REL-${input.OrderId}`,
      ReleaseType: 'Standard',
      ReleaseStatus: 'Open',
      Priority: 'Normal',
      CreatedDate: this.timestampService.getTimestamp('release_created_date'),
      ModifiedDate: this.timestampService.getTimestamp('release_modified_date'),
      OrderId: transformationContext.orderId,
      OrgId: transformationContext.orgId,
      TotalLines: this.calculateTotalLines(input),
      TotalQuantity: this.calculateTotalQuantity(input),
      EstimatedReleaseDate: this.timestampService.getTimestamp(
        'estimated_release_date',
      ),
      ActualReleaseDate: null,
      Notes: this.transformReleaseNotes(input),
      ExtendedFields: this.transformReleaseExtendedFields(
        input,
        transformationContext,
      ),
    };
  }

  /**
   * Calculate total number of lines in the release
   */
  private calculateTotalLines(input: PMPOrderInputDTO): number {
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];

    return orderLines.length;
  }

  /**
   * Calculate total quantity across all release lines
   */
  private calculateTotalQuantity(input: PMPOrderInputDTO): number {
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];

    return orderLines.reduce((total, line) => {
      return total + (line.Quantity || 0);
    }, 0);
  }

  /**
   * Transform release notes
   */
  private transformReleaseNotes(input: PMPOrderInputDTO): string {
    const notes: string[] = [];

    // Add order-level notes if available
    // Note: PMPOrderInputDTO doesn't have a Note field, but we keep this for future extension
    // if (input.Note) {
    //   notes.push(`Order Note: ${input.Note}`);
    // }

    // Add delivery notes
    notes.push('Release created for order fulfillment');

    // Add special instructions if any
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    const hasSpecialDelivery = orderLines.some(
      line => line.OrderLineExtension1?.Extended?.SlotBookingId,
    );

    if (hasSpecialDelivery) {
      notes.push('Contains time-slot delivery items');
    }

    return notes.join('; ');
  }

  /**
   * Transform release extended fields
   */
  private transformReleaseExtendedFields(
    input: PMPOrderInputDTO,
    _transformationContext: TransformationContext,
  ): any {
    return {
      OriginalOrderId: input.OrderId,
      AlternateOrderId: input.AlternateOrderId,
      CustomerType: input.CustomerTypeId || 'Regular',
      DeliveryType: this.determineDeliveryType(input),
      FulfillmentPriority: this.determineFulfillmentPriority(input),
      ProcessingLocation: this.determineProcessingLocation(input),
      ReleaseVersion: '1.0',
      CreatedBy: 'MAO_SERVICE_TRANSFORMER',
      LastModifiedBy: 'MAO_SERVICE_TRANSFORMER',
      BusinessContext: {
        Marketplace: 'TOPS',
        Channel: 'Online',
        Region: input.OrderLine[0]?.ShipToAddress?.Address?.Country || 'TH',
      },
    };
  }

  /**
   * Determine delivery type based on order characteristics
   */
  private determineDeliveryType(input: PMPOrderInputDTO): string {
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    const hasSlotBooking = orderLines.some(
      line => line.OrderLineExtension1?.Extended?.SlotBookingId,
    );

    if (hasSlotBooking) {
      return 'Scheduled';
    }

    return 'Standard';
  }

  /**
   * Determine fulfillment priority based on order attributes
   */
  private determineFulfillmentPriority(input: PMPOrderInputDTO): string {
    // Check for expedited delivery
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    const hasExpedited = orderLines.some(
      line =>
        line.PromisedDeliveryDate &&
        new Date(line.PromisedDeliveryDate) <=
          new Date(Date.now() + 24 * 60 * 60 * 1000),
    );

    if (hasExpedited) {
      return 'High';
    }

    return 'Normal';
  }

  /**
   * Determine processing location based on order lines
   */
  private determineProcessingLocation(input: PMPOrderInputDTO): string {
    // Handle cases where OrderLine might be null/undefined or not an array
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    // Get the most common ship-from location
    const locations = orderLines.map(
      line =>
        line.OrderLinePromisingInfo?.ShipFromLocationId || 'WAREHOUSE_001',
    );
    const locationCounts = locations.reduce(
      (counts, location) => {
        counts[location] = (counts[location] || 0) + 1;

        return counts;
      },
      {} as Record<string, number>,
    );

    return Object.entries(locationCounts).sort(([, a], [, b]) => (b as number) - (a as number))[0][0];
  }

  /**
   * Transform release system fields
   */
  public transformReleaseSystemFields(): any {
    return {
      TenantId: 'crcpopr11o',
      MSG_TYPE: 'OB_XINT_PublishReleaseToStoreMSGType_GCPMT',
      MSG_ID_PK: this.idGenerator.generateMessageId(),
      OUTBOUND_CONDITION_EVALUATION: true,
      ProvisioningProfile: null,
      OUTBOUND_MSG_TYPE: 'OB_XINT_PublishReleaseToStoreMSGType_GCPMT',
      MessageCategory: null,
      Location: null,
    };
  }

  /**
   * Validate release header data
   */
  public validateReleaseHeader(
    releaseHeader: any,
    input: PMPOrderInputDTO,
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate required fields
    if (!releaseHeader.ReleaseId) {
      errors.push('ReleaseId is required');
    }

    if (!releaseHeader.OrderId) {
      errors.push('OrderId is required');
    }

    // Validate totals consistency
    const orderLines = Array.isArray(input.OrderLine) ? input.OrderLine : [];
    const expectedTotalLines = orderLines.length;

    if (releaseHeader.TotalLines !== expectedTotalLines) {
      errors.push(
        `TotalLines mismatch: expected ${expectedTotalLines}, got ${releaseHeader.TotalLines}`,
      );
    }

    const expectedTotalQuantity = this.calculateTotalQuantity(input);

    if (releaseHeader.TotalQuantity !== expectedTotalQuantity) {
      errors.push(
        `TotalQuantity mismatch: expected ${expectedTotalQuantity}, got ${releaseHeader.TotalQuantity}`,
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get release summary for monitoring
   */
  public getReleaseSummary(
    input: PMPOrderInputDTO,
    transformationContext: TransformationContext,
  ): {
    releaseId: string;
    totalLines: number;
    totalQuantity: number;
    deliveryType: string;
    priority: string;
    processingLocation: string;
  } {
    const releaseHeader = this.transformReleaseHeader(
      input,
      transformationContext,
    );

    return {
      releaseId: releaseHeader.ReleaseId,
      totalLines: releaseHeader.TotalLines,
      totalQuantity: releaseHeader.TotalQuantity,
      deliveryType: releaseHeader.ExtendedFields.DeliveryType,
      priority: releaseHeader.ExtendedFields.FulfillmentPriority,
      processingLocation: releaseHeader.ExtendedFields.ProcessingLocation,
    };
  }
}
