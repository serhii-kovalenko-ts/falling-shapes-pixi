export function getRandomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomColor(): number {
  return Math.floor(Math.random() * 0x00ff00);
}
