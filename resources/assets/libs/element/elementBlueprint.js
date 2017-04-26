const ElementType = {
  INPUT: 0,
  OUTPUT: 1,
  GATE: 2
};

class ElementBlueprint {
  constructor(
    name,
    elementType,
    nbInput,
    nbOutput,
    colorOn,
    colorOff,
    img,
    truthTable
  ) {
    this.name = name;
    this.elementType = elementType;
    this.colorOn = colorOn;
    this.colorOff = colorOff;
    this.nbInput = nbInput;
    this.nbOutput = nbOutput;
    this.img = img;
    this.truthTable = truthTable;
  }

  static createInputBlueprint() {
    return new ElementBlueprint(
      'input',
      ElementType.INPUT,
      0,
      1,
      'green',
      'red',
      '/static/components/input.png'
    );
  }

  static createOutputBlueprint() {
    return new ElementBlueprint(
      'output',
      ElementType.OUTPUT,
      1,
      0,
      'green',
      'red',
      '/static/components/output.png'
    );
  }

  static createDefaultGateBlueprint() {
    return new ElementBlueprint(
      'and',
      ElementType.GATE,
      2,
      1,
      'green',
      'blue',
      '/static/components/and.png'
    );
  }

  static createOrGateBlueprint() {
    return new ElementBlueprint(
      'or',
      ElementType.GATE,
      2,
      1,
      'green',
      'blue',
      '/static/components/or.png'
    );
  }
}

export { ElementType, ElementBlueprint };
