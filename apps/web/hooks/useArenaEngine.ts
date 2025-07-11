import { Arena } from '@/features/arena/ArenaEngine';
import { SpriteCharacter } from '@/features/arena/types';
import { RefObject, useEffect } from 'react'

const useArenaEngine = (canvasRef: RefObject<HTMLCanvasElement | null>, ctxRef: RefObject<CanvasRenderingContext2D | null>, socket: WebSocket, proximityChatTriggerOn: () => void, proximityChatTriggerOff: () => void) => {
    useEffect(() => {

        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext('2d');
        if (!ctxRef.current) return;
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        ctx.scale(dpr, dpr);

        let arena: Arena | null;
        const character: SpriteCharacter = 'alex';
        const username: string = 'Arjun';
        const createArena = async () => {
            arena = new Arena(canvas, ctx, socket, username, character, proximityChatTriggerOn, proximityChatTriggerOff);
            console.log('created')
            return arena.destroy;
        }
        createArena();

        return () => {
            if (arena) arena.destroy();
        }
    }, [canvasRef, ctxRef, socket]);

}

export default useArenaEngine
