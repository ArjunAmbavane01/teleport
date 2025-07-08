import { Sprite } from "./Sprite";
import { ForegroundMap } from "./Foreground";
import { Boundary } from "./Boundary";
import { rectangularCollision } from "./utils/collision";
import { COLLISION_MAP } from "./utils/CollisionMap";
import { loadImage } from "./utils/image";
import { Direction, Movables } from "./types";
import { Keys, ARENA_OFFSET_X, ARENA_OFFSET_Y, MOVE_SPEED, COLLISION_BLOCK_ID, DEFAULT_USER_POS_Y, DEFAULT_USER_POS_X, keyDirs, keyToDirection } from "./ArenaConstants";

export class Arena {

    private ctx: CanvasRenderingContext2D;
    private posX: number;
    private posY: number;
    private arenaWidth: number;
    private arenaHeight: number;
    private arenaMapImage: HTMLImageElement | null = null;
    private localUser: Sprite | null = null;
    private otherUsers: Sprite[] = [];
    private boundaries: Boundary[] = [];
    private movables: Movables = [];
    private foregroundMap: ForegroundMap | null = null;

    private lastDirectionKey: string | '' = '';
    private keys: typeof Keys = Keys;
    private isUserMoving: boolean = false;
    private userDirection: Direction = 'up';


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        this.ctx = ctx;
        this.arenaWidth = canvas.width;
        this.arenaHeight = canvas.height;
        this.posX = ARENA_OFFSET_X;
        this.posY = ARENA_OFFSET_Y;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.arenaWidth, this.arenaHeight);

        this.initAssets();
        this.initListeners();

        const collisionMap: number[][] = [];
        for (let i = 0; i < COLLISION_MAP.length; i += 100) collisionMap.push(COLLISION_MAP.slice(i, 100 + i));

        collisionMap.forEach((row, rowIdx) => {
            row.forEach((block, colIdx) => {
                if (block === COLLISION_BLOCK_ID) {
                    this.boundaries.push(new Boundary(ARENA_OFFSET_X + colIdx * Boundary.width, ARENA_OFFSET_Y + rowIdx * Boundary.height));
                }
            })
        })

    }

    private handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (keyDirs.includes(key)) {
            this.keys[key as keyof typeof this.keys].pressed = false;
            this.isUserMoving = false;
        }
    }

    private handleMove = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (!keyDirs.includes(key)) return;

        this.keys[key as keyof typeof this.keys].pressed = true;
        this.lastDirectionKey = key;
        this.isUserMoving = true;

        if (key in keyToDirection) {
            this.userDirection = keyToDirection[key] as Direction;
        }
    }

    private render = () => {
        window.requestAnimationFrame(this.render);
        this.ctx.clearRect(0, 0, this.arenaWidth, this.arenaHeight);
        if (this.arenaMapImage) this.ctx.drawImage(this.arenaMapImage, this.posX, this.posY);

        if (!(this.boundaries.length === 0)) this.boundaries.forEach(boundary => boundary.render(this.ctx));

        if (this.localUser) this.localUser.render(this.isUserMoving, this.userDirection, this.ctx);

        if (this.foregroundMap) this.foregroundMap.render(this.ctx);

        let canSpriteMove: boolean = true;

        if (this.keys.w.pressed && this.lastDirectionKey === 'w') {
            // loop is to check if user is clashing or not
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX, posY: boundary.posY + MOVE_SPEED } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) this.movables.forEach(movable => (movable as { posY: number }).posY += MOVE_SPEED);

        } else if (this.keys.a.pressed && this.lastDirectionKey === 'a') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX + MOVE_SPEED, posY: boundary.posY } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) this.movables.forEach(movable => (movable as { posX: number }).posX += MOVE_SPEED);

        } else if (this.keys.s.pressed && this.lastDirectionKey === 's') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX, posY: boundary.posY - MOVE_SPEED } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) this.movables.forEach(movable => (movable as { posY: number }).posY -= MOVE_SPEED);

        } else if (this.keys.d.pressed && this.lastDirectionKey === 'd') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX - MOVE_SPEED, posY: boundary.posY } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) this.movables.forEach(movable => (movable as { posX: number }).posX -= MOVE_SPEED);

        }
    }

    private initAssets = async () => {

        const arenaImageSrc: string = '/maps/arenaMap.png';
        const spriteImageSrc: string = '/characters/Alex.png';
        const foregroundImageSrc: string = '/maps/foregroundMap.png';

        this.arenaMapImage = await loadImage(arenaImageSrc);
        const spriteImage = await loadImage(spriteImageSrc);
        const foregroundImage = await loadImage(foregroundImageSrc);

        this.localUser = new Sprite(DEFAULT_USER_POS_X, DEFAULT_USER_POS_Y, 32, 60, 8, spriteImage);
        this.foregroundMap = new ForegroundMap(ARENA_OFFSET_X, ARENA_OFFSET_Y, this.arenaWidth, this.arenaHeight, foregroundImage)

        this.movables = [this, this.foregroundMap, ...this.boundaries,];
        this.render();
    }

    private initListeners = async () => {
        window.addEventListener('keydown', this.handleMove);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    destroy() {
        window.removeEventListener('keydown', this.handleMove);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

}