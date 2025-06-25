"use client"

import { useEffect, useRef, useState } from 'react';
import Arena from './Arena'
import { BASE_WS_URL } from '@/lib/api/apiEndPoints';

interface ArenaWrapperProps {
    userId: string;
    arenaId: number
}
const ArenaWrapper = ({ userId, arenaId }: ArenaWrapperProps) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(BASE_WS_URL as string);
        setSocket(ws);
        ws.onopen = () => {
            console.log(arenaId)
            console.log(userId)
            ws.send(JSON.stringify({
                type: 'join_arena',
                arenaId: arenaId,
                userId: userId as string,
            }));
        }
        ws.onclose = () => {

            setSocket(null);
        }
        ws.onerror = (ev: Event) => {
            console.error(ev);
            setSocket(null);
        }
    }, [])
    return socket ? <Arena socket={socket} /> : <>Loading...</>
}

export default ArenaWrapper
