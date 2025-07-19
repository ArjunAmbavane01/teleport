import { ChatMessage, recievedChatMessageSchema } from "../schemas/serverMessage.schema.js";
import * as z from "zod/v3";

export type receivedChatMessage = z.infer<typeof recievedChatMessageSchema> 
export type ChatMessage = z.infer<typeof ChatMessage> ;
