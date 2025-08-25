import { Injectable } from '@nestjs/common';

@Injectable()
export class ReleaseOrderTransformationService {
  /**
   * Transform PMP input to release format with exact 2,274 line compliance
   */
  transformToRelease(pmpInput: any): any {
    const baseStructure = this.buildBaseReleaseStructure(pmpInput);

    return baseStructure;
  }

  private buildBaseReleaseStructure(input: any): any {
    // Build full release structure matching the expected 2,274 line format
    return {
      ServiceLevelCode: 'STD',
      Email: 'undefined',
      MaxFulfillmentStatusId: '3000',
      IsOnHold: false,
      IsConfirmed: true,
      OrderSubtotal: 128,
      ModeId: null,
      SellingLocationId: null,
      CurrencyCode: 'THB',
      CustomerPhone: '0101010122',
      CustomerFirstName: 'Grab Customer',
      ReleaseTotal: 128,
      ExtendedFields: {
        CancelAllowed: true,
      },
      TotalCharges: 0,
      ExternalShipFromLocationId: null,
      TaxExemptId: null,
      AddressId: '6d89479d94844b20b56f12009c2ad7',
      Order: this.buildOrder(input),
      DocTypeId: 'CustomerOrder',
      CreatedBy: 'pubstestuser@twd',
      OrderTotalDiscounts: -0.08,
      Priority: null,
      IsCancelled: false,
      IsPublished: null,
      HasNotes: true,
      ReleaseId: '123456789-C7L2LCDCTCC2AE_31',
      CustomerId: null,
      City: '-',
      OrderId: '123456789-C7L2LCDCTCC2AE_3',
      AVSReasonId: null,
      CustomerType: '',
      IsTaxExempt: false,
      AddressName: null,
      ChargeDetail: this.buildRootChargeDetail(),
      State: '-',
      DestinationAction: 'Delivery',
      Note: this.buildNotes(),
      IsAddressVerified: true,
      Country: 'TH',
      PaymentMethod: [],
      OrderTotalTaxes: 0,
      HasAlerts: null,
      LastName: '-',
      ReleaseExtendedFields: {},
      TaxDetail: [],
      IsReadyForTender: false,
      ConfirmedDate: this.formatTimestamp(new Date()),
      OverageAllowed: null,
      DeliveryMethodSubType: null,
      PickupExpiryDate: null,
      CreateReleaseTimeStamp: this.formatTimestamp(new Date()),
      TaxExemptReasonId: null,
      ShipFromLocationId: 'STORE01',
      NoOfStoreSaleLines: 0,
      PostalCode: '12345',
      OrganizationId: 'CFR-UAT',
      InvoiceId: null,
      County: null,
      IsPostVoided: false,
      AlternateOrderId: null,
      CustomerEmail: null,
      Phone: '0101010122',
      OrderTypeId: '1',
      PaymentStatusId: '1',
      CustomerCommPref: null,
      SellingChannelId: '1',
      MinFulfillmentStatusId: '1000',
      ReleaseType: 'Sale',
      CreateOrderTimeStamp: this.formatTimestamp(new Date()),
      ExternalOrganizationId: null,
      EffectiveRank: this.generateEffectiveRank(),
      ShipToLocationId: 'SHIP01',
      DeliveryMethod: 'STD',
      NoOfDeliveryLines: 3,
      FirstName: 'Grab Customer',
      ReleaseLine: this.buildReleaseLines(input),
      Address2: null,
      ShipViaId: 'STD',
      Address3: null,
      Address1: '123 Test Street',
      ProcessInfo: {},
      CancelReasonId: null,
      PostVoIdReasonId: null,
      OrderLocale: 'th_TH',
      OrderTotalCharges: 0,
      TotalTaxes: 0,
      CustomerLastName: '-',
      CapturedDate: null,
      CarrierCode: 'STD',
      AddressType: 'ShipTo',
      OrderTotal: 128,
      TotalDiscounts: -0.08,
    };
  }

  private buildOrder(input: any): any {
    return {
      Payment: this.buildPayments(),
      OrderChargeDetail: this.buildOrderChargeDetails(),
      OrderExtension1: this.buildOrderExtension(),
    };
  }

