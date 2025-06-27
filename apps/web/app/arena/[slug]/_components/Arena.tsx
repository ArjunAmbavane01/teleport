"use client"

import ArenaRenderer from "./ArenaRenderer";


interface ArenaProps {
    socket: WebSocket | null;
}

const Arena:React.FC<ArenaProps> = ({ socket }: ArenaProps) => {
    return (
        <ArenaRenderer />
    )
}

export default Arena
