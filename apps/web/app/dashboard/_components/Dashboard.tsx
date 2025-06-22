import CreateNewArenaBtn from "@/components/buttons/CreateNewArenaBtn"
import { Session } from "next-auth";

interface DashboardProps {
    session: Session | null;
}

const Dashboard: React.FC<DashboardProps> = async ({ session }: DashboardProps) => {
    return (
        <div className="flex flex-col gap-5 p-10 mx-auto max-w-8xl w-full h-screen">
            <div className="flex items-center gap-10">
                <div className="text-3xl">
                    Dashboard
                </div>
                <CreateNewArenaBtn session={session} />
            </div>
        </div>
    )
}

export default Dashboard
