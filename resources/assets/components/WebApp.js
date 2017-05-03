import React, { Component } from 'react';

import Palette from './Palette';
import Board from './Board';
import Profile from './Profile';

export default class WebApp extends Component {
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
      <div className="columns">
        <Palette updatePalette={this.handlePaletteChange} />
        <Board getCurBlueprint={this.getCurBlueprint} />
        {/*<Profile />*/}
      </div>
    );
  }
}
