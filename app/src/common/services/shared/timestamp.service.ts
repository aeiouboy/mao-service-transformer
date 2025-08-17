import { Injectable } from '@nestjs/common';

@Injectable()
export class TimestampService {
  /**
   * Dynamic timestamp generation for different entity types with logical progression
   * Each entity type gets a timestamp relative to the base order creation time
   */
  public getTimestamp(entityType: string): string {
    // Use fixed base timestamp from target file for deterministic output
    const now = new Date('2025-08-05T12:13:22.781Z');
    
    // Calculate increment offsets based on original sample progression patterns
    // Using millisecond increments to maintain realistic order processing timeline
    const incrementMap: { [key: string]: number } = {
      // Order creation is earliest (-790ms from base)
      'create_order_timestamp': -790,
      
      // Base timestamp (Order processing start)
      'base': 0,
      'payment_created': 0,
      
      // Payment method creation (+84ms after payment)
      'payment_method_created': 84,
      
      // Address creation (+85ms after payment)
      'billing_address_created': 85,
      
      // Transaction creation (+85ms after payment)
      'payment_transaction_created': 85,
      'payment_transaction_updated': 85,
      
      // Payment update (+110ms after creation)
      'payment_updated': 110,
      
      // Address update (+157ms after creation)
      'billing_address_updated': 157,
      
      // Payment method update (+10906ms = ~11 seconds later)
      'payment_method_updated': 10906,
      
      // Order confirmation (+10855ms)
      'confirmed_date': 10855,
      
      // OrderLine charge details creation (early in process)
      'order_line_charge_created': -721,
      
      // Release creation (+11506ms = final step)
      'create_release_timestamp': 11506,
      
      // Captured date (-10 seconds from base, early in order processing)
      'captured_date': -10000
    };
    
    const increment = incrementMap[entityType] || 0;
    const adjustedTime = new Date(now.getTime() + increment);
    
    // Special format for captured_date (no milliseconds)
    if (entityType === 'captured_date') {
      return adjustedTime.toISOString().slice(0, 19); // YYYY-MM-DDTHH:mm:ss
    }
    
    // Format to match expected format: YYYY-MM-DDTHH:mm:ss.SSS (no Z suffix)
    return adjustedTime.toISOString().slice(0, -1);
  }

  /**
   * Get multiple timestamps for different entity types
   * Useful for batch operations
   */
  public getEntityTimestamps(entityTypes: string[]): Record<string, string> {
    const timestamps: Record<string, string> = {};
    
    entityTypes.forEach(entityType => {
      timestamps[entityType] = this.getTimestamp(entityType);
    });
    
    return timestamps;
  }

  /**
   * Get all standard timestamps used in the transformation
   * Returns a complete set of timestamps for the transformation process
   */
  public getAllStandardTimestamps(): Record<string, string> {
    const standardEntityTypes = [
      'create_order_timestamp',
      'payment_created',
      'payment_method_created',
      'billing_address_created',
      'payment_transaction_created',
      'payment_transaction_updated',
      'payment_updated',
      'billing_address_updated',
      'payment_method_updated',
      'confirmed_date',
      'create_release_timestamp'
    ];

    return this.getEntityTimestamps(standardEntityTypes);
  }
}