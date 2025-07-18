import { User } from "next-auth";
import { getUserArenas } from "@/actions/arenaActions";
import { Arena } from "@workspace/db";
import ArenaCard from "./ArenaCard";

interface ArenasListProps {
    user: User;
}

const ArenasList: React.FC<ArenasListProps> = async ({ user }: ArenasListProps) => {
    const userArenas = await getUserArenas(user.id!);
    return (
        <div className="flex flex-wrap gap-12">
            {/* sorting the arenas using time */}
            {userArenas.sort((arena1, arena2) => arena1.createdAt.getTime() - arena2.createdAt.getTime() ? -1 : 1).map((arena: Arena) => {
                return <ArenaCard key={arena.id} arena={arena} />
            })}
        </div>
    )
}

export default ArenasList
