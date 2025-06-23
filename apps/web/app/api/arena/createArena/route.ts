import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();

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