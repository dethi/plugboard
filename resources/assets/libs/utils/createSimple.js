import {
  InputElementSpec,
  OutputElementSpec,
  GateElementSpec
} from '../board/model/elementSpec';

import { Grid } from '../board/model/grid';

import NotImg from '../../../media/components/not.png';
import AndImg from '../../../media/components/and.png';
import OrImg from '../../../media/components/or.png';

import { Vector } from './vector';

export function createSimplePalette() {
  const palette = [];

  palette.push(new InputElementSpec());
  palette.push(new OutputElementSpec());

  palette.push(
    new GateElementSpec('Not', ['A'], ['B'], NotImg, [[0, 1], [1, 0]])
  );

  palette.push(
    new GateElementSpec('And', ['A', 'B'], ['C'], AndImg, [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ])
  );

  palette.push(
    new GateElementSpec('Or', ['A', 'B'], ['C'], OrImg, [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ])
  );

  return palette;
}

export function createSimpleBoard(elements) {
  const grid = new Grid(10, 10);
  const pos = new Vector(2, 2);
  const pos1 = new Vector(2, 3);
  grid.addElement(pos, elements[2]);
  grid.addElement(pos1, elements[3]);
  return grid;
}
