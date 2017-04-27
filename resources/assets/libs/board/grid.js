import { fabric } from 'fabric';

import { LinkType, LinkLine } from './linkElement';
import ElecElement from './elecElement';

import Vector from '../utils/vector';

import { ElementType } from '../element/elementBlueprint';

class Grid {
  constructor(width, height, gridSize, el, getCurBlueprint) {
    this.getCurBlueprint = getCurBlueprint;
    this.gridSize = gridSize;

    this.width = width;
    this.height = height;
    this.space = [width * height];

    this.gridWidth = this.width * this.gridSize;
    this.gridHeight = this.height * this.gridSize;

    this.fabricCanvas = new fabric.Canvas();
    this.fabricCanvas.initialize(el, {
      selection: false,
      height: this.gridHeight,
      width: this.gridWidth
    });

    this.leftMin = this.gridSize;
    this.leftMax = this.gridWidth - 2 * this.gridSize;
    this.topMin = this.gridSize;
    this.topMax = this.gridHeight - 2 * this.gridSize;

    this.color = 'red';

    this.inputElements = [];
    this.outputElements = [];
    this.gateElements = [];
    this.elecElements = [];

    this.add = true;
    this.addLink = false;
    this.linkOutputs = null;
    this.linkEndding = null;
    this.linkLine = null;

    this.engineRepresentation = {};

    this.fabricCanvas.on('mouse:down', options => {
      if (!this.add) return;

      const blueprint = this.getCurBlueprint();
      if (blueprint === undefined) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      const pos = new Vector(
        Math.floor(mousePos.x / this.gridSize),
        Math.floor(mousePos.y / this.gridSize)
      );

      if (!this.isInside(pos) || this.get(pos) !== undefined) return;

      this.addElement(pos, blueprint);
    });

    this.fabricCanvas.on('mouse:move', options => {
      if (!this.addLink) return;

      const mousePos = this.fabricCanvas.getPointer(options.e);
      this.updateCreateLink(mousePos);
    });

    this.fabricCanvas.on('mouse:up', options => {
      if (this.addLink) this.finishCreateLink();
    });

    this.addGridLine();
  }

  isInside(vector) {
    return vector.x > 0 &&
      vector.x < this.width - 1 &&
      vector.y > 0 &&
      vector.y < this.height - 1;
  }

  addGridLine() {
    this.fabricGridLines = [];
    this.isGridVisible = true;

    for (let x = 1; x < this.gridWidth / this.gridSize; x++) {
      this.fabricGridLines.push(
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
      this.fabricGridLines.push(
        new fabric.Line(
          [0, this.gridSize * x, this.gridWidth, this.gridSize * x],
          {
            stroke: '#114B5F',
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

  get(vector) {
    return this.space[vector.x + this.width * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  }

  addElement(vector, blueprint) {
    const newElecElement = new ElecElement(this, vector, blueprint);

    switch (blueprint.elementType) {
      case ElementType.INPUT:
        newElecElement.setAsInputElement();
        this.inputElements.push(newElecElement);
        break;
      case ElementType.OUTPUT:
        this.outputElements.push(newElecElement);
        break;
      case ElementType.GATE:
        this.gateElements.push(newElecElement);
        break;
      default:
        break;
    }

    this.elecElements.push(newElecElement);
    this.set(vector, newElecElement);

    newElecElement.getFabricElements().map(el => this.fabricCanvas.add(el));
  }

  startCreateLink(linkElement) {
    this.addLink = true;
    this.addLinkStartEl = linkElement;
    this.linkEndding = null;

    this.linkOutputs = [];

    this.elecElements.forEach(el => {
      if (el === this.addLinkStartEl.component) return;
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

    // Where put this var ? and also the linkSize ratio.
    const maxDist = 60;
    let curDist = maxDist;

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
        selectable: false
      }
    );

    this.fabricCanvas.add(this.linkLine);
  }

  finishCreateLink() {
    this.addLink = false;
    this.fabricCanvas.remove(this.linkLine);

    if (this.linkEndding) {
      if (this.addLinkStartEl.linkType === LinkType.OUTPUT) {
        const link = new LinkLine(this.addLinkStartEl, this.linkEndding);
        this.addLinkStartEl.linkLines.push(link);
        this.linkEndding.linkLines.push(link);
        this.fabricCanvas.add(link.fabricLine);
      } else {
        const link = new LinkLine(this.linkEndding, this.addLinkStartEl);
        this.addLinkStartEl.linkLines.push(link);
        this.linkEndding.linkLines.push(link);
        this.fabricCanvas.add(link.fabricLine);
      }
    }
  }

  exportForEngine() {
    this.createEngineRepresentation();
    this.createEngineStates();
    return this.engineRepresentation;
  }

  createEngineRepresentation() {
    const board = {};
    const registeryLines = {};
    let curRegistery = 0;

    // Create Input Registery
    board.input = {};
    this.inputElements.forEach((el, index) => {
      board.input['i' + index] = curRegistery;
      // Add check ?
      el.outputElements[0].setId(curRegistery);
      curRegistery++;
    });

    // Create Output Registery
    board.output = {};
    this.outputElements.forEach((el, index) => {
      board.output['o' + index] = curRegistery;
      el.inputElements[0].setId(curRegistery);
      registeryLines[curRegistery] = el.inputElements[0].linkLines[0];
      curRegistery++;
    });

    // Create Middle Registery
    this.gateElements.forEach(el => {
      el.inputElements.forEach(inEl => {
        const linkTo = inEl.linkLines[0].linkInput;
        let id = linkTo.getId();

        if (id === undefined) {
          id = curRegistery;
          registeryLines[curRegistery] = inEl.linkLines[0];
          curRegistery++;
        }

        inEl.setId(id);
      });
    });

    // Link components
    board.components = {};
    this.gateElements.forEach((el, index) => {
      const component = {};
      component.specKey = 'AND';

      let curChar = 'A';
      component.input = {};
      el.inputElements.forEach(inEl => {
        component.input[curChar] = inEl.getId();
        curChar = String.fromCharCode(curChar.charCodeAt() + 1);
      });

      component.output = {};
      el.outputElements.forEach(ouEl => {
        component.output[curChar] = ouEl.linkLines.map(link => {
          return link.linkOutput.getId();
        });
        curChar = String.fromCharCode(curChar.charCodeAt() + 1);
      });

      board.components['c' + index] = component;
    });

    board.nextRegistery = curRegistery;

    this.engineRepresentation.board = board;
    this.engineRepresentation.registeryLines = registeryLines;
  }

  createEngineStates() {
    const states = new Array(
      this.engineRepresentation.board.nextRegistery
    ).fill(0);

    this.inputElements.forEach((el, index) => {
      states[index] = el.on ? 1 : 0;
    });

    Object.keys(this.engineRepresentation.registeryLines).forEach(key => {
      states[key] = this.engineRepresentation.registeryLines[key].on ? 1 : 0;
    });

    this.engineRepresentation.states = states;
  }

  applyState(states) {
    const nbInput = this.inputElements.length;
    this.outputElements.forEach((el, index) => {
      el.setOn(states[nbInput + index] === 1);
    });

    // Handle set LinkInput witout infinit loop
    Object.keys(states).forEach(key => {
      if (key < nbInput) return;
      this.engineRepresentation.registeryLines[key].setOn(states[key] === 1);
    });
  }
}

export default Grid;
