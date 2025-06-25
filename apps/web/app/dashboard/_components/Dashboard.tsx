import OpenNewArenaModalBtn from "@/components/buttons/OpenNewArenaModalBtn";
import { Suspense } from "react";
import ArenasList from "./ArenasList";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-20 p-10 mx-auto max-w-8xl w-full h-screen relative">
            <div className="flex items-center gap-10">
                <div className="text-3xl">
                    Dashboard
                </div>
                <OpenNewArenaModalBtn />
            </div>
            <div>
                <Suspense fallback={<div>Loading Arenas</div>}>
                    <ArenasList />
                </Suspense>
            </div>
        </div>
    )
}

export default Dashboard
