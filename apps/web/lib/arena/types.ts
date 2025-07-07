import { Boundary } from "../class/Boundary";
import { ForegroundMap } from "../class/Foreground";
import { Arena } from "./arena-engine";

export type Movables = (Arena | ForegroundMap| Boundary)[];

export type Rect = { posX: number; posY: number; width: number; height: number };

export type Directions = 'up'|'down'|'left'|'right';