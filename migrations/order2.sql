/*
 Navicat Premium Dump SQL

 Source Server         : cg-omnia-psql-flex-nonprd.central.co.th
 Source Server Type    : PostgreSQL
 Source Server Version : 170005 (170005)
 Source Host           : cg-omnia-psql-flex-nonprd.central.co.th:5432
 Source Catalog        : Omnia-DEV
 Source Schema         : order

 Target Server Type    : PostgreSQL
 Target Server Version : 170005 (170005)
 File Encoding         : 65001

 Date: 25/08/2025 01:36:50
*/


-- ----------------------------
-- Sequence structure for allocations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."allocations_id_seq";
CREATE SEQUENCE "order"."allocations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."allocations_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for fulfillment_details_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."fulfillment_details_id_seq";
CREATE SEQUENCE "order"."fulfillment_details_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."fulfillment_details_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for order_lines_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."order_lines_id_seq";
CREATE SEQUENCE "order"."order_lines_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."order_lines_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for orders_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."orders_id_seq";
CREATE SEQUENCE "order"."orders_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."orders_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for payment_methods_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."payment_methods_id_seq";
CREATE SEQUENCE "order"."payment_methods_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."payment_methods_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for payment_transactions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."payment_transactions_id_seq";
CREATE SEQUENCE "order"."payment_transactions_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."payment_transactions_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for payments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."payments_id_seq";
CREATE SEQUENCE "order"."payments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."payments_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for quantity_details_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."quantity_details_id_seq";
CREATE SEQUENCE "order"."quantity_details_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."quantity_details_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for release_lines_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."release_lines_id_seq";
CREATE SEQUENCE "order"."release_lines_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."release_lines_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Sequence structure for releases_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "order"."releases_id_seq";
CREATE SEQUENCE "order"."releases_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "order"."releases_id_seq" OWNER TO "omniamgmt";

