import axios from 'axios';

const saveBoard = board => {
  return new Promise((resolve, reject) => {
    resolve({ success: true });
  });
};

const loadBoard = () => {
  return new Promise((resolve, reject) => {
    const board = {
      elements: {
        '1': {
          id: 1,
          specName: 'INPUT',
          pos: { x: 3, y: 1 },
          rotate: 0,
          input: {},
          inputState: {},
          output: { A: [[3, 'A']] }
        },
        '2': {
          id: 2,
          specName: 'OUTPUT',
          pos: { x: 7, y: 1 },
          rotate: 0,
          input: { A: [3, 'B'] },
          inputState: { A: 0 },
          output: {}
        },
        '3': {
          id: 3,
          specName: 'GATE_NOT',
          pos: { x: 5, y: 1 },
          rotate: 0,
          input: { A: [1, 'A'] },
          inputState: { A: 0 },
          output: { B: [[2, 'A']] }
        }
      },
      specs: {
        INPUT: {
          name: 'INPUT',
          input: [],
          output: ['A'],
          img: 'Input',
          imgOn: 'InputOn'
        },
        OUTPUT: {
          name: 'OUTPUT',
          input: ['A'],
          output: [],
          img: 'Output',
          imgOn: 'OutputOn'
        },
        GATE_NOT: {
          name: 'GATE_NOT',
          input: ['A'],
          output: ['B'],
          img: 'Not',
          truthTable: [[0, 1], [1, 0]]
        }
      }
    };
    resolve(board);
  });
};

const getBoards = () => {
  return axios.get('/api/board').then(res => res.data).catch(err => {
    console.log(err);
    throw err.response;
  });
};

export default {
  saveBoard,
  loadBoard,
  getBoards
};
