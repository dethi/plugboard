import { fabric } from 'fabric';

import { LinkType, LinkElement } from './linkElement';

import Vector from '../utils/vector';

class ElecElement {
  constructor(grid, vector, nbInput, nbOutput, color) {
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
      fill: color,
      hasControls: false
    });
    this.fabricElements.push(this.fabricRect);

    this.createInputElements();
    this.createOutputElements();

    this.fabricRect.on('moving', options => {
      let left = Math.round(options.e.offsetX / this.grid.gridSize) *
        this.grid.gridSize;
      left = Math.max(Math.min(left, this.grid.leftMax), this.grid.leftMin);

      let top = Math.round(options.e.offsetY / this.grid.gridSize) *
        this.grid.gridSize;
      top = Math.max(Math.min(top, this.grid.topMax), this.grid.topMin);

      const newPos = new Vector(
        Math.floor(left / this.grid.gridSize),
        Math.floor(top / this.grid.gridSize)
      );

      if (newPos.equals(this.pos) || this.grid.get(newPos) !== undefined) {
        this.fabricRect.left = Math.max(
          Math.min(this.pos.x * this.grid.gridSize, this.grid.leftMax),
          this.grid.leftMin
        );
        this.fabricRect.top = Math.max(
          Math.min(this.pos.y * this.grid.gridSize, this.grid.leftMax),
          this.grid.leftMin
        );
      } else {
        this.fabricRect.left = left;
        this.fabricRect.top = top;

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

  setAsInputElement() {
    this.lastTime = 0;
    this.fabricRect.on('mousedown', options => {
      const date = new Date();
      const now = date.getTime();
      if (now - this.lastTime < 500) {
        console.log('dubble');
      }
      this.lastTime = now;
    });
  }
}

export default ElecElement;
