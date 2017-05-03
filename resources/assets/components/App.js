import React, { Component } from 'react';

import NavBar from './NavBar';
import Palette from './Palette';
import Board from './Board';
import Profile from './Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementBlueprint: undefined
    };
  }

  handlePaletteChange = paletteBlueprint => {
    this.setState({ elementBlueprint: paletteBlueprint });
  };

  getCurBlueprint = () => {
    const curBlueprint = this.state.elementBlueprint;

    this.setState({ elementBlueprint: undefined });

    return curBlueprint;
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="app">
          <div className="columns">
            <Palette updatePalette={this.handlePaletteChange} />
            <Board getCurBlueprint={this.getCurBlueprint} />
            {/*<Profile />*/}
          </div>
        </div>
      </div>
    );
  }
}
