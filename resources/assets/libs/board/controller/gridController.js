export default class GridController {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.space = new Array(this.sizeX * this.sizeY).fill(null);
  }

  setElement(pos, el) {
    this.set(pos, el.id);
  }

  freePos(pos) {
    this.set(pos, null);
  }

  get(pos) {
    return this.space[pos.x + this.sizeX * pos.y];
  }

  set(pos, value) {
    this.space[pos.x + this.sizeX * pos.y] = value;
  }
}
