# Release Order Creation DTO

## Overview
This TypeScript DTO (Data Transfer Object) transforms PMP order creation payload to Release message format for OMS (Order Management System).

## Files
- `release-create-order.dto.ts` - Main transformation class
- `release/` - Output directory for transformed JSON files

## Usage

```typescript
import { ReleaseOrderDTO, PMPOrderInput } from './release-create-order.dto';

// Load your PMP order data
const pmpOrder: PMPOrderInput = { /* your PMP order data */ };

// Transform and save
const filePath = await ReleaseOrderDTO.saveTransformedOrder(pmpOrder);
console.log(`Transformed file saved to: ${filePath}`);

// Or just transform without saving
const transformed = ReleaseOrderDTO.transform(pmpOrder);
```

## Key Transformations

Based on the field mapping CSV, the DTO performs:

1. **Direct mappings**: Simple field-to-field transfers
2. **Calculations**: 
   - OrderSubtotal = SUM(OrderLine[].Quantity * OrderLine[].UnitPrice)
   - ReleaseTotal = OrderSubtotal + TotalCharges
   - TotalCharges = SUM(non-discount charges)
   - Address hash generation (MD5)
3. **Default values**: System-generated timestamps, IDs, and constants
4. **Complex structures**: Payment details, billing addresses, release lines

## Output Format
- File name: `orderid{XXXXX}.json` where XXXXX is the OrderId
- Location: `/oms-mapping/release/` directory
- Format: JSON matching Release message specification

## Key Features
- Type-safe transformations with TypeScript interfaces
- Automatic ID generation for required fields
- MD5 address hashing
- Timestamp generation with proper formatting
- Error handling and validation
- Product catalog lookup placeholders (for image URIs, brands, descriptions)

## Dependencies
- Node.js built-in modules: `fs`, `path`, `crypto`
- TypeScript for type safety

## Testing
The transformation has been tested with the sample PMP order data and produces the expected Release message structure.