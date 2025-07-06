"use client";

import { Arena } from "@/lib/arena/arena-engine";
import { useEffect, useRef } from "react";

interface ArenaMapProps {

}

const ArenaMap: React.FC<ArenaMapProps> = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {

        if (!canvasRef.current) return;
        ctxRef.current = canvasRef.current.getContext('2d');
        if (!ctxRef.current) return;

        const createArena = async () => {
            const arena = new Arena(canvasRef.current as HTMLCanvasElement, ctxRef.current as CanvasRenderingContext2D);
        }
        createArena();

    }, [])
    return (
        <canvas ref={canvasRef} width={1000} height={1000} />
    )
}

export default ArenaMap
