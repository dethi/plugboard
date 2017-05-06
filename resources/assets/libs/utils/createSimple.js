import {
  InputElementSpec,
  OutputElementSpec,
  GateElementSpec
} from '../board/model/elementSpec';

import NotImg from '../../../media/components/not.png';
import AndImg from '../../../media/components/and.png';
import OrImg from '../../../media/components/or.png';

export function createSimplePalette() {
  const palette = [];

  palette.push(new InputElementSpec());
  palette.push(new OutputElementSpec());

  palette.push(
    new GateElementSpec('GATE_NOT', ['A'], ['B'], NotImg, [[0, 1], [1, 0]])
  );

  palette.push(
    new GateElementSpec('GATE_AND', ['A', 'B'], ['C'], AndImg, [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ])
  );

  palette.push(
    new GateElementSpec('GATE_OR', ['A', 'B'], ['C'], OrImg, [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ])
  );

  return palette;
}
