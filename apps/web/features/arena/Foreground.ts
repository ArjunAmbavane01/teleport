
export class ForegroundMap {
    private ctx: CanvasRenderingContext2D;
    private foregroundImage: HTMLImageElement | null = null;
    posX: number;
    posY: number;
    width: number;
    height: number;


    constructor(posX: number, posY: number, width: number, height: number, image: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.posX = posX;
        this.posY = posY;
        this.foregroundImage = image;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

    }

    render = (arenaWidth: number = 0, arenaHeight: number = 0) => {
        if (!this.foregroundImage) return;
        this.ctx.drawImage(this.foregroundImage, this.posX, this.posY);
    }
}