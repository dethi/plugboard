import React, { Component } from 'react';

import NavBar from './NavBar';
import Palette from './Palette';
import Board from './Board';
// import Profile from './Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementBlueprint: undefined,
      step: 0
    };
  }

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  handlePaletteChange = paletteBlueprint => {
    this.setState({ elementBlueprint: paletteBlueprint });
  };

  getCurBlueprint = () => {
    const curBlueprint = this.state.elementBlueprint;

    this.setState({ elementBlueprint: undefined });

    return curBlueprint;
  };

  render() {
    const { step } = this.state;

    return (
      <div>
        <NavBar onNextStep={this.handleNextStep} />
        <div className="app">
          <div className="columns">
            <Palette updatePalette={this.handlePaletteChange} />
            <Board getCurBlueprint={this.getCurBlueprint} step={step} />
            {/*<Profile />*/}
          </div>
        </div>
      </div>
    );
  }
}
