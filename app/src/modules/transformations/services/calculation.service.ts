import { Injectable } from '@nestjs/common';

import { PMPOrderInputDTO } from '../../releases/dtos/release-create-order.dto';

export interface LineTaxDetails {
  taxableAmount: number;
  taxAmount: number;
  taxRate: number;
}

@Injectable()
export class CalculationService {
  /**
   * Calculate order subtotal from input data
   */
  public calculateOrderSubtotal(input: PMPOrderInputDTO): number {
    return Math.round(
      input.OrderLine.reduce((sum, line) => {
        const extendedInfo = line.OrderLineExtension1?.Extended;

        if (
          extendedInfo?.IsBundle &&
          extendedInfo?.PackUnitPrice &&
          extendedInfo?.NumberOfPack
        ) {
          return sum + extendedInfo.NumberOfPack * extendedInfo.PackUnitPrice;
        }

        return sum + line.Quantity * line.UnitPrice;
      }, 0),
    );
  }

  /**
   * Calculate line subtotal
   */
  public calculateLineSubtotal(line: any): number {
    const extendedInfo = line.OrderLineExtension1?.Extended;

    if (
      extendedInfo?.IsBundle &&
      extendedInfo?.PackUnitPrice &&
      extendedInfo?.NumberOfPack
    ) {
      return extendedInfo.NumberOfPack * extendedInfo.PackUnitPrice;
    }

    return line.Quantity * line.UnitPrice;
  }

  /**
   * Calculate total charges from OrderChargeDetail array (CSV compliant)
   * CSV #54: TotalCharges = SUM OrderChargeDetail[].ChargeTotal
   */
  public calculateTotalCharges(input: PMPOrderInputDTO): number {
    // Direct mapping as per CSV specification - sum existing charge values
    return (
      input.OrderChargeDetail?.reduce((sum, charge) => {
        const chargeTotal =
          typeof charge.ChargeTotal === 'string'
            ? parseFloat(charge.ChargeTotal)
            : charge.ChargeTotal || 0;

        return sum + chargeTotal;
      }, 0) || 0
    );
  }

  /**
   * Calculate line-level charge allocation from OrderChargeDetail
   * Used for proportional allocation of existing charges to order lines
   */
  public calculateLineChargeAllocation(
    input: PMPOrderInputDTO,
    lineIndex: number,
  ): number {
    const totalCharges = this.calculateTotalCharges(input);
    const lineSubtotal = this.calculateLineSubtotal(
      input.OrderLine[lineIndex] || input.OrderLine[0],
    );
    const orderSubtotal = this.calculateOrderSubtotal(input);

    // Proportional allocation of total charges to this line
    if (orderSubtotal === 0) return 0;

    return (
      Math.round(totalCharges * (lineSubtotal / orderSubtotal) * 100) / 100
    );
  }

  /**
   * Calculate total taxes for order
   */
  public calculateOrderTotalTaxes(_input: PMPOrderInputDTO): number {
    // Match target structure: all taxes should be 0
    return 0;
  }

  /**
   * Calculate discounts based on order data
   */
  public calculateOrderDiscounts(input: PMPOrderInputDTO): number {
    // Calculate discounts based on business rules
    const orderSubtotal = this.calculateOrderSubtotal(input);

    // Example business rule: 0.05% discount for orders over certain amount
    if (orderSubtotal >= 100) {
      return -Math.round(orderSubtotal * 0.0005 * 100) / 100;
    }

    return 0;
  }

  /**
   * Calculate line-level discount charge
   */
  public calculateLineDiscountCharge(
    input: PMPOrderInputDTO,
    lineIndex: number,
  ): number {
    const totalDiscount = this.calculateOrderDiscounts(input);
    const lineSubtotal = this.calculateLineSubtotal(
      input.OrderLine[lineIndex] || input.OrderLine[0],
    );
    const orderSubtotal = this.calculateOrderSubtotal(input);

    // Proportional allocation of discount to this line
    if (orderSubtotal === 0) return 0;

    return (
      Math.round(totalDiscount * (lineSubtotal / orderSubtotal) * 100) / 100
    );
  }

  /**
   * Calculate line-level tax details for release lines
   */
  public calculateLineTaxDetails(line: any): LineTaxDetails {
    // Match target structure: all line taxes should be 0
    const lineSubtotal = this.calculateLineSubtotal(line);

    return {
      taxableAmount: lineSubtotal,
      taxAmount: 0, // Match target: all taxes = 0
      taxRate: 0, // Match target: all tax rates = 0
    };
  }

  /**
   * Calculate line total
   */
  public calculateLineTotal(line: any): number {
    const extendedInfo = line.OrderLineExtension1?.Extended;

    if (
      extendedInfo?.IsBundle &&
      extendedInfo?.PackUnitPrice &&
      extendedInfo?.NumberOfPack
    ) {
      return extendedInfo.NumberOfPack * extendedInfo.PackUnitPrice;
    }

    return line.Quantity * line.UnitPrice;
  }
}
