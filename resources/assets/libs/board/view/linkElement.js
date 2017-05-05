import { fabric } from 'fabric';

const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

class LinkLine {
  constructor(linkInput, linkOutput, linkSize) {
    this.linkInput = linkInput;
    this.linkOutput = linkOutput;
    this.linkSize = linkSize;
    this.on = false;

    this.fabricLine = this.createLine();
    this.fabricLine.stroke = 'red';
  }

  refresh() {
    this.linkInput.component.grid.fabricCanvas.remove(this.fabricLine);
    this.fabricLine = this.createLine();
    this.fabricLine.stroke = this.on ? 'green' : 'red';
    this.linkInput.component.grid.fabricCanvas.add(this.fabricLine);
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

  setOn(isOn) {
    this.on = isOn;
    this.linkOutput.setOn(isOn);
    this.refresh();
  }
}

class LinkElement {
  constructor(component, linkType, linkSize, pos) {
    this.id = undefined;
    this.component = component;
    this.linkType = linkType;
    this.linkSize = linkSize;
    this.linkLines = [];
    this.on = false;

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
      this.component.grid.startCreateLink(this);
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

  setId(newId) {
    this.id = newId;
  }

  getId() {
    return this.id;
  }

  setOn(isOn) {
    this.on = isOn;

    if (this.linkType === LinkType.OUTPUT) {
      this.linkLines.forEach(link => link.setOn(isOn));
    }
  }
}

export { LinkType, LinkLine, LinkElement };
