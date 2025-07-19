import * as z from "zod/v3";
import { helloSchema, userUpdateSchema } from "./clientMessage.schema.js";

const recievedHelloSchema = helloSchema.extend({
    data: helloSchema.shape.data.extend({
        senderId: z.string(),
    })
});

const recievedUserUpdateSchema = userUpdateSchema.extend({
    data: userUpdateSchema.shape.data.extend({
        senderId: z.string(),
    })
});

export const ChatMessage = z.object({
    id: z.number(),
    content: z.string(),
    senderId: z.string(),
    groupId: z.string(),
    arenaId: z.number(),
    createdAt: z.string().datetime(),
})

export const recievedChatMessageSchema = z.object({
    type: z.literal('chat'),
    recipientId: z.string(),
    data: ChatMessage
});

export const serverWsMessage = z.discriminatedUnion('type', [recievedHelloSchema, recievedUserUpdateSchema, recievedChatMessageSchema])