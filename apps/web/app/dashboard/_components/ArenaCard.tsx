import Link from "next/link";
import { Arena } from "@workspace/common/schemas/arena.schema";

interface ArenaCardProps {
    arena: Arena;
}

const ArenaCard: React.FC<ArenaCardProps> = ({ arena }: ArenaCardProps) => {
    return (
        <Link href={`/arena/${arena.slug}`} prefetch={false}>
            <div className='grid grid-rows-3 size-52 -lg bg-gray-700 border border-white'>
                <div className='row-span-2'>

                </div>
                <div className='flex flex-col gap-2 row-span-1 bg-black text-white p-3'>
                    <span> {arena.name}</span>
                    <span>{arena.createdAt.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    )
}

export default ArenaCard