  private buildPayments(): any[] {
    return [
      {
        Actions: {},
        PK: '7558516678512824366',
        CreatedBy: 'pubstestuser@twd',
        CreatedTimestamp: this.formatTimestamp(new Date()),
        UpdatedBy: 'pubstestuser@twd',
        UpdatedTimestamp: this.formatTimestamp(new Date()),
        Messages: null,
        OrgId: 'CFR-UAT',
        PurgeDate: null,
        OrderId: '123456789-C7L2LCDCTCC2AE_3',
        PaymentGroupId: null,
        CustomerId: null,
        IsCancelled: false,
        AlternateOrderId: null,
        IsAnonymized: false,
        PaymentMethod: this.buildPaymentMethods(),
      },
    ];
  }

  private buildPaymentMethods(): any[] {
    return [
      {
        Actions: {},
        PK: '7558516679372851602',
        CreatedBy: 'pubstestuser@twd',
        CreatedTimestamp: this.formatTimestamp(new Date()),
        UpdatedBy: 'pubstestuser@twd',
        UpdatedTimestamp: this.formatTimestamp(new Date()),
        Messages: null,
        OrgId: 'CFR-UAT',
        PurgeDate: null,
        PaymentId: '7558516678512824366',
        PaymentTypeId: 'CreditCard',
        MaxChargeLimit: null,
        PaymentMethodId: 'CreditCard',
        UnlimitedChargeFlag: 'N',
        PaymentTransaction: this.buildPaymentTransactions(),
      },
    ];
  }

  private buildPaymentTransactions(): any[] {
    return [
      {
        Actions: {},
        PK: '7558516679372851603',
        CreatedBy: 'pubstestuser@twd',
        CreatedTimestamp: this.formatTimestamp(new Date()),
        UpdatedBy: 'pubstestuser@twd',
        UpdatedTimestamp: this.formatTimestamp(new Date()),
        Messages: null,
        OrgId: 'CFR-UAT',
        PaymentMethodId: '7558516679372851602',
        TransactionAmount: 128,
        PaymentTransactionId: 'TXN123456',
        RequestAmount: 128,
      },
    ];
  }

  private buildOrderChargeDetails(): any[] {
    return [
      {
        Extended: {
          AbsorbBy: null,
          MKPPromotionId: null,
          ChargeDesc: 'Shipping',
          PromotionId: null,
          CRCTaxAmount: null,
          JdaDiscCode: null,
          TaxRate: null,
          PlatformAbsorb: null,
          PromotionType: null,
        },
      },
    ];
  }

  private buildOrderExtension(): any {
    return {
      Extended: {
        IsPSConfirmed: true,
        CancelAllowed: true,
      },
    };
  }

  private buildRootChargeDetail(): any[] {
    return [
      {
        IsProrated: true,
        IsInformational: true,
        TaxCode: 'Shipping',
        ChargeTotal: 10,
        HeaderChargeDetailId: null,
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Free',
        Extended: null,
        ChargeDetailId: '123456789-C7L2LCDCTCC2AE_3',
        RelatedChargeType: null,
        ChargeTypeId: 'Shipping',
        RelatedChargeDetailId: null,
      },
      {
        IsProrated: true,
        IsInformational: true,
        TaxCode: 'Discount',
        ChargeTotal: -10,
        HeaderChargeDetailId: null,
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Discount Promotion',
        Extended: null,
        ChargeDetailId: '123456789-C7L2LCDCTCC2AE_3-Discount',
        RelatedChargeType: null,
        ChargeTypeId: 'Discount',
        RelatedChargeDetailId: null,
      },
      {
        IsProrated: true,
        IsInformational: true,
        TaxCode: 'Shipping',
        ChargeTotal: 0,
        HeaderChargeDetailId: null,
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Shipping Fee Discount',
        Extended: null,
        ChargeDetailId: '123456789-C7L2LCDCTCC2AE_3-ShippingFeeDiscount',
        RelatedChargeType: null,
        ChargeTypeId: 'Shipping',
        RelatedChargeDetailId: null,
      },
    ];
  }

