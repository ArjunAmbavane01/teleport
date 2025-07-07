import { Directions } from "../arena/types";

export class Sprite {
    private ctx: CanvasRenderingContext2D;
    private spriteImage: HTMLImageElement | null = null;
    posX: number;
    posY: number;
    private readonly spritesheetCols: number = 13;
    private readonly spritesheetRows: number = 54;
    width: number;
    height: number;
    frameNo: number = 0;
    private framesPerDirection: number;


    constructor(posX: number, posY: number, width: number, height: number, framesPerDirection: number, image: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.posX = posX;
        this.posY = posY;
        this.spriteImage = image;
        this.ctx = ctx;

        this.framesPerDirection = framesPerDirection;
        // this.width = this.spriteImage.width / this.spritesheetCols;
        // this.height = this.spriteImage.height / this.spritesheetRows;
        this.width = width;
        this.height = height;

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

    render = (isSpriteMoving: boolean,spriteDirection:Directions, arenaWidth: number = 0, arenaHeight: number = 0) => {
        if (!this.spriteImage) return;
        let direction;
        switch(spriteDirection){
            case 'up': {
                direction=0;
                break;
            }
            case 'left': {
                direction=1;
                break;
            }
            case 'down': {
                direction=2;
                break;
            }
            case 'right': {
                direction=3;
                break;
            }
        }
        this.ctx.drawImage(
            this.spriteImage,
            this.width / 2 + this.spriteImage.width / this.spritesheetCols * this.frameNo,
            this.height / 6 + this.spriteImage.height / this.spritesheetRows * (8 + direction),
            this.width,
            this.height,
            this.posX,
            this.posY,
            this.width,
            this.height,
        );
        if (isSpriteMoving) {
            this.frameNo = this.frameNo < this.framesPerDirection ? this.frameNo + 1 : 0;
            console.log(this.frameNo)
        }
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