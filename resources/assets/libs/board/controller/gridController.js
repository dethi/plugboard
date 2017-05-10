import { Grid } from '../model/grid';
import { GridView } from '../view/gridView';

import { Element, arrayToLinkObject } from '../model/element';

import { GRID_SIZE_X, GRID_SIZE_Y } from '../constante';

export class GridController {
  constructor(canvasHolder, getSelectedSpec) {
    this.canvasHolder = canvasHolder;
    this.getSelectedSpec = getSelectedSpec;

    this.sizeX = GRID_SIZE_X;
    this.sizeY = GRID_SIZE_Y;

    this.gridView = new GridView(
      this.sizeX,
      this.sizeY,
      this,
      this.canvasHolder
    );

    this.initNewGrid();
  }

  initNewGrid() {
    this.grid = new Grid();
    this.space = new Array(this.sizeX * this.sizeY).fill(null);

    // Id 0 for default input
    this.curId = 1;

    this.registeryRep = {};
    this.engineRepresentation = {};
    this.engineRepresentationDirty = false;
  }

  clearGrid() {
    this.gridView.clear();
    this.initNewGrid();
  }

  loadFromGrid(grid) {
    this.clearGrid();

    const idMapping = {};

    // Add Elements
    Object.keys(grid.elements).forEach(id => {
      const el = grid.elements[id];
      const newEl = this.addElement(el.pos, grid.specs[el.spec.name]);

      idMapping[id] = newEl.id;
    });

    // Add Link
    Object.keys(grid.elements).forEach(id => {
      const el = grid.elements[id];
      Object.keys(el.input).forEach(inputName => {
        const outputInfo = el.input[inputName];
        this.addLink(outputInfo, [idMapping[id], inputName]);
      });
    });
  }

  onElementMove(oldPos, newPos) {
    const elId = this.get(oldPos);

    this.grid.elements[elId].pos = newPos;

    this.set(oldPos, null);
    this.set(newPos, elId);

    this.gridView.moveElement(elId, newPos);
  }

  onClick(pos) {
    if (this.get(pos) !== null) return;

    const selectedSpec = this.getSelectedSpec();

    if (selectedSpec === null) return;

    this.addElement(pos, selectedSpec);
  }

  onDelete() {
    const select = this.gridView.fabricCanvas.getActiveObject();
    if (select !== undefined && select !== null) {
      this.removeElement(select.id);
    } else {
      this.clearGrid();
    }
  }

  addElement(pos, spec) {
    const newElId = this.curId++;
    const newEl = new Element(newElId, pos, spec);

    this.grid.elements[newElId] = newEl;
    this.gridView.addElement(pos, newEl);

    this.set(pos, newElId);

    if (this.grid.specs[spec.name] === undefined) this.addInSpecs(spec);

    this.engineRepresentationDirty = true;

    return newEl;
  }

  removeElement(elId) {
    const el = this.grid.elements[elId];

    this.set(el.pos, null);

    // Unlink Output
    Object.keys(el.output).forEach(outputName => {
      el.output[outputName].forEach(outputInfo => {
        this.grid.elements[outputInfo[0]].input[outputInfo[1]] = null;
      });
    });

    // Unlink Input
    Object.keys(el.input).forEach(inputName => {
      const inputInfo = el.input[inputName];
      if (inputInfo === null) return;
      const srcEl = this.grid.elements[inputInfo[0]];
      srcEl.output[inputInfo[1]] = srcEl.output[inputInfo[1]].filter(el => {
        return el[0] !== elId;
      });
    });

    delete this.grid.elements[elId];

    this.gridView.removeElement(elId);

    this.engineRepresentationDirty = true;
  }

  addLink(inputInfo, outputInfo) {
    this.grid.elements[inputInfo[0]].output[inputInfo[1]].push(outputInfo);
    this.grid.elements[outputInfo[0]].input[outputInfo[1]] = inputInfo;

    this.gridView.addLink(inputInfo, outputInfo);

    this.engineRepresentationDirty = true;
  }

  addInSpecs(spec) {
    this.grid.specs[spec.name] = spec;
    this.engineRepresentationDirty = true;
  }

  setInput(id, state) {
    const inputEl = this.grid.elements[id];
    Object.keys(inputEl.output).forEach(outputName => {
      inputEl.output[outputName].forEach(outputInfo => {
        this.grid.elements[outputInfo[0]].inputState[outputInfo[1]] = state;
      });
    });
  }

  exportForEngine() {
    if (this.engineRepresentationDirty) this.generateRepresentation(this.grid);

    return this.engineRepresentation;
  }

  generateRepresentation(grid) {
    this.engineRepresentationDirty = false;

    const board = {
      input: {},
      output: {},
      components: {}
    };

    this.registeryRep = {};

    // Create Default INPUT
    board.input[0] = 0;

    // Representation Construction
    Object.keys(grid.elements).forEach(key => {
      const el = grid.elements[key];
      const elName = el.spec.name.split('_');

      switch (elName[0]) {
        case 'INPUT':
          board.input[el.id] = 0;
          break;
        case 'OUTPUT':
          board.output[el.id] = 0;
          break;
        case 'GATE':
          board.components[el.id] = {
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
    Object.keys(board.input).forEach(key => {
      this.registeryRep[key] = curRegistery;
      board.input[key] = curRegistery++;
    });

    Object.keys(board.output).forEach(key => {
      // Ulgy handle, find the real name or fond a solution when linking
      this.registeryRep[key] = {};
      this.registeryRep[key]['A'] = curRegistery;
      board.output[key] = curRegistery++;
    });

    Object.keys(board.components).forEach(key => {
      const rep = board.components[key];
      const realEl = grid.elements[key];

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
    Object.keys(board.components).forEach(key => {
      const rep = board.components[key];
      const realEl = grid.elements[key];

      Object.keys(realEl.output).forEach(outputName => {
        const outputs = realEl.output[outputName];
        outputs.forEach(outputInfo => {
          rep.output[outputName].push(
            this.registeryRep[outputInfo[0]][outputInfo[1]]
          );
        });
      });
    });

    board.specs = grid.specs;
    board.nextRegistery = curRegistery;

    this.engineRepresentation = board;
  }

  createEngineStates() {
    if (this.engineRepresentationDirty) this.generateRepresentation(this.grid);

    const states = new Array(this.engineRepresentation.nextRegistery).fill(0);

    Object.keys(this.engineRepresentation.components).forEach(key => {
      const realEl = this.grid.elements[key];
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
      const realEl = this.grid.elements[id];
      Object.keys(realEl.input).forEach(inputName => {
        const newState = states[this.registeryRep[id][inputName]];
        realEl.inputState[inputName] = newState;
        this.gridView.setOn(id, inputName, newState);
      });
    });

    // Ugly
    Object.keys(this.engineRepresentation.output).forEach(id => {
      const newState = states[this.registeryRep[id]['A']];
      this.gridView.setOn(id, 'A', newState);
      this.gridView.elecElements[id].setOn(newState === 1);
    });
  }

  get(vector) {
    return this.space[vector.x + this.sizeX * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.sizeX * vector.y] = value;
  }
}
