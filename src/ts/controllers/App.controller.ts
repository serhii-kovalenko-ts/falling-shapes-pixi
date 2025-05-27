/**
 * Controller (Application Logic) - The controller is the glue between the model and the view.
 * The controller processes and responds to events set off by either the model or view.
 * It updates the model whenever the user manipulates the view, and can also be used to update the view whenever
 * the model changes.
 */

import gsap from 'gsap';
import { Graphics, Point, Rectangle, Ticker } from 'pixi.js';
import { AppModel } from '../models/App.model';
import { AppView } from '../views/App.view';
import { Shape } from '../components/Shape/Shape';
import { EShapes, ShapeFactory } from '../components/Shape/ShapeFactory';
import { getRandomNum, getRandomSpawnPosition } from '../utils';

export class AppController {
  private view: AppView;
  private model: AppModel;
  shapes: Shape[];

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
    this.shapes = [];

    this.addSubscribes();
    this.startSpawningShapes();

    Ticker.shared.add((delta: number): void => {
      this.animate(delta);
      this.calculateCounters();
    });
  }

  addSubscribes(): void {
    this.view.onIncreaseGravity.subscribe(() =>
      this.model.setGravity(this.model.gravity + 0.5)
    );

    this.view.onDecreaseGravity.subscribe(() =>
      this.model.setGravity(this.model.gravity - 0.5)
    );

    this.view.onIncreaseShapes.subscribe(() =>
      this.model.setShapesPerSecond(this.model.shapesPerSecond + 1)
    );

    this.view.onDecreaseShapes.subscribe(() =>
      this.model.setShapesPerSecond(this.model.shapesPerSecond - 1)
    );

    this.view.onCanvasClicked.subscribe((position: Point) =>
      this.drawChaoticShape(position)
    );

    this.view.onShapeClicked.subscribe((shapeInstance: Shape) => {
      this.removeShapeAndRedrawSimilar(shapeInstance);
    });

    this.view.onShapeExit.subscribe((shapeInstance: Shape) =>
      this.removeShape(shapeInstance)
    );
  }

  drawChaoticShape(position: Point): void {
    const shapeInstance = ShapeFactory.createRandomShape(
      position,
      EShapes.Chaotic
    );
    this.drawShape(shapeInstance);
  }

  drawRandomShape(position: Point): void {
    const rand: number = getRandomNum(EShapes.Circle, EShapes.Chaotic);
    const shapeInstance = ShapeFactory.createRandomShape(
      position,
      rand as EShapes
    );
    this.drawShape(shapeInstance);
  }

  drawShape(shapeInstance: Shape): void {
    this.view.drawShape(shapeInstance);
    this.shapes.push(shapeInstance);
  }

  redrawShape(shapeInstance: Shape): void {
    const newInstance = shapeInstance.clone();
    this.removeShape(shapeInstance);
    this.drawShape(newInstance as Shape);
  }

  removeShape(shapeInstance: Shape): void {
    this.view.removeShape(shapeInstance);
    this.shapes = this.shapes.filter((shape: Shape) => shape !== shapeInstance);
  }

  removeShapeAndRedrawSimilar(shapeInstance: Shape): void {
    this.redrawShapesOfType(shapeInstance.constructor);
  }

  redrawShapesOfType(shapeType: Function): void {
    this.shapes.forEach((shapeInstance: Shape) => {
      if (shapeInstance instanceof shapeType) {
        this.redrawShape(shapeInstance);
      }
    });
  }

  createShapes(shapesPerSecond: number): void {
    for (let i = 0; i < shapesPerSecond; i++) {
      const position: Point = getRandomSpawnPosition();
      this.drawRandomShape(position);
    }
  }

  startSpawningShapes(): void {
    this.createShapes(this.model.shapesPerSecond);

    gsap.delayedCall(this.model.config.delayBetweenSpawn, () =>
      this.startSpawningShapes()
    );
  }

  calculateCounters(): void {
    let count: number = 0;
    let square: number = 0;

    this.shapes.forEach((shapeInstance: Shape): void => {
      const shape: Graphics = shapeInstance.figure;
      const position: number =
        shape.position.y + (shape.hitArea as Rectangle).y;
      const topPosition: number = position - shape.height;
      const bottomPosition: number = position + shape.height;

      if (bottomPosition > 0 && topPosition < this.model.config.height) {
        count++;
        square += shape.width * shape.height;
      }
    });

    this.model.setCount(count);
    this.model.setSquare(Math.round(square));
  }

  animate(delta: number): void {
    this.shapes.forEach((shapeInstance: Shape): void => {
      const shape: Graphics = shapeInstance.figure;

      if (
        shape.position.y >
        this.model.config.height - (shape.hitArea as Rectangle).y
      ) {
        this.removeShape(shapeInstance);
      } else {
        shape.position.y += this.model.gravity * delta;
      }
    });
  }
}
