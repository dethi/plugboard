import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from '../board/grid';

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
      this.props.getCurElement
    );
    this.grid1 = new Grid(
      15,
      10,
      50,
      this.refs.canvas1,
      this.props.getCurElement
    );
  }
  add = () => {
    this.grid.add = true;
  };
  unset = () => {
    this.grid.add = false;
  };
  debug = () => {
    console.log(this.grid.fabricCanvas.toJSON());
  };
  gridVisible = () => {
    this.grid.toggleGridVisibility();
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
          <button>Play</button>
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