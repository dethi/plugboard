import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from '../libs/board/grid';

import { SPECS, evalutateBoard } from '../engine/index';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
  }
  componentDidMount() {
    this.grid = new Grid(
      15,
      10,
      70,
      this.refs.canvas,
      this.props.getCurBlueprint
    );
    this.grid1 = new Grid(
      15,
      10,
      70,
      this.refs.canvas1,
      this.props.getCurBlueprint
    );
  }
  add = () => {
    this.grid.add = true;
  };
  unset = () => {
    this.grid.add = false;
  };
  gridVisible = () => {
    this.grid.toggleGridVisibility();
  };
  exportBoard = () => {
    const grid = this.grid.exportForEngine();
    grid.board.specs = SPECS;

    this.grid.applyState(evalutateBoard(grid.board, grid.states));
  };
  render() {
    const styleBoard = {
      float: 'left',
      width: '55%'
    };
    const styleActions = {
      textAlign: 'center'
    };
    return (
      <div style={styleBoard}>
        <div className="actions" style={styleActions}>
          <button onClick={this.exportBoard}>Play</button>
          <button>Pause</button>
          <button>Stop</button>
        </div>
        <Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab>Board 1</Tab>
            <Tab>Board 2</Tab>
          </TabList>
          <TabPanel>
            <canvas ref="canvas" />
          </TabPanel>
          <TabPanel>
            <canvas ref="canvas1" />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
