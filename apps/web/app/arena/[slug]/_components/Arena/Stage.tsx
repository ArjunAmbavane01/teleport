"use client"

import { useEffect, useRef, useState } from "react";
import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";
import { ARENA_COLS, ARENA_ROWS, OFFSET_X, OFFSET_Y, TILE_SIZE, ARENA_WIDTH, ARENA_HEIGHT, DEFAULT_POS_X, DEFAULT_POS_Y } from "@/lib/arena/ArenaConstants";
import { COLLISION_MAP } from "@/lib/arena/CollisionMap";

const ArenaMap: React.FC = () => {
    const [isArenaLoaded, setIsArenaLoaded] = useState<boolean>(false);
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const appRef = useRef<Application | null>(null);
    const playerRef = useRef<Sprite | null>(null);
    const worldContainerRef = useRef<Container | null>(null);
    const playerPositionRef = useRef({ x: DEFAULT_POS_X, y: DEFAULT_POS_Y });

    useEffect(() => {
        if (!canvasRef.current) return;

        const app = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            resizeTo: window,
            background: 0x1e1e1e,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        });

        appRef.current = app;
        canvasRef.current.appendChild(app.view as HTMLCanvasElement);

        const worldContainer = new Container();
        worldContainerRef.current = worldContainer;
        app.stage.addChild(worldContainer);

        setupWorld(app, worldContainer);
        
        setIsArenaLoaded(true);

        return () => {
            app.destroy(true, true);
        };
    }, []);

    const setupWorld = async (app: Application, worldContainer: Container) => {
        createBackground(app, worldContainer);
        
        await createArena(app, worldContainer);
        
        await createPlayer(app, worldContainer);
        
        // Setup controls and camera
        setupControls(app, worldContainer);
    };

    const createBackground = (app: Application, worldContainer: Container) => {
        // Create large ocean background
        const graphics = new Graphics();
        graphics.beginFill(0x006994); // Ocean blue
        graphics.drawRect(-2000, -2000, 4000, 4000); // Large background
        graphics.endFill();

        const backgroundTexture = app.renderer.generateTexture(graphics);
        const backgroundSprite = new Sprite(backgroundTexture);
        backgroundSprite.x = -2000;
        backgroundSprite.y = -2000;
        
        worldContainer.addChild(backgroundSprite);
    };

    const createArena = async (app: Application, worldContainer: Container) => {
        try {
            const mapTexture = await Assets.load('/maps/map.png');
            const arenaSprite = new Sprite(mapTexture);
            arenaSprite.scale.set(1);
            
            arenaSprite.x = OFFSET_X;
            arenaSprite.y = OFFSET_Y;
            
            worldContainer.addChild(arenaSprite);
        } catch (e) {
            console.error('Failed to load map, creating placeholder:', e);
            createPlaceholderArena(app, worldContainer);
        }
    };

    const createPlaceholderArena = (app: Application, worldContainer: Container) => {
        const graphics = new Graphics();
        
        graphics.beginFill(0x8B4513); 
        graphics.drawRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
        graphics.endFill();

        // Add grid for visibility
        graphics.lineStyle(1, 0x654321, 0.3);
        for (let x = 0; x <= ARENA_WIDTH; x += TILE_SIZE) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, ARENA_HEIGHT);
        }
        for (let y = 0; y <= ARENA_HEIGHT; y += TILE_SIZE) {
            graphics.moveTo(0, y);
            graphics.lineTo(ARENA_WIDTH, y);
        }

        const arenaTexture = app.renderer.generateTexture(graphics);
        const arenaSprite = new Sprite(arenaTexture);
        arenaSprite.x = OFFSET_X;
        arenaSprite.y = OFFSET_Y;
        
        worldContainer.addChild(arenaSprite);
    };

    const createPlayer = async (app: Application, worldContainer: Container) => {
        try {
            const playerTexture = await Assets.load('/character/Alex_idle_16x1.png');
            const player = new Sprite(playerTexture);
            player.anchor.set(0.5, 0.8); 
            player.scale.set(2);
            
            player.x = playerPositionRef.current.x;
            player.y = playerPositionRef.current.y;
            
            playerRef.current = player;
            worldContainer.addChild(player);
        } catch (e) {
            console.error('Failed to load player texture. Loading placeholder user', e);
            createPlaceholderPlayer(app,worldContainer);
        }
    };

    const createPlaceholderPlayer = (app: Application, worldContainer: Container) => {
        const graphics = new Graphics();
        graphics.beginFill(0xff0000); // Red circle for player
        graphics.drawCircle(0, 0, 16);
        graphics.endFill();

        const playerTexture = app.renderer.generateTexture(graphics);
        const player = new Sprite(playerTexture);
        player.anchor.set(0.5);
        player.scale.set(1.5);
        
        // Position player at default position
        player.x = playerPositionRef.current.x;
        player.y = playerPositionRef.current.y;
        
        playerRef.current = player;
        worldContainer.addChild(player);
    };

    const setupControls = (app: Application, worldContainer: Container) => {
        const keys: { [key: string]: boolean } = {};
        const moveSpeed = 3;

        const handleKeyDown = (e: KeyboardEvent) => {
            keys[e.code] = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keys[e.code] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const tryMove = (dx: number, dy: number) => {
            if (!playerRef.current) return;

            const newX = playerPositionRef.current.x + dx;
            const newY = playerPositionRef.current.y + dy;

            const tileCol = Math.floor((newX - OFFSET_X) / TILE_SIZE);
            const tileRow = Math.floor((newY - OFFSET_Y) / TILE_SIZE);

            if (
                tileCol >= 0 && tileCol < ARENA_COLS &&
                tileRow >= 0 && tileRow < ARENA_ROWS &&
                COLLISION_MAP[tileRow] &&
                COLLISION_MAP[tileRow][tileCol] === 0 // walkable
            ) {
                playerPositionRef.current.x = newX;
                playerPositionRef.current.y = newY;
                playerRef.current.x = newX;
                playerRef.current.y = newY;
            }
        };

        app.ticker.add(() => {
            if (!playerRef.current || !worldContainer) return;

            if (keys['KeyW'] || keys['ArrowUp']) tryMove(0, -moveSpeed);
            if (keys['KeyS'] || keys['ArrowDown']) tryMove(0, moveSpeed);
            if (keys['KeyA'] || keys['ArrowLeft']) tryMove(-moveSpeed, 0);
            if (keys['KeyD'] || keys['ArrowRight']) tryMove(moveSpeed, 0);

            const targetX = app.screen.width / 2 - playerPositionRef.current.x;
            const targetY = app.screen.height / 2 - playerPositionRef.current.y;

            const lerpFactor = 0.1;
            worldContainer.x += (targetX - worldContainer.x) * lerpFactor;
            worldContainer.y += (targetY - worldContainer.y) * lerpFactor;
        });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    };

    return (
        <div className="w-full h-full relative">
            <div ref={canvasRef} className="w-full h-full" />
            {!isArenaLoaded && (
                <div className="flex justify-center items-center absolute inset-0 bg-black opacity-90 z-20">
                    Loading...
                </div>
            )}
            
        </div>
    );
};

export default ArenaMap;