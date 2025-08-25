import { Test, TestingModule } from '@nestjs/testing';

import { CancelledOrderData } from '../../dtos/cancelled-order-data.dto';
import { CancelOrderMapperService } from '../../services/cancel-order-mapper.service';

describe('CancelOrderMapperService', () => {
  let service: CancelOrderMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancelOrderMapperService],
    }).compile();

    service = module.get<CancelOrderMapperService>(CancelOrderMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('mapToMAOFormat', () => {
    it('should transform cancelled order data correctly', () => {
      // Arrange
      const mockCancelledOrderData: CancelledOrderData[] = [
        {
          order_id: '311647613-C7LXT7KBTPA3TN',
          alternate_order_id: '311647613-C7LXT7KBTPA3TN',
          is_cancelled: true,
          cancelled_order_sub_total: 366.0,
          order_sub_total: 0.0,
          order_total: 0.0,
          total_charges: 0.0,
          total_discounts: 0.0,
          total_taxes: 0.0,
          customer_first_name: 'Grab Customer',
          customer_last_name: '-',
          customer_email: 'undefined',
          customer_id: 'test-customer-id',
          currency_code: 'THB',
          selling_channel: 'Grab',
          org_id: 'CFM-UAT',
          max_fulfillment_status_id: '9000',
          min_fulfillment_status_id: '9000',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T01:00:00Z'),
          captured_date: new Date('2024-01-01T00:30:00Z'),
          created_by: 'pubsubuser@pmp',
          updated_by: 'apiuser4pmp',
          order_line_id: 'line-1',
          line_is_cancelled: true,
          line_quantity: 0,
          line_unit_price: 183.0,
          line_original_unit_price: 183.0,
          line_order_line_sub_total: 0.0,
          line_cancelled_order_line_sub_total: 366.0,
          line_item_id: 'ITEM-123',
          line_item_description: 'Test Product',
          line_uom: 'SPCS',
          line_max_fulfillment_status_id: '9000',
          line_min_fulfillment_status_id: '9000',
          line_fulfillment_status: 'Canceled',
          line_shipping_method_id: 'Standard Delivery',
          line_fulfillment_group_id: 'fg-123',
          line_release_group_id: 'rg-123',
          line_is_gift: false,
          line_is_tax_included: true,
          line_is_pre_order: false,
          line_total_charges: 0,
          line_total_discounts: 0,
          line_cancelled_total_discounts: 0,
          quantity_detail_id: 'qd-1',
          qd_status_id: '9000',
          qd_process: 'postReleaseCancellation',
          qd_quantity: 0,
          qd_uom: 'SPCS',
          qd_reason: '1000.000',
          qd_reason_type: 'CustomerRequest',
          qd_created_at: new Date('2024-01-01T00:00:00Z'),
          qd_updated_at: new Date('2024-01-01T01:00:00Z'),
          qd_created_by: 'pubsubuser@pmp',
          qd_updated_by: 'apiuser4pmp',
        },
      ];
      // Act
      const result = service.mapToMAOFormat(mockCancelledOrderData);

      // Assert
      expect(result.OrderId).toBe('311647613-C7LXT7KBTPA3TN');
      expect(result.AlternateOrderId).toBe('311647613-C7LXT7KBTPA3TN');
      expect(result.IsCancelled).toBe(true);
      expect(result.FulfillmentStatus).toBe('Canceled');
      expect(result.MaxFulfillmentStatusId).toBe('9000');
      expect(result.MinFulfillmentStatusId).toBe('9000');
      expect(result.Process).toBe('postReleaseCancellation');
      expect(result.OrderSubTotal).toBe(0);
      expect(result.CancelledOrderSubTotal).toBe(366.0);
      expect(result.OrderTotal).toBe(0);
      expect(result.CustomerFirstName).toBe('Grab Customer');
      expect(result.CustomerLastName).toBe('-');
      expect(result.CustomerEmail).toBe('undefined');
      expect(result.CurrencyCode).toBe('THB');
      expect(result.OrgId).toBe('CFM-UAT');
      expect(result.CancelLineCount).toBe(1);
      expect(result.OrderLineCount).toBe(1);
      expect(result.MerchSaleLineCount).toBe(0);
      expect(result.IsOnHold).toBe(false);
      expect(result.IsConfirmed).toBe(true);
      expect(result.IsArchiveInProgress).toBe(false);
      expect(result.IsOrderCountable).toBe(true);

      // Check order lines
      expect(result.OrderLine).toHaveLength(1);

      const orderLine = result.OrderLine[0];

      expect(orderLine.OrderLineId).toBe('line-1');
      expect(orderLine.IsCancelled).toBe(true);
      expect(orderLine.ItemId).toBe('ITEM-123');
      expect(orderLine.ItemDescription).toBe('Test Product');
      expect(orderLine.UnitPrice).toBe(183.0);
      expect(orderLine.Quantity).toBe(0);
      expect(orderLine.OrderLineSubTotal).toBe(0);
      expect(orderLine.CancelledOrderLineSubTotal).toBe(366.0);
      expect(orderLine.FulfillmentStatus).toBe('Canceled');
      expect(orderLine.MaxFulfillmentStatusId).toBe('9000');
      expect(orderLine.MinFulfillmentStatusId).toBe('9000');
      expect(orderLine.Process).toBe('postReleaseCancellation');

      // Check quantity details
      expect(orderLine.QuantityDetail).toHaveLength(1);

      const quantityDetail = orderLine.QuantityDetail[0];

      expect(quantityDetail.QuantityDetailId).toBe('qd-1');
      expect(quantityDetail.StatusId).toBe('9000');
      expect(quantityDetail.Process).toBe('postReleaseCancellation');
      expect(quantityDetail.Quantity).toBe(0);
      expect(quantityDetail.ItemId).toBe('ITEM-123');
      expect(quantityDetail.UOM).toBe('SPCS');
    });

    it('should handle empty data gracefully', () => {
      // Act & Assert
      expect(() => service.mapToMAOFormat([])).toThrow(
        'No cancelled order data provided',
      );
      expect(() => service.mapToMAOFormat(null as any)).toThrow(
        'No cancelled order data provided',
      );
      expect(() => service.mapToMAOFormat(undefined as any)).toThrow(
        'No cancelled order data provided',
      );
    });

    it('should handle missing optional fields with defaults', () => {
      // Arrange
      const minimalData: CancelledOrderData[] = [
        {
          order_id: 'TEST-ORDER',
          is_cancelled: true,
          order_sub_total: 0,
          order_total: 0,
          total_charges: 0,
          total_discounts: 0,
          total_taxes: 0,
        },
      ];
      // Act
      const result = service.mapToMAOFormat(minimalData);

      // Assert
      expect(result.OrderId).toBe('TEST-ORDER');
      expect(result.AlternateOrderId).toBe('TEST-ORDER'); // Should default to order_id
      expect(result.CustomerFirstName).toBe('Grab Customer'); // Default
      expect(result.CustomerLastName).toBe('-'); // Default
      expect(result.CustomerEmail).toBe('undefined'); // Default
      expect(result.CurrencyCode).toBe('THB'); // Default
      expect(result.OrgId).toBe('CFM-UAT'); // Default
      expect(result.MaxFulfillmentStatusId).toBe('9000'); // Default
      expect(result.MinFulfillmentStatusId).toBe('9000'); // Default
      expect(result.CreatedBy).toBe('pubsubuser@pmp'); // Default
      expect(result.UpdatedBy).toBe('apiuser4pmp'); // Default
    });

    it('should group multiple order lines correctly', () => {
      // Arrange
      const multiLineData: CancelledOrderData[] = [
        {
          order_id: 'TEST-ORDER',
          is_cancelled: true,
          order_sub_total: 0,
          order_total: 0,
          total_charges: 0,
          total_discounts: 0,
          total_taxes: 0,
          order_line_id: 'line-1',
          line_is_cancelled: true,
          line_item_id: 'ITEM-1',
          quantity_detail_id: 'qd-1',
          qd_quantity: 0,
        },
        {
          order_id: 'TEST-ORDER',
          is_cancelled: true,
          order_sub_total: 0,
          order_total: 0,
          total_charges: 0,
          total_discounts: 0,
          total_taxes: 0,
          order_line_id: 'line-2',
          line_is_cancelled: true,
          line_item_id: 'ITEM-2',
          quantity_detail_id: 'qd-2',
          qd_quantity: 0,
        },
      ];
      // Act
      const result = service.mapToMAOFormat(multiLineData);

      // Assert
      expect(result.CancelLineCount).toBe(2);
      expect(result.OrderLineCount).toBe(2);
      expect(result.OrderLine).toHaveLength(2);

      const orderLineIds = result.OrderLine.map(line => line.OrderLineId);

      expect(orderLineIds).toContain('line-1');
      expect(orderLineIds).toContain('line-2');

      const itemIds = result.OrderLine.map(line => line.ItemId);

      expect(itemIds).toContain('ITEM-1');
      expect(itemIds).toContain('ITEM-2');
    });
  });

  describe('Helper Methods', () => {
    it('should format timestamps correctly', () => {
      // Create a private method test by calling mapToMAOFormat and checking timestamp format
      const testData: CancelledOrderData[] = [
        {
          order_id: 'TEST-ORDER',
          is_cancelled: true,
          order_sub_total: 0,
          order_total: 0,
          total_charges: 0,
          total_discounts: 0,
          total_taxes: 0,
          created_at: new Date('2024-01-15T10:30:45.123Z'),
          updated_at: new Date('2024-01-15T11:30:45.456Z'),
        },
      ];
      const result = service.mapToMAOFormat(testData);

      expect(result.CreatedTimestamp).toBe('2024-01-15T10:30:45.123Z');
      expect(result.UpdatedTimestamp).toBe('2024-01-15T11:30:45.456Z');
      expect(result.CountedDate).toBe('2024-01-15T11:30:45.456Z'); // Uses updated_at
    });

    it('should handle complex object mapping', () => {
      const testData: CancelledOrderData[] = [
        {
          order_id: 'TEST-ORDER',
          is_cancelled: true,
          order_sub_total: 0,
          order_total: 0,
          total_charges: 0,
          total_discounts: 0,
          total_taxes: 0,
          order_type: { OrderTypeId: 'CUSTOM-TYPE' },
          doc_type: { DocTypeId: 'CUSTOM-DOC' },
          selling_channel: 'CustomChannel',
          cancel_reason: { ReasonId: 'CustomReason' },
        },
      ];
      const result = service.mapToMAOFormat(testData);

      expect(result.OrderType).toEqual({ OrderTypeId: 'CUSTOM-TYPE' });
      expect(result.DocType).toEqual({ DocTypeId: 'CUSTOM-DOC' });
      expect(result.SellingChannel).toEqual({
        SellingChannelId: 'CustomChannel',
      });
      expect(result.CancelReason).toEqual({ ReasonId: 'CustomReason' });
    });
  });
});
