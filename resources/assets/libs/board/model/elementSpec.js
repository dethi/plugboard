export class ElementSpec {
  constructor(title, name, input, output, color, dimX, dimY) {
    this.title = title;
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
    super('Input', 'INPUT', [], ['A'], '#F2666F', 1, 1);

    this.colorOn = 'green';
  }
}

export class OutputElementSpec extends ElementSpec {
  constructor() {
    super('Output', 'OUTPUT', ['A'], [], '#F2666F', 1, 1);

    this.colorOn = 'green';
  }
}

export class GateElementSpec extends ElementSpec {
  constructor(title, name, input, output, color, truthTable, dimX, dimY) {
    super(title, name, input, output, color, dimX, dimY);

    this.truthTable = truthTable;
  }
}
