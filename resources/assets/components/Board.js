import React, { Component } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { createSimplePalette } from '../libs/utils/createSimple';
import { GridController } from '../libs/board/controller/gridController';

import { SPECS, evalutateBoard } from '../engine/index';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.gridController = null;
    this.state = {
      timerId: null
    };
  }

  componentDidMount() {
    const palette = createSimplePalette();
    this.gridController = new GridController(
      this.refs.canvas,
      this.props.getCurBlueprint
    );

    this.gridController.addElement({ x: 1, y: 1 }, palette[2]);
    this.gridController.addElement({ x: 1, y: 3 }, palette[3]);
    this.gridController.addLink('0_B', '1_A');
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
    this.grid.applyState(evalutateBoard(grid.board, grid.states));
  };

  run = () => {
    const grid = this.grid.exportForEngine();
    grid.board.specs = SPECS;

    let boardStates = grid.states;
    const loop = () => {
      this.grid.getInputState().forEach((e, i) => boardStates[i] = e);
      const newBoardState = evalutateBoard(grid.board, boardStates);
      this.grid.applyState(newBoardState);
      boardStates = newBoardState;
    };

    const timerId = setInterval(loop, 300);
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
      <div className="column">
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
