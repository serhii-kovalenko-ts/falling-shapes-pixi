/**
 * View (Presentation Layer) - This part of your App has access to the DOM or Canvas.
 * Use it to draw, display or animate whatever you want
 */

import { Application, Rectangle } from 'pixi.js';
import { Observer } from '../components/observer/observer';
import { AppModel } from '../models/App.model';
import * as PIXI from 'pixi.js-legacy';
import { Shape } from '../components/Shape/Shape';

export class AppView {
  model: AppModel;
  app: Application<HTMLCanvasElement>;

  increaseShapes: HTMLButtonElement;
  decreaseShapes: HTMLButtonElement;
  increaseGravity: HTMLButtonElement;
  decreaseGravity: HTMLButtonElement;

  gravityInput: HTMLInputElement;
  shapesInput: HTMLInputElement;
  numberOfShapesInput: HTMLInputElement;
  coveredAreaInput: HTMLInputElement;

  onIncreaseShapes: Observer;
  onDecreaseShapes: Observer;
  onIncreaseGravity: Observer;
  onDecreaseGravity: Observer;
  onCanvasClicked: Observer;
  onShapeClicked: Observer;
  onShapeExit: Observer;

  constructor(model) {
    this.model = model;

    this.app = new Application<HTMLCanvasElement>({
      width: this.model.config.width,
      height: this.model.config.height,
      backgroundColor: 0x7d1e67,
    });

    document.getElementById('app').appendChild(this.app.renderer.view);

    this.initialize();
  }

  createQueryElements(): void {
    this.increaseShapes = document.querySelector('#increaseShapes');
    this.decreaseShapes = document.querySelector('#decreaseShapes');

    this.increaseGravity = document.querySelector('#increaseGravity');
    this.decreaseGravity = document.querySelector('#decreaseGravity');

    this.numberOfShapesInput = document.querySelector('#numberOfShapes');
    this.coveredAreaInput = document.querySelector('#coveredArea');

    this.gravityInput = document.querySelector('#gravityValue');
    this.shapesInput = document.querySelector('#shapesValue');
  }

  addListeners(): void {
    this.onIncreaseShapes = new Observer();
    this.onDecreaseShapes = new Observer();

    this.onIncreaseGravity = new Observer();
    this.onDecreaseGravity = new Observer();

    this.onCanvasClicked = new Observer();
    this.onShapeClicked = new Observer();
    this.onShapeExit = new Observer();

    this.increaseShapes.addEventListener('click', () =>
      this.onIncreaseShapes.notification()
    );
    this.decreaseShapes.addEventListener('click', () =>
      this.onDecreaseShapes.notification()
    );

    this.increaseGravity.addEventListener('click', () =>
      this.onIncreaseGravity.notification()
    );
    this.decreaseGravity.addEventListener('click', () =>
      this.onDecreaseGravity.notification()
    );

    this.app.stage.on('click', (e) => {
      const position = e.data.global;
      this.onCanvasClicked.notification(position);
    });
  }

  updateInputs(): void {
    this.updateShapesQuantity();
    this.updateGravity();
    this.updateCount();
    this.updateSquare();
  }

  updateShapesQuantity(): void {
    this.shapesInput.value = this.model.shapesPerSecond.toString();
  }

  updateGravity(): void {
    this.gravityInput.value = this.model.gravity.toString();
  }

  updateCount(): void {
    this.numberOfShapesInput.value = this.model.count.toString();
  }

  updateSquare(): void {
    this.coveredAreaInput.value = this.model.square.toString();
  }

  subscribeModel(): void {
    this.model.onShapesChanged.subscribe(() => this.updateShapesQuantity());
    this.model.onGravityChanged.subscribe(() => this.updateGravity());
    this.model.onCountChanged.subscribe(() => this.updateCount());
    this.model.onSquareChanged.subscribe(() => this.updateSquare());
  }

  initialize(): void {
    this.createQueryElements();

    this.updateInputs();
    this.subscribeModel();

    this.addListeners();

    this.app.stage.interactive = true;
    this.app.stage.buttonMode = true;
    this.app.stage.hitArea = new Rectangle(
      0,
      0,
      this.model.config.width,
      this.model.config.height
    );
  }

  drawShape(shapeInstance: Shape): void {
    const shape = shapeInstance.figure;
    this.app.stage.addChild(shape);

    shape.on('click', (e) => {
      e.stopPropagation();
      this.onShapeClicked.notification(shapeInstance);
    });
  }

  removeShape(shapeInstance: Shape): void {
    const shape = shapeInstance.figure;
    this.app.stage.removeChild(shape);
    shape.destroy();
  }
}
