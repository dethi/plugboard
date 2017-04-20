import React, { Component } from 'react';

import Palette from './Palette';
import Board from './Board';
import Profile from './Profile';

export default class WebApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'red'
    };
  }
  handlePaletteChange(paletteValue) {
    console.log('WebApp: ' + paletteValue);
    this.setState({ color: paletteValue });
  }
  getColor() {
    return this.state.color;
  }
  render() {
    return (
      <div>
        <Palette updatePalette={this.handlePaletteChange.bind(this)} />
        <Board getColor={this.getColor.bind(this)} />
        <Profile />
      </div>
    );
  }
}
