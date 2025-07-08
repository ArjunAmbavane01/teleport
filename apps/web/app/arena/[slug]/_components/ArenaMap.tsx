"use client";

import useArenaEngine from "@/hooks/useArenaEngine";
import { useRef } from "react";

interface ArenaMapProps {

}

const ArenaMap: React.FC<ArenaMapProps> = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    useArenaEngine(canvasRef, ctxRef);

    return <canvas ref={canvasRef} width={1000} height={1000} />
}

export default ArenaMap
