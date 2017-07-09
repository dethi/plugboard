import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';

import Palette from './board/Palette';
import Board from './board/Board';
import Objectif from './objectif/ItemInBoard';

import ModalContainer from './modal/ModalContainer';

import UserAction from '../actions/userActions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      rotating: 0,
      running: false
    };

    this.props.dispatch(UserAction.init());
  }

  getCurCanvas = () => {
    return this.refs.board.gridController.gridView.fabricCanvas;
  };

  handleRotate = () => {
    this.setState({ rotating: this.state.rotating + 1 });
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  render() {
    const { step, running, rotating } = this.state;

    return (
      <div>
        <NavBar
          onRotate={this.handleRotate}
          onNextStep={this.handleNextStep}
          toggleRun={this.toggleRun}
          running={running}
        />
        <div className="app">
          <div className="columns">
            <Board
              ref="board"
              rotate={rotating}
              step={step}
              running={running}
              getCurCanvas={this.getCurCanvas}
            />

            <Objectif />
            <Palette />
            {/*<Profile />*/}
          </div>
        </div>
        <ModalContainer />
      </div>
    );
  }
}

export default connect()(App);
