import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContextMenuTrigger } from 'react-contextmenu';
import PropTypes from 'prop-types';

import ContextMenuBoard from './ContextMenuBoard';
import elementActions from './elementActions';

import PaletteAction from '../../actions/paletteActions';
import BoardAction from '../../actions/boardActions';
import ContextMenuActions from '../../actions/contextMenuActions';
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
    console.log('user', this.props.user);
    this.boardController = new BoardController(
      this.refs.canvas,
      this.unSelectBlueprint,
      () => {
        if (
          this.props.user &&
          this.props.user !== null &&
          this.props.user.wants_autosav === 1
        ) {
          this.props.dispatch(BoardAction.prepareBoardForSave());
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.running !== this.props.running) {
      if (nextProps.running) {
        this.run();
      } else {
        this.stop();
      }
    }

    if (nextProps.step !== this.props.step) {
      this.nextStep();
    }

    if (
      nextProps.palette.selectedBlueprint !==
      this.props.palette.selectedBlueprint
    ) {
      this.updateSelectedBlueprint(nextProps.palette.selectedBlueprint);
    }

    if (nextProps.board.clear !== this.props.board.clear) {
      this.clearBoard();
    }

    if (
      nextProps.board.applyElementAction !== this.props.board.applyElementAction
    ) {
      console.log(nextProps.board.actionType);
      this.applyElementAction(nextProps.board.actionType);
    }

    if (nextProps.board.prepare !== this.props.board.prepare) {
      this.prepareBoard();
    }

    if (
      nextProps.board.prepareForComponent !==
      this.props.board.prepareForComponent
    ) {
      this.prepareBoardForComponent();
    }

    if (
      nextProps.board.prepareContextMenu !== this.props.board.prepareContextMenu
    ) {
      this.prepareContextMenu();
    }

    if (nextProps.board.load !== this.props.board.load) {
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

  prepareBoardForComponent = () => {
    const spec = this.boardController.exportSpec();

    if (spec.err === undefined) {
      this.props.dispatch(BoardAction.updateSpec(spec));
      this.props.dispatch(ModalAction.displayModal('COMPONENT_SAVE'));
    } else {
      this.props.dispatch(ModalAction.displayErrorModal([[spec.err]]));
    }
  };

  prepareContextMenu = () => {
    const curEl = this.boardController.getCurEl();

    this.props.dispatch(ContextMenuActions.setContextType(curEl === null));
  };

  applyElementAction = actionType => {
    switch (actionType) {
      case elementActions.ROTATE:
        this.boardController.onRotate();
        break;
      case elementActions.DELETE:
        this.boardController.onDelete();
        break;
      default:
        break;
    }
  };

  updateSelectedBlueprint = blueprint => {
    this.boardController.onUpdateSelectedBlueprint(blueprint);
  };

  unSelectBlueprint = () => {
    this.props.dispatch(PaletteAction.unselecteBlueprint());
  };

  clearBoard = () => {
    this.boardController.clearBoard();
    this.props.dispatch(BoardAction.deleteBoardMetaData());
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
        <ContextMenuTrigger id="bard_context_menu" className="column">
          <div style={style}>
            <canvas ref="canvas" />
          </div>
        </ContextMenuTrigger>
        <ContextMenuBoard />

        {boardMetaData &&
          <div className="box on-canvas on-canvas-center board-title">
            <p className="has-text-centered">{boardMetaData.title}</p>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    palette: state.palette,
    board: state.board,
    user: state.user
  };
};

Board.propTypes = {
  running: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  palette: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps)(Board);
