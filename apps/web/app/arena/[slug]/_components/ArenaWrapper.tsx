"use client"

import { useEffect, useState } from 'react';
import { BASE_WS_URL } from '@/lib/api/endPoints';
import Arena from './Arena'

interface ArenaWrapperProps {
    wsToken: string | undefined;
    userId: string;
}

const ArenaWrapper: React.FC<ArenaWrapperProps> = ({ wsToken, userId }: ArenaWrapperProps) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(`${BASE_WS_URL as string}?token=${wsToken}`);
        setSocket(ws);
        ws.onclose = () => {
            setSocket(null);
        }
        ws.onerror = (ev: Event) => {
            console.error(ev);
            setSocket(null);
        }
    }, [])
    return socket ? <Arena socket={socket} userId={userId} /> : <>Loading...</>
}

export default ArenaWrapper;
