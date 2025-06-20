"use client";

import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"

const SignInButton = () => {
    const router = useRouter();
    return (
        <Button onClick={() => router.push('/auth/sign-in')}>Sign In</Button>
    )
}

export default SignInButton;
