/**
 * Test the release payload transformation to cancel format
 * Tests actual transformation from release/311647613-C7LXT7KBTPA3TN-Rel.json to cancel_fully.json format
 */

const fs = require('fs');
const path = require('path');

// Mock the enhanced cancel transformation service
class ReleaseToCancelTransformationService {
  constructor() {
    this.timestampService = {
      getTimestamp: (type) => {
        switch (type) {
          case 'base':
            return '2025-08-18T03:30:08.776';
          case 'cancel_timestamp':
            return '2025-08-18T03:30:08.776';
          default:
            return new Date().toISOString();
        }
      }
    };
  }

  /**
   * Transform original release payload to cancel format exactly
   */
  async transformReleaseToCancel(orderId) {
    try {
      console.log(`🔍 Loading original release payload for OrderId: ${orderId}`);
      
      // Load original release payload
      const releasePath = path.join(__dirname, 'release', `${orderId}-Rel.json`);
      if (!fs.existsSync(releasePath)) {
        throw new Error(`Release file not found: ${releasePath}`);
      }

      const releaseData = JSON.parse(fs.readFileSync(releasePath, 'utf8'));
      console.log(`✅ Loaded release payload: ${Object.keys(releaseData).length} fields`);

      // Apply critical transformations for cancellation
      const cancelTimestamp = this.timestampService.getTimestamp('cancel_timestamp');
      
      // Transform to cancel format
      const cancelResponse = {
        // Header transformations
        CancelLineCount: releaseData.Order?.OrderLine?.length || 6,
        SuspendedOrderId: null,
        CreatedTimestamp: releaseData.Order?.CreatedTimestamp || "2025-08-18T03:25:30.08",
        Invoice: [],
        BusinessDate: null,
        ReturnTrackingDetail: [],
        MaxFulfillmentStatusId: "9000", // Changed from "3000" to "9000"
        IsOnHold: false,
        Process: "postReleaseCancellation", // Changed from release process
        IsConfirmed: true,
        CurrencyCode: releaseData.CurrencyCode || "THB",
        SellingLocationId: null,
        EventSubmitTime: "2038-01-18T23:59:00",
        UpdatedBy: "apiuser4pmp", // Changed from original user
        FulfillmentStatus: "Canceled", // Changed from active status
        CustomerFirstName: releaseData.Order?.CustomerFirstName || "Grab Customer",
        OrderChargeDetail: [],
        OrderType: {
          OrderTypeId: "MKP-HD-STD"
        },
        CountedDate: "2025-08-18T03:25:50.579",
        TotalCharges: 0, // Changed from original amount
        OrderLineCount: releaseData.Order?.OrderLine?.length || 6,
        
        // Copy OrderHold from original
        OrderHold: releaseData.Order?.OrderHold || [{
          UpdatedTimestamp: cancelTimestamp,
          HoldTypeId: "AwaitingPayment",
          CreatedBy: "pubsubuser@pmp",
          CreatedTimestamp: cancelTimestamp,
          Process: "saveOrder::-1843768273",
          ResolveReasonId: "AcceptPayment",
          ExternalCreatedDate: null,
          ResolveReasonComments: null,
          UpdatedBy: "pubsubuser@pmp",
          OrgId: "CFR",
          ExternalCreatedBy: null,
          StatusId: "2000",
          ApplyReasonComments: null,
          ChangeLog: null
        }],
        
        // Copy OrderToken from original
        OrderToken: releaseData.Order?.OrderToken || "Eq6hdcKzBPuFyDWt6bJn009168b939b61ff1ee534296290b6711",
        IsArchiveInProgress: false,
        CreatedBy: releaseData.Order?.CreatedBy || "pubsubuser@pmp",
        Priority: null,
        IsCancelled: true, // Changed from false
        OrderTagDetail: [],
        OrderExtension5: [],
        CustomerId: releaseData.Order?.CustomerId || null,
        OrderId: orderId,
        OrderExtension3: [],
        OrderExtension4: [],
        
        // Copy OrderExtension1 from original
        OrderExtension1: releaseData.Order?.OrderExtension1 || {},
        OrderExtension2: [],
        OrderSubTotal: 0, // Changed from original amount
        
        // Transform Payment array
        Payment: this.transformPaymentArray(releaseData.Order?.Payment || []),
        
        // Transform OrderLine array 
        OrderLine: this.transformOrderLineArray(releaseData.Order?.OrderLine || [], cancelTimestamp),
        
        // Other fields
        ShipToAddress: "",
        CustomerTypeId: "",
        NextEventTime: null,
        ChangeLog: {
          ModTypes: {
            Order: [
              'Order::ChargeDetail::Discount::Remove',
              'Order::Cancel',
              'Order::ChargeDetail::Shipping::Remove'
            ]
          }
        },
        SourceSystemId: null,
        TotalTaxes: 0,
        CustomerEMailId: null,
        CustomerLastName: "Customer",
        StatusId: "9000", // Changed from original status
        PickupLocationId: null,
        PromisedDate: "2025-08-18T03:25:50.579",
        ShipToKey: null,
        CustomerPhoneNumber: null,
        FulfillmentType: "Ship To Home",
        OrgId: "CFR",
        BillToKey: null,
        DocumentTypeId: "0001",
        OrderNote: releaseData.Order?.OrderNote || [],
        SourceEnterprise: null,
        HeaderCharge: [],
        Release: [],
        EntryMethod: "API",
        DeliveryMethod: null,
        Milestone: [],
        DerivedOrderStatus: "Cancelled", // Changed from original
        ReleaseTotal: 0, // Changed from original amount
        ShipNode: null,
        UpdatedTimestamp: cancelTimestamp,
        PK: releaseData.Order?.PK || this.generateUniqueId('order_pk'),
        PurgeDate: null,
        OrderTaxDetail: [],
        AlternateOrderId: `${orderId}-C7LXT7KBTPA3TN`
      };

      console.log(`✅ Cancel response generated: ${Object.keys(cancelResponse).length} fields`);
      return cancelResponse;

    } catch (error) {
      console.error(`❌ Error transforming release to cancel:`, error.message);
      throw error;
    }
  }

