import * as z from "zod/v3";
import { directionEnum, spriteEnum } from "../types/arena.types.js";


export const userUpdateSchema = z.object({
    type: z.literal('user_update'),
    data: z.object({
        posX: z.number(),
        posY: z.number(),
        isUserMoving: z.boolean(),
        userDirection: directionEnum,
    })
})

export const helloSchema = z.object({
    type: z.literal('hello'),
    data: z.object({
        name: z.string().min(1, { message: "User name is required" }).max(100, { message: "User name cannot be more than 100 characters" }),
        character: spriteEnum,
        posX: z.number(),
        posY: z.number(),
        isUserMoving: z.boolean(),
        userDirection: directionEnum,
    })
})

export const chatMessageSchema = z.object({
    type: z.literal("chat"),
    data: z.object({
        recipientId: z.string(),
        sentAt: z.string().datetime(),
        content: z.string().min(1, { message: "Message content is required" }).max(500, { message: "Message content cannot be more than 500 characters" })
    })
})

export const clientWsMessage = z.discriminatedUnion('type', [helloSchema, userUpdateSchema,chatMessageSchema])