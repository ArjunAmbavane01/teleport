export const TILE_SIZE = 16;
export const ARENA_ZOOM = 1.35;
export const OFFSET_X = -450;
export const OFFSET_Y = -700;



export const ARENA_COLS = 32;
export const ARENA_ROWS = 23;

export const ARENA_WIDTH = TILE_SIZE * (ARENA_COLS - 2);
export const ARENA_HEIGHT = TILE_SIZE * (ARENA_ROWS - 2);

// export let OFFSET_X = 0;
// export let OFFSET_Y = TILE_SIZE / 2;

export const DEFAULT_POS_X = 15 * TILE_SIZE;
export const DEFAULT_POS_Y = 11 * TILE_SIZE;

export const ANIMATION_SPEED = 0.15;
export const MOVE_SPEED = 3;

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