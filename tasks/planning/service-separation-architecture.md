# Service Separation Architecture

## Overview

This document outlines the service separation architecture for the MAO Service Transformer, transitioning from a monolithic transformation service to a modular, domain-driven service architecture.

## Domain Boundary Analysis

Based on the database schema analysis and the current monolithic service structure, we have identified the following domain boundaries:

### Core Domains

1. **Orders Domain**
   - Tables: `orders`, `order_lines`
   - Responsibilities: Order creation, line management, order-level business rules

2. **Payments Domain**
   - Tables: `payments`, `payment_methods`, `payment_transactions`
   - Responsibilities: Payment processing, billing address management, transaction handling

3. **Allocations Domain**
   - Tables: `allocations`, `quantity_details`
   - Responsibilities: Inventory allocation, quantity management

4. **Releases Domain**
   - Tables: `releases`, `release_lines`
   - Responsibilities: Release creation, line allocation, fulfillment coordination

### Shared Services

1. **Calculation Service**
   - Cross-domain calculations (shipping, taxes, discounts)
   - Financial totals and line-level calculations

2. **Business Rules Service**
   - Shipping method mapping
   - Business configuration rules

3. **Timestamp Service**
   - Dynamic timestamp generation
   - Entity-specific timing logic

4. **ID Generation Service** (Already implemented)
   - Dynamic ID generation for all domains

## Service Interface Specifications

### Shared Services

#### CalculationService
```typescript
interface ICalculationService {
  // Order-level calculations
  calculateOrderSubtotal(input: PMPOrderInputDTO): number;
  calculateShippingCharge(input: PMPOrderInputDTO): number;
  calculateOrderTotalTaxes(input: PMPOrderInputDTO): number;
  calculateOrderDiscounts(input: PMPOrderInputDTO): number;
  
  // Line-level calculations
  calculateLineSubtotal(line: any): number;
  calculateLineTotal(line: any): number;
  calculateLineTaxDetails(line: any): LineTaxDetails;
  calculateLineShippingCharge(input: PMPOrderInputDTO, lineIndex: number): number;
  calculateLineDiscountCharge(input: PMPOrderInputDTO, lineIndex: number): number;
}

interface LineTaxDetails {
  taxableAmount: number;
  taxAmount: number;
  taxRate: number;
}
```

#### BusinessRulesService
```typescript
interface IBusinessRulesService {
  getShippingMethodMapping(input: PMPOrderInputDTO): ShippingMethodMapping;
  getBusinessRuleConfiguration(ruleType: string, context: any): any;
}

interface ShippingMethodMapping {
  orderTypeId: string;
  deliveryMethod: string;
  shippingMethodId: string;
  destinationAction: string;
}
```

#### TimestampService
```typescript
interface ITimestampService {
  getTimestamp(entityType: string): string;
  getEntityTimestamps(entityTypes: string[]): Record<string, string>;
}
```

### Domain Services

#### PaymentTransformationService
```typescript
interface IPaymentTransformationService {
  transformPayments(payments: any[], context: TransformationContext): any[];
}
```

#### PaymentMethodTransformationService
```typescript
interface IPaymentMethodTransformationService {
  transformPaymentMethods(paymentMethods: any[], context: TransformationContext): any[];
  transformBillingAddress(billingAddress: any, context: TransformationContext): any;
}
```

#### PaymentTransactionTransformationService
```typescript
interface IPaymentTransactionTransformationService {
  transformPaymentTransactions(transactions: any[], context: TransformationContext): any[];
}
```

#### TransformationContext
```typescript
interface TransformationContext {
  orderId: string;
  orgId: string;
  input: PMPOrderInputDTO;
  timestamps: Record<string, string>;
  calculationResults: {
    orderSubtotal: number;
    totalCharges: number;
    orderTotalTaxes: number;
    orderDiscounts: number;
  };
}
```

## Dependency Mapping

### Service Dependencies

```
ReleaseOrderTransformationService (Orchestrator)
├── CalculationService (shared)
├── BusinessRulesService (shared)
├── TimestampService (shared)
├── DynamicIdGeneratorService (shared)
├── PaymentTransformationService (domain)
│   ├── PaymentMethodTransformationService (domain)
│   │   └── PaymentTransactionTransformationService (domain)
│   └── CalculationService (shared)
└── ... (Future domain services)
```

### Cross-Domain Dependencies

1. **Payments → Calculations**: Payment totals require calculation service
2. **Orders → Business Rules**: Order mapping requires shipping rules
3. **All Domains → Timestamps**: Entity creation requires timestamp service
4. **All Domains → ID Generation**: Entity creation requires unique IDs

## Migration Strategy

### Phase 2.1: Extract Core Shared Services
✅ **Status**: Ready for Implementation

**Services to Extract:**
1. `CalculationService` - Financial calculations
2. `BusinessRulesService` - Business logic configuration
3. `TimestampService` - Dynamic timestamp generation

**Implementation Approach:**
- Extract methods from monolithic service
- Create injectable NestJS services
- Maintain backward compatibility
- Update imports gradually

### Phase 2.2: Extract Payment Domain Services
✅ **Status**: Ready for Implementation

