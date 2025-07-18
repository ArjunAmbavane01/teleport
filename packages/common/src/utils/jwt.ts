"use server"

import { sign } from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";
import dotenv from 'dotenv';
dotenv.config();

export const createWsToken = (userId: string,arenaId:number): string | undefined => {
    try {
        const token = sign({
            userId,
            arenaId
        }, JWT_SECRET, {
            expiresIn: '10m'
        })
        return token;
    } catch (e) {
        console.error('JWT token creation failed ', e);
        return undefined;
    }
}