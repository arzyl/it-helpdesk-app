import { jobTable } from '@/db/schema';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(request:Request) {

    const history = await db.select().from(jobTable).where(eq(jobTable.status,'Done'))

    return new Response(JSON.stringify(history),{
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
