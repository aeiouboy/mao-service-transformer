# MAO Service Transformer

**Manhattan Active® Omni (MAO) Service Transformer** - A NestJS-based microservice that transforms PMP (Pricing & Merchandising Platform) order creation payloads into Release message format for the Order Management System (OMS).

## Project Overview

This is a production-grade transformation engine that handles complex business logic for order payload transformation with financial calculations, field mappings, and comprehensive validation.

### Core Architecture

- **Domain-Driven Organization**: Tasks, application code, data, tests, docs, and infrastructure are cleanly separated
- **NestJS Enterprise Pattern**: Uses modules, services, DTOs, interceptors, and pipes with full observability stack
- **Multi-Layer Transformation**: Complex business logic for order payload transformation with financial calculations

### Key Components

**Primary Transformation Service**: `app/src/common/services/release-order-transformation.service.ts`
- Handles PMP → Release message transformation
- Complex business rules for shipping methods, tax calculations, and financial totals
- 1,700+ lines of business logic with precise field mappings

**Cancel Service**: `app/src/common/services/domain/order-cancellation.service.ts`
- Transforms existing orders into standardized cancel message format
- Data-driven transformation with business rules and field mappings
- Production-ready with comprehensive error handling

**DTO Layer**: `app/src/common/dtos/release-create-order.dto.ts`
- Comprehensive TypeScript DTOs for input/output validation
- Class-validator decorators for runtime validation
- Handles complex nested object structures with 50+ field types

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm package manager
- PostgreSQL (for full application)
- Redis (for caching)

### Installation

```bash
# Install dependencies
cd app
pnpm install

# Development mode
pnpm run start:dev

# Production build
pnpm run build
pnpm run start:prod
```

## Development Commands

### Application Development (run from `/app` directory)

```bash
# Development
pnpm install
pnpm run start:dev              # Development with watch mode
pnpm run start:local            # Local environment with watch
pnpm run start:debug            # Debug mode with inspector

# Building & Production
pnpm run build                  # TypeScript compilation
pnpm run start:prod            # Production mode

# Code Quality
pnpm run lint                  # ESLint + Prettier formatting
pnpm run format               # Prettier formatting only

# Testing
pnpm run test                 # Unit tests
pnpm run test:watch          # Unit tests in watch mode
pnpm run test:cov            # Coverage report
pnpm run test:e2e            # End-to-end tests
pnpm run test:debug          # Debug tests

# Database Operations
pnpm run migration:create -- <name>    # Create new migration
pnpm run migration:run                 # Run pending migrations
pnpm run migration:revert              # Revert last migration
pnpm run seed:run                      # Run database seeds
```

## Testing Framework

### CSV Alignment Testing

The project includes comprehensive test scripts for validating CSV field alignment and transformation accuracy:

#### Release Case Testing

```bash
# Test release transformation with CSV field alignment
node test-csv-alignment.js
```

**Output**: `tests/outputs/release/csv-aligned-test-result.json`
- Tests release transformation service
- Validates CSV field alignment
- Verifies business logic calculations

#### Enhanced Testing (Release + Cancel)

```bash
# Test both release and cancel cases
node test-csv-alignment-enhanced.js
```

**Outputs**:
- `tests/outputs/release/csv-aligned-release-result.json` - Release transformation results
- `tests/outputs/cancel/csv-aligned-cancel-result.json` - Cancel transformation results  
- `tests/outputs/csv-alignment-test-summary.json` - Test execution summary

### Transformation Testing (run from project root)

```bash
# Primary test scripts
node test-csv-alignment.js                                    # Release transformation only
node test-csv-alignment-enhanced.js                          # Release + Cancel comprehensive
node tests/cancel/test-complete-fixed-service.js             # Cancel service test

# Validation tests  
node tests/dto/test-full-dto.js                              # DTO validation
node tests/transformation/test-transformation-comprehensive.js # Comprehensive transformation

# Field analysis and comparison
node tests/scripts/compare-results.js
node tests/scripts/detailed-missing-fields-analysis.js
```

### Test Output Organization

All test outputs are organized in the `tests/outputs/` directory:

