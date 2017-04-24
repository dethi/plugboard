import { fabric } from 'fabric';

import { LinkType, LinkLine } from './linkElement';
import ElecElement from './elecElement';

import Vector from '../utils/vector';

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

    this.elecElements = [];

    this.add = true;
    this.addLink = false;
    this.linkOutputs = null;
    this.linkEndding = null;
    this.linkLine = null;

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
    const newElecElement = new ElecElement(
      this,
      vector,
      blueprint.nbInput,
      blueprint.nbOutput,
      blueprint.color
    );

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
      if (this.addLinkStartEl.linkType === LinkType.INPUT) {
        console.log('Start from Input');
        const link = new LinkLine(this.addLinkStartEl, this.linkEndding);
        this.addLinkStartEl.linkLines.push(link);
        this.linkEndding.linkLines.push(link);
        this.fabricCanvas.add(link.fabricLine);
      } else {
        console.log('Start from Output');
        const link = new LinkLine(this.linkEndding, this.addLinkStartEl);
        this.addLinkStartEl.linkLines.push(link);
        this.linkEndding.linkLines.push(link);
        this.fabricCanvas.add(link.fabricLine);
      }
    }
  }
}

export default Grid;