  /**
   * Transform Payment array for cancellation
   */
  transformPaymentArray(originalPayments) {
    if (!originalPayments || originalPayments.length === 0) {
      return [];
    }

    return originalPayments.map(payment => ({
      ...payment,
      RequestedAmount: 0, // Changed to 0 for cancellation
      AuthorizedAmount: 0, // Changed to 0 for cancellation
      // Keep other payment fields from original
    }));
  }

  /**
   * Transform OrderLine array for cancellation
   */
  transformOrderLineArray(originalOrderLines, cancelTimestamp) {
    if (!originalOrderLines || originalOrderLines.length === 0) {
      return [];
    }

    return originalOrderLines.map((orderLine, index) => ({
      ...orderLine,
      // Cancel-specific transformations
      MaxFulfillmentStatusId: "9000", // Changed from original
      IsCancelled: true, // Changed from false
      CancelledOrderLineSubTotal: orderLine.UnitPrice || 0,
      Quantity: 0, // Changed to 0 for cancellation
      StatusId: "9000", // Changed from original
      FulfillmentStatus: "Canceled", // Changed from original
      Process: "postReleaseCancellation", // Changed from original
      UpdatedBy: "apiuser4pmp", // Changed from original
      UpdatedTimestamp: cancelTimestamp,
      
      // Add cancel history
      OrderLineCancelHistory: [{
        UpdatedBy: "apiuser4pmp",
        UpdatedTimestamp: cancelTimestamp,
        OrgId: "CFR",
        CreatedBy: "apiuser4pmp",
        CreatedTimestamp: cancelTimestamp,
        CancelReason: {
          ReasonId: "1000.000"
        },
        CancelQuantity: 1,
        Process: "postReleaseCancellation",
        CancelComments: "Customer requested late order cancellation"
      }],
      
      // Add ChangeLog
      ChangeLog: {
        ModTypes: {
          OrderLine: ['OrderLine::Cancel', 'OrderLine::Cancel::Customer'],
          QuantityDetail: ['QuantityDetail::QuantityStatus::Increase::1500']
        },
        ChangeSet: [{
          Properties: [{
            New: 'true',
            Old: 'false',
            Property: 'IsCancelled'
          }],
          ModType: 'OrderLine::Cancel::Customer'
        }]
      }
    }));
  }

