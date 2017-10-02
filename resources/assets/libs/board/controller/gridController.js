import { GRID_SIZE_LIMIT } from '../constante';

import myPathFinding from '../../utils/pathfinding';

export default class GridController {
  constructor() {
    this.sizeX = GRID_SIZE_LIMIT;
    this.sizeY = GRID_SIZE_LIMIT;

    this.space = new Array(this.sizeX * this.sizeY).fill(null);

    this.myPathFinding = new myPathFinding(this);
  }

  setElement(el, spec) {
    for (
      let i = 0;
      i < (el.rotate === 0 || el.rotate === 2 ? spec.dimX : spec.dimY);
      i++
    ) {
      for (
        let j = 0;
        j < (el.rotate === 0 || el.rotate === 2 ? spec.dimY : spec.dimX);
        j++
      ) {
        this.set(el.pos.add(i, j), el.id);
      }
    }
  }

  canMove(el, spec, newPos) {
    if (!this.isInBound(newPos)) return false;

    let canMoveRes = true;
    for (
      let i = 0;
      i < (el.rotate === 0 || el.rotate === 2 ? spec.dimX : spec.dimY);
      i++
    ) {
      for (
        let j = 0;
        j < (el.rotate === 0 || el.rotate === 2 ? spec.dimY : spec.dimX);
        j++
      ) {
        const pos = newPos.add(i, j);
        if (this.get(pos) !== null && this.get(pos) !== el.id)
          canMoveRes = false;
      }
    }
    return canMoveRes;
  }

  moveElement(el, spec, oldPos) {
    for (
      let i = 0;
      i < (el.rotate === 0 || el.rotate === 2 ? spec.dimX : spec.dimY);
      i++
    ) {
      for (
        let j = 0;
        j < (el.rotate === 0 || el.rotate === 2 ? spec.dimY : spec.dimX);
        j++
      ) {
        this.set(oldPos.add(i, j), null);
      }
    }

    for (
      let i = 0;
      i < (el.rotate === 0 || el.rotate === 2 ? spec.dimX : spec.dimY);
      i++
    ) {
      for (
        let j = 0;
        j < (el.rotate === 0 || el.rotate === 2 ? spec.dimY : spec.dimX);
        j++
      ) {
        this.set(el.pos.add(i, j), el.id);
      }
    }
  }

  freeEl(el, spec) {
    for (
      let i = 0;
      i < (el.rotate === 0 || el.rotate === 2 ? spec.dimX : spec.dimY);
      i++
    ) {
      for (
        let j = 0;
        j < (el.rotate === 0 || el.rotate === 2 ? spec.dimY : spec.dimX);
        j++
      ) {
        this.set(el.pos.add(i, j), null);
      }
    }
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