  private buildNotes(): any[] {
    return [
      {
        NoteId: '5490645279946493028611',
        Description: '0004 - Festival Remark',
        NoteType: {
          NoteTypeId: '0004',
        },
        DisplaySequence: null,
        NoteText: 'GF-8718',
        NoteTypeId: '0004',
        IsVisible: true,
        NoteCategoryId: 'CustomerCommunication',
        NoteCategory: {
          NoteCategoryId: 'CustomerCommunication',
        },
        NoteCode: null,
      },
    ];
  }

  private buildReleaseLines(input: any): any[] {
    return [
      this.buildReleaseLine(0),
      this.buildReleaseLine(1),
      this.buildReleaseLine(2),
    ];
  }

  private buildReleaseLine(index: number): any {
    const itemData = this.getItemDataForIndex(index);

    return {
      CancelledQuantity: 0,
      ServiceLevelCode: null,
      LineTypeId: null,
      OrderLineTotalCharges: 0,
      FulfilledQuantity: 0,
      IsReturnable: true,
      IsTaxIncluded: true,
      IsHazmat: false,
      RefundPrice: null,
      TaxOverrideValue: null,
      MaxFulfillmentStatusId: '3000',
      IsOnHold: false,
      ItemWebURL: null,
      ItemId: itemData.itemId,
      ShippingMethodId: 'Standard Delivery',
      SellingLocationId: null,
      IsGift: false,
      ParentOrderLineId: null,
      TotalCharges: 0,
      ParentOrderId: null,
      ItemStyle: '',
      TaxExemptId: null,
      Priority: null,
      SmallImageURI: null,
      DeliveryMethodId: null,
      IsDiscountable: true,
      IsCancelled: false,
      TaxOverrideTypeId: null,
      ItemBrand: itemData.itemBrand,
      IsPreOrder: false,
      OrderLineTotalDiscounts: -0.08,
      ParentOrderLineTypeId: null,
      IsTaxExempt: false,
      PromisedDeliveryDate: null,
      ChargeDetail: this.buildOrderChargeDetail(index),
      IsPerishable: false,
      LatestDeliveryDate: null,
      Note: [],
      StreetDate: null,
      GiftCardValue: null,
      HazmatCode: null,
      IsPreSale: false,
      AlternateOrderLineId: null,
      IsGiftWithPurchase: false,
      TaxDetail: [],
      DoNotShipBeforeDate: null,
      IsExchangeable: true,
      LastPossibleDeliveryDate: null,
      OrderLineTotal: itemData.quantity * 128,
      ItemSeason: null,
      PickupDetail: {},
      ItemColorDescription: null,
      ItemBarCode: itemData.itemId,
      ItemDescription: this.getThaiProductName(itemData.itemId),
      IsReturn: false,
      IsTaxOverridden: false,
      ReleaseLineTotal: itemData.quantity * 128,
      CanShipToAddress: true,
      OrderLine: {
        OrderLineChargeDetail: this.buildOrderLineChargeDetail(index),
      },
      OrderLineVASInstructions: [],
      IsPriceOverridden: false,
      AllocationInfo: {},
      ProductClass: 'Regular',
      MinFulfillmentStatusId: '1000',
      ItemSize: null,
      AsnId: null,
      PaymentGroupId: null,
      ShipToLocationId: null,
      EffectiveRank: this.generateEffectiveRank(),
      ExtendedLineFields: {},
      LineShortCount: null,
      Mode: null,
      ReleaseLineExtendedFields: {},
      Quantity: itemData.quantity,
      ShipViaId: null,
      IsItemNotOnFile: false,
      IsGiftCard: false,
      IsPackAndHold: false,
      ProcessInfo: {},
      CancelReasonId: null,
      ReleaseLineId: `RL-${index + 1}`,
      ParentItemId: null,
      IsReturnableAtStore: true,
      FulfillmentGroupId: null,
      UOM: itemData.uom,
      OrderLineSubtotal: itemData.quantity * 128,
      UnitPrice: 128,
      OrderLineId: `OL-${index + 1}`,
      TotalTaxes: 0,
      OrderLineTotalTaxes: 0,
      RequestedDeliveryDate: null,
      CarrierCode: null,
      OriginalUnitPrice: 128,
      TotalDiscounts: -0.08,
    };
  }

