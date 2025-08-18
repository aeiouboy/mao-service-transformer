# MAO Service Transformer - Sequence Diagram

## Complete Transformation Flow

```mermaid
sequenceDiagram
    participant Client
    participant Controller as SimpleTransformController
    participant Facade as ReleaseOrderTransformationService
    participant Orchestrator as OrderTransformationOrchestratorService
    participant IdGen as DynamicIdGeneratorService
    participant CalcSvc as CalculationService
    participant TimeSvc as TimestampService
    participant OrderSvc as OrderTransformationService
    participant OrderLineSvc as OrderLineTransformationService
    participant PaymentSvc as PaymentTransformationService
    participant PaymentMethodSvc as PaymentMethodTransformationService
    participant PaymentTxnSvc as PaymentTransactionTransformationService
    participant AllocSvc as AllocationTransformationService
    participant ReleaseSvc as ReleaseTransformationService
    participant ReleaseLineSvc as ReleaseLineTransformationService
    participant FileOutputSvc as FileOutputService

    %% 1. Request Entry Point
    Client->>+Controller: GET /api/test
    Controller->>Controller: Load sample_input.json
    Controller->>+Facade: transform(sampleInput)
    
    %% 2. Facade Delegation
    Facade->>+Orchestrator: orchestrateTransformation(input)
    
    %% 3. Phase 1: Initialize Context
    Orchestrator->>+IdGen: resetCounter()
    IdGen-->>-Orchestrator: ✓
    
    Orchestrator->>+CalcSvc: calculateOrderSubtotal(input)
    CalcSvc->>CalcSvc: Process OrderLine items
    CalcSvc->>CalcSvc: Check bundle vs regular items
    CalcSvc->>CalcSvc: Calculate: Quantity * UnitPrice
    CalcSvc-->>-Orchestrator: orderSubtotal: 157
    
    Orchestrator->>+CalcSvc: calculateShippingCharge(input)
    CalcSvc->>CalcSvc: Apply business rule: Free if >100
    CalcSvc-->>-Orchestrator: shippingCharge: 0
    
    Orchestrator->>+CalcSvc: calculateOrderTotalTaxes(input)
    CalcSvc-->>-Orchestrator: totalTaxes: 0
    
    Orchestrator->>+CalcSvc: calculateOrderDiscounts(input)
    CalcSvc-->>-Orchestrator: discounts: 0
    
    Orchestrator->>+TimeSvc: generateTimestamps()
    TimeSvc-->>-Orchestrator: timestamps
    
    Note over Orchestrator: Context initialized with:<br/>calculations, timestamps, idGenerator
    
    %% 4. Phase 2: Transform Order Domain
    Orchestrator->>+OrderSvc: transformOrderHeader(input, context)
    OrderSvc->>+OrderSvc: generateMD5Hash(shipToAddress)
    OrderSvc->>OrderSvc: Special case: PostalCode=99999, Country=TH
    OrderSvc-->>-OrderSvc: addressId: "6d89479d94844b20b56f12009c2ad7"
    OrderSvc->>OrderSvc: Map order header fields
    OrderSvc-->>-Orchestrator: orderHeader
    
    Orchestrator->>+OrderLineSvc: transformOrderLines(input, context)
    loop For each OrderLine
        OrderLineSvc->>+IdGen: getNextId()
        IdGen-->>-OrderLineSvc: lineId
        OrderLineSvc->>+CalcSvc: calculateLineSubtotal(line)
        CalcSvc-->>-OrderLineSvc: lineSubtotal
        OrderLineSvc->>+CalcSvc: calculateLineShippingCharge(input, index)
        CalcSvc-->>-OrderLineSvc: lineShipping
        OrderLineSvc->>OrderLineSvc: Transform line fields
    end
    OrderLineSvc-->>-Orchestrator: orderLines[]
    
    %% 5. Phase 3: Transform Payment Domain
    alt Payment data exists
        Orchestrator->>+PaymentSvc: transformPayments(input, context)
        PaymentSvc->>+IdGen: getNextId()
        IdGen-->>-PaymentSvc: paymentId
        PaymentSvc->>+TimeSvc: getTimestamp()
        TimeSvc-->>-PaymentSvc: timestamp
        PaymentSvc-->>-Orchestrator: payments[]
        
        Orchestrator->>+PaymentMethodSvc: transformPaymentMethods(input, context)
        PaymentMethodSvc->>+IdGen: getNextId()
        IdGen-->>-PaymentMethodSvc: methodId
        PaymentMethodSvc-->>-Orchestrator: paymentMethods[]
        
        Orchestrator->>+PaymentTxnSvc: transformPaymentTransactions(input, context)
        PaymentTxnSvc->>+IdGen: getNextId()
        IdGen-->>-PaymentTxnSvc: transactionId
        PaymentTxnSvc-->>-Orchestrator: paymentTransactions[]
    else No payment data
        Note over Orchestrator: Skip payment transformation
    end
    
    %% 6. Phase 4: Transform Allocation Domain
    Orchestrator->>+AllocSvc: transformAllocations(input, context)
    AllocSvc->>+IdGen: getNextId()
    IdGen-->>-AllocSvc: allocationId
    AllocSvc-->>-Orchestrator: allocations[]
    
    %% 7. Phase 5: Transform Release Domain
    Orchestrator->>+ReleaseSvc: transformReleases(input, context)
    ReleaseSvc->>+IdGen: getNextId()
    IdGen-->>-ReleaseSvc: releaseId
    ReleaseSvc-->>-Orchestrator: releases[]
    
    Orchestrator->>+ReleaseLineSvc: transformReleaseLines(input, context)
    ReleaseLineSvc->>+IdGen: getNextId()
    IdGen-->>-ReleaseLineSvc: releaseLineId
    ReleaseLineSvc-->>-Orchestrator: releaseLines[]
    
    %% 8. Phase 6: Assemble Final Output
    Orchestrator->>Orchestrator: assembleReleaseOutput()
    Note over Orchestrator: Combine all components into<br/>final ReleaseOutputDTO structure:<br/>- OriginalPayload<br/>- Order nested structure<br/>- Financial totals
    
    %% 9. Phase 7: Validation
    Orchestrator->>Orchestrator: validateTransformation(output, input)
    Note over Orchestrator: Validate:<br/>- Required fields present<br/>- Calculation accuracy<br/>- Structure compliance
    
    Orchestrator-->>-Facade: ReleaseOutputDTO
    Facade-->>-Controller: ReleaseOutputDTO
    
    %% 10. Response Assembly
    Controller->>Controller: Wrap response with metadata
    Controller-->>-Client: {success: true, input, output}

    %% Optional: File Output
    opt Save to file system
        Controller->>+Facade: saveTransformedOrder(input, outputDir)
        Facade->>+FileOutputSvc: saveToFile(transformed, outputDir)
        FileOutputSvc->>FileOutputSvc: Generate filename: orderid{XXXXX}.json
        FileOutputSvc->>FileOutputSvc: Write JSON to file system
        FileOutputSvc-->>-Facade: filePath
        Facade-->>-Controller: filePath
    end
```

