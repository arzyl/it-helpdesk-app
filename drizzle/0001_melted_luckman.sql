ALTER TABLE "history" DROP CONSTRAINT "history_id_jobs_id_fk";
--> statement-breakpoint
ALTER TABLE "history" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "history" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "history" ADD COLUMN "jid" integer;--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_jid_jobs_id_fk" FOREIGN KEY ("jid") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;