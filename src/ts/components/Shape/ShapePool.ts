import { Point } from 'pixi.js';
import { Shape } from './Shape';
import { EShapes, ShapeFactory } from './ShapeFactory';
import { getRandomNum, getRandomSpawnPosition } from '../../utils';

const SHAPES_AMOUNT: number = 5000;

export class ShapePool {
  shapes: Shape[];

  constructor() {
    this.createShapes();
  }

  removeShape() {
    return this.shapes.shift();
  }

  addShape(shape) {
    this.shapes.push(shape);
  }

  createShapes() {
    this.shapes = [];
    this.addShapes(SHAPES_AMOUNT);
  }

  addShapes(amount: number) {
    for (let i = 0; i < amount; i++) {
      const position: Point = getRandomSpawnPosition();
      const rand: number = getRandomNum(EShapes.Circle, EShapes.Chaotic);
      const shapeInstance = ShapeFactory.createRandomShape(
        position,
        rand as EShapes
      );

      this.shapes.push(shapeInstance);
    }
  }
}
