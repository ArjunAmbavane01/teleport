import ArenaMap from "./ArenaMap";

interface ArenaProps {
    socket: WebSocket | null;
}

const Arena:React.FC<ArenaProps> = ({ socket }: ArenaProps) => {
    return (
         <div className='w-screen h-screen overflow-hidden bg-blue-200'>
            <ArenaMap socket={socket}/>
        </div>
    )
}

export default Arena
