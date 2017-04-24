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
  getCurElement() {
    const curEl = this.state.color;

    this.setState({ color: undefined });

    return curEl;
  }
  render() {
    return (
      <div>
        <Palette updatePalette={this.handlePaletteChange.bind(this)} />
        <Board getCurElement={this.getCurElement.bind(this)} />
        <Profile />
      </div>
    );
  }
}
