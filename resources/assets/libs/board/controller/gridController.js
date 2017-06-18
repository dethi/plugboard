import PathFinding from 'pathfinding';

import { GRID_SIZE } from '../constante';
import Vector from '../../utils/vector';

export default class GridController {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.space = new Array(this.sizeX * this.sizeY).fill(null);

    this.pfGrid = new PathFinding.Grid(this.sizeX, this.sizeY);
  }

  setElement(el) {
    this.set(el.pos, el.id);

    this.pfGrid.setWalkableAt(el.pos.x, el.pos.y, false);
  }

  canMove(el, newPos) {
    return this.get(newPos) === null;
  }

  moveElement(el, oldPos) {
    this.set(el.pos, el.id);
    this.pfGrid.setWalkableAt(el.pos.x, el.pos.y, false);

    this.set(oldPos, null);
    this.pfGrid.setWalkableAt(oldPos.x, oldPos.y, true);
  }

  freeEl(el) {
    this.set(el.pos, null);
    this.pfGrid.setWalkableAt(el.pos.x, el.pos.y, true);
  }

  getPath(posA, posB) {
    const bestFirstFinder = new PathFinding.BestFirstFinder();

    const path = bestFirstFinder.findPath(
      posA.x,
      posA.y,
      posB.x,
      posB.y,
      this.pfGrid.clone()
    );

    return PathFinding.Util.compressPath(path);
  }

  get(pos) {
    return this.space[pos.x + this.sizeX * pos.y];
  }

  set(pos, value) {
    this.space[pos.x + this.sizeX * pos.y] = value;
  }
}
