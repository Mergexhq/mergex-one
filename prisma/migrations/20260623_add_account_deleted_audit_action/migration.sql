-- Migration: add_account_deleted_audit_action
-- Adds the ACCOUNT_DELETED value to the AuditAction enum
-- This is safe and backward-compatible — no existing data is affected.

ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'ACCOUNT_DELETED';
