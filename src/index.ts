import { drizzle } from "drizzle-orm/neon-http";
import { jobTable } from "./db/schema";
import "dotenv/config"

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    // const job: typeof jobTable.$inferInsert = {
    //     assignee: "Luke",
    //     activity: "Fix QAD Wifi",
    //     status: "Done",
    // };
    // await db.insert(jobTable).values(job);
    // console.log("New job created!");

    const data = await db.select().from(jobTable);
    console.log("Fetching user data: ", data);
}
main();