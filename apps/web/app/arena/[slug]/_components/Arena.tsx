"use client"

import ArenaRenderer from "@/pixi/ArenaRenderer";

interface ArenaProps {
    socket: WebSocket | null;
}

const Arena:React.FC<ArenaProps> = ({ socket }: ArenaProps) => {
    return (
        <ArenaRenderer />
    )
}

export default Arena
