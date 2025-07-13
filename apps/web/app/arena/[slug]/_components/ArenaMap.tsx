"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArenaCallbacks, RemoteUser } from "@/features/arena/types";
import useArenaEngine from "@/hooks/useArenaEngine";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Textarea } from "@workspace/ui/components/textarea";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@workspace/ui/components/button";
import { LuSendHorizontal } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

interface ArenaMapProps {
    socket: WebSocket | null;
}

const ArenaMap: React.FC<ArenaMapProps> = ({ socket }: ArenaMapProps) => {

    if (!socket) return;


    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const [userIdsInProximity, setUserIdsInProximity] = useState<string[]>([]);
    const [remoteUsers, setRemoteUsers] = useState<RemoteUser[]>([]);
    const [chatWindow, setChatWindow] = useState<boolean>(true);

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
                    return <motion.div key={user?.userId ?? userId}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-rows-3 p-3 gap-3 bg-background/60 w-44 h-20 border border-foreground/50 opacity-10 rounded-lg group relative hover:opacity-100 hover:bg-background/80">
                        <div className="row-span-1 flex justify-start  items-center gap-2 w-full mx-auto text-center text-xs text-foreground">
                            <Avatar className="size-5 rounded-full border border-foreground">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {user?.name ?? "undefined"}
                        </div>
                        <div className="row-span-2 flex justify-between items-center gap-3">
                            <div
                                onClick={() => {

                                }}
                                className="w-full px-3 py-1 text-center text-xs bg-foreground/60 rounded-lg border border-black text-black cursor-pointer group-hover:bg-foreground">Chat</div>
                            <div className="w-full px-3 py-1 text-center text-xs bg-foreground/60 rounded-lg border border-black text-black cursor-pointer group-hover:bg-foreground">Call</div>
                        </div>
                        <div className="absolute inset-0 bg-background/20 rounded-lg pointer-events-none group-hover:opacity-0" />
                    </motion.div>
                })}
            </AnimatePresence>
        </div>

        <AnimatePresence>
            {chatWindow && (
                <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-y-0 right-6 w-72 h-[80%] my-auto bg-background/90 rounded-lg border border-foreground flex flex-col justify-between items-center px-3 py-3">
                <div className="flex flex-col justify-start size-full">
                <div className="flex justify-end w-full text-foreground"><IoClose onClick={()=>setChatWindow(false)} className="size-6 p-1 rounded-full hover:bg-foreground/20" /></div>
                </div>
                <div className="flex flex-col w-full h-fit p-1 rounded-lg border border-foreground relative">
                    <Textarea
                        className="w-full h-8 text-sm bg-transparent overflow-y-hidden resize-none border-0 ring-0 focus-visible:ring-0 focus:outline-none focus:border-none focus:ring-0"
                        placeholder="Enter Message"
                    />
                    <div className="flex justify-end w-full">
                        <div className="flex justify-center items-center size-8 p-1 rounded-lg text-foreground bg-transparent hover:bg-foreground/20 cursor-pointer transition-colors duration-100">
                            <LuSendHorizontal />
                        </div>
                    </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        <canvas ref={canvasRef} className="w-full h-full" />
    </div>
}

export default ArenaMap
