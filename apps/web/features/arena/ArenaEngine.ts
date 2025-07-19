import { Sprite } from "./Sprite";
import { ForegroundMap } from "./Foreground";
import { Boundary } from "./Boundary";
import { rectangularCollision } from "./utils/collision";
import { COLLISION_MAP } from "./utils/CollisionMap";
import { loadImage } from "./utils/image";
import { ArenaCallbacks, Movables, otherUser, RemoteUser, SpriteImages, spriteImageSources } from "./types";
import { Keys, ARENA_OFFSET_X, ARENA_OFFSET_Y, MOVE_SPEED, COLLISION_BLOCK_ID, keyDirs, keyToDirection, SPRITE_WIDTH, SPRITE_HEIGHT, FRAMES_PER_DIRECTION, ARENA_MAP_IMAGE_URL, FOREGROUND_MAP_IMAGE_URL } from "./ArenaConstants";
import { isWithinProximity } from "./utils/proximity";
import { Dispatch, SetStateAction } from "react";
import { areArraysSame, frameDebounce } from "./utils/helper";
import { Direction, receivedChatMessage, SpriteCharacter } from "@workspace/common/types";
import { serverWsMessage } from "@workspace/common/schemas";


export class Arena {

    private ctx: CanvasRenderingContext2D;
    private username: string;
    private socket: WebSocket
    private posX: number;
    private posY: number;
    private centerX: number;
    private centerY: number;
    private arenaWidth: number;
    private arenaHeight: number;
    private arenaMapImage: HTMLImageElement | null = null;
    private localUser: Sprite | null = null;
    private otherUsers: otherUser[] = [];
    private currentProximityUserIds: string[] = [];
    private previousProximityUserIds: string[] = [];
    private foregroundMap: ForegroundMap | null = null;
    private spriteImages: SpriteImages = {} as SpriteImages;
    private boundaries: Boundary[] = [];
    private movables: Movables = [];
    private spriteCharacter: SpriteCharacter;

    private lastDirectionKey: string | '' = '';
    private keys: typeof Keys = Keys;
    private isUserMoving: boolean = false;
    private isUserTalking: boolean = false;
    private userDirection: Direction = 'up';

