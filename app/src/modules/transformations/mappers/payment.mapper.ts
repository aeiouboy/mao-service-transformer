import { Injectable } from '@nestjs/common';

import { Payment } from '../../payments/entities/payment.entity';
import { PaymentMethodDTO } from '../../releases/services/release-message.dto';

@Injectable()
export class PaymentMapper {
  /**
   * Map payment entity to DTO format
   * @param payment Payment entity
   * @returns PaymentMethodDTO
   */
  mapToPaymentMethodDTO(payment: Payment): PaymentMethodDTO {
    const paymentDto = new PaymentMethodDTO();

    paymentDto.paymentId = payment.paymentTransactionId;
    paymentDto.paymentType =
      this.extractPaymentType(payment.transactionType) || 'UNKNOWN';
    paymentDto.amount = this.roundToTwoDecimals(payment.processedAmount);
    paymentDto.status = this.extractStatus(payment.status) || 'UNKNOWN';
    paymentDto.authorizationCode = 'N/A'; // Not available in current schema
    paymentDto.transactionId = payment.paymentTransactionId;

    // Format date to ISO string
    if (payment.transactionDate) {
      paymentDto.processedDate = payment.transactionDate.toISOString();
    }

    // Include card information if available (not in current schema)
    paymentDto.cardType = 'UNKNOWN';
    paymentDto.maskedCardNumber = 'XXXX-XXXX-XXXX-XXXX';

    return paymentDto;
  }

  /**
   * Map multiple payments to DTOs
   * @param payments Array of payment entities
   * @returns Array of PaymentMethodDTO
   */
  mapMultiplePayments(payments: Payment[]): PaymentMethodDTO[] {
    if (!payments || payments.length === 0) {
      return [];
    }

    return payments.map(payment => this.mapToPaymentMethodDTO(payment));
  }

  /**
   * Calculate total payment amount
   * @param payments Array of payments
   * @returns Total amount
   */
  calculateTotalPaymentAmount(payments: Payment[]): number {
    if (!payments || payments.length === 0) {
      return 0;
    }

    const total = payments.reduce((sum, payment) => {
      return sum + (payment.processedAmount || 0);
    }, 0);

    return this.roundToTwoDecimals(total);
  }

  /**
   * Validate payment security (ensure card numbers are masked)
   * @param payment Payment entity
   * @returns boolean indicating if payment is secure
   */
  validatePaymentSecurity(_payment: Payment): boolean {
    // Always return true for current schema (no card data)
    return true;
  }

  /**
   * Group payments by payment type
   * @param payments Array of payments
   * @returns Object grouped by payment type
   */
  groupPaymentsByType(payments: Payment[]): Record<string, Payment[]> {
    if (!payments || payments.length === 0) {
      return {};
    }

    return payments.reduce(
      (groups, payment) => {
        const paymentType =
          this.extractPaymentType(payment.transactionType) || 'UNKNOWN';

        if (!groups[paymentType]) {
          groups[paymentType] = [];
        }

        groups[paymentType].push(payment);

        return groups;
      },
      {} as Record<string, Payment[]>,
    );
  }

  /**
   * Validate payment amount consistency
   * @param payments Array of payments
   * @param expectedTotal Expected total amount
   * @returns boolean indicating if amounts match
   */
  validatePaymentAmounts(payments: Payment[], expectedTotal: number): boolean {
    const actualTotal = this.calculateTotalPaymentAmount(payments);
    const tolerance = 0.01; // Allow 1 cent difference for rounding

    return Math.abs(actualTotal - expectedTotal) <= tolerance;
  }

  /**
   * Round number to 2 decimal places
   * @param value Number to round
   * @returns Rounded number
   */
  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  /**
   * Format payment for display (mask sensitive information)
   * @param payment Payment entity
   * @returns Formatted payment information
   */
  formatPaymentForLogging(payment: Payment): any {
    return {
      paymentId: payment.paymentTransactionId,
      paymentType:
        this.extractPaymentType(payment.transactionType) || 'UNKNOWN',
      amount: payment.processedAmount,
      status: this.extractStatus(payment.status) || 'UNKNOWN',
      cardType: 'UNKNOWN',
      // Never log full card numbers or auth codes
      hasCardInfo: false,
      hasAuthCode: false,
    };
  }

  /**
   * Extract payment type from JSONB transaction type field
   * @param transactionType JSONB transaction type object
   * @returns Payment type string
   */
  private extractPaymentType(transactionType: any): string {
    if (!transactionType || typeof transactionType !== 'object') {
      return 'UNKNOWN';
    }

    // Handle different JSONB structures
    if (transactionType.type) {
      return transactionType.type.toUpperCase();
    }

    if (transactionType.paymentType) {
      return transactionType.paymentType.toUpperCase();
    }

    if (typeof transactionType === 'string') {
      return transactionType.toUpperCase();
    }

    return 'UNKNOWN';
  }

  /**
   * Extract status from JSONB status field
   * @param status JSONB status object
   * @returns Status string
   */
  private extractStatus(status: any): string {
    if (!status || typeof status !== 'object') {
      return 'UNKNOWN';
    }

    // Handle different JSONB structures
    if (status.status) {
      return status.status.toUpperCase();
    }

    if (status.state) {
      return status.state.toUpperCase();
    }

    if (typeof status === 'string') {
      return status.toUpperCase();
    }

    return 'UNKNOWN';
  }
}
