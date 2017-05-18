import { fabric } from 'fabric';

export const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

export class LinkLine {
  constructor(linkA, linkB, linkSize) {
    this.linkA = linkA;
    this.linkB = linkB;
    this.linkSize = linkSize;

    this.fabricLine = this.createLine();
    this.fabricLine.stroke = 'red';

    this.on = false;
  }

  refresh() {
    // ULGY !!!!
    this.linkA.elementView.boardView.fabricCanvas.remove(this.fabricLine);
    this.fabricLine = this.createLine();
    this.fabricLine.stroke = this.on ? 'green' : 'red';
    this.linkA.elementView.boardView.fabricCanvas.add(this.fabricLine);
  }

  setState(newState) {
    this.on = newState === 1;
    this.refresh();
  }

  createLine() {
    return new fabric.Line(
      [
        this.linkA.pos.x + this.linkSize / 2,
        this.linkA.pos.y + this.linkSize / 2 - this.linkSize / 6,
        this.linkB.pos.x,
        this.linkB.pos.y + this.linkSize / 2 - this.linkSize / 6
      ],
      {
        strokeWidth: this.linkSize / 3,
        selectable: false
      }
    );
  }

  destroy() {
    this.linkA.linkLines.splice(this.linkA.linkLines.indexOf(this), 1);
    this.linkB.linkLines.splice(this.linkB.linkLines.indexOf(this), 1);
    this.linkA.elementView.boardView.fabricCanvas.remove(this.fabricLine);
  }
}

export class LinkView {
  constructor(name, elementView, linkType, linkSize, pos) {
    this.name = name;
    this.elementView = elementView;
    this.linkType = linkType;
    this.linkSize = linkSize;
    this.linkLines = [];

    this.pos = pos;
    this.fabricRect = new fabric.Rect({
      top: pos.y,
      left: pos.x,
      width: this.linkSize / 2,
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
