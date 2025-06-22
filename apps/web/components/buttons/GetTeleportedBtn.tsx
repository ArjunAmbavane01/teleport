"use client"

import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

const GetTeleportedBtn = () => {
    const router = useRouter();
    return (
        <Button className="p-2 bg-white" onClick={() => router.push('/dashboard')}>Get Teleported</Button>
    )
}

export default GetTeleportedBtn
