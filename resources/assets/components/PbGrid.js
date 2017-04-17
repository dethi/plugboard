import React, { Component } from 'react';
import { fabric } from 'fabric';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}

const LinkType = {
  INPUT: 0,
  OUTPUT: 1
};

class LinkLine {
  constructor(linkInput, linkOutput) {
    this.linkInput = linkInput;
    this.linkOutput = linkOutput;
    this.fabricLine = new fabric.Line(
      [
        this.linkInput.pos.x,
        this.linkInput.pos.y,
        this.linkOutput.pos.x,
        this.linkOutput.pos.y
      ],
      {
        stroke: 'red',
        selectable: false
      }
    );
  }
}

class LinkElement {
  constructor(component, linkType, linkSize, pos) {
    this.component = component;
    this.linkType = linkType;
    this.linkSize = linkSize;
    this.linkLines = [];
    this.use = false;
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
  }

  isUse() {
    return this.linkLines.length > 0;
  }
}

class ElecElement {
  constructor(grid, vector, nbInput, nbOutput) {
    this.grid = grid;
    this.pos = vector;

    this.componentSize = this.grid.gridSize;
    this.linkSize = this.componentSize / 5;

    this.nbInput = nbInput;
    this.inputElements = null;
    this.nbOutput = nbOutput;
    this.outputElements = null;

    this.fabricElements = [];
    this.fabricRect = new fabric.Rect({
      top: this.componentSize * vector.y,
      left: this.componentSize * vector.x,
      width: this.componentSize,
      height: this.componentSize,
      fill: 'red',
      hasControls: false
    });
    this.fabricElements.push(this.fabricRect);

    this.createInputElements();
    this.createOutputElements();

    this.fabricRect.on('moving', options => {
      let left = Math.round(options.e.offsetX / this.grid.gridSize) *
        this.grid.gridSize;
      left = Math.max(Math.min(left, this.grid.leftMax), this.grid.leftMin);
      this.fabricRect.left = left;

      let top = Math.round(options.e.offsetY / this.grid.gridSize) *
        this.grid.gridSize;
      top = Math.max(Math.min(top, this.grid.topMax), this.grid.topMin);
      this.fabricRect.top = top;

      const newPos = new Vector(
        Math.floor(left / this.grid.gridSize),
        Math.floor(top / this.grid.gridSize)
      );

      if (!newPos.equals(this.pos)) {
        this.fabricRect.setCoords();
        this.moveComponent(newPos);
      }
    });
  }

  moveComponent(newPos) {
    this.grid.set(this.pos, undefined);
    this.pos = newPos;
    this.moveInputElements();
    this.moveOutputElements();
    this.grid.set(this.pos, this);
  }

  createLinkElements(leftPos, nbElement, linkType) {
    const newLinkElements = [];
    // Verify enough place for all link
    const elPadding = (this.componentSize - this.linkSize * nbElement) /
      (nbElement + 1);

    for (let i = 0; i < nbElement; i++) {
      const topPadding = i * this.linkSize + (i + 1) * elPadding;

      const newLinkElement = new LinkElement(
        this,
        linkType,
        this.linkSize,
        new Vector(leftPos, this.componentSize * this.pos.y + topPadding)
      );
      newLinkElements.push(newLinkElement);
    }
    return newLinkElements;
  }

  moveLinkElements(leftPos, elements) {
    const elPadding = (this.componentSize - this.linkSize * elements.length) /
      (elements.length + 1);

    elements.forEach((el, index) => {
      const topPadding = index * this.linkSize + (index + 1) * elPadding;
      el.move(
        new Vector(leftPos, this.componentSize * this.pos.y + topPadding)
      );
    });
  }

  createInputElements() {
    const leftPos = this.componentSize * this.pos.x - this.linkSize / 2;
    this.inputElements = this.createLinkElements(
      leftPos,
      this.nbInput,
      LinkType.INPUT
    );
  }

  moveInputElements() {
    const leftPos = this.componentSize * this.pos.x - this.linkSize / 2;
    this.moveLinkElements(leftPos, this.inputElements);
  }

  createOutputElements() {
    const leftPos = this.componentSize * (this.pos.x + 1) - this.linkSize / 2;
    this.outputElements = this.createLinkElements(
      leftPos,
      this.nbOutput,
      LinkType.OUTPUT
    );
  }

  moveOutputElements() {
    const leftPos = this.componentSize * (this.pos.x + 1) - this.linkSize / 2;
    this.moveLinkElements(leftPos, this.outputElements);
  }

  getFabricElements() {
    return this.fabricElements.concat(
      this.inputElements.map(el => el.fabricRect),
      this.outputElements.map(el => el.fabricRect)
    );
  }
}

