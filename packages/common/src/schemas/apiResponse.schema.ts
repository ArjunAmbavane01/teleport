import * as z from "zod/v3";
import { arenaSchema } from './arena.schema.js';

const getUserArenasSuccessResponse = z.object({
    type: z.literal("success"),
    message: z.string().max(100, { message: "Response message cannot be more than 100 characters" }),
    data: z.object({ userArenas: z.array(arenaSchema) })
});

const createArenaResponseSuccessSchema = z.object({
    type: z.literal('success'),
    message: z.string().max(100, { message: "Response message cannot be more than 100 characters" }),
    data: z.object({
        arenaSlug: z.string().min(1, { message: "Arena slug is required" }).max(100, { message: "Arena slug cannot be more than 100 characters" }),
    }),
});

const errorResponse = z.object({
    type: z.literal("error"),
    message: z.string().max(100, { message: "Response message cannot be more than 100 characters" }),
    error: z.any(),
});

export const getUserArenasResponse = z.union([getUserArenasSuccessResponse,errorResponse]);
export const createArenaResponse = z.union([createArenaResponseSuccessSchema,errorResponse]);