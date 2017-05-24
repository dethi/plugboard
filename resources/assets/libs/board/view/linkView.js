import { fabric } from 'fabric';

export const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

export class LinkLine {
  constructor(linkA, linkB, linkSize, path) {
    this.linkA = linkA;
    this.linkB = linkB;
    this.linkSize = linkSize;
    this.path = path;

    this.fabricLines = this.createLines('red');

    this.on = false;
  }

  refresh() {
    // ULGY !!!!
    this.fabricLines.forEach(line =>
      this.linkA.elementView.boardView.fabricCanvas.remove(line));

    this.path = this.linkA.elementView.boardView.controller.gridController.getPath(
      {
        x: Math.floor(this.linkA.pos.x / 50),
        y: Math.floor(this.linkA.pos.y / 50)
      },
      {
        x: Math.floor(this.linkB.pos.x / 50),
        y: Math.floor(this.linkB.pos.y / 50)
      }
    );
    this.fabricLines = this.createLines(this.on ? 'green' : 'red');

    this.fabricLines.forEach(line =>
      this.linkA.elementView.boardView.fabricCanvas.add(line));
  }

  setState(newState) {
    this.on = newState === 1;
    this.refresh();
  }

  createLines(color) {
    const lines = [];

    let curPos = null;

    this.path.forEach(pos => {
      if (!curPos) {
        curPos = pos;
        return;
      }

      lines.push(
        new fabric.Line(
          [
            curPos.x,
            curPos.y,
            pos.x,
            pos.y
          ],
          {
            strokeWidth: this.linkSize / 3,
            selectable: false,
            stroke: color
          }
        )
      );
      curPos = pos;
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
