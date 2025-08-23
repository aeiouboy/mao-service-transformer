# MAO Service Transformer - Project Structure

## Overview

NestJS-based microservice for transforming PMP (Pricing & Merchandising Platform) order creation payloads into Release message format for the Order Management System (OMS). Features enterprise-grade modular architecture with feature-based modules following NestJS best practices.

## Project Directory Structure

```
mao-service-transformer/
├── README.md                    # Main project documentation
├── CLAUDE.md                   # Claude Code assistant instructions
├── PROJECT_STRUCTURE.md       # Project organization guide
│
├── app/                        # Main NestJS application
│   ├── src/                   # Source code
│   │   ├── modules/          # Feature-based modules
│   │   │   ├── orders/       # Order management domain
│   │   │   │   ├── controllers/
│   │   │   │   │   └── cancel-order.controller.ts           # Cancel order endpoint
│   │   │   │   ├── services/
│   │   │   │   │   ├── order-transformation.service.ts      # Order transformation logic
│   │   │   │   │   ├── order-line-transformation.service.ts # Order line processing
│   │   │   │   │   ├── order-cancellation.service.ts       # MAO Cancel Service
│   │   │   │   │   ├── file-based-order-repository.service.ts # File-based order access
│   │   │   │   │   └── order-transformation-orchestrator.service.ts # Order orchestration
│   │   │   │   ├── entities/
│   │   │   │   │   ├── order.entity.ts                      # Order database entity
│   │   │   │   │   ├── order-line.entity.ts                 # Order line entity
│   │   │   │   │   └── allocation.entity.ts                 # Allocation entity
│   │   │   │   ├── dtos/
│   │   │   │   │   └── cancel-order.dto.ts                  # Cancel request DTO
│   │   │   │   └── orders.module.ts                         # Orders module configuration
│   │   │   │
│   │   │   ├── releases/     # Release transformation domain
│   │   │   │   ├── controllers/
│   │   │   │   │   └── release-order.controller.ts          # Release transformation endpoint
│   │   │   │   ├── services/
│   │   │   │   │   ├── release-order-transformer.service.ts # Database-based release transformation
│   │   │   │   │   ├── release-transformation.service.ts    # Release logic
│   │   │   │   │   ├── release-line-transformation.service.ts # Release line processing
│   │   │   │   │   └── order-database-repository.service.ts # Database repository
│   │   │   │   ├── entities/
│   │   │   │   │   └── payment.entity.ts                    # Payment entity
│   │   │   │   ├── dtos/
│   │   │   │   │   ├── release-create-order.dto.ts          # Release order DTO
│   │   │   │   │   └── release-message.dto.ts               # Release message structure
│   │   │   │   ├── mappers/
│   │   │   │   │   ├── release-line.mapper.ts               # Release line mapping
│   │   │   │   │   ├── payment.mapper.ts                    # Payment mapping
│   │   │   │   │   ├── allocation.mapper.ts                 # Allocation mapping
│   │   │   │   │   └── address.mapper.ts                    # Address mapping
│   │   │   │   └── releases.module.ts                       # Releases module configuration
│   │   │   │
│   │   │   ├── transformations/ # Shared transformation utilities
│   │   │   │   ├── services/
│   │   │   │   │   ├── business-rules.service.ts            # Business logic rules
│   │   │   │   │   ├── calculation.service.ts               # Mathematical calculations
│   │   │   │   │   └── cancel-field-mapping.service.ts      # Field mapping utilities
│   │   │   │   └── transformations.module.ts                # Transformations module
│   │   │   │
│   │   │   └── payments/     # Payment processing domain
│   │   │       ├── services/
│   │   │       │   ├── payment-transformation.service.ts    # Payment transformation
│   │   │       │   ├── payment-method-transformation.service.ts # Payment method processing
│   │   │       │   └── payment-transaction-transformation.service.ts # Transaction processing
│   │   │       └── payments.module.ts                       # Payments module configuration
│   │   │
│   │   ├── shared/           # Cross-module utilities
│   │   │   ├── services/
│   │   │   │   ├── dynamic-id-generator.service.ts          # ID generation utilities
│   │   │   │   ├── timestamp.service.ts                     # Timestamp generation
│   │   │   │   ├── file-output.service.ts                   # File writing utilities
│   │   │   │   └── database-transformation.service.ts       # Database transformation utilities
│   │   │   ├── validators/
│   │   │   │   └── database-constraint.validator.ts         # Database validation
│   │   │   └── shared.module.ts                             # Shared module configuration
│   │   │
│   │   ├── common/           # Common application components
│   │   │   ├── controllers/
│   │   │   │   └── simple-transform.controller.ts           # Simple transformation endpoint
│   │   │   ├── dtos/         # Common DTOs
│   │   │   │   ├── pagination.dto.ts                        # Pagination utilities
│   │   │   │   ├── response.dto.ts                          # Standard response format
│   │   │   │   └── coordinate.dto.ts                        # Coordinate data structure
│   │   │   ├── constants/    # Application constants
│   │   │   │   ├── error-codes.ts                           # Error code definitions
│   │   │   │   └── http-status-mapping.ts                   # HTTP status mappings
│   │   │   └── common.module.ts                             # Common module configuration
│   │   │
│   │   ├── core/            # Core infrastructure
│   │   │   ├── config/      # Configuration management
│   │   │   ├── database/    # Database configuration
│   │   │   ├── health/      # Health check endpoints
│   │   │   ├── logger/      # Logging infrastructure
│   │   │   ├── redis/       # Redis client configuration
│   │   │   └── tracing/     # OpenTelemetry tracing
│   │   └── utils/           # Utility functions
│   ├── test/                # E2E tests
│   ├── package.json        # Node.js dependencies
│   └── tsconfig.json       # TypeScript configuration
│
├── tests/                   # Organized test suites and validation scripts
│   ├── integration/         # Integration tests
│   │   ├── test-implementation.js              # Service implementation tests
│   │   ├── test-real-service.js                # NestJS service endpoint tests
│   │   └── test-service-direct.js              # Direct service method tests
│   ├── validation/          # Validation and verification scripts
│   │   ├── compare-outputs.js                  # Output comparison utility
│   │   ├── order-release-validation.js         # Order release validation
│   │   ├── validation-framework.js             # Comprehensive validation
│   │   └── validation-report.js                # Validation reporting
│   ├── utilities/           # Analysis and debugging tools
│   │   ├── analyze-expected.js                 # Output structure analysis
│   │   ├── debug-template.js                   # Template debugging
│   │   ├── field-analysis.js                   # Field mapping analysis
│   │   ├── field-validation.js                 # Field transformation validation
│   │   └── additional-tests.sh                 # Additional utilities
│   ├── outputs/             # Test results and generated files
│   │   ├── test-output*.json                   # Test output files
│   │   ├── validation-summary.txt              # Validation summaries
│   │   └── TASK_4_IMPLEMENTATION_COMPLETE.json # Task completion records
│   ├── run-all-tests.sh     # Complete test suite runner
│   ├── run-integration-tests.sh # Integration test runner
│   ├── run-validation-tests.sh  # Validation test runner
│   ├── run-utilities.sh     # Utilities runner
│   ├── README.md           # Test organization documentation
│   └── TEST_INDEX.md       # Complete test index and guide
│
├── data/                   # Static data and configurations
│   ├── mappings/           # Field mapping configurations
│   ├── samples/            # Sample input/output files
│   │   ├── cancel_fully.json                    # Cancel service template
│   │   ├── cancel_byline.MD                     # Cancel documentation
│   │   └── sample_input.json                    # Sample transformation input
│   └── models/             # Data models and diagrams
│
├── docs/                   # Documentation
│   ├── implement-guide.MD  # Implementation guide
│   └── sequence-diagram.md # Service interaction diagrams
│
├── analysis/               # Analysis and development tools
│   └── precision-tools/    # Analysis and visualization tools
│       ├── mapping-visualization.js             # Data flow visualization
│       └── cancel-service-dependencies.js       # Service dependency analysis
│
├── release/                # Transformation output files
│   ├── 311647613-C7LXT7KBTPA3TN-Rel.json       # Source release file
│   └── complete-3735-line-cancel-with-fixed-noteids.json # Cancel output
│
├── migrations/            # Database migration files
│   └── 20250818000001-add-cancel-fields.js
│
└── [configuration files]       # Project configuration
    ├── package.json                            # Project dependencies
    └── tsconfig.json                           # TypeScript configuration
```

