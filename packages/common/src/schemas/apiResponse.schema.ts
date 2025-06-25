import { z } from 'zod/v4';
import { arenaSchema } from './arena.schema.js';

export const getUserArenasResponseSchema = z.object({
    type: z.enum(['success', 'error']),
    message: z.string().max(100, { error: "Response message cannot be more than 100 characters" }),
    data: z.object({
        userArenas: z.array(arenaSchema)
    }).optional(),
    error: z.any().optional(),
})

export type getUserArenasResponse = z.infer<typeof getUserArenasResponseSchema>;