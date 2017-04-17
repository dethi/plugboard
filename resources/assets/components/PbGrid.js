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

class LinkElement {
  constructor(component, linkType, linkSize, pos) {
    this.component = component;
    this.linkType = linkType;
    this.linkSize = linkSize;
    this.free = true;
    this.pos = pos;
    this.fabricRect = new fabric.Rect({
      top: pos.x,
      left: pos.y,
      width: this.linkSize,
      height: this.linkSize,
      fill: 'black',
      hasControls: false,
      selectable: false
    });

    this.fabricRect.on('mousedown', options => {
      this.component.grid.startCreateLink(
        new Vector(this.fabricRect.left, this.fabricRect.top)
      );
    });
  }

  move(newPos) {
    this.pos = newPos;
    this.fabricRect.left = this.pos.y;
    this.fabricRect.top = this.pos.x;
    this.fabricRect.setCoords();
  }
}

class ElecComponent {
  constructor(grid, vector, nbInput, nbOutput) {
    this.grid = grid;
    this.pos = vector;

    this.componentSize = this.grid.gridSize;
    this.linkSize = this.componentSize / 5;

    this.nbInput = nbInput;
    this.nbOutput = nbOutput;

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
        new Vector(this.componentSize * this.pos.y + topPadding, leftPos)
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
        new Vector(this.componentSize * this.pos.y + topPadding, leftPos)
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
    this.add = true;
    this.addLink = false;
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

      this.fabricCanvas.remove(this.linkLine);
      this.linkLine = new fabric.Line(
        [
          this.addLinkVectorStart.x,
          this.addLinkVectorStart.y,
          mousePos.x,
          mousePos.y
        ],
        {
          stroke: '#114B5F',
          selectable: false
        }
      );

      this.fabricCanvas.add(this.linkLine);
    });

    this.fabricCanvas.on('mouse:up', options => {
      if (this.addLink) {
        this.addLink = false;
        this.fabricCanvas.remove(this.linkLine);
      }
    });

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

  isInside(vector) {
    return vector.x > 0 &&
      vector.x < this.width - 1 &&
      vector.y > 0 &&
      vector.y < this.height - 1;
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
    const newElecComponent = new ElecComponent(this, vector, 2, 1);
    this.set(vector, newElecComponent);

    newElecComponent.getFabricElements().map(el => this.fabricCanvas.add(el));
  }

  startCreateLink(vector) {
    this.addLink = true;
    this.addLinkVectorStart = vector;
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
