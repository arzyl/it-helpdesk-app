CREATE TABLE "history" (
	"id" integer,
	"dateFinished" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"assignee" varchar(255) NOT NULL,
	"activity" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"dateCreated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_id_jobs_id_fk" FOREIGN KEY ("id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;