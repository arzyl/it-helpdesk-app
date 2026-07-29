CREATE TABLE "inventory" (
	"inv_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inventory_inv_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"hostname" varchar(255) NOT NULL,
	"motherboard" varchar(255) NOT NULL,
	"processor" varchar(255) NOT NULL,
	"memory" varchar(255) NOT NULL,
	"storage" varchar(255) NOT NULL,
	"monitor" varchar(255) NOT NULL,
	"mouse" varchar(255) NOT NULL,
	"keyboard" varchar(255) NOT NULL,
	"avr" varchar(255) NOT NULL,
	"os" varchar(255) NOT NULL,
	"oslicense" varchar(255) NOT NULL,
	"msoffice" varchar(255) NOT NULL,
	"mslicense" varchar(255) NOT NULL,
	"remarks" varchar(255) NOT NULL,
	"kaspersky" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userinvTable" (
	"username" varchar(255) NOT NULL,
	"department" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "history" RENAME COLUMN "id" TO "history_id";--> statement-breakpoint
ALTER TABLE "jobs" RENAME COLUMN "id" TO "jobs_id";--> statement-breakpoint
ALTER TABLE "history" DROP CONSTRAINT "history_id_jobs_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "mjo" varchar(255);--> statement-breakpoint
ALTER TABLE "history" ADD CONSTRAINT "history_history_id_jobs_jobs_id_fk" FOREIGN KEY ("history_id") REFERENCES "public"."jobs"("jobs_id") ON DELETE no action ON UPDATE no action;