import { z } from 'zod';

export const ArenaRegionsEnum = z.enum(['office', 'garden']);

export const createArenaSchema = z.object({
    name: z.string().min(1).max(50),
    region: ArenaRegionsEnum,
    adminId: z.string(),
})

export type ArenaRegions = z.infer<typeof ArenaRegionsEnum>;