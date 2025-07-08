import { Boundary } from "./Boundary";
import { ForegroundMap } from "./Foreground";
import { Arena } from "./ArenaEngine";

export type Movables = (Arena | ForegroundMap | Boundary)[];

export type Rect = { posX: number; posY: number; width: number; height: number };

export type Directions = 'up' | 'down' | 'left' | 'right';