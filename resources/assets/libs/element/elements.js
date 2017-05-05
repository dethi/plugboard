import InputImg from '../../../media/components/input.png';
import OutputImg from '../../../media/components/output.png';

class Element {
  constructor(name, inputs, outputs, img) {
    this.name = name;

    this.inputs = inputs;
    this.outputs = outputs;
    this.img = img;

    this.pos = null;
  }

  place(pos) {
    this.pos = pos;
  }
}

export class InputElement extends Element {
  constructor() {
    super('Input', [], ['A'], InputImg);
  }
}

export class OutputElement extends Element {
  constructor() {
    super('Output', ['A'], [], OutputImg);
  }
}

export class GateElement extends Element {
  constructor(name, inputs, outputs, img, truthTable) {
    super(name, inputs, outputs, img);

    this.truthTable = truthTable;
  }
}