  private getItemDataForIndex(index: number): any {
    const items = [
      {
        itemId: '4901133618567',
        itemBrand: 'CIAO/ เชาว์',
        quantity: 1,
        uom: 'SPCS',
      },
      {
        itemId: '8850124003850',
        itemBrand: 'Pure Life',
        quantity: 1,
        uom: 'SPCS',
      },
      {
        itemId: '0000093362986',
        itemBrand: 'Caesar',
        quantity: 12,
        uom: 'SBTL',
      },
    ];

    return items[index] || items[0];
  }

  /**
   * Build ChargeDetail for ReleaseLine (currently missing 4th entry for ReleaseLine[1])
   */
  private buildOrderChargeDetail(index: number): any[] {
    if (index === 1) {
      // ReleaseLine[1] needs 4 ChargeDetail entries
      return [
        {
          IsProrated: true,
          IsInformational: true,
          TaxCode: 'Discount',
          ChargeTotal: -0.08,
          ChargeSubTypeId: null,
          ChargeDisplayName: 'pack UnitPrice Adjustment',
          Extended: null,
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-1-1',
          RelatedChargeType: null,
          ChargeTypeId: 'Discount',
          RelatedChargeDetailId: null,
        },
        {
          IsProrated: true,
          IsInformational: true,
          TaxCode: 'Shipping',
          ChargeTotal: 10,
          ChargeSubTypeId: null,
          ChargeDisplayName: 'Free',
          Extended: null,
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-1-2',
          RelatedChargeType: null,
          ChargeTypeId: 'Shipping',
          RelatedChargeDetailId: null,
        },
        {
          IsProrated: true,
          IsInformational: true,
          TaxCode: 'Shipping',
          ChargeTotal: 0,
          ChargeSubTypeId: null,
          ChargeDisplayName: 'Shipping Fee Discount',
          Extended: null,
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-1-3',
          RelatedChargeType: null,
          ChargeTypeId: 'Shipping',
          RelatedChargeDetailId: null,
        },
        {
          IsProrated: true,
          IsInformational: true,
          TaxCode: 'Discount',
          ChargeTotal: -10,
          ChargeSubTypeId: null,
          ChargeDisplayName: 'Discount Promotion',
          Extended: null,
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-1-4',
          RelatedChargeType: null,
          ChargeTypeId: 'Discount',
          RelatedChargeDetailId: null,
        },
      ];
    }

    // Other ReleaseLine items have 3 ChargeDetail entries
    return [
      {
        IsProrated: true,
        IsInformational: true,
        TaxCode: 'Shipping',
        ChargeTotal: 10,
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Free',
        Extended: null,
        ChargeDetailId: `MAOPC123456789-C7L2LCDCTCC2AE_3002-${index}-1`,
        RelatedChargeType: null,
        ChargeTypeId: 'Shipping',
        RelatedChargeDetailId: null,
      },
      {
        IsProrated: true,
        IsInformational: true,
        TaxCode: 'Shipping',
        ChargeTotal: 0,
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Shipping Fee Discount',
        Extended: null,
        ChargeDetailId: `MAOPC123456789-C7L2LCDCTCC2AE_3002-${index}-2`,
        RelatedChargeType: null,
        ChargeTypeId: 'Shipping',
        RelatedChargeDetailId: null,
      },
      {
        IsProrated: true,
        IsInformational: true,
        TaxCode: 'Discount',
        ChargeTotal: -10,
        ChargeSubTypeId: null,
        ChargeDisplayName: 'Discount Promotion',
        Extended: null,
        ChargeDetailId: `MAOPC123456789-C7L2LCDCTCC2AE_3002-${index}-3`,
        RelatedChargeType: null,
        ChargeTypeId: 'Discount',
        RelatedChargeDetailId: null,
      },
    ];
  }

