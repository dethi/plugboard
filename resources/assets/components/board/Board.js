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
import ObjectifAction from '../../actions/objectifActions';

import boardApi from '../../api/board';

import BoardController from '../../libs/board/controller/boardController';
import { evalutateBoard } from '../../engine/engine';

import { checkTruthTables, computeScore } from '../../libs/utils/objectif';

class Board extends Component {
  constructor(props) {
    super(props);

    this.boardController = null;
    this.state = {
      timerId: null
    };
  }

  componentDidMount() {
    document.documentElement.classList.add('disable-scroll');
    window.scrollTo(0, 0);

    this.boardController = new BoardController(
      this.refs.canvas,
      this.unSelectBlueprint
    );
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('disable-scroll');
    this.stop();
    this.boardController.dispose();
    this.boardController = null;
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
      this.applyElementAction(
        nextProps.board.actionType,
        nextProps.board.actionArgs
      );
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

    if (
      nextProps.objectif.prepareCheckObjectif !==
      this.props.objectif.prepareCheckObjectif
    ) {
      this.prepareCheckObjectif();
    }

    if (
      nextProps.objectif.prepareStartObjectif !==
      this.props.objectif.prepareStartObjectif
    ) {
      this.startObjectif();
    }

    if (nextProps.board.load !== this.props.board.load) {
      this.boardController.loadFromBoard(nextProps.board.boardData);
    }
  }

  startObjectif = () => {
    const { objectifForModalInfoStart } = this.props.objectif;

    this.props.dispatch(BoardAction.setCurrentTruthTable(null));
    this.boardController.populateBoardForObjectifs(
      this.props.palette.blueprints,
      objectifForModalInfoStart.IONames,
      objectifForModalInfoStart.nbInput,
      objectifForModalInfoStart.nbOutput
    );
  };

  prepareCheckObjectif = () => {
    const spec = this.boardController.generateTruthTableForObjectif();

    const { currentObjectif } = this.props.objectif;
    this.props.dispatch(BoardAction.setCurrentTruthTable(spec));
    if (
      spec.err === undefined &&
      checkTruthTables(currentObjectif.truth_table, spec.truthTable)
    ) {
      const score = computeScore(
        this.props.objectif.startTime,
        this.boardController.nbRemove
      );
      this.props.dispatch(ObjectifAction.setScoreAsync(currentObjectif, score));
      this.props.dispatch(ModalAction.displayModal('OBJECTIF_SUCCESS'));
    } else {
      this.props.dispatch(ModalAction.displayModal('OBJECTIF_FAIL'));
    }
  };

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
    const curElType = this.boardController.getCurElType();

    this.props.dispatch(ContextMenuActions.setContextType(curElType));
  };

  applyElementAction = (actionType, actionArgs) => {
    switch (actionType) {
      case elementActions.ROTATE:
        this.boardController.onRotate();
        break;
      case elementActions.DELETE:
        this.boardController.onDelete();
        break;
      case elementActions.RENAME:
        this.boardController.onRename(actionArgs);
        break;
      case elementActions.MOVE:
        this.boardController.onMove(actionArgs);
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

    // For sanity, check first if we can stop something.
    this.stop();

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
        <ContextMenuTrigger
          id="bard_context_menu"
          className="column"
          holdToDisplay={-1}
        >
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
    objectif: state.objectif
  };
};

Board.propTypes = {
  running: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  palette: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  objectif: PropTypes.object
};

export default connect(mapStateToProps)(Board);
