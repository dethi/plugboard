import { Grid } from '../model/grid';
import { GridView } from '../view/gridView';

import {
  InputElementSpec,
  OutputElementSpec,
  GateElementSpec
} from '../model/elementSpec';
import { Element } from '../model/element';

import { GRID_SIZE_X, GRID_SIZE_Y } from '../constante';

export class GridController {
  constructor(canvasHolder, getSelectedSpec) {
    this.grid = new Grid();

    this.sizeX = GRID_SIZE_X;
    this.sizeY = GRID_SIZE_Y;
    this.gridView = new GridView(this.sizeX, this.sizeY, this, canvasHolder);

    this.space = new Array(this.sizeX * this.sizeY).fill(null);
    this.getSelectedSpec = getSelectedSpec;

    this.curId = 0;
  }

  onElementMove(oldPos, newPos) {
    const elId = this.get(oldPos);

    this.grid.elements[elId].pos = newPos;

    this.set(oldPos, null);
    this.set(newPos, elId);

    this.gridView.moveElement(elId, newPos);
  }

  onClick(pos) {
    if (this.get(pos) !== null) return;

    const selectedSpec = this.getSelectedSpec();

    if (selectedSpec === null) return;

    this.addElement(pos, selectedSpec);
  }

  addElement(pos, spec) {
    switch (spec.constructor) {
      case InputElementSpec:
        break;
      case OutputElementSpec:
        break;
      case GateElementSpec:
        if (this.grid.specs[spec.name] === undefined) this.addInSpecs(spec);
        break;
      default:
    }

    const newElId = this.curId++;
    const newEl = new Element(newElId, pos, spec);

    this.grid.elements[newElId] = newEl;
    this.gridView.addElement(pos, newEl);

    this.set(pos, newElId);
  }

  addLink(inputInfo, outputInfo) {
    this.grid.elements[inputInfo[0]].output[inputInfo[1]].push(outputInfo);
    this.grid.elements[outputInfo[0]].input[outputInfo[1]] = inputInfo;

    this.gridView.addLink(inputInfo, outputInfo);
  }

  addInSpecs(spec) {
    this.grid.specs[spec.name] = {
      input: spec.input,
      output: spec.output,
      truthTable: spec.truthTable
    };
  }

  get(vector) {
    return this.space[vector.x + this.sizeX * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.sizeX * vector.y] = value;
  }
}
