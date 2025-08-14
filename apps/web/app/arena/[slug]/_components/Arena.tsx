import { ChatMessagesMap } from "@/features/arena/types";
import ArenaMap from "./ArenaMap";

interface ArenaProps {
    socket: WebSocket | null;
    userId: string;
    initialChatMessages: ChatMessagesMap;
}

const Arena: React.FC<ArenaProps> = ({ socket, userId, initialChatMessages }: ArenaProps) => {
    return (
        <div className='w-screen h-screen overflow-hidden bg-blue-200'>
            <ArenaMap socket={socket} localUserID={userId} initialChatMessages={initialChatMessages} />
        </div>
    )
}

export default Arena;
