import * as z from "zod";
import { ArenaRegions, ArenaRegionsEnum } from '../types/arena.types.js';

export interface Arena {
    id: string;
    name: string;
    region: ArenaRegions;
    adminId: string;
    createdAt: Date;
}

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

export const createArenaSchema = z.object({
    arenaName: z.string().min(1, { error: "Arena name is required" }).max(50, { error: "Arena name cannot be more than 50 characters" }),
    arenaRegion: ArenaRegionsEnum,
});

export const getUserArenasSchema = z.object({
    userArenas:z.array(arenaSchema),
})