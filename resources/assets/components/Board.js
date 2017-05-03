import React, { Component } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from '../libs/board/grid';

import { SPECS, evalutateBoard } from '../engine/index';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
  }

  componentDidMount() {
    this.grid = new Grid(
      30,
      14,
      40,
      this.refs.canvas,
      this.props.getCurBlueprint
    );

    // this.grid1 = new Grid(
    //   15,
    //   10,
    //   70,
    //   this.refs.canvas1,
    //   this.props.getCurBlueprint
    // );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.step !== this.props.step) {
      this.exportBoard();
    }
  }

  // add = () => {
  //   this.grid.add = true;
  // };

  // unset = () => {
  //   this.grid.add = false;
  // };

  // gridVisible = () => {
  //   this.grid.toggleGridVisibility();
  // };

  exportBoard = () => {
    const grid = this.grid.exportForEngine();
    grid.board.specs = SPECS;
    this.grid.applyState(evalutateBoard(grid.board, grid.states));
  };

  render() {
    const style = {
      overflow: 'auto',
      maxHeight: '100%',
      maxWidth: '100%'
    };
    return (
      <div className="column is-half">
        {/*<div className="app-engine-control">
          <div className="field has-addons">
            <p className="control">
              <button className="button" onClick={this.exportBoard}>
                <span className="icon is-small">
                  <i className="fa fa-step-forward" />
                </span>
              </button>
            </p>
            <p className="control">
              <button className="button">
                <span className="icon is-small">
                  <i className="fa fa-play" />
                </span>
              </button>
            </p>
          </div>
        </div>*/}

        {/*</div>*/}
        {/*<Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab>Board 1</Tab>
            <Tab>Board 2</Tab>
          </TabList>
          <TabPanel>*/}
        <div style={style}>
          <canvas ref="canvas" />
        </div>
        {/*</TabPanel>
          <TabPanel>
            <canvas ref="canvas1" />
          </TabPanel>
        </Tabs>*/}
      </div>
    );
  }
}