## Key Components

### Modular Architecture

#### Feature Modules
1. **OrdersModule** (`app/src/modules/orders/`)
   - **Controllers**: Cancel order endpoint
   - **Services**: Order transformation, cancellation, line processing, orchestration
   - **Entities**: Order, OrderLine, Allocation (Sequelize)
   - **DTOs**: Cancel request structures

2. **ReleasesModule** (`app/src/modules/releases/`)
   - **Controllers**: Release transformation endpoint
   - **Services**: Database-based release transformation, release logic
   - **Mappers**: Release line, payment, allocation, address mapping
   - **DTOs**: Release order and message structures

3. **TransformationsModule** (`app/src/modules/transformations/`)
   - **Services**: Business rules, calculations, field mapping utilities
   - **Purpose**: Shared transformation logic across domains

4. **PaymentsModule** (`app/src/modules/payments/`)
   - **Services**: Payment transformation, method processing, transaction handling
   - **Purpose**: Payment-specific business logic

5. **SharedModule** (`app/src/shared/`)
   - **Services**: ID generation, timestamps, file output, database utilities
   - **Validators**: Database constraint validation
   - **Purpose**: Cross-cutting utilities

### MAO Cancel Service

**Primary Service**: `app/src/modules/orders/services/order-cancellation.service.ts`
- Complete order cancellation service with template precision
- Located in OrdersModule following domain-driven design
- Features item-specific NoteId generation and user consistency
- Output: `release/complete-3735-line-cancel-with-fixed-noteids.json`

