export default class GridController {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.space = new Array(this.sizeX * this.sizeY).fill(null);
  }

  setElement(el) {
    this.set(el.pos, el.id);
  }

  canMove(el, newPos) {
    return this.get(newPos) === null;
  }

  moveElement(el, oldPos) {
    this.set(el.pos, el.id);

    this.set(oldPos, null);
  }

  freeEl(el) {
    this.set(el.pos, null);
  }

  get(pos) {
    return this.space[pos.x + this.sizeX * pos.y];
  }

  set(pos, value) {
    this.space[pos.x + this.sizeX * pos.y] = value;
  }
}
