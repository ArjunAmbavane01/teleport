import { ARENA_ZOOM, TILE_SIZE } from "./ArenaConstants";

export class Boundary {
    posX: number;
    posY: number;
    static width: number = TILE_SIZE * ARENA_ZOOM;
    static height: number = TILE_SIZE * ARENA_ZOOM;

    constructor(posX: number, posY: number) {
        this.posX = posX
        this.posY = posY
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.fillRect(this.posX, this.posY, Boundary.width, Boundary.height);
    }
}