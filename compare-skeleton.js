#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios');

async function compareWithSkeleton() {
  console.log('🔍 Line-by-Line Skeleton Template Comparison');
  console.log('===========================================\n');

  try {
    // Get current API response
    const response = await axios.get('http://localhost:4500/api/orders/cancelled/TEST_ORDER_STATUS_003/transform');
    const currentData = response.data.data;

    // Read skeleton template interface to extract expected fields
    const skeletonContent = fs.readFileSync('/Users/chongraktanaka/Projects/mao-service-transformer/tasks/planning/cancel-order-skeleton-template.ts', 'utf8');
    
    // Read reference data
    let referenceData;
    try {
      referenceData = JSON.parse(fs.readFileSync('/Users/chongraktanaka/Projects/mao-service-transformer/data/samples/cancel_fully.json', 'utf8'));
    } catch (err) {
      console.log('⚠️  Reference file not found, using skeleton template only');
    }

    console.log('📊 Field Presence Analysis:');
    console.log('==========================\n');

    // Extract expected fields from skeleton template
    const expectedFields = extractFieldsFromSkeleton(skeletonContent);
    const currentFields = Object.keys(currentData);
    
    console.log(`Expected fields from skeleton: ${expectedFields.length}`);
    console.log(`Current API fields: ${currentFields.length}`);
    console.log(`Match: ${expectedFields.length === currentFields.length ? '✅ YES' : '❌ NO'}\n`);

    // Check missing fields
    const missingFields = expectedFields.filter(field => !currentFields.includes(field));
    const extraFields = currentFields.filter(field => !expectedFields.includes(field));

    if (missingFields.length > 0) {
      console.log('❌ Missing Fields:');
      missingFields.forEach(field => console.log(`   - ${field}`));
      console.log();
    }

    if (extraFields.length > 0) {
      console.log('➕ Extra Fields:');
      extraFields.forEach(field => console.log(`   + ${field}`));
      console.log();
    }

    console.log('🔍 Field Order Analysis:');
    console.log('========================\n');

    // Check field ordering according to skeleton template
    const skeletonOrder = getSkeletonFieldOrder();
    let orderIssues = [];

    for (let i = 0; i < Math.min(skeletonOrder.length, currentFields.length); i++) {
      const expectedField = skeletonOrder[i];
      const actualField = currentFields[i];
      
      if (expectedField !== actualField && expectedField && actualField) {
        orderIssues.push({
          position: i + 1,
          expected: expectedField,
          actual: actualField
        });
      }
    }

    if (orderIssues.length > 0) {
      console.log('⚠️  Field Order Issues:');
      orderIssues.slice(0, 10).forEach(issue => {
        console.log(`   Position ${issue.position}: Expected '${issue.expected}', Got '${issue.actual}'`);
      });
      if (orderIssues.length > 10) {
        console.log(`   ... and ${orderIssues.length - 10} more order issues`);
      }
      console.log();
    } else {
      console.log('✅ Field ordering follows skeleton template\n');
    }

    // Check specific critical fields
    console.log('🎯 Critical Field Format Analysis:');
    console.log('==================================\n');

    const criticalChecks = [
      {
        field: 'CapturedDate',
        expected: '2025-08-18T03:25:22',
        actual: currentData.CapturedDate,
        description: 'Should be in ISO format without Z suffix'
      },
      {
        field: 'EventSubmitTime',
        expected: '2038-01-18T23:59:00',
        actual: currentData.EventSubmitTime,
        description: 'Should be exact future timestamp'
      },
      {
        field: 'CustomerLastName',
        expected: '"-"',
        actual: currentData.CustomerLastName,
        description: 'Should be dash character when null'
      },
      {
        field: 'CustomerTypeId',
        expected: '""',
        actual: currentData.CustomerTypeId,
        description: 'Should be empty string, not null'
      }
    ];

    criticalChecks.forEach(check => {
      const matches = String(check.actual) === String(check.expected);
      console.log(`${matches ? '✅' : '❌'} ${check.field}:`);
      console.log(`   Expected: ${check.expected}`);
      console.log(`   Actual: ${JSON.stringify(check.actual)}`);
      console.log(`   ${check.description}`);
      console.log();
    });

    console.log('📋 Summary:');
    console.log('===========');
    if (missingFields.length === 0 && extraFields.length === 0 && orderIssues.length === 0) {
      console.log('🎉 Perfect skeleton template compliance achieved!');
    } else {
      console.log(`❌ Issues found:`);
      console.log(`   - Missing fields: ${missingFields.length}`);
      console.log(`   - Extra fields: ${extraFields.length}`);
      console.log(`   - Field order issues: ${orderIssues.length}`);
    }

  } catch (error) {
    console.error('❌ Error during comparison:', error.message);
  }
}

