import { Grid } from '../model/grid';

import {
  InputElementSpec,
  OutputElementSpec,
  GateElementSpec
} from './elementSpec';
import { Element } from './element';

export class GridController {
  constructor() {
    this.grid = new Grid();

    this.curId = 0;
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
    this.grid.elements[newElId] = new Element(newElId, pos, spec);
  }

  addLink(input, output) {
    const inputInfo = input.split('_');
    const outputInfo = output.split('_');

    this.grid.elements[inputInfo[0]].output[inputInfo[1]] = output;
    this.grid.elements[outputInfo[0]].input[outputInfo[1]] = input;
  }

  addInSpecs(spec) {
    this.grid.specs[spec.name] = {
      input: spec.input,
      output: spec.output,
      truthTable: spec.truthTable
    };
  }
}