class Grid {
  constructor(width, height, gridSize, el) {
    this.gridSize = gridSize;

    this.width = width;
    this.height = height;
    this.space = [width * height];

    this.gridWidth = this.width * this.gridSize;
    this.gridHeight = this.height * this.gridSize;

    this.fabricCanvas = new fabric.Canvas();
    this.fabricCanvas.initialize(el, {
      selectable: false,
      height: this.gridHeight,
      width: this.gridWidth
    });

    this.leftMin = this.gridSize;
    this.leftMax = this.gridWidth - 2 * this.gridSize;
    this.topMin = this.gridSize;
    this.topMax = this.gridHeight - 2 * this.gridSize;

    this.color = 'red';

    this.elecElements = [];

    this.add = true;
    this.addLink = false;
    this.linkOutputs = null;
    this.linkEndding = null;
    this.linkLine = null;

    this.fabricCanvas.on('mouse:down', options => {
      if (!this.add) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      const pos = new Vector(
        Math.floor(mousePos.x / this.gridSize),
        Math.floor(mousePos.y / this.gridSize)
      );

      if (!this.isInside(pos) || this.get(pos) !== undefined) return;

      this.addRect(pos);
      this.add = false;
    });

    this.fabricCanvas.on('mouse:move', options => {
      if (!this.addLink) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      this.updateCreateLink(mousePos);
    });

    this.fabricCanvas.on('mouse:up', options => {
      if (this.addLink) this.finishCreateLink();
    });

    this.addGridLine();
  }

  isInside(vector) {
    return vector.x > 0 &&
      vector.x < this.width - 1 &&
      vector.y > 0 &&
      vector.y < this.height - 1;
  }

  addGridLine() {
    const lines = [];
    for (let x = 1; x < this.gridWidth / this.gridSize; x++) {
      lines.push(
        new fabric.Line(
          [this.gridSize * x, 0, this.gridSize * x, this.gridHeight],
          {
            stroke: '#114B5F',
            selectable: false
          }
        )
      );
    }
    for (let x = 1; x < this.gridHeight / this.gridSize; x++) {
      lines.push(
        new fabric.Line(
          [0, this.gridSize * x, this.gridWidth, this.gridSize * x],
          {
            stroke: '#114B5F',
            selectable: false
          }
        )
      );
    }
    this.fabricGridLines = new fabric.Group(lines, {
      selectable: false
    });
    this.fabricCanvas.add(this.fabricGridLines);
  }

  toggleGridVisibility() {
    this.fabricGridLines.visible = !this.fabricGridLines.visible;
    if (this.fabricGridLines.visible)
      this.fabricCanvas.remove(this.fabricGridLines);
    else
      this.fabricCanvas.add(this.fabricGridLines);
  }

  get(vector) {
    return this.space[vector.x + this.width * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  }

  addRect(vector) {
    const newElecElement = new ElecElement(this, vector, 2, 1);

    this.elecElements.push(newElecElement);
    this.set(vector, newElecElement);

    newElecElement.getFabricElements().map(el => this.fabricCanvas.add(el));
  }

  startCreateLink(linkElement) {
    this.addLink = true;
    this.addLinkStartEl = linkElement;
    this.linkEndding = null;

    this.linkOutputs = [];

    this.elecElements.forEach(el => {
      if (el === this.addLinkStartEl.component) return;
      if (this.addLinkStartEl.linkType === LinkType.OUTPUT) {
        this.linkOutputs = this.linkOutputs.concat(
          el.inputElements.filter(el => !el.isUse())
        );
      } else {
        this.linkOutputs = this.linkOutputs.concat(el.outputElements);
      }
    });
  }

  updateCreateLink(mousePos) {
    this.fabricCanvas.remove(this.linkLine);

    // Where put this var ? and also the linkSize ratio.
    const maxDist = 60;
    let curDist = maxDist;

    let target = null;
    this.linkOutputs.forEach(el => {
      const dist = Math.sqrt(
        Math.pow(mousePos.x - el.pos.x, 2) + Math.pow(mousePos.y - el.pos.y, 2)
      );
      if (dist < curDist) {
        curDist = dist;
        target = el;
      }
    });

    if (target !== null) {
      this.linkEndding = target;
      mousePos = target.pos;
    } else {
      this.linkEndding = null;
    }
    this.linkLine = new fabric.Line(
      [
        this.addLinkStartEl.pos.x,
        this.addLinkStartEl.pos.y,
        mousePos.x,
        mousePos.y
      ],
      {
        stroke: '#114B5F',
        selectable: false
      }
    );

    this.fabricCanvas.add(this.linkLine);
  }

  finishCreateLink() {
    this.addLink = false;
    this.fabricCanvas.remove(this.linkLine);

    if (this.linkEndding) {
      if (this.addLinkStartEl.linkType === LinkType.INPUT) {
        console.log('Start from Input');
        const link = new LinkLine(this.addLinkStartEl, this.linkEndding);
        this.addLinkStartEl.linkLines.push(link);
        this.linkEndding.linkLines.push(link);
        this.fabricCanvas.add(link.fabricLine);
      } else {
        console.log('Start from Output');
        const link = new LinkLine(this.linkEndding, this.addLinkStartEl);
        this.addLinkStartEl.linkLines.push(link);
        this.linkEndding.linkLines.push(link);
        this.fabricCanvas.add(link.fabricLine);
      }
    }
  }
}

class GridComponent extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
  }
  componentDidMount() {
    this.grid = new Grid(15, 10, 50, this.refs.canvas);
  }
  add = () => {
    this.grid.add = true;
  };
  unset = () => {
    this.grid.add = false;
  };
  debug = () => {
    console.log(this.grid.fabricCanvas.toJSON());
  };
  gridVisible = () => {
    this.grid.toggleGridVisibility();
  };
  render() {
    return (
      <div>
        <canvas ref="canvas" />
        <button onClick={this.add}>Add</button>
        <button onClick={this.unset}>Nothing</button>
        <button onClick={this.debug}>Debug</button>
        <button onClick={this.gridVisible}>Grid</button>
      </div>
    );
  }
}

export default () => (
  <div>
    <GridComponent />
  </div>
);