function extractFieldsFromSkeleton(content) {
  // Extract field names from TypeScript interface
  const lines = content.split('\n');
  const fields = [];
  let inInterface = false;

  for (const line of lines) {
    if (line.includes('export interface CancelOrderSkeletonTemplate')) {
      inInterface = true;
      continue;
    }
    
    if (inInterface && line.trim() === '}') {
      break;
    }
    
    if (inInterface) {
      const match = line.match(/^\s*(\w+)[:?]/);
      if (match && !line.trim().startsWith('//')) {
        fields.push(match[1]);
      }
    }
  }

  return fields;
}

function getSkeletonFieldOrder() {
  // Expected field order based on skeleton template
  return [
    'CancelLineCount',
    'SuspendedOrderId', 
    'CreatedTimestamp',
    'Invoice',
    'BusinessDate',
    'ReturnTrackingDetail',
    'MaxFulfillmentStatusId',
    'IsOnHold',
    'Process',
    'IsConfirmed',
    'CurrencyCode',
    'SellingLocationId',
    'EventSubmitTime',
    'UpdatedBy',
    'FulfillmentStatus',
    'CustomerFirstName',
    'OrderChargeDetail',
    'OrderType',
    'CountedDate',
    'TotalCharges',
    'OrderLineCount',
    'OrderHold',
    'OrderToken',
    'IsArchiveInProgress',
    'CreatedBy',
    'Priority',
    'IsCancelled',
    'OrderTagDetail',
    'OrderExtension5',
    'CustomerId',
    'OrderId',
    'OrderExtension3',
    'OrderExtension4',
    'OrderExtension1',
    'OrderExtension2',
    'OrderSubTotal',
    'Payment',
    'CancelReason',
    'ParentReservationRequestId',
    'OrderTrackingInfo',
    'ContactPreference',
    'ReturnLabel',
    'RelatedOrders',
    'TotalInformationalTaxes',
    'ConfirmedDate',
    'ArchiveDate',
    'TransactionReference',
    'OrderPromisingInfo',
    'MinReturnStatusId',
    'OrderTaxDetail',
    'AlternateOrderId',
    'OrderLine',
    'CancelledOrderSubTotal',
    'CustomerEmail',
    'DoNotReleaseBefore',
    'PackageCount',
    'SellingChannel',
    'OrderNote',
    'OrderAttribute',
    'RunId',
    'MinFulfillmentStatusId',
    'DocType',
    'Release',
    'PublishStatus',
    'MinFulfillmentStatus',
    'UpdatedTimestamp',
    'ReturnLabelEmail',
    'MaxReturnStatusId',
    'ProcessInfo',
    'OrderMilestoneEvent',
    'CancelComments',
    'MaxFulfillmentStatus',
    'MerchSaleLineCount',
    'CustomerIdentityDoc',
    'OrgId',
    'OrderMilestone',
    'OrderLocale',
    'IsOrderCountable',
    'TotalTaxes',
    'CustomerLastName',
    'CapturedDate',
    'CustomerTypeId',
    'NextEventTime',
    'ChangeLog',
    'OrderTotal',
    'TotalDiscounts'
  ];
}

compareWithSkeleton();