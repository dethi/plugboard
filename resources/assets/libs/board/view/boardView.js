import { fabric } from 'fabric';

import { LinkType, LinkLine } from './linkView';
import ElementView from './elementView';

import BoardState from '../controller/boardState';

import Vector from '../../utils/vector';

import {
  GRID_SIZE_X,
  GRID_SIZE_Y,
  GRID_SIZE,
  GRID_SIZE_LIMIT,
  MAX_DIST_LINK
} from '../constante';

export default class BoardView {
  constructor(controller, el) {
    this.controller = controller;
    this.gridSize = GRID_SIZE;

    this.width = GRID_SIZE_X;
    this.height = GRID_SIZE_Y;

    this.gridWidth = this.width * this.gridSize;
    this.gridHeight = this.height * this.gridSize;

    this.fabricCanvas = new fabric.Canvas(el, {
      selection: false,
      height: this.gridHeight,
      width: this.gridWidth,
      renderOnAddRemove: false
    });

    this.leftMin = this.gridSize;
    this.leftMax = this.gridWidth - 2 * this.gridSize;
    this.topMin = this.gridSize;
    this.topMax = this.gridHeight - 2 * this.gridSize;

    this.elecElements = {};

    this.curCusor = null;
    this.curCusorPos = new Vector(0, 0);

    this.curBoardPos = new Vector(GRID_SIZE_LIMIT / 2, GRID_SIZE_LIMIT / 2);

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
      const mousePos = this.fabricCanvas.getPointer(options.e);
      this.controller.onMouseMove(this.mousePosToBoardPos(mousePos));

      switch (this.controller.boardState) {
        case BoardState.LINKING:
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

  dispose() {
    this.fabricCanvas.dispose();
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

    this.fabricCanvas.add(...this.fabricGridLines);
    this.fabricCanvas.renderAll();
  }

  toggleGridVisibility(isVisible) {
    this.isGridVisible = isVisible;
    this.fabricGridLines.forEach(el => el.visible = this.isGridVisible);
    this.fabricCanvas.renderAll();
  }

  onMove(dir) {
    this.curBoardPos = this.curBoardPos.addVector(dir);

    Object.keys(this.elecElements).forEach(id => {
      const el = this.elecElements[id];
      el.refresh();
    });

    this.fabricCanvas.renderAll();
  }

  resetPosBoard() {
    this.curBoardPos = new Vector(GRID_SIZE_LIMIT / 2, GRID_SIZE_LIMIT / 2);
    this.onMove(new Vector(0, 0));
  }

  addElement(pos, elementModel, spec) {
    const isInput = elementModel.specName === 'INPUT';

    const newElementView = new ElementView(
      elementModel.id,
      elementModel.name,
      elementModel.rotate,
      spec,
      isInput
    );

    newElementView.placeOnBoard(this, pos);
    newElementView.initComponent();

    this.elecElements[elementModel.id] = newElementView;

    this.fabricCanvas.add(...newElementView.getFabricElements());
  }

  removeElement(elId) {
    this.elecElements[elId].getFabricElements().forEach(el => {
      this.fabricCanvas.remove(el);
    });

    this.elecElements[elId].destroy();

    delete this.elecElements[elId];
    this.fabricCanvas.renderAll();
  }

  rotateElement(elId) {
    this.elecElements[elId].increaseRotate();
    this.fabricCanvas.renderAll();
  }

  renameElement(elId, newName) {
    this.elecElements[elId].rename(newName);
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
    this.fabricCanvas.renderAll();
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
    this.curBoardPos = new Vector(GRID_SIZE_LIMIT / 2, GRID_SIZE_LIMIT / 2);

    this.addGridLine();
  }

  toPng() {
    this.toggleGridVisibility(false);

    // Ugly
    let minX = 999999999999;
    let maxX = 0;
    let minY = 999999999999;
    let maxY = 0;

    Object.keys(this.elecElements).forEach(id => {
      const pos = this.elecElements[id].pos.minusVector(this.curBoardPos);

      if (pos.x > maxX) maxX = pos.x;
      if (pos.x < minX) minX = pos.x;
      if (pos.y > maxY) maxY = pos.y;
      if (pos.y < minY) minY = pos.y;
    });

    minX *= GRID_SIZE;
    maxX = (maxX + 1) * GRID_SIZE;
    minY *= GRID_SIZE;
    maxY = (maxY + 1) * GRID_SIZE;

    const options = {
      format: 'png',
      left: minX - GRID_SIZE,
      top: minY - GRID_SIZE,
      width: maxX - minX + GRID_SIZE * 2,
      height: maxY - minY + GRID_SIZE * 2
    };

    const data = this.fabricCanvas.toDataURL(options);
    this.toggleGridVisibility(true);
    return data;
  }

  getFabricPos(pos) {
    const boardPos = pos.minusVector(this.curBoardPos);
    return new Vector(boardPos.x * GRID_SIZE, boardPos.y * GRID_SIZE);
  }

  mousePosToBoardPos(mousePos) {
    let left = Math.round((mousePos.x - GRID_SIZE / 2) / GRID_SIZE) * GRID_SIZE;
    left = Math.max(Math.min(left, this.leftMax), this.leftMin);

    let top = Math.round((mousePos.y - GRID_SIZE / 2) / GRID_SIZE) * GRID_SIZE;
    top = Math.max(Math.min(top, this.topMax), this.topMin);

    return new Vector(
      Math.floor(left / GRID_SIZE),
      Math.floor(top / GRID_SIZE)
    ).addVector(this.curBoardPos);
  }
}
