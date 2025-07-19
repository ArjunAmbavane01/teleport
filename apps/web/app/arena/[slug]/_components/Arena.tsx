import ArenaMap from "./ArenaMap";

interface ArenaProps {
    socket: WebSocket | null;
    userId:string;
}

const Arena:React.FC<ArenaProps> = ({ socket,userId }: ArenaProps) => {
    return (
         <div className='w-screen h-screen overflow-hidden bg-blue-200'>
            <ArenaMap socket={socket} localUserID={userId}/>
        </div>
    )
}

export default Arena;
