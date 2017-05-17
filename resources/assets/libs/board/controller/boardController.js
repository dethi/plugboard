import EngineController from './engineController';

import { Board } from '../model/board';
import { BoardView } from '../view/boardView';

import { Element, arrayToLinkObject } from '../model/element';

import { GRID_SIZE_X, GRID_SIZE_Y } from '../constante';

export default class BoardController {
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

    this.engineController = new EngineController();
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

    this.engineController.setDirty()

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

    this.engineController.setDirty()
  }

  addLink(inputInfo, outputInfo) {
    this.board.elements[inputInfo[0]].output[inputInfo[1]].push(outputInfo);
    this.board.elements[outputInfo[0]].input[outputInfo[1]] = inputInfo;

    this.boardView.addLink(inputInfo, outputInfo);

    this.engineController.setDirty()
  }

  addInSpecs(spec) {
    this.board.specs[spec.name] = spec;
    this.engineController.setDirty()
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
    return this.engineController.exportForEngine(this.board);
  }

  exportEngineStates() {
    return this.engineController.exportEngineStates();
  }

  applyState(states) {
    this.engineController.applyState(this.boardView, states);
  }

  get(vector) {
    return this.space[vector.x + this.sizeX * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.sizeX * vector.y] = value;
  }
}