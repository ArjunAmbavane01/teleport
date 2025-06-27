"use client"

import { useEffect, useRef, useState } from "react";
import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";
import { ARENA_COLS, ARENA_ROWS, OFFSET_X, OFFSET_Y, TILE_SIZE } from "@/lib/arena/ArenaConstants";
import { COLLISION_MAP } from "@/lib/arena/CollisionMap";

const ArenaMap: React.FC = () => {
    const [isArenaLoaded, setIsArenaLoaded] = useState<boolean>(false);
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const appRef = useRef<Application | null>(null);
    const playerRef = useRef<Sprite | null>(null);
    const mapContainerRef = useRef<Container | null>(null);


    useEffect(() => {
        if (!canvasRef.current) return;

        const app = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            resizeTo: window,
            background: 0x1e1e1e,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        })

        appRef.current = app;
        canvasRef.current.appendChild(app.view as HTMLCanvasElement);

        const worldContainer = new Container();
        const mapContainer = new Container();
        const playerContainer = new Container();

        mapContainerRef.current = mapContainer;

        app.stage.addChild(worldContainer);
        worldContainer.addChild(mapContainer);
        worldContainer.addChild(playerContainer);

        setupMap(app, mapContainer);
        createPlayer(app, playerContainer);
        setupCamera(app, worldContainer);

        setIsArenaLoaded(true);

        return () => {
            app.destroy(true, true);
        }
    }, [])

    const setupMap = async (app: Application, mapContainer: Container) => {
        try {
            const mapTexture = await Assets.load('/maps/map.png');
            const mapSprite = new Sprite(mapTexture);
            mapSprite.scale.set(1);
            mapContainer.addChild(mapSprite);
            mapContainer.x = app.screen.width / 2 - mapSprite.width / 2;
            mapContainer.y = app.screen.height / 2 - mapSprite.height / 2;
        } catch (e) {
            console.error('Failed to load the map ', e);
            createPlaceholderMap(mapContainer);
        }
    }

    const createPlayer = async (app: Application, playerContainer: Container) => {
        // const playerTexture = await Assets.load('/character/Alex_idle_16x16.png');
        const graphics = new Graphics();
        graphics.beginFill(0xff0000);
        graphics.drawCircle(0, 0, 16);
        graphics.endFill();

        const playerTexture = app.renderer.generateTexture(graphics);
        const player = new Sprite(playerTexture);
        player.scale.set(2);

        player.anchor.set(0.5);
        player.x = app.screen.width / 2;
        player.y = app.screen.height / 2;

        playerRef.current = player;
        playerContainer.addChild(player);
    };

    const createPlaceholderMap = (mapContainer: Container) => {
        const graphics = new Graphics();
        graphics.lineStyle(1, 0xFF0000);
        const tileSize = 32;
        const mapWidth = 50;
        const mapHeight = 30;
        for (let x = 0; x <= mapWidth; x++) {
            graphics.moveTo(x * tileSize, 0);
            graphics.lineTo(x * tileSize, mapHeight * tileSize);
        }
        for (let y = 0; y <= mapWidth; y++) {
            graphics.moveTo(0, y * tileSize);
            graphics.lineTo(mapHeight * tileSize, y * tileSize);
        }
        mapContainer.addChild(graphics);
    }

    const setupCamera = (app: Application, worldContainer: Container) => {
        const keys: { [key: string]: boolean } = {};
        const moveSpeed = 5;
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            keys[e.code] = true;
        })
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            keys[e.code] = false;
        })
        app.ticker.add(() => {
            if (!playerRef.current || !mapContainerRef.current) return;
            const player = playerRef.current;
            const mapContainer = mapContainerRef.current;
            // if (keys['KeyW'] || keys['ArrowUp']) {
            //     player.y -= moveSpeed;
            // }
            // if (keys['KeyS'] || keys['ArrowDown']) {
            //     player.y += moveSpeed;
            // }
            // if (keys['KeyA'] || keys['ArrowLeft']) {
            //     player.x -= moveSpeed;
            // }
            // if (keys['KeyD'] || keys['ArrowRight']) {
            //     player.x += moveSpeed;
            // }
            const tryMove = (dx: number, dy: number) => {
                const newX = player.x + dx;
                const newY = player.y + dy;

                const tileCol = Math.floor((newX - OFFSET_X) / TILE_SIZE);
                const tileRow = Math.floor((newY - OFFSET_Y) / TILE_SIZE);

                if (
                    tileCol >= 0 && tileCol < ARENA_COLS &&
                    tileRow >= 0 && tileRow < ARENA_ROWS &&
                    COLLISION_MAP[tileRow] &&
                    COLLISION_MAP[tileRow][tileCol] === 0 // walkable
                ) {
                    player.x = newX;
                    player.y = newY;
                }
            }

            if (keys['KeyW'] || keys['ArrowUp']) tryMove(0, -moveSpeed);
            if (keys['KeyS'] || keys['ArrowDown']) tryMove(0, moveSpeed);
            if (keys['KeyA'] || keys['ArrowLeft']) tryMove(-moveSpeed, 0);
            if (keys['KeyD'] || keys['ArrowRight']) tryMove(moveSpeed, 0);

            const targetX = app.screen.width / 2 - player.x;
            const targetY = app.screen.height / 2 - player.y;

            const lerpFactor = 0.1;
            worldContainer.x += (targetX - worldContainer.x) * lerpFactor;
            worldContainer.y += (targetY - worldContainer.y) * lerpFactor;
        })
    }
    return (
        <div className="w-full h-full relative">
            <div ref={canvasRef} className="w-full h-full " />
            {!isArenaLoaded && <div className="flex justify-center items-center absolute inset-0 bg-black opacity-90 z-20">Loading...</div>}
        </div>
    )
}

export default ArenaMap
