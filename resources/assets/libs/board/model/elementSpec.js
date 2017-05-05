import InputImg from '../../../../media/components/input.png';
import OutputImg from '../../../../media/components/output.png';

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
    super('Input', [], ['A'], InputImg);
  }
}

export class OutputElementSpec extends ElementSpec {
  constructor() {
    super('Output', ['A'], [], OutputImg);
  }
}

export class GateElementSpec extends ElementSpec {
  constructor(name, input, output, img, truthTable) {
    super(name, input, output, img);

    this.truthTable = truthTable;
  }
}
