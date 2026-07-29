import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const jobTable = pgTable("jobs", {
  jobs_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  assignee: varchar({length: 255}).notNull(),
  activity: varchar({length: 255}).notNull(),
  status: varchar({length: 255}).notNull(),
  dateCreated: timestamp().notNull().defaultNow(),
  mjo: varchar({length: 255}),
});

export const historyTable = pgTable ("history",{
    history_id: integer().references(() => jobTable.jobs_id),
    dateFinished: timestamp().defaultNow().notNull(),
});

export const inventoryTable = pgTable("inventory",{
    inv_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    hostname: varchar({length:255}).notNull(),
    motherboard: varchar({length:255}).notNull(),
    processor: varchar({length:255}).notNull(),
    memory: varchar({length:255}).notNull(),
    storage: varchar({length:255}).notNull(),
    monitor: varchar({length:255}).notNull(),
    mouse: varchar({length:255}).notNull(),
    keyboard: varchar({length:255}).notNull(),
    avr: varchar({length:255}).notNull(),
    os: varchar({length:255}).notNull(),
    oslicense: varchar({length:255}).notNull(),
    msoffice: varchar({length:255}).notNull(),
    mslicense: varchar({length:255}).notNull(),
    remarks: varchar({length:255}).notNull(),
    kaspersky: varchar({length:255}).notNull(),
    location: varchar({length:255}).notNull(),
})

export const userinvTable = pgTable("userinvTable",{
  user_id: integer().references(() => inventoryTable.inv_id),
  username: varchar({length:255}).notNull(),
  department: varchar({length:255}).notNull(),
  position: varchar({length:255}).notNull(),
});