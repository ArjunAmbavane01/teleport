"use client"

import { handleSignOut } from "@/lib/auth/signOut";
import { Button } from "@workspace/ui/components/button"

const SignOutButton = () => {
    return (
        <Button onClick={() => handleSignOut()}>Sign Out</Button>
    )
}

export default SignOutButton
