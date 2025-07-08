import { Direction } from "../types";

export const getDirectionRow = (direction: Direction): number => {
    switch (direction) {
        case "up":
            return 0;
        case "left":
            return 1;
        case "down":
            return 2;
        case "right":
            return 3;
        default:
            return 0;
    }
}