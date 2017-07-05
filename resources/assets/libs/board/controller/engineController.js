import { arrayToLinkObject } from '../model/element';

export default class EngineController {
  constructor() {
    this.registeryRep = {};
    this.engineRepresentation = {};
    this.engineRepresentationDirty = true;

    this.board = null;
  }

  exportForEngine(board) {
    if (this.engineRepresentationDirty) {
      this.board = board;
      this.generateRepresentation();
    }

    return this.engineRepresentation;
  }

  generateRepresentation() {
    this.engineRepresentationDirty = false;

    const boardRep = {
      input: {},
      output: {},
      components: {}
    };

    this.registeryRep = {};

    // Create Default INPUT
    boardRep.input[0] = 0;

    // Representation Construction
    Object.keys(this.board.elements).forEach(key => {
      const el = this.board.elements[key];
      const elName = el.specName.split('_');

      switch (elName[0]) {
        case 'INPUT':
          boardRep.input[el.id] = 0;
          break;
        case 'OUTPUT':
          boardRep.output[el.id] = 0;
          break;
        case 'GATE':
        default:
          const spec = this.board.specs[el.specName];
          boardRep.components[el.id] = {
            specKey: el.specName,
            input: arrayToLinkObject(spec.input, () => null),
            output: arrayToLinkObject(spec.output, () => [])
          };
          break;
      }
    });

    let curRegistery = 0;
    // Creation Registery
    Object.keys(boardRep.input).forEach(key => {
      this.registeryRep[key] = curRegistery;
      boardRep.input[key] = curRegistery++;
    });

    Object.keys(boardRep.output).forEach(key => {
      // Ulgy handle, find the real name or fond a solution when linking
      this.registeryRep[key] = {};
      this.registeryRep[key]['A'] = curRegistery;
      boardRep.output[key] = curRegistery++;
    });

    Object.keys(boardRep.components).forEach(key => {
      const rep = boardRep.components[key];
      const realEl = this.board.elements[key];

      this.registeryRep[key] = {};
      Object.keys(realEl.input).forEach(inputName => {
        // Handle DefaultInput
        let inputReg = 0;
        if (realEl.input[inputName] !== null) {
          inputReg = this.registeryRep[realEl.input[inputName][0]];
          if (inputReg === undefined || inputReg instanceof Object) {
            inputReg = curRegistery++;
          }
        }
        this.registeryRep[key][inputName] = inputReg;
        rep.input[inputName] = inputReg;
      });
    });

    // Link output
    Object.keys(boardRep.components).forEach(key => {
      const rep = boardRep.components[key];
      const realEl = this.board.elements[key];

      Object.keys(realEl.output).forEach(outputName => {
        const outputs = realEl.output[outputName];
        outputs.forEach(outputInfo => {
          rep.output[outputName].push(
            this.registeryRep[outputInfo[0]][outputInfo[1]]
          );
        });
      });
    });

    boardRep.specs = this.board.specs;
    boardRep.nextRegistery = curRegistery;

    this.engineRepresentation = boardRep;
  }

  exportEngineStates() {
    if (this.engineRepresentationDirty) this.generateRepresentation(this.board);

    const states = new Array(this.engineRepresentation.nextRegistery).fill(0);

    Object.keys(this.engineRepresentation.components).forEach(key => {
      const realEl = this.board.elements[key];
      Object.keys(realEl.input).forEach(inputName => {
        states[this.registeryRep[key][inputName]] = realEl.inputState[
          inputName
        ];
      });
    });

    return states;
  }

  applyState(boardView, states) {
    Object.keys(this.engineRepresentation.components).forEach(id => {
      const realEl = this.board.elements[id];
      Object.keys(realEl.input).forEach(inputName => {
        const newState = states[this.registeryRep[id][inputName]];
        realEl.inputState[inputName] = newState;
        boardView.setOn(id, inputName, newState);
      });
    });

    // Ugly
    Object.keys(this.engineRepresentation.output).forEach(id => {
      const newState = states[this.registeryRep[id]['A']];
      boardView.setOn(id, 'A', newState);
      boardView.elecElements[id].setOn(newState === 1);
    });
  }

  setDirty() {
    this.engineRepresentationDirty = true;
  }
}
