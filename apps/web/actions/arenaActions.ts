"use server"

import { revalidatePath } from "next/cache";
import { Arena, prisma } from "@workspace/db";
import generateArenaSlug from "@workspace/common/utils/slug";
import { auth } from "@/app/api/auth/[...nextauth]/options";
import { CreateArenaInput, createArenaResponse } from "@workspace/common/types";
import { createArenaSchema } from "@workspace/common/schemas/arena.schema";
import { ChatMessagesMap } from "@/features/arena/types";
import { User } from "next-auth";

export const createNewArena = async (values: CreateArenaInput): Promise<createArenaResponse> => {
    try {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return {
                type: 'error',
                message: 'Unauthorized',
            }
        }
        const parseResult = createArenaSchema.safeParse(values);
        if (parseResult.success) {
            const { arenaName } = parseResult.data;
            const adminId = session.user.id;
            const arenaSlug = generateArenaSlug(arenaName);
            const createdArena = await prisma.arena.create({
                data: {
                    name: arenaName,
                    slug: arenaSlug,
                    adminId,
                    users: {
                        connect: { id: adminId }
                    }
                }
            })
            revalidatePath('/dashboard');
            return {
                type: 'success',
                message: 'Arena created successfully!',
                data: { arenaSlug: createdArena.slug }
            }
        } else {
            return {
                type: 'error',
                message: 'Invalid body format',
                error: parseResult.error.flatten()
            }
        }
    } catch (e: unknown) {
        console.error("Create Arena Error:", e);
        return {
            type: 'error',
            message: 'Internal server error occurred',
        }
    }
}

export const getUserArenas = async (userId: string): Promise<Arena[]> => {
    const userArenas: Arena[] = await prisma.arena.findMany({
        where: {
            OR: [
                { adminId: userId },
                { users: { some: { id: userId } } }
            ]
        }
    });
    return userArenas;
}

export const getArenaIdFromSlug = async (slug: string): Promise<{ id: number } | null> => {
    const res = await prisma.arena.findUnique({
        where: {
            slug
        },
        select: {
            id: true
        }
    })
    return res;
}

export const getInitialChatMessages = async (user: User) => {
    const chatGroups = await prisma.user.findFirst({ where: { id: user.id }, select: { chatGroups: true } });
    const initialChatMessages: ChatMessagesMap = {};
    if (chatGroups) {
        for (const group of chatGroups.chatGroups) {
            const [id1, id2] = group.id.split("-");
            const otherId = id1 === user.id ? id2 : id1;

            const messages = await prisma.chatMessage.findMany({
                where: { groupId: group.id },
                orderBy: { createdAt: 'asc' },
            });
            if (otherId) initialChatMessages[otherId] = messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString(), }));
        }
    }
    return initialChatMessages;
}