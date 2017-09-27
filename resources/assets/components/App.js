import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';

import Palette from './board/Palette';
import Board from './board/Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      running: false
    };
  }

  getCurCanvas = () => {
    return this.refs.board.gridController.gridView.fabricCanvas;
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  render() {
    const { step, running } = this.state;

    return (
      <div>
        <NavBar
          showControl={true}
          onNextStep={this.handleNextStep}
          toggleRun={this.toggleRun}
          running={running}
        />
        <div className="app">
          <div className="columns">
            <Board
              ref="board"
              step={step}
              running={running}
              getCurCanvas={this.getCurCanvas}
            />
            <Palette />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
