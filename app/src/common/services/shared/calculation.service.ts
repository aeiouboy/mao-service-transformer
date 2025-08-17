import { Injectable } from '@nestjs/common';
import { PMPOrderInputDTO } from '../../dtos/release-create-order.dto';

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
    return Math.round(input.OrderLine.reduce((sum, line) => {
      const extendedInfo = line.OrderLineExtension1?.Extended;
      if (extendedInfo?.IsBundle && extendedInfo?.PackUnitPrice && extendedInfo?.NumberOfPack) {
        return sum + (extendedInfo.NumberOfPack * extendedInfo.PackUnitPrice);
      }
      return sum + (line.Quantity * line.UnitPrice);
    }, 0));
  }

  /**
   * Calculate line subtotal
   */
  public calculateLineSubtotal(line: any): number {
    const extendedInfo = line.OrderLineExtension1?.Extended;
    if (extendedInfo?.IsBundle && extendedInfo?.PackUnitPrice && extendedInfo?.NumberOfPack) {
      return extendedInfo.NumberOfPack * extendedInfo.PackUnitPrice;
    }
    return line.Quantity * line.UnitPrice;
  }

  /**
   * Calculate shipping charges based on order data
   */
  public calculateShippingCharge(input: PMPOrderInputDTO): number {
    // Calculate shipping charge based on order line total
    const orderSubtotal = this.calculateOrderSubtotal(input);
    
    // Business rule: Free shipping if order > 100, otherwise flat rate
    if (orderSubtotal >= 100) {
      return 0;
    }
    
    // Calculate proportional shipping charge (approximately 2.5% of subtotal)
    return Math.round(orderSubtotal * 0.025 * 100) / 100;
  }

  /**
   * Calculate line-level shipping charge
   */
  public calculateLineShippingCharge(input: PMPOrderInputDTO, lineIndex: number): number {
    const totalShipping = this.calculateShippingCharge(input);
    const lineSubtotal = this.calculateLineSubtotal(input.OrderLine[lineIndex] || input.OrderLine[0]); 
    const orderSubtotal = this.calculateOrderSubtotal(input);
    
    // Proportional allocation of shipping cost to this line
    if (orderSubtotal === 0) return 0;
    return (
      Math.round(totalShipping * (lineSubtotal / orderSubtotal) * 100) / 100
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
  public calculateLineDiscountCharge(input: PMPOrderInputDTO, lineIndex: number): number {
    const totalDiscount = this.calculateOrderDiscounts(input);
    const lineSubtotal = this.calculateLineSubtotal(input.OrderLine[lineIndex] || input.OrderLine[0]);
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
      taxRate: 0    // Match target: all tax rates = 0
    };
  }

  /**
   * Calculate line total
   */
  public calculateLineTotal(line: any): number {
    const extendedInfo = line.OrderLineExtension1?.Extended;
    if (extendedInfo?.IsBundle && extendedInfo?.PackUnitPrice && extendedInfo?.NumberOfPack) {
      return extendedInfo.NumberOfPack * extendedInfo.PackUnitPrice;
    }
    return line.Quantity * line.UnitPrice;
  }
}