```
tests/outputs/
├── release/                    # Release transformation results
│   ├── csv-aligned-release-result.json
│   └── csv-aligned-test-result.json
├── cancel/                     # Cancel transformation results
│   ├── csv-aligned-cancel-result.json
│   └── real-order-cancel-result-311647613-C7LXT7KBTPA3TN.json
└── csv-alignment-test-summary.json  # Test execution summary
```

## Core Business Logic

### Field Mapping System
- **Source**: `data/mappings/corrected_field_mapping.csv`
- **Sample Data**: `data/samples/sample_input.json` → transformation → `release/orderid{XXXXX}.json`
- **Validation**: Compare outputs against `data/samples/sample_order.json` for accuracy

### Financial Calculations
1. **Order Subtotal**: SUM(OrderLine[].Quantity * OrderLine[].UnitPrice) OR bundle calculations
2. **Shipping Charges**: Business rules (free shipping >$100, otherwise 2.5% of subtotal)  
3. **Tax Calculations**: Line-level and header-level tax aggregation
4. **Discount Processing**: Proportional allocation across order lines
5. **Release Total**: OrderSubtotal + TotalCharges + TotalTaxes

### Business Rules Engine
- **Shipping Method Mapping**: Order type + delivery method + shipping ID → business configuration
- **Address Hashing**: MD5 generation for address deduplication
- **ID Generation**: Sequence-based ID assignment for consistent transformation
- **Timestamp Precision**: Fixed timestamps for deterministic output matching

## Service Architecture & Workflows

### 🚀 **Release Transformation Service (Order Creation)**

The system implements a sophisticated 7-phase orchestration for transforming PMP orders into Release format:

#### **Service Flow Overview**
```
PMPOrderInputDTO → [7-Phase Transformation] → ReleaseOutputDTO
```

#### **Step-by-Step Process**

##### **Phase 1: Initialize Transformation Context**
```typescript
// Entry: OrderTransformationOrchestratorService.initializeTransformationContext()
1. Reset ID generators for consistent patterns
2. Calculate financial totals:
   - Order subtotal (quantity × price per line)
   - Total charges (shipping, handling fees)
   - Order taxes (line-level + header-level)
   - Order discounts (promotional + bulk)
3. Generate standardized timestamps
4. Create shared TransformationContext for all services
```

##### **Phase 2: Transform Order Domain**
```typescript
// Services: OrderTransformationService + OrderLineTransformationService
1. Transform Order Header:
   - Customer info (name, email, phone)
   - Financial totals (subtotal, charges, taxes)
   - Shipping details (addresses, methods)
   - Status flags (confirmed, on-hold, etc.)

2. Transform Order Object:
   - Nested order structure for MAO format
   - Customer addresses and extensions
   - Order-level metadata and flags

3. Transform Charge Details:
   - Shipping charges with business rules
   - Handling fees and surcharges
   - Tax-inclusive/exclusive calculations

4. Transform Order Lines (Dynamic):
   - Loop through input.OrderLine array
   - Extract product data (ID, name, pricing)
   - Calculate line totals and taxes
   - Process bundle/pack products
   - Generate barcode and image URIs

5. Generate Order Notes:
   - System-generated notes
   - Special delivery instructions
   - Customer preferences
```

##### **Phase 3: Transform Payment Domain (Conditional)**
```typescript
// Services: PaymentTransformationService + Method + Transaction
IF payments exist:
1. Transform Payments:
   - Payment amounts and currencies
   - Payment status and dates
   - Authorization details

2. Transform Payment Methods:
   - Credit card, bank transfer, etc.
   - Method-specific details
   - Security/encryption info

3. Transform Payment Transactions:
   - Transaction IDs and timestamps  
   - Authorization and capture details
   - Refund and void information
```

##### **Phase 4: Transform Allocation Domain**
```typescript
// Service: AllocationTransformationService
1. Transform Order Line Allocations:
   - Inventory allocation per line item
   - Warehouse and location mapping
   - Quantity reservations

2. Generate Allocation Summary:
   - Total allocated quantities
   - Allocation status overview
   - Inventory impact summary
```

##### **Phase 5: Transform Release Domain**
```typescript
// Services: ReleaseTransformationService + ReleaseLineTransformationService
1. Transform Release Header:
   - Generate unique Release ID
   - Set release type and status
   - Calculate total lines and quantities
   - Determine fulfillment priority
   - Create release notes and metadata

2. Transform Release Lines:
   - Map order lines to release lines
   - Product details and quantities
   - Shipping and delivery info
   - Line-level charges and taxes

3. Generate System Fields:
   - MAO system metadata
   - Message routing information
   - Tracing and monitoring IDs
```

