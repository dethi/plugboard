export class ElementSpec {
  constructor(name, input, output, color, dimX, dimY) {
    this.name = name;

    this.input = input;
    this.output = output;
    this.color = color;

    this.dimX = dimX;
    this.dimY = dimY;
  }
}

export class InputElementSpec extends ElementSpec {
  constructor() {
    super('INPUT', [], ['A'], 'red', 1, 1);

    this.colorOn = 'green';
  }
}

export class OutputElementSpec extends ElementSpec {
  constructor() {
    super('OUTPUT', ['A'], [], 'red', 1, 1);

    this.colorOn = 'green';
  }
}

export class GateElementSpec extends ElementSpec {
  constructor(name, input, output, color, truthTable) {
    super(name, input, output, color, 2, 3);

    this.truthTable = truthTable;
  }
}
