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

    this.pfGrid.setWalkableAt(0, 1, false);
  }

  canMove(el, newPos) {
    return this.get(newPos) === null;
  }

  moveElement(el, oldPos) {
    this.set(el.pos, el.id);
    this.pfGrid.setWalkableAt(0, 1, false);

    this.set(oldPos, null);
    this.pfGrid.setWalkableAt(0, 1, true);
  }

  freeEl(el) {
    this.set(el.pos, null);
    this.pfGrid.setWalkableAt(0, 1, true);
  }

  getPath(posA, posB) {
    const dijkstraFinder = new PathFinding.DijkstraFinder();

    const path = dijkstraFinder.findPath(
      posA.x,
      posA.y,
      posB.x,
      posB.y,
      this.pfGrid.clone()
    );

    const compressPath = PathFinding.Util.compressPath(path);

    const formatPath = [];
    compressPath.forEach(el => {
      formatPath.push(
        new Vector(
          el[0] * GRID_SIZE + GRID_SIZE / 2,
          el[1] * GRID_SIZE + GRID_SIZE / 2
        )
      );
    });

    return formatPath;
  }

  get(pos) {
    return this.space[pos.x + this.sizeX * pos.y];
  }

  set(pos, value) {
    this.space[pos.x + this.sizeX * pos.y] = value;
  }
}
