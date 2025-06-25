import { Arena } from "@workspace/common/schemas/arena.schema";
import { prisma } from "@workspace/db";
import { requireAuth } from "@/lib/auth/requireAuth";
import ArenaCard from "./ArenaCard";
import { getUserArenas } from "@/actions/arenaActions";

const ArenasList = async () => {
    const user = await requireAuth();
    const { id: userId } = user as { id: string };
    const userArenas = await getUserArenas(userId);
    console.log(userArenas)
    return (
        <div className="flex gap-12">
            {userArenas.map((arena: Arena) => <ArenaCard key={arena.id} arena={arena} />)}
        </div>
    )
}

export default ArenasList
