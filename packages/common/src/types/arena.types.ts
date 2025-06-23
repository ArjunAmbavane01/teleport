import { ArenaRegions } from "../schemas/arena.schema.js";

export interface Arena {
    id: string;
    name: string;
    region: ArenaRegions;
    adminId: string
    createdAt: Date;
}