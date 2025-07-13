import { useEffect, useRef } from "react";
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

export const frameDebounce = <T extends (...args: any[]) => void>(
  func: T,
  frameInterval: number
): ((...args: Parameters<T>) => void) => {
  let frameCount = 0;

  return (...args: Parameters<T>) => {
    if (frameCount < frameInterval) {
      frameCount++;
    } else {
      frameCount = 0;
      func(...args);
    }
  };
};

export const areArraysSame = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  const setA = new Set(arr1);
  const setB = new Set(arr2);

  if (setA.size !== setB.size) return false;

  for (const item of setA) {
    if (!setB.has(item)) return false;
  }

  return true;
};


