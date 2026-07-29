import { historyTable, inventoryTable, jobTable, userinvTable } from '@/db/schema';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(request: Request) {

    const inventory = await db.select().from(inventoryTable)
    .leftJoin(userinvTable, eq(inventoryTable.inv_id, userinvTable.user_id));

    return new Response(JSON.stringify(inventory), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
export async function POST(request: Request) {
    try {
        const {
            username= '',
            department = '',
            position = '',
            hostname = '',
            motherboard = '',
            processor = '',
            memory = '',
            storage = '',
            monitor = '',
            mouse = '',
            keyboard = '',
            avr = '',
            os = '',
            oslicense = '',
            msoffice = '',
            mslicense = '',
            remarks = '',
            kaspersky = '',
            location = ''
        } = await request.json();

        const inventory: typeof inventoryTable.$inferInsert = {
            hostname,
            motherboard,
            processor,
            memory,
            storage,
            monitor,
            mouse,
            keyboard,
            avr,
            os,
            oslicense,
            msoffice,
            mslicense,
            remarks,
            kaspersky,
            location,
        };

        const insertedInventory = await db.insert(inventoryTable)
            .values(inventory)
            .returning({ inv_id: inventoryTable.inv_id });

        const inventoryId = insertedInventory[0]?.inv_id;

        if (inventoryId === undefined) {
            throw new Error('Failed to insert inventory record');
        }

        const user: typeof userinvTable.$inferInsert = {
            user_id: inventoryId,
            username,
            department,
            position,
        };

        await db.insert(userinvTable).values(user);

        return Response.json(inventory, { status: 201 })
    } catch (error) {
        console.error("PATCH ERROR:", error)

        return Response.json(
            {
                message: "Update failed",
                error: String(error),
            },
            { status: 500 }
        )
    }
}
