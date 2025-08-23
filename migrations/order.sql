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

 Date: 23/08/2025 01:28:42
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
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '1bca7339-63a0-4c16-886f-e0d4f09a93f7', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', '5bd1668c-e7d4-4e2c-b175-bb2bd92d1ac5', '2025-08-22 05:35:51.977+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 05:35:51.978+00', '2025-08-22 05:35:51.978+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '10-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '3a58c638-fd4b-457f-866e-aa9eb27028db', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'f6ba9301-2ecc-42e2-8a25-9be95f0d87d2', '2025-08-22 05:35:52.03+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 05:35:52.031+00', '2025-08-22 05:35:52.031+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '10-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', 'fc18eb28-bbfc-4f2a-9c1c-c3ad0cca67d1', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8857200469104', 1.0000, 'SPAC', '9688a333-85d2-413d-bf1c-24cd437d52a5', '2025-08-22 05:35:52.088+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 05:35:52.088+00', '2025-08-22 05:35:52.088+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '11-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '849f0837-a18d-4d46-8e85-51fc398206d0', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 06:52:55.475+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 06:52:55.476+00', '2025-08-22 06:52:55.476+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '11-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '72ba0a5b-03c9-400c-a87f-31adf69014b2', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 06:52:55.567+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 06:52:55.568+00', '2025-08-22 06:52:55.568+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '11-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '8c2df1dd-e320-4cd2-981a-8677a99fa8dc', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Grab', '2025-08-22 06:52:55.624+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 06:52:55.625+00', '2025-08-22 06:52:55.625+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '12-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', 'ce9ce3b1-4509-4ed2-8337-604c168f6953', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 07:45:55.058+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 07:45:55.059+00', '2025-08-22 07:45:55.059+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '12-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '58214586-fc4b-4059-ab9d-0c85fa0b322d', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 07:45:55.107+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 07:45:55.108+00', '2025-08-22 07:45:55.108+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (9, '12-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '9b55acc7-60b6-4453-8cd3-c50b88ac860d', 'STANDARD', 'Allocated', 'CFR99999', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Grab', '2025-08-22 07:45:55.151+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 07:45:55.151+00', '2025-08-22 07:45:55.151+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (10, '13-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '8863dce3-468c-4a04-8dea-f21f137f334f', 'STANDARD', 'Open', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 08:18:51.095+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:18:51.096+00', '2025-08-22 08:18:51.096+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (11, '13-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '91b17ed6-6d38-46c2-a720-cc43ae31c2f4', 'STANDARD', 'Open', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 08:18:51.152+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:18:51.153+00', '2025-08-22 08:18:51.153+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (12, '13-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '926dbca4-fa59-4d56-84ee-22eab4a60a5b', 'STANDARD', 'Open', 'CFR99999', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Grab', '2025-08-22 08:18:51.204+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:18:51.205+00', '2025-08-22 08:18:51.205+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (13, '123456789-C7L2LCDCTCC2AE', '000-0-0', 'a883283c-db34-4283-9ce3-9ee49e852890', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 'Grab', '2025-08-22 08:25:22.745+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:25:22.746+00', '2025-08-22 08:25:22.746+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (14, '123456789-C7L2LCDCTCC2AE', '001-1-1', '64fe1a06-9a41-4ed0-95a1-3dfad6f8a1e5', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', 'Grab', '2025-08-22 08:25:22.792+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:25:22.793+00', '2025-08-22 08:25:22.793+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (15, '123456789-C7L2LCDCTCC2AE', '002-2-2', '36d6fe16-b404-44d8-8fb8-f3c9205132b8', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 'Grab', '2025-08-22 08:25:22.885+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:25:22.886+00', '2025-08-22 08:25:22.886+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (16, '123456789-C7L2LRMHV2KWT1', '000-0-0', '10cb2d60-441a-46d7-a275-f159f1546f1c', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 'Grab', '2025-08-22 09:17:43.054+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:43.055+00', '2025-08-22 09:17:43.055+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (17, '123456789-C7L2LRMHV2KWT1', '001-1-1', '3847a84b-1dff-4a96-9d6f-832c41d6d12e', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 'Grab', '2025-08-22 09:17:43.179+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:43.18+00', '2025-08-22 09:17:43.18+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (18, '123456789-C7L2LRMHV2KWT1', '002-2-2', 'e902c0f7-a5e3-44e4-96be-8ebc9a02ad71', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', 'Grab', '2025-08-22 09:17:43.243+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:43.243+00', '2025-08-22 09:17:43.243+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (19, '123456789-C7L2LRMHV2KWT1', '003-3-3', 'ae64c608-5ad6-41db-b9dc-23599182b70c', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 'Grab', '2025-08-22 09:17:43.291+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:43.291+00', '2025-08-22 09:17:43.291+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (20, '123456789-C7L2LRMHV2KWT1', '004-4-4', '3a42603d-6bae-4ea6-a60a-8fab45e65762', 'STANDARD', 'Open', 'CFM6470', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 'Grab', '2025-08-22 09:17:43.338+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:43.338+00', '2025-08-22 09:17:43.338+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (21, '14-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '8a724f42-8cc1-4098-ab9f-a6be792243d4', 'STANDARD', 'Open', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 09:39:42.992+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:39:42.993+00', '2025-08-22 09:39:42.993+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (22, '14-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '073e47f5-1af4-49f9-89c8-9bb89119c060', 'STANDARD', 'Open', 'CFR99999', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Grab', '2025-08-22 09:39:43.057+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:39:43.057+00', '2025-08-22 09:39:43.057+00', 'system', 'system');
INSERT INTO "order"."allocations" ("id", "order_id", "order_line_id", "allocation_id", "allocation_type", "status_id", "ship_from_location_id", "org_id", "item_id", "quantity", "uom", "carrier_code", "allocated_on", "reservation_request_id", "reservation_request_detail_id", "ship_to_location_id", "country_of_origin", "inventory_segment_id", "inventory_type_id", "substitution_type_id", "allocation_dependency_id", "group_id", "product_status_id", "ship_via_id", "asn_id", "asn_detail_id", "service_level_code", "process", "batch_number", "is_virtual", "earliest_delivery_date", "earliest_ship_date", "committed_delivery_date", "committed_ship_date", "latest_ship_date", "latest_release_date", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (23, '14-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '8dcd1452-8b86-435c-b14d-af5aef768ce1', 'STANDARD', 'Open', 'CFR99999', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Grab', '2025-08-22 09:39:43.109+00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:39:43.11+00', '2025-08-22 09:39:43.11+00', 'system', 'system');
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
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '123456789-C7L2LCDCTCC2AE', '000-0-0', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'RLN_4a627e6a-91a3-4512-9c6b-a0fa5ec9db93', 'WY20230729010', '', 'Ship', '0000093362986', 1.0000, 'SPCS', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "1"}', '2025-08-22 09:02:55.674+00', '2025-08-22 09:02:55.674+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '123456789-C7L2LCDCTCC2AE', '001-1-1', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'RLN_83a90ab6-9312-4dc1-96b3-23cbb40ee060', 'WY20230729010', '', 'Ship', '4901133618567', 1.0000, 'SPCS', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "2"}', '2025-08-22 09:02:56.135+00', '2025-08-22 09:02:56.135+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '123456789-C7L2LCDCTCC2AE', '002-2-2', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'RLN_9c8e6868-858a-41bf-b559-86a1c702b095', 'WY20230729010', '', 'Ship', '8850124003850', 12.0000, 'SBTL', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "3"}', '2025-08-22 09:02:56.663+00', '2025-08-22 09:02:56.663+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '123456789-C7L2LRMHV2KWT1', '000-0-0', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_cf12ebac-016b-46a6-8bbf-24309bc981ad', '', '', 'Short', '0000093362986', 1.0000, 'SPCS', '9000', '3000.000', '{}', '2025-08-22 09:45:04.874+00', '2025-08-22 09:45:04.874+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (9, '123456789-C7L2LRMHV2KWT1', '004-4-4', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_37d8e9ca-e4ba-4eb2-b993-e7ba79f7c4f5', '', '', 'Short', '8850124003850', 12.0000, 'SPCS', '9000', '3000.000', '{}', '2025-08-22 09:45:05.407+00', '2025-08-22 09:45:05.407+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (10, '123456789-C7L2LRMHV2KWT1', '001-1-1', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_da711bb6-72e8-4676-b938-ad8419f932ff', 'WY20230729010', '', 'Ship', '0000093362986', 1.0000, 'SPCS', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "1"}', '2025-08-22 09:58:36.183+00', '2025-08-22 09:58:36.183+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (11, '123456789-C7L2LRMHV2KWT1', '001-1-1', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_da711bb6-72e8-4676-b938-ad8419f932ff', 'WY20230729010', '', 'Ship', '0000093362986', 1.0000, 'SPCS', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "1"}', '2025-08-22 10:01:27.299+00', '2025-08-22 10:01:27.299+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (12, '123456789-C7L2LRMHV2KWT1', '002-2-2', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_a2440ba9-0708-4509-bd66-e2fe6ca02577', 'WY20230729010', '', 'Ship', '4901133618567', 1.0000, 'SPCS', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "1"}', '2025-08-22 10:01:27.73+00', '2025-08-22 10:01:27.73+00', NULL, NULL);
INSERT INTO "order"."fulfillment_details" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "fulfillment_id", "fulfillment_group_id", "event_type_id", "item_id", "quantity", "uom", "status_id", "short_reason_id", "fulfillment_info", "created_at", "updated_at", "created_by", "updated_by") VALUES (13, '123456789-C7L2LRMHV2KWT1', '003-3-3', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_5a7094d0-7597-43e5-8632-be345f888774', 'WY20230729010', '', 'Ship', '8850124003850', 12.0000, 'SBTL', '7000', '', '{"PackageId": "UM1122334455", "ShipmentId": "UM1122334455", "CarrierCode": "UPS", "TrackingURL": "https://th.kerryexpress.com/th/track/?track=UM2022040016TH", "FulfillmentId": "WY20230729010", "TrackingNumber": "UM1122334455TH", "ServiceLevelCode": "UPS_STANDARD", "FulfillmentDetailId": "1"}', '2025-08-22 10:01:28.238+00', '2025-08-22 10:01:28.238+00', NULL, NULL);
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
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 05:35:51.62+00', '2025-08-22 05:35:51.62+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '10-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 05:35:51.62+00', '2025-08-22 05:35:51.62+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '10-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8857200469104', 'แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 35.0000, 39.0000, 35.0000, 35.0000, 2.2800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "3-CZDEEY43ATN1N2-C7EFKCCVE8MKA2-86534337", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -4, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-002-2", "IsInformational": true, "RequestedAmount": -4, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.28, "TaxTypeId": "VAT", "TaxableAmount": 32.71, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "฿4 off แอสโปรนีหน้ากากอนามัยนำเข้าแพค 5ชิ้น AsproniDisposableImportMask X5", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "ProductNameTH": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "PromotionType": "undefined", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 05:35:51.62+00', '2025-08-22 05:35:51.62+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '11-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 06:52:55.176+00', '2025-08-22 06:52:55.176+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '11-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 06:52:55.176+00', '2025-08-22 06:52:55.176+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '11-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8857200469104', 'แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 35.0000, 39.0000, 35.0000, 35.0000, 2.2800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "3-CZDEEY43ATN1N2-C7EFKCCVE8MKA2-86534337", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -4, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-002-2", "IsInformational": true, "RequestedAmount": -4, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.28, "TaxTypeId": "VAT", "TaxableAmount": 32.71, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "฿4 off แอสโปรนีหน้ากากอนามัยนำเข้าแพค 5ชิ้น AsproniDisposableImportMask X5", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "ProductNameTH": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "PromotionType": "undefined", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 06:52:55.176+00', '2025-08-22 06:52:55.176+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '12-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 07:45:54.789+00', '2025-08-22 07:45:54.789+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '12-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 07:45:54.789+00', '2025-08-22 07:45:54.789+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (9, '12-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8857200469104', 'แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 35.0000, 39.0000, 35.0000, 35.0000, 2.2800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "3-CZDEEY43ATN1N2-C7EFKCCVE8MKA2-86534337", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -4, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-002-2", "IsInformational": true, "RequestedAmount": -4, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.28, "TaxTypeId": "VAT", "TaxableAmount": 32.71, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "฿4 off แอสโปรนีหน้ากากอนามัยนำเข้าแพค 5ชิ้น AsproniDisposableImportMask X5", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "ProductNameTH": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "PromotionType": "undefined", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 07:45:54.789+00', '2025-08-22 07:45:54.789+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (10, '13-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 08:18:50.801+00', '2025-08-22 08:18:50.801+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (11, '13-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 08:18:50.801+00', '2025-08-22 08:18:50.801+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (12, '13-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8857200469104', 'แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 35.0000, 39.0000, 35.0000, 35.0000, 2.2800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "3-CZDEEY43ATN1N2-C7EFKCCVE8MKA2-86534337", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -4, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-002-2", "IsInformational": true, "RequestedAmount": -4, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.28, "TaxTypeId": "VAT", "TaxableAmount": 32.71, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "฿4 off แอสโปรนีหน้ากากอนามัยนำเข้าแพค 5ชิ้น AsproniDisposableImportMask X5", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "ProductNameTH": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "PromotionType": "undefined", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 08:18:50.801+00', '2025-08-22 08:18:50.801+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (16, '123456789-C7L2LCDCTCC2AE', '000-0-0', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '7000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, NULL, 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '7000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_123456789-C7L2LCDCTCC2AE", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LCDCTCC2AE-000-0", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿10 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LCDCTCC2AE", "SlotBookingTo": "2025-08-22T16:51:02.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T15:51:02.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 08:25:22.482+00', '2025-08-22 09:02:56.703+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (17, '123456789-C7L2LCDCTCC2AE', '001-1-1', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '7000', NULL, 'CFM6470', '4901133618567', 'เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g', 'f', 't', 'f', 'f', NULL, NULL, 'SPCS', 1.0000, 17.0000, 17.0000, 17.0000, 17.0000, 1.1100, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '7000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_123456789-C7L2LCDCTCC2AE", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 1.11, "TaxTypeId": "VAT", "TaxableAmount": 15.88, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "ProductNameTH": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "PromotionType": "", "SlotBookingId": "123456789-C7L2LCDCTCC2AE", "SlotBookingTo": "2025-08-22T16:51:02.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T15:51:02.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 08:25:22.482+00', '2025-08-22 09:02:56.703+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (18, '123456789-C7L2LCDCTCC2AE', '002-2-2', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '7000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, NULL, 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '7000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_123456789-C7L2LCDCTCC2AE", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LCDCTCC2AE", "SlotBookingTo": "2025-08-22T16:51:02.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T15:51:02.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-22 08:25:22.482+00', '2025-08-22 09:02:56.815+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (24, '14-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 09:39:42.75+00', '2025-08-22 09:39:42.75+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (25, '14-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8853474045150', 'สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 41.0000, 41.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "ProductNameTH": "สมาร์ทเตอร์ถุงมือ M X10 Smarter Latex Gloves M X10", "PromotionType": "", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 09:39:42.75+00', '2025-08-22 09:39:42.75+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (26, '14-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '3-CZDEEY43ATN1N2', 'Standard Delivery', NULL, '1000', '1000', NULL, 'CFR99999', '8857200469104', 'แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5', 'f', 't', 'f', 'f', NULL, NULL, 'SPAC', 1.0000, 35.0000, 39.0000, 35.0000, 35.0000, 2.2800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', 'Open', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_SAN6-423924816-C7EJNB23JAUDN2", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "3-CZDEEY43ATN1N2-C7EFKCCVE8MKA2-86534337", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -4, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-002-2", "IsInformational": true, "RequestedAmount": -4, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.28, "TaxTypeId": "VAT", "TaxableAmount": 32.71, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFR99999"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "฿4 off แอสโปรนีหน้ากากอนามัยนำเข้าแพค 5ชิ้น AsproniDisposableImportMask X5", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "ProductNameTH": "แอสโปรนีหน้ากากนำเข้า X5 AsproniDisposableImportMask X5", "PromotionType": "undefined", "SlotBookingId": "SAN6-423924816-C7EJNB23JAUDN2", "SlotBookingTo": "2025-06-02T19:08:39.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-06-02T18:08:39.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 09:39:42.75+00', '2025-08-22 09:39:42.75+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (19, '123456789-C7L2LRMHV2KWT1', '000-0-0', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '9000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, NULL, 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '9000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R02_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-000-0", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿20 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 09:17:42.733+00', '2025-08-22 10:01:28.283+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (23, '123456789-C7L2LRMHV2KWT1', '004-4-4', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '9000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, NULL, 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '9000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R06_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-22 09:17:42.733+00', '2025-08-22 10:01:28.283+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (20, '123456789-C7L2LRMHV2KWT1', '001-1-1', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '7000', NULL, 'CFM6470', '0000093362986', 'ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g', 'f', 't', 'f', 'f', NULL, NULL, 'SPCS', 1.0000, 41.0000, 51.0000, 41.0000, 41.0000, 2.6800, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '7000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R03_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[{"Extended": {"TaxRate": 0.07, "ChargeDesc": "GFSBPOS-111-113-C7L2JZC1RPE1JN-87603935", "JdaDiscCode": "", "PromotionId": null, "CRCTaxAmount": null, "PromotionType": null, "PlatformAbsorb": true}, "ChargeType": {"ChargeTypeId": "Discount"}, "DiscountOn": {"DiscountOnId": "ItemPrice"}, "ChargeTotal": -10, "ChargePercent": null, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-001-1", "IsInformational": true, "RequestedAmount": -10, "ChargeDisplayName": "Product Discount Promotion"}]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 2.68, "TaxTypeId": "VAT", "TaxableAmount": 38.31, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "ลด ฿20 สำหรับ ซีซาร์รสเนื้อและตับ 100กรัม", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "ProductNameTH": "ซีซาร์รสเนื้อและตับ 100ก CesarBeef And LiverFlavor 100g", "PromotionType": "undefined", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 09:17:42.733+00', '2025-08-22 10:01:28.283+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (21, '123456789-C7L2LRMHV2KWT1', '002-2-2', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '7000', NULL, 'CFM6470', '4901133618567', 'เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g', 'f', 't', 'f', 'f', NULL, NULL, 'SPCS', 1.0000, 17.0000, 17.0000, 17.0000, 17.0000, 1.1100, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '7000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R04_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 1.11, "TaxTypeId": "VAT", "TaxableAmount": 15.88, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": false, "BundleRefId": null, "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 0, "PackUnitPrice": null, "ProductNameEN": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "ProductNameTH": "เชาว์คัทสึโอะไก่และปลาโอ 40ก CiaoKatsuoChickenAndBonito40g", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 0, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "-"}}', NULL, NULL, 1, 't', '2025-08-22 09:17:42.733+00', '2025-08-22 10:01:28.283+00', NULL, NULL);
INSERT INTO "order"."order_lines" ("id", "order_id", "order_line_id", "release_group_id", "shipping_method_id", "fulfillment_group_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "ship_to_location_id", "ship_from_address_id", "item_id", "item_description", "is_gift", "is_tax_included", "is_pre_order", "is_cancelled", "promised_delivery_date", "small_image_uri", "uom", "quantity", "unit_price", "original_unit_price", "order_line_sub_total", "order_line_total", "order_line_tax_total", "max_appeasement_amount", "total_discount_on_item", "total_discounts", "total_charges", "cancelled_order_line_sub_total", "cancelled_total_discounts", "fulfillment_status", "order_line_status", "delivery_method", "order_line_note", "order_line_charge_detail", "order_line_tax_detail", "order_line_promising_info", "ship_to_address", "order_line_extension1", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (22, '123456789-C7L2LRMHV2KWT1', '003-3-3', 'GFSBPOS-111-113', 'Standard Delivery', NULL, '7000', '7000', NULL, 'CFM6470', '8850124003850', 'เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml', 'f', 't', 'f', 'f', NULL, NULL, 'SBTL', 12.0000, 5.8300, 5.8300, 69.9600, 69.9600, 4.5700, NULL, 0.0000, 0.0000, 0.0000, NULL, NULL, 'Open', '7000', '{"DeliveryMethodId": "ShipToAddress"}', '[{"NoteId": "R05_123456789-C7L2LRMHV2KWT1", "NoteText": "", "NoteType": {"NoteTypeId": "0006"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', '[]', '[{"TaxCode": null, "TaxRate": 0.07, "TaxAmount": 4.57, "TaxTypeId": "VAT", "TaxableAmount": 65.42, "IsInformational": true}]', '{"IsForceAllocate": true, "ShipFromLocationId": "CFM6470"}', '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}, "IsAddressVerified": true}', '{"Extended": {"IsGWP": false, "IsBundle": true, "BundleRefId": "8850124003874", "PromotionId": "", "IsWeightItem": false, "NumberOfPack": 1, "PackUnitPrice": 70, "ProductNameEN": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "ProductNameTH": "เพียวไลฟ์น้ำดื่ม 600มล Pure Life Drinking Water 600ml", "PromotionType": "", "SlotBookingId": "123456789-C7L2LRMHV2KWT1", "SlotBookingTo": "2025-08-22T17:42:47.000Z", "IsGiftWrapping": false, "IsSubstitution": false, "PackOrderedQty": 12, "SlotBookingFrom": "2025-08-22T16:42:47.000Z", "PackItemDescriptionTH": "เพียวไลฟ์น้ำดื่ม 600มล X12 PureLifeDrinkingWater 600mlX12"}}', NULL, NULL, 1, 't', '2025-08-22 09:17:42.733+00', '2025-08-22 10:01:28.394+00', NULL, NULL);
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
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', 'GM-366', NULL, NULL, 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFR', 'SAN6-423924816-C7EJNB23JAUDN2', '1000', '1000', 117.0000, 125.7800, 8.0000, 0.0000, 0.7800, NULL, 'f', 't', 'f', 'th', 'Open', 'Open', 'Awaiting Payment Info', NULL, '2025-06-02 10:38:39+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 12, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -4, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.78, "TaxTypeId": "VAT", "TaxableAmount": 11.21, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GM-366", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 05:35:51.565+00', '2025-08-22 05:35:51.565+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '11-SAN6-423924816-C7EJNB23JAUDN2', 'GM-366', NULL, NULL, 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFR', 'SAN6-423924816-C7EJNB23JAUDN2', '1000', '1000', 117.0000, 125.7800, 8.0000, 0.0000, 0.7800, NULL, 'f', 't', 'f', 'th', 'Open', 'Open', 'Awaiting Payment Info', NULL, '2025-06-02 10:38:39+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 12, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -4, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.78, "TaxTypeId": "VAT", "TaxableAmount": 11.21, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GM-366", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 06:52:55.13+00', '2025-08-22 06:52:55.13+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '12-SAN6-423924816-C7EJNB23JAUDN2', 'GM-366', NULL, NULL, 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFR', 'SAN6-423924816-C7EJNB23JAUDN2', '1000', '1000', 117.0000, 125.7800, 8.0000, 0.0000, 0.7800, NULL, 'f', 't', 'f', 'th', 'Open', 'Open', 'Awaiting Payment Info', NULL, '2025-06-02 10:38:39+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 12, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -4, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.78, "TaxTypeId": "VAT", "TaxableAmount": 11.21, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GM-366", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 07:45:54.744+00', '2025-08-22 07:45:54.744+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '13-SAN6-423924816-C7EJNB23JAUDN2', 'GM-366', NULL, NULL, 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFR', 'SAN6-423924816-C7EJNB23JAUDN2', '1000', '1000', 117.0000, 125.7800, 8.0000, 0.0000, 0.7800, NULL, 'f', 't', 'f', 'th', 'Open', 'Open', 'Awaiting Payment Info', NULL, '2025-06-02 10:38:39+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 12, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -4, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.78, "TaxTypeId": "VAT", "TaxableAmount": 11.21, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GM-366", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 08:18:50.751+00', '2025-08-22 08:18:50.751+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '123456789-C7L2LCDCTCC2AE', 'GF-8718', NULL, NULL, 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFM-UAT', '123456789-C7L2LCDCTCC2AE', '7000', '7000', 127.9600, 128.6100, 0.0000, 0.0000, 0.6500, NULL, 'f', 't', 'f', 'th', 'Fulfilled', 'Open', 'Awaiting Payment Info', NULL, '2025-08-22 08:21:02+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 10, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LCDCTCC2AE", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -10, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LCDCTCC2AE-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LCDCTCC2AE-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.65, "TaxTypeId": "VAT", "TaxableAmount": 9.34, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GF-8718", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 08:25:22.438+00', '2025-08-22 09:02:56.929+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '14-SAN6-423924816-C7EJNB23JAUDN2', 'GM-366', NULL, NULL, 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFR', 'SAN6-423924816-C7EJNB23JAUDN2', '1000', '1000', 117.0000, 125.7800, 8.0000, 0.0000, 0.7800, NULL, 'f', 't', 'f', 'th', 'Open', 'Open', 'Awaiting Payment Info', NULL, '2025-06-02 10:38:39+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "BranchNo": "", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 12, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -4, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "SAN6-423924816-C7EJNB23JAUDN2-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.78, "TaxTypeId": "VAT", "TaxableAmount": 11.21, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GM-366", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 09:39:42.7+00', '2025-08-22 09:39:42.7+00', 'system', 'system');
INSERT INTO "order"."orders" ("id", "order_id", "short_order_number", "customer_type_id", "customer_id", "customer_email", "customer_first_name", "customer_last_name", "customer_phone", "currency_code", "selling_channel", "org_id", "alternate_order_id", "max_fulfillment_status_id", "min_fulfillment_status_id", "order_sub_total", "order_total", "total_charges", "total_discounts", "total_taxes", "cancelled_order_sub_total", "is_on_hold", "cancel_allowed", "is_cancelled", "order_locale", "order_status", "fulfillment_status", "payment_status", "do_not_release_before", "captured_date", "doc_type", "order_hold", "order_actions", "order_extension1", "order_charge_detail", "order_tax_detail", "order_type", "order_note", "cancel_reason", "change_log", "parent_id", "version", "is_active", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '123456789-C7L2LRMHV2KWT1', 'GF-6271', 'The1Number', '9999', 'undefined', 'Grab Customer', '-', '0101010122', 'THB', 'Grab', 'CFM-UAT', '123456789-C7L2LRMHV2KWT1', '7000', '7000', 238.9200, 229.5700, -10.0000, 0.0000, 0.6500, NULL, 'f', 't', 'f', 'th', 'Fulfilled', 'Open', 'Awaiting Payment Info', NULL, '2025-08-22 09:12:47+00', '{"DocTypeId": "CustomerOrder"}', '[{"StatusId": "2000", "HoldTypeId": "AwaitingPayment", "ResolveReasonId": "AcceptPayment"}]', '{"IsAlreadyTaxed": true, "IsAlreadyPriced": true, "IsAlreadyCharged": true}', '{"Extended": {"TaxId": "", "CustRef": "2011020007247934", "BranchNo": "", "T1Number": "2011020007247934", "CompanyName": "", "CancelAllowed": true, "IsPSConfirmed": true, "FullTaxInvoice": false, "ConfirmPaymentId": "Cash On Delivery", "AllowSubstitution": true, "ExternalMPSellerId": null}}', '[{"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 10, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1", "IsInformational": true, "ChargeDisplayName": "Free", "ChargeReferenceId": ""}, {"ChargeType": {"ChargeTypeId": "Discount"}, "ChargeTotal": -20, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-Discount", "IsInformational": true, "ChargeDisplayName": "Discount Promotion"}, {"ChargeType": {"ChargeTypeId": "Shipping"}, "ChargeTotal": 0, "IsPostReturn": true, "IsTaxIncluded": true, "ChargeDetailId": "123456789-C7L2LRMHV2KWT1-ShippingFeeDiscount", "IsInformational": true, "ChargeDisplayName": "Shipping Fee Discount"}]', '[{"TaxCode": "SHIPPING", "TaxRate": 0.07, "TaxAmount": 0.65, "TaxTypeId": "VAT", "TaxableAmount": 9.34, "IsInformational": true}]', '{"OrderTypeId": "MKP-HD-STD"}', '[{"NoteText": "GF-6271", "NoteType": {"NoteTypeId": "0004"}, "NoteCategory": {"NoteCategoryId": "CustomerCommunication"}}]', NULL, NULL, NULL, 1, 't', '2025-08-22 09:17:42.673+00', '2025-08-22 10:01:28.511+00', 'system', 'system');
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
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', '10-7f4c5bd2-97f1-4afe-975d-09a86111176b', '10-7f4c5bd2-97f1-4afe-975d-09a86111176b', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10-SAN6-423924816-C7EJNB23JAUDN2', NULL, NULL, NULL, NULL, NULL, 'CFR', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 117.0000, NULL, 117.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 05:35:51.823+00', '2025-08-22 05:35:51.823+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '11-SAN6-423924816-C7EJNB23JAUDN2', '11-7f4c5bd2-97f1-4afe-975d-09a86111176b', '11-7f4c5bd2-97f1-4afe-975d-09a86111176b', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11-SAN6-423924816-C7EJNB23JAUDN2', NULL, NULL, NULL, NULL, NULL, 'CFR', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 117.0000, NULL, 117.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 06:52:55.381+00', '2025-08-22 06:52:55.381+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '12-SAN6-423924816-C7EJNB23JAUDN2', '12-7f4c5bd2-97f1-4afe-975d-09a86111176b', '12-7f4c5bd2-97f1-4afe-975d-09a86111176b', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12-SAN6-423924816-C7EJNB23JAUDN2', NULL, NULL, NULL, NULL, NULL, 'CFR', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 117.0000, NULL, 117.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 07:45:54.973+00', '2025-08-22 07:45:54.973+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '13-SAN6-423924816-C7EJNB23JAUDN2', '13-7f4c5bd2-97f1-4afe-975d-09a86111176b', '13-7f4c5bd2-97f1-4afe-975d-09a86111176b', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13-SAN6-423924816-C7EJNB23JAUDN2', NULL, NULL, NULL, NULL, NULL, 'CFR', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 117.0000, NULL, 117.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 08:18:50.992+00', '2025-08-22 08:18:50.992+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '123456789-C7L2LCDCTCC2AE', '7991a525-e6c8-4086-b739-73ca3bfca903', '7991a525-e6c8-4086-b739-73ca3bfca903', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456789-C7L2LCDCTCC2AE', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 128.0000, NULL, 128.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 08:25:22.657+00', '2025-08-22 08:25:22.657+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '123456789-C7L2LRMHV2KWT1', 'c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'c0a07488-f317-4ca8-bd0a-f3d137d95b0c', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456789-C7L2LRMHV2KWT1', NULL, NULL, NULL, NULL, NULL, 'CFM-UAT', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 239.0000, NULL, 239.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 09:17:42.949+00', '2025-08-22 09:17:42.949+00', 'system', 'system');
INSERT INTO "order"."payment_methods" ("id", "order_id", "payment_id", "payment_method_id", "messages", "currency_code", "alternate_currency_amount", "account_number", "account_display_number", "name_on_card", "swipe_data", "card_expiry_month", "card_expiry_year", "gift_card_pin", "customer_signature", "customer_pay_signature", "charge_sequence", "routing_number", "routing_display_number", "check_number", "drivers_license_number", "drivers_license_state", "drivers_license_country", "business_name", "business_tax_id", "check_quantity", "original_amount", "parent_order_id", "parent_payment_group_id", "parent_payment_method_id", "gateway_account_id", "location_id", "transaction_reference_id", "org_id", "entry_type_id", "gateway_id", "captured_source", "shopper_reference", "suggested_amount", "purge_date", "account_type", "payment_category", "amount", "current_auth_amount", "current_settled_amount", "current_refund_amount", "current_failed_amount", "merchandise_amount", "change_amount", "conversion_rate", "captured_in_edge_mode", "is_suspended", "is_voided", "is_copied", "is_modifiable", "actions", "billing_address", "payment_method_attribute", "payment_method_encr_attribute", "payment_type", "card_type", "extended", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '14-SAN6-423924816-C7EJNB23JAUDN2', '14-7f4c5bd2-97f1-4afe-975d-09a86111176b', '14-7f4c5bd2-97f1-4afe-975d-09a86111176b', NULL, 'THB', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14-SAN6-423924816-C7EJNB23JAUDN2', NULL, NULL, NULL, NULL, NULL, 'CFR', NULL, 'Simulator', NULL, NULL, NULL, NULL, NULL, NULL, 117.0000, NULL, 117.0000, NULL, NULL, NULL, NULL, NULL, 'f', 'f', 'f', 'f', 't', NULL, '{"Address": {"City": "-", "Email": "undefined", "Phone": "0101010122", "State": "-", "TaxId": "", "County": "-", "Country": "TH", "Address1": "Grab Address1", "Address2": "Grab Address2", "Address3": "", "BranchNo": "", "LastName": "-", "FirstName": "Grab Customer", "PostalCode": "99999", "CompanyName": "Grab Customer"}, "Extended": {"AddressRef": "|||4016|TH"}}', NULL, NULL, '{"PaymentTypeId": "Cash On Delivery"}', NULL, '{"AddressRef": "|||4016|TH"}', '2025-08-22 09:39:42.902+00', '2025-08-22 09:39:42.902+00', 'system', 'system');
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
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', '10-7f4c5bd2-97f1-4afe-975d-09a86111176b', '10-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'f', 't', 'f', 't', '10-SAN6-423924816-C7EJNB23JAUDN2', '10-SAN6-423924816-C7EJNB23JAUDN2', '10-SAN6-423924816-C7EJNB23JAUDN2', 117.0000, 117.0000, '2025-06-02 10:38:39+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 05:35:51.876+00', '2025-08-22 05:35:51.876+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '11-SAN6-423924816-C7EJNB23JAUDN2', '11-7f4c5bd2-97f1-4afe-975d-09a86111176b', '11-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'f', 't', 'f', 't', '11-SAN6-423924816-C7EJNB23JAUDN2', '11-SAN6-423924816-C7EJNB23JAUDN2', '11-SAN6-423924816-C7EJNB23JAUDN2', 117.0000, 117.0000, '2025-06-02 10:38:39+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 06:52:55.432+00', '2025-08-22 06:52:55.432+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '12-SAN6-423924816-C7EJNB23JAUDN2', '12-7f4c5bd2-97f1-4afe-975d-09a86111176b', '12-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'f', 't', 'f', 't', '12-SAN6-423924816-C7EJNB23JAUDN2', '12-SAN6-423924816-C7EJNB23JAUDN2', '12-SAN6-423924816-C7EJNB23JAUDN2', 117.0000, 117.0000, '2025-06-02 10:38:39+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 07:45:55.018+00', '2025-08-22 07:45:55.018+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '13-SAN6-423924816-C7EJNB23JAUDN2', '13-7f4c5bd2-97f1-4afe-975d-09a86111176b', '13-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'f', 't', 'f', 't', '13-SAN6-423924816-C7EJNB23JAUDN2', '13-SAN6-423924816-C7EJNB23JAUDN2', '13-SAN6-423924816-C7EJNB23JAUDN2', 117.0000, 117.0000, '2025-06-02 10:38:39+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 08:18:51.044+00', '2025-08-22 08:18:51.044+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '123456789-C7L2LCDCTCC2AE', '7991a525-e6c8-4086-b739-73ca3bfca903', '7991a525-e6c8-4086-b739-73ca3bfca903', 'f', 't', 'f', 't', '123456789-C7L2LCDCTCC2AE', '123456789-C7L2LCDCTCC2AE', '123456789-C7L2LCDCTCC2AE', 128.0000, 128.0000, '2025-08-22 08:21:02+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 08:25:22.703+00', '2025-08-22 08:25:22.703+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '123456789-C7L2LRMHV2KWT1', 'c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'f', 't', 'f', 't', '123456789-C7L2LRMHV2KWT1', '123456789-C7L2LRMHV2KWT1', '123456789-C7L2LRMHV2KWT1', 239.0000, 239.0000, '2025-08-22 09:12:47+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 09:17:43.013+00', '2025-08-22 09:17:43.013+00', 'system', 'system');
INSERT INTO "order"."payment_transactions" ("id", "order_id", "payment_method_id", "payment_transaction_id", "is_activation", "is_active", "is_copied", "is_valid_for_refund", "reconciliation_id", "request_id", "request_token", "processed_amount", "requested_amount", "transaction_date", "payment_response_status", "status", "transmission_status", "transaction_type", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '14-SAN6-423924816-C7EJNB23JAUDN2', '14-7f4c5bd2-97f1-4afe-975d-09a86111176b', '14-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'f', 't', 'f', 't', '14-SAN6-423924816-C7EJNB23JAUDN2', '14-SAN6-423924816-C7EJNB23JAUDN2', '14-SAN6-423924816-C7EJNB23JAUDN2', 117.0000, 117.0000, '2025-06-02 10:38:39+00', '{"PaymentResponseStatusId": "Success"}', '{"PaymentTransactionStatusId": "Closed"}', '{"PaymentTransmissionStatusId": "Closed"}', '{"PaymentTransactionTypeId": "Settlement"}', '2025-08-22 09:39:42.95+00', '2025-08-22 09:39:42.95+00', 'system', 'system');
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
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', '10-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'CFR', NULL, '0cc81698-0da9-4caa-873b-cbd5ac644c5c', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 05:35:51.729+00', '2025-08-22 05:35:51.729+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '11-SAN6-423924816-C7EJNB23JAUDN2', '11-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'CFR', NULL, 'c2e90014-4b6e-4f48-94f6-2544435d7fbc', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 06:52:55.28+00', '2025-08-22 06:52:55.28+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '12-SAN6-423924816-C7EJNB23JAUDN2', '12-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'CFR', NULL, '0287ebac-3c33-4695-82eb-9de559ea80e9', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 07:45:54.891+00', '2025-08-22 07:45:54.891+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '13-SAN6-423924816-C7EJNB23JAUDN2', '13-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'CFR', NULL, '58c68d1e-bed8-453a-9a78-311c048a0c03', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 08:18:50.909+00', '2025-08-22 08:18:50.909+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '123456789-C7L2LCDCTCC2AE', '7991a525-e6c8-4086-b739-73ca3bfca903', 'CFM-UAT', NULL, '1c88efa1-3d1e-4a4b-90d7-8f91a541314c', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 08:25:22.575+00', '2025-08-22 08:25:22.575+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '123456789-C7L2LRMHV2KWT1', 'c0a07488-f317-4ca8-bd0a-f3d137d95b0c', 'CFM-UAT', '9999', '5b125a96-10a0-481f-9675-df8dcae5efc9', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 09:17:42.872+00', '2025-08-22 09:17:42.872+00', 'system', 'system');
INSERT INTO "order"."payments" ("id", "order_id", "payment_id", "org_id", "customer_id", "payment_group_id", "status_id", "message", "is_anonymized", "is_cancelled", "purge_date", "actions", "processing_mode", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '14-SAN6-423924816-C7EJNB23JAUDN2', '14-7f4c5bd2-97f1-4afe-975d-09a86111176b', 'CFR', NULL, 'c0eea461-9952-4a7a-bc3e-1f089d7471ec', 'Not Applicable', NULL, 'f', 'f', NULL, NULL, '{"ProcessingModeId": "ExternalProcessing"}', '2025-08-22 09:39:42.853+00', '2025-08-22 09:39:42.853+00', 'system', 'system');
COMMIT;

-- ----------------------------
-- Table structure for quantity_details
-- ----------------------------
DROP TABLE IF EXISTS "order"."quantity_details";
CREATE TABLE "order"."quantity_details" (
  "id" int4 NOT NULL DEFAULT nextval('"order".quantity_details_id_seq'::regclass),
  "order_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "order_line_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity_detail_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "org_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "item_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" numeric(18,4) NOT NULL,
  "uom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "process" varchar(255) COLLATE "pg_catalog"."default",
  "reason" varchar(255) COLLATE "pg_catalog"."default",
  "reason_type" varchar(255) COLLATE "pg_catalog"."default",
  "substitution_ratio" numeric(18,4),
  "substitution_type" varchar(255) COLLATE "pg_catalog"."default",
  "web_url" varchar(500) COLLATE "pg_catalog"."default",
  "change_log" jsonb,
  "created_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "order"."quantity_details" OWNER TO "omniamgmt";
COMMENT ON COLUMN "order"."quantity_details"."order_id" IS 'Order identifier';
COMMENT ON COLUMN "order"."quantity_details"."order_line_id" IS 'Order line identifier';
COMMENT ON COLUMN "order"."quantity_details"."quantity_detail_id" IS 'Quantity detail identifier (unique)';
COMMENT ON COLUMN "order"."quantity_details"."status_id" IS 'Status identifier';
COMMENT ON COLUMN "order"."quantity_details"."org_id" IS 'Organization identifier';
COMMENT ON COLUMN "order"."quantity_details"."item_id" IS 'Item identifier';
COMMENT ON COLUMN "order"."quantity_details"."quantity" IS 'Quantity';
COMMENT ON COLUMN "order"."quantity_details"."uom" IS 'Unit of measure';
COMMENT ON COLUMN "order"."quantity_details"."process" IS 'Process';
COMMENT ON COLUMN "order"."quantity_details"."reason" IS 'Reason';
COMMENT ON COLUMN "order"."quantity_details"."reason_type" IS 'Reason type';
COMMENT ON COLUMN "order"."quantity_details"."substitution_ratio" IS 'Substitution ratio';
COMMENT ON COLUMN "order"."quantity_details"."substitution_type" IS 'Substitution type';
COMMENT ON COLUMN "order"."quantity_details"."web_url" IS 'Web URL';
COMMENT ON COLUMN "order"."quantity_details"."change_log" IS 'Change log in JSON format';
COMMENT ON COLUMN "order"."quantity_details"."created_at" IS 'Record creation timestamp';
COMMENT ON COLUMN "order"."quantity_details"."updated_at" IS 'Record last update timestamp';
COMMENT ON COLUMN "order"."quantity_details"."created_by" IS 'User who created the record';
COMMENT ON COLUMN "order"."quantity_details"."updated_by" IS 'User who last updated the record';

-- ----------------------------
-- Records of quantity_details
-- ----------------------------
BEGIN;
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '10-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', 'd4887557-0c66-4c30-9754-898ff9ff95ac', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 05:35:51.685+00', '2025-08-22 05:35:51.685+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '10-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '74b46843-d63f-416f-8aba-65c9b20fe838', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 05:35:51.685+00', '2025-08-22 05:35:51.685+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '10-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '3ee98ca0-0b47-463c-b990-47a98c129685', 'Open', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 05:35:51.685+00', '2025-08-22 05:35:51.685+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '11-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '36d1fad5-1719-46d5-a1ad-ae0f145665c2', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 06:52:55.239+00', '2025-08-22 06:52:55.239+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '11-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '7fe7fdc2-bf4d-44a1-a21e-37844287ec40', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 06:52:55.239+00', '2025-08-22 06:52:55.239+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '11-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '9069a01e-dcef-42dc-93cc-548a7c43a3a4', 'Open', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 06:52:55.239+00', '2025-08-22 06:52:55.239+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '12-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '7de9cac4-e880-4651-8201-169197478483', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 07:45:54.846+00', '2025-08-22 07:45:54.846+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '12-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '8b93228f-d3e4-477d-b09d-2508b90127f3', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 07:45:54.846+00', '2025-08-22 07:45:54.846+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (9, '12-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '1acf50f4-08ed-4057-a2f0-ca217d8f4407', 'Open', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 07:45:54.846+00', '2025-08-22 07:45:54.846+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (10, '13-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', '13db0788-3712-4ded-a145-0510718fe669', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:18:50.862+00', '2025-08-22 08:18:50.862+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (11, '13-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '809a7384-b794-4819-aeb6-8832c6c2f243', 'Open', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:18:50.862+00', '2025-08-22 08:18:50.862+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (12, '13-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', '25afb6ab-c1b2-48e4-ab73-d904e824f695', 'Open', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:18:50.862+00', '2025-08-22 08:18:50.862+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (16, '123456789-C7L2LCDCTCC2AE', '000-0-0', 'd5d3e2e0-fac8-4331-904f-4a9cc218b0f4', 'Open', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:25:22.535+00', '2025-08-22 08:25:22.535+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (17, '123456789-C7L2LCDCTCC2AE', '001-1-1', '7c7794ab-2365-4269-9974-da30751638f1', 'Open', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:25:22.535+00', '2025-08-22 08:25:22.535+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (18, '123456789-C7L2LCDCTCC2AE', '002-2-2', 'eb4d8d3b-82cd-4daf-8996-38b34b26a2cb', 'Open', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 08:25:22.535+00', '2025-08-22 08:25:22.535+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (23, '123456789-C7L2LCDCTCC2AE', '000-0-0', '94c030cd-0773-4a70-ab80-77196e70ae72', '3500', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:42:53.416+00', '2025-08-22 08:42:53.416+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (24, '123456789-C7L2LCDCTCC2AE', '001-1-1', 'd2794343-9489-4a94-a337-01b26d901a26', '3500', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:42:53.689+00', '2025-08-22 08:42:53.689+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (25, '123456789-C7L2LCDCTCC2AE', '002-2-2', 'c781d96d-0a03-49ef-9a11-89593cf123a7', '3500', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:42:53.958+00', '2025-08-22 08:42:53.958+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (26, '123456789-C7L2LCDCTCC2AE', '000-0-0', '597cb451-0447-46fb-9dd0-4e5c3dc45a3d', '3600', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:45:24.858+00', '2025-08-22 08:45:24.858+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (27, '123456789-C7L2LCDCTCC2AE', '001-1-1', '7b18bfc5-6fce-4fc3-8a2f-1f77dd05db5d', '3600', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:45:25.135+00', '2025-08-22 08:45:25.135+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (28, '123456789-C7L2LCDCTCC2AE', '002-2-2', 'b8e9477a-eb60-4492-a2ef-c258876c7861', '3600', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:50:40.608+00', '2025-08-22 08:50:40.608+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (29, '123456789-C7L2LCDCTCC2AE', '000-0-0', '82b79ae3-46bb-4653-a8c6-3ed9c395a69d', '3700', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:54:26.737+00', '2025-08-22 08:54:26.737+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (30, '123456789-C7L2LCDCTCC2AE', '001-1-1', 'e2af668b-9d27-486c-b273-e0de975c2701', '3700', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:54:27.007+00', '2025-08-22 08:54:27.007+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (31, '123456789-C7L2LCDCTCC2AE', '002-2-2', '912904e4-12f9-4158-99d6-71aa39c7872b', '3700', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', '', NULL, NULL, NULL, NULL, NULL, '{}', '2025-08-22 08:54:27.273+00', '2025-08-22 08:54:27.273+00', NULL, NULL);
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (32, '123456789-C7L2LRMHV2KWT1', '000-0-0', '48385ebb-e969-47ff-a57e-1469f7982f24', '1000', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:42.807+00', '2025-08-22 09:17:42.807+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (33, '123456789-C7L2LRMHV2KWT1', '001-1-1', 'dd043647-bea4-42d9-aa71-508876b4eaeb', '1000', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:42.807+00', '2025-08-22 09:17:42.807+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (34, '123456789-C7L2LRMHV2KWT1', '002-2-2', '9906a63f-b25c-4d0f-9afb-813971213b8b', '1000', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:42.807+00', '2025-08-22 09:17:42.807+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (35, '123456789-C7L2LRMHV2KWT1', '003-3-3', '97ff75f7-bd04-428e-a63d-9c5026617b7a', '1000', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:42.807+00', '2025-08-22 09:17:42.807+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (36, '123456789-C7L2LRMHV2KWT1', '004-4-4', '0de85d06-da05-4416-a716-2d1743c0ee67', '1000', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:17:42.807+00', '2025-08-22 09:17:42.807+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (37, '14-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', 'ef1a7594-1aab-49ea-accb-29aa14473b93', '1000', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:39:42.805+00', '2025-08-22 09:39:42.805+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (38, '14-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', '94e5933b-502b-4152-80a3-d9ec37696b64', '1000', 'CFR', '8853474045150', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:39:42.805+00', '2025-08-22 09:39:42.805+00', 'system', 'system');
INSERT INTO "order"."quantity_details" ("id", "order_id", "order_line_id", "quantity_detail_id", "status_id", "org_id", "item_id", "quantity", "uom", "process", "reason", "reason_type", "substitution_ratio", "substitution_type", "web_url", "change_log", "created_at", "updated_at", "created_by", "updated_by") VALUES (39, '14-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', 'c52a608f-c5d6-4a53-9e13-fbce459b9929', '1000', 'CFR', '8857200469104', 1.0000, 'SPAC', 'Open', NULL, NULL, NULL, NULL, NULL, NULL, '2025-08-22 09:39:42.805+00', '2025-08-22 09:39:42.805+00', 'system', 'system');
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
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '12-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', 'REL_045b1d5d-9fd7-4cd7-a584-bc48666f3048', 'RLN_21877bf5-d239-4dab-9537-1a86aa678b80', 'ALO_3d95de8c-21ce-4149-923d-0a230a2f1690', 'CFR', '8853474045150', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 07:45:55.29+00', '2025-08-22 07:45:55.29+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '12-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', 'REL_045b1d5d-9fd7-4cd7-a584-bc48666f3048', 'RLN_3d592189-5bce-4d28-bec3-a8f897f9d304', 'ALO_a13fa6a2-fc90-46f8-8770-57d01182613d', 'CFR', '8853474045150', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 07:45:55.29+00', '2025-08-22 07:45:55.29+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '12-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', 'REL_045b1d5d-9fd7-4cd7-a584-bc48666f3048', 'RLN_ae3d664d-33c5-4132-87cc-87bdc7e885a9', 'ALO_0989f55d-e072-4327-8a29-9e0b5aadf775', 'CFR', '8857200469104', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 07:45:55.29+00', '2025-08-22 07:45:55.29+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '13-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', 'REL_84508d66-30b9-449b-a505-81f97cf22ce3', 'RLN_d991de0b-5d95-4400-bbe3-71aefa1ad209', 'ALO_3f1634db-4bf6-49d1-a9da-04ab926e81c3', 'CFR', '8853474045150', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 08:18:51.337+00', '2025-08-22 08:18:51.337+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '13-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', 'REL_84508d66-30b9-449b-a505-81f97cf22ce3', 'RLN_57a26bea-89a5-4fb6-837f-71bcde93cda0', 'ALO_720f8e1d-87d8-42b8-9092-2ccb705525ce', 'CFR', '8853474045150', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 08:18:51.337+00', '2025-08-22 08:18:51.337+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '13-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', 'REL_84508d66-30b9-449b-a505-81f97cf22ce3', 'RLN_6e558479-4d0d-4938-bd7b-3860faadec6a', 'ALO_1090800c-2c52-48b2-baa1-b9ccb17b2748', 'CFR', '8857200469104', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 08:18:51.337+00', '2025-08-22 08:18:51.337+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (7, '123456789-C7L2LCDCTCC2AE', '000-0-0', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'RLN_4a627e6a-91a3-4512-9c6b-a0fa5ec9db93', 'ALO_7cc549df-d653-4b39-89d8-7e30b7fb7d78', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 3.0000, NULL, 0, NULL, NULL, '2025-08-22 08:25:23.005+00', '2025-08-22 09:02:55.258+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (8, '123456789-C7L2LCDCTCC2AE', '001-1-1', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'RLN_83a90ab6-9312-4dc1-96b3-23cbb40ee060', 'ALO_5c41df2f-37eb-41e1-9459-9a0867179919', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', 1.0000, NULL, 0, NULL, NULL, '2025-08-22 08:25:23.005+00', '2025-08-22 09:02:56.052+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (9, '123456789-C7L2LCDCTCC2AE', '002-2-2', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'RLN_9c8e6868-858a-41bf-b559-86a1c702b095', 'ALO_29e2c5dc-b565-4082-8d6c-bf193c833c1b', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 12.0000, NULL, 0, NULL, NULL, '2025-08-22 08:25:23.005+00', '2025-08-22 09:02:56.578+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (15, '14-SAN6-423924816-C7EJNB23JAUDN2', '000-0-0', 'REL_bfbec0e9-dda2-4823-ad0a-1219bd8e7084', 'RLN_88b2da83-c2e5-40c6-afdc-4124aefebdf7', 'ALO_847a0887-b283-4d44-a9e3-a5ecb4611104', 'CFR', '8853474045150', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 09:39:43.26+00', '2025-08-22 09:39:43.26+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (16, '14-SAN6-423924816-C7EJNB23JAUDN2', '001-1-1', 'REL_bfbec0e9-dda2-4823-ad0a-1219bd8e7084', 'RLN_6667ed58-86d6-4461-a040-71c6990a94dc', 'ALO_e6d671e2-dfe5-4015-91a1-5375a2243c23', 'CFR', '8853474045150', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 09:39:43.26+00', '2025-08-22 09:39:43.26+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (17, '14-SAN6-423924816-C7EJNB23JAUDN2', '002-2-2', 'REL_bfbec0e9-dda2-4823-ad0a-1219bd8e7084', 'RLN_2b28ba64-a006-4f3d-a622-6e18fde63c76', 'ALO_3e164acb-6c90-4dd8-9ce5-11a264751b17', 'CFR', '8857200469104', 1.0000, 'SPAC', NULL, NULL, 0, NULL, NULL, '2025-08-22 09:39:43.26+00', '2025-08-22 09:39:43.26+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (10, '123456789-C7L2LRMHV2KWT1', '000-0-0', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_cf12ebac-016b-46a6-8bbf-24309bc981ad', 'ALO_69b649de-c1c6-4ca4-9a79-ef3de78bfc96', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', NULL, 1.0000, 0, NULL, NULL, '2025-08-22 09:17:43.492+00', '2025-08-22 09:45:04.419+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (14, '123456789-C7L2LRMHV2KWT1', '004-4-4', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_37d8e9ca-e4ba-4eb2-b993-e7ba79f7c4f5', 'ALO_011d6e2a-bf78-4ec1-a3ba-a5b801ac1450', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', NULL, 12.0000, 0, NULL, NULL, '2025-08-22 09:17:43.492+00', '2025-08-22 09:45:05.322+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (11, '123456789-C7L2LRMHV2KWT1', '001-1-1', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_da711bb6-72e8-4676-b938-ad8419f932ff', 'ALO_6f0dfb3c-5a05-4445-abae-ce035d8f9791', 'CFM-UAT', '0000093362986', 1.0000, 'SPCS', 2.0000, NULL, 0, NULL, NULL, '2025-08-22 09:17:43.492+00', '2025-08-22 10:01:26.918+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (12, '123456789-C7L2LRMHV2KWT1', '002-2-2', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_a2440ba9-0708-4509-bd66-e2fe6ca02577', 'ALO_f226e70e-08cf-4d60-8959-d5475dcbe808', 'CFM-UAT', '4901133618567', 1.0000, 'SPCS', 1.0000, NULL, 0, NULL, NULL, '2025-08-22 09:17:43.492+00', '2025-08-22 10:01:27.652+00', 'system', 'system');
INSERT INTO "order"."release_lines" ("id", "order_id", "order_line_id", "release_id", "release_line_id", "allocation_id", "org_id", "item_id", "quantity", "uom", "fulfilled_quantity", "cancelled_quantity", "effective_rank", "process", "cancelled_date", "created_at", "updated_at", "created_by", "updated_by") VALUES (13, '123456789-C7L2LRMHV2KWT1', '003-3-3', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'RLN_5a7094d0-7597-43e5-8632-be345f888774', 'ALO_90ff8d0e-780e-4d6a-b4a5-48176b76dbee', 'CFM-UAT', '8850124003850', 12.0000, 'SBTL', 12.0000, NULL, 0, NULL, NULL, '2025-08-22 09:17:43.492+00', '2025-08-22 10:01:28.163+00', 'system', 'system');
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
INSERT INTO "order"."releases" ("id", "order_id", "release_id", "org_id", "ship_from_location_id", "carrier_code", "delivery_method_id", "ship_to_location_id", "ship_via_id", "release_type", "process", "service_level_code", "destination_action", "effective_rank", "release_extension_1", "created_at", "updated_at", "created_by", "updated_by") VALUES (1, '11-SAN6-423924816-C7EJNB23JAUDN2', '398001f9-0958-44b3-9846-a0ff3bd5ad47', 'CFR', 'CFR99999', 'Grab', 'ShipToAddress', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-08-22 06:52:55.677+00', '2025-08-22 06:52:55.677+00', 'system', 'system');
INSERT INTO "order"."releases" ("id", "order_id", "release_id", "org_id", "ship_from_location_id", "carrier_code", "delivery_method_id", "ship_to_location_id", "ship_via_id", "release_type", "process", "service_level_code", "destination_action", "effective_rank", "release_extension_1", "created_at", "updated_at", "created_by", "updated_by") VALUES (2, '12-SAN6-423924816-C7EJNB23JAUDN2', 'REL_045b1d5d-9fd7-4cd7-a584-bc48666f3048', 'CFR', 'CFR99999', 'Grab', 'ShipToAddress', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-08-22 07:45:55.196+00', '2025-08-22 07:45:55.196+00', 'system', 'system');
INSERT INTO "order"."releases" ("id", "order_id", "release_id", "org_id", "ship_from_location_id", "carrier_code", "delivery_method_id", "ship_to_location_id", "ship_via_id", "release_type", "process", "service_level_code", "destination_action", "effective_rank", "release_extension_1", "created_at", "updated_at", "created_by", "updated_by") VALUES (3, '13-SAN6-423924816-C7EJNB23JAUDN2', 'REL_84508d66-30b9-449b-a505-81f97cf22ce3', 'CFR', 'CFR99999', 'Grab', 'ShipToAddress', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-08-22 08:18:51.256+00', '2025-08-22 08:18:51.256+00', 'system', 'system');
INSERT INTO "order"."releases" ("id", "order_id", "release_id", "org_id", "ship_from_location_id", "carrier_code", "delivery_method_id", "ship_to_location_id", "ship_via_id", "release_type", "process", "service_level_code", "destination_action", "effective_rank", "release_extension_1", "created_at", "updated_at", "created_by", "updated_by") VALUES (4, '123456789-C7L2LCDCTCC2AE', 'REL_96fd0ab0-77cf-4462-a477-451bc29e89ed', 'CFM-UAT', 'CFM6470', 'Grab', 'ShipToAddress', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-08-22 08:25:22.932+00', '2025-08-22 08:25:22.932+00', 'system', 'system');
INSERT INTO "order"."releases" ("id", "order_id", "release_id", "org_id", "ship_from_location_id", "carrier_code", "delivery_method_id", "ship_to_location_id", "ship_via_id", "release_type", "process", "service_level_code", "destination_action", "effective_rank", "release_extension_1", "created_at", "updated_at", "created_by", "updated_by") VALUES (5, '123456789-C7L2LRMHV2KWT1', 'REL_dc8a9d49-57b7-42f8-8124-06a6fa10a769', 'CFM-UAT', 'CFM6470', 'Grab', 'ShipToAddress', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-08-22 09:17:43.406+00', '2025-08-22 09:17:43.406+00', 'system', 'system');
INSERT INTO "order"."releases" ("id", "order_id", "release_id", "org_id", "ship_from_location_id", "carrier_code", "delivery_method_id", "ship_to_location_id", "ship_via_id", "release_type", "process", "service_level_code", "destination_action", "effective_rank", "release_extension_1", "created_at", "updated_at", "created_by", "updated_by") VALUES (6, '14-SAN6-423924816-C7EJNB23JAUDN2', 'REL_bfbec0e9-dda2-4823-ad0a-1219bd8e7084', 'CFR', 'CFR99999', 'Grab', 'ShipToAddress', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-08-22 09:39:43.166+00', '2025-08-22 09:39:43.166+00', 'system', 'system');
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."allocations_id_seq"
OWNED BY "order"."allocations"."id";
SELECT setval('"order"."allocations_id_seq"', 23, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."fulfillment_details_id_seq"
OWNED BY "order"."fulfillment_details"."id";
SELECT setval('"order"."fulfillment_details_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."order_lines_id_seq"
OWNED BY "order"."order_lines"."id";
SELECT setval('"order"."order_lines_id_seq"', 26, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."orders_id_seq"
OWNED BY "order"."orders"."id";
SELECT setval('"order"."orders_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."payment_methods_id_seq"
OWNED BY "order"."payment_methods"."id";
SELECT setval('"order"."payment_methods_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."payment_transactions_id_seq"
OWNED BY "order"."payment_transactions"."id";
SELECT setval('"order"."payment_transactions_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."payments_id_seq"
OWNED BY "order"."payments"."id";
SELECT setval('"order"."payments_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."quantity_details_id_seq"
OWNED BY "order"."quantity_details"."id";
SELECT setval('"order"."quantity_details_id_seq"', 39, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."release_lines_id_seq"
OWNED BY "order"."release_lines"."id";
SELECT setval('"order"."release_lines_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "order"."releases_id_seq"
OWNED BY "order"."releases"."id";
SELECT setval('"order"."releases_id_seq"', 6, true);

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
  "quantity" "pg_catalog"."numeric_ops" ASC NULLS LAST
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

-- ----------------------------
-- Uniques structure for table quantity_details
-- ----------------------------
ALTER TABLE "order"."quantity_details" ADD CONSTRAINT "quantity_details_quantity_detail_id_key" UNIQUE ("quantity_detail_id");

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
