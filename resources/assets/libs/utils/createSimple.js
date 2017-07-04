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
    new GateElementSpec('GATE_NOT', ['A'], ['B'], 'red', [[0, 1], [1, 0]])
  );

  palette.push(
    new GateElementSpec('GATE_AND', ['A', 'B'], ['C'], 'red', [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ])
  );

  palette.push(
    new GateElementSpec('GATE_OR', ['A', 'B'], ['C'], 'red', [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ])
  );

  palette.push(
    new GateElementSpec('GATE_XOR', ['A', 'B'], ['C'], 'red', [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ])
  );

  return palette;
}
