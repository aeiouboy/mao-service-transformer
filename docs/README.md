# MAO Service Transformer

Manhattan Active® Omni (MAO) Order Management System transformation service built with NestJS.

## 🏗️ Project Structure

```
mao-service-transformer/
├── 📋 tasks/                    # Task management & planning
│   ├── planning/               # Task definitions, specs, action plans
│   └── analysis/               # Field analysis and reports
├── 🏗️ app/                     # Main NestJS application
├── 📊 data/                    # Data models, mappings & samples
│   ├── mappings/               # CSV field mappings
│   ├── models/                 # Data models (PlantUML)
│   ├── samples/                # Sample JSON files
│   └── output/                 # Generated outputs
├── 🧪 tests/                   # Testing & validation
│   ├── scripts/                # Analysis and comparison scripts
│   ├── transformation/         # Transformation tests
│   └── dto/                    # DTO validation tests
├── 📄 docs/                    # Documentation
├── 🗄️ database/               # Database migrations
└── 📦 infrastructure/          # Build & deployment
    ├── docker/                 # Docker configurations
    └── deployment/             # Kubernetes/deployment configs
```

## 📋 Key Components

### Order Transformation Service
- **Input**: PMP order creation payload
- **Output**: Release message format for OMS
- **Location**: `app/src/common/services/release-order-transformation.service.ts`

### Data Transfer Objects (DTOs)
- **Main DTO**: `app/src/common/dtos/release-create-order.dto.ts`
- **Guide**: `docs/dto-guide.md`

## 🚀 Quick Start

1. **Navigate to app directory**:
   ```bash
   cd app
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the application**:
   ```bash
   pnpm run start:dev
   ```

## 📚 Documentation

- [DTO Implementation Guide](dto-guide.md)
- [PMP Order Creation Format](pmp-order-creation.md)
- [Release Message Format](release-messages.md)

## 🧪 Testing

Run transformation tests:
```bash
# From project root
node tests/transformation/simple-test.js
node tests/dto/test-full-dto.js
```

## 📊 Data Flow

1. **Input**: PMP order payload → `data/samples/sample_input.json`
2. **Mapping**: Field transformations → `data/mappings/corrected_field_mapping.csv`
3. **Transform**: DTO processing → `app/src/common/dtos/release-create-order.dto.ts`
4. **Output**: Release message → `release/orderid{XXXXX}.json`

## 🔧 Development

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Sequelize
- **Testing**: Jest + custom validation scripts
- **Documentation**: Markdown + PlantUML diagrams