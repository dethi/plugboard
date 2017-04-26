// STATES = [ ...INPUT, ...OUTPUT, ...OTHERS REGISTERY ]

const SPECS = {
  AND: {
    input: ['A', 'B'],
    output: ['C'],
    truthTable: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]
  },
  OR: {
    input: ['A', 'B'],
    output: ['C'],
    truthTable: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]]
  },
  NOR: {
    input: ['A', 'B'],
    output: ['C'],
    truthTable: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 0]]
  },
  XOR: {
    input: ['A', 'B'],
    output: ['C'],
    truthTable: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]]
  }
};

// (i1, i2) => AND => o2
/**const BOARD = {
  nextRegistery: 3,
  input: {
    i1: 0,
    i2: 1
  },
  output: {
    o1: 2
  },
  components: {
    c1: {
      specKey: 'AND',
      input: {
        A: 0,
        B: 1
      },
      output: {
        C: [2]
      }
    }
  },
  specs: SPECS
};

// OR from NOR
const BOARD1 = {
  nextRegistery: 4,
  input: {
    i1: 0,
    i2: 1
  },
  output: {
    o1: 2
  },
  components: {
    c1: {
      specKey: 'NOR',
      input: {
        A: 0,
        B: 1
      },
      output: {
        C: [3]
      }
    },
    c2: {
      specKey: 'NOR',
      input: {
        A: 3,
        B: 3
      },
      output: {
        C: [2]
      }
    }
  },
  specs: SPECS
};**/

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

// ULGY, Only for test
export { SPECS, evalutateBoardFinal };

/**
console.log('AND');
console.log(evaluateComponent(BOARD.specs.AND, { A: 0, B: 0 }));
console.log(evaluateComponent(BOARD.specs.AND, { A: 0, B: 1 }));
console.log(evaluateComponent(BOARD.specs.AND, { A: 1, B: 0 }));
console.log(evaluateComponent(BOARD.specs.AND, { A: 1, B: 1 }));

console.log('OR');
console.log(evaluateComponent(BOARD.specs.OR, { A: 0, B: 0 }));
console.log(evaluateComponent(BOARD.specs.OR, { A: 0, B: 1 }));
console.log(evaluateComponent(BOARD.specs.OR, { A: 1, B: 0 }));
console.log(evaluateComponent(BOARD.specs.OR, { A: 1, B: 1 }));

console.log('BOARD: [0, 0, 0]');
console.log(evalutateBoard(BOARD, [0, 0, 0]));
console.log('BOARD: [1, 0, 0]');
console.log(evalutateBoard(BOARD, [1, 0, 0]));
console.log('BOARD: [0, 1, 0]');
console.log(evalutateBoard(BOARD, [0, 1, 0]));
console.log('BOARD: [1, 1, 0]');
console.log(evalutateBoard(BOARD, [1, 1, 0]));
console.log('BOARD: [1, 1, 1]');
console.log(evalutateBoard(BOARD, [1, 1, 1]));

console.log('COMBINATION(3)');
console.log(combinations(3));

console.log('GENERATE TRUTH TABLE BOARD');
console.log(generateTruthTable(BOARD));

console.log('GENERATE TRUTH TABLE BOARD1');
console.log(generateTruthTable(BOARD1));
**/
