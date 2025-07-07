import { ARENA_ZOOM, TILE_SIZE } from "../arena/ArenaConstants";

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
        ctx.fillStyle = 'red';
        ctx.fillRect(this.posX, this.posY, Boundary.width, Boundary.height);
    }

    move(moveX: number, moveY: number,ctx: CanvasRenderingContext2D) {
        this.posX += moveX;
        this.posY += moveY;
        console.log(this.posX);
        this.render(ctx);
    }

}