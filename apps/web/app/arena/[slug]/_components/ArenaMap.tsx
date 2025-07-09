"use client";

import useArenaEngine from "@/hooks/useArenaEngine";
import { useCallback, useEffect, useRef, useState } from "react";

interface ArenaMapProps {
    socket: WebSocket | null;
}

const ArenaMap: React.FC<ArenaMapProps> = ({ socket }: ArenaMapProps) => {

    if (!socket) return;

    const [showChatTrigger, setShowChatTrigger] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current || !ctxRef.current) return;

            const dpr = window.devicePixelRatio || 1;

            canvasRef.current.width = window.innerWidth * dpr;
            canvasRef.current.height = window.innerHeight * dpr;

            canvasRef.current.style.width = "100vw";
            canvasRef.current.style.height = "100vh";

            ctxRef.current.scale(dpr, dpr);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const proximityChatTriggerOn = useCallback(() => {
        setShowChatTrigger(true);
    }, []);
    const proximityChatTriggerOff = useCallback(() => {
        setShowChatTrigger(false);
    }, []);

    useArenaEngine(canvasRef, ctxRef, socket, proximityChatTriggerOn, proximityChatTriggerOff);
    console.log(showChatTrigger)
    return <div className="relative w-screen h-screen">
        <canvas ref={canvasRef} className="w-full h-full" />
        {showChatTrigger && (
            <div className="absolute top-[310px] left-[460px] w-fit px-2 py-1 text-xs rounded border border-white z-50 bg-blue-600 text-white">Chat with user</div>
        )}
    </div>
}

export default ArenaMap
