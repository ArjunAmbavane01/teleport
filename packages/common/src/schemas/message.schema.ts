import * as z from "zod/v3";

export const joinArenaSchema = z.object({
    type: z.literal('join_arena'),
    arenaId: z.number().int().min(1, { message: 'Invalid Arena ID' }),
})

export const chatMessageSchema = z.object({
    type:z.literal("chat"),
})