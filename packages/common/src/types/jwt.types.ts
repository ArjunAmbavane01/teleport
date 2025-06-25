import { JwtPayload as BaseJWTPayload } from "jsonwebtoken";

export interface JWTPayload extends BaseJWTPayload {
    userId: string,
    arenaId: number;
}