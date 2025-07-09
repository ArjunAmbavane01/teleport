import { Boundary } from "./Boundary";
import { ForegroundMap } from "./Foreground";
import { Arena } from "./ArenaEngine";
import { Sprite } from "./Sprite";

export type Movables = (Arena | ForegroundMap | Boundary | otherUser)[];

export type Rect = { posX: number; posY: number; width: number; height: number };

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface otherUser {
    userId: string;
    name: string;
    socket: WebSocket;
    posX: number;
    posY: number;
    character: SpriteCharacter;
    isUserMoving:boolean;
    userDirection:Direction;
}

export const spriteImageSources :Record<SpriteCharacter,string> = {
    alex:'/characters/Alex.png',
    bob:'/characters/Bob.png',
}

export interface userProximity {
    value:boolean,
    user:otherUser|null,
}

export type SpriteImages  = Record<SpriteCharacter, HTMLImageElement>;
export type SpriteCharacter = 'alex'|'bob';