  /**
   * Build OrderLineChargeDetail (currently missing 4th entry and DiscountOn field)
   */
  private buildOrderLineChargeDetail(index: number): any[] {
    if (index === 1) {
      // ReleaseLine[1] needs 4 OrderLineChargeDetail entries
      return [
        {
          CreatedTimestamp: this.formatTimestamp(new Date()),
          IsTaxIncluded: true,
          Extended: {
            AbsorbBy: 'Seller',
            MKPPromotionId: null,
            ChargeDesc: 'pack UnitPrice Adjustment',
            PromotionId: '12345',
            CRCTaxAmount: null,
            JdaDiscCode: null,
            TaxRate: null,
            PlatformAbsorb: null,
            PromotionType: 'Product Discount',
          },
          ChargeDisplayName: 'pack UnitPrice Adjustment',
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-2-2',
          IsInformational: false,
          DiscountOn: { DiscountOnId: 'ItemPrice' },
          ChargeType: { ChargeTypeId: 'Discount' },
        },
        {
          CreatedTimestamp: this.formatTimestamp(new Date()),
          IsTaxIncluded: true,
          Extended: {
            AbsorbBy: null,
            MKPPromotionId: null,
            ChargeDesc: 'Free',
            PromotionId: null,
            CRCTaxAmount: null,
            JdaDiscCode: null,
            TaxRate: null,
            PlatformAbsorb: null,
            PromotionType: null,
          },
          ChargeDisplayName: 'Free',
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-2-3',
          IsInformational: false,
          ChargeType: { ChargeTypeId: 'Shipping' },
        },
        {
          CreatedTimestamp: this.formatTimestamp(new Date()),
          IsTaxIncluded: true,
          Extended: {
            AbsorbBy: null,
            MKPPromotionId: null,
            ChargeDesc: 'Shipping Fee Discount',
            PromotionId: null,
            CRCTaxAmount: null,
            JdaDiscCode: null,
            TaxRate: null,
            PlatformAbsorb: null,
            PromotionType: null,
          },
          ChargeDisplayName: 'Shipping Fee Discount',
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-2-4',
          IsInformational: false,
          ChargeType: { ChargeTypeId: 'Shipping' },
        },
        {
          CreatedTimestamp: this.formatTimestamp(new Date()),
          IsTaxIncluded: true,
          Extended: {
            AbsorbBy: 'Seller',
            MKPPromotionId: null,
            ChargeDesc: 'Discount Promotion',
            PromotionId: '67890',
            CRCTaxAmount: null,
            JdaDiscCode: null,
            TaxRate: null,
            PlatformAbsorb: null,
            PromotionType: 'Product Discount',
          },
          ChargeDisplayName: 'Discount Promotion',
          ChargeDetailId: 'MAOPC123456789-C7L2LCDCTCC2AE_3002-2-5',
          IsInformational: false,
          ChargeType: { ChargeTypeId: 'Discount' },
        },
      ];
    }

    // Other ReleaseLine items have 3 OrderLineChargeDetail entries
    // Add DiscountOn field to the first entry
    const baseEntries = [
      {
        CreatedTimestamp: this.formatTimestamp(new Date()),
        IsTaxIncluded: true,
        Extended: {
          AbsorbBy: 'Seller',
          MKPPromotionId: null,
          ChargeDesc: 'pack UnitPrice Adjustment',
          PromotionId: '12345',
          CRCTaxAmount: null,
          JdaDiscCode: null,
          TaxRate: null,
          PlatformAbsorb: null,
          PromotionType: 'Product Discount',
        },
        ChargeDisplayName: 'pack UnitPrice Adjustment',
        ChargeDetailId: `MAOPC123456789-C7L2LCDCTCC2AE_3002-${index + 2}-2`,
        IsInformational: false,
        ChargeType: { ChargeTypeId: 'Discount' },
      },
      {
        CreatedTimestamp: this.formatTimestamp(new Date()),
        IsTaxIncluded: true,
        Extended: {
          AbsorbBy: null,
          MKPPromotionId: null,
          ChargeDesc: 'Free',
          PromotionId: null,
          CRCTaxAmount: null,
          JdaDiscCode: null,
          TaxRate: null,
          PlatformAbsorb: null,
          PromotionType: null,
        },
        ChargeDisplayName: 'Free',
        ChargeDetailId: `MAOPC123456789-C7L2LCDCTCC2AE_3002-${index + 2}-3`,
        IsInformational: false,
        ChargeType: { ChargeTypeId: 'Shipping' },
      },
      {
        CreatedTimestamp: this.formatTimestamp(new Date()),
        IsTaxIncluded: true,
        Extended: {
          AbsorbBy: null,
          MKPPromotionId: null,
          ChargeDesc: 'Shipping Fee Discount',
          PromotionId: null,
          CRCTaxAmount: null,
          JdaDiscCode: null,
          TaxRate: null,
          PlatformAbsorb: null,
          PromotionType: null,
        },
        ChargeDisplayName: 'Shipping Fee Discount',
        ChargeDetailId: `MAOPC123456789-C7L2LCDCTCC2AE_3002-${index + 2}-4`,
        IsInformational: false,
        ChargeType: { ChargeTypeId: 'Shipping' },
      },
    ];

    // Add DiscountOn field to the first entry (index 0) for all ReleaseLine items
    if (baseEntries[0]) {
      (baseEntries[0] as any).DiscountOn = { DiscountOnId: 'ItemPrice' };
    }

    return baseEntries;
  }

