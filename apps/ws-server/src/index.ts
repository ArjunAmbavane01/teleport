import 'dotenv/config'
import express, { Application, Request, Response } from 'express';
import http, { IncomingMessage } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { validateToken } from './utils/auth.js';

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
    } else user.arenas.push(arenaId);

    ws.on('message', async (data,) => {
        try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString());
            console.log(parsedData);
        } catch (e) {
            console.error('Some error occurred ', e);
        }
    })
})
