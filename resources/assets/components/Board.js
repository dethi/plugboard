import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaletteAction from '../actions/paletteActions';
import BoardController from '../libs/board/controller/boardController';
import { evalutateBoard } from '../engine/engine';
import PropTypes from 'prop-types';
import ConfModal from './modal/ConfModal';
import SaveNewBoardModal from './modal/SaveNewBoardModal';

class Board extends Component {
  constructor(props) {
    super(props);

    this.boardController = null;
    this.state = {
      timerId: null,
      modalClearOpen: false,
      modalSaveOpen: false,
      preview: null
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
    } else if (nextProps.delete !== this.props.delete) {
      this.delete();
    } else if (nextProps.rotate !== this.props.rotate) {
      this.rotate();
    } else if (
      nextProps.palette.selectedBlueprint !==
      this.props.palette.selectedBlueprint
    ) {
      this.updateSelectedBlueprint(nextProps.palette.selectedBlueprint);
    } else if (nextProps.saving !== this.props.saving) {
      this.save();
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
  }

  handleApplyClear = () => {
    this.gridController.onDelete();
    this.setState({ modalClearOpen: false });
  };

  handleApplySave = () => {
    // Save board using save controller
    this.setState({ modalSaveOpen: false });
  };

  handleCancelClear = () => {
    this.setState({ modalClearOpen: false });
  };

  handleCancelSave = () => {
    this.setState({ modalSaveOpen: false });
  };

  delete = event => {
    console.log('Delete');
    this.setState({ modalClearOpen: true });
  };

  save = event => {
    this.setState({ preview: this.props.getCurCanvas().toDataURL('png') });
    this.setState({ modalSaveOpen: true });
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
        <ConfModal
          isOpen={this.state.modalClearOpen}
          onCancel={this.handleCancelClear}
          onApply={this.handleApplyClear}
          title="Clear The Board"
          content="Are you sure you want to clear the board ?"
          success="Clear"
        />
        <SaveNewBoardModal
          isOpen={this.state.modalSaveOpen}
          onCancel={this.handleCancelSave}
          onApply={this.handleApplySave}
          prev={this.state.preview}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    palette: state.palette
  };
};

Board.propTypes = {
  running: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  delete: PropTypes.number.isRequired,
  palette: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Board);
