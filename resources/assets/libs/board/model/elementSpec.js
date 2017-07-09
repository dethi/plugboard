export class ElementSpec {
  constructor(title, name, input, output, color, colorOn, truthTable, dimX, dimY) {
    this.title = title;
    this.name = name;

    this.input = input;
    this.output = output;

    this.color = color;
    this.colorOn = colorOn;

    this.dimX = dimX;
    this.dimY = dimY;

    this.truthTable = truthTable;
  }
}
