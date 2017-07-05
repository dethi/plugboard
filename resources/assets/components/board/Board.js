import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PaletteAction from '../../actions/paletteActions';
import BoardAction from '../../actions/boardActions';
import ModalAction from '../../actions/modalActions';

import boardApi from '../../api/board';

import BoardController from '../../libs/board/controller/boardController';
import { evalutateBoard } from '../../engine/engine';

class Board extends Component {
  constructor(props) {
    super(props);

    this.boardController = null;
    this.state = {
      timerId: null
    };
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
    } else if (nextProps.board.prepare !== this.props.board.prepare) {
      this.prepareBoard();
    } else if (nextProps.board.load !== this.props.board.load) {
      console.log('RELOAD');
      this.boardController.loadFromBoard(nextProps.board.boardData);
    }
  }

  prepareBoard = () => {
    const boardData = this.boardController.exportBoard();
    const preview = this.boardController.toPng();

    this.props.dispatch(BoardAction.updateBoard(boardData, preview));

    if (!this.props.board.boardMetaData) {
      this.props.dispatch(ModalAction.displayModal('BOARD_SAVE'));
      return;
    }

    boardApi
      .saveBoard(this.props.board.boardMetaData.id, boardData, preview)
      .catch(response => console.log(response));
  };

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
    const { boardMetaData } = this.props.board;

    const style = {
      overflow: 'auto',
      maxHeight: '100%',
      maxWidth: '100%'
    };
    return (
      <div>
        {boardMetaData && <div>{boardMetaData.title}</div>}
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
