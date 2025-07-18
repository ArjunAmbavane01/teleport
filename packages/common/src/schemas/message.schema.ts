import * as z from "zod/v3";
import { directionEnum, spriteEnum } from "../types/arena.types.js";



const joinArenaSchema = z.object({
    type: z.literal('join_arena'),
    arenaId: z.number().int().min(1, { message: 'Invalid Arena ID' }),
})

const userUpdateSchema = z.object({
    type: z.literal('user_update'),
    data: z.object({
        posX: z.number(),
        posY: z.number(),
        isUserMoving: z.boolean(),
        userDirection: directionEnum,
    })
})

const helloSchema = z.object({
    type: z.literal('hello_user'),
    data: z.object({
        name: z.string().min(1, { message: "User name is required" }).max(100, { message: "User name cannot be more than 100 characters" }),
        character: spriteEnum,
        posX: z.number(),
        posY: z.number(),
        isUserMoving: z.boolean(),
        userDirection: directionEnum,
    })
})

const chatMessageSchema = z.object({
    type: z.literal("chat"),
    data: z.object({
        content: z.string().min(1, { message: "Message content is required" }).max(500, { message: "Message content cannot be more than 500 characters" })
    })
})

const recievedHelloSchema = helloSchema.extend({
    data: helloSchema.shape.data.extend({
        userId: z.string(),
    })
})
const recievedUserUpdateSchema = userUpdateSchema.extend({
    data: userUpdateSchema.shape.data.extend({
        userId: z.string(),
    })
})
const recievedChatMessageSchema = chatMessageSchema.extend({
    data: chatMessageSchema.shape.data.extend({
        userId: z.string(),
    })
})

export const websocketMessage = z.discriminatedUnion('type', [joinArenaSchema, helloSchema, userUpdateSchema,])
export const websocketIncomingMessage = z.discriminatedUnion('type', [recievedHelloSchema, recievedUserUpdateSchema, recievedChatMessageSchema])