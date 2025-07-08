import { Direction } from "./types";
import { getDirectionRow } from "./utils/helper";

export class Sprite {
    posX: number;
    posY: number;
    width: number;
    height: number;
    frameNo: number = 0;

    private spriteImage: HTMLImageElement;
    private readonly spritesheetCols = 13;
    private readonly spritesheetRows = 54;
    private readonly framesPerDirection: number;
    private readonly directionRowOffset = 8;

    constructor(posX: number, posY: number, width: number, height: number, framesPerDirection: number, image: HTMLImageElement) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.spriteImage = image;
        this.framesPerDirection = framesPerDirection;
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

    render = (isSpriteMoving: boolean, spriteDirection: Direction, ctx: CanvasRenderingContext2D) => {
        if (!this.spriteImage) return;
        const dirIndex = getDirectionRow(spriteDirection);

        const cropX = this.width / 2 + this.spriteImage.width / this.spritesheetCols * this.frameNo
        const cropY = this.height / 6 + this.spriteImage.height / this.spritesheetRows * (8 + dirIndex);

        ctx.drawImage(
            this.spriteImage,
            cropX,
            cropY,
            this.width,
            this.height,
            this.posX,
            this.posY,
            this.width,
            this.height,
        );
        if (isSpriteMoving) this.frameNo = (this.frameNo + 1) % this.framesPerDirection;
    }
}

/*  

export class Sprite {
    private ctx: CanvasRenderingContext2D;
    private spriteImage: HTMLImageElement | null = null;
    posX: number;
    posY: number;
    private readonly spritesheetCols: number = 13;
    private readonly spritesheetRows: number = 54;
    width: number;
    height: number;
    private readonly framesPerDirection: number = 9;


    constructor(posX: number, posY: number, image: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.posX = posX;
        this.posY = posY;
        this.spriteImage = image;
        this.ctx = ctx;

        this.width = this.spriteImage.width / this.spritesheetCols / 2;
        this.height = this.spriteImage.height / this.spritesheetRows;

    }

    render = (arenaWidth: number = 0, arenaHeight: number = 0) => {
        if (!this.spriteImage) return;

        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(
            this.spriteImage,
            this.width * 2 + this.width/2,
            this.height * 1,
            this.width,
            this.height,
            this.posX,
            this.posY,
            this.width,
            this.height,
        );
    }
}


*/