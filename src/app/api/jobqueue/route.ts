import { jobTable } from '@/db/schema';
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(request: Request) {
    
    const job = await db.select().from(jobTable);

    return new Response(JSON.stringify(job),{
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: Request) {
    try{
    const { assignee = '', activity = '', status = ''} = await request.json();
    const newData: typeof jobTable.$inferInsert = {assignee,activity,status};
    await db.insert(jobTable).values(newData);

    return Response.json({
        message:"Job created!",
        status: 201
    });
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

export async function PATCH(request:Request) {
    const {id, ...AllFields} = await request.json();

    await db.update(jobTable).set(AllFields).where(eq(jobTable.id,id))

    return Response.json({
        message:"Updated!",
    });
}

export async function DELETE(request:Request) {
    
    const { id,... allFields} = await request.json();
    await db.delete(allFields).where(eq(jobTable.id,id));

    return Response.json({
        message:"Deleted!",
    });
}