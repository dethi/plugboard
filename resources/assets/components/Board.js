import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PaletteAction from '../actions/paletteActions';

import BoardController from '../libs/board/controller/boardController';
import { evalutateBoard } from '../engine/engine';

class Board extends Component {
  constructor(props) {
    super(props);

    this.boardController = null;
    this.state = {
      timerId: null
    };
    // FIXME: Static data for tests
    this.board1 = {
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
    // END FIXME
  }

  componentDidMount() {
    this.boardController = new BoardController(
      this.refs.canvas,
      this.unSelectBlueprint
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.running !== this.props.running) {
      if (nextProps.running) {
        this.run();
      } else {
        this.stop();
      }
    } else if (nextProps.step !== this.props.step) {
      this.nextStep();
    } else if (nextProps.rotate !== this.props.rotate) {
      this.rotate();
    } else if (
      nextProps.palette.selectedBlueprint !==
      this.props.palette.selectedBlueprint
    ) {
      this.updateSelectedBlueprint(nextProps.palette.selectedBlueprint);
    } else if (nextProps.board.clear !== this.props.board.clear) {
      this.clearBoard();
    }
  }

  rotate = () => {
    this.boardController.onRotate();
  };

  updateSelectedBlueprint = blueprint => {
    this.boardController.onUpdateSelectedBlueprint(blueprint);
  };

  unSelectBlueprint = () => {
    this.props.dispatch(PaletteAction.unselecteBlueprint());
  };

  clearBoard = () => {
    this.boardController.onDelete();
  };

  nextStep = () => {
    const board = this.boardController.exportForEngine();
    const states = this.boardController.exportEngineStates();

    this.boardController.applyState(evalutateBoard(board, states));
  };

  run = () => {
    let board = null;
    let states = null;

    const loop = () => {
      board = this.boardController.exportForEngine();
      states = this.boardController.exportEngineStates();
      this.boardController.applyState(evalutateBoard(board, states));
    };

    const timerId = setInterval(loop, 300);
    this.setState({ timerId });
  };

  stop = () => {
    if (this.state.timerId !== null) {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
    }
  };

  render() {
    const style = {
      overflow: 'auto',
      maxHeight: '100%',
      maxWidth: '100%'
    };
    return (
      <div>
        <div className="column">
          <div style={style}>
            <canvas ref="canvas" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    palette: state.palette,
    board: state.board
  };
};

Board.propTypes = {
  running: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  palette: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  rotate: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Board);
