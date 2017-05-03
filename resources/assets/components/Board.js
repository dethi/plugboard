import React, { Component } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from '../libs/board/grid';

import { SPECS, evalutateBoard } from '../engine/index';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
    this.state = {
      timerId: null
    };
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
    if (nextProps.running !== this.props.running) {
      if (nextProps.running) {
        this.run();
      } else {
        this.stop();
      }
    } else if (nextProps.step !== this.props.step) {
      this.nextStep();
    }
  }

  nextStep = () => {
    const grid = this.grid.exportForEngine();
    grid.board.specs = SPECS;

    // Gift for tibs
    // console.log(this.grid.getInputState());

    this.grid.applyState(evalutateBoard(grid.board, grid.states));
  };

  run = () => {
    const grid = this.grid.exportForEngine();
    grid.board.specs = SPECS;

    let boardStates = grid.states;
    const loop = () => {
      const newBoardState = evalutateBoard(grid.board, boardStates);
      this.grid.applyState(newBoardState);
      boardStates = newBoardState;
    };

    const timerId = setInterval(loop, 100);
    this.setState({ timerId });
  };

  stop = () => {
    if (this.state.timerId !== null) {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
    }
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
