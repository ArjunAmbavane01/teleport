import 'dotenv/config'
import WebSocket, { WebSocketServer } from 'ws';
import express, { Application, Request, Response } from 'express';
import http, { IncomingMessage } from 'http';
import { validateToken } from './utils/auth.js';
import { clientWsMessage } from "@workspace/common/schemas";
import { prisma } from '@workspace/db';

export interface IUser {
    ws: WebSocket;
    userId: string;
    arenas: number[];
}

const PORT = Number(process.env.PORT!);
const app: Application = express();
const users: IUser[] = []

app.get('/health', (req: Request, res: Response) => {
    const timestamp = new Date();
    res.status(200).json({
        status: 'OK',
        timestamp
    });
})

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

server.listen(PORT, () => {
    console.log(`HTTP and WS on port ${PORT}`)
})

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {

    const reqURL = req.url;
    if (!reqURL) return;

    const params = new URLSearchParams(reqURL.split("?")[1]);
    const token = params.get('token');
    // validates and returns the user from users array if present
    const res = validateToken(token, users);

    if (res.type === "error") {
        console.error(res.message);
        if (res.message === "Token not present") ws.send(JSON.stringify({ type: "error", message: "Token not available" }))
        if (res.message === "Invalid Token") ws.send(JSON.stringify({ type: "error", message: "Token format is invalid" }))
        if (res.message === "Token expired") ws.send(JSON.stringify({ type: "error", message: "Session expired. Please try again" }))
        ws.close();
    }
    if (!res.data) return;

    const { userId, arenaId, user } = res.data;
    if (!user) {
        const newUser: IUser = {
            userId,
            ws,
            arenas: [arenaId],
        }
        users.push(newUser)
    } else if (!user.arenas.includes(arenaId)) {
        user.arenas.push(arenaId);
    }

    ws.on('message', async (data,) => {
        try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString());
            const result = clientWsMessage.safeParse(parsedData);
            if (result.error) {
                const errorMessage = `Invalid message format: ${result.error.message}`;
                console.error('WebSocket message validation failed:', result.error);
                ws.send(JSON.stringify({
                    type: 'error',
                    message: errorMessage
                }));
                return;
            }
            const recievedData = result.data;
            if (recievedData.type === 'hello') {
                users.forEach((user) => {
                    if (user.arenas.includes(arenaId) && user.userId !== userId) {
                        const newMessage = {
                            type: 'hello',
                            data: { ...recievedData.data, senderId: userId }
                        }
                        user.ws.send(JSON.stringify(newMessage))
                    }
                })
            } else if (recievedData.type === 'user_update') {
                users.forEach((user) => {
                    if (user.arenas.includes(arenaId) && user.userId !== userId) {
                        const newMessage = {
                            type: 'user_update',
                            data: { ...recievedData.data, senderId: userId }
                        }
                        user.ws.send(JSON.stringify(newMessage))
                    }
                })
            } else if (recievedData.type === 'chat') {
                const { content, recipientId, sentAt } = recievedData.data;
                const groupId1 = `${userId}-${recipientId}`;
                const groupId2 = `${recipientId}-${userId}`;
                let groupId;
                const group = await prisma.chatGroup.findFirst({
                    where: {
                        id: { in: [groupId1, groupId2] }
                    }
                });
                if (group) groupId = group.id;
                else {
                    const res = await prisma.chatGroup.create({
                        data: {
                            id: groupId1,
                            arenaId,
                            type: 'dm',
                            users: {
                                connect: [
                                    { id: userId },
                                    { id: recipientId }
                                ]
                            }
                        }
                    })
                    groupId = res.id
                }

                // add chat to chatgroup and chat table
                const message = await prisma.chatMessage.create({
                    data: {
                        content,
                        senderId: userId,
                        groupId,
                        arenaId: arenaId,
                        createdAt: sentAt,
                    }
                })
                const newMessage = {
                    type: 'chat',
                    recipientId,
                    data: message
                }
                ws.send(JSON.stringify(newMessage));
                for (let i = 0; i <= users.length; i++) {
                    const user = users[i] as IUser;
                    if (user.userId === recievedData.data.recipientId) {
                        user.ws.send(JSON.stringify(newMessage));
                        break;
                    }
                }
            }
        } catch (e) {
            console.error('Some error occurred ', e);
        }
    });

    ws.on('close', () => {
        const index = users.findIndex(u => u.userId === userId);
        if (index !== -1) users.splice(index, 1);
    });
})
