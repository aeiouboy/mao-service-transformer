// Mock test for CancelOrderMapperService OrderLineExtension1 method

const mockCancelledOrderData = [
  {
    // Order level data
    order_id: 'TEST_ORDER_STATUS_003',
    order_status: 'Cancelled',
    fulfillment_status: 'Cancelled',
    payment_status: 'Unpaid',
    is_cancelled: true,
    customer_first_name: 'Test',
    customer_last_name: 'User',
    customer_email: 'test@example.com',
    created_at: '2025-08-24T17:13:11.070Z',
    updated_at: '2025-08-24T17:16:35.016Z',
    
    // Order line data
    order_line_id: 'LINE_003',
    line_is_cancelled: true,
    line_quantity: '5.0000',
    line_unit_price: '29.99',
    line_item_id: 'TEST_ITEM_003',
    line_item_description: 'Premium Test Product',
    line_uom: 'PCS',
    line_fulfillment_status: 'Cancelled',
    line_order_line_extension1: null, // This simulates null from database
    
    // Quantity detail data
    quantity_detail_id: 'QXXX1',
    qd_status_id: '9000',
    qd_quantity: 1,
    qd_uom: 'PCS',
  }
];

// Simulate the mapOrderLine method focusing on OrderLineExtension1
function mapOrderLine(line) {
  function buildOrderLineExtension1(line) {
    let existingData = {};
    if (line.line_order_line_extension1 && typeof line.line_order_line_extension1 === 'object') {
      existingData = line.line_order_line_extension1;
    }

    return {
      Extended: {
        OfferId: existingData?.Extended?.OfferId ?? null,
        DeliveryRoute: existingData?.Extended?.DeliveryRoute ?? null,
        ProductNameVN: existingData?.Extended?.ProductNameVN ?? null,
        NumberOfPack: existingData?.Extended?.NumberOfPack ?? 1,
        PickUpStoreCountry: existingData?.Extended?.PickUpStoreCountry ?? null,
        MMSDepartment: existingData?.Extended?.MMSDepartment ?? 1,
        ShopAddress: existingData?.Extended?.ShopAddress ?? null,
        DisablePickup: existingData?.Extended?.DisablePickup ?? false,
        IsReserved: existingData?.Extended?.IsReserved ?? false,
        WMSStatus: existingData?.Extended?.WMSStatus ?? null,
        PromotionName: existingData?.Extended?.PromotionName ?? null,
        UnitPriceAfterDiscount: existingData?.Extended?.UnitPriceAfterDiscount ?? null,
        OriginalItemId: existingData?.Extended?.OriginalItemId ?? null,
        ItemType: existingData?.Extended?.ItemType ?? null,
        ShippingMethod: existingData?.Extended?.ShippingMethod ?? null,
        SubstitutedItemId: existingData?.Extended?.SubstitutedItemId ?? null,
        SubstitutionRatio: existingData?.Extended?.SubstitutionRatio ?? null,
        MadeToOrderFlag: existingData?.Extended?.MadeToOrderFlag ?? false,
        VendorId: existingData?.Extended?.VendorId ?? null,
        PriceModifier: existingData?.Extended?.PriceModifier ?? null,
        PriceType: existingData?.Extended?.PriceType ?? null,
        ReasonCode: existingData?.Extended?.ReasonCode ?? null,
        ReasonText: existingData?.Extended?.ReasonText ?? null,
        StatusQuantity: existingData?.Extended?.StatusQuantity ?? null,
        LastModifiedDate: existingData?.Extended?.LastModifiedDate ?? null,
        ItemWeight: existingData?.Extended?.ItemWeight ?? null,
        ItemVolume: existingData?.Extended?.ItemVolume ?? null,
        ShipmentId: existingData?.Extended?.ShipmentId ?? null,
        ShipmentLineKey: existingData?.Extended?.ShipmentLineKey ?? null,
        TransactionId: existingData?.Extended?.TransactionId ?? null,
        TransactionLineId: existingData?.Extended?.TransactionLineId ?? null,
        WorkOrderKey: existingData?.Extended?.WorkOrderKey ?? null,
        WorkOrderLineKey: existingData?.Extended?.WorkOrderLineKey ?? null,
        PipelineKey: existingData?.Extended?.PipelineKey ?? null,
        ManufacturingDate: existingData?.Extended?.ManufacturingDate ?? null,
        ExpiryDate: existingData?.Extended?.ExpiryDate ?? null,
        BatchNumber: existingData?.Extended?.BatchNumber ?? null,
        SerialNumber: existingData?.Extended?.SerialNumber ?? null,
        LotNumber: existingData?.Extended?.LotNumber ?? null,
        InventoryStatus: existingData?.Extended?.InventoryStatus ?? null,
        InventoryTagKey: existingData?.Extended?.InventoryTagKey ?? null,
        TagNumber: existingData?.Extended?.TagNumber ?? null,
        ProductClass: existingData?.Extended?.ProductClass ?? null,
        UnitOfMeasure: existingData?.Extended?.UnitOfMeasure ?? (line.line_uom || 'PCS'),
        Segment: existingData?.Extended?.Segment ?? null,
        SegmentType: existingData?.Extended?.SegmentType ?? null,
        RequiredBy: existingData?.Extended?.RequiredBy ?? null,
        RequestedDate: existingData?.Extended?.RequestedDate ?? null,
        PromiseDate: existingData?.Extended?.PromiseDate ?? null,
        ShipByDate: existingData?.Extended?.ShipByDate ?? null,
        DeliveryDate: existingData?.Extended?.DeliveryDate ?? null,
        ScheduleDate: existingData?.Extended?.ScheduleDate ?? null,
        CarrierService: existingData?.Extended?.CarrierService ?? null,
        FreightTerms: existingData?.Extended?.FreightTerms ?? null,
        LevelOfService: existingData?.Extended?.LevelOfService ?? null,
        OrderLineKey: existingData?.Extended?.OrderLineKey ?? null,
        ProductAvailabilityDate: existingData?.Extended?.ProductAvailabilityDate ?? null,
        ProductNameEN: existingData?.Extended?.ProductNameEN ?? (line.line_item_description || 'Unknown Product'),
        PromotionId: existingData?.Extended?.PromotionId ?? 'NO_PROMOTION',
        ProductNameTH: existingData?.Extended?.ProductNameTH ?? (line.line_item_description || 'สินค้าไม่ระบุชื่อ'),
        IsBundle: existingData?.Extended?.IsBundle ?? false,
        LatestItemTotalDiscount: existingData?.Extended?.LatestItemTotalDiscount ?? null,
      },
    };
  }

  return {
    OrderLineID: line.order_line_id,
    ItemID: line.line_item_id || 'UNKNOWN_ITEM',
    ItemDescription: line.line_item_description || 'No Description',
    Quantity: parseFloat(line.line_quantity || '0'),
    UnitPrice: parseFloat(line.line_unit_price || '0'),
    UOM: line.line_uom || 'PCS',
    FulfillmentStatus: line.line_fulfillment_status || 'Unknown',
    IsCancelled: line.line_is_cancelled === true || line.line_is_cancelled === 't',
    OrderLineExtension1: buildOrderLineExtension1(line),
    QuantityDetails: [
      {
        QuantityDetailID: line.quantity_detail_id,
        StatusID: line.qd_status_id,
        Quantity: parseFloat(line.qd_quantity || '0'),
        UOM: line.qd_uom || 'PCS',
      }
    ]
  };
}

