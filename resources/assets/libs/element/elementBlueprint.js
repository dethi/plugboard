const ElementType = {
  INPUT: 0,
  OUTPUT: 1,
  GATE: 2
};

class ElementBlueprint {
  constructor(elementType, nbInput, nbOutput, colorOn, colorOff) {
    this.elementType = elementType;
    this.colorOn = colorOn;
    this.colorOff = colorOff;
    this.nbInput = nbInput;
    this.nbOutput = nbOutput;
  }

  static createInputBlueprint() {
    return new ElementBlueprint(ElementType.INPUT, 0, 1, 'green', 'red');
  }

  static createOutputBlueprint() {
    return new ElementBlueprint(ElementType.OUTPUT, 1, 0, 'green', 'red');
  }

  static createDefaultGateBlueprint() {
    return new ElementBlueprint(ElementType.GATE, 2, 1, 'green', 'blue');
  }
}

export { ElementType, ElementBlueprint };
