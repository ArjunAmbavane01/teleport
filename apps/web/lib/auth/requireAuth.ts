"use server"

import { auth } from "@/app/api/auth/[...nextauth]/options";  
import { User } from "next-auth";
import { redirect } from "next/navigation";

export const requireAuth = async (): Promise<User> => {
    const session = await auth();
    if (!session || !session.user) redirect('/auth/sign-in');
    return session.user;
} 