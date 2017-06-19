import myPathFinding from '../../utils/pathfinding';

export default class GridController {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.space = new Array(this.sizeX * this.sizeY).fill(null);

    this.myPathFinding = new myPathFinding(this);
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

  getPath(posA, posB) {
    const myPath = this.myPathFinding.findPath(posA, posB);

    // Need to compress Path
    return myPath;
  }

  isInBound(pos) {
    if (pos.x < 0 || pos.x >= this.sizeX || pos.y < 0 || pos.y >= this.sizeY) {
      return false;
    }
    return true;
  }

  isFree(pos) {
    return this.isInBound(pos) && !this.get(pos);
  }

  get(pos) {
    return this.space[pos.x + this.sizeX * pos.y];
  }

  set(pos, value) {
    this.space[pos.x + this.sizeX * pos.y] = value;
  }
}
