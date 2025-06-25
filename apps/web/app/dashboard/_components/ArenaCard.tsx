import { Arena } from "@workspace/common/schemas/arena.schema";
import Link from "next/link";

interface ArenaCardProps {
    arena: Arena;
}

const ArenaCard: React.FC<ArenaCardProps> = ({ arena }: ArenaCardProps) => {
    return (
        <Link href={`/arena/${arena.slug}`} prefetch={false}>
            <div className='grid grid-rows-3 size-44 rounded bg-gray-700 border border-white'>
                <div className='row-span-2'>

                </div>
                <div className='row-span-1 bg-black text-white'>
                    {arena.name}
                </div>
            </div>
        </Link>
    )
}

export default ArenaCard
