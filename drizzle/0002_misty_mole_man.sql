ALTER TABLE "history" DROP CONSTRAINT "history_jid_jobs_id_fk";
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'history'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "history" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "history" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_id_jobs_id_fk" FOREIGN KEY ("id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history" DROP COLUMN "jid";