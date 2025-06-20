"use server"

import { auth } from "@/app/api/auth/[...nextauth]/options";

export const checkIsAuthenticated = async () => {
    const session = await auth();
    if(session) return true;
    else return false;
} 