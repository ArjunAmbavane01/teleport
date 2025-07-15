"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArenaCallbacks, RemoteUser } from "@/features/arena/types";
import useArenaEngine from "@/hooks/useArenaEngine";
import { AnimatePresence } from "motion/react";
import ProximityUserCard from "@/components/arena/ProximityUserCard";
import ChatWindow from "@/components/arena/ChatWindow";
import BottomMenu from "./BottomMenu";

interface ArenaMapProps {
    socket: WebSocket | null;
}

const ArenaMap: React.FC<ArenaMapProps> = ({ socket }: ArenaMapProps) => {

    if (!socket) return;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const [userIdsInProximity, setUserIdsInProximity] = useState<string[]>([]);
    const [remoteUsers, setRemoteUsers] = useState<RemoteUser[]>([]);
    const [currentChatUser, setCurrentChatUser] = useState<RemoteUser | null>(null);
    const [openChatWindow, setOpenChatWindow] = useState<boolean>(false);

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




    const callbacks: ArenaCallbacks = useMemo(() => ({
        setUserIdsInProximity,
        setRemoteUsers,
    }), [setRemoteUsers, setUserIdsInProximity]);

    useArenaEngine(canvasRef, ctxRef, socket, callbacks);

    return <div className="relative w-screen h-screen">
        <div className="absolute top-8 left-[50%] -translate-x-[50%] flex items-start gap-5">
            <AnimatePresence>
                {userIdsInProximity.map((userId) => {
                    const user = remoteUsers.find((user) => userId === user.userId);
                    if (!user) return;
                    return <ProximityUserCard user={user} setCurrentChatUser={setCurrentChatUser} setOpenChatWindow={setOpenChatWindow} />
                })}
            </AnimatePresence>
        </div>
        <AnimatePresence>
            {openChatWindow && <ChatWindow remoteUsers={remoteUsers} currentChatUser={currentChatUser} setCurrentChatUser={setCurrentChatUser} setOpenChatWindow={setOpenChatWindow} />}
        </AnimatePresence>

        <BottomMenu setOpenChatWindow={setOpenChatWindow} />


        <canvas ref={canvasRef} className="w-full h-full" />

    </div>
}

export default ArenaMap