**Services to Extract:**
1. `PaymentTransformationService` - Payment root transformation
2. `PaymentMethodTransformationService` - Payment method and billing address
3. `PaymentTransactionTransformationService` - Transaction processing

**Implementation Approach:**
- Create domain-specific transformation services
- Inject shared services as dependencies
- Isolate payment-specific business logic
- Prepare for future microservice extraction

### Phase 3.1: Extract Order Domain Services
🔄 **Status**: Future Phase

**Services to Extract:**
1. `OrderTransformationService` - Order header transformation
2. `OrderLineTransformationService` - Order line processing
3. `OrderChargeTransformationService` - Charge detail processing

### Phase 3.2: Extract Allocation Domain Services
🔄 **Status**: Future Phase

**Services to Extract:**
1. `AllocationTransformationService` - Allocation processing
2. `QuantityDetailTransformationService` - Quantity management

### Phase 3.3: Extract Release Domain Services
🔄 **Status**: Future Phase

**Services to Extract:**
1. `ReleaseTransformationService` - Release header processing
2. `ReleaseLineTransformationService` - Release line transformation

## Implementation Guidelines

### Service Design Principles

1. **Single Responsibility**: Each service handles one domain or shared concern
2. **Dependency Injection**: Use NestJS DI for service composition
3. **Interface Segregation**: Define clear service contracts
4. **Testability**: Services should be easily unit testable
5. **Immutability**: Avoid side effects in transformation logic

### Error Handling Strategy

1. **Validation**: Input validation at service boundaries
2. **Error Propagation**: Consistent error handling across services
3. **Logging**: Structured logging for debugging and monitoring
4. **Fallback**: Graceful degradation when services are unavailable

### Testing Strategy

1. **Unit Tests**: Test individual service methods
2. **Integration Tests**: Test service interactions
3. **Contract Tests**: Validate service interfaces
4. **End-to-End Tests**: Validate complete transformation flow

## Service Location Strategy

### Directory Structure
```
app/src/common/services/
├── shared/                    # Cross-domain shared services
│   ├── calculation.service.ts
│   ├── business-rules.service.ts
│   ├── timestamp.service.ts
│   └── dynamic-id-generator.service.ts (existing)
├── domain/                    # Domain-specific services
│   ├── payment-transformation.service.ts
│   ├── payment-method-transformation.service.ts
│   ├── payment-transaction-transformation.service.ts
│   └── ... (future domain services)
└── release-order-transformation.service.ts (orchestrator)
```

### Module Organization
```
CommonModule
├── SharedServicesModule
│   ├── CalculationService
│   ├── BusinessRulesService
│   ├── TimestampService
│   └── DynamicIdGeneratorService
├── DomainServicesModule
│   ├── PaymentTransformationService
│   ├── PaymentMethodTransformationService
│   └── PaymentTransactionTransformationService
└── ReleaseOrderTransformationService (orchestrator)
```

## Future Microservice Extraction

### Service Boundaries for Microservices

1. **Payment Service**
   - Handles all payment-related transformations
   - Manages billing addresses and transactions
   - Can be independently deployed and scaled

2. **Order Service**
   - Manages order and order line transformations
   - Handles order-level business rules
   - Core domain service

3. **Fulfillment Service**
   - Manages allocations and releases
   - Handles inventory and fulfillment logic
   - Can be optimized for high throughput

### Communication Patterns

1. **Synchronous**: Direct service calls for transformations
2. **Asynchronous**: Event-driven for cross-service notifications
3. **Shared Database**: Continue with single database during transition
4. **Database Per Service**: Future state with domain-specific databases

## Benefits of Service Separation

### Immediate Benefits (Phase 2.1-2.2)

1. **Code Organization**: Clear separation of concerns
2. **Testability**: Easier to unit test individual services
3. **Maintainability**: Reduced complexity in monolithic service
4. **Reusability**: Shared services can be used across domains

### Long-term Benefits (Phase 3+)

1. **Scalability**: Independent scaling of domain services
2. **Team Ownership**: Clear ownership boundaries for teams
3. **Technology Diversity**: Different services can use different technologies
4. **Deployment Independence**: Services can be deployed independently

## Risks and Mitigation

### Risks

1. **Increased Complexity**: More services to manage
2. **Performance Overhead**: Service call overhead
3. **Debugging Difficulty**: Distributed debugging challenges
4. **Data Consistency**: Maintaining consistency across services

### Mitigation Strategies

1. **Gradual Migration**: Implement phases incrementally
2. **Monitoring**: Comprehensive observability stack
3. **Testing**: Extensive integration testing
4. **Documentation**: Clear service documentation and contracts

## Success Metrics

### Phase 2.1-2.2 Success Criteria

1. **Functional Preservation**: All existing tests pass
2. **Code Quality**: Improved code organization and testability
3. **Performance**: No performance regression
4. **Build Success**: Clean compilation and deployment

### Long-term Success Criteria

1. **Team Velocity**: Faster feature development
2. **Service Independence**: Services can be developed independently
3. **Operational Excellence**: Improved monitoring and debugging
4. **Scalability**: Independent service scaling capabilities