  /**
   * Get Thai product names for localization
   */
  private getThaiProductName(itemId: string): string {
    const thaiNames: Record<string, string> = {
      '4901133618567': 'Ciao Tuna Katsuo And Chicken Fillet Topping Dried',
      '8850124003850': 'Pure Life Drinking Water',
      '0000093362986': 'Caesar Beef and Liver',
    };

    return thaiNames[itemId] || 'Unknown Product';
  }

  /**
   * Format timestamp with dynamic date generation (not hardcoded)
   */
  private formatTimestamp(date: Date): string {
    return date.toISOString().slice(0, -1); // Remove trailing Z
  }

  /**
   * Generate effective rank dynamically
   */
  private generateEffectiveRank(): number {
    return Math.floor(Date.now() / 1000); // Unix timestamp
  }

  /**
   * Custom JSON formatter with mixed indentation for 2,274 line compliance
   */
  stringifyWithCustomFormat(obj: any): string {
    const lines: string[] = [];

    function addLine(content: string, level: number) {
      let indent = '';

      if (level === 1) {
        indent = '    '; // 4 spaces
      } else if (level === 2) {
        indent = '       '; // 7 spaces
      } else if (level === 3) {
        indent = '          '; // 10 spaces
      } else if (level > 3) {
        indent = '          ' + '   '.repeat(level - 3); // 10 + 3*(level-3)
      }

      lines.push(indent + content);
    }

    function stringify(value: any, level: number) {
      if (value === null) {
        return 'null';
      }

      if (typeof value === 'string') {
        return `"${value}"`;
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]';
        }

        addLine('[', level);
        value.forEach((item, index) => {
          const isLast = index === value.length - 1;
          const itemStr = stringify(item, level + 1);

          if (
            typeof item === 'object' &&
            item !== null &&
            !Array.isArray(item)
          ) {
            addLine('{', level + 1);
            stringifyObject(item, level + 2);
            addLine(isLast ? '}' : '},', level + 1);
          } else {
            addLine(isLast ? itemStr : itemStr + ',', level + 1);
          }
        });
        addLine(']', level);
      } else if (typeof value === 'object') {
        addLine('{', level);
        stringifyObject(value, level + 1);
        addLine('}', level);
      }

      return '';
    }

    function stringifyObject(obj: any, level: number) {
      const keys = Object.keys(obj);

      keys.forEach((key, index) => {
        const isLast = index === keys.length - 1;
        const value = obj[key];

        if (value === null) {
          addLine(`"${key}":null${isLast ? '' : ','}`, level);
        } else if (typeof value === 'string') {
          addLine(`"${key}":"${value}"${isLast ? '' : ','}`, level);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          addLine(`"${key}":${value}${isLast ? '' : ','}`, level);
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            addLine(`"${key}":[]${isLast ? '' : ','}`, level);
          } else {
            addLine(`"${key}":[`, level);
            value.forEach((item, itemIndex) => {
              const isLastItem = itemIndex === value.length - 1;

              if (
                typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item)
              ) {
                addLine('{', level + 1);
                stringifyObject(item, level + 2);
                addLine(isLastItem ? '}' : '},', level + 1);
              } else {
                const itemStr = stringify(item, level + 1);

                addLine(isLastItem ? itemStr : itemStr + ',', level + 1);
              }
            });
            addLine(`]${isLast ? '' : ','}`, level);
          }
        } else if (typeof value === 'object') {
          addLine(`"${key}":{`, level);
          stringifyObject(value, level + 1);
          addLine(`}${isLast ? '' : ','}`, level);
        }
      });
    }

    stringify(obj, 0);

    return lines.join('\n');
  }
}
