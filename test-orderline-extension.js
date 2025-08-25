// Simple test for OrderLineExtension1 structure
const mockLineData = {
  line_order_line_extension1: null,
  line_item_description: 'Test Product',
  line_quantity: '5.0000'
};

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

// Test the function
const result = buildOrderLineExtension1(mockLineData);
console.log('OrderLineExtension1 structure:');
console.log(JSON.stringify(result, null, 2));

console.log('\nExtended field count:', Object.keys(result.Extended).length);
console.log('Extended fields with values:', Object.entries(result.Extended).filter(([k,v]) => v !== null).length);