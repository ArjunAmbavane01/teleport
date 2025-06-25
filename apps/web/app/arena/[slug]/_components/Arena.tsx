"use client"

import { Button } from "@workspace/ui/components/button";

interface ArenaProps {
    socket: WebSocket | null;
}

const Arena = ({ socket }: ArenaProps) => {
    return (
        <div>
            Arena
            {socket && <Button onClick={() => {
                socket?.send(JSON.stringify({
                    type: 'message',
                    message: "Hello there"
                }))
            }}>Click me</Button>}
        </div>
    )
}

export default Arena
