## What we want done
1. Create the next.js file release-create-order.dto.ts
2. When input payload format: /Users/chongraktanaka/oms-mapping/PMP-ordercreation.md
    Then tranform the data to this: /Users/chongraktanaka/oms-mapping/Release-msg.md



## Context file
- Mapping: /oms-mapping/output/corrected_field_mapping.csv


## Expected result
Save: /oms-mapping/release
Format: orderid{XXXXX}.json

---

## Test script
- Create test script location: test-script folder
- the script will compare result from /release/orderid403521240-C7LDVZNUTGAHMA.json compare to /Users/chongraktanaka/oms-mapping/simple-test.js

## Feedback result
- Short Feedback: Result {Pass, Fail}
- All the result should exactly the same as /oms-mapping/sample_order.json
- If result not match then feedback what is missing?
- suggest to fix

---

## What we want you to do
-   Base on analysis result here:/Users/chongraktanaka/oms-mappi
  ng/order-management-analysis.md
    Update -> /Users/chongraktanaka/oms-mapping/release-create-order.dto.ts

## context
- /Users/chongraktanaka/oms-mapping/data model/order-management-class-diagram.puml
## output
release-create-order.dto.ts should update baes on the data model