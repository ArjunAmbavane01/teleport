import { Boundary } from "./Boundary";
import { ForegroundMap } from "./Foreground";
import { Arena } from "./ArenaEngine";
import { Sprite } from "./Sprite";
import { Dispatch, SetStateAction } from "react";

export type Movables = (Arena | ForegroundMap | Boundary | otherUser)[];

export type Rect = { posX: number; posY: number; width: number; height: number };

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface otherUser {
    sprite: Sprite;
    userId: string;
    name: string;
    posX: number;
    posY: number;
    character: SpriteCharacter;
    isUserMoving: boolean;
    userDirection: Direction;
}

export interface RemoteUser {
    userId: string;
    name: string;
    isOnline: boolean;
    lastSeen: Date;
    spriteCharacter: SpriteCharacter;
}

export const spriteImageSources: Record<SpriteCharacter, string> = {
    alex: '/characters/Alex.png',
    bob: '/characters/Bob.png',
}

export interface userProximity {
    value: boolean,
    user: otherUser | null,
}

export type SpriteImages = Record<SpriteCharacter, HTMLImageElement>;
export type SpriteCharacter = 'alex' | 'bob';

export type ArenaCallbacks = {
    setUserIdsInProximity: Dispatch<SetStateAction<string[]>>,
    setRemoteUsers: Dispatch<SetStateAction<RemoteUser[]>>,
}