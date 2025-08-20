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

### Cancel Service Features
- **Data-Driven**: Uses real order information instead of static templates
- **Field Mapping**: Leverages `CancelFieldMappingService` for precise transformations
- **File-Based**: Uses `FileBasedOrderRepositoryService` (no database required)
- **Production-Ready**: Comprehensive error handling with HTTP exceptions

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