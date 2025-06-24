import { NextRequest } from 'next/server';
import {prisma} from '@workspace/db';
import { createArenaSchema } from '@workspace/common/schemas/arena.schema';
import { createArenaResponse } from '@workspace/common/schemas/apiResponse.schema';
import generateArenaSlug from '@workspace/common/utils/slug';

export async function POST(request: NextRequest) {
    try {
        const parseResult = createArenaSchema.safeParse(await request.json());
        if (parseResult.success) {
            const { adminId, arenaName } = parseResult.data;
            const arenaSlug = generateArenaSlug(arenaName);
            const createdArena = await prisma.arena.create({
                data: {
                    name: arenaName,
                    slug: arenaSlug,
                    adminId
                }
            })
            const responseData: createArenaResponse = {
                type: 'success',
                message: 'Arena created successfully!',
                data: { arenaSlug: createdArena.slug }
            }
            return new Response(JSON.stringify(responseData), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            const responseData: createArenaResponse = {
                type: 'error',
                message: 'Invalid body format',
                error: parseResult.error.flatten()
            }
            return new Response(JSON.stringify(responseData), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        console.log(e)
        const responseData: createArenaResponse = {
            type: 'error',
            message: 'Internal server error occurred',
        }
        return new Response(JSON.stringify(responseData), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}