import { z } from 'zod/v4';

export const joinArenaSchema = z.object({
    type: z.literal('join_arena'),
    arenaId: z.number({ error: 'Invalid Arena ID' }),
})