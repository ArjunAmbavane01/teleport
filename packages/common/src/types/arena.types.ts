import * as z from "zod/v3";
import { ArenaRegionsEnum, arenaSchema, createArenaSchema } from "../schemas/arena.schema.js";
import { createArenaResponse } from "../schemas/apiResponse.schema.js";

export type Arena = z.infer<typeof arenaSchema>;
export type ArenaRegions = z.infer<typeof ArenaRegionsEnum>;

export type CreateArenaInput = z.infer<typeof createArenaSchema>;
export type createArenaResponse = z.infer<typeof createArenaResponse>;

