import { TILE_SIZE } from "../ArenaConstants";

export function isWithinProximity(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  blockDistance: number = 3.5
): boolean {
  const threshold = blockDistance * TILE_SIZE;
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
}
