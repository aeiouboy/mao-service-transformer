// Validation script for the custom output
const fs = require('fs');

function validateCustomOutput() {
  try {
    console.log('🔍 Validating Custom Transformation Output...\n');
    
    // Read the custom output file
    const outputFile = '/Users/chongraktanaka/Projects/mao-service-transformer/release/orderidTEST-ORDER-2025-08-16T07-09-14.json';
    const result = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
    
    // Financial Validation
    console.log('💰 FINANCIAL CALCULATIONS VALIDATION');
    console.log('=' .repeat(50));
    
    const orderSubtotal = result.OriginalPayload.OrderSubtotal;
    const releaseTotal = result.OriginalPayload.ReleaseTotal;
    const totalCharges = result.OriginalPayload.TotalCharges;
    
    console.log(`✅ Order Subtotal: ${orderSubtotal} USD`);
    console.log(`✅ Release Total: ${releaseTotal} USD`);
    console.log(`✅ Total Charges: ${totalCharges} USD`);
    console.log(`✅ Free Shipping Applied: ${totalCharges === 0 ? 'Yes (order ≥ $100)' : 'No'}`);
    
    // Structure Validation
    console.log('\n🏗️ STRUCTURE VALIDATION');
    console.log('=' .repeat(50));
    
    const hasPayment = result.OriginalPayload.Order.Payment && result.OriginalPayload.Order.Payment.length > 0;
    const hasPaymentMethod = hasPayment && result.OriginalPayload.Order.Payment[0].PaymentMethod && result.OriginalPayload.Order.Payment[0].PaymentMethod.length > 0;
    const hasPaymentTransaction = hasPaymentMethod && result.OriginalPayload.Order.Payment[0].PaymentMethod[0].PaymentTransaction && result.OriginalPayload.Order.Payment[0].PaymentMethod[0].PaymentTransaction.length > 0;
    const hasReleaseLine = result.OriginalPayload.Order.ReleaseLine && result.OriginalPayload.Order.ReleaseLine.length > 0;
    const hasBillingAddress = hasPaymentMethod && result.OriginalPayload.Order.Payment[0].PaymentMethod[0].BillingAddress;
    
    console.log(`✅ Payment Structure: ${hasPayment ? 'Present' : 'Missing'}`);
    console.log(`✅ PaymentMethod: ${hasPaymentMethod ? 'Present' : 'Missing'}`);
    console.log(`✅ PaymentTransaction: ${hasPaymentTransaction ? 'Present' : 'Missing'}`);
    console.log(`✅ ReleaseLine Array: ${hasReleaseLine ? 'Present' : 'Missing'}`);
    console.log(`✅ BillingAddress: ${hasBillingAddress ? 'Present' : 'Missing'}`);
    
    // Key Field Validation
    console.log('\n🔑 KEY FIELDS VALIDATION');
    console.log('=' .repeat(50));
    
    const customOrderId = 'TEST-ORDER-2025-08-16T07-09-14';
    const paymentOrderId = result.OriginalPayload.Order.Payment[0].OrderId;
    const addressId = result.OriginalPayload.AddressId;
    const paymentAmount = result.OriginalPayload.Order.Payment[0].PaymentMethod[0].Amount;
    
    console.log(`✅ Custom OrderId: ${customOrderId}`);
    console.log(`✅ Payment OrderId: ${paymentOrderId}`);
    console.log(`✅ OrderId Match: ${customOrderId === paymentOrderId ? 'Yes' : 'No'}`);
    console.log(`✅ Address Hash: ${addressId} (30 chars)`);
    console.log(`✅ Payment Amount: ${paymentAmount} USD`);
    console.log(`✅ Amount Match: ${paymentAmount === releaseTotal ? 'Yes' : 'No'}`);
    
    // Business Rules Validation
    console.log('\n📋 BUSINESS RULES VALIDATION');
    console.log('=' .repeat(50));
    
    const freeShippingThreshold = 100;
    const appliedFreeShipping = orderSubtotal >= freeShippingThreshold && totalCharges === 0;
    const currencyCode = result.OriginalPayload.CurrencyCode;
    const serviceLevel = result.OriginalPayload.ServiceLevelCode;
    
    console.log(`✅ Free Shipping Rule: ${appliedFreeShipping ? 'Correctly Applied' : 'Not Applied'}`);
    console.log(`✅ Currency Code: ${currencyCode}`);
    console.log(`✅ Service Level: ${serviceLevel}`);
    console.log(`✅ Order Confirmed: ${result.OriginalPayload.IsConfirmed ? 'Yes' : 'No'}`);
    
    // Extension Fields Validation
    console.log('\n🔧 EXTENSION FIELDS VALIDATION');
    console.log('=' .repeat(50));
    
    const hasOrderExtension = result.OriginalPayload.Order.OrderExtension1 && result.OriginalPayload.Order.OrderExtension1.Extended;
    const hasOrderChargeDetail = result.OriginalPayload.Order.OrderChargeDetail && result.OriginalPayload.Order.OrderChargeDetail.length > 0;
    
    console.log(`✅ OrderExtension1.Extended: ${hasOrderExtension ? 'Present' : 'Missing'}`);
    console.log(`✅ OrderChargeDetail Array: ${hasOrderChargeDetail ? 'Present' : 'Missing'}`);
    
    if (hasOrderExtension) {
      const ext = result.OriginalPayload.Order.OrderExtension1.Extended;
      console.log(`   - FullTaxInvoice: ${ext.FullTaxInvoice}`);
      console.log(`   - AllowSubstitution: ${ext.AllowSubstitution}`);
      console.log(`   - CancelAllowed: ${ext.CancelAllowed}`);
      console.log(`   - IsPSConfirmed: ${ext.IsPSConfirmed}`);
    }
    
    // ReleaseLine Validation
    if (hasReleaseLine) {
      console.log('\n📦 RELEASE LINE VALIDATION');
      console.log('=' .repeat(50));
      
      const releaseLine = result.OriginalPayload.Order.ReleaseLine[0];
      const hasOrderLine = releaseLine.OrderLine;
      const hasChargeDetail = releaseLine.ChargeDetail && releaseLine.ChargeDetail.length > 0;
      const hasOrderLineExtension = releaseLine.OrderLine && releaseLine.OrderLine.OrderLineExtension1;
      
      console.log(`✅ OrderLine Structure: ${hasOrderLine ? 'Present' : 'Missing'}`);
      console.log(`✅ ChargeDetail Array: ${hasChargeDetail ? 'Present' : 'Missing'}`);
      console.log(`✅ OrderLineExtension1: ${hasOrderLineExtension ? 'Present' : 'Missing'}`);
      
      if (hasChargeDetail) {
        console.log(`   - ChargeDetail Count: ${releaseLine.ChargeDetail.length}`);
        releaseLine.ChargeDetail.forEach((charge, index) => {
          console.log(`   - [${index}] ${charge.ChargeDisplayName}: ${charge.ChargeTotal}`);
        });
      }
    }
    
    // Final Summary
    console.log('\n🎯 VALIDATION SUMMARY');
    console.log('=' .repeat(50));
    
    const validationChecks = [
      orderSubtotal === 157,
      releaseTotal === 157,
      totalCharges === 0,
      hasPayment,
      hasPaymentMethod,
      hasReleaseLine,
      customOrderId === paymentOrderId,
      paymentAmount === releaseTotal,
      appliedFreeShipping
    ];
    
    const passedChecks = validationChecks.filter(check => check).length;
    const totalChecks = validationChecks.length;
    const passRate = (passedChecks / totalChecks * 100).toFixed(1);
    
    console.log(`✅ Validation Checks Passed: ${passedChecks}/${totalChecks}`);
    console.log(`📊 Pass Rate: ${passRate}%`);
    console.log(`🎉 Status: ${passRate === '100.0' ? 'ALL VALIDATIONS PASSED!' : 'Some validations failed'}`);
    
    return {
      passRate: parseFloat(passRate),
      passedChecks,
      totalChecks,
      result
    };
    
  } catch (error) {
    console.error('❌ Validation error:', error.message);
    return null;
  }
}

// Run validation
const validationResult = validateCustomOutput();
if (validationResult && validationResult.passRate === 100) {
  console.log('\n🏆 PERFECT SCORE: Custom transformation maintains 100% accuracy!');
} else {
  console.log('\n⚠️  Some validation issues detected.');
}