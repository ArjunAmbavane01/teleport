"use client";

import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"

const SignInButton = () => {
    const router = useRouter();
    return (
        <Button className="p-1 bg-white" onClick={() => router.push('/auth/sign-in')}>Sign In</Button>
    )
}

export default SignInButton;
