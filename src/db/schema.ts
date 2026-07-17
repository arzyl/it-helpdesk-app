import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const jobTable = pgTable("jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  assignee: varchar({length: 255}).notNull(),
  activity: varchar({length: 255}).notNull(),
  status: varchar({length: 255}).notNull(),
  dateCreated: timestamp().notNull().defaultNow(),
});

export const historyTable = pgTable ("history",{
    id: integer().references(() => jobTable.id),
    dateFinished: timestamp().defaultNow().notNull(),
});