"use client"

import { Arena } from "@workspace/db";
import { useRouter } from "next/navigation";

interface ArenaCardProps {
    arena: Arena;
}

const ArenaCard: React.FC<ArenaCardProps> = ({ arena }: ArenaCardProps) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/arena/${arena.slug}`)}
            className='grid grid-rows-3 size-52 -lg bg-gray-700 border border-white'>
            <div className='row-span-2'>

            </div>
            <div className='flex flex-col gap-2 row-span-1 bg-black text-white p-3'>
                <span> {arena.name}</span>
                <span>{arena.createdAt.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default ArenaCard
