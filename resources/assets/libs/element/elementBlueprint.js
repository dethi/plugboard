const ElementType = {
  INPUT: 0,
  OUTPUT: 1,
  GATE: 2
};

class ElementBlueprint {
  constructor(elementType, nbInput, nbOutput, color) {
    this.elementType = elementType;
    this.color = color;
    this.nbInput = nbInput;
    this.nbOutput = nbOutput;
  }

  static createInputBlueprint() {
    return new ElementBlueprint(ElementType.INPUT, 0, 1, 'green');
  }

  static createOutputBlueprint() {
    return new ElementBlueprint(ElementType.OUTPUT, 1, 0, 'blue');
  }

  static createDefaultGateBlueprint() {
    return new ElementBlueprint(ElementType.GATE, 2, 1, 'red');
  }
}

export { ElementType, ElementBlueprint };
