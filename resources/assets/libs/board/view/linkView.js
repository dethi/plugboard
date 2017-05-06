import { fabric } from 'fabric';

export const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

export class LinkLine {
  constructor(linkInput, linkOutput, linkSize) {
    this.linkInput = linkInput;
    this.linkOutput = linkOutput;
    this.linkSize = linkSize;

    this.fabricLine = this.createLine();
    this.fabricLine.stroke = 'red';
  }

  refresh() {
    // ULGY !!!!
    this.linkInput.elementView.gridView.fabricCanvas.remove(this.fabricLine);
    this.fabricLine = this.createLine();
    this.fabricLine.stroke = this.on ? 'green' : 'red';
    this.linkInput.elementView.gridView.fabricCanvas.add(this.fabricLine);
  }

  createLine() {
    return new fabric.Line(
      [
        this.linkInput.pos.x + this.linkSize,
        this.linkInput.pos.y + this.linkSize / 2 - this.linkSize / 6,
        this.linkOutput.pos.x,
        this.linkOutput.pos.y + this.linkSize / 2 - this.linkSize / 6
      ],
      {
        strokeWidth: this.linkSize / 3,
        selectable: false
      }
    );
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
      width: this.linkSize,
      height: this.linkSize,
      fill: 'black',
      hasControls: false,
      selectable: false
    });

    this.fabricRect.on('mousedown', options => {
      if (this.linkType === LinkType.INPUT && this.isUse()) return;
      this.elementView.gridView.startCreateLink(this);
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

  isUse() {
    return this.linkLines.length > 0;
  }
}
