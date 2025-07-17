import { createArenaResponseSuccessSchema } from "../schemas/apiResponse.schema.js";
import { arenaSchema, createArenaSchema } from "../schemas/arena.schema.js";
import { z } from 'zod/v4';

export type Arena = z.infer<typeof arenaSchema>;

export const ArenaRegionsEnum = z.enum(['office', 'garden']);

export type ArenaRegions = z.infer<typeof ArenaRegionsEnum>;

export type CreateArenaInput = z.infer<typeof createArenaSchema>;
export type createArenaResponse = z.infer<typeof createArenaResponseSuccessSchema>;
