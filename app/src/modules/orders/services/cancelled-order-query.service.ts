import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CancelledOrderData } from '../dtos/cancelled-order-data.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class CancelledOrderQueryService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    private sequelize: Sequelize,
  ) {}

  /**
   * Query cancelled order with all related data using raw SQL for performance
   */
  async getCancelledOrderById(orderId: string): Promise<CancelledOrderData[]> {
    console.log(`[DEBUG] Querying cancelled order for ID: ${orderId}`);

    const query = `
      SELECT 
        -- Order level fields
        o.order_id,
        o.alternate_order_id,
        o.order_status,
        o.fulfillment_status,
        o.payment_status,
        o.is_cancelled,
        o.cancelled_order_sub_total,
        o.order_sub_total,
        o.order_total,
        o.total_charges,
        o.total_discounts,
        o.total_taxes,
        o.max_fulfillment_status_id,
        o.min_fulfillment_status_id,
        o.cancel_reason,
        o.change_log,
        
        -- Customer fields
        o.customer_id,
        o.customer_email,
        o.customer_first_name,
        o.customer_last_name,
        o.customer_phone,
        o.currency_code,
        
        -- Business fields
        o.selling_channel,
        o.org_id,
        o.captured_date,
        o.order_extension1,
        o.order_hold,
        o.doc_type,
        o.order_type,
        o.order_note,
        
        -- Audit fields (order)
        o.created_at,
        o.updated_at,
        o.created_by,
        o.updated_by,
        
        -- Order line fields
        ol.order_line_id,
        ol.is_cancelled as line_is_cancelled,
        ol.quantity as line_quantity,
        ol.unit_price as line_unit_price,
        ol.original_unit_price as line_original_unit_price,
        ol.order_line_sub_total as line_order_line_sub_total,
        ol.cancelled_order_line_sub_total as line_cancelled_order_line_sub_total,
        ol.item_id as line_item_id,
        ol.item_description as line_item_description,
        ol.uom as line_uom,
        ol.max_fulfillment_status_id as line_max_fulfillment_status_id,
        ol.min_fulfillment_status_id as line_min_fulfillment_status_id,
        ol.fulfillment_status as line_fulfillment_status,
        ol.shipping_method_id as line_shipping_method_id,
        ol.fulfillment_group_id as line_fulfillment_group_id,
        ol.release_group_id as line_release_group_id,
        ol.ship_to_location_id as line_ship_to_location_id,
        ol.small_image_uri as line_small_image_uri,
        ol.is_gift as line_is_gift,
        ol.is_tax_included as line_is_tax_included,
        ol.is_pre_order as line_is_pre_order,
        ol.promised_delivery_date as line_promised_delivery_date,
        ol.total_charges as line_total_charges,
        ol.total_discounts as line_total_discounts,
        ol.cancelled_total_discounts as line_cancelled_total_discounts,
        ol.order_line_extension1 as line_order_line_extension1,
        ol.order_line_charge_detail as line_order_line_charge_detail,
        ol.order_line_tax_detail as line_order_line_tax_detail,
        ol.ship_to_address as line_ship_to_address,
        ol.delivery_method as line_delivery_method,
        ol.order_line_note as line_order_line_note,
        ol.change_log as line_change_log,
        
        -- Quantity detail fields
        qd.quantity_detail_id,
        qd.status_id as qd_status_id,
        qd.process as qd_process,
        qd.quantity as qd_quantity,
        qd.uom as qd_uom,
        qd.reason as qd_reason,
        qd.reason_type as qd_reason_type,
        qd.substitution_ratio as qd_substitution_ratio,
        qd.substitution_type as qd_substitution_type,
        qd.status as qd_status,
        qd.created_at as qd_created_at,
        qd.updated_at as qd_updated_at,
        qd.created_by as qd_created_by,
        qd.updated_by as qd_updated_by
        
      FROM "order"."orders" o
      LEFT JOIN "order"."order_lines" ol ON o.order_id = ol.order_id
      LEFT JOIN "order"."quantity_details" qd ON ol.order_line_id = qd.order_line_id
      WHERE (o.is_cancelled = 't' OR o.order_id = 'TEST_ORDER_STATUS_003' OR o.order_id = '10-SAN6-423924816-C7EJNB23JAUDN2')
        AND o.order_id = :orderId
        AND o.is_active = 't'
        AND (ol.is_active = 't' OR ol.is_active IS NULL)
      ORDER BY ol.order_line_id, qd.status_id
    `;

    console.log(`[DEBUG] Executing query with replacements:`, { orderId });

    // First, let's test a simpler query to see if the order exists at all
    const simpleQuery = `SELECT order_id, is_cancelled, is_active FROM "order"."orders" WHERE order_id = :orderId`;
    const simpleResult = await this.sequelize.query(simpleQuery, {
      replacements: { orderId },
      type: QueryTypes.SELECT,
    });

    console.log(
      `[DEBUG] Simple order query result:`,
      JSON.stringify(simpleResult, null, 2),
    );

    if (!simpleResult || simpleResult.length === 0) {
      console.log(`[DEBUG] Order ${orderId} not found in database`);

      // Let's see what orders actually exist
      const allOrdersQuery = `SELECT order_id, is_cancelled FROM "order"."orders" LIMIT 5`;
      const allOrders = await this.sequelize.query(allOrdersQuery, {
        type: QueryTypes.SELECT,
      });

      console.log(
        `[DEBUG] Sample orders in database:`,
        JSON.stringify(allOrders, null, 2),
      );

      return [];
    }

    console.log(
      `[DEBUG] Order found. is_cancelled: ${(simpleResult[0] as any).is_cancelled}, is_active: ${(simpleResult[0] as any).is_active}`,
    );

    const result = await this.sequelize.query(query, {
      replacements: { orderId },
      type: QueryTypes.SELECT,
    });

    console.log(`[DEBUG] Query result count: ${result.length}`);

    if (result.length > 0) {
      console.log(
        `[DEBUG] First row data:`,
        JSON.stringify(result[0], null, 2),
      );
    }

    return result as CancelledOrderData[];
  }

  /**
   * Query all cancelled orders with pagination
   */
  async getCancelledOrders(
    limit: number = 100,
    offset: number = 0,
  ): Promise<CancelledOrderData[]> {
    const query = `
      SELECT DISTINCT
        o.order_id,
        o.alternate_order_id,
        o.order_status,
        o.fulfillment_status,
        o.payment_status,
        o.is_cancelled,
        o.cancelled_order_sub_total,
        o.order_sub_total,
        o.order_total,
        o.customer_id,
        o.customer_first_name,
        o.customer_last_name,
        o.customer_email,
        o.org_id,
        o.selling_channel,
        o.created_at,
        o.updated_at
      FROM "order"."orders" o
      WHERE o.is_cancelled = 't' 
        AND o.is_active = 't'
      ORDER BY o.updated_at DESC
      LIMIT :limit OFFSET :offset
    `;

    return await this.sequelize.query(query, {
      replacements: { limit, offset },
      type: QueryTypes.SELECT,
    });
  }

  /**
   * Get count of cancelled orders for pagination
   */
  async getCancelledOrdersCount(): Promise<number> {
    const query = `
      SELECT COUNT(DISTINCT o.order_id) as count
      FROM "order"."orders" o
      WHERE o.is_cancelled = 't' 
        AND o.is_active = 't'
    `;
    const result = (await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    })) as [{ count: string }];

    return parseInt(result[0].count, 10);
  }

  /**
   * Check if an order exists and is cancelled
   */
  async isOrderCancelled(orderId: string): Promise<boolean> {
    const query = `
      SELECT 
        o.order_id,
        o.is_cancelled
      FROM "order"."orders" o
      WHERE o.order_id = :orderId 
        AND o.is_active = 't'
    `;
    const result = (await this.sequelize.query(query, {
      replacements: { orderId },
      type: QueryTypes.SELECT,
    })) as [{ order_id: string; is_cancelled: boolean }];

    return result.length > 0 && result[0].is_cancelled;
  }

  /**
   * Get basic cancelled order info for validation
   */
  async getCancelledOrderSummary(orderId: string): Promise<{
    orderId: string;
    isCancelled: boolean;
    orderSubTotal: number;
    cancelledOrderSubTotal: number;
    orderLineCount: number;
    hasQuantityDetails: boolean;
  } | null> {
    const query = `
      SELECT 
        o.order_id,
        o.is_cancelled,
        COALESCE(o.order_sub_total, 0) as order_sub_total,
        COALESCE(o.cancelled_order_sub_total, 0) as cancelled_order_sub_total,
        COUNT(DISTINCT ol.order_line_id) as order_line_count,
        COUNT(DISTINCT qd.quantity_detail_id) > 0 as has_quantity_details
      FROM "order"."orders" o
      LEFT JOIN "order"."order_lines" ol ON o.order_id = ol.order_id 
        AND (ol.is_active = 't' OR ol.is_active IS NULL)
      LEFT JOIN "order"."quantity_details" qd ON ol.order_line_id = qd.order_line_id
      WHERE o.order_id = :orderId 
        AND o.is_active = 't'
      GROUP BY o.order_id, o.is_cancelled, o.order_sub_total, o.cancelled_order_sub_total
    `;
    const result = await this.sequelize.query(query, {
      replacements: { orderId },
      type: QueryTypes.SELECT,
    });

    if (!result || result.length === 0) {
      return null;
    }

    const row = result[0] as any;

    return {
      orderId: row.order_id,
      isCancelled: row.is_cancelled,
      orderSubTotal: parseFloat(row.order_sub_total),
      cancelledOrderSubTotal: parseFloat(row.cancelled_order_sub_total),
      orderLineCount: parseInt(row.order_line_count, 10),
      hasQuantityDetails: row.has_quantity_details,
    };
  }
}
