export interface CancelledOrderData {
  // Order level data
  order_id: string;
  order_status?: string;
  fulfillment_status?: string;
  payment_status?: string;
  is_cancelled: boolean;
  cancelled_order_sub_total?: number;
  order_sub_total: number;
  order_total: number;
  total_charges: number;
  total_discounts: number;
  total_taxes: number;
  cancel_reason?: any;
  change_log?: any;

  // Customer data
  customer_email?: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_phone?: string;
  customer_id?: string;
  currency_code?: string;

  // Business data
  selling_channel?: string;
  org_id?: string;
  captured_date?: Date;
  order_extension1?: any;
  order_hold?: any;
  doc_type?: any;
  order_type?: any;
  order_note?: any;
  max_fulfillment_status_id?: string;
  min_fulfillment_status_id?: string;
  alternate_order_id?: string;

  // Audit fields
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;

  // Order line data (from LEFT JOIN)
  order_line_id?: string;
  line_is_cancelled?: boolean;
  line_quantity?: number;
  line_unit_price?: number;
  line_original_unit_price?: number;
  line_order_line_sub_total?: number;
  line_cancelled_order_line_sub_total?: number;
  line_item_id?: string;
  line_item_description?: string;
  line_uom?: string;
  line_max_fulfillment_status_id?: string;
  line_min_fulfillment_status_id?: string;
  line_fulfillment_status?: string;
  line_shipping_method_id?: string;
  line_fulfillment_group_id?: string;
  line_release_group_id?: string;
  line_ship_to_location_id?: string;
  line_small_image_uri?: string;
  line_is_gift?: boolean;
  line_is_tax_included?: boolean;
  line_is_pre_order?: boolean;
  line_promised_delivery_date?: Date;
  line_total_charges?: number;
  line_total_discounts?: number;
  line_cancelled_total_discounts?: number;
  line_order_line_extension1?: any;
  line_order_line_charge_detail?: any;
  line_order_line_tax_detail?: any;
  line_ship_to_address?: any;
  line_delivery_method?: any;
  line_order_line_note?: any;
  line_change_log?: any;

  // Quantity detail data (from LEFT JOIN)
  quantity_detail_id?: string;
  qd_status_id?: string;
  qd_process?: string;
  qd_quantity?: number;
  qd_uom?: string;
  qd_reason?: string;
  qd_reason_type?: string;
  qd_substitution_ratio?: number;
  qd_substitution_type?: string;
  qd_status?: any;
  qd_created_at?: Date;
  qd_updated_at?: Date;
  qd_created_by?: string;
  qd_updated_by?: string;
}
