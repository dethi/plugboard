import { fabric } from 'fabric';

import { LinkType, LinkLine } from './linkView';
import { ElementView } from './elementView';

import { Vector } from '../../utils/vector';

import { GRID_SIZE, MAX_DIST_LINK } from '../constante';

export class GridView {
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

    this.linking = false;

    this.fabricCanvas.on('mouse:down', options => {
      const mousePos = this.fabricCanvas.getPointer(options.e);
      this.controller.onClick(
        new Vector(
          Math.floor(mousePos.x / this.gridSize),
          Math.floor(mousePos.y / this.gridSize)
        )
      );
    });

    this.fabricCanvas.on('mouse:move', options => {
      if (!this.linking) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      this.updateCreateLink(mousePos);
    });

    this.fabricCanvas.on('mouse:up', options => {
      if (this.linking) this.finishCreateLink();
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
            selectable: false
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
            selectable: false
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

  addElement(pos, elementModel) {
    const newElementView = new ElementView(this, pos, elementModel);
    this.elecElements[elementModel.id] = newElementView;

    //if (elementModel.spec.name === 'INPUT') newElementView.setAsInputElement();

    newElementView.getFabricElements().forEach(el => {
      this.fabricCanvas.add(el);
    });
  }

  addLink(inputInfo, outputInfo) {
    const linkA = this.elecElements[inputInfo[0]].linkElements[inputInfo[1]];
    const linkB = this.elecElements[outputInfo[0]].linkElements[outputInfo[1]];

    const link = new LinkLine(linkA, linkB, this.gridSize / 5);

    linkA.linkLines.push(link);
    linkB.linkLines.push(link);
    this.fabricCanvas.add(link.fabricLine);
  }

  moveElement(elId, newPos) {
    this.elecElements[elId].move(newPos);
  }

  startCreateLink(linkElement) {
    this.linking = true;
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
        strokeWidth: this.gridSize / 15,
        selectable: false
      }
    );

    this.fabricCanvas.add(this.linkLine);
  }

  finishCreateLink() {
    this.linking = false;
    this.fabricCanvas.remove(this.linkLine);

    if (this.linkEndding) {
      if (this.addLinkStartEl.linkType === LinkType.OUTPUT)
        this.controller.addLink(
          [this.addLinkStartEl.elementView.id, this.addLinkStartEl.name],
          [this.linkEndding.elementView.id, this.linkEndding.name]
        );
      else
        this.controller.addLink(
          [this.linkEndding.elementView.id, this.linkEndding.name],
          [this.addLinkStartEl.elementView.id, this.addLinkStartEl.name]
        );
    }
  }

  /**
  createEngineStates() {
    const states = new Array(
      this.engineRepresentation.board.nextRegistery
    ).fill(0);

    this.inputElements.forEach((el, index) => {
      states[index + 1] = el.on ? 1 : 0;
    });

    Object.keys(this.engineRepresentation.registeryLines).forEach(key => {
      states[key] = this.engineRepresentation.registeryLines[key].on ? 1 : 0;
    });

    this.engineRepresentation.states = states;
  }

  applyState(states) {
    const nbInput = this.inputElements.length + 1;
    this.outputElements.forEach((el, index) => {
      el.setOn(states[nbInput + index] === 1);
    });

    // Handle set LinkInput witout infinit loop
    Object.keys(states).forEach(key => {
      if (key < nbInput) return;
      this.engineRepresentation.registeryLines[key].setOn(states[key] === 1);
    });
  }
  **/
}
