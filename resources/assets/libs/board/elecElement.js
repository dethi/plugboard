import { fabric } from 'fabric';

import { LinkType, LinkElement } from './linkElement';

import Vector from '../utils/vector';

class ElecElement {
  constructor(grid, vector, blueprint, uglyCallback) {
    this.grid = grid;
    this.pos = vector;
    this.blueprint = blueprint;

    this.uglyCallback = uglyCallback;

    this.componentSize = this.grid.gridSize;
    this.linkSize = this.componentSize / 5;

    this.nbInput = this.blueprint.nbInput;
    this.inputElements = null;
    this.nbOutput = this.blueprint.nbOutput;
    this.outputElements = null;

    this.fabricElements = [];
    this.fabricRect = null;

    fabric.Image.fromURL(this.blueprint.img, oImg => {
      this.initComponent(oImg);
    });
  }

  initComponent(fabricComponent) {
    fabricComponent.top = this.componentSize * this.pos.y;
    fabricComponent.left = this.componentSize * this.pos.x;
    fabricComponent.width = this.componentSize;
    fabricComponent.height = this.componentSize;
    fabricComponent.hasControls = false;

    this.fabricRect = fabricComponent;
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

    this.uglyCallback(this);
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
    this.on = false;
    this.lastTime = 0;
    this.fabricRect.on('mousedown', options => {
      const date = new Date();
      const now = date.getTime();
      if (now - this.lastTime < 500) {
        this.setOn(!this.on);
      }
      this.lastTime = now;
    });
  }

  setOn(isOn) {
    this.on = isOn;
    const newImg = isOn ? this.blueprint.imgOn : this.blueprint.img;

    this.outputElements.forEach(ouEl => ouEl.setOn(isOn));

    this.fabricRect.setSrc(newImg, () => {
      this.fabricRect.top = this.componentSize * this.pos.y;
      this.fabricRect.left = this.componentSize * this.pos.x;
      this.fabricRect.width = this.componentSize;
      this.fabricRect.height = this.componentSize;

      this.grid.fabricCanvas.renderAll();
    });
  }
}

export default ElecElement;
