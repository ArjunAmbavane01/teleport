import * as z from "zod/v3";

export const ArenaRegionsEnum = z.enum(['office', 'garden']);

export const arenaSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string().min(1).max(50),
    region: ArenaRegionsEnum,
    adminId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    // messages:
    //chatgroups
    //users
})

export const createArenaSchema = z.object({
    arenaName: z.string().min(1, { message: "Arena name is required" }).max(50, { message: "Arena name cannot be more than 50 characters" }),
    arenaRegion: ArenaRegionsEnum,
});

export const getUserArenasSchema = z.object({
    userArenas: z.array(arenaSchema),
})