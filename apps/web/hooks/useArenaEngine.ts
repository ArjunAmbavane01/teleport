import { Arena } from '@/features/arena/ArenaEngine';
import { RefObject, useEffect } from 'react'

const useArenaEngine = (canvasRef: RefObject<HTMLCanvasElement | null>, ctxRef: RefObject<CanvasRenderingContext2D | null>) => {
    useEffect(() => {

        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext('2d');
        if (!ctxRef.current) return;
        let arena: Arena | null;
        const createArena = async () => {
            arena = new Arena(canvasRef.current as HTMLCanvasElement, ctxRef.current as CanvasRenderingContext2D);
            return arena.destroy;
        }
        createArena();

        return () => {
            if (arena) arena.destroy();
        }
    }, []);
}

export default useArenaEngine
