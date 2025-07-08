import { RefObject, useEffect } from 'react'

const useArenaEngine = (canvasRef: RefObject<HTMLCanvasElement | null>, ctxRef: RefObject<CanvasRenderingContext2D | null>) => {
    useEffect(() => {

        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext('2d');
        if (!ctxRef.current) return;

        const createArena = async () => {
            const arena = new Arena(canvasRef.current as HTMLCanvasElement, ctxRef.current as CanvasRenderingContext2D);
        }
        createArena();

    }, []);
}

export default useArenaEngine
