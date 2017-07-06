import { fabric } from 'fabric';

import { LinkType, LinkView } from './linkView';

import Vector from '../../utils/vector';

import { GRID_SIZE, LINK_SIZE, EL_FONT_SIZE } from '../constante';

export default class ElementView {
  constructor(id, rotate, spec, isInput = false) {
    this.id = id;
    this.rotate = rotate;
    this.spec = spec;

    this.componentSizeX = GRID_SIZE * this.spec.dimX;
    this.componentSizeY = GRID_SIZE * this.spec.dimY;
    this.linkSize = LINK_SIZE;

    this.isInput = isInput;

    this.nbInput = this.spec.input.length;
    this.inputElements = null;
    this.nbOutput = this.spec.output.length;
    this.outputElements = null;
    this.linkElements = {};

    this.fabricElements = [];
    this.fabricRect = null;
    this.fabricText = null;
  }

  initComponent() {
    this.fabricRect = new fabric.Rect({
      width: this.componentSizeX,
      height: this.componentSizeY,
      angle: 90 * this.rotate,
      fill: this.spec.color,
      hasControls: false
    });

    this.fabricRect.id = this.id;
    this.fabricRect.on('moving', options =>
      this.onMove(new Vector(options.e.offsetX, options.e.offsetY)));

    this.fabricElements.push(this.fabricRect);

    if (this.isInput) this.setAsInputElement();

    this.createInputElements();
    this.createOutputElements();

    this.moveRect(GRID_SIZE * this.pos.x, GRID_SIZE * this.pos.y);

    this.fabricText = new fabric.Text(this.getTitle(), {
      fontSize: EL_FONT_SIZE,
      fontWeight: 'bold',
      hasControls: false,
      evented: false
    });
    this.fabricElements.push(this.fabricText);

    this.moveText(GRID_SIZE * this.pos.x, GRID_SIZE * this.pos.y);
  }

  refresh() {
    this.componentSizeX = GRID_SIZE * this.spec.dimX;
    this.componentSizeY = GRID_SIZE * this.spec.dimY;

    this.fabricRect.width = this.componentSizeX;
    this.fabricRect.height = this.componentSizeY;
    this.fabricRect.angle = 90 * this.rotate;
    this.fabricRect.fill = this.spec.color;
    this.fabricRect.dirty = true;

    this.fabricText.text = this.getTitle();

    this.move(this.pos);
  }

  placeOnBoard(boardView, pos) {
    this.boardView = boardView;
    this.pos = pos;
  }

  onMove(pos, isCursor = false) {
    let left = Math.round((pos.x - GRID_SIZE / 2) / GRID_SIZE) * GRID_SIZE;
    left = Math.max(
      Math.min(left, this.boardView.leftMax),
      this.boardView.leftMin
    );

    let top = Math.round((pos.y - GRID_SIZE / 2) / GRID_SIZE) * GRID_SIZE;
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
    this.moveRect(fabricPos.x, fabricPos.y);
    this.moveText(fabricPos.x, fabricPos.y);

    this.moveInputElements();
    this.moveOutputElements();
  }

  moveRect(posX, posY) {
    this.fabricRect.left = posX +
      (this.rotate === 1 ? this.componentSizeY : 0) +
      (this.rotate === 2 ? this.componentSizeX : 0);

    this.fabricRect.top = posY +
      (this.rotate === 2 ? this.componentSizeY : 0) +
      (this.rotate === 3 ? this.componentSizeX : 0);

    this.fabricRect.setCoords();
  }

  moveText(posX, posY) {
    if (!this.fabricText) return;

    this.fabricText.left = posX +
      (this.rotate === 0 || this.rotate === 2
        ? this.componentSizeX / 2 - this.fabricText.width / 2
        : this.componentSizeY / 2 - this.fabricText.width / 2);

    this.fabricText.top = posY +
      (this.rotate === 0 || this.rotate === 2
        ? this.componentSizeY / 2 - this.fabricText.height / 2
        : this.componentSizeX / 2 - this.fabricText.height / 2);

    this.fabricText.setCoords();
  }

  increaseRotate() {
    this.rotate += 1;
    this.rotate %= 4;

    this.fabricRect.angle = 90 * this.rotate;

    this.move(this.pos);
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
    let elPadding = (this.componentSizeY - this.linkSize * elements.length) /
      (elements.length + 1);
    if (isLeft)
      elPadding = (this.componentSizeY - this.linkSize * elements.length) /
        (elements.length + 1);

    elements.forEach((el, index) => {
      const topPadding = index * this.linkSize + (index + 1) * elPadding;
      if (isLeft)
        el.move(new Vector(initPos, GRID_SIZE * this.pos.y + topPadding));
      else
        el.move(new Vector(GRID_SIZE * this.pos.x + topPadding, initPos));
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
      const leftPos = GRID_SIZE * this.pos.x +
        (this.rotate === 0 ? -this.linkSize : this.componentSizeX);
      this.moveLinkElements(leftPos, true, this.inputElements);
    } else {
      const topPos = GRID_SIZE * this.pos.y +
        (this.rotate === 1 ? -this.linkSize : this.componentSizeX);
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
      const leftPos = GRID_SIZE * this.pos.x +
        (this.rotate === 2 ? -this.linkSize : this.componentSizeX);
      this.moveLinkElements(leftPos, true, this.outputElements);
    } else {
      const topPos = GRID_SIZE * this.pos.y +
        (this.rotate === 3 ? -this.linkSize : this.componentSizeX);
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

    const newColor = isOn ? this.spec.colorOn : this.spec.color;

    this.fabricRect.fill = newColor;
    this.fabricRect.dirty = true;
    this.boardView.fabricCanvas.renderAll();

    this.boardView.controller.setInput(this.id, this.on ? 1 : 0);
  }

  getTitle() {
    const elName = this.spec.name.split('_');
    let elTitle = this.spec.title.substring(
      0,
      Math.max(4 * (Math.min(this.spec.dimX, this.spec.dimY) - 1) + 1, 1)
    );
    if (elName[0] === 'INPUT') elTitle = 'I';
    if (elName[0] === 'OUTPUT') elTitle = 'O';
    return elTitle;
  }
}
