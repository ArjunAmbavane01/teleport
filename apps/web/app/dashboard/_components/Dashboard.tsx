"use client"

import OpenNewArenaModalBtn from "@/components/buttons/OpenNewArenaModalBtn";
import { Session } from "next-auth";
import { useState } from "react";
import CreateArenaModal from "./CreateArenaModal";

interface DashboardProps {
    session: Session | null;
}

const Dashboard: React.FC<DashboardProps> = ({ session }: DashboardProps) => {

    const [isCreateArenaModalOpen, setIsCreateArenaModalOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-5 p-10 mx-auto max-w-8xl w-full h-screen relative">
            <div className="flex items-center gap-10">
                <div className="text-3xl">
                    Dashboard
                </div>
                <OpenNewArenaModalBtn setIsCreateArenaModalOpen={setIsCreateArenaModalOpen} />
            </div>
            {isCreateArenaModalOpen && <CreateArenaModal setIsCreateArenaModalOpen={setIsCreateArenaModalOpen} session={session} />}
        </div>
    )
}

export default Dashboard