// Test with mock data
const testOrderLine = mapOrderLine(mockCancelledOrderData[0]);

console.log('=== OrderLineExtension1 Test Results ===');
console.log('OrderLineID:', testOrderLine.OrderLineID);
console.log('ItemDescription:', testOrderLine.ItemDescription);
console.log('OrderLineExtension1 is null?', testOrderLine.OrderLineExtension1 === null);

if (testOrderLine.OrderLineExtension1) {
  console.log('OrderLineExtension1.Extended field count:', Object.keys(testOrderLine.OrderLineExtension1.Extended).length);
  console.log('Fields with values:', Object.entries(testOrderLine.OrderLineExtension1.Extended).filter(([k,v]) => v !== null).length);
  
  console.log('\n=== Sample Extended Fields ===');
  console.log('ProductNameEN:', testOrderLine.OrderLineExtension1.Extended.ProductNameEN);
  console.log('ProductNameTH:', testOrderLine.OrderLineExtension1.Extended.ProductNameTH);
  console.log('PromotionId:', testOrderLine.OrderLineExtension1.Extended.PromotionId);
  console.log('UnitOfMeasure:', testOrderLine.OrderLineExtension1.Extended.UnitOfMeasure);
  console.log('NumberOfPack:', testOrderLine.OrderLineExtension1.Extended.NumberOfPack);
  console.log('MMSDepartment:', testOrderLine.OrderLineExtension1.Extended.MMSDepartment);
  
} else {
  console.log('ERROR: OrderLineExtension1 is null');
}

// Save result to file for inspection
const fs = require('fs');
const outputPath = '/Users/chongraktanaka/Projects/mao-service-transformer/test-orderline-result.json';
fs.writeFileSync(outputPath, JSON.stringify(testOrderLine, null, 2));
console.log(`\nResult saved to: ${outputPath}`);