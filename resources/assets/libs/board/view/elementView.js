import { fabric } from 'fabric';

import { LinkType, LinkView } from './linkView';

import { Vector } from '../../utils/vector';

import { GRID_SIZE, LINK_SIZE } from '../constante';

import { ImageElementProvider } from '../../utils/imageElementProvider';

export class ElementView {
  constructor(id, spec, isInput = false) {
    this.id = id;
    this.spec = spec;

    this.componentSize = GRID_SIZE;
    this.linkSize = LINK_SIZE;

    this.isInput = isInput;

    this.nbInput = this.spec.input.length;
    this.inputElements = null;
    this.nbOutput = this.spec.output.length;
    this.outputElements = null;
    this.linkElements = {};

    this.fabricElements = [];
    this.fabricRect = null;

    this.img = ImageElementProvider.getElementImage(this.spec.img);
    if (this.spec.imgOn !== undefined)
      this.imgOn = ImageElementProvider.getElementImage(this.spec.imgOn);
  }

  initComponent() {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(this.img, fabricComponent => {
        fabricComponent.id = this.id;

        fabricComponent.top = this.componentSize * this.pos.y;
        fabricComponent.left = this.componentSize * this.pos.x;
        fabricComponent.width = this.componentSize;
        fabricComponent.height = this.componentSize;
        fabricComponent.hasControls = false;

        this.fabricRect = fabricComponent;
        this.fabricElements.push(this.fabricRect);

        this.fabricRect.on('moving', options =>
          this.onMove(new Vector(options.e.offsetX, options.e.offsetY)));

        this.fabricElements.push(fabricComponent);

        if (this.isInput) this.setAsInputElement();

        this.createInputElements();
        this.createOutputElements();

        resolve(fabricComponent);
      });
    });
  }

  placeOnBoard(boardView, pos) {
    this.boardView = boardView;
    this.pos = pos;
  }

  onMove(pos) {
    let left = Math.round(pos.x / GRID_SIZE) * GRID_SIZE;
    left = Math.max(
      Math.min(left, this.boardView.leftMax),
      this.boardView.leftMin
    );

    let top = Math.round(pos.y / GRID_SIZE) * GRID_SIZE;
    top = Math.max(Math.min(top, this.boardView.topMax), this.boardView.topMin);

    const newPos = new Vector(
      Math.floor(left / GRID_SIZE),
      Math.floor(top / GRID_SIZE)
    );

    if (
      newPos.equals(this.pos) ||
      !this.boardView.controller.onElementMove(this.pos, newPos)
    ) {
      const fabricPos = this.boardView.getFabricPos(this.pos);

      this.fabricRect.left = fabricPos.x;
      this.fabricRect.top = fabricPos.y;
      this.fabricRect.setCoords();
    }
  }

  move(newPos) {
    this.pos = newPos;

    const fabricPos = this.boardView.getFabricPos(this.pos);

    this.fabricRect.left = fabricPos.x;
    this.fabricRect.top = fabricPos.y;
    this.fabricRect.setCoords();

    this.moveInputElements();
    this.moveOutputElements();
  }

  destroy() {
    this.inputElements.forEach(el => el.destroy());
    this.outputElements.forEach(el => el.destroy());
  }

  createLinkElements(leftPos, nbElement, linkType, linkNames) {
    const newLinkElements = [];
    // Verify enough place for all link
    const elPadding = (this.componentSize - this.linkSize * nbElement) /
      (nbElement + 1);

    for (let i = 0; i < nbElement; i++) {
      const topPadding = i * this.linkSize + (i + 1) * elPadding;

      const newLinkElement = new LinkView(
        linkNames[i],
        this,
        linkType,
        this.linkSize,
        new Vector(leftPos, this.componentSize * this.pos.y + topPadding)
      );

      this.linkElements[linkNames[i]] = newLinkElement;
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
      LinkType.INPUT,
      this.spec.input
    );
  }

  moveInputElements() {
    const leftPos = this.componentSize * this.pos.x - this.linkSize / 2;
    this.moveLinkElements(leftPos, this.inputElements);
  }

  createOutputElements() {
    const leftPos = this.componentSize * (this.pos.x + 1);
    this.outputElements = this.createLinkElements(
      leftPos,
      this.nbOutput,
      LinkType.OUTPUT,
      this.spec.output
    );
  }

  moveOutputElements() {
    const leftPos = this.componentSize * (this.pos.x + 1);
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

    const newImg = isOn ? this.imgOn : this.img;

    this.fabricRect.setSrc(newImg, () => {
      this.fabricRect.top = this.componentSize * this.pos.y;
      this.fabricRect.left = this.componentSize * this.pos.x;
      this.fabricRect.width = this.componentSize;
      this.fabricRect.height = this.componentSize;

      this.boardView.fabricCanvas.renderAll();
      this.boardView.controller.setInput(this.id, this.on ? 1 : 0);
    });
  }
}
