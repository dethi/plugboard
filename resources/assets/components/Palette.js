import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Palette extends Component {
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
    const stylePanel = {
      float: 'left',
      width: '20%',
      borderRight: '1px solid black',
      paddingRight: '10px',
      marginRight: '10px'
    };
    return (
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
    );
  }
}

export default () => <Palette />;
