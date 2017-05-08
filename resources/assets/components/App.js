import React, { Component } from 'react';

import NavBar from './NavBar';
import Palette from './Palette';
import Board from './Board';
// import Profile from './Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementBlueprint: null,
      step: 0,
      deleting: 0,
      running: false
    };
  }

  handleDelete = () => {
    this.setState({ deleting: this.state.deleting + 1 });
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  handlePaletteChange = paletteBlueprint => {
    this.setState({ elementBlueprint: paletteBlueprint });
  };

  getCurBlueprint = () => {
    const curBlueprint = this.state.elementBlueprint;
    this.setState({ elementBlueprint: null });
    return curBlueprint;
  };

  render() {
    const { step, running, deleting } = this.state;

    return (
      <div>
        <NavBar
          onDelete={this.handleDelete}
          onNextStep={this.handleNextStep}
          toggleRun={this.toggleRun}
          running={running}
        />
        <div className="app">
          <div className="columns">
            <Palette updatePalette={this.handlePaletteChange} />
            <Board
              getCurBlueprint={this.getCurBlueprint}
              delete={deleting}
              step={step}
              running={running}
            />
            {/*<Profile />*/}
          </div>
        </div>
      </div>
    );
  }
}
