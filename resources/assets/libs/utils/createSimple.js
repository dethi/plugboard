import {
  InputElementSpec,
  OutputElementSpec,
  GateElementSpec
} from '../board/model/elementSpec';

export function createSimplePalette() {
  const palette = [];

  palette.push(new InputElementSpec());
  palette.push(new OutputElementSpec());

  palette.push(
    new GateElementSpec(
      'Not',
      'GATE_NOT',
      ['A'],
      ['B'],
      '#1A936F',
      [[0, 1], [1, 0]],
      1,
      1
    )
  );

  palette.push(
    new GateElementSpec(
      'And',
      'GATE_AND',
      ['A', 'B'],
      ['C'],
      '#1A936F',
      [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]],
      2,
      2
    )
  );

  palette.push(
    new GateElementSpec(
      'Or',
      'GATE_OR',
      ['A', 'B'],
      ['C'],
      '#1A936F',
      [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]],
      2,
      2
    )
  );

  palette.push(
    new GateElementSpec(
      'Multiplexeur 2-1',
      'MULTIPLEXEUR_2-1',
      ['A', 'B', 'C'],
      ['D'],
      '#88D498',
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 1],
        [0, 1, 1, 0],
        [1, 0, 0, 0],
        [1, 0, 1, 1],
        [1, 1, 0, 1],
        [1, 1, 1, 1]
      ],
      2,
      3
    )
  );

  return palette;
}
