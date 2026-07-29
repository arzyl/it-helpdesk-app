import { userinvTable } from '@/db/schema';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(request:Request) {

    const user = await db.select().from(userinvTable);

    return new Response(JSON.stringify(user),{
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
