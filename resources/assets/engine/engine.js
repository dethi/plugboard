function evalutateBoard(board, prevState) {
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

function evalutateBoardFinal(board, prevState) {
  let newState = prevState;
  //let i = 0;
  do {
    //console.log(i++);
    prevState = newState;
    newState = evalutateBoard(board, prevState);
    //console.log(newState);
  } while (!arrayEquals(newState, prevState));
  return newState;
}

function arrayEquals(a, b) {
  return a.length === b.length &&
    a.every(function(e, idx) {
      return e === b[idx];
    });
}

function combinations(n) {
  var r = [];
  for (var i = 0; i < 1 << n; i++) {
    var c = [];
    for (var j = 0; j < n; j++) {
      c.push(i & 1 << j ? 1 : 0);
    }
    r.push(c);
  }
  return r;
}

function makeState(board) {
  return new Array(board.nextRegistery).fill(0);
}

function setInput(state, inputState) {
  for (let i = 0; i < inputState.length; i++) {
    state[i] = inputState[i];
  }
  return state;
}

function generateTruthTable(board) {
  const inputStates = combinations(Object.keys(board.input).length);

  return inputStates.reduce(
    (states, inputState) => {
      const curState = makeState(board);
      setInput(curState, inputState);

      //console.log(curState);
      const newState = evalutateBoardFinal(board, curState);
      //console.log(newState);
      //console.log('---');
      states.push(
        newState.slice(
          0,
          Object.keys(board.input).length + Object.keys(board.output).length
        )
      );
      return states;
    },
    []
  );
}

export { evalutateBoard, generateTruthTable };
