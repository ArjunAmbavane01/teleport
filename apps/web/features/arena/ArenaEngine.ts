import { Sprite } from "./Sprite";
import { ForegroundMap } from "./Foreground";
import { Boundary } from "./Boundary";
import { rectangularCollision } from "./utils/collision";
import { COLLISION_MAP } from "./utils/CollisionMap";
import { loadImage } from "./utils/image";
import { Direction, Movables, otherUser, SpriteCharacter, SpriteImages, spriteImageSources, userProximity } from "./types";
import { Keys, ARENA_OFFSET_X, ARENA_OFFSET_Y, MOVE_SPEED, COLLISION_BLOCK_ID, DEFAULT_USER_POS_Y, DEFAULT_USER_POS_X, keyDirs, keyToDirection } from "./ArenaConstants";
import { isWithinProximity } from "./utils/proximity";

export class Arena {

    userInProximity: otherUser | null = null;

    private ctx: CanvasRenderingContext2D;
    private username: string;
    private socket: WebSocket
    private posX: number;
    private posY: number;
    private worldPosX: number = DEFAULT_USER_POS_X;
    private worldPosY: number = DEFAULT_USER_POS_Y;
    private arenaWidth: number;
    private arenaHeight: number;
    private arenaMapImage: HTMLImageElement | null = null;
    private localUser: Sprite | null = null;
    private otherUsers: otherUser[] = [];
    private foregroundMap: ForegroundMap | null = null;
    private spriteImages: SpriteImages = {} as SpriteImages;
    private boundaries: Boundary[] = [];
    private movables: Movables = [];
    private spriteCharacter: SpriteCharacter;

    private lastDirectionKey: string | '' = '';
    private keys: typeof Keys = Keys;
    private isUserMoving: boolean = false;
    private userDirection: Direction = 'up';