##### **Phase 6: Assemble Final Output**
```typescript
// Assembly: Precise field ordering and structure
1. Create OriginalPayload structure:
   - Order header fields in exact sequence
   - Nested Order object at correct position
   - ChargeDetail and ReleaseLine arrays
   - All fields aligned with target format

2. Generate OriginalHeaders:
   - System headers (User, Organization)
   - Message routing info
   - Distributed tracing IDs
   - Queue and broker details

3. Combine into ReleaseOutputDTO format
```

##### **Phase 7: Comprehensive Validation**
```typescript
// Validation: Data integrity and consistency
1. Structure Validation:
   - Required fields present
   - Correct data types
   - Nested object integrity

2. Business Logic Validation:
   - Line counts match (Release vs Order)
   - Financial totals consistency
   - Status flag coherence

3. Domain-Specific Validation:
   - Release line validation per order line
   - Payment consistency (if present)
   - Allocation accuracy
```

---

### ❌ **Cancel Transformation Service (Order Cancellation)**

Focused service for transforming existing orders into standardized cancel format:

#### **Service Flow Overview**
```
OrderID → [3-Step Cancel Process] → Cancel Message Format
```

#### **Step-by-Step Process**

##### **Step 1: Validate Cancellation Eligibility**
```typescript
// Service: OrderCancellationService + FileBasedOrderRepositoryService
1. Input Validation:
   - OrderID format and length check
   - Non-empty and valid characters

2. Order Existence Check:
   - File exists in release/ directory
   - JSON structure is valid
   - Order not already cancelled

3. Business Rules Check:
   - Order status allows cancellation
   - No active shipments in progress
   - Refund eligibility verification
```

##### **Step 2: Load Complete Order Data**
```typescript
// Service: FileBasedOrderRepositoryService
1. File System Access:
   - Build file path: release/orderid{OrderID}.json
   - Read JSON file from filesystem
   - Handle file access errors gracefully

2. Data Parsing:
   - Parse JSON content
   - Validate data structure
   - Extract order components

3. Data Preparation:
   - Prepare order data for transformation
   - Identify cancellable components
   - Set up cancel request context
```

##### **Step 3: Apply Cancel Transformation**
```typescript
// Service: CancelFieldMappingService
1. Extract Base Information:
   - Order ID, customer details
   - Original order amounts
   - Payment and shipping info

2. Apply Cancel Business Rules:
   - Set cancel reason code (default: 1000.000)
   - Calculate refund amounts
   - Update inventory status
   - Set cancel timestamps

3. Field Mapping Process:
   - Transform order fields → cancel fields
   - Map order lines → cancel line items
   - Apply cancel-specific formatting
   - Ensure MAO compliance

4. Generate Cancel Response:
   - Assemble complete cancel message
   - Include original order reference
   - Add cancel metadata and tracking
   - Format according to cancel_fully.json structure
```

---

### 🔧 **Supporting Services**

#### **Dynamic ID Generator Service**
- `generateReleaseId()`: "REL" + timestamp + counter
- `generateMessageId()`: UUID-style message identifiers
- `generateSpanId()`: Distributed tracing span IDs
- `generateTraceId()`: Distributed tracing trace IDs
- `resetCounter()`: Reset internal counters for consistency

#### **Calculation Service**
- `calculateOrderSubtotal()`: Sum of (quantity × unit price) with bundle handling
- `calculateTotalCharges()`: Shipping + handling with business rules (free shipping >$100)
- `calculateOrderTotalTaxes()`: Tax aggregation across all tax types
- `calculateOrderDiscounts()`: Promotional and bulk discount calculations

#### **Timestamp Service**
- `getTimestamp(type)`: Generate formatted timestamps for specific purposes
- `getAllStandardTimestamps()`: Create complete timestamp set for transformation
- Handles various formats: ISO, epoch, MAO-specific formats

#### **Business Rules Service**
- Shipping method mapping based on order characteristics
- Address validation and MD5 hash generation
- Product bundle handling and pricing rules
- Tax exemption and calculation logic

