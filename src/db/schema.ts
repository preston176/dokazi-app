import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkId: varchar("clerk_id").notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: date("created_At").defaultNow(),
  creditsAvailable: integer("credits_Available").default(3),
  creditsUsed: integer("credits_used").default(0),
});

export const documentsTable = pgTable("documents", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  docId: varchar("docId").notNull().unique(),
  clerkId: varchar("clerk_id").notNull(),
  docTitle: varchar("document_title"),
  doctype: varchar("document_type", { length: 50 }),
  type: varchar("type", { length: 50 }),
  clientName: varchar("client_name"),
  clientEmail: varchar("client_email"),
  currency: varchar("currency", { length: 10 }),
  pricingAmount: integer("pricing_amount"),
  serviceScope: jsonb("service_scope").default(sql`'[]'::jsonb`),
  customContent: varchar("custom_content"),
  duration: varchar("duration", { length: 255 }),
  startDate: varchar("start_date", { length: 50 }),
  endDate: varchar("end_date", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});
