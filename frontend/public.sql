/*
 Navicat Premium Data Transfer

 Source Server         : postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 160002 (160002)
 Source Host           : localhost:5432
 Source Catalog        : medicaldb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160002 (160002)
 File Encoding         : 65001

 Date: 09/02/2024 15:30:40
*/


-- ----------------------------
-- Sequence structure for appointments_appointmentid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."appointments_appointmentid_seq";
CREATE SEQUENCE "public"."appointments_appointmentid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for patients_patientid_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."patients_patientid_seq";
CREATE SEQUENCE "public"."patients_patientid_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for appointments
-- ----------------------------
DROP TABLE IF EXISTS "public"."appointments";
CREATE TABLE "public"."appointments" (
  "appointmentid" int4 NOT NULL DEFAULT nextval('appointments_appointmentid_seq'::regclass),
  "patientname" varchar(100) COLLATE "pg_catalog"."default",
  "appointmentdate" date,
  "contactnumber" varchar(100) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of appointments
-- ----------------------------
INSERT INTO "public"."appointments" VALUES (6, 'dd, ddd', '2024-02-10', '09269440075');

-- ----------------------------
-- Table structure for patients
-- ----------------------------
DROP TABLE IF EXISTS "public"."patients";
CREATE TABLE "public"."patients" (
  "patientid" int4 NOT NULL DEFAULT nextval('patients_patientid_seq'::regclass),
  "firstname" varchar(100) COLLATE "pg_catalog"."default",
  "middlename" varchar(100) COLLATE "pg_catalog"."default",
  "lastname" varchar(100) COLLATE "pg_catalog"."default",
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "gender" varchar(10) COLLATE "pg_catalog"."default",
  "phonenumber" varchar(100) COLLATE "pg_catalog"."default",
  "dependents" varchar(100) COLLATE "pg_catalog"."default",
  "history" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" date NOT NULL
)
;

-- ----------------------------
-- Records of patients
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "firstname" varchar(100) COLLATE "pg_catalog"."default",
  "middlename" varchar(100) COLLATE "pg_catalog"."default",
  "lastname" varchar(100) COLLATE "pg_catalog"."default",
  "email" varchar(50) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "usertype" int4,
  "created_at" date NOT NULL,
  "updated_at" date
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'sample', 'sample', 'sample', 'sample@gmail.com', '$2b$10$5.YcnwTR1HAYXuAhy1ixe.z1nTin5KGWfEqPkV/okKQ1QslVnX1Im', 2, '2024-02-09', NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."appointments_appointmentid_seq"
OWNED BY "public"."appointments"."appointmentid";
SELECT setval('"public"."appointments_appointmentid_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."patients_patientid_seq"
OWNED BY "public"."patients"."patientid";
SELECT setval('"public"."patients_patientid_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 1, true);

-- ----------------------------
-- Primary Key structure for table appointments
-- ----------------------------
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("appointmentid");

-- ----------------------------
-- Primary Key structure for table patients
-- ----------------------------
ALTER TABLE "public"."patients" ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("patientid");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