    private setUserIdsInProximity: Dispatch<SetStateAction<string[]>>;
    private setRemoteUsers: Dispatch<SetStateAction<RemoteUser[]>>;
    private handleIncomingMessage: (receivedData: receivedChatMessage) => void;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, socket: WebSocket, username: string, character: SpriteCharacter, callbacks: ArenaCallbacks) {

        this.ctx = ctx;
        this.socket = socket;
        this.username = username
        this.spriteCharacter = character;
        this.arenaWidth = canvas.width;
        this.arenaHeight = canvas.height;
        this.posX = ARENA_OFFSET_X;
        this.posY = ARENA_OFFSET_Y;

        this.centerX = canvas.clientWidth / 2;
        this.centerY = canvas.clientHeight / 2;

        this.setUserIdsInProximity = callbacks.setUserIdsInProximity;
        this.setRemoteUsers = callbacks.setRemoteUsers;
        this.handleIncomingMessage = callbacks.handleIncomingMessage;

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

        if (this.isUserTalking) return;
        this.isUserMoving = true;

        if (key in keyToDirection) this.userDirection = keyToDirection[key] as Direction;
    }

    private render = () => {
        window.requestAnimationFrame(this.render);
        this.currentProximityUserIds = [];
        this.ctx.clearRect(0, 0, this.arenaWidth, this.arenaHeight);
        if (this.arenaMapImage) this.ctx.drawImage(this.arenaMapImage, this.posX, this.posY);

        if (!(this.boundaries.length === 0)) this.boundaries.forEach(boundary => boundary.render(this.ctx));


        if (!this.localUser) return;
        this.localUser.render(this.isUserMoving, this.userDirection, this.ctx);


        if (this.otherUsers.length !== 0) {
            this.otherUsers.forEach(user => {
                const screenX = user.posX - this.centerX + this.localUser!.posX;
                const screenY = user.posY - this.centerY + this.localUser!.posY;

                user.sprite.posX = screenX;
                user.sprite.posY = screenY;

                user.sprite.render(user.isUserMoving, user.userDirection, this.ctx);
                if (!this.localUser) return;
                if (isWithinProximity(this.localUser.posX, this.localUser.posY, screenX, screenY) && !(this.currentProximityUserIds.includes(user.userId))) {
                    this.currentProximityUserIds.push(user.userId);
                }
            })
        }
        if (this.foregroundMap) this.foregroundMap.render(this.ctx);


        // check if proximity users list have changed since previous render
        this.debouncedCheckProximityUsersChange();

        this.sendUserUpdate();

        if (this.isUserTalking) return;

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
                this.centerY -= MOVE_SPEED;
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
                this.centerX -= MOVE_SPEED;
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
                this.centerY += MOVE_SPEED;
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
                this.centerX += MOVE_SPEED;
                this.movables.forEach(movable => (movable as { posX: number }).posX -= MOVE_SPEED);
            }
        }
    }


    // debounce for every 10 frames
    private debouncedCheckProximityUsersChange = frameDebounce(() => {
        if (!areArraysSame(this.currentProximityUserIds, this.previousProximityUserIds)) {
            this.previousProximityUserIds = [...this.currentProximityUserIds];
            this.setUserIdsInProximity((prevUserIds) => {
                if (!areArraysSame(prevUserIds, this.currentProximityUserIds)) return [...this.currentProximityUserIds];
                return [...prevUserIds];
            });
        }
    }, 10);

    private initAssets = async () => {

        const arenaImageSrc: string = ARENA_MAP_IMAGE_URL;
        const foregroundImageSrc: string = FOREGROUND_MAP_IMAGE_URL;

        // load images for arena, foreground and all sprites
        this.arenaMapImage = await loadImage(arenaImageSrc);
        const foregroundImage = await loadImage(foregroundImageSrc);

        for (const key in spriteImageSources) {
            const character = key as SpriteCharacter;
            const src = spriteImageSources[character];
            this.spriteImages[character] = await loadImage(src);
        }

        this.localUser = new Sprite(this.centerX, this.centerY, SPRITE_WIDTH, SPRITE_HEIGHT, FRAMES_PER_DIRECTION, this.spriteImages[this.spriteCharacter]);
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
                posX: this.centerX,
                posY: this.centerY,
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
                character: this.spriteCharacter,
                posX: this.localUser.posX,
                posY: this.localUser.posY,
                isUserMoving: this.isUserMoving,
                userDirection: this.userDirection
            }
        }))
    }

    private handleMessage = (event: MessageEvent) => {
        const parsedData = JSON.parse(event.data);
        const result = serverWsMessage.safeParse(parsedData);
        if (result.error) {
            console.error('Invalid Message Format :', result.error.message);
            return;
        }
        const recievedData = result.data;
        if (recievedData.type === 'hello') {
            if (this.otherUsers.find(user => user.userId === recievedData.data.senderId)) return;

            const screenX = recievedData.data.posX;
            const screenY = recievedData.data.posY;

            const userSprite = new Sprite(screenX, screenY, SPRITE_WIDTH, SPRITE_HEIGHT, FRAMES_PER_DIRECTION, this.spriteImages[recievedData.data.character as SpriteCharacter]);
            const newUser: otherUser = {
                sprite: userSprite,
                userId: recievedData.data.senderId,
                name: recievedData.data.name,
                posX: recievedData.data.posX,
                posY: recievedData.data.posY,
                character: recievedData.data.character as SpriteCharacter,
                isUserMoving: recievedData.data.isUserMoving,
                userDirection: recievedData.data.userDirection
            }

            this.otherUsers.push(newUser);
            this.setRemoteUsers((c) => [...c, {
                name: newUser.name,
                isOnline: true,
                lastOnline: null,
                spriteCharacter: newUser.character,
                userId: newUser.userId
            }])

            // send hello back
            this.sendHelloMessage();
        } else if (recievedData.type === 'user_update') {
            const user = this.otherUsers.find((user) => user.userId === recievedData.data.senderId);
            if (user) {
                user.posX = recievedData.data.posX;
                user.posY = recievedData.data.posY;
                user.isUserMoving = recievedData.data.isUserMoving;
                user.userDirection = recievedData.data.userDirection;
            }
        } else if (recievedData.type === 'chat') {
            this.handleIncomingMessage(recievedData);
        }
    }

    private initListeners = async () => {
        window.addEventListener('keydown', this.handleMove);
        window.addEventListener('keyup', this.handleKeyUp);
        this.socket.addEventListener('message', this.handleMessage);
    }

    setIsUserTalking = (value: boolean) => {
        this.isUserTalking = value;
    }

    destroy() {
        window.removeEventListener('keydown', this.handleMove);
        window.removeEventListener('keyup', this.handleKeyUp);
        this.socket.removeEventListener('message', this.handleMessage);
    }

}