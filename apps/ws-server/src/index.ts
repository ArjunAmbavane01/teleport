import 'dotenv/config'
import express, { Application, Request, Response } from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const PORT = Number(process.env.PORT!);

const app: Application = express();
const server = http.createServer(app);

app.get('/health', (req: Request, res: Response) => {
    const timestamp = new Date();
    res.status(200).json({
        status: 'OK',
        timestamp
    });
})

const wss = new WebSocketServer({ server });

server.listen(PORT, () => {
    console.log(`HTTP and WS on port ${PORT}`)
})

wss.on('connection', (ws: WebSocket) => {

})
