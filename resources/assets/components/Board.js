import React, { Component } from 'react';
import { connect } from 'react-redux';

import PaletteAction from '../actions/paletteActions';

import { createSimplePalette } from '../libs/utils/createSimple';
import { GridController } from '../libs/board/controller/gridController';

import { evalutateBoard } from '../engine/engine';

class Board extends Component {
  constructor(props) {
    super(props);

    this.gridController = null;
    this.state = {
      timerId: null
    };
  }

  componentDidMount() {
    this.gridController = new GridController(
      this.refs.canvas,
      this.getCurBlueprint
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
    }
  }

  getCurBlueprint = () => {
    const blueprint = this.props.palette.selectedBlueprint;

    this.props.dispatch(PaletteAction.unselecteBlueprint());

    return blueprint;
  };

  delete = event => {
    this.gridController.onDelete();
  };

  nextStep = () => {
    const grid = this.gridController.exportForEngine();
    const states = this.gridController.createEngineStates();

    this.gridController.applyState(evalutateBoard(grid, states));
  };

  run = () => {
    let grid = null;
    let states = null;

    const loop = () => {
      grid = this.gridController.exportForEngine();
      states = this.gridController.createEngineStates();
      this.gridController.applyState(evalutateBoard(grid, states));
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
      <div className="column">
        <div style={style}>
          <canvas ref="canvas" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    palette: state.palette
  };
};

export default connect(mapStateToProps)(Board);
