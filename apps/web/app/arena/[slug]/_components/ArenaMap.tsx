"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArenaCallbacks, ChatMessagesMap, RemoteUser } from "@/features/arena/types";
import useArenaEngine from "@/hooks/useArenaEngine";
import { AnimatePresence } from "motion/react";
import ProximityUserCard from "@/components/arena/ProximityUserCard";
import ChatWindow from "@/components/arena/ChatWindow";
import BottomMenu from "./BottomMenu";
import { receivedChatMessage } from "@workspace/common/types"

interface ArenaMapProps {
    socket: WebSocket | null;
    localUserID: string;
    initialChatMessages: ChatMessagesMap;
}

const ArenaMap: React.FC<ArenaMapProps> = ({ socket, localUserID, initialChatMessages }: ArenaMapProps) => {

    if (!socket) return;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const [userIdsInProximity, setUserIdsInProximity] = useState<string[]>([]);
    const [remoteUsers, setRemoteUsers] = useState<RemoteUser[]>([]);
    const [currentChatUser, setCurrentChatUser] = useState<RemoteUser | null>(null);
    const [openChatWindow, setOpenChatWindow] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<ChatMessagesMap>(initialChatMessages);

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

    const sendChatMessage = useCallback((content: string) => {
        if (!currentChatUser) return;
        socket.send(JSON.stringify({
            type: 'chat',
            data: {
                recipientId: currentChatUser.userId,
                sentAt: new Date().toISOString(),
                content
            }
        }));
    }, [currentChatUser]);

    const handleIncomingMessage = useCallback((receivedData: receivedChatMessage) => {
        const recipientId = receivedData.recipientId;
        const { senderId } = receivedData.data;
        const userId = senderId === localUserID ? recipientId : senderId;
        setChatMessages((prev) => ({
            ...prev, [userId]: [...(prev[userId] || []), receivedData.data]
        }))
    }, [localUserID]);

    const callbacks: ArenaCallbacks = useMemo(() => ({
        setUserIdsInProximity,
        setRemoteUsers,
        handleIncomingMessage
    }), [setRemoteUsers, setUserIdsInProximity, handleIncomingMessage]);

    const { setIsUserTalking } = useArenaEngine(canvasRef, ctxRef, socket, callbacks);

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
            {openChatWindow && setIsUserTalking &&
                <ChatWindow localUserID={localUserID} remoteUsers={remoteUsers} currentChatUser={currentChatUser} chatMessages={chatMessages} sendChatMessage={sendChatMessage} setCurrentChatUser={setCurrentChatUser} setOpenChatWindow={setOpenChatWindow} setIsUserTalking={setIsUserTalking} />}
        </AnimatePresence>

        <BottomMenu setOpenChatWindow={setOpenChatWindow} setCurrentChatUser={setCurrentChatUser} />


        <canvas ref={canvasRef} className="w-full h-full" />

    </div>
}

export default ArenaMap
