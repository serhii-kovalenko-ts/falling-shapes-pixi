import { Graphics, Point } from 'pixi.js';
import { getRandomColor } from '../../utils';

export class Shape extends Graphics {
  figure: Graphics;
  color: number;

  constructor(position: Point) {
    super();

    this.position = position;
    this.x = position.x;
    this.y = position.y;

    this.color = getRandomColor();
    this.figure = new Graphics();
    this.figure.interactive = true;
    this.figure.lineStyle(4, getRandomColor());
    this.figure.beginFill(this.color, 0.5);

    this.draw();

    this.figure.hitArea = this.figure.getBounds();
    this.figure.endFill();
  }

  draw(): void {}

  clone() {
    //@ts-ignore
    const cloned = new this.constructor(this.position);
    cloned.figure.y = this.figure.y;

    return cloned;
  }
}
