import { fabric } from 'fabric';

import { GRID_SIZE, LINK_SIZE, LINE_SIZE } from '../constante';

import Vector from '../../utils/vector';

export const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

export class LinkLine {
  constructor(linkA, linkB) {
    this.linkA = linkA;
    this.linkB = linkB;

    this.fabricLines = [];
    this.refresh();

    this.on = false;
  }

  refresh() {
    // ULGY !!!!
    this.fabricLines.forEach(line =>
      this.linkA.elementView.boardView.fabricCanvas.remove(line));

    this.path = this.linkA.elementView.boardView.controller.gridController.getPath(
      {
        x: Math.floor(this.linkA.pos.x / GRID_SIZE),
        y: Math.floor(this.linkA.pos.y / GRID_SIZE)
      },
      {
        x: Math.floor(this.linkB.pos.x / GRID_SIZE),
        y: Math.floor(this.linkB.pos.y / GRID_SIZE)
      }
    );
    this.fabricLines = this.createLines(this.on ? 'green' : 'red');

    this.fabricLines.forEach(line =>
      this.linkA.elementView.boardView.fabricCanvas.add(line));
  }

  setState(newState) {
    const newOn = newState === 1;

    if (this.on === newOn) return;

    this.on = newOn;
    this.refresh();
  }

  createLines(color) {
    const lines = [];

    let curPos = null;

    const linkARealPos = new Vector(
      Math.floor(this.linkA.pos.x / GRID_SIZE),
      Math.floor(this.linkA.pos.y / GRID_SIZE)
    );

    const linkBRealPos = new Vector(
      Math.floor(this.linkB.pos.x / GRID_SIZE),
      Math.floor(this.linkB.pos.y / GRID_SIZE)
    );

    let isXAligne = true;
    let isYAligne = true;

    // Pos is on the return format of the pathfinding (Array with x in 0 and y in 1)
    this.path.forEach(pos => {
      const realPos = new Vector(
        pos[0] * GRID_SIZE + GRID_SIZE / 2,
        pos[1] * GRID_SIZE + GRID_SIZE / 2
      );

      if (pos[0] !== linkARealPos.x) isXAligne = false;
      if (isXAligne) {
        realPos.x = this.linkA.pos.x + LINK_SIZE / 2;
      } else {
        if (pos[0] === linkBRealPos.x) {
          realPos.x = this.linkB.pos.x + LINK_SIZE / 2;
        }
      }

      if (pos[1] !== linkARealPos.y) isYAligne = false;
      if (isYAligne) {
        realPos.y = this.linkA.pos.y + LINK_SIZE / 2;
      } else {
        if (pos[1] === linkBRealPos.y) {
          realPos.y = this.linkB.pos.y + LINK_SIZE / 2;
        }
      }

      if (!curPos) {
        curPos = realPos;
        return;
      }

      lines.push(
        new fabric.Line([curPos.x, curPos.y, realPos.x, realPos.y], {
          strokeWidth: LINE_SIZE,
          selectable: false,
          stroke: color
        })
      );
      curPos = realPos;
    });

    return lines;
  }

  destroy() {
    this.linkA.linkLines.splice(this.linkA.linkLines.indexOf(this), 1);
    this.linkB.linkLines.splice(this.linkB.linkLines.indexOf(this), 1);
    this.fabricLines.forEach(line =>
      this.linkA.elementView.boardView.fabricCanvas.remove(line));
  }
}

export class LinkView {
  constructor(name, elementView, linkType, linkSize) {
    this.name = name;
    this.elementView = elementView;
    this.linkType = linkType;
    this.linkSize = linkSize;
    this.linkLines = [];

    this.pos = null;

    this.fabricRect = new fabric.Rect({
      width: this.linkSize,
      height: this.linkSize,
      fill: 'black',
      hasControls: false,
      selectable: false
    });

    this.fabricRect.on('mousedown', options => {
      if (this.linkType === LinkType.INPUT && this.isUse()) return;
      this.elementView.boardView.startCreateLink(this);
    });
  }

  move(newPos) {
    if (this.pos && this.pos.x === newPos.x && this.pos.y === newPos.y) return;

    this.pos = newPos;

    this.fabricRect.left = this.pos.x;
    this.fabricRect.top = this.pos.y;
    this.fabricRect.setCoords();

    this.linkLines.forEach(line => {
      line.refresh();
    });
  }

  destroy() {
    this.linkLines.forEach(link => link.destroy());
  }

  isUse() {
    return this.linkLines.length > 0;
  }
}
