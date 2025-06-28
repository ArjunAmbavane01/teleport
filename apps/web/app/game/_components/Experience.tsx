'use client';

import { useEffect, useRef, useState } from 'react';
import { GameEngine } from './GameEngine';

export default function ArenaPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameEngineRef = useRef<GameEngine | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('useEffect triggered');

        const initGame = async () => {
            setIsLoading(true);
            const canvas = canvasRef.current;
            if (!canvas) {
                console.warn('Canvas ref is null');
                return;
            }

            console.log('Canvas exists, creating GameEngine…');

            try {
                setIsLoading((c)=>!c);
                const gameEngine = new GameEngine(canvas);
                console.log('GameEngine instance created');
                await gameEngine.initialize();
                console.log('GameEngine initialized');
                gameEngineRef.current = gameEngine;
                gameEngine.start();
                console.log('GameEngine started');
            } catch (err) {
                console.error('Failed to initialize game:', err);
                setError(`Failed to load game: ${err instanceof Error ? err.message : 'Unknown error'}`);
                setIsLoading((c)=>!c);
            }
        };

        initGame();

        return () => {
            if (gameEngineRef.current) {
                gameEngineRef.current.destroy();
            }
        };
    }, []);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {
                isLoading ?
                    (
                        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                <p>Loading Arena...</p>
                            </div>
                        </div>
                    )
                    :
                    <div className="w-full h-screen bg-gray-900 overflow-hidden relative">
                        <canvas
                            ref={canvasRef}
                            className="block"
                            style={{
                                imageRendering: 'pixelated',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                        <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 px-3 py-2 rounded">
                            <p className="text-sm">Use WASD or Arrow Keys to move</p>
                        </div>
                    </div>
            }
        </>
    );
}