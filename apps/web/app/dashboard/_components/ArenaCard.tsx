import { Arena } from "@workspace/common/schemas/arena.schema";

interface ArenaCardProps {
    arena: Arena
}

const ArenaCard: React.FC<ArenaCardProps> = ({ arena }: ArenaCardProps) => {
    return (
        <div className='grid grid-rows-3 size-44 rounded bg-gray-700 border border-white'>
            <div className='row-span-2'>

            </div>

            <div className='row-span-1 bg-black text-white'>
                {arena.name}
            </div>
        </div>
    )
}

export default ArenaCard
