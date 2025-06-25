import NextAuth, { NextAuthConfig, NextAuthResult } from "next-auth"
import { prisma, PrismaClient } from "@workspace/db";
import { PrismaAdapter } from "@workspace/db/adapter";
import Google from "next-auth/providers/google"

const config: NextAuthConfig = {
    adapter: PrismaAdapter(prisma as PrismaClient),
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    },
    pages: {
        signIn: "/auth/sign-in",
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            allowDangerousEmailAccountLinking: true,
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                },
            };
        },
    },
}

export const result = NextAuth(config);
export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;