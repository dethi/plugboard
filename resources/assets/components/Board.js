import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from '../libs/board/grid';

import { SPECS, generateTruthTable } from '../engine/index';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
  }
  componentDidMount() {
    this.grid = new Grid(
      15,
      10,
      50,
      this.refs.canvas,
      this.props.getCurBlueprint
    );
    this.grid1 = new Grid(
      15,
      10,
      50,
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
    const board = this.grid.exportForEngine();
    board.specs = SPECS;

    console.log(board);
    console.log(generateTruthTable(board));
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