## Key Sequence Interactions

### 1. **Initialization & Context Setup**
- ID generator reset for consistent patterns
- Financial calculations performed upfront
- Timestamp generation for deterministic output

### 2. **Domain Service Orchestration**
- Order domain: header + lines transformation
- Payment domain: payments + methods + transactions
- Allocation domain: inventory allocation logic
- Release domain: release + release lines

### 3. **Service Dependencies**
- All services depend on shared utilities (IdGen, CalcSvc, TimeSvc)
- Sequential ID generation ensures consistency
- Calculation service provides business rule compliance

### 4. **Business Rule Enforcement**
- Free shipping calculation (>$100 threshold)
- Address hash generation for deduplication
- Bundle vs regular item price calculations
- Proportional shipping allocation to lines

## Calculation Flow Detail

```mermaid
sequenceDiagram
    participant Orchestrator
    participant CalcSvc as CalculationService
    participant OrderLine

    Note over Orchestrator: Financial Calculation Sequence

    Orchestrator->>+CalcSvc: calculateOrderSubtotal(input)
    loop For each OrderLine
        CalcSvc->>OrderLine: Check OrderLineExtension1.Extended
        alt IsBundle = true
            CalcSvc->>CalcSvc: NumberOfPack * PackUnitPrice
        else Regular item
            CalcSvc->>CalcSvc: Quantity * UnitPrice
        end
        CalcSvc->>CalcSvc: Add to running total
    end
    CalcSvc->>CalcSvc: Math.round(total)
    CalcSvc-->>-Orchestrator: orderSubtotal: 157

    Orchestrator->>+CalcSvc: calculateShippingCharge(input)
    CalcSvc->>CalcSvc: Get orderSubtotal
    alt orderSubtotal >= 100
        CalcSvc->>CalcSvc: Free shipping = 0
    else orderSubtotal < 100
        CalcSvc->>CalcSvc: Math.round(subtotal * 0.025 * 100) / 100
    end
    CalcSvc-->>-Orchestrator: shippingCharge: 0

    Note over CalcSvc: Business Rule Applied:<br/>Free shipping for orders ≥ $100
```

## Error Handling Flow

```mermaid
sequenceDiagram
    participant Controller
    participant Facade
    participant Orchestrator

    Controller->>+Facade: transform(input)
    Facade->>+Orchestrator: orchestrateTransformation(input)
    
    alt Transformation Success
        Orchestrator-->>Facade: ReleaseOutputDTO
        Facade-->>Controller: ReleaseOutputDTO
        Controller->>Controller: Return success response
    else Transformation Error
        Orchestrator-->>Facade: Error: "Transformation failed"
        Facade-->>Controller: Error: "Facade transformation failed"
        Controller->>Controller: Return error response
    end
```

This sequence diagram shows the complete flow from HTTP request to final output, including all service interactions, calculations, and error handling paths.