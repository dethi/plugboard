import { fabric } from 'fabric';

import { GRID_SIZE, LINK_SIZE, LINE_SIZE } from '../constante';

import Vector from '../../utils/vector';

export const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

const fabricLine = (x1, y1, x2, y2, color) => {
  return new fabric.Line([x1, y1, x2, y2], {
    strokeWidth: LINE_SIZE,
    selectable: false,
    stroke: color
  });
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

    const boardPos = this.linkA.elementView.boardView.curBoardPos;

    this.path = this.linkA.elementView.boardView.controller.gridController.getPath(
      {
        x: Math.floor(this.linkA.pos.x / GRID_SIZE + boardPos.x),
        y: Math.floor(this.linkA.pos.y / GRID_SIZE + boardPos.y)
      },
      {
        x: Math.floor(this.linkB.pos.x / GRID_SIZE + boardPos.x),
        y: Math.floor(this.linkB.pos.y / GRID_SIZE + boardPos.y)
      }
    );

    this.fabricLines = this.createLines(this.on ? 'green' : 'red', boardPos);

    this.linkA.elementView.boardView.fabricCanvas.add(...this.fabricLines);
  }

  setState(newState) {
    const newOn = newState === 1;

    if (this.on === newOn) return;

    this.on = newOn;
    this.refresh();
  }

  createLines(color, boardPos) {
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

    let isXAligneStart = true;
    let isYAligneStart = true;
    let isXAligneEnd = false;
    let isYAligneEnd = false;

    if (this.path.length < 2) {
      lines.push(
        fabricLine(
          this.linkA.pos.x + LINK_SIZE / 2,
          this.linkA.pos.y + LINK_SIZE / 2,
          this.linkB.pos.x + LINK_SIZE / 2,
          this.linkB.pos.y + LINK_SIZE / 2,
          color
        )
      );
    } else {
      this.path.forEach(pos => {
        const realPos = new Vector(
          (pos.x - boardPos.x) * GRID_SIZE + GRID_SIZE / 2,
          (pos.y - boardPos.y) * GRID_SIZE + GRID_SIZE / 2
        );

        // Create Start Line
        if (!curPos) {
          lines.push(
            fabricLine(
              this.linkA.pos.x + LINK_SIZE / 2,
              this.linkA.pos.y + LINK_SIZE / 2,
              realPos.x,
              realPos.y,
              color
            )
          );
        }

        // Aligne line with the link
        // I'm sure I can opti this shit but to lazy today
        // 40 degree in my room and I nedd to work on the .NET
        if (pos.x !== linkARealPos.x) isXAligneStart = false;
        if (isXAligneStart && !isXAligneEnd) {
          realPos.x = this.linkA.pos.x + LINK_SIZE / 2 + boardPos.x;
        } else {
          if (pos.x === linkBRealPos.x) isXAligneEnd = true;
        }

        if (pos.x !== linkBRealPos.x) isXAligneEnd = false;
        if (isXAligneEnd) {
          realPos.x = this.linkB.pos.x + LINK_SIZE / 2 + boardPos.x;
        }

        if (pos.y !== linkARealPos.y) isYAligneStart = false;
        if (isYAligneStart && !isYAligneEnd) {
          realPos.y = this.linkA.pos.y + LINK_SIZE / 2 + boardPos.y;
        } else {
          if (pos.y === linkBRealPos.y) isYAligneEnd = true;
        }

        if (pos.y !== linkBRealPos.y) isYAligneEnd = false;
        if (isYAligneEnd) {
          realPos.y = this.linkB.pos.y + LINK_SIZE / 2 + boardPos.y;
        }

        if (!curPos) {
          curPos = realPos;
          return;
        }

        lines.push(fabricLine(curPos.x, curPos.y, realPos.x, realPos.y, color));
        curPos = realPos;
      });

      // Create final line if End Link not aligned
      if (!isXAligneEnd || !isYAligneEnd) {
        lines.push(
          fabricLine(
            curPos.x,
            curPos.y,
            this.linkB.pos.x + LINK_SIZE / 2,
            this.linkB.pos.y + LINK_SIZE / 2,
            color
          )
        );
      }
    }

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
      fill: this.linkType === LinkType.INPUT ? 'black' : '#606060',
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