**Supporting Services**:
- `modules/orders/services/file-based-order-repository.service.ts` - Order data access
- `modules/transformations/services/cancel-field-mapping.service.ts` - Field mapping
- `shared/services/timestamp.service.ts` - Timestamp utilities

### Architecture Features
- **Modular Design**: Feature-based modules with clear boundaries
- **Domain-Driven Organization**: Services grouped by business domain
- **Clean Dependencies**: Clear module boundaries and imports
- **Scalability**: Independent feature development capability

### Data Flows

#### Data Flows

**Cancel Service Flow**:
```
Release File → File Repository → Field Mapping → Cancel Response
```

**Standard Transform Flow**:
```
PMP Input → Validation → Domain Services → Release Output
```

### Configuration
- Environment configs: `app/src/core/config/`
- Field mappings: `data/mappings/`
- Sample data: `data/samples/`
- Templates: `data/samples/cancel_fully.json`



## Development Guidelines

### Module-Based Development
1. **Feature Modules**: Add new functionality to appropriate domain modules
   - **Orders**: Order-related logic → `modules/orders/`
   - **Releases**: Release transformation → `modules/releases/`
   - **Payments**: Payment processing → `modules/payments/`
   - **Transformations**: Shared utilities → `modules/transformations/`
   - **Cross-cutting**: Utilities → `shared/`

2. **Service Organization**: Follow domain-driven design principles
   - Keep services within their business domain
   - Use SharedModule for cross-cutting utilities
   - Avoid circular dependencies between modules

3. **Module Structure**: Follow established patterns
   ```
   module-name/
   ├── controllers/          # REST endpoints
   ├── services/            # Business logic
   ├── entities/           # Database models (if needed)
   ├── dtos/               # Data transfer objects
   ├── mappers/            # Data mapping (if needed)
   └── module-name.module.ts # Module configuration
   ```

4. **Testing**: Place tests in `/tests` subdirectories
5. **Documentation**: Update docs when making changes  
6. **Clean Code**: Follow NestJS and TypeScript standards
7. **Dependencies**: Import modules, not individual services

## Quick Start

```bash
cd app/
pnpm install
pnpm run start:dev
```

**Development Commands:**
- `pnpm run start:dev` - Development server with hot reload
- `pnpm run build` - Production build
- `pnpm run test` - Run unit tests
- `pnpm run lint` - Code quality check

## Testing & Validation

### Application Tests
```bash
cd app/

# Unit tests
pnpm run test

# E2E tests  
pnpm run test:e2e

# Code quality
pnpm run lint
```

### Organized Test Suite
**Complete Test Suite:**
```bash
# Run all tests
bash tests/run-all-tests.sh
```

**Individual Test Categories:**
```bash
# Integration tests (service functionality)
bash tests/run-integration-tests.sh

# Validation tests (output verification)
bash tests/run-validation-tests.sh

# Analysis utilities (debugging & analysis)
bash tests/run-utilities.sh
```

**Specific Test Scripts:**
```bash
# Integration testing
node tests/integration/test-real-service.js
node tests/integration/test-implementation.js

# Output validation
node tests/validation/compare-outputs.js
node tests/validation/validation-framework.js

# Field analysis
node tests/utilities/field-analysis.js
node tests/utilities/debug-template.js
```

### Test Documentation
- `tests/README.md` - Test organization guide
- `tests/TEST_INDEX.md` - Complete test index
- Results stored in `tests/outputs/`

### Development Workflow

1. **Create/Modify Services**: Follow modular patterns in appropriate domain
2. **Type Safety**: Ensure TypeScript compilation passes
3. **Testing**: Write unit tests and validate integration
4. **Code Quality**: Run linting and formatting
5. **Documentation**: Update relevant documentation

## Production Readiness Checklist
- [ ] Service compiles without TypeScript errors
- [ ] Generates expected output format
- [ ] Passes all validation tests
- [ ] Follows NestJS best practices
- [ ] Has comprehensive error handling
- [ ] Documentation updated