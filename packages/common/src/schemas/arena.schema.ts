import { z } from 'zod/v4';

export const arenaSchema = z.object({
    id:z.int(),
    slug:z.string(),
    name:z.string().min(1).max(50),
    adminId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    // messages:
    //chatgroups
    //users
})
export type Arena = z.infer<typeof arenaSchema>;

export const ArenaRegionsEnum = z.enum(['office', 'garden']);
export type ArenaRegions = z.infer<typeof ArenaRegionsEnum>;



export const getUserArenasSchema = z.object({
    userArenas:z.array(arenaSchema),
})