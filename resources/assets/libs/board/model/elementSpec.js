import InputImg from '../../../../media/components/input.png';
import InputImgOn from '../../../../media/components/inputOn.png';
import OutputImg from '../../../../media/components/output.png';
import OutputImgOn from '../../../../media/components/outputOn.png';

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
    super('INPUT', [], ['A'], InputImg);

    this.imgOn = InputImgOn;
  }
}

export class OutputElementSpec extends ElementSpec {
  constructor() {
    super('OUTPUT', ['A'], [], OutputImg);

    this.imgOn = OutputImgOn;
  }
}

export class GateElementSpec extends ElementSpec {
  constructor(name, input, output, img, truthTable) {
    super(name, input, output, img);

    this.truthTable = truthTable;
  }
}
