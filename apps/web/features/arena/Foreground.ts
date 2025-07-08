export class ForegroundMap {
    posX: number;
    posY: number;
    width: number;
    height: number;
    private foregroundImage: HTMLImageElement | null = null;

    constructor(posX: number, posY: number, width: number, height: number, image: HTMLImageElement) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.foregroundImage = image;
    }

    render = (ctx: CanvasRenderingContext2D) => {
        if (!this.foregroundImage) return;
        ctx.drawImage(this.foregroundImage, this.posX, this.posY);
    }
}