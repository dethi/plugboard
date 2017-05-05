//import Vector from '../../utils/vector';

import {
  InputElementSpec,
  OutputElementSpec,
  GateElementSpec
} from './elementSpec';
import { Element } from './element';

export class Grid {
  constructor() {
    this.elements = [];
    this.specs = {};
  }

  addElement(pos, spec) {
    switch (spec.constructor) {
      case InputElementSpec:
        break;
      case OutputElementSpec:
        break;
      case GateElementSpec:
        if (this.specs[spec.name] === undefined) this.addInSpecs(spec);
        break;
      default:
    }

    this.elements.push(new Element(pos, spec));
  }

  addInSpecs(spec) {
    this.specs[spec.name] = {
      input: spec.input,
      output: spec.output,
      truthTable: spec.truthTable
    };
  }
}
