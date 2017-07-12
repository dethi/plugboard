import { fabric } from 'fabric';

import ElementView from './../board/view/elementView';
import { GRID_SIZE, LINK_SIZE } from '../board/constante';

import Vector from '../utils/vector';

export default class ComponentEditor {
  constructor(width, height, el) {
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

    this.fabricGridLines = [];
    this.isGridVisible = true;

    this.addGrid();
  }

  setSpec(spec) {
    this.spec = spec;

    if (this.element !== undefined) {
      this.element.getFabricElements().forEach(el => {
        this.fabricCanvas.remove(el);
      });
    }

    this.addElement();
  }

  addElement() {
    this.element = new ElementView(0, 0, this.spec, false);
    this.element.placeOnBoard(this, new Vector(1, 1));
    this.element.initComponent();
    this.element.getFabricElements().forEach(el => {
      this.fabricCanvas.add(el);
      el.evented = false;
    });
  }

  updateEl() {
    this.element.spec = this.spec;
    this.element.refresh();
    this.fabricCanvas.renderAll();
  }

  addGrid() {
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

  updateDimX(dimX) {
    this.spec.dimX = dimX;
    this.updateEl();
  }

  updateDimY(dimY) {
    this.spec.dimY = dimY;
    this.updateEl();
  }

  updateColor(color) {
    this.spec.color = color;
    this.updateEl();
  }

  updateTitle(title) {
    this.spec.title = title;
    this.updateEl();
  }

  getFabricPos(pos) {
    return new Vector(
      Math.max(Math.min(pos.x * GRID_SIZE, this.leftMax), this.leftMin),
      Math.max(Math.min(pos.y * GRID_SIZE, this.topMax), this.topMin)
    );
  }

  toPng() {
    this.fabricGridLines.forEach(el => this.fabricCanvas.remove(el));

    const margin = LINK_SIZE + 2;
    const options = {
      format: 'png',
      left: this.element.fabricRect.left - margin,
      top: this.element.fabricRect.top - margin,
      width: this.element.fabricRect.width + margin * 2,
      height: this.element.fabricRect.height + margin * 2
    };

    const res = this.fabricCanvas.toDataURL(options);

    this.fabricGridLines.forEach(el => this.fabricCanvas.add(el));

    return res;
  }
}
