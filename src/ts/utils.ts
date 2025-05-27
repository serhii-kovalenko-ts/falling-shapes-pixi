import { Point } from 'pixi.js';
import { DEFAULT_CONFIG, SPAWN_POSITION } from './models/App.model.constants';

export function getRandomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomColor(): number {
  return Math.floor(Math.random() * 0x00ff00);
}

export function getRandomSpawnPosition(): Point {
  return {
    x: getRandomNum(0, DEFAULT_CONFIG.width),
    y: getRandomNum(-SPAWN_POSITION, -SPAWN_POSITION),
  } as Point;
}
