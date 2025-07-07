import { Boundary } from "../class/Boundary";
import { Sprite } from "../class/Sprite";
import { Keys, OFFSET_X, OFFSET_Y } from "./ArenaConstants";
import { collisionMap } from "./CollisionMap";
import { loadImage } from "./helper";

export class Arena {
    private ctx: CanvasRenderingContext2D;
    private arenaPosX: number = 0;
    private arenaPosY: number = 0;
    private arenaWidth: number = 2000;
    private arenaHeight: number = 2000;
    private arenaMapImage: HTMLImageElement | null = null;
    private sprite: Sprite | null = null;
    private lastKeyPressed: string | '' = '';
    private keys: typeof Keys = Keys;
    private collision_map: number[][] = [];
    private boundaries: Boundary[] = [];
    private testBoundary: Boundary;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.arenaWidth = canvas.width;
        this.arenaHeight = canvas.height;

        this.arenaPosX = OFFSET_X
        this.arenaPosY = OFFSET_Y;

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

        this.testBoundary = new Boundary(400, 300);
        this.testBoundary.render(this.ctx);

        window.addEventListener('keydown', this.handleMove);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    private handleKeyUp = (e: KeyboardEvent) => {
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
        const keyPressed = e.key.toLowerCase();
        switch (keyPressed) {
            case 'w':
                this.keys.w.pressed = true;
                this.lastKeyPressed = 'w';
                break;
            case 'a':
                this.keys.a.pressed = true;
                this.lastKeyPressed = 'a';
                break;
            case 's':
                this.keys.s.pressed = true;
                this.lastKeyPressed = 's';
                break;
            case 'd':
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
        if (this.arenaMapImage) this.ctx.drawImage(this.arenaMapImage, this.arenaPosX, this.arenaPosY);

        // if (!(this.boundaries.length === 0)) this.boundaries.forEach((boundary) => boundary.render(this.ctx));

        this.testBoundary.render(this.ctx);
        if (this.sprite) this.sprite.render();

        if (this.keys.w.pressed && this.lastKeyPressed === 'w') {
            // this.testBoundary.move(3, 3, this.ctx);
            this.testBoundary.posY += 3;
            this.arenaPosY += 3;
        }
        if (this.keys.a.pressed && this.lastKeyPressed === 'a') {
            this.arenaPosX += 3;
            this.testBoundary.posX += 3;

        }
        if (this.keys.s.pressed && this.lastKeyPressed === 's') {
            this.arenaPosY -= 3;
            this.testBoundary.posY -= 3;

        }
        if (this.keys.d.pressed && this.lastKeyPressed === 'd') {
            this.arenaPosX -= 3;
            this.testBoundary.posX -= 3;

        }
        // if (this.keys.arrowup.pressed && this.lastKeyPressed === 'arrowup') this.arenaPosY += 3;
        // if (this.keys.arrowleft.pressed && this.lastKeyPressed === 'arrowleft') this.arenaPosX += 3;
        // if (this.keys.arrowdown.pressed && this.lastKeyPressed === 'arrowdown') this.arenaPosY -= 3;
        // if (this.keys.arrowright.pressed && this.lastKeyPressed === 'arrowright') this.arenaPosX -= 3;
    }

    initializeAssets = async () => {
        const arenaImageSrc: string = '/maps/Teleport map.png';
        const spriteImageSrc: string = '/characters/Alex.png';
        this.arenaMapImage = await loadImage(arenaImageSrc);
        const spriteImage = await loadImage(spriteImageSrc);
        // sprite posx poy should be in center of screen
        this.sprite = new Sprite(460, 350, spriteImage, this.ctx);
        this.render();
    }

}