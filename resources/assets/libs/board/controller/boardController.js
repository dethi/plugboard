import { Board } from '../model/board';
import { BoardView } from '../view/boardView';

import { Element, arrayToLinkObject } from '../model/element';

import { GRID_SIZE_X, GRID_SIZE_Y } from '../constante';

export class BoardController {
  constructor(canvasHolder, getSelectedSpec) {
    this.canvasHolder = canvasHolder;
    this.getSelectedSpec = getSelectedSpec;

    this.sizeX = GRID_SIZE_X;
    this.sizeY = GRID_SIZE_Y;

    this.boardView = new BoardView(
      this.sizeX,
      this.sizeY,
      this,
      this.canvasHolder
    );

    this.initNewBoard();
  }

  initNewBoard() {
    this.board = new Board();
    this.space = new Array(this.sizeX * this.sizeY).fill(null);

    // Id 0 for default input
    this.curId = 1;

    this.registeryRep = {};
    this.engineRepresentation = {};
    this.engineRepresentationDirty = false;
  }

  clearBoard() {
    this.boardView.clear();
    this.initNewBoard();
  }

  loadFromBoard(board) {
    this.clearBoard();

    const idMapping = {};

    // Add Elements
    Object.keys(board.elements).forEach(id => {
      const el = board.elements[id];
      const newEl = this.addElement(el.pos, board.specs[el.spec.name]);

      idMapping[id] = newEl.id;
    });

    // Add Link
    Object.keys(board.elements).forEach(id => {
      const el = board.elements[id];
      Object.keys(el.input).forEach(inputName => {
        const outputInfo = el.input[inputName];
        this.addLink(outputInfo, [idMapping[id], inputName]);
      });
    });
  }

  onElementMove(oldPos, newPos) {
    const elId = this.get(oldPos);

    this.board.elements[elId].pos = newPos;

    this.set(oldPos, null);
    this.set(newPos, elId);

    this.boardView.moveElement(elId, newPos);
  }

  onClick(pos) {
    if (this.get(pos) !== null) return;

    const selectedSpec = this.getSelectedSpec();

    if (selectedSpec === null) return;

    this.addElement(pos, selectedSpec);
  }

  onDelete() {
    const select = this.boardView.fabricCanvas.getActiveObject();
    if (select !== undefined && select !== null) {
      this.removeElement(select.id);
    } else {
      this.clearBoard();
    }
  }

  addElement(pos, spec) {
    const newElId = this.curId++;
    const newEl = new Element(newElId, pos, spec);

    this.board.elements[newElId] = newEl;
    this.boardView.addElement(pos, newEl);

    this.set(pos, newElId);

    if (this.board.specs[spec.name] === undefined) this.addInSpecs(spec);

    this.engineRepresentationDirty = true;

    return newEl;
  }

  removeElement(elId) {
    const el = this.board.elements[elId];

    this.set(el.pos, null);

    // Unlink Output
    Object.keys(el.output).forEach(outputName => {
      el.output[outputName].forEach(outputInfo => {
        this.board.elements[outputInfo[0]].input[outputInfo[1]] = null;
      });
    });

    // Unlink Input
    Object.keys(el.input).forEach(inputName => {
      const inputInfo = el.input[inputName];
      if (inputInfo === null) return;
      const srcEl = this.board.elements[inputInfo[0]];
      srcEl.output[inputInfo[1]] = srcEl.output[inputInfo[1]].filter(el => {
        return el[0] !== elId;
      });
    });

    delete this.board.elements[elId];

    this.boardView.removeElement(elId);

    this.engineRepresentationDirty = true;
  }

  addLink(inputInfo, outputInfo) {
    this.board.elements[inputInfo[0]].output[inputInfo[1]].push(outputInfo);
    this.board.elements[outputInfo[0]].input[outputInfo[1]] = inputInfo;

    this.boardView.addLink(inputInfo, outputInfo);

    this.engineRepresentationDirty = true;
  }

  addInSpecs(spec) {
    this.board.specs[spec.name] = spec;
    this.engineRepresentationDirty = true;
  }

  setInput(id, state) {
    const inputEl = this.board.elements[id];
    Object.keys(inputEl.output).forEach(outputName => {
      inputEl.output[outputName].forEach(outputInfo => {
        this.board.elements[outputInfo[0]].inputState[outputInfo[1]] = state;
      });
    });
  }

  exportForEngine() {
    if (this.engineRepresentationDirty) this.generateRepresentation(this.board);

    return this.engineRepresentation;
  }

  generateRepresentation(board) {
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
    Object.keys(board.elements).forEach(key => {
      const el = board.elements[key];
      const elName = el.spec.name.split('_');

      switch (elName[0]) {
        case 'INPUT':
          boardRep.input[el.id] = 0;
          break;
        case 'OUTPUT':
          boardRep.output[el.id] = 0;
          break;
        case 'GATE':
          boardRep.components[el.id] = {
            specKey: el.spec.name,
            input: arrayToLinkObject(el.spec.input, () => null),
            output: arrayToLinkObject(el.spec.output, () => [])
          };
          break;
        default:
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
      const realEl = board.elements[key];

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
      const realEl = board.elements[key];

      Object.keys(realEl.output).forEach(outputName => {
        const outputs = realEl.output[outputName];
        outputs.forEach(outputInfo => {
          rep.output[outputName].push(
            this.registeryRep[outputInfo[0]][outputInfo[1]]
          );
        });
      });
    });

    boardRep.specs = board.specs;
    boardRep.nextRegistery = curRegistery;

    this.engineRepresentation = boardRep;
  }

  createEngineStates() {
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

  applyState(states) {
    Object.keys(this.engineRepresentation.components).forEach(id => {
      const realEl = this.board.elements[id];
      Object.keys(realEl.input).forEach(inputName => {
        const newState = states[this.registeryRep[id][inputName]];
        realEl.inputState[inputName] = newState;
        this.boardView.setOn(id, inputName, newState);
      });
    });

    // Ugly
    Object.keys(this.engineRepresentation.output).forEach(id => {
      const newState = states[this.registeryRep[id]['A']];
      this.boardView.setOn(id, 'A', newState);
      this.boardView.elecElements[id].setOn(newState === 1);
    });
  }

  get(vector) {
    return this.space[vector.x + this.sizeX * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.sizeX * vector.y] = value;
  }
}
