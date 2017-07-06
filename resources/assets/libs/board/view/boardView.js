import { fabric } from 'fabric';

import { LinkType, LinkLine } from './linkView';
import ElementView from './elementView';

import BoardState from '../controller/boardState';

import Vector from '../../utils/vector';

import { GRID_SIZE, MAX_DIST_LINK } from '../constante';

export default class BoardView {
  constructor(width, height, controller, el) {
    this.controller = controller;
    this.gridSize = GRID_SIZE;

    this.width = width;
    this.height = height;

    this.gridWidth = this.width * this.gridSize;
    this.gridHeight = this.height * this.gridSize;

    this.fabricCanvas = new fabric.Canvas(el, {
      selection: false,
      height: this.gridHeight,
      width: this.gridWidth
    });

    this.leftMin = this.gridSize;
    this.leftMax = this.gridWidth - 2 * this.gridSize;
    this.topMin = this.gridSize;
    this.topMax = this.gridHeight - 2 * this.gridSize;

    this.elecElements = {};

    this.curCusor = null;
    this.curCusorPos = new Vector(0, 0);

    this.fabricCanvas.on('mouse:down', options => {
      switch (this.controller.boardState) {
        case BoardState.ADDING:
          this.controller.onClick(this.curCusorPos);
          break;
        default:
          break;
      }
    });

    this.fabricCanvas.on('mouse:move', options => {
      switch (this.controller.boardState) {
        case BoardState.LINKING:
          const mousePos = this.fabricCanvas.getPointer(options.e);
          this.updateCreateLink(mousePos);
          break;
        case BoardState.ADDING:
          this.curCusorPos = this.curCusor.onMove(
            new Vector(options.e.layerX, options.e.layerY),
            true
          );
          this.fabricCanvas.renderAll();
          break;
        default:
          break;
      }
    });

    this.fabricCanvas.on('mouse:up', options => {
      switch (this.controller.boardState) {
        case BoardState.LINKING:
          this.finishCreateLink();
          break;
        default:
          break;
      }
    });

    this.addGridLine();
  }

  addGridLine() {
    this.fabricGridLines = [];
    this.isGridVisible = true;

    for (let x = 1; x < this.gridWidth / this.gridSize; x++) {
      this.fabricGridLines.push(
        new fabric.Line(
          [this.gridSize * x, 0, this.gridSize * x, this.gridHeight],
          {
            stroke: '#CDCDCD',
            evented: false
          }
        )
      );
    }
    for (let x = 1; x < this.gridHeight / this.gridSize; x++) {
      this.fabricGridLines.push(
        new fabric.Line(
          [0, this.gridSize * x, this.gridWidth, this.gridSize * x],
          {
            stroke: '#CDCDCD',
            evented: false
          }
        )
      );
    }
    this.fabricGridLines.forEach(el => this.fabricCanvas.add(el));
  }

  toggleGridVisibility() {
    this.isGridVisible = !this.isGridVisible;
    this.fabricGridLines.forEach(el => el.visible = this.isGridVisible);
    this.fabricCanvas.renderAll();
  }

  getFabricPos(pos) {
    return new Vector(
      Math.max(Math.min(pos.x * GRID_SIZE, this.leftMax), this.leftMin),
      Math.max(Math.min(pos.y * GRID_SIZE, this.topMax), this.topMin)
    );
  }

  addElement(pos, elementModel, spec) {
    const isInput = elementModel.specName === 'INPUT';
    const newElementView = new ElementView(
      elementModel.id,
      elementModel.rotate,
      spec,
      isInput
    );

    newElementView.placeOnBoard(this, pos);
    newElementView.initComponent();

    this.elecElements[elementModel.id] = newElementView;

    newElementView.getFabricElements().forEach(el => {
      this.fabricCanvas.add(el);
    });
  }

  removeElement(elId) {
    this.elecElements[elId].getFabricElements().forEach(el => {
      this.fabricCanvas.remove(el);
    });

    this.elecElements[elId].destroy();

    delete this.elecElements[elId];
  }

