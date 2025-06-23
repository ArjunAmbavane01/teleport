"use client"

import { Button } from "@workspace/ui/components/button"
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface CreateNewArenaBtnProps {
    session: Session | null;
}

const CreateNewArenaBtn: React.FC<CreateNewArenaBtnProps> = ({ session }: CreateNewArenaBtnProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    if (!session || !session.user) return;
    const { id: userId } = session.user;
    const createNewArena = async () => {
        setLoading(c => !c);
        setTimeout(()=>setLoading(false),4000);
        // const response = await axios.post('/api/arena/createArena', {
        //     userId
        // });
        // const { type, message, data } = response.data;
        // if (type === "error") {
            
        // }
        // setLoading(c => !c);
    }

    return (
        <Button className="bg-white p-2 w-full" onClick={createNewArena}>{
            loading ? (
                <>
                    Creating <CgSpinner className="animate-spin" />
                </>
            ) : (
                <>
                    Create Arena
                </>
            )
        }</Button>
    )
}

export default CreateNewArenaBtn;
