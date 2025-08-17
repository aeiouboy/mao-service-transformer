import { Injectable } from '@nestjs/common';
import { PMPOrderInputDTO } from '../../dtos/release-create-order.dto';

export interface ShippingMethodMapping {
  orderTypeId: string;
  deliveryMethod: string;
  shippingMethodId: string;
  destinationAction: string;
}

@Injectable()
export class BusinessRulesService {
  /**
   * Business Rules Mapping: Order Type to Shipping Method
   * Based on order type and delivery method, determine the appropriate shipping configuration
   */
  public getShippingMethodMapping(input: PMPOrderInputDTO): ShippingMethodMapping {
    const orderType = input.OrderType?.OrderTypeId || 'STANDARD';
    const deliveryMethodId = input.OrderLine[0]?.DeliveryMethod?.DeliveryMethodId || 'HOME_DELIVERY';
    const shippingMethodId = input.OrderLine[0]?.ShippingMethodId || 'STD';
    
    // Business Rules Implementation
    // STANDARD + HOME_DELIVERY + STD = MKP-HD-STD (Marketplace Home Delivery Standard)
    if (orderType === 'STANDARD' && deliveryMethodId === 'HOME_DELIVERY' && shippingMethodId === 'STD') {
      return {
        orderTypeId: 'MKP-HD-STD',
        deliveryMethod: 'ShipToAddress',
        shippingMethodId: 'Standard Delivery',
        destinationAction: 'Delivery'
      };
    }
    
    // RT-HD-EXP: Retail Home Delivery Express (3H Delivery)
    if ((orderType === 'RETAIL' || orderType === 'RT') && deliveryMethodId === 'HOME_DELIVERY' && shippingMethodId === 'EXP') {
      return {
        orderTypeId: 'RT-HD-EXP',
        deliveryMethod: 'ShipToAddress',
        shippingMethodId: '3H Delivery',
        destinationAction: 'Delivery'
      };
    }
    
    // RT-CC-STD: Retail Click & Collect Standard (Store Pickup)
    if ((orderType === 'RETAIL' || orderType === 'RT') && deliveryMethodId === 'STORE_PICKUP' && shippingMethodId === 'STD') {
      return {
        orderTypeId: 'RT-CC-STD',
        deliveryMethod: 'ShipToStore',
        shippingMethodId: 'Standard Pickup',
        destinationAction: 'Pickup'
      };
    }
    
    // RT-CC-EXP: Retail Click & Collect Express (1H Pickup)
    if ((orderType === 'RETAIL' || orderType === 'RT') && deliveryMethodId === 'STORE_PICKUP' && shippingMethodId === 'EXP') {
      return {
        orderTypeId: 'RT-CC-EXP',
        deliveryMethod: 'PickUpAtStore',
        shippingMethodId: '1H Pickup',
        destinationAction: 'Pickup'
      };
    }
    
    // RT-MIX-STD: Mixed delivery options
    if ((orderType === 'RETAIL' || orderType === 'RT') && deliveryMethodId === 'MIXED') {
      return {
        orderTypeId: 'RT-MIX-STD',
        deliveryMethod: 'ShipToAddress', // Primary method, with ShipToStore and PickUpAtStore as alternatives
        shippingMethodId: 'Standard Delivery',
        destinationAction: 'Delivery'
      };
    }
    
    // Default fallback (matches current sample behavior)
    return {
      orderTypeId: 'MKP-HD-STD',
      deliveryMethod: 'ShipToAddress',
      shippingMethodId: 'Standard Delivery',
      destinationAction: 'Delivery'
    };
  }

  /**
   * Get business rule configuration for specific rule types
   * Prepare for future externalization of business rules
   */
  public getBusinessRuleConfiguration(ruleType: string, _context?: any): any {
    switch (ruleType) {
      case 'SHIPPING_THRESHOLD':
        return {
          freeShippingThreshold: 100,
          shippingRate: 0.025
        };
      
      case 'DISCOUNT_RULES':
        return {
          discountThreshold: 100,
          discountRate: 0.0005
        };
      
      case 'TAX_RULES':
        return {
          defaultTaxRate: 0.07,
          taxIncluded: true
        };
      
      default:
        return null;
    }
  }
}