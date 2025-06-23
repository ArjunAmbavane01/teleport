import prisma from '@workspace/db/client';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const users = await prisma.user.findMany({
        where: {}
    })
    console.log(users);
    const arenaId = '123';
    const responseData = {
        type: 'success',
        message: 'Arena created successfully!',
        data: {
            arenaId
        }
    }

    return new Response(JSON.stringify(responseData), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}