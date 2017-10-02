import EngineController from './engineController';
import GridController from './gridController';
import CursorController from './cursorController';
import BoardState from './boardState';

import { Board } from '../model/board';
import BoardView from '../view/boardView';

import { Element } from '../model/element';

import Vector from '../../utils/vector';

import { MOVE_SPEED } from '../constante';

import { generateTruthTable } from '../../../engine/engine';

export default class BoardController {
  constructor(canvasHolder, unSelectBlueprint) {
    this.canvasHolder = canvasHolder;
    this.unSelectBlueprint = unSelectBlueprint;

    this.boardView = new BoardView(this, this.canvasHolder);

    this.initNewBoard();
  }

  initNewBoard() {
    this.board = new Board();
    this.boardState = BoardState.NONE;

    // Id 0 for default input
    this.curId = 1;

    this.curMousePos = new Vector(0, 0);

    this.gridController = new GridController();
    this.engineController = new EngineController();
    this.cursorController = new CursorController(this.boardView);
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

      const newEl = this.addElement(
        new Vector(el.pos.x, el.pos.y),
        board.specs[el.specName],
        el.name,
        el.rotate
      );

      // Map new El id with old id (For delete element)
      idMapping[id] = newEl.id;
    });

    Object.keys(board.elements).forEach(id => {
      const el = board.elements[id];
      Object.keys(el.input).forEach(inputName => {
        const outputInfo = el.input[inputName]; // 0: Id -- 1: Name

        const inputLink = [idMapping[outputInfo[0]], outputInfo[1]];
        const outputLink = [idMapping[id], inputName];

        this.addLink(inputLink, outputLink);
      });
    });
    this.boardView.fabricCanvas.renderAll();
  }

  exportBoard() {
    return JSON.stringify(this.board);
  }

  getCurEl() {
    return this.gridController.get(this.curMousePos);
  }

  getCurElType() {
    const curElId = this.gridController.get(this.curMousePos);
    if (curElId == null) return -1;

    const curEl = this.board.elements[curElId];
    const curSpec = this.board.specs[curEl.specName];

    return curSpec.type;
  }

  onElementMove(oldPos, newPos) {
    const elId = this.gridController.get(oldPos);
    const el = this.board.elements[elId];

    if (!this.gridController.canMove(el, this.board.specs[el.specName], newPos))
      return false;

    el.pos = newPos;

    this.gridController.moveElement(el, this.board.specs[el.specName], oldPos);
    this.boardView.moveElement(elId, newPos);

    return true;
  }

  onMouseMove(pos) {
    if (pos.equals(this.curMousePos)) return;

    this.curMousePos = pos;
  }

  onClick(pos) {
    if (!this.selectedSpec || this.gridController.get(pos)) return;

    this.addElement(
      pos,
      this.selectedSpec,
      this.selectedSpec.title,
      this.rotate
    );

    this.unSelectBlueprint();
  }

  onDelete() {
    this.removeElement(this.getCurEl());
  }

  onRotate() {
    this.rotateElement(this.getCurEl());
  }

  onRename(newName) {
    this.renameElement(this.getCurEl(), newName);
  }

  onMove(dir) {
    switch (dir) {
      case 'up':
        this.boardView.onMove(new Vector(0, -1 * MOVE_SPEED));
        break;
      case 'down':
        this.boardView.onMove(new Vector(0, 1 * MOVE_SPEED));
        break;
      case 'left':
        this.boardView.onMove(new Vector(-1 * MOVE_SPEED, 0));
        break;
      case 'right':
        this.boardView.onMove(new Vector(1 * MOVE_SPEED, 0));
        break;
      case 'center':
        this.boardView.resetPosBoard();
        break;
      default:
        break;
    }
  }

  onUpdateSelectedBlueprint(blueprint) {
    this.selectedSpec = blueprint;

    if (blueprint) {
      this.boardState = BoardState.ADDING;
      this.rotate = 0;
      this.updateCursor();
    } else {
      this.boardView.unSetCursor();
      this.boardState = BoardState.NONE;
    }
  }

  onStartLink() {
    this.boardState = BoardState.LINKING;
  }

  onFinishLink(inputInfo, outputInfo) {
    this.boardState = BoardState.NONE;
    this.addLink(inputInfo, outputInfo);
  }

  onFinishLinkFail() {
    this.boardState = BoardState.NONE;
  }

  addElement(pos, spec, name, rotate) {
    const newElId = this.curId++;
    const newEl = new Element(newElId, name, pos, spec, rotate);

    this.board.elements[newElId] = newEl;
    this.boardView.addElement(pos, newEl, spec);

    this.gridController.setElement(newEl, spec);

    if (this.board.specs[spec.name] === undefined) this.addInSpecs(spec);

    this.engineController.setDirty();

    return newEl;
  }

  removeElement(elId) {
    const el = this.board.elements[elId];

    this.gridController.freeEl(el, this.board.specs[el.specName]);

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

    this.engineController.setDirty();
  }

  rotateElement(elId) {
    const el = this.board.elements[elId];
    el.rotate += 1;
    el.rotate %= 4;

    this.boardView.rotateElement(elId);
  }

  renameElement(elId, newName) {
    const el = this.board.elements[elId];
    el.name = newName;

    this.boardView.renameElement(elId, newName);
  }

  updateCursor(resetPos = true) {
    if (this.selectedSpec) {
      this.boardView.unSetCursor();
      this.cursorController
        .getCursor(this.selectedSpec, this.rotate)
        .then(cursor => this.boardView.setCursor(cursor, resetPos));
    }
  }

  addLink(inputInfo, outputInfo) {
    const inputEl = this.board.elements[inputInfo[0]];
    const outputEl = this.board.elements[outputInfo[0]];

    inputEl.output[inputInfo[1]].push(outputInfo);
    outputEl.input[outputInfo[1]] = inputInfo;

    this.boardView.addLink(inputInfo, outputInfo);

    this.engineController.setDirty();
  }

  addInSpecs(spec) {
    this.board.specs[spec.name] = spec;
    this.engineController.setDirty();
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

  exportSpec() {
    const spec = {};

    // Copy board representation
    const board = JSON.parse(
      JSON.stringify(this.engineController.exportForEngine(this.board))
    );

    // Check that all input are connect
    let empty = true;
    Object.keys(board.components).forEach(componentId => {
      empty = false;
      Object.keys(board.components[componentId].input).forEach(inputName => {
        if (board.components[componentId].input[inputName] === 0) {
          spec.err = 'Some input are not connect';
        }
      });
    });
    if (empty) spec.err = 'The board need at least one gate';

    if (spec.err !== undefined) return spec;

    // Delete Default input and move registery
    delete board.input['0'];
    board.nextRegistery--;
    Object.keys(board.components).forEach(componentId => {
      const component = board.components[componentId];
      Object.keys(component.input).forEach(inputName => {
        component.input[inputName]--;
      });
      Object.keys(component.output).forEach(outputName => {
        component.output[outputName].forEach(
          (_, index) => component.output[outputName][index]--
        );
      });
      board.components[componentId] = component;
    });
    Object.keys(board.input).forEach(inputId => board.input[inputId]--);
    Object.keys(board.output).forEach(outputId => board.output[outputId]--);

    // Generate Spec
    spec.truthTable = generateTruthTable(board);
    spec.dimX = 1;
    spec.dimY = 1;
    spec.input = [];
    let curChar = 'A';
    Object.keys(board.input).forEach(() => {
      spec.input.push(curChar);
      curChar = String.fromCharCode(curChar.charCodeAt(0) + 1);
    });
    spec.output = [];
    Object.keys(board.output).forEach(() => {
      spec.output.push(curChar);
      curChar = String.fromCharCode(curChar.charCodeAt(0) + 1);
    });

    return spec;
  }

  applyState(states) {
    this.engineController.applyState(this.boardView, states);
  }

  toPng() {
    return this.boardView.toPng();
  }
}