  rotateElement(elId) {
    this.elecElements[elId].increaseRotate();
    this.fabricCanvas.renderAll();
  }

  addLink(inputInfo, outputInfo) {
    const linkA = this.elecElements[inputInfo[0]].linkElements[inputInfo[1]];
    const linkB = this.elecElements[outputInfo[0]].linkElements[outputInfo[1]];

    const link = new LinkLine(linkA, linkB);

    linkA.linkLines.push(link);
    linkB.linkLines.push(link);
  }

  moveElement(elId, newPos) {
    this.elecElements[elId].move(newPos);
  }

  setOn(elId, linkName, newState) {
    const linkEl = this.elecElements[elId].linkElements[linkName];
    linkEl.linkLines.forEach(link => link.setState(newState));
  }

  setCursor(cursor, resetPos = true) {
    this.curCusor = cursor;
    this.curCusor.getFabricElements().forEach(el => {
      if (resetPos) {
        el.left = -100;
        el.top = -100;
      }
      this.fabricCanvas.add(el);
    });
    if (!resetPos) this.curCusor.move(this.curCusorPos);

    this.fabricCanvas.renderAll();
  }

  unSetCursor() {
    if (this.curCusor)
      this.curCusor
        .getFabricElements()
        .forEach(el => this.fabricCanvas.remove(el));
  }

  startCreateLink(linkElement) {
    this.controller.onStartLink();
    this.addLinkStartEl = linkElement;
    this.linkEndding = null;

    this.linkOutputs = [];

    Object.keys(this.elecElements).forEach(key => {
      const el = this.elecElements[key];
      if (el === this.addLinkStartEl.elementView) return;
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

    let curDist = MAX_DIST_LINK;

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
        strokeWidth: this.gridSize / 20,
        selectable: false
      }
    );

    this.fabricCanvas.add(this.linkLine);
  }

  finishCreateLink() {
    this.fabricCanvas.remove(this.linkLine);

    if (this.linkEndding) {
      if (this.addLinkStartEl.linkType === LinkType.OUTPUT)
        this.controller.onFinishLink(
          [this.addLinkStartEl.elementView.id, this.addLinkStartEl.name],
          [this.linkEndding.elementView.id, this.linkEndding.name]
        );
      else
        this.controller.onFinishLink(
          [this.linkEndding.elementView.id, this.linkEndding.name],
          [this.addLinkStartEl.elementView.id, this.addLinkStartEl.name]
        );
    } else {
      this.controller.onFinishLinkFail();
    }
  }

  clear() {
    this.elecElements = {};
    this.fabricCanvas.clear();

    this.addGridLine();
  }

  toPng() {
    // Ugly
    let minX = 999999999999;
    let maxX = 0;
    let minY = 999999999999;
    let maxY = 0;

    Object.keys(this.elecElements).forEach(id => {
      const el = this.elecElements[id];
      if (el.pos.x > maxX) maxX = el.pos.x;
      if (el.pos.x < minX) minX = el.pos.x;
      if (el.pos.y > maxY) maxY = el.pos.y;
      if (el.pos.y < minY) minY = el.pos.y;
    });

    if (maxX === 0) {
      return this.fabricCanvas.toDataURL('png');
    }

    // Ulgy way to create a square
    if (maxX - minX < maxY - minY) {
      maxX = minX + maxY - minY;
    } else {
      maxY = minY + maxX - minX;
    }

    minX *= GRID_SIZE;
    maxX = maxX * GRID_SIZE + GRID_SIZE;
    minY *= GRID_SIZE;
    maxY = maxY * GRID_SIZE + GRID_SIZE;

    const options = {
      format: 'png',
      left: minX - GRID_SIZE / 2,
      top: minY - GRID_SIZE / 2,
      width: maxX - minX + GRID_SIZE,
      height: maxY - minY + GRID_SIZE
    };

    return this.fabricCanvas.toDataURL(options);
  }
}
