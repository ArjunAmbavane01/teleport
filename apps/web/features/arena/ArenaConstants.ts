import { Direction } from "./types";

export const TILE_SIZE = 16;
export const ARENA_ZOOM = 1.35;

export const ARENA_OFFSET_X = -450;
export const ARENA_OFFSET_Y = -700;
// sprite posX and posY should be in the center of screen
export const DEFAULT_USER_POS_X = 460;
export const DEFAULT_USER_POS_Y = 350;

// change it back to 3
export const MOVE_SPEED = 7;
export const COLLISION_BLOCK_ID = 34774;

export const Keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    arrowup: { pressed: false },
    arrowleft: { pressed: false },
    arrowdown: { pressed: false },
    arrowright: { pressed: false }
};

export const keyToDirection: Record<string, Direction> = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
    arrowup: 'up',
    arrowleft: 'left',
    arrowdown: 'down',
    arrowright: 'right',
};

export const keyDirs = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];