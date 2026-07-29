import { historyTable, jobTable } from '@/db/schema';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(request: Request) {

    const history = await db.select().from(jobTable).where(eq(jobTable.status, 'Completed'))
        .leftJoin(historyTable, eq(jobTable.jobs_id, historyTable.history_id));

    return new Response(JSON.stringify(history), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
export async function POST(request: Request) {
    const { history_id = '' } = await request.json();
    console.log(history_id)
    const history: typeof historyTable.$inferInsert = { history_id };

    await db.insert(historyTable).values(history);

    return Response.json(history, { status: 201 })

}
