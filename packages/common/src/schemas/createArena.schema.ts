import { z } from 'zod/v4';
import { ArenaRegionsEnum } from './arena.schema.js';


export const createArenaSchema = z.object({
    arenaName: z.string().min(1, { error: "Arena name is required" }).max(50, { error: "Arena name cannot be more than 50 characters" }),
    arenaRegion: ArenaRegionsEnum,
})
export type CreateArenaInput = z.infer<typeof createArenaSchema>;

export const createArenaResponseSchema = z.object({
    type: z.enum(['success', 'error']),
    message: z.string().max(100, { error: "Response message cannot be more than 100 characters" }),
    data: z.object({
        arenaSlug: z.string().min(1, { error: "Arena slug is required" }).max(100, { error: "Arena slug cannot be more than 100 characters" }),
    }).optional(),
    error: z.any().optional(),
})
export type createArenaResponse = z.infer<typeof createArenaResponseSchema>;

