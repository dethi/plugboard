import { fabric } from 'fabric';

import { LinkType, LinkView } from './linkView';

import Vector from '../../utils/vector';

import { GRID_SIZE, LINK_SIZE } from '../constante';

import { ImageElementProvider } from '../../utils/imageElementProvider';

export default class ElementView {
  constructor(id, rotate, spec, isInput = false) {
    this.id = id;
    this.rotate = rotate;
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

        this.moveRect(
          fabricComponent,
          this.componentSize * this.pos.x,
          this.componentSize * this.pos.y
        );

        fabricComponent.width = this.componentSize;
        fabricComponent.height = this.componentSize;

        fabricComponent.angle = 90 * this.rotate;

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

  onMove(pos, isCursor = false) {
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

    if (!isCursor) {
      if (
        newPos.equals(this.pos) ||
        !this.boardView.controller.onElementMove(this.pos, newPos)
      )
        this.move(this.pos);
    } else {
      // UGLY
      if (
        newPos.equals(this.pos) ||
        this.boardView.controller.gridController.get(newPos)
      ) {
        this.move(this.pos);
        return this.pos;
      } else {
        this.move(newPos);
        return newPos;
      }
    }
  }

  move(newPos) {
    this.pos = newPos;

    const fabricPos = this.boardView.getFabricPos(this.pos);

    this.moveRect(this.fabricRect, fabricPos.x, fabricPos.y);

    this.moveInputElements();
    this.moveOutputElements();
  }

  moveRect(rect, posX, posY) {
    rect.left = posX +
      (this.rotate === 1 || this.rotate === 2 ? this.componentSize : 0);
    rect.top = posY +
      (this.rotate === 2 || this.rotate === 3 ? this.componentSize : 0);
    rect.setCoords();
  }

  destroy() {
    this.inputElements.forEach(el => el.destroy());
    this.outputElements.forEach(el => el.destroy());
  }

  createLinkElements(nbElement, linkType, linkNames) {
    const newLinkElements = [];

    for (let i = 0; i < nbElement; i++) {
      const newLinkElement = new LinkView(
        linkNames[i],
        this,
        linkType,
        this.linkSize
      );

      this.linkElements[linkNames[i]] = newLinkElement;
      newLinkElements.push(newLinkElement);
    }
    return newLinkElements;
  }

  moveLinkElements(initPos, isLeft, elements) {
    const elPadding = (this.componentSize - this.linkSize * elements.length) /
      (elements.length + 1);

    elements.forEach((el, index) => {
      const topPadding = index * this.linkSize + (index + 1) * elPadding;
      if (isLeft)
        el.move(
          new Vector(initPos, this.componentSize * this.pos.y + topPadding)
        );
      else
        el.move(
          new Vector(this.componentSize * this.pos.x + topPadding, initPos)
        );
    });
  }

  createInputElements() {
    this.inputElements = this.createLinkElements(
      this.nbInput,
      LinkType.INPUT,
      this.spec.input
    );

    this.moveInputElements();
  }

  moveInputElements() {
    if (this.rotate === 0 || this.rotate === 2) {
      const leftPos = this.componentSize * this.pos.x +
        (this.rotate === 0 ? -this.linkSize : this.componentSize);
      this.moveLinkElements(leftPos, true, this.inputElements);
    } else {
      const topPos = this.componentSize * this.pos.y +
        (this.rotate === 1 ? -this.linkSize : this.componentSize);
      this.moveLinkElements(topPos, false, this.inputElements);
    }
  }

  createOutputElements() {
    this.outputElements = this.createLinkElements(
      this.nbOutput,
      LinkType.OUTPUT,
      this.spec.output
    );

    this.moveOutputElements();
  }

  moveOutputElements() {
    if (this.rotate === 0 || this.rotate === 2) {
      const leftPos = this.componentSize * this.pos.x +
        (this.rotate === 2 ? -this.linkSize : this.componentSize);
      this.moveLinkElements(leftPos, true, this.outputElements);
    } else {
      const topPos = this.componentSize * this.pos.y +
        (this.rotate === 3 ? -this.linkSize : this.componentSize);
      this.moveLinkElements(topPos, false, this.outputElements);
    }
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
      this.moveRect(
        this.fabricRect,
        this.componentSize * this.pos.x,
        this.componentSize * this.pos.y
      );

      this.fabricRect.width = this.componentSize;
      this.fabricRect.height = this.componentSize;

      this.boardView.fabricCanvas.renderAll();
      this.boardView.controller.setInput(this.id, this.on ? 1 : 0);
    });
  }
}
