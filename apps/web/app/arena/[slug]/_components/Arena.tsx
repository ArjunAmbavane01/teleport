"use client"

import ArenaMap from "./ArenaMap";
import BottomMenu from "./BottomMenu";

interface ArenaProps {
    socket: WebSocket | null;
}

const Arena:React.FC<ArenaProps> = ({ socket }: ArenaProps) => {
    return (
         <div className='w-screen h-screen overflow-hidden bg-blue-200 relative'>
            <ArenaMap socket={socket}/>
            <BottomMenu />
        </div>
    )
}

export default Arena
