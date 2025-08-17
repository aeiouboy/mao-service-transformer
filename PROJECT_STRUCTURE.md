# MAO Service Transformer - Project Structure

## Overview
NestJS-based microservice for transforming PMP (Pricing & Merchandising Platform) order creation payloads into Release message format for the Order Management System (OMS).

## Project Directory Structure

```
mao-service-transformer/
├── README.md                    # Main project documentation
├── CLAUDE.md                   # Claude Code assistant instructions
├── PROJECT_STRUCTURE.md       # This file - project organization guide
│
├── app/                        # Main NestJS application
│   ├── src/                   # Source code
│   │   ├── common/           # Shared components
│   │   │   ├── controllers/  # REST/GraphQL controllers
│   │   │   ├── dtos/         # Data Transfer Objects
│   │   │   ├── services/     # Business logic services
│   │   │   │   ├── domain/   # Domain-specific services
│   │   │   │   ├── shared/   # Shared utility services
│   │   │   │   └── orchestration/  # Orchestration services
│   │   │   └── constants/    # Application constants
│   │   ├── core/            # Core infrastructure
│   │   │   ├── config/      # Configuration management
│   │   │   ├── database/    # Database configuration
│   │   │   ├── health/      # Health check endpoints
│   │   │   ├── logger/      # Logging infrastructure
│   │   │   ├── redis/       # Redis client configuration
│   │   │   └── tracing/     # OpenTelemetry tracing
│   │   └── utils/           # Utility functions
│   ├── test/                # E2E tests
│   ├── scripts/             # Development scripts
│   │   ├── generators/      # Code generation scripts
│   │   └── debug/          # Debug utilities
│   ├── package.json        # Node.js dependencies
│   └── tsconfig.json       # TypeScript configuration
│
├── tests/                   # Test suites
│   ├── transformation/     # Transformation logic tests
│   ├── dto/                # DTO validation tests
│   ├── scripts/            # Analysis and comparison scripts
│   └── root-tests/         # Organized legacy test files
│
├── data/                   # Static data and configurations
│   ├── mappings/           # Field mapping configurations
│   ├── samples/            # Sample input/output files
│   └── models/             # Data models and diagrams
│
├── docs/                   # Documentation
│   ├── calculations-summary.md
│   ├── dto-guide.md
│   ├── field-mapping.md
│   ├── financial-calculations.md
│   └── transformation-logic.md
│
├── analysis/               # Analysis artifacts
│   ├── field-comparisons/  # Field comparison analysis
│   └── phase2-iteration4-gaps.md
│
├── tasks/                  # Project planning and tracking
│   ├── planning/           # Implementation plans
│   └── analysis/           # Requirements analysis
│
├── release/                # Transformation output files
│   ├── release-output.json
│   └── orderid*.json
│
├── infrastructure/         # Deployment and infrastructure
│   ├── docker/            # Docker configurations
│   └── deployment/        # Kubernetes manifests
│
├── migrations/            # Database migration files
│
└── temp/                 # Temporary files (excluded from git)
```

## Key Components

### Core Services
- **OrderTransformationOrchestratorService**: Main orchestration service
- **Domain Services**: Business logic for specific domains (orders, payments, allocations)
- **Shared Services**: Utility services (calculations, timestamps, business rules)

### Data Flow
```
PMP Input → Validation → Domain Services → Orchestration → Release Output
```

### Configuration
- Environment-specific configs in `app/src/core/config/`
- Field mappings in `data/mappings/`
- Sample data in `data/samples/`

## Development Guidelines

1. **Service Organization**: Follow domain-driven design principles
2. **Testing**: Place tests in appropriate `/tests` subdirectories
3. **Documentation**: Update relevant docs in `/docs` when making changes
4. **Configuration**: Use the centralized config system
5. **Clean Code**: Follow NestJS best practices and TypeScript standards

## Quick Start
```bash
cd app/
pnpm install
pnpm run start:dev
```

## Testing
```bash
# Unit tests
cd app/ && pnpm run test

# Transformation tests
node tests/transformation/simple-test.js
node tests/transformation/test-transformation-comprehensive.js

# DTO validation tests
node tests/dto/test-full-dto.js
```