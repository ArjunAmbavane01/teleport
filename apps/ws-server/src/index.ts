import 'dotenv/config'
import express, { Application, Request, Response } from 'express';
import http, { IncomingMessage } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

interface IUser {
    ws: WebSocket;
    userId: string;
    arenaId: number;
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

    const reqHeaders = req.headers;
    console.log(reqHeaders);
    const userId = '';
    const arenaId = 0;
    const newUser: IUser = {
        userId,
        ws,
        arenaId,
    }
    users.push(newUser)

    ws.on('message', async (data,) => {
        try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString());
            console.log(parsedData);
        } catch (e) {
            console.error('Some error occurred ', e);
        }
    })
})
