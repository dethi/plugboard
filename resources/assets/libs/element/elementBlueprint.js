const ElementType = {
  INPUT: 0,
  OUTPUT: 1,
  GATE: 2
};

const GateType = {
  NONE: 0,
  AND: 'AND',
  OR: 'OR',
  NOR: 'NOR',
  NOT: 'NOT',
  NXOR: 'NXOR',
  XOR: 'XOR'
};

class ElementBlueprint {
  constructor(
    name,
    elementType,
    gateType,
    nbInput,
    nbOutput,
    colorOn,
    colorOff,
    img,
    truthTable
  ) {
    this.name = name;
    this.elementType = elementType;
    this.gateType = gateType;
    this.nbInput = nbInput;
    this.nbOutput = nbOutput;
    this.colorOn = colorOn;
    this.colorOff = colorOff;
    this.img = img;
    this.truthTable = truthTable;
  }

  static createInputBlueprint() {
    return new ElementBlueprint(
      'input',
      ElementType.INPUT,
      GateType.NONE,
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
      GateType.NONE,
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
      ElementType.GATE,
      2,
      1,
      'green',
      'blue',
      '/static/components/and.png'
    );
  }

  static createGateBlueprint(name, gateType, nbInput = 2) {
    return new ElementBlueprint(
      name,
      ElementType.GATE,
      gateType,
      nbInput,
      1,
      'green',
      'blue',
      '/static/components/' + name + '.png'
    );
  }
}

export { ElementType, GateType, ElementBlueprint };
