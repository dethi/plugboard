import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Grid from '../board/grid';

class GridComponent extends Component {
  constructor(props) {
    super(props);

    this.grid = null;
  }
  componentDidMount() {
    this.grid = new Grid(15, 10, 50, this.refs.canvas);
    this.grid1 = new Grid(15, 10, 50, this.refs.canvas1);
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
    let stylePanel = {
      float: 'left',
      width: '20%',
      borderRight: '1px solid black',
      paddingRight: '10px',
      marginRight: '10px'
    };
    let styleBoard = {
      float: 'left',
      width: '55%'
    };
    let styleProfile = {
      float: 'right',
      width: '20%',
      borderLeft: '1px solid black',
      paddingLeft: '10px'
    };
    let styleActions = {
      textAlign: 'center'
    };
    return (
      <div>
        <div style={stylePanel}>
          <Tabs>
            <TabList>
              <Tab>Components</Tab>
              <Tab>Search</Tab>
            </TabList>

            <TabPanel>
              <button onClick={this.add}>Add</button>
              <button onClick={this.setColorToRed}>Set to Red</button>
              <button onClick={this.setColorToGreen}>Set to Green</button>
              <h3>Advanced</h3>
              <button onClick={this.setColorToGreen}>Set to Green</button>
              <h3>Perso</h3>
              <button onClick={this.setColorToRed}>Set to Red</button>
            </TabPanel>
            <TabPanel>
              <form>
                <input type="text" name="firstname" placeholder="Type here" />
                <br />
              </form>
              <button onClick={this.unset}>Nothing</button>
              <button onClick={this.debug}>Debug</button>
              <button onClick={this.gridVisible}>Grid</button>
            </TabPanel>
          </Tabs>
        </div>

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
        <div style={styleProfile}>
          <h2>Name</h2>
          <h3>Level 15</h3>
          <progress value="15" max="100">15%</progress>
          <Tabs>
            <TabList>
              <Tab>Informations</Tab>
              <Tab>Achievements</Tab>
            </TabList>
            <TabPanel />
            <TabPanel />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default () => (
  <div>
    <GridComponent />
  </div>
);
