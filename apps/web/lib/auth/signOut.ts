import { signOut } from "next-auth/react";

export const handleSignOut = async () => {
    try {
        await signOut({
            redirectTo: "/",
        });
    } catch (err) {
        console.error(err);
    }
}