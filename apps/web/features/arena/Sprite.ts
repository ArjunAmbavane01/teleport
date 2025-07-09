import { Direction } from "./types";
import { getDirectionRow } from "./utils/helper";

export class Sprite {
    posX: number;
    posY: number;
    width: number;
    height: number;
    frameNo: number = 0;

    private spriteImage: HTMLImageElement;
    private framesElapsed: number = 0;
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
        // console.log(this.posX, "  ", this.posY);
        const dirIndex = getDirectionRow(spriteDirection);

        const cropX = this.width / 2 + this.spriteImage.width / this.spritesheetCols * this.frameNo
        const cropY = this.height / 6 + this.spriteImage.height / this.spritesheetRows * (this.directionRowOffset + dirIndex);

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
        if (!isSpriteMoving) return;
        this.framesElapsed = (this.framesElapsed + 1) % 7;
        if (this.framesElapsed === 0) this.frameNo = (this.frameNo + 1) % this.framesPerDirection;
    }
}