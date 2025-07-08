import { Arena } from "@workspace/common/schemas/arena.schema";
import { requireAuth } from "@/lib/auth/requireAuth";
import ArenaCard from "./ArenaCard";
import { getUserArenas } from "@/actions/arenaActions";

const ArenasList:React.FC = async () => {
    const user = await requireAuth();
    const { id: userId } = user as { id: string };
    const userArenas = await getUserArenas(userId);
    return (
        <div className="flex flex-wrap gap-12">
            {userArenas.sort((arena1, arena2) => arena1.createdAt.getTime() - arena2.createdAt.getTime() ? -1 : 1).map((arena: Arena) => {
                return <ArenaCard key={arena.id} arena={arena} />
            })}
        </div>
    )
}

export default ArenasList
