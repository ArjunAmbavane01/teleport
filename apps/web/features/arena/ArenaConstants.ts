import { Direction } from "@workspace/common/types";

export const TILE_SIZE = 16;
export const ARENA_ZOOM = 1.35;

export const ARENA_OFFSET_X = -150;
export const ARENA_OFFSET_Y = -400;

export const SPRITE_WIDTH = 32;
export const SPRITE_HEIGHT = 60;
export const FRAMES_PER_DIRECTION = 8;

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