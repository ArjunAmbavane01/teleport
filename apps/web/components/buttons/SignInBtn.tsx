"use client";

import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"

const SignInButton: React.FC = () => {
    const router = useRouter();
    return <Button className="p-1 bg-white" onClick={() => router.push('/auth/sign-in')}>Sign In</Button>
}

export default SignInButton;
