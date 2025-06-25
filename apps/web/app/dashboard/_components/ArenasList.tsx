import { Arena } from "@workspace/common/schemas/arena.schema";
import { prisma } from "@workspace/db";
import { requireAuth } from "@/lib/auth/requireAuth";
import ArenaCard from "./ArenaCard";

const ArenasList = async () => {
    const user = await requireAuth();
    const { id: userId } = user;
    const userArenas: Arena[] = await prisma.arena.findMany({
        where: {
            OR: [
                { adminId: userId },
                { users: { some: { id: userId } } }
            ]
        }
    });
    console.log(userArenas)
    return (
        <div className="flex gap-12">
            {userArenas.map((arena:Arena)=> <ArenaCard key={arena.id} arena={arena} />)}
        </div>
    )
}

export default ArenasList
