/**
 * Model (Data Layer) - this is where the data is stored for your app.
 * The model is decoupled from the views and controller.
 */

import { Point } from 'pixi.js';
import { Observer } from '../components/observer/observer';
import {
  DEFAULT_CONFIG,
  DEFAULT_GRAVITY,
  DEFAULT_SHAPES_PER_SEC,
  SPAWN_POSITION,
} from './App.model.constants';
import { IModelConfig } from './App.model.types';
import { getRandomNum } from '../utils';

export class AppModel {
  config: IModelConfig;
  onGravityChanged: Observer;
  onShapesChanged: Observer;
  onCountChanged: Observer;
  onSquareChanged: Observer;
  count: number;
  square: number;
  gravity: number;
  shapesPerSecond: number;

  constructor() {
    this.onGravityChanged = new Observer();
    this.onShapesChanged = new Observer();
    this.onCountChanged = new Observer();
    this.onSquareChanged = new Observer();

    this.gravity = DEFAULT_GRAVITY;
    this.shapesPerSecond = DEFAULT_SHAPES_PER_SEC;
    this.count = 0;
    this.square = 0;

    this.config = DEFAULT_CONFIG;
  }

  setGravity(value: number): void {
    this.gravity = Math.max(0, value);
    this.onGravityChanged.notification();
  }

  setShapesPerSecond(value: number): void {
    this.shapesPerSecond = Math.max(0, value);
    this.onShapesChanged.notification();
  }

  setCount(value: number): void {
    this.count = value;
    this.onCountChanged.notification();
  }

  setSquare(value: number): void {
    this.square = value;
    this.onSquareChanged.notification();
  }
}