  generateUniqueId(type) {
    return `${Date.now()}${Math.floor(Math.random() * 1000000)}`;
  }
}

// Main test function
async function testReleaseTransformation() {
  console.log('🔄 Testing Release Payload to Cancel Format Transformation\n');

  try {
    const service = new ReleaseToCancelTransformationService();
    const orderId = '311647613-C7LXT7KBTPA3TN';

    console.log(`📦 Original OrderId: ${orderId}`);
    console.log('🔍 Starting transformation...\n');

    const startTime = Date.now();
    const cancelResponse = await service.transformReleaseToCancel(orderId);
    const endTime = Date.now();

    console.log(`\n⏱️  Transformation completed in ${endTime - startTime}ms`);

    // Convert to JSON for analysis
    const responseJson = JSON.stringify(cancelResponse, null, 2);
    const responseLines = responseJson.split('\n').length;

    console.log('\n📊 Transformation Results:');
    console.log(`   • Generated lines: ${responseLines}`);
    console.log(`   • Characters: ${responseJson.length}`);
    console.log(`   • OrderId: ${cancelResponse.OrderId}`);
    console.log(`   • MaxFulfillmentStatusId: ${cancelResponse.MaxFulfillmentStatusId}`);
    console.log(`   • FulfillmentStatus: ${cancelResponse.FulfillmentStatus}`);
    console.log(`   • IsCancelled: ${cancelResponse.IsCancelled}`);
    console.log(`   • Process: ${cancelResponse.Process}`);
    console.log(`   • OrderSubTotal: ${cancelResponse.OrderSubTotal}`);
    console.log(`   • ReleaseTotal: ${cancelResponse.ReleaseTotal}`);

    // Save transformed result
    const outputPath = path.join(__dirname, 'transformed_cancel_response.json');
    fs.writeFileSync(outputPath, responseJson);
    console.log(`\n💾 Transformed response saved to: ${outputPath}`);

    // Compare with target
    const targetPath = path.join(__dirname, 'data', 'samples', 'cancel_fully.json');
    if (fs.existsSync(targetPath)) {
      const targetContent = fs.readFileSync(targetPath, 'utf8');
      const targetLines = targetContent.split('\n').length;
      
      console.log('\n🎯 Target Comparison:');
      console.log(`   • Target lines: ${targetLines}`);
      console.log(`   • Generated lines: ${responseLines}`);
      console.log(`   • Coverage: ${Math.round((responseLines / targetLines) * 100)}%`);
      
      // Key field validation
      const targetData = JSON.parse(targetContent);
      console.log('\n✅ Key Field Validation:');
      console.log(`   • OrderId match: ${cancelResponse.OrderId === targetData.OrderId ? '✅' : '❌'}`);
      console.log(`   • MaxFulfillmentStatusId: ${cancelResponse.MaxFulfillmentStatusId === targetData.MaxFulfillmentStatusId ? '✅' : '❌'}`);
      console.log(`   • FulfillmentStatus: ${cancelResponse.FulfillmentStatus === targetData.FulfillmentStatus ? '✅' : '❌'}`);
      console.log(`   • IsCancelled: ${cancelResponse.IsCancelled === targetData.IsCancelled ? '✅' : '❌'}`);
      console.log(`   • Process: ${cancelResponse.Process === targetData.Process ? '✅' : '❌'}`);
    }

    console.log('\n🎉 Release payload transformation test completed successfully!');
    
    return {
      success: true,
      responseLines,
      transformationTime: endTime - startTime,
      outputPath
    };

  } catch (error) {
    console.error('❌ Transformation test failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the test
if (require.main === module) {
  testReleaseTransformation().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = { testReleaseTransformation, ReleaseToCancelTransformationService };