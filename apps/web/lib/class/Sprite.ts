export class Sprite {
    private ctx: CanvasRenderingContext2D;
    private spriteImage: HTMLImageElement | null = null;
    private posX: number;
    private posY: number;
    private readonly spritesheetCols: number = 13;
    private readonly spritesheetRows: number = 54;
    private spriteWidth: number = 0;
    private spriteHeight: number = 0;
    private readonly framesPerDirection: number = 9;


    constructor(posX: number, posY: number, image: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.posX = posX;
        this.posY = posY;
        this.spriteImage = image;
        this.ctx = ctx;

        this.spriteWidth = this.spriteImage.width / this.spritesheetCols;
        this.spriteHeight = this.spriteImage.height / this.spritesheetRows;

    }

  

    /* 
    
    this.ctx.drawImage(
    image,
    cropping x,
    cropping y,
    cropping width,
    cropping height,
    actual x,
    actual y,
    actual width,
    actual height,
    )
    
    */

    render = (arenaWidth: number = 0, arenaHeight: number = 0) => {
        if (!this.spriteImage) return;
        this.ctx.drawImage(
            this.spriteImage,
            this.spriteWidth * 1,
            this.spriteHeight * 1,
            this.spriteWidth,
            this.spriteHeight,
            this.posX,
            this.posY,
            this.spriteWidth,
            this.spriteHeight
        );
    }
}