---

### 📊 **Service Comparison**

| Aspect | **Release Service** | **Cancel Service** |
|--------|-------------------|-------------------|
| **Complexity** | High (7 phases, 8+ services) | Medium (3 steps, 3 services) |
| **Input** | Complex PMPOrderInputDTO | Simple OrderID string |
| **Process** | Multi-phase orchestration | Sequential transformation |
| **Data Source** | Input payload | File-based repository |
| **Output** | Complete ReleaseOutputDTO | Cancel message JSON |
| **Services** | 8+ domain services | 3 specialized services |
| **Calculations** | Extensive financial logic | Refund and status updates |
| **Validation** | Comprehensive 7-level validation | Basic eligibility checks |

---

## Data Flow Architecture

```
PMP Order Input → Validation (DTOs) → Business Rules → Financial Calculations → Field Mapping → Release Output
     ↓                 ↓                    ↓                     ↓                 ↓
Sample Input → Class Validators → Shipping/Tax Rules → Monetary Totals → CSV Mapping → JSON Output
```

## Cancel Workflow

```
Order ID → Validate → Load Order Data → Apply Cancel Rules → Cancel Message
```

## Configuration & Environment

### Required Environment Variables
- `NODE_ENV`: local | dev | prod
- `GRAPHQL_ENABLED`: Enable GraphQL endpoint
- Database, Redis, and observability configurations in `app/src/core/config/`

### Key Configuration Files
- `app/nest-cli.json`: NestJS CLI configuration
- `app/tsconfig.json`: TypeScript compiler options with strict mode
- `app/sequelize/config/config.js`: Database connection configuration
- `database/migrations/`: SQL migration files for schema management

## Architecture Patterns

### NestJS Module Organization
- **Core Modules**: Database, Config, Logging, Tracing, Health
- **Common Layer**: DTOs, Services, Middleware, Pipes
- **Utility Layer**: Filters, Interceptors, Helpers
- **Domain Services**: Business logic and transformation engines

### Enterprise Observability
- **OpenTelemetry**: Distributed tracing with spans and metrics
- **Structured Logging**: Winston with Elasticsearch and Logstash
- **Health Monitoring**: Terminus with CPU, Kafka, and database checks
- **Error Handling**: Global exception filters with request ID tracking

### Data Transformation Pipeline
- **Input Validation**: Class-validator with custom decorators
- **Business Logic**: Service layer with calculation methods
- **Output Generation**: JSON serialization with field mapping
- **Quality Assurance**: Automated comparison testing

## Common Development Workflows

### When modifying transformation logic:
1. Update business rules in `release-order-transformation.service.ts`
2. Run transformation tests to validate output
3. Compare against expected sample with analysis scripts
4. Update field mappings in CSV if needed
5. Ensure all financial calculations remain accurate

### When adding new fields:
1. Update DTOs with proper validation decorators  
2. Add field mapping in CSV configuration
3. Implement transformation logic in service
4. Add test cases for the new field
5. Validate against sample output

### Testing Strategy

#### Transformation Validation
Always validate transformations against expected output:
1. Run transformation with sample input
2. Compare result against `data/samples/sample_order.json`
3. Use field analysis scripts to identify discrepancies
4. Update business logic to achieve 100% field accuracy

#### Unit Testing
- Focus on business logic in transformation service
- Test financial calculation methods individually
- Validate DTO transformation accuracy
- Use Jest with coverage reporting

## API Endpoints

### Release Transformation
```bash
POST /api/v1/orders/transform
Content-Type: application/json

# Transform PMP order to Release format
```

### Cancel Transformation
```bash
POST /api/v1/orders/cancel/{orderId}
Content-Type: application/json

# Transform order to Cancel format
```

## Monitoring & Observability

- **Health Checks**: `/health` endpoint with detailed system status
- **Metrics**: Prometheus-compatible metrics on `/metrics`
- **Tracing**: OpenTelemetry distributed tracing
- **Logging**: Structured JSON logs with correlation IDs

## Contributing

1. Follow existing code patterns and conventions
2. Run tests and ensure all pass before committing
3. Update documentation for new features
4. Use provided test scripts to validate transformations
5. Ensure CSV field alignment compliance

## License

Private project - Manhattan Active® Omni Service Transformer