    private proximityChatTriggerOn: () => void;
    private proximityChatTriggerOff: () => void;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, socket: WebSocket, username: string, character: SpriteCharacter, proximityChatTriggerOn: () => void, proximityChatTriggerOff: () => void) {

        this.ctx = ctx;
        this.socket = socket;
        this.username = username
        this.spriteCharacter = character;
        this.arenaWidth = canvas.width;
        this.arenaHeight = canvas.height;
        this.posX = ARENA_OFFSET_X;
        this.posY = ARENA_OFFSET_Y;

        this.proximityChatTriggerOn = proximityChatTriggerOn;
        this.proximityChatTriggerOff = proximityChatTriggerOff;

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
        });
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

        // i think here also add isUserTalking to skip this setting of isUserMoving
        this.isUserMoving = true;

        if (key in keyToDirection) this.userDirection = keyToDirection[key] as Direction;
    }

    private render = () => {
        window.requestAnimationFrame(this.render);
        this.ctx.clearRect(0, 0, this.arenaWidth, this.arenaHeight);
        if (this.arenaMapImage) this.ctx.drawImage(this.arenaMapImage, this.posX, this.posY);

        if (!(this.boundaries.length === 0)) this.boundaries.forEach(boundary => boundary.render(this.ctx));


        if (!this.localUser) return;
        this.localUser.render(this.isUserMoving, this.userDirection, this.ctx);

        if (this.foregroundMap) this.foregroundMap.render(this.ctx);

        if (this.otherUsers.length !== 0) {
            this.otherUsers.forEach(user => {
                const screenX = user.posX - this.worldPosX + this.localUser!.posX;
                const screenY = user.posY - this.worldPosY + this.localUser!.posY;

                user.sprite.posX = screenX;
                user.sprite.posY = screenY;

                user.sprite.render(user.isUserMoving, user.userDirection, this.ctx);
                if (!this.localUser) return;
                if (isWithinProximity(this.localUser.posX, this.localUser.posY, screenX, screenY)) this.userInProximity = user;
            })
        }

        if (this.userInProximity) this.proximityChatTriggerOn();
        else this.proximityChatTriggerOff();

        this.sendUserUpdate();

        // check if any other user is near
        // and if yes then set isTalking to true
        // also set isUserMoving to false
        // and have if(isTalking) return 


        let canSpriteMove: boolean = true;
        if (this.keys.w.pressed && this.lastDirectionKey === 'w') {
            // loop is to check if user is clashing with any boundary or not
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX, posY: boundary.posY + MOVE_SPEED } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) {
                this.worldPosY -= MOVE_SPEED;
                this.movables.forEach(movable => (movable as { posY: number }).posY += MOVE_SPEED)
            };

        } else if (this.keys.a.pressed && this.lastDirectionKey === 'a') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX + MOVE_SPEED, posY: boundary.posY } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) {
                this.worldPosX -= MOVE_SPEED;
                this.movables.forEach(movable => (movable as { posX: number }).posX += MOVE_SPEED);
            }

        } else if (this.keys.s.pressed && this.lastDirectionKey === 's') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX, posY: boundary.posY - MOVE_SPEED } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) {
                this.worldPosY += MOVE_SPEED;
                this.movables.forEach(movable => (movable as { posY: number }).posY -= MOVE_SPEED);
            }

        } else if (this.keys.d.pressed && this.lastDirectionKey === 'd') {
            for (let i = 0; i < this.boundaries.length; i++) {
                const boundary = this.boundaries[i] as Boundary;
                if (this.localUser && rectangularCollision(this.localUser, { posX: boundary.posX - MOVE_SPEED, posY: boundary.posY } as Boundary)) {
                    canSpriteMove = false;
                    break;
                }
            }
            if (canSpriteMove) {
                this.worldPosX += MOVE_SPEED;
                this.movables.forEach(movable => (movable as { posX: number }).posX -= MOVE_SPEED);
            }
        }
    }

    private initAssets = async () => {

        const arenaImageSrc: string = '/maps/arenaMap.png';
        const foregroundImageSrc: string = '/maps/foregroundMap.png';

        this.arenaMapImage = await loadImage(arenaImageSrc);
        const foregroundImage = await loadImage(foregroundImageSrc);
        for (const key in spriteImageSources) {
            const character = key as SpriteCharacter;
            const src = spriteImageSources[character];
            this.spriteImages[character] = await loadImage(src);
        }

        this.localUser = new Sprite(DEFAULT_USER_POS_X, DEFAULT_USER_POS_Y, 32, 60, 8, this.spriteImages[this.spriteCharacter]);
        this.foregroundMap = new ForegroundMap(ARENA_OFFSET_X, ARENA_OFFSET_Y, this.arenaWidth, this.arenaHeight, foregroundImage)
        this.movables = [this, this.foregroundMap, ...this.boundaries];

        this.sendHelloMessage();
        this.render();
    }


    private sendUserUpdate = () => {
        if (!this.localUser) return;
        this.socket.send(JSON.stringify({
            type: 'user_update',
            data: {
                posX: this.worldPosX,
                posY: this.worldPosY,
                isUserMoving: this.isUserMoving,
                userDirection: this.userDirection
            }
        }))
    }

    private sendHelloMessage = () => {


        if (!this.localUser) return;
        this.socket.send(JSON.stringify({
            type: 'hello',
            data: {
                name: this.username,
                posX: this.localUser.posX,
                posY: this.localUser.posY,
                character: this.spriteCharacter,
                isUserMoving: this.isUserMoving,
                userDirection: this.userDirection
            }
        }))
    }

    private handleMessage = (event: MessageEvent) => {
        const recievedData = JSON.parse(event.data);
        if (recievedData.type === 'hello') {
            const data = recievedData.data;

            const screenX = data.posX;
            const screenY = data.posY;

            const userSprite = new Sprite(screenX, screenY, 32, 60, 8, this.spriteImages[data.character as SpriteCharacter]);
            const newUser: otherUser = {
                sprite: userSprite,
                userId: data.userId,
                name: data.name,
                posX: data.posX,
                posY: data.posY,
                character: data.character as SpriteCharacter,
                isUserMoving: data.isUserMoving,
                userDirection: data.userDirection
            }

            console.log('newUser  : ', newUser)

            this.otherUsers.push(newUser);

            // const screenX = recievedData.posX + this.posX;
            // const screenY = recievedData.posY + this.posY;
            console.log('created sprite')
        }
        else if (recievedData.type === 'user_update') {
            const senderId = recievedData.data.userId;
            const user = this.otherUsers.find((user) => user.userId === senderId);
            if (user) {
                const data = recievedData.data;
                user.posX = data.posX;
                user.posY = data.posY;
                user.isUserMoving = data.isUserMoving;
                user.userDirection = data.userDirection;
            }
        }
    }

    private initListeners = async () => {
        window.addEventListener('keydown', this.handleMove);
        window.addEventListener('keyup', this.handleKeyUp);
        this.socket.addEventListener('message', this.handleMessage);
    }

    destroy() {
        window.removeEventListener('keydown', this.handleMove);
        window.removeEventListener('keyup', this.handleKeyUp);
        this.socket.removeEventListener('message', this.handleMessage);
    }

}