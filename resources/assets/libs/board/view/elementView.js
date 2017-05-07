import { fabric } from 'fabric';

import { LinkType, LinkView } from './linkView';

import { Vector } from '../../utils/vector';

import { GRID_SIZE, LINK_SIZE } from '../constante';

export class ElementView {
  constructor(gridView, vector, elementModel) {
    this.id = elementModel.id;

    this.gridView = gridView;
    this.pos = vector;
    this.spec = elementModel.spec;

    this.componentSize = GRID_SIZE;
    this.linkSize = LINK_SIZE;

    this.nbInput = this.spec.input.length;
    this.inputElements = null;
    this.nbOutput = this.spec.output.length;
    this.outputElements = null;
    this.linkElements = {};

    this.fabricElements = [];
    this.fabricRect = null;

    fabric.Image.fromURL(this.spec.img, oImg => {
      this.initComponent(oImg);
    });

    this.createInputElements();
    this.createOutputElements();
  }

  initComponent(fabricComponent) {
    fabricComponent.top = this.componentSize * this.pos.y;
    fabricComponent.left = this.componentSize * this.pos.x;
    fabricComponent.width = this.componentSize;
    fabricComponent.height = this.componentSize;
    fabricComponent.hasControls = false;

    this.fabricRect = fabricComponent;
    this.fabricElements.push(this.fabricRect);

    this.fabricRect.on('moving', options => this.onMove(options));

    this.gridView.fabricCanvas.add(this.fabricRect);
  }

  onMove(options) {
    let left = Math.round(options.e.offsetX / GRID_SIZE) * GRID_SIZE;
    left = Math.max(
      Math.min(left, this.gridView.leftMax),
      this.gridView.leftMin
    );

    let top = Math.round(options.e.offsetY / GRID_SIZE) * GRID_SIZE;
    top = Math.max(Math.min(top, this.gridView.topMax), this.gridView.topMin);

    const newPos = new Vector(
      Math.floor(left / GRID_SIZE),
      Math.floor(top / GRID_SIZE)
    );

    if (
      newPos.equals(this.pos) || this.gridView.controller.get(newPos) !== null
    ) {
      const fabricPos = this.gridView.getFabricPos(this.pos);

      this.fabricRect.left = fabricPos.x;
      this.fabricRect.top = fabricPos.y;
      this.fabricRect.setCoords();
    } else {
      this.gridView.controller.onElementMove(this.pos, newPos);
    }
  }

  move(newPos) {
    this.pos = newPos;

    const fabricPos = this.gridView.getFabricPos(this.pos);

    this.fabricRect.left = fabricPos.x;
    this.fabricRect.top = fabricPos.y;
    this.fabricRect.setCoords();

    this.moveInputElements();
    this.moveOutputElements();
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
    const leftPos = this.componentSize * (this.pos.x + 1) - this.linkSize / 2;
    this.outputElements = this.createLinkElements(
      leftPos,
      this.nbOutput,
      LinkType.OUTPUT,
      this.spec.output
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
    const newImg = isOn ? this.spec.imgOn : this.spec.img;

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
