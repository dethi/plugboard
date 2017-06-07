export function evalutateBoard(board, prevState) {
  const newState = [...prevState];

  Object.keys(board.components).forEach(cKey => {
    const c = board.components[cKey];
    const inputState = Object.keys(c.input).reduce(
      (obj, key) => {
        obj[key] = prevState[c.input[key]];
        return obj;
      },
      {}
    );

    const outputState = evaluateComponent(board.specs[c.specKey], inputState);
    Object.keys(c.output).forEach(k => {
      const registery = c.output[k];
      registery.forEach(idx => {
        newState[idx] = outputState[k];
      });
    });
  });

  return newState;
}

function evaluateComponent(spec, inputState) {
  const values = spec.input.map(e => inputState[e]);

  let output = [];
  for (let i = 0; i < spec.truthTable.length; i++) {
    let j = 0;
    for (; j < values.length; j++) {
      if (spec.truthTable[i][j] !== values[j]) {
        break;
      }
    }

    if (j === values.length) {
      output = spec.truthTable[i].slice(j);
      break;
    }
  }

  const res = {};
  spec.output.forEach((e, i) => res[e] = output[i]);
  return res;
}
