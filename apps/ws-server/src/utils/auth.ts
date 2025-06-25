import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@workspace/common/config";
import { JWTPayload } from "@workspace/common/types/jwt.types";
import { IUser } from "../index.js";

export const validateToken = (token: string | null, users: IUser[]) => {
    try {
        if (!token) return { type: "error", message: "Token not present" };
        const payload = jwt.verify(token, JWT_SECRET);
        if (!payload || typeof payload === "string") return { type: "error", message: "Invalid Token" };
        const { userId, arenaId } = payload as JWTPayload;
        const user = users.find((user: IUser) => user.userId === userId)
        return { type: "success", data: { userId, arenaId, user } };
    } catch (e) {
        console.error(e);
        return { type: "error", message: "Token expired" };
    }
}