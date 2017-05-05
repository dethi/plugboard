import { InputElement, OutputElement, GateElement } from './elements';

import NotImg from '../../../media/components/not.png';
import AndImg from '../../../media/components/and.png';
import OrImg from '../../../media/components/or.png';

export function createSimplePalette() {
  const palette = [];

  palette.push(new InputElement());
  palette.push(new OutputElement());

  palette.push(new GateElement('Not', ['A'], ['B'], NotImg, [[0, 1], [1, 0]]));

  palette.push(
    new GateElement('And', ['A', 'B'], ['C'], AndImg, [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ])
  );

  palette.push(
    new GateElement('Or', ['A', 'B'], ['C'], OrImg, [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ])
  );

  return palette;
}
