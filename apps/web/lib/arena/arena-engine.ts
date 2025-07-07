import { Boundary } from "../class/Boundary";
import { ForegroundMap } from "../class/Foreground";
import { Sprite } from "../class/Sprite";
import { Keys, OFFSET_X, OFFSET_Y } from "./ArenaConstants";
import { collisionMap } from "./CollisionMap";
import { loadImage, rectangularCollision } from "./helper";
import { Directions, Movables } from "./types";

export class Arena {
    private ctx: CanvasRenderingContext2D;
    private posX: number = 0;
    private posY: number = 0;
    private arenaWidth: number = 2000;
    private arenaHeight: number = 2000;
    private arenaMapImage: HTMLImageElement | null = null;
    private sprite: Sprite | null = null;
    private lastKeyPressed: string | '' = '';
    private keys: typeof Keys = Keys;
    private collision_map: number[][] = [];
    private boundaries: Boundary[] = [];
    private movables: Movables = [];
    private foregroundMap: ForegroundMap | null = null;
    private isSpriteMoving: boolean = false;
    private spriteDirection:Directions = 'up';


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.arenaWidth = canvas.width;
        this.arenaHeight = canvas.height;

        this.posX = OFFSET_X
        this.posY = OFFSET_Y;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.arenaWidth, this.arenaHeight);

        this.initializeAssets();

        for (let i = 0; i < collisionMap.length; i += 100) {
            this.collision_map.push(collisionMap.slice(i, 100 + i));
        }

        this.collision_map.forEach((row, rowIdx) => {
            row.forEach((block, colIdx) => {
                if (block === 34774) {
                    this.boundaries.push(new Boundary(OFFSET_X + colIdx * Boundary.width, OFFSET_Y + rowIdx * Boundary.height));
                }

            })
        })

        this.movables = [this, ...this.boundaries];

        window.addEventListener('keydown', this.handleMove);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    private handleKeyUp = (e: KeyboardEvent) => {
        this.isSpriteMoving = false
        const keyPressed = e.key.toLowerCase();
        switch (keyPressed) {
            case 'w':
                this.keys.w.pressed = false;
                break;
            case 'a':
                this.keys.a.pressed = false;
                break;
            case 's':
                this.keys.s.pressed = false;
                break;
            case 'd':
                this.keys.d.pressed = false;
                break;
            case 'arrowup':
                this.keys.arrowup.pressed = false;
                break;
            case 'arrowleft':
                this.keys.arrowleft.pressed = false;
                break;
            case 'arrowdown':
                this.keys.arrowdown.pressed = false;
                break;
            case 'arrowright':
                this.keys.arrowright.pressed = false;
                break;
        }
    }

    private handleMove = (e: KeyboardEvent) => {
        this.isSpriteMoving = true;
        const keyPressed = e.key.toLowerCase();
        switch (keyPressed) {
            case 'w':
                this.spriteDirection = 'up';
                this.keys.w.pressed = true;
                this.lastKeyPressed = 'w';
                break;
            case 'a':
                     this.spriteDirection = 'left';
                this.keys.a.pressed = true;
                this.lastKeyPressed = 'a';
                break;
            case 's':
                this.spriteDirection = 'down';
                this.keys.s.pressed = true;
                this.lastKeyPressed = 's';
                break;
            case 'd':
                this.spriteDirection = 'right';
                this.keys.d.pressed = true;
                this.lastKeyPressed = 'd';
                break;
            case 'arrowup':
                this.keys.arrowup.pressed = true;
                this.lastKeyPressed = 'arrowup';
                break;
            case 'arrowleft':
                this.keys.arrowleft.pressed = true;
                this.lastKeyPressed = 'arrowleft';
                break;
            case 'arrowdown':
                this.keys.arrowdown.pressed = true;
                this.lastKeyPressed = 'arrowdown';
                break;
            case 'arrowright':
                this.keys.arrowright.pressed = true;
                this.lastKeyPressed = 'arrowright';
                break;
        }
    }

    private render = () => {
        
        window.requestAnimationFrame(this.render);
        this.ctx.clearRect(0, 0, this.arenaWidth, this.arenaHeight);
        if (this.arenaMapImage) this.ctx.drawImage(this.arenaMapImage, this.posX, this.posY);

        if (!(this.boundaries.length === 0)) this.boundaries.forEach((boundary) => {
            boundary.render(this.ctx);
        });

        if (this.sprite) {
            this.sprite.render(this.isSpriteMoving,this.spriteDirection);
        }

        if (this.foregroundMap) {
            this.foregroundMap.render();
        }

        let canSpriteMove: boolean = true;

        if (this.keys.w.pressed && this.lastKeyPressed === 'w') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.sprite && rectangularCollision(this.sprite, {
                    posX: boundary.posX,
                    posY: boundary.posY + 3,
                } as Boundary)
                ) {
                    canSpriteMove = false;
                    break;
                }
            }

            if (canSpriteMove) this.movables.forEach((movable) => (movable as { posY: number }).posY += 3);
        }
        else if (this.keys.a.pressed && this.lastKeyPressed === 'a') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.sprite && rectangularCollision(this.sprite, {
                    posX: boundary.posX + 3,
                    posY: boundary.posY,
                } as Boundary)
                ) {
                    canSpriteMove = false;
                    break;
                }
            }

            if (canSpriteMove) this.movables.forEach((movable) => (movable as { posX: number }).posX += 3);

        }
        else if (this.keys.s.pressed && this.lastKeyPressed === 's') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.sprite && rectangularCollision(this.sprite, {
                    posX: boundary.posX,
                    posY: boundary.posY - 3,
                } as Boundary)
                ) {
                    canSpriteMove = false;
                    break;
                }
            }

            if (canSpriteMove) this.movables.forEach((movable) => (movable as { posY: number }).posY -= 3);

        }
        else if (this.keys.d.pressed && this.lastKeyPressed === 'd') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.sprite && rectangularCollision(this.sprite, {
                    posX: boundary.posX - 3,
                    posY: boundary.posY,
                } as Boundary)
                ) {
                    canSpriteMove = false;
                    break;
                }
            }

            if (canSpriteMove) this.movables.forEach((movable) => (movable as { posX: number }).posX -= 3);
        }
        // if (this.keys.arrowup.pressed && this.lastKeyPressed === 'arrowup') this.posY += 3;
        // if (this.keys.arrowleft.pressed && this.lastKeyPressed === 'arrowleft') this.posX += 3;
        // if (this.keys.arrowdown.pressed && this.lastKeyPressed === 'arrowdown') this.posY -= 3;
        // if (this.keys.arrowright.pressed && this.lastKeyPressed === 'arrowright') this.posX -= 3;
    }

    initializeAssets = async () => {
        const arenaImageSrc: string = '/maps/Teleport map.png';
        const spriteImageSrc: string = '/characters/Alex.png';
        const foregroundImageSrc: string = '/maps/Foreground map.png';
        this.arenaMapImage = await loadImage(arenaImageSrc);
        const spriteImage = await loadImage(spriteImageSrc);
        const foregroundImage = await loadImage(foregroundImageSrc);
        // sprite posx poy should be in center of screen
        this.sprite = new Sprite(460, 350, 32, 60, 8, spriteImage, this.ctx);
        this.foregroundMap = new ForegroundMap(OFFSET_X, OFFSET_Y, this.arenaWidth, this.arenaHeight, foregroundImage, this.ctx)
        this.movables.push(this.foregroundMap);
        this.render();
    }

}