-- ----------------------------
-- Table structure for SequelizeMeta_order
-- ----------------------------
DROP TABLE IF EXISTS "order"."SequelizeMeta_order";
CREATE TABLE "order"."SequelizeMeta_order" (
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "order"."SequelizeMeta_order" OWNER TO "omniamgmt";

-- ----------------------------
-- Records of SequelizeMeta_order
-- ----------------------------
BEGIN;
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250819000006-create-quantity-details-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821042846-create-orders-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821044002-create-order-lines-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821044837-create-payments-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821045354-create-payment-methods-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821045909-create-payment-transactions-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821050344-create-quantity-details-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821050841-create-allocations-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821051216-create-releases-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821051433-create-release-lines-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821051904-create-fulfillment-details-table.js');
INSERT INTO "order"."SequelizeMeta_order" ("name") VALUES ('20250821071334-create-additional-indexes.js');
COMMIT;

-- ----------------------------
-- Table structure for allocations
-- ----------------------------
DROP TABLE IF EXISTS "order"."allocations";
CREATE TABLE "order"."allocations" (
  "id" int4 NOT NULL DEFAULT nextval('"order".allocations_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "order_line_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "allocation_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "allocation_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ship_from_location_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "org_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "item_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" numeric(18,4) NOT NULL,
  "uom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "carrier_code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "allocated_on" timestamptz(6) NOT NULL,
  "reservation_request_id" varchar(255) COLLATE "pg_catalog"."default",
  "reservation_request_detail_id" varchar(255) COLLATE "pg_catalog"."default",
  "ship_to_location_id" varchar(255) COLLATE "pg_catalog"."default",
  "country_of_origin" varchar(255) COLLATE "pg_catalog"."default",
  "inventory_segment_id" varchar(255) COLLATE "pg_catalog"."default",
  "inventory_type_id" varchar(255) COLLATE "pg_catalog"."default",
  "substitution_type_id" varchar(255) COLLATE "pg_catalog"."default",
  "allocation_dependency_id" varchar(255) COLLATE "pg_catalog"."default",
  "group_id" varchar(255) COLLATE "pg_catalog"."default",
  "product_status_id" varchar(255) COLLATE "pg_catalog"."default",
  "ship_via_id" varchar(255) COLLATE "pg_catalog"."default",
  "asn_id" varchar(255) COLLATE "pg_catalog"."default",
  "asn_detail_id" varchar(255) COLLATE "pg_catalog"."default",
  "service_level_code" varchar(255) COLLATE "pg_catalog"."default",
  "process" varchar(255) COLLATE "pg_catalog"."default",
  "batch_number" varchar(255) COLLATE "pg_catalog"."default",
  "is_virtual" bool,
  "earliest_delivery_date" timestamptz(6),
  "earliest_ship_date" timestamptz(6),
  "committed_delivery_date" timestamptz(6),
  "committed_ship_date" timestamptz(6),
  "latest_ship_date" timestamptz(6),
  "latest_release_date" timestamptz(6),
  "extended" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."allocations" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."allocations"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."allocations"."order_line_id" IS 'Order line identifier';
COMMENT ON COLUMN "order"."allocations"."allocation_id" IS 'Allocation identifier';
COMMENT ON COLUMN "order"."allocations"."allocation_type" IS 'Allocation type';
COMMENT ON COLUMN "order"."allocations"."status_id" IS 'Status identifier';
COMMENT ON COLUMN "order"."allocations"."ship_from_location_id" IS 'Ship from location identifier';
COMMENT ON COLUMN "order"."allocations"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."allocations"."item_id" IS 'Item identifier';
COMMENT ON COLUMN "order"."allocations"."quantity" IS 'Quantity';
COMMENT ON COLUMN "order"."allocations"."uom" IS 'Unit of measure';
COMMENT ON COLUMN "order"."allocations"."carrier_code" IS 'Carrier code';
COMMENT ON COLUMN "order"."allocations"."allocated_on" IS 'Allocation timestamp';
COMMENT ON COLUMN "order"."allocations"."reservation_request_id" IS 'Reservation request ID';
COMMENT ON COLUMN "order"."allocations"."reservation_request_detail_id" IS 'Reservation request detail ID';
COMMENT ON COLUMN "order"."allocations"."ship_to_location_id" IS 'Ship to location identifier';
COMMENT ON COLUMN "order"."allocations"."country_of_origin" IS 'Country of origin';
COMMENT ON COLUMN "order"."allocations"."inventory_segment_id" IS 'Inventory segment ID';
COMMENT ON COLUMN "order"."allocations"."inventory_type_id" IS 'Inventory type ID';
COMMENT ON COLUMN "order"."allocations"."substitution_type_id" IS 'Substitution type ID';
COMMENT ON COLUMN "order"."allocations"."allocation_dependency_id" IS 'Allocation dependency ID';
COMMENT ON COLUMN "order"."allocations"."group_id" IS 'Group ID';
COMMENT ON COLUMN "order"."allocations"."product_status_id" IS 'Product status ID';
COMMENT ON COLUMN "order"."allocations"."ship_via_id" IS 'Ship via ID';
COMMENT ON COLUMN "order"."allocations"."asn_id" IS 'ASN ID';
COMMENT ON COLUMN "order"."allocations"."asn_detail_id" IS 'ASN detail ID';
COMMENT ON COLUMN "order"."allocations"."service_level_code" IS 'Service level code';
COMMENT ON COLUMN "order"."allocations"."process" IS 'Process';
COMMENT ON COLUMN "order"."allocations"."batch_number" IS 'Batch number';
COMMENT ON COLUMN "order"."allocations"."is_virtual" IS 'Is virtual flag';
COMMENT ON COLUMN "order"."allocations"."earliest_delivery_date" IS 'Earliest delivery date';
COMMENT ON COLUMN "order"."allocations"."earliest_ship_date" IS 'Earliest ship date';
COMMENT ON COLUMN "order"."allocations"."committed_delivery_date" IS 'Committed delivery date';
COMMENT ON COLUMN "order"."allocations"."committed_ship_date" IS 'Committed ship date';
COMMENT ON COLUMN "order"."allocations"."latest_ship_date" IS 'Latest ship date';
COMMENT ON COLUMN "order"."allocations"."latest_release_date" IS 'Latest release date';
COMMENT ON COLUMN "order"."allocations"."extended" IS 'Extended information in JSON format';
COMMENT ON COLUMN "order"."allocations"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."allocations"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."allocations"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."allocations"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of allocations
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for fulfillment_details
-- ----------------------------
DROP TABLE IF EXISTS "order"."fulfillment_details";
CREATE TABLE "order"."fulfillment_details" (
  "id" int4 NOT NULL DEFAULT nextval('"order".fulfillment_details_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default",
  "order_line_id" varchar(255) COLLATE "pg_catalog"."default",
  "release_id" varchar(255) COLLATE "pg_catalog"."default",
  "release_line_id" varchar(255) COLLATE "pg_catalog"."default",
  "fulfillment_id" varchar(255) COLLATE "pg_catalog"."default",
  "fulfillment_group_id" varchar(255) COLLATE "pg_catalog"."default",
  "event_type_id" varchar(255) COLLATE "pg_catalog"."default",
  "item_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" numeric(18,4) NOT NULL,
  "uom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "short_reason_id" varchar(255) COLLATE "pg_catalog"."default",
  "fulfillment_info" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."fulfillment_details" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."fulfillment_details"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."order_line_id" IS 'Order line identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."release_id" IS 'Release identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."release_line_id" IS 'Release line identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."fulfillment_id" IS 'Fulfillment identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."fulfillment_group_id" IS 'Fulfillment group identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."event_type_id" IS 'Event type identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."item_id" IS 'Item identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."quantity" IS 'Quantity';
COMMENT ON COLUMN "order"."fulfillment_details"."uom" IS 'Unit of measure';
COMMENT ON COLUMN "order"."fulfillment_details"."status_id" IS 'Status identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."short_reason_id" IS 'Short reason identifier';
COMMENT ON COLUMN "order"."fulfillment_details"."fulfillment_info" IS 'Fulfillment information';
COMMENT ON COLUMN "order"."fulfillment_details"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."fulfillment_details"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."fulfillment_details"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."fulfillment_details"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of fulfillment_details
-- ----------------------------
BEGIN;
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', 'F-001', 'GROUP_001', 'Ship', 'TEST_ITEM_001', 3.0000, 'PCS', '7000', '', '{"PackageId": "PKG-001", "ShipmentId": "SHIP-001", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-001", "FulfillmentId": "F-001", "TrackingNumber": "TRACK-001", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-001"}', '2025-08-24 15:24:55.043+00', '2025-08-24 15:24:55.043+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', '', 'GROUP_001', 'Short', 'TEST_ITEM_001', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:25:52.858+00', '2025-08-24 15:25:52.858+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', '', 'GROUP_001', 'Short', 'TEST_ITEM_001', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:26:01.831+00', '2025-08-24 15:26:01.831+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', 'F-001', 'GROUP_001', 'Ship', 'TEST_ITEM_001', 2.0000, 'PCS', '7000', '', '{"PackageId": "PKG-001", "ShipmentId": "SHIP-001", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-001", "FulfillmentId": "F-001", "TrackingNumber": "TRACK-001", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-001"}', '2025-08-24 15:26:29.563+00', '2025-08-24 15:26:29.563+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'FULFILLMENT-3600', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3600', '', '{}', '2025-08-24 15:27:58.191+00', '2025-08-24 15:27:58.191+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'FULFILLMENT-3600', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3500', '', '{}', '2025-08-24 15:37:39.145+00', '2025-08-24 15:37:39.145+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'FULFILLMENT-3700', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3700', '', '{}', '2025-08-24 15:37:47.153+00', '2025-08-24 15:37:47.153+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'F123', 'GROUP_002', 'Ship', 'TEST_ITEM_002', 1.0000, 'PCS', '7000', '', '{"PackageId": "PKG001", "ShipmentId": "SHIP123", "CarrierCode": "KERRY", "TrackingURL": "https://tracking.com/track/123", "FulfillmentId": "F123", "TrackingNumber": "TRACK1234567", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD123"}', '2025-08-24 15:37:52.761+00', '2025-08-24 15:37:52.761+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (9, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:38:01.444+00', '2025-08-24 15:38:01.444+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (10, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'FULFILLMENT-3600', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 3.0000, 'PCS', '3500', '', '{}', '2025-08-24 15:38:08.218+00', '2025-08-24 15:38:08.218+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (11, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'FULFILLMENT-3600', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3600', '', '{}', '2025-08-24 15:38:18.161+00', '2025-08-24 15:38:18.161+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (12, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'FULFILLMENT-3600', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3700', '', '{}', '2025-08-24 15:38:24.386+00', '2025-08-24 15:38:24.386+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (13, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:38:35.25+00', '2025-08-24 15:38:35.25+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (14, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 2.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:38:45.562+00', '2025-08-24 15:38:45.562+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (15, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', 'F-003', 'GROUP_003', 'Ship', 'TEST_ITEM_003', 5.0000, 'PCS', '7000', '', '{"PackageId": "PKG-003", "ShipmentId": "SHIP-003", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-003", "FulfillmentId": "F-003", "TrackingNumber": "TRACK-003", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-003"}', '2025-08-24 15:40:53.015+00', '2025-08-24 15:40:53.015+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (16, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', '', 'GROUP_003', 'Short', 'TEST_ITEM_003', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:41:06.578+00', '2025-08-24 15:41:06.578+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (17, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', '', 'GROUP_003', 'Short', 'TEST_ITEM_003', 2.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:41:07.712+00', '2025-08-24 15:41:07.712+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (18, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', '', 'GROUP_003', 'Short', 'TEST_ITEM_003', 2.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 15:41:10.97+00', '2025-08-24 15:41:10.97+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (19, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'FULFILLMENT-3600', 'GROUP_004', 'StatusUpdate', 'TEST_ITEM_004', 5.0000, 'PCS', '3500', '', '{}', '2025-08-24 16:08:35.625+00', '2025-08-24 16:08:35.625+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (20, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'FULFILLMENT-3600', 'GROUP_004', 'StatusUpdate', 'TEST_ITEM_004', 5.0000, 'PCS', '3600', '', '{}', '2025-08-24 16:08:43.642+00', '2025-08-24 16:08:43.642+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (21, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'FULFILLMENT-3600', 'GROUP_004', 'StatusUpdate', 'TEST_ITEM_004', 5.0000, 'PCS', '3700', '', '{}', '2025-08-24 16:08:52.482+00', '2025-08-24 16:08:52.482+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (22, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'F-004', 'GROUP_004', 'Ship', 'TEST_ITEM_004', 5.0000, 'PCS', '7000', '', '{"PackageId": "PKG-004", "ShipmentId": "SHIP-004", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-004", "FulfillmentId": "F-004", "TrackingNumber": "TRACK-004", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-004"}', '2025-08-24 16:08:57.052+00', '2025-08-24 16:08:57.052+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (23, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'FULFILLMENT-3600', 'GROUP_004', 'StatusUpdate', 'TEST_ITEM_004', 5.0000, 'PCS', '3500', '', '{}', '2025-08-24 16:57:47.051+00', '2025-08-24 16:57:47.051+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (24, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'FULFILLMENT-3600', 'GROUP_004', 'StatusUpdate', 'TEST_ITEM_004', 5.0000, 'PCS', '3600', '', '{}', '2025-08-24 16:57:58.584+00', '2025-08-24 16:57:58.584+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (25, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'FULFILLMENT-3600', 'GROUP_004', 'StatusUpdate', 'TEST_ITEM_004', 5.0000, 'PCS', '3700', '', '{}', '2025-08-24 16:58:09.455+00', '2025-08-24 16:58:09.455+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (26, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', NULL, 'GROUP_004', 'Ship', 'TEST_ITEM_004', 5.0000, 'PCS', '7000', '', '{"PackageId": "PKG-004", "ShipmentId": "SHIP-004", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-004", "TrackingNumber": "TRACK-004", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-004"}', '2025-08-24 17:06:20.598+00', '2025-08-24 17:06:20.598+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (27, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', NULL, 'GROUP_001', 'Ship', 'TEST_ITEM_001', 3.0000, 'PCS', '7000', '', '{"PackageId": "PKG-001", "ShipmentId": "SHIP-001", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-001", "TrackingNumber": "TRACK-001", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-001"}', '2025-08-24 17:07:31.823+00', '2025-08-24 17:07:31.823+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (28, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', '', 'GROUP_001', 'Short', 'TEST_ITEM_001', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:07:49.964+00', '2025-08-24 17:07:49.964+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (29, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', '', 'GROUP_001', 'Short', 'TEST_ITEM_001', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:07:57.138+00', '2025-08-24 17:07:57.138+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (30, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', NULL, 'GROUP_001', 'Ship', 'TEST_ITEM_001', 2.0000, 'PCS', '7000', '', '{"PackageId": "PKG-001", "ShipmentId": "SHIP-001", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-001", "TrackingNumber": "TRACK-001", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-001"}', '2025-08-24 17:08:03.305+00', '2025-08-24 17:08:03.305+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (31, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3500', '', '{}', '2025-08-24 17:09:01.018+00', '2025-08-24 17:09:01.018+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (32, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3700', '', '{}', '2025-08-24 17:09:18.312+00', '2025-08-24 17:09:18.312+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (33, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3500', '', '{}', '2025-08-24 17:10:38.048+00', '2025-08-24 17:10:38.048+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (34, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3700', '', '{}', '2025-08-24 17:10:51.842+00', '2025-08-24 17:10:51.842+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (35, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', NULL, 'GROUP_002', 'Ship', 'TEST_ITEM_002', 1.0000, 'PCS', '7000', '', '{"PackageId": "PKG001", "ShipmentId": "SHIP123", "CarrierCode": "KERRY", "TrackingURL": "https://tracking.com/track/123", "TrackingNumber": "TRACK1234567", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD123"}', '2025-08-24 17:11:12.826+00', '2025-08-24 17:11:12.826+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (36, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:11:31.065+00', '2025-08-24 17:11:31.065+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (37, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 3.0000, 'PCS', '3500', '', '{}', '2025-08-24 17:11:35.797+00', '2025-08-24 17:11:35.797+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (38, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3600', '', '{}', '2025-08-24 17:11:39.254+00', '2025-08-24 17:11:39.254+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (39, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3600', '', '{}', '2025-08-24 17:11:45.45+00', '2025-08-24 17:11:45.45+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (40, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3600', '', '{}', '2025-08-24 17:12:03.375+00', '2025-08-24 17:12:03.375+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (41, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3600', '', '{}', '2025-08-24 17:12:13.044+00', '2025-08-24 17:12:13.044+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (42, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3700', '', '{}', '2025-08-24 17:12:30.295+00', '2025-08-24 17:12:30.295+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (43, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3500', '', '{}', '2025-08-24 17:13:20.227+00', '2025-08-24 17:13:20.227+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (44, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3700', '', '{}', '2025-08-24 17:13:28.382+00', '2025-08-24 17:13:28.382+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (45, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', NULL, 'GROUP_002', 'Ship', 'TEST_ITEM_002', 1.0000, 'PCS', '7000', '', '{"PackageId": "PKG001", "ShipmentId": "SHIP123", "CarrierCode": "KERRY", "TrackingURL": "https://tracking.com/track/123", "TrackingNumber": "TRACK1234567", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD123"}', '2025-08-24 17:13:34.85+00', '2025-08-24 17:13:34.85+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (46, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:13:45.387+00', '2025-08-24 17:13:45.387+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (47, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 3.0000, 'PCS', '3500', '', '{}', '2025-08-24 17:13:58.952+00', '2025-08-24 17:13:58.952+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (48, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 1.0000, 'PCS', '3600', '', '{}', '2025-08-24 17:14:07.457+00', '2025-08-24 17:14:07.457+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (49, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'StatusUpdate', 'TEST_ITEM_002', 2.0000, 'PCS', '3700', '', '{}', '2025-08-24 17:14:19.324+00', '2025-08-24 17:14:19.324+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (50, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:14:31.656+00', '2025-08-24 17:14:31.656+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (51, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', '', 'GROUP_002', 'Short', 'TEST_ITEM_002', 2.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:14:38.095+00', '2025-08-24 17:14:38.095+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (52, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', NULL, 'GROUP_003', 'Ship', 'TEST_ITEM_003', 5.0000, 'PCS', '7000', '', '{"PackageId": "PKG-003", "ShipmentId": "SHIP-003", "CarrierCode": "FLASH", "TrackingURL": "https://track.test/SHIP-003", "TrackingNumber": "TRACK-003", "ServiceLevelCode": "STANDARD", "FulfillmentDetailId": "FD-003"}', '2025-08-24 17:16:09.536+00', '2025-08-24 17:16:09.536+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (53, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', '', 'GROUP_003', 'Short', 'TEST_ITEM_003', 1.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:16:17.824+00', '2025-08-24 17:16:17.824+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (54, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', '', 'GROUP_003', 'Short', 'TEST_ITEM_003', 2.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:16:26.129+00', '2025-08-24 17:16:26.129+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (55, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', '', 'GROUP_003', 'Short', 'TEST_ITEM_003', 2.0000, 'PCS', '9000', 'OutOfStock', '{}', '2025-08-24 17:16:34.264+00', '2025-08-24 17:16:34.264+00', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for order_lines
-- ----------------------------
DROP TABLE IF EXISTS "order"."order_lines";
CREATE TABLE "order"."order_lines" (
  "id" int4 NOT NULL DEFAULT nextval('"order".order_lines_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "order_line_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "release_group_id" varchar(255) COLLATE "pg_catalog"."default",
  "shipping_method_id" varchar(255) COLLATE "pg_catalog"."default",
  "fulfillment_group_id" varchar(255) COLLATE "pg_catalog"."default",
  "max_fulfillment_status_id" varchar(255) COLLATE "pg_catalog"."default",
  "min_fulfillment_status_id" varchar(255) COLLATE "pg_catalog"."default",
  "ship_to_location_id" varchar(255) COLLATE "pg_catalog"."default",
  "ship_from_address_id" varchar(255) COLLATE "pg_catalog"."default",
  "item_id" varchar(255) COLLATE "pg_catalog"."default",
  "item_description" text COLLATE "pg_catalog"."default",
  "is_gift" bool,
  "is_tax_included" bool,
  "is_pre_order" bool,
  "is_cancelled" bool,
  "promised_delivery_date" timestamptz(6),
  "small_image_uri" varchar(255) COLLATE "pg_catalog"."default",
  "uom" varchar(255) COLLATE "pg_catalog"."default",
  "quantity" numeric(18,4),
  "unit_price" numeric(18,4),
  "original_unit_price" numeric(18,4),
  "order_line_sub_total" numeric(18,4),
  "order_line_total" numeric(18,4),
  "order_line_tax_total" numeric(18,4),
  "max_appeasement_amount" numeric(18,4),
  "total_discount_on_item" numeric(18,4),
  "total_discounts" numeric(18,4),
  "total_charges" numeric(18,4),
  "cancelled_order_line_sub_total" numeric(18,4),
  "cancelled_total_discounts" numeric(18,4),
  "fulfillment_status" varchar(255) COLLATE "pg_catalog"."default",
  "order_line_status" varchar(255) COLLATE "pg_catalog"."default",
  "delivery_method" jsonb,
  "order_line_note" jsonb,
  "order_line_charge_detail" jsonb,
  "order_line_tax_detail" jsonb,
  "order_line_promising_info" jsonb,
  "ship_to_address" jsonb,
  "order_line_extension1" jsonb,
  "change_log" jsonb,
  "parent_id" int4,
  "version" int4 NOT NULL DEFAULT 1,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."order_lines" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."order_lines"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."order_lines"."order_line_id" IS 'Order line identifier';
COMMENT ON COLUMN "order"."order_lines"."release_group_id" IS 'Release group identifier';
COMMENT ON COLUMN "order"."order_lines"."shipping_method_id" IS 'Shipping method identifier';
COMMENT ON COLUMN "order"."order_lines"."fulfillment_group_id" IS 'Fulfillment group identifier';
COMMENT ON COLUMN "order"."order_lines"."max_fulfillment_status_id" IS 'Maximum fulfillment status identifier';
COMMENT ON COLUMN "order"."order_lines"."min_fulfillment_status_id" IS 'Minimum fulfillment status identifier';
COMMENT ON COLUMN "order"."order_lines"."ship_to_location_id" IS 'Ship to location identifier';
COMMENT ON COLUMN "order"."order_lines"."ship_from_address_id" IS 'Ship from address identifier';
COMMENT ON COLUMN "order"."order_lines"."item_id" IS 'Item identifier';
COMMENT ON COLUMN "order"."order_lines"."item_description" IS 'Item description';
COMMENT ON COLUMN "order"."order_lines"."is_gift" IS 'Is gift flag';
COMMENT ON COLUMN "order"."order_lines"."is_tax_included" IS 'Is tax included flag';
COMMENT ON COLUMN "order"."order_lines"."is_pre_order" IS 'Is pre-order flag';
COMMENT ON COLUMN "order"."order_lines"."is_cancelled" IS 'Is cancelled flag';
COMMENT ON COLUMN "order"."order_lines"."promised_delivery_date" IS 'Promised delivery date';
COMMENT ON COLUMN "order"."order_lines"."small_image_uri" IS 'Small image URI';
COMMENT ON COLUMN "order"."order_lines"."uom" IS 'Unit of measure';
COMMENT ON COLUMN "order"."order_lines"."quantity" IS 'Quantity';
COMMENT ON COLUMN "order"."order_lines"."unit_price" IS 'Unit price';
COMMENT ON COLUMN "order"."order_lines"."original_unit_price" IS 'Original unit price';
COMMENT ON COLUMN "order"."order_lines"."order_line_sub_total" IS 'Order line subtotal';
COMMENT ON COLUMN "order"."order_lines"."order_line_total" IS 'Order line total';
COMMENT ON COLUMN "order"."order_lines"."order_line_tax_total" IS 'Order line tax total';
COMMENT ON COLUMN "order"."order_lines"."max_appeasement_amount" IS 'Maximum appeasement amount';
COMMENT ON COLUMN "order"."order_lines"."total_discount_on_item" IS 'Total discount on item';
COMMENT ON COLUMN "order"."order_lines"."total_discounts" IS 'Total discounts';
COMMENT ON COLUMN "order"."order_lines"."total_charges" IS 'Total charges';
COMMENT ON COLUMN "order"."order_lines"."cancelled_order_line_sub_total" IS 'Cancelled order line subtotal';
COMMENT ON COLUMN "order"."order_lines"."cancelled_total_discounts" IS 'Cancelled total discounts';
COMMENT ON COLUMN "order"."order_lines"."fulfillment_status" IS 'Fulfillment status';
COMMENT ON COLUMN "order"."order_lines"."order_line_status" IS 'Order line status';
COMMENT ON COLUMN "order"."order_lines"."delivery_method" IS 'Delivery method in JSON format';
COMMENT ON COLUMN "order"."order_lines"."order_line_note" IS 'Order line note in JSON format';
COMMENT ON COLUMN "order"."order_lines"."order_line_charge_detail" IS 'Order line charge detail in JSON format';
COMMENT ON COLUMN "order"."order_lines"."order_line_tax_detail" IS 'Order line tax detail in JSON format';
COMMENT ON COLUMN "order"."order_lines"."order_line_promising_info" IS 'Order line promising info in JSON format';
COMMENT ON COLUMN "order"."order_lines"."ship_to_address" IS 'Ship to address in JSON format';
COMMENT ON COLUMN "order"."order_lines"."order_line_extension1" IS 'Order line extension 1 in JSON format';
COMMENT ON COLUMN "order"."order_lines"."change_log" IS 'Change log history in JSON format';
COMMENT ON COLUMN "order"."order_lines"."parent_id" IS 'Parent order line ID';
COMMENT ON COLUMN "order"."order_lines"."version" IS 'Version number';
COMMENT ON COLUMN "order"."order_lines"."is_active" IS 'Is active flag';
COMMENT ON COLUMN "order"."order_lines"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."order_lines"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."order_lines"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."order_lines"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of order_lines
-- ----------------------------
BEGIN;
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, 'a1-123456789-C7L2LRMHV2KWT1', '000-0-0', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/0000093362986_01.jpg', 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 31.0000, 2.6800, NULL, 10.0000, 10.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-000-0", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿20 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-24 15:04:26.297+00', '2025-08-24 15:04:26.297+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, 'a1-123456789-C7L2LRMHV2KWT1', '001-1-1', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/0000093362986_01.jpg', 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 31.0000, 2.6800, NULL, 10.0000, 10.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-001-1", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿20 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-24 15:04:26.297+00', '2025-08-24 15:04:26.297+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, 'a1-123456789-C7L2LRMHV2KWT1', '002-2-2', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '4901133618567', 'เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/4901133618567_01.jpg', 'SPCS', 1.0000, 17.0000, 17.0000, 17.0000, 17.0000, 1.1100, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 1.11, "TaxTypeId": "VAT", "TaxableAmount": 15.88, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "ProductNameTH": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-24 15:04:26.297+00', '2025-08-24 15:04:26.297+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, 'a1-123456789-C7L2LRMHV2KWT1', '003-3-3', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/8850124003850_01_2024030316335106.jpg', 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R05_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-24 15:04:26.297+00', '2025-08-24 15:04:26.297+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, 'a1-123456789-C7L2LRMHV2KWT1', '004-4-4', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/8850124003850_01_2024030316335106.jpg', 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R06_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-24 15:04:26.297+00', '2025-08-24 15:04:26.297+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (18, '1-123456789-C7L2LRMHV2KWT2', '000-0-0', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/0000093362986_01.jpg', 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 31.0000, 2.6800, NULL, 10.0000, 10.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-000-0", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿20 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-24 15:45:12.678+00', '2025-08-24 15:45:12.678+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (19, '1-123456789-C7L2LRMHV2KWT2', '001-1-1', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/0000093362986_01.jpg', 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 31.0000, 2.6800, NULL, 10.0000, 10.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-001-1", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿20 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-24 15:45:12.678+00', '2025-08-24 15:45:12.678+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (20, '1-123456789-C7L2LRMHV2KWT2', '002-2-2', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '4901133618567', 'เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/4901133618567_01.jpg', 'SPCS', 1.0000, 17.0000, 17.0000, 17.0000, 17.0000, 1.1100, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 1.11, "TaxTypeId": "VAT", "TaxableAmount": 15.88, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "ProductNameTH": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-24 15:45:12.678+00', '2025-08-24 15:45:12.678+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (21, '1-123456789-C7L2LRMHV2KWT2', '003-3-3', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/8850124003850_01_2024030316335106.jpg', 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R05_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-24 15:45:12.678+00', '2025-08-24 15:45:12.678+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (22, '1-123456789-C7L2LRMHV2KWT2', '004-4-4', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, 'https://cgcmsstcontentprd.blob.core.windows.net/product-pmp/cfg/8850124003850_01_2024030316335106.jpg', 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R06_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-24 15:45:12.678+00', '2025-08-24 15:45:12.678+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (35, 'TEST_ORDER_STATUS_001', 'LINE_001', NULL, NULL, 'GROUP_001', '3000', '3000', NULL, NULL, 'TEST_ITEM_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PCS', 5.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (38, 'TEST_ORDER_STATUS_004', 'LINE_004', NULL, NULL, 'GROUP_004', '3000', '3000', NULL, NULL, 'TEST_ITEM_004', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PCS', 5.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (37, 'TEST_ORDER_STATUS_003', 'LINE_003', NULL, NULL, 'GROUP_003', '9000', '9000', NULL, NULL, 'TEST_ITEM_003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PCS', 5.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cancelled', 'Cancelled', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:35.052+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (36, 'TEST_ORDER_STATUS_002', 'LINE_002', NULL, NULL, 'GROUP_002', '7000', '7000', NULL, NULL, 'TEST_ITEM_002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'PCS', 5.0000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Fulfilled', 'Fulfilled', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:10.896+00', '2025-08-24 17:14:38.81+00', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "order"."orders";
CREATE TABLE "order"."orders" (
  "id" int4 NOT NULL DEFAULT nextval('"order".orders_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "short_order_number" varchar(255) COLLATE "pg_catalog"."default",
  "customer_type_id" varchar(255) COLLATE "pg_catalog"."default",
  "customer_id" varchar(255) COLLATE "pg_catalog"."default",
  "customer_email" varchar(255) COLLATE "pg_catalog"."default",
  "customer_first_name" varchar(255) COLLATE "pg_catalog"."default",
  "customer_last_name" varchar(255) COLLATE "pg_catalog"."default",
  "customer_phone" varchar(255) COLLATE "pg_catalog"."default",
  "currency_code" varchar(255) COLLATE "pg_catalog"."default",
  "selling_channel" varchar(255) COLLATE "pg_catalog"."default",
  "org_id" varchar(255) COLLATE "pg_catalog"."default",
  "alternate_order_id" varchar(255) COLLATE "pg_catalog"."default",
  "max_fulfillment_status_id" varchar(255) COLLATE "pg_catalog"."default",
  "min_fulfillment_status_id" varchar(255) COLLATE "pg_catalog"."default",
  "order_sub_total" numeric(18,4),
  "order_total" numeric(18,4),
  "total_charges" numeric(18,4),
  "total_discounts" numeric(18,4),
  "total_taxes" numeric(18,4),
  "cancelled_order_sub_total" numeric(18,4),
  "is_on_hold" bool,
  "cancel_allowed" bool,
  "is_cancelled" bool,
  "order_locale" varchar(255) COLLATE "pg_catalog"."default",
  "order_status" varchar(255) COLLATE "pg_catalog"."default",
  "fulfillment_status" varchar(255) COLLATE "pg_catalog"."default",
  "payment_status" varchar(255) COLLATE "pg_catalog"."default",
  "do_not_release_before" timestamptz(6),
  "captured_date" timestamptz(6),
  "doc_type" jsonb,
  "order_hold" jsonb,
  "order_actions" jsonb,
  "order_extension1" jsonb,
  "order_charge_detail" jsonb,
  "order_tax_detail" jsonb,
  "order_type" jsonb,
  "order_note" jsonb,
  "cancel_reason" jsonb,
  "change_log" jsonb,
  "parent_id" int4,
  "version" int4 NOT NULL DEFAULT 1,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."orders" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."orders"."order_id" IS 'Business order identifier';
COMMENT ON COLUMN "order"."orders"."short_order_number" IS 'Short order number';
COMMENT ON COLUMN "order"."orders"."customer_type_id" IS 'Customer type identifier';
COMMENT ON COLUMN "order"."orders"."customer_id" IS 'Customer identifier';
COMMENT ON COLUMN "order"."orders"."customer_email" IS 'Customer email address';
COMMENT ON COLUMN "order"."orders"."customer_first_name" IS 'Customer first name';
COMMENT ON COLUMN "order"."orders"."customer_last_name" IS 'Customer last name';
COMMENT ON COLUMN "order"."orders"."customer_phone" IS 'Customer phone number';
COMMENT ON COLUMN "order"."orders"."currency_code" IS 'Currency code';
COMMENT ON COLUMN "order"."orders"."selling_channel" IS 'Selling channel';
COMMENT ON COLUMN "order"."orders"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."orders"."alternate_order_id" IS 'Alternate order identifier';
COMMENT ON COLUMN "order"."orders"."max_fulfillment_status_id" IS 'Maximum fulfillment status identifier';
COMMENT ON COLUMN "order"."orders"."min_fulfillment_status_id" IS 'Minimum fulfillment status identifier';
COMMENT ON COLUMN "order"."orders"."order_sub_total" IS 'Order subtotal amount';
COMMENT ON COLUMN "order"."orders"."order_total" IS 'Order total amount';
COMMENT ON COLUMN "order"."orders"."total_charges" IS 'Total charges amount';
COMMENT ON COLUMN "order"."orders"."total_discounts" IS 'Total discounts amount';
COMMENT ON COLUMN "order"."orders"."total_taxes" IS 'Total taxes amount';
COMMENT ON COLUMN "order"."orders"."cancelled_order_sub_total" IS 'Cancelled order subtotal amount';
COMMENT ON COLUMN "order"."orders"."is_on_hold" IS 'Order is on hold flag';
COMMENT ON COLUMN "order"."orders"."cancel_allowed" IS 'Cancel allowed flag';
COMMENT ON COLUMN "order"."orders"."is_cancelled" IS 'Order is cancelled flag';
COMMENT ON COLUMN "order"."orders"."order_locale" IS 'Order locale';
COMMENT ON COLUMN "order"."orders"."order_status" IS 'Order status';
COMMENT ON COLUMN "order"."orders"."fulfillment_status" IS 'Fulfillment status';
COMMENT ON COLUMN "order"."orders"."payment_status" IS 'Payment status';
COMMENT ON COLUMN "order"."orders"."do_not_release_before" IS 'Do not release before timestamp';
COMMENT ON COLUMN "order"."orders"."captured_date" IS 'Captured date timestamp';
COMMENT ON COLUMN "order"."orders"."doc_type" IS 'Document type in JSON format';
COMMENT ON COLUMN "order"."orders"."order_hold" IS 'Order hold information in JSON format';
COMMENT ON COLUMN "order"."orders"."order_actions" IS 'Order actions in JSON format';
COMMENT ON COLUMN "order"."orders"."order_extension1" IS 'Order extension 1 in JSON format';
COMMENT ON COLUMN "order"."orders"."order_charge_detail" IS 'Order charge detail in JSON format';
COMMENT ON COLUMN "order"."orders"."order_tax_detail" IS 'Order tax detail in JSON format';
COMMENT ON COLUMN "order"."orders"."order_type" IS 'Order type in JSON format';
COMMENT ON COLUMN "order"."orders"."order_note" IS 'Order note in JSON format';
COMMENT ON COLUMN "order"."orders"."cancel_reason" IS 'Cancel reason in JSON format';
COMMENT ON COLUMN "order"."orders"."change_log" IS 'Change log history in JSON format';
COMMENT ON COLUMN "order"."orders"."parent_id" IS 'Parent order ID';
COMMENT ON COLUMN "order"."orders"."version" IS 'Version number';
COMMENT ON COLUMN "order"."orders"."is_active" IS 'Is active flag';
COMMENT ON COLUMN "order"."orders"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."orders"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."orders"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."orders"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (28, 'TEST_ORDER_STATUS_001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3000', '3000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 't', NULL, NULL, 'Created', 'Created', 'Unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (15, '1-123456789-C7L2LRMHV2KWT2', 'GF-6271', 'The1Number', '9999', 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFM-UAT', '123456789-C7L2LRMHV2KWT1', '1000', '1000', 238.9200, 229.5700, -10.0000, 0.0000, 0.6500, NULL, 'f', 't', 'f', 'th', 'Awaiting Payment Info', 'Open', 'Awaiting Payment Info', NULL, '2025-08-22 09:12:47+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "CustRef": "2011020007247934", "BranchNo": "", "T1Number": "2011020007247934", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 10, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -20, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.65, "TaxTypeId": "VAT", "TaxableAmount": 9.34, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GF-6271", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-24 15:45:12.368+00', '2025-08-24 15:45:12.851+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, 'a1-123456789-C7L2LRMHV2KWT1', 'GF-6271', 'The1Number', '9999', 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFM-UAT', '123456789-C7L2LRMHV2KWT1', '1000', '1000', 238.9200, 229.5700, -10.0000, 0.0000, 0.6500, NULL, 'f', 't', 'f', 'th', 'Awaiting Payment Info', 'Open', 'Awaiting Payment Info', NULL, '2025-08-22 09:12:47+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "CustRef": "2011020007247934", "BranchNo": "", "T1Number": "2011020007247934", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 10, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -20, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.65, "TaxTypeId": "VAT", "TaxableAmount": 9.34, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GF-6271", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-24 15:04:25.852+00', '2025-08-24 15:04:26.586+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (31, 'TEST_ORDER_STATUS_004', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3000', '3000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 't', NULL, NULL, 'Created', 'Created', 'Unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (29, 'TEST_ORDER_STATUS_002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '7000', '7000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 't', NULL, NULL, 'Fulfilled', 'Fulfilled', 'Unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:10.896+00', '2025-08-24 17:14:38.772+00', NULL, NULL);
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (30, 'TEST_ORDER_STATUS_003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9000', '9000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 't', NULL, NULL, 'Cancelled', 'Cancelled', 'Unpaid', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 't', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:35.016+00', NULL, NULL);
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '1-123456789-C7L2LRMHV2KWT1', 'GF-6271', 'The1Number', '9999', 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFM-UAT', '123456789-C7L2LRMHV2KWT1', '1000', '1000', 0.0000, -9.3500, -10.0000, 0.0000, 0.6500, NULL, 'f', 't', 'f', 'th', 'Open', 'Open', 'Awaiting Payment Info', NULL, '2025-08-22 09:12:47+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "CustRef": "2011020007247934", "BranchNo": "", "T1Number": "2011020007247934", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 10, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -20, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.65, "TaxTypeId": "VAT", "TaxableAmount": 9.34, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GF-6271", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-24 15:34:34.329+00', '2025-08-24 15:34:34.329+00', 'system', 'system');
COMMIT;

-- ----------------------------
-- Table structure for payment_methods
-- ----------------------------
DROP TABLE IF EXISTS "order"."payment_methods";
CREATE TABLE "order"."payment_methods" (
  "id" int4 NOT NULL DEFAULT nextval('"order".payment_methods_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "payment_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "payment_method_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "messages" text COLLATE "pg_catalog"."default",
  "currency_code" varchar(255) COLLATE "pg_catalog"."default",
  "alternate_currency_amount" varchar(255) COLLATE "pg_catalog"."default",
  "account_number" varchar(255) COLLATE "pg_catalog"."default",
  "account_display_number" varchar(255) COLLATE "pg_catalog"."default",
  "name_on_card" varchar(255) COLLATE "pg_catalog"."default",
  "swipe_data" varchar(255) COLLATE "pg_catalog"."default",
  "card_expiry_month" varchar(255) COLLATE "pg_catalog"."default",
  "card_expiry_year" varchar(255) COLLATE "pg_catalog"."default",
  "gift_card_pin" varchar(25) COLLATE "pg_catalog"."default",
  "customer_signature" varchar(255) COLLATE "pg_catalog"."default",
  "customer_pay_signature" varchar(255) COLLATE "pg_catalog"."default",
  "charge_sequence" varchar(255) COLLATE "pg_catalog"."default",
  "routing_number" varchar(255) COLLATE "pg_catalog"."default",
  "routing_display_number" varchar(255) COLLATE "pg_catalog"."default",
  "check_number" varchar(255) COLLATE "pg_catalog"."default",
  "drivers_license_number" varchar(255) COLLATE "pg_catalog"."default",
  "drivers_license_state" varchar(255) COLLATE "pg_catalog"."default",
  "drivers_license_country" varchar(255) COLLATE "pg_catalog"."default",
  "business_name" varchar(255) COLLATE "pg_catalog"."default",
  "business_tax_id" varchar(255) COLLATE "pg_catalog"."default",
  "check_quantity" varchar(255) COLLATE "pg_catalog"."default",
  "original_amount" varchar(255) COLLATE "pg_catalog"."default",
  "parent_order_id" varchar(255) COLLATE "pg_catalog"."default",
  "parent_payment_group_id" varchar(255) COLLATE "pg_catalog"."default",
  "parent_payment_method_id" varchar(255) COLLATE "pg_catalog"."default",
  "gateway_account_id" varchar(255) COLLATE "pg_catalog"."default",
  "location_id" varchar(255) COLLATE "pg_catalog"."default",
  "transaction_reference_id" varchar(255) COLLATE "pg_catalog"."default",
  "org_id" varchar(255) COLLATE "pg_catalog"."default",
  "entry_type_id" varchar(255) COLLATE "pg_catalog"."default",
  "gateway_id" varchar(255) COLLATE "pg_catalog"."default",
  "captured_source" varchar(255) COLLATE "pg_catalog"."default",
  "shopper_reference" varchar(255) COLLATE "pg_catalog"."default",
  "suggested_amount" varchar(255) COLLATE "pg_catalog"."default",
  "purge_date" varchar(255) COLLATE "pg_catalog"."default",
  "account_type" varchar(255) COLLATE "pg_catalog"."default",
  "payment_category" varchar(255) COLLATE "pg_catalog"."default",
  "amount" numeric(18,4),
  "current_auth_amount" numeric(18,4),
  "current_settled_amount" numeric(18,4),
  "current_refund_amount" numeric(18,4),
  "current_failed_amount" numeric(18,4),
  "merchandise_amount" numeric(18,4),
  "change_amount" numeric(18,4),
  "conversion_rate" numeric(18,4),
  "captured_in_edge_mode" bool,
  "is_suspended" bool,
  "is_voided" bool,
  "is_copied" bool,
  "is_modifiable" bool,
  "actions" jsonb,
  "billing_address" jsonb,
  "payment_method_attribute" jsonb,
  "payment_method_encr_attribute" jsonb,
  "payment_type" jsonb,
  "card_type" jsonb,
  "extended" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."payment_methods" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."payment_methods"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."payment_methods"."payment_id" IS 'Payment identifier';
COMMENT ON COLUMN "order"."payment_methods"."payment_method_id" IS 'Payment method identifier (unique)';
COMMENT ON COLUMN "order"."payment_methods"."messages" IS 'Payment method messages';
COMMENT ON COLUMN "order"."payment_methods"."currency_code" IS 'Currency code';
COMMENT ON COLUMN "order"."payment_methods"."alternate_currency_amount" IS 'Alternate currency amount';
COMMENT ON COLUMN "order"."payment_methods"."account_number" IS 'Account number';
COMMENT ON COLUMN "order"."payment_methods"."account_display_number" IS 'Account display number';
COMMENT ON COLUMN "order"."payment_methods"."name_on_card" IS 'Name on card';
COMMENT ON COLUMN "order"."payment_methods"."swipe_data" IS 'Swipe data';
COMMENT ON COLUMN "order"."payment_methods"."card_expiry_month" IS 'Card expiry month';
COMMENT ON COLUMN "order"."payment_methods"."card_expiry_year" IS 'Card expiry year';
COMMENT ON COLUMN "order"."payment_methods"."gift_card_pin" IS 'Gift card PIN';
COMMENT ON COLUMN "order"."payment_methods"."customer_signature" IS 'Customer signature';
COMMENT ON COLUMN "order"."payment_methods"."customer_pay_signature" IS 'Customer pay signature';
COMMENT ON COLUMN "order"."payment_methods"."charge_sequence" IS 'Charge sequence';
COMMENT ON COLUMN "order"."payment_methods"."routing_number" IS 'Routing number';
COMMENT ON COLUMN "order"."payment_methods"."routing_display_number" IS 'Routing display number';
COMMENT ON COLUMN "order"."payment_methods"."check_number" IS 'Check number';
COMMENT ON COLUMN "order"."payment_methods"."drivers_license_number" IS 'Drivers license number';
COMMENT ON COLUMN "order"."payment_methods"."drivers_license_state" IS 'Drivers license state';
COMMENT ON COLUMN "order"."payment_methods"."drivers_license_country" IS 'Drivers license country';
COMMENT ON COLUMN "order"."payment_methods"."business_name" IS 'Business name';
COMMENT ON COLUMN "order"."payment_methods"."business_tax_id" IS 'Business tax ID';
COMMENT ON COLUMN "order"."payment_methods"."check_quantity" IS 'Check quantity';
COMMENT ON COLUMN "order"."payment_methods"."original_amount" IS 'Original amount';
COMMENT ON COLUMN "order"."payment_methods"."parent_order_id" IS 'Parent order ID';
COMMENT ON COLUMN "order"."payment_methods"."parent_payment_group_id" IS 'Parent payment group ID';
COMMENT ON COLUMN "order"."payment_methods"."parent_payment_method_id" IS 'Parent payment method ID';
COMMENT ON COLUMN "order"."payment_methods"."gateway_account_id" IS 'Gateway account ID';
COMMENT ON COLUMN "order"."payment_methods"."location_id" IS 'Location ID';
COMMENT ON COLUMN "order"."payment_methods"."transaction_reference_id" IS 'Transaction reference ID';
COMMENT ON COLUMN "order"."payment_methods"."org_id" IS 'Organization ID';
COMMENT ON COLUMN "order"."payment_methods"."entry_type_id" IS 'Entry type ID';
COMMENT ON COLUMN "order"."payment_methods"."gateway_id" IS 'Gateway ID';
COMMENT ON COLUMN "order"."payment_methods"."captured_source" IS 'Captured source';
COMMENT ON COLUMN "order"."payment_methods"."shopper_reference" IS 'Shopper reference';
COMMENT ON COLUMN "order"."payment_methods"."suggested_amount" IS 'Suggested amount';
COMMENT ON COLUMN "order"."payment_methods"."purge_date" IS 'Purge date';
COMMENT ON COLUMN "order"."payment_methods"."account_type" IS 'Account type';
COMMENT ON COLUMN "order"."payment_methods"."payment_category" IS 'Payment category';
COMMENT ON COLUMN "order"."payment_methods"."amount" IS 'Amount';
COMMENT ON COLUMN "order"."payment_methods"."current_auth_amount" IS 'Current authorization amount';
COMMENT ON COLUMN "order"."payment_methods"."current_settled_amount" IS 'Current settled amount';
COMMENT ON COLUMN "order"."payment_methods"."current_refund_amount" IS 'Current refund amount';
COMMENT ON COLUMN "order"."payment_methods"."current_failed_amount" IS 'Current failed amount';
COMMENT ON COLUMN "order"."payment_methods"."merchandise_amount" IS 'Merchandise amount';
COMMENT ON COLUMN "order"."payment_methods"."change_amount" IS 'Change amount';
COMMENT ON COLUMN "order"."payment_methods"."conversion_rate" IS 'Conversion rate';
COMMENT ON COLUMN "order"."payment_methods"."captured_in_edge_mode" IS 'Captured in edge mode flag';
COMMENT ON COLUMN "order"."payment_methods"."is_suspended" IS 'Is suspended flag';
COMMENT ON COLUMN "order"."payment_methods"."is_voided" IS 'Is voided flag';
COMMENT ON COLUMN "order"."payment_methods"."is_copied" IS 'Is copied flag';
COMMENT ON COLUMN "order"."payment_methods"."is_modifiable" IS 'Is modifiable flag';
COMMENT ON COLUMN "order"."payment_methods"."actions" IS 'Payment method actions in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."billing_address" IS 'Billing address in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."payment_method_attribute" IS 'Payment method attributes in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."payment_method_encr_attribute" IS 'Payment method encrypted attributes in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."payment_type" IS 'Payment type in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."card_type" IS 'Card type in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."extended" IS 'Extended information in JSON format';
COMMENT ON COLUMN "order"."payment_methods"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."payment_methods"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."payment_methods"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."payment_methods"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of payment_methods
-- ----------------------------
BEGIN;
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, 'a1-123456789-C7L2LRMHV2KWT1', 'a1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'a1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a1-123456789-C7L2LRMHV2KWT1', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 2390.0000, NULL, 239.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-24 15:04:26.492+00', '2025-08-24 15:04:26.492+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '1-123456789-C7L2LRMHV2KWT2', '1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', '1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1-123456789-C7L2LRMHV2KWT2', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 2390.0000, NULL, 239.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "TH"}', '2025-08-24 15:45:12.767+00', '2025-08-24 15:45:12.767+00', 'system', 'system');
COMMIT;

-- ----------------------------
-- Table structure for payment_transactions
-- ----------------------------
DROP TABLE IF EXISTS "order"."payment_transactions";
CREATE TABLE "order"."payment_transactions" (
  "id" int4 NOT NULL DEFAULT nextval('"order".payment_transactions_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "payment_method_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "payment_transaction_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "is_activation" bool,
  "is_active" bool,
  "is_copied" bool,
  "is_valid_for_refund" bool,
  "reconciliation_id" varchar(255) COLLATE "pg_catalog"."default",
  "request_id" varchar(255) COLLATE "pg_catalog"."default",
  "request_token" varchar(255) COLLATE "pg_catalog"."default",
  "processed_amount" numeric(18,4),
  "requested_amount" numeric(18,4),
  "transaction_date" timestamptz(6),
  "payment_response_status" jsonb,
  "status" jsonb,
  "transmission_status" jsonb,
  "transaction_type" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."payment_transactions" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."payment_transactions"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."payment_transactions"."payment_method_id" IS 'Payment method identifier';
COMMENT ON COLUMN "order"."payment_transactions"."payment_transaction_id" IS 'Payment transaction identifier (unique)';
COMMENT ON COLUMN "order"."payment_transactions"."is_activation" IS 'Is activation flag';
COMMENT ON COLUMN "order"."payment_transactions"."is_active" IS 'Is active flag';
COMMENT ON COLUMN "order"."payment_transactions"."is_copied" IS 'Is copied flag';
COMMENT ON COLUMN "order"."payment_transactions"."is_valid_for_refund" IS 'Is valid for refund flag';
COMMENT ON COLUMN "order"."payment_transactions"."reconciliation_id" IS 'Reconciliation ID';
COMMENT ON COLUMN "order"."payment_transactions"."request_id" IS 'Request ID';
COMMENT ON COLUMN "order"."payment_transactions"."request_token" IS 'Request token';
COMMENT ON COLUMN "order"."payment_transactions"."processed_amount" IS 'Processed amount';
COMMENT ON COLUMN "order"."payment_transactions"."requested_amount" IS 'Requested amount';
COMMENT ON COLUMN "order"."payment_transactions"."transaction_date" IS 'Transaction date';
COMMENT ON COLUMN "order"."payment_transactions"."payment_response_status" IS 'Payment response status in JSON format';
COMMENT ON COLUMN "order"."payment_transactions"."status" IS 'Status in JSON format';
COMMENT ON COLUMN "order"."payment_transactions"."transmission_status" IS 'Transmission status in JSON format';
COMMENT ON COLUMN "order"."payment_transactions"."transaction_type" IS 'Transaction type in JSON format';
COMMENT ON COLUMN "order"."payment_transactions"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."payment_transactions"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."payment_transactions"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."payment_transactions"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of payment_transactions
-- ----------------------------
BEGIN;
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, 'a1-123456789-C7L2LRMHV2KWT1', 'a1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'a1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'f', 't', 'f', 't', 'a1-123456789-C7L2LRMHV2KWT1', 'a1-123456789-C7L2LRMHV2KWT1', 'a1-123456789-C7L2LRMHV2KWT1', 239.0000, 239.0000, '2025-08-22 09:12:47+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-24 15:04:26.541+00', '2025-08-24 15:04:26.541+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '1-123456789-C7L2LRMHV2KWT2', '1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', '1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'f', 't', 'f', 't', '1-123456789-C7L2LRMHV2KWT2', '1-123456789-C7L2LRMHV2KWT2', '1-123456789-C7L2LRMHV2KWT2', 239.0000, 239.0000, '2025-08-22 09:12:47+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-24 15:45:12.776+00', '2025-08-24 15:45:12.776+00', 'system', 'system');
COMMIT;

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS "order"."payments";
CREATE TABLE "order"."payments" (
  "id" int4 NOT NULL DEFAULT nextval('"order".payments_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "payment_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "org_id" varchar(255) COLLATE "pg_catalog"."default",
  "customer_id" varchar(255) COLLATE "pg_catalog"."default",
  "payment_group_id" varchar(255) COLLATE "pg_catalog"."default",
  "status_id" varchar(255) COLLATE "pg_catalog"."default",
  "message" text COLLATE "pg_catalog"."default",
  "is_anonymized" bool,
  "is_cancelled" bool,
  "purge_date" timestamptz(6),
  "actions" jsonb,
  "processing_mode" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."payments" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."payments"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."payments"."payment_id" IS 'Payment identifier (unique)';
COMMENT ON COLUMN "order"."payments"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."payments"."customer_id" IS 'Customer identifier';
COMMENT ON COLUMN "order"."payments"."payment_group_id" IS 'Payment group identifier';
COMMENT ON COLUMN "order"."payments"."status_id" IS 'Status identifier';
COMMENT ON COLUMN "order"."payments"."message" IS 'Payment message';
COMMENT ON COLUMN "order"."payments"."is_anonymized" IS 'Is anonymized flag';
COMMENT ON COLUMN "order"."payments"."is_cancelled" IS 'Is cancelled flag';
COMMENT ON COLUMN "order"."payments"."purge_date" IS 'Purge date timestamp';
COMMENT ON COLUMN "order"."payments"."actions" IS 'Payment actions in JSON format';
COMMENT ON COLUMN "order"."payments"."processing_mode" IS 'Processing mode in JSON format';
COMMENT ON COLUMN "order"."payments"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."payments"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."payments"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."payments"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of payments
-- ----------------------------
BEGIN;
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, 'a1-123456789-C7L2LRMHV2KWT1', 'a1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'CFM-UAT', '9999', 'b7605723-bf9e-4a7a-810b-f4775e01071f', 'Awaiting Payment Info', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-24 15:04:26.403+00', '2025-08-24 15:04:26.67+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '1-123456789-C7L2LRMHV2KWT2', '1-c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'CFM-UAT', '9999', 'baa71e37-089c-4769-9652-2f0d911905fb', 'Awaiting Payment Info', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-24 15:45:12.762+00', '2025-08-24 15:45:12.857+00', 'system', 'system');
COMMIT;

-- ----------------------------
-- Table structure for quantity_details
-- ----------------------------
DROP TABLE IF EXISTS "order"."quantity_details";
CREATE TABLE "order"."quantity_details" (
  "id" int4 NOT NULL DEFAULT nextval('"order".quantity_details_id_seq'::regclass),
  "order_line_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity_detail_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status_id" varchar(50) COLLATE "pg_catalog"."default",
  "process" varchar(100) COLLATE "pg_catalog"."default",
  "item_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" int4 NOT NULL DEFAULT 0,
  "uom" varchar(20) COLLATE "pg_catalog"."default",
  "reason" varchar(255) COLLATE "pg_catalog"."default",
  "reason_type" varchar(100) COLLATE "pg_catalog"."default",
  "substitution_ratio" numeric(18,4),
  "substitution_type" varchar(100) COLLATE "pg_catalog"."default",
  "web_url" varchar(500) COLLATE "pg_catalog"."default",
  "org_id" varchar(50) COLLATE "pg_catalog"."default",
  "status" jsonb,
  "change_log" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(100) COLLATE "pg_catalog"."default",
  "updated_by" varchar(100) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."quantity_details" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."quantity_details"."order_line_id" IS 'Order line identifier';
COMMENT ON COLUMN "order"."quantity_details"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."quantity_details"."quantity_detail_id" IS 'Quantity detail identifier (unique)';
COMMENT ON COLUMN "order"."quantity_details"."status_id" IS 'Status identifier';
COMMENT ON COLUMN "order"."quantity_details"."process" IS 'Process';
COMMENT ON COLUMN "order"."quantity_details"."item_id" IS 'Item identifier';
COMMENT ON COLUMN "order"."quantity_details"."quantity" IS 'Quantity';
COMMENT ON COLUMN "order"."quantity_details"."uom" IS 'Unit of measure';
COMMENT ON COLUMN "order"."quantity_details"."reason" IS 'Reason';
COMMENT ON COLUMN "order"."quantity_details"."reason_type" IS 'Reason type';
COMMENT ON COLUMN "order"."quantity_details"."substitution_ratio" IS 'Substitution ratio';
COMMENT ON COLUMN "order"."quantity_details"."substitution_type" IS 'Substitution type';
COMMENT ON COLUMN "order"."quantity_details"."web_url" IS 'Web URL';
COMMENT ON COLUMN "order"."quantity_details"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."quantity_details"."status" IS 'Status information and details';
COMMENT ON COLUMN "order"."quantity_details"."change_log" IS 'Change log in JSON format';
COMMENT ON COLUMN "order"."quantity_details"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."quantity_details"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."quantity_details"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."quantity_details"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of quantity_details
-- ----------------------------
BEGIN;
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (119, 'LINE_001', 'TEST_ORDER_STATUS_001', 'QXX1', '3000', '', 'TEST_ITEM_001', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (120, 'LINE_001', 'TEST_ORDER_STATUS_001', 'QXX2', '3000', '', 'TEST_ITEM_001', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (121, 'LINE_001', 'TEST_ORDER_STATUS_001', 'QXX3', '3000', '', 'TEST_ITEM_001', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (122, 'LINE_001', 'TEST_ORDER_STATUS_001', 'QXX4', '3000', '', 'TEST_ITEM_001', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (123, 'LINE_001', 'TEST_ORDER_STATUS_001', 'QXX5', '3000', '', 'TEST_ITEM_001', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (54, '000-0-0', '1-123456789-C7L2LRMHV2KWT2', '41260b30-ab26-45dc-9166-0960543ca419', '1000', NULL, '0000093362986', 1, 'SPCS', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:45:12.756+00', '2025-08-24 15:45:12.756+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (55, '001-1-1', '1-123456789-C7L2LRMHV2KWT2', 'e30b0ff9-b754-4cb6-a02c-16736e06f9d7', '1000', NULL, '0000093362986', 1, 'SPCS', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:45:12.756+00', '2025-08-24 15:45:12.756+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (56, '002-2-2', '1-123456789-C7L2LRMHV2KWT2', '88f17f5d-3b04-48da-b3a3-8a9a711d5d90', '1000', NULL, '4901133618567', 1, 'SPCS', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:45:12.756+00', '2025-08-24 15:45:12.756+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (57, '003-3-3', '1-123456789-C7L2LRMHV2KWT2', '108311b5-6584-49d2-ad5c-5e1fbaf738ca', '1000', NULL, '8850124003850', 12, 'SBTL', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:45:12.756+00', '2025-08-24 15:45:12.756+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (16, '000-0-0', 'a1-123456789-C7L2LRMHV2KWT1', 'fd855ff5-208d-41be-89fb-ddeba98d8244', '1000', NULL, '0000093362986', 1, 'SPCS', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:04:26.36+00', '2025-08-24 15:04:26.36+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (17, '001-1-1', 'a1-123456789-C7L2LRMHV2KWT1', '6e946871-a7e1-4eb4-8bd6-191b6884b1d6', '1000', NULL, '0000093362986', 1, 'SPCS', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:04:26.36+00', '2025-08-24 15:04:26.36+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (18, '002-2-2', 'a1-123456789-C7L2LRMHV2KWT1', 'e9794382-8826-41ec-9fe6-a7323d640b6e', '1000', NULL, '4901133618567', 1, 'SPCS', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:04:26.36+00', '2025-08-24 15:04:26.36+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (19, '003-3-3', 'a1-123456789-C7L2LRMHV2KWT1', 'c7474027-5714-4620-bb34-08b03d2c41d3', '1000', NULL, '8850124003850', 12, 'SBTL', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:04:26.36+00', '2025-08-24 15:04:26.36+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (20, '004-4-4', 'a1-123456789-C7L2LRMHV2KWT1', '4d4537e9-5599-4637-89e3-a775bcf725d9', '1000', NULL, '8850124003850', 12, 'SBTL', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:04:26.36+00', '2025-08-24 15:04:26.36+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (58, '004-4-4', '1-123456789-C7L2LRMHV2KWT2', 'a3f5007f-b204-4461-b599-abe742921941', '1000', NULL, '8850124003850', 12, 'SBTL', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, NULL, '2025-08-24 15:45:12.756+00', '2025-08-24 15:45:12.756+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (134, 'LINE_004', 'TEST_ORDER_STATUS_004', 'QXXXX1', '3000', '', 'TEST_ITEM_004', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (135, 'LINE_004', 'TEST_ORDER_STATUS_004', 'QXXXX2', '3000', '', 'TEST_ITEM_004', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (136, 'LINE_004', 'TEST_ORDER_STATUS_004', 'QXXXX3', '3000', '', 'TEST_ITEM_004', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (137, 'LINE_004', 'TEST_ORDER_STATUS_004', 'QXXXX4', '3000', '', 'TEST_ITEM_004', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (138, 'LINE_004', 'TEST_ORDER_STATUS_004', 'QXXXX5', '3000', '', 'TEST_ITEM_004', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (124, 'LINE_002', 'TEST_ORDER_STATUS_002', 'QX1', '7000', '', 'TEST_ITEM_002', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.896+00', '2025-08-24 17:13:34.924+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (125, 'LINE_002', 'TEST_ORDER_STATUS_002', 'QX2', '9000', '', 'TEST_ITEM_002', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.896+00', '2025-08-24 17:13:45.465+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (128, 'LINE_002', 'TEST_ORDER_STATUS_002', 'QX5', '9000', '', 'TEST_ITEM_002', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.896+00', '2025-08-24 17:14:31.745+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (126, 'LINE_002', 'TEST_ORDER_STATUS_002', 'QX3', '9000', '', 'TEST_ITEM_002', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.896+00', '2025-08-24 17:14:38.251+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (127, 'LINE_002', 'TEST_ORDER_STATUS_002', 'QX4', '9000', '', 'TEST_ITEM_002', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:10.896+00', '2025-08-24 17:14:38.251+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (129, 'LINE_003', 'TEST_ORDER_STATUS_003', 'QXXX1', '9000', '', 'TEST_ITEM_003', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:18.04+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (130, 'LINE_003', 'TEST_ORDER_STATUS_003', 'QXXX2', '9000', '', 'TEST_ITEM_003', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:26.325+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (131, 'LINE_003', 'TEST_ORDER_STATUS_003', 'QXXX3', '9000', '', 'TEST_ITEM_003', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:26.325+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (132, 'LINE_003', 'TEST_ORDER_STATUS_003', 'QXXX4', '9000', '', 'TEST_ITEM_003', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:34.452+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_line_id", "order_id", "quantity_detail_id", "status_id", "process", "item_id", "quantity", "uom", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "org_id", "status", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (133, 'LINE_003', 'TEST_ORDER_STATUS_003', 'QXXX5', '9000', '', 'TEST_ITEM_003', 1, 'PCS', NULL, NULL, NULL, NULL, NULL, 'ORG1', NULL, '{}', '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:34.452+00', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for release_lines
-- ----------------------------
DROP TABLE IF EXISTS "order"."release_lines";
CREATE TABLE "order"."release_lines" (
  "id" int4 NOT NULL DEFAULT nextval('"order".release_lines_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "order_line_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "release_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "release_line_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "allocation_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "org_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "item_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" numeric(18,4) NOT NULL,
  "uom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "fulfilled_quantity" numeric(18,4),
  "cancelled_quantity" numeric(18,4),
  "effective_rank" int4,
  "process" varchar(255) COLLATE "pg_catalog"."default",
  "cancelled_date" timestamptz(6),
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."release_lines" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."release_lines"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."release_lines"."order_line_id" IS 'Order line identifier';
COMMENT ON COLUMN "order"."release_lines"."release_id" IS 'Release identifier';
COMMENT ON COLUMN "order"."release_lines"."release_line_id" IS 'Release line identifier';
COMMENT ON COLUMN "order"."release_lines"."allocation_id" IS 'Allocation identifier';
COMMENT ON COLUMN "order"."release_lines"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."release_lines"."item_id" IS 'Item identifier';
COMMENT ON COLUMN "order"."release_lines"."quantity" IS 'Quantity';
COMMENT ON COLUMN "order"."release_lines"."uom" IS 'Unit of measure';
COMMENT ON COLUMN "order"."release_lines"."fulfilled_quantity" IS 'Fulfilled quantity';
COMMENT ON COLUMN "order"."release_lines"."cancelled_quantity" IS 'Cancelled quantity';
COMMENT ON COLUMN "order"."release_lines"."effective_rank" IS 'Effective rank';
COMMENT ON COLUMN "order"."release_lines"."process" IS 'Process';
COMMENT ON COLUMN "order"."release_lines"."cancelled_date" IS 'Cancelled date';
COMMENT ON COLUMN "order"."release_lines"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."release_lines"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."release_lines"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."release_lines"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of release_lines
-- ----------------------------
BEGIN;
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (22, 'TEST_ORDER_STATUS_001', 'LINE_001', 'TEST_RELEASE_STATUS_001', '1', 'ALLOC_TEST_001', 'ORG1', 'TEST_ITEM_001', 5.0000, 'PCS', 0.0000, 0.0000, NULL, NULL, NULL, '2025-08-24 17:13:10.714+00', '2025-08-24 17:13:10.714+00', 'seed', 'seed');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (25, 'TEST_ORDER_STATUS_004', 'LINE_004', 'TEST_RELEASE_STATUS_004', '1', 'ALLOC_TEST_004', 'ORG1', 'TEST_ITEM_004', 5.0000, 'PCS', 0.0000, 0.0000, NULL, NULL, NULL, '2025-08-24 17:13:11.241+00', '2025-08-24 17:13:11.241+00', 'seed', 'seed');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (23, 'TEST_ORDER_STATUS_002', 'LINE_002', 'TEST_RELEASE_STATUS_002', '1', 'ALLOC_TEST_002', 'ORG1', 'TEST_ITEM_002', 5.0000, 'PCS', 1.0000, 4.0000, NULL, NULL, NULL, '2025-08-24 17:13:10.896+00', '2025-08-24 17:14:38.291+00', 'seed', 'seed');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (24, 'TEST_ORDER_STATUS_003', 'LINE_003', 'TEST_RELEASE_STATUS_003', '1', 'ALLOC_TEST_003', 'ORG1', 'TEST_ITEM_003', 5.0000, 'PCS', 0.0000, 5.0000, NULL, NULL, NULL, '2025-08-24 17:13:11.07+00', '2025-08-24 17:16:34.488+00', 'seed', 'seed');
COMMIT;

-- ----------------------------
-- Table structure for releases
-- ----------------------------
DROP TABLE IF EXISTS "order"."releases";
CREATE TABLE "order"."releases" (
  "id" int4 NOT NULL DEFAULT nextval('"order".releases_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "release_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "org_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ship_from_location_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "carrier_code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "delivery_method_id" varchar(255) COLLATE "pg_catalog"."default",
  "ship_to_location_id" varchar(255) COLLATE "pg_catalog"."default",
  "ship_via_id" varchar(255) COLLATE "pg_catalog"."default",
  "release_type" varchar(255) COLLATE "pg_catalog"."default",
  "process" varchar(255) COLLATE "pg_catalog"."default",
  "service_level_code" varchar(255) COLLATE "pg_catalog"."default",
  "destination_action" varchar(255) COLLATE "pg_catalog"."default",
  "effective_rank" int4,
  "release_extension_1" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."releases" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."releases"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."releases"."release_id" IS 'Release identifier (unique)';
COMMENT ON COLUMN "order"."releases"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."releases"."ship_from_location_id" IS 'Ship from location identifier';
COMMENT ON COLUMN "order"."releases"."carrier_code" IS 'Carrier code';
COMMENT ON COLUMN "order"."releases"."delivery_method_id" IS 'Delivery method ID';
COMMENT ON COLUMN "order"."releases"."ship_to_location_id" IS 'Ship to location identifier';
COMMENT ON COLUMN "order"."releases"."ship_via_id" IS 'Ship via ID';
COMMENT ON COLUMN "order"."releases"."release_type" IS 'Release type';
COMMENT ON COLUMN "order"."releases"."process" IS 'Process';
COMMENT ON COLUMN "order"."releases"."service_level_code" IS 'Service level code';
COMMENT ON COLUMN "order"."releases"."destination_action" IS 'Destination action';
COMMENT ON COLUMN "order"."releases"."effective_rank" IS 'Effective rank';
COMMENT ON COLUMN "order"."releases"."release_extension_1" IS 'Release extension 1 in JSON format';
COMMENT ON COLUMN "order"."releases"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."releases"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."releases"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."releases"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of releases
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."allocations_id_seq"
OWNED BY "order"."allocations"."id";
SELECT setval('"order"."allocations_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."fulfillment_details_id_seq"
OWNED BY "order"."fulfillment_details"."id";
SELECT setval('"order"."fulfillment_details_id_seq"', 55, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."order_lines_id_seq"
OWNED BY "order"."order_lines"."id";
SELECT setval('"order"."order_lines_id_seq"', 56, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."orders_id_seq"
OWNED BY "order"."orders"."id";
SELECT setval('"order"."orders_id_seq"', 31, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."payment_methods_id_seq"
OWNED BY "order"."payment_methods"."id";
SELECT setval('"order"."payment_methods_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."payment_transactions_id_seq"
OWNED BY "order"."payment_transactions"."id";
SELECT setval('"order"."payment_transactions_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."payments_id_seq"
OWNED BY "order"."payments"."id";
SELECT setval('"order"."payments_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."quantity_details_id_seq"
OWNED BY "order"."quantity_details"."id";
SELECT setval('"order"."quantity_details_id_seq"', 138, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."release_lines_id_seq"
OWNED BY "order"."release_lines"."id";
SELECT setval('"order"."release_lines_id_seq"', 25, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."releases_id_seq"
OWNED BY "order"."releases"."id";
SELECT setval('"order"."releases_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table SequelizeMeta_order
-- ----------------------------
ALTER TABLE "order"."SequelizeMeta_order" ADD CONSTRAINT "SequelizeMeta_order_pkey" PRIMARY KEY ("name");

-- ----------------------------
-- Indexes structure for table allocations
-- ----------------------------
CREATE INDEX "idx_allocations_allocated_on" ON "order"."allocations" USING btree (
  "allocated_on" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_allocation_id" ON "order"."allocations" USING btree (
  "allocation_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_allocation_id_btree" ON "order"."allocations" USING btree (
  "allocation_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_allocation_type" ON "order"."allocations" USING hash (
  "allocation_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_carrier_code" ON "order"."allocations" USING hash (
  "carrier_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_carrier_service_composite" ON "order"."allocations" USING btree (
  "carrier_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "service_level_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_committed_delivery_date" ON "order"."allocations" USING btree (
  "committed_delivery_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_created_at" ON "order"."allocations" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_earliest_delivery_date" ON "order"."allocations" USING btree (
  "earliest_delivery_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_extended_gin" ON "order"."allocations" USING gin (
  "extended" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_allocations_is_virtual" ON "order"."allocations" USING hash (
  "is_virtual" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_allocations_item_id" ON "order"."allocations" USING hash (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_item_uom_quantity_composite" ON "order"."allocations" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "quantity" "pg_catalog"."numeric_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_order_id" ON "order"."allocations" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_order_id_btree" ON "order"."allocations" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_order_line_id" ON "order"."allocations" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_order_line_id_btree" ON "order"."allocations" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_order_orderline_composite" ON "order"."allocations" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_org_id" ON "order"."allocations" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_org_item_composite" ON "order"."allocations" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_ship_from_location_id" ON "order"."allocations" USING hash (
  "ship_from_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_ship_from_to_composite" ON "order"."allocations" USING btree (
  "ship_from_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ship_to_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_ship_to_location_id" ON "order"."allocations" USING hash (
  "ship_to_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_status_id" ON "order"."allocations" USING hash (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_status_type_composite" ON "order"."allocations" USING btree (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "allocation_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_uom" ON "order"."allocations" USING hash (
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_allocations_updated_at" ON "order"."allocations" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_allocations_virtual_allocated_status_composite" ON "order"."allocations" USING btree (
  "is_virtual" "pg_catalog"."bool_ops" ASC NULLS LAST,
  "allocated_on" "pg_catalog"."timestamptz_ops" ASC NULLS LAST,
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table allocations
-- ----------------------------
ALTER TABLE "order"."allocations" ADD CONSTRAINT "allocations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table fulfillment_details
-- ----------------------------
CREATE INDEX "idx_fulfillment_details_created_at" ON "order"."fulfillment_details" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_event_type_id" ON "order"."fulfillment_details" USING hash (
  "event_type_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_fulfillment_details_fulfillment_group_id" ON "order"."fulfillment_details" USING hash (
  "fulfillment_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_fulfillment_details_fulfillment_id_btree" ON "order"."fulfillment_details" USING btree (
  "fulfillment_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_fulfillment_info" ON "order"."fulfillment_details" USING gin (
  "fulfillment_info" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_fulfillment_details_fulfillment_status_composite" ON "order"."fulfillment_details" USING btree (
  "fulfillment_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_group_event_composite" ON "order"."fulfillment_details" USING btree (
  "fulfillment_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "event_type_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_item_id" ON "order"."fulfillment_details" USING hash (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_fulfillment_details_item_uom_composite" ON "order"."fulfillment_details" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_order_id" ON "order"."fulfillment_details" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_order_line_id" ON "order"."fulfillment_details" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_order_orderline_composite" ON "order"."fulfillment_details" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_quantity_uom_status_composite" ON "order"."fulfillment_details" USING btree (
  "quantity" "pg_catalog"."numeric_ops" ASC NULLS LAST,
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_release_id" ON "order"."fulfillment_details" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_release_line_id" ON "order"."fulfillment_details" USING btree (
  "release_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_release_releaseline_composite" ON "order"."fulfillment_details" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "release_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_short_reason_id" ON "order"."fulfillment_details" USING hash (
  "short_reason_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_fulfillment_details_status_id" ON "order"."fulfillment_details" USING hash (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_fulfillment_details_status_reason_composite" ON "order"."fulfillment_details" USING btree (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "short_reason_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_fulfillment_details_uom" ON "order"."fulfillment_details" USING hash (
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_fulfillment_details_updated_at" ON "order"."fulfillment_details" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table fulfillment_details
-- ----------------------------
ALTER TABLE "order"."fulfillment_details" ADD CONSTRAINT "fulfillment_details_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table order_lines
-- ----------------------------
CREATE INDEX "idx_order_lines_change_log_gin" ON "order"."order_lines" USING gin (
  "change_log" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_order_lines_created_at" ON "order"."order_lines" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_delivery_method_gin" ON "order"."order_lines" USING gin (
  "delivery_method" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_order_lines_fulfillment_group_id" ON "order"."order_lines" USING hash (
  "fulfillment_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_order_lines_fulfillment_status" ON "order"."order_lines" USING hash (
  "fulfillment_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_order_lines_group_status_created_composite" ON "order"."order_lines" USING btree (
  "fulfillment_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_line_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_is_active" ON "order"."order_lines" USING hash (
  "is_active" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_order_lines_item_fulfillment_composite" ON "order"."order_lines" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "fulfillment_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_item_id" ON "order"."order_lines" USING hash (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_order_lines_item_id_btree" ON "order"."order_lines" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_order_active_composite" ON "order"."order_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_order_id" ON "order"."order_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_order_line_id" ON "order"."order_lines" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_order_line_status" ON "order"."order_lines" USING hash (
  "order_line_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE UNIQUE INDEX "idx_order_lines_order_parent_unique" ON "order"."order_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "parent_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_order_status_composite" ON "order"."order_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_line_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_promised_delivery_date" ON "order"."order_lines" USING btree (
  "promised_delivery_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_ship_to_address_gin" ON "order"."order_lines" USING gin (
  "ship_to_address" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_order_lines_shipping_method_id" ON "order"."order_lines" USING hash (
  "shipping_method_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_order_lines_uom" ON "order"."order_lines" USING hash (
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_order_lines_updated_at" ON "order"."order_lines" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_order_lines_version" ON "order"."order_lines" USING btree (
  "version" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table order_lines
-- ----------------------------
ALTER TABLE "order"."order_lines" ADD CONSTRAINT "order_lines_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table orders
-- ----------------------------
CREATE INDEX "idx_orders_captured_date" ON "order"."orders" USING btree (
  "captured_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_change_log_gin" ON "order"."orders" USING gin (
  "change_log" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_orders_channel_status_created_composite" ON "order"."orders" USING btree (
  "selling_channel" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_created_at" ON "order"."orders" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_customer_active_composite" ON "order"."orders" USING btree (
  "customer_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_customer_email" ON "order"."orders" USING hash (
  "customer_email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_customer_id" ON "order"."orders" USING hash (
  "customer_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_do_not_release_before" ON "order"."orders" USING btree (
  "do_not_release_before" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_doc_type_gin" ON "order"."orders" USING gin (
  "doc_type" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_orders_fulfillment_status" ON "order"."orders" USING hash (
  "fulfillment_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_is_active" ON "order"."orders" USING hash (
  "is_active" "pg_catalog"."bool_ops"
);
CREATE UNIQUE INDEX "idx_orders_order_id" ON "order"."orders" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_orders_order_parent_org_unique" ON "order"."orders" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "parent_id" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_order_status" ON "order"."orders" USING hash (
  "order_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_order_type_gin" ON "order"."orders" USING gin (
  "order_type" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_orders_org_id" ON "order"."orders" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_org_status_composite" ON "order"."orders" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_payment_status" ON "order"."orders" USING hash (
  "payment_status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_selling_channel" ON "order"."orders" USING hash (
  "selling_channel" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_orders_short_order_number" ON "order"."orders" USING btree (
  "short_order_number" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_updated_at" ON "order"."orders" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_orders_version" ON "order"."orders" USING btree (
  "version" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table orders
-- ----------------------------
ALTER TABLE "order"."orders" ADD CONSTRAINT "orders_order_id_key" UNIQUE ("order_id");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "order"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table payment_methods
-- ----------------------------
CREATE INDEX "idx_payment_methods_account_type" ON "order"."payment_methods" USING hash (
  "account_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_actions_gin" ON "order"."payment_methods" USING gin (
  "actions" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_methods_billing_address_gin" ON "order"."payment_methods" USING gin (
  "billing_address" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_methods_card_type_gin" ON "order"."payment_methods" USING gin (
  "card_type" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_methods_category_suspended_created_composite" ON "order"."payment_methods" USING btree (
  "payment_category" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "is_suspended" "pg_catalog"."bool_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_created_at" ON "order"."payment_methods" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_currency_code" ON "order"."payment_methods" USING hash (
  "currency_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_gateway_account_composite" ON "order"."payment_methods" USING btree (
  "gateway_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "account_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_gateway_account_id" ON "order"."payment_methods" USING hash (
  "gateway_account_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_gateway_id" ON "order"."payment_methods" USING hash (
  "gateway_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_is_modifiable" ON "order"."payment_methods" USING hash (
  "is_modifiable" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payment_methods_is_suspended" ON "order"."payment_methods" USING hash (
  "is_suspended" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payment_methods_is_voided" ON "order"."payment_methods" USING hash (
  "is_voided" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payment_methods_location_id" ON "order"."payment_methods" USING hash (
  "location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_order_id" ON "order"."payment_methods" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_order_id_btree" ON "order"."payment_methods" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_order_payment_composite" ON "order"."payment_methods" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "payment_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_org_currency_composite" ON "order"."payment_methods" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "currency_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_org_id" ON "order"."payment_methods" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_payment_category" ON "order"."payment_methods" USING hash (
  "payment_category" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_methods_payment_id" ON "order"."payment_methods" USING btree (
  "payment_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_payment_methods_payment_method_id" ON "order"."payment_methods" USING btree (
  "payment_method_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_payment_methods_payment_method_id_unique" ON "order"."payment_methods" USING btree (
  "payment_method_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_methods_payment_type_gin" ON "order"."payment_methods" USING gin (
  "payment_type" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_methods_updated_at" ON "order"."payment_methods" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table payment_methods
-- ----------------------------
ALTER TABLE "order"."payment_methods" ADD CONSTRAINT "payment_methods_payment_method_id_key" UNIQUE ("payment_method_id");

-- ----------------------------
-- Primary Key structure for table payment_methods
-- ----------------------------
ALTER TABLE "order"."payment_methods" ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table payment_transactions
-- ----------------------------
CREATE INDEX "idx_payment_transactions_active_transaction_date_composite" ON "order"."payment_transactions" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST,
  "transaction_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_created_at" ON "order"."payment_transactions" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_is_activation" ON "order"."payment_transactions" USING hash (
  "is_activation" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payment_transactions_is_active" ON "order"."payment_transactions" USING hash (
  "is_active" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payment_transactions_is_valid_for_refund" ON "order"."payment_transactions" USING hash (
  "is_valid_for_refund" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payment_transactions_order_id" ON "order"."payment_transactions" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_order_id_btree" ON "order"."payment_transactions" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_order_payment_method_composite" ON "order"."payment_transactions" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "payment_method_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_payment_method_id" ON "order"."payment_transactions" USING btree (
  "payment_method_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_payment_response_status_gin" ON "order"."payment_transactions" USING gin (
  "payment_response_status" "pg_catalog"."jsonb_ops"
);
CREATE UNIQUE INDEX "idx_payment_transactions_payment_transaction_id" ON "order"."payment_transactions" USING btree (
  "payment_transaction_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_payment_transactions_payment_transaction_id_unique" ON "order"."payment_transactions" USING btree (
  "payment_transaction_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_reconciliation_id" ON "order"."payment_transactions" USING hash (
  "reconciliation_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_transactions_refund_amount_created_composite" ON "order"."payment_transactions" USING btree (
  "is_valid_for_refund" "pg_catalog"."bool_ops" ASC NULLS LAST,
  "processed_amount" "pg_catalog"."numeric_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_request_id" ON "order"."payment_transactions" USING hash (
  "request_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payment_transactions_status_gin" ON "order"."payment_transactions" USING gin (
  "status" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_transactions_transaction_date" ON "order"."payment_transactions" USING btree (
  "transaction_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payment_transactions_transaction_type_gin" ON "order"."payment_transactions" USING gin (
  "transaction_type" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_transactions_transmission_status_gin" ON "order"."payment_transactions" USING gin (
  "transmission_status" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payment_transactions_updated_at" ON "order"."payment_transactions" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table payment_transactions
-- ----------------------------
ALTER TABLE "order"."payment_transactions" ADD CONSTRAINT "payment_transactions_payment_transaction_id_key" UNIQUE ("payment_transaction_id");

-- ----------------------------
-- Primary Key structure for table payment_transactions
-- ----------------------------
ALTER TABLE "order"."payment_transactions" ADD CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table payments
-- ----------------------------
CREATE INDEX "idx_payments_actions_gin" ON "order"."payments" USING gin (
  "actions" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payments_created_at" ON "order"."payments" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_customer_cancelled_composite" ON "order"."payments" USING btree (
  "customer_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "is_cancelled" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_customer_id" ON "order"."payments" USING hash (
  "customer_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payments_group_status_created_composite" ON "order"."payments" USING btree (
  "payment_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_is_anonymized" ON "order"."payments" USING hash (
  "is_anonymized" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payments_is_cancelled" ON "order"."payments" USING hash (
  "is_cancelled" "pg_catalog"."bool_ops"
);
CREATE INDEX "idx_payments_order_id" ON "order"."payments" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_order_status_composite" ON "order"."payments" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_org_created_composite" ON "order"."payments" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_org_id" ON "order"."payments" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payments_payment_group_id" ON "order"."payments" USING hash (
  "payment_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE UNIQUE INDEX "idx_payments_payment_id" ON "order"."payments" USING btree (
  "payment_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_processing_mode_gin" ON "order"."payments" USING gin (
  "processing_mode" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_payments_purge_date" ON "order"."payments" USING btree (
  "purge_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_payments_status_id" ON "order"."payments" USING hash (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_payments_updated_at" ON "order"."payments" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table payments
-- ----------------------------
ALTER TABLE "order"."payments" ADD CONSTRAINT "payments_payment_id_key" UNIQUE ("payment_id");

-- ----------------------------
-- Primary Key structure for table payments
-- ----------------------------
ALTER TABLE "order"."payments" ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table quantity_details
-- ----------------------------
CREATE INDEX "idx_quantity_details_change_log_gin" ON "order"."quantity_details" USING gin (
  "change_log" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "idx_quantity_details_created_at" ON "order"."quantity_details" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_item_id" ON "order"."quantity_details" USING hash (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_quantity_details_item_uom_quantity_composite" ON "order"."quantity_details" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "quantity" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_order_id" ON "order"."quantity_details" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_order_id_btree" ON "order"."quantity_details" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_order_line_id" ON "order"."quantity_details" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_order_line_id_btree" ON "order"."quantity_details" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_order_orderline_composite" ON "order"."quantity_details" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_org_id" ON "order"."quantity_details" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_quantity_details_org_item_composite" ON "order"."quantity_details" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_process" ON "order"."quantity_details" USING hash (
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE UNIQUE INDEX "idx_quantity_details_quantity_detail_id" ON "order"."quantity_details" USING btree (
  "quantity_detail_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_quantity_details_quantity_detail_id_unique" ON "order"."quantity_details" USING btree (
  "quantity_detail_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_reason_substitution_created_composite" ON "order"."quantity_details" USING btree (
  "reason_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "substitution_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_reason_type" ON "order"."quantity_details" USING hash (
  "reason_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_quantity_details_status_id" ON "order"."quantity_details" USING hash (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_quantity_details_status_process_composite" ON "order"."quantity_details" USING btree (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_quantity_details_substitution_type" ON "order"."quantity_details" USING hash (
  "substitution_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_quantity_details_uom" ON "order"."quantity_details" USING hash (
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_quantity_details_updated_at" ON "order"."quantity_details" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_change_log" ON "order"."quantity_details" USING gin (
  "change_log" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "quantity_details_item_id" ON "order"."quantity_details" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_order_id" ON "order"."quantity_details" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_order_line_id" ON "order"."quantity_details" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_org_id" ON "order"."quantity_details" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_process" ON "order"."quantity_details" USING btree (
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_quantity_detail_id" ON "order"."quantity_details" USING btree (
  "quantity_detail_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "quantity_details_status" ON "order"."quantity_details" USING gin (
  "status" "pg_catalog"."jsonb_ops"
);
CREATE INDEX "quantity_details_status_id" ON "order"."quantity_details" USING btree (
  "status_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table quantity_details
-- ----------------------------
ALTER TABLE "order"."quantity_details" ADD CONSTRAINT "quantity_details_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table release_lines
-- ----------------------------
CREATE INDEX "idx_release_lines_allocation_id" ON "order"."release_lines" USING btree (
  "allocation_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_allocation_id_btree" ON "order"."release_lines" USING btree (
  "allocation_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_allocation_rank_composite" ON "order"."release_lines" USING btree (
  "allocation_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "effective_rank" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_cancelled_date" ON "order"."release_lines" USING btree (
  "cancelled_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_created_at" ON "order"."release_lines" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_effective_rank" ON "order"."release_lines" USING btree (
  "effective_rank" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_item_id" ON "order"."release_lines" USING hash (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_release_lines_item_uom_composite" ON "order"."release_lines" USING btree (
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_order_id" ON "order"."release_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_order_id_btree" ON "order"."release_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_order_line_id" ON "order"."release_lines" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_order_line_id_btree" ON "order"."release_lines" USING btree (
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_order_orderline_composite" ON "order"."release_lines" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "order_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_org_id" ON "order"."release_lines" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_release_lines_org_item_composite" ON "order"."release_lines" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "item_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_process" ON "order"."release_lines" USING hash (
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_release_lines_process_cancelled_composite" ON "order"."release_lines" USING btree (
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "cancelled_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_quantity_fulfilled_cancelled_composite" ON "order"."release_lines" USING btree (
  "quantity" "pg_catalog"."numeric_ops" ASC NULLS LAST,
  "fulfilled_quantity" "pg_catalog"."numeric_ops" ASC NULLS LAST,
  "cancelled_quantity" "pg_catalog"."numeric_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_release_id" ON "order"."release_lines" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_release_id_btree" ON "order"."release_lines" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_release_line_id" ON "order"."release_lines" USING btree (
  "release_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_release_line_id_btree" ON "order"."release_lines" USING btree (
  "release_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_release_releaseline_composite" ON "order"."release_lines" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "release_line_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_release_lines_uom" ON "order"."release_lines" USING hash (
  "uom" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_release_lines_updated_at" ON "order"."release_lines" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table release_lines
-- ----------------------------
ALTER TABLE "order"."release_lines" ADD CONSTRAINT "release_lines_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table releases
-- ----------------------------
CREATE INDEX "idx_releases_carrier_code" ON "order"."releases" USING hash (
  "carrier_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_carrier_service_composite" ON "order"."releases" USING btree (
  "carrier_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "service_level_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_created_at" ON "order"."releases" USING btree (
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_delivery_method_id" ON "order"."releases" USING hash (
  "delivery_method_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_effective_rank" ON "order"."releases" USING btree (
  "effective_rank" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_order_id" ON "order"."releases" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_order_id_btree" ON "order"."releases" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_org_carrier_composite" ON "order"."releases" USING btree (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "carrier_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_org_id" ON "order"."releases" USING hash (
  "org_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_process" ON "order"."releases" USING hash (
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_rank_created_composite" ON "order"."releases" USING btree (
  "effective_rank" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "created_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_release_extension_1_gin" ON "order"."releases" USING gin (
  "release_extension_1" "pg_catalog"."jsonb_ops"
);
CREATE UNIQUE INDEX "idx_releases_release_id" ON "order"."releases" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_releases_release_id_unique" ON "order"."releases" USING btree (
  "release_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_release_type" ON "order"."releases" USING hash (
  "release_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_service_level_code" ON "order"."releases" USING hash (
  "service_level_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_ship_from_location_id" ON "order"."releases" USING hash (
  "ship_from_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_ship_from_to_composite" ON "order"."releases" USING btree (
  "ship_from_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ship_to_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_ship_to_location_id" ON "order"."releases" USING hash (
  "ship_to_location_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops"
);
CREATE INDEX "idx_releases_type_process_composite" ON "order"."releases" USING btree (
  "release_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "process" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_releases_updated_at" ON "order"."releases" USING btree (
  "updated_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table releases
-- ----------------------------
ALTER TABLE "order"."releases" ADD CONSTRAINT "releases_release_id_key" UNIQUE ("release_id");

-- ----------------------------
-- Primary Key structure for table releases
-- ----------------------------
ALTER TABLE "order"."releases" ADD CONSTRAINT "releases_pkey" PRIMARY KEY ("id");
