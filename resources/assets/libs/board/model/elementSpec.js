export class ElementSpec {
  constructor(
    title,
    name,
    input,
    output,
    color,
    colorOn,
    truthTable,
    dimX,
    dimY,
    preview
  ) {
    this.title = title;
    this.name = name;

    this.input = input;
    this.output = output;

    this.color = color;
    this.colorOn = colorOn;

    this.truthTable = truthTable;

    this.dimX = dimX;
    this.dimY = dimY;

    this.preview = preview;
  }
}
