import { getRandomNum } from '../../utils';
import { Shape } from './Shape';
import { Point } from 'pixi.js';

export class Circle extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawCircle(this.x, this.y, 50);
  }
}

export class Ellipse extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawEllipse(this.x, this.y, 80, 30);
  }
}

export class Rectangle extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawRect(this.x - 40, this.y, 80, 80);
  }
}

export class Triangle extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawPolygon([
      this.x - 50,
      this.y - 25,
      this.x + 50,
      this.y - 25,
      this.x,
      this.y + 50,
    ]);
  }
}

export class Pentagon extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawPolygon([
      this.x + 50,
      this.y,
      this.x + 20,
      this.y + 40,
      this.x - 40,
      this.y + 40,
      this.x - 40,
      this.y - 40,
      this.x + 20,
      this.y - 40,
    ]);
  }
}

export class Hexagon extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawPolygon([
      this.x + 50,
      this.y + 25,
      this.x,
      this.y + 50,
      this.x - 50,
      this.y + 25,
      this.x - 50,
      this.y - 25,
      this.x,
      this.y - 50,
      this.x + 50,
      this.y - 25,
    ]);
  }
}

export class Chaotic extends Shape {
  constructor(position: Point) {
    super(position);
  }

  draw(): void {
    this.figure.drawPolygon([
      getRandomNum(this.x, this.x + 75),
      getRandomNum(this.y, this.y + 50),
      getRandomNum(this.x, this.x),
      getRandomNum(this.y, this.y + 75),
      getRandomNum(this.x, this.x - 75),
      getRandomNum(this.y, this.y + 50),
      getRandomNum(this.x, this.x - 75),
      getRandomNum(this.y, this.y - 50),
      getRandomNum(this.x, this.x),
      getRandomNum(this.y, this.y - 75),
      getRandomNum(this.x, this.x + 75),
      getRandomNum(this.y, this.y - 50),
    ]);
  }
}
