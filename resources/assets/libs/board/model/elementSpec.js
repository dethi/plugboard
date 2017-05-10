export class ElementSpec {
  constructor(name, input, output, img) {
    this.name = name;

    this.input = input;
    this.output = output;
    this.img = img;
  }
}

export class InputElementSpec extends ElementSpec {
  constructor() {
    super('INPUT', [], ['A'], 'Input');

    this.imgOn = 'InputOn';
  }
}

export class OutputElementSpec extends ElementSpec {
  constructor() {
    super('OUTPUT', ['A'], [], 'Output');

    this.imgOn = 'OutputOn';
  }
}

export class GateElementSpec extends ElementSpec {
  constructor(name, input, output, img, truthTable) {
    super(name, input, output, img);

    this.truthTable = truthTable;
  }
}
