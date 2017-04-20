import React, { Component } from 'react';

import Palette from './Palette';
import Board from './Board';
import Profile from './Profile';

class WebApp extends Component {
  constructor(props) {
    super(props);

    this.color = 'red';
  }
  setColorToRed = () => {
    this.color = 'green';
  };
  setColorToGreen = () => {
    this.color = 'green';
  };
  render() {
    return (
      <div>
        <Palette />
        <Board />
        <Profile />
      </div>
    );
  }
}

export default () => <WebApp />;
