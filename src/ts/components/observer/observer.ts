import { Point } from 'pixi.js';
import { Shape } from '../Shape/Shape';

export class Observer {
  observers: { (param: Point | Shape): void }[];

  constructor() {
    this.observers = [];
  }

  subscribe(callback: { (param: Point | Shape): void }) {
    this.observers.push(callback);
  }

  notification(payload?: Point | Shape) {
    this.observers.forEach((callback) => callback(payload));
  }
}
