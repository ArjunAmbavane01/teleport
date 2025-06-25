import { sign } from "jsonwebtoken"
import dotenv from 'dotenv';
import { JWT_SECRET } from "../config.js";
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