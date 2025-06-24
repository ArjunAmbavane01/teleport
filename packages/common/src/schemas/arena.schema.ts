import { z } from 'zod/v4';

export const ArenaRegionsEnum = z.enum(['office', 'garden']);

export const createArenaSchema = z.object({
    arenaName: z.string().min(1, { error: "Arena name is required" }).max(50, { error: "Arena name cannot be more than 50 characters" }),
    arenaRegion: ArenaRegionsEnum,
    adminId: z.string().min(1),
})

export type CreateArenaInput = z.infer<typeof createArenaSchema>;
export type ArenaRegions = z.infer<typeof ArenaRegionsEnum>;