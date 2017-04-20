import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'red'
    };

    console.log(this.props);
  }
  setColorToRed = () => {
    this.setState({ color: 'red' });
    this.props.updatePalette('red');
  };
  setColorToGreen = () => {
    this.setState({ color: 'green' });
    this.props.updatePalette('green');
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
            <button onClick={this.setColorToRed}>Set to Red</button>
            <button onClick={this.setColorToGreen}>Set to Green</button>
            <h3>Advanced</h3>
            <button onClick={this.setColorToGreen}>Set to Green</button>
            <h3>Perso</h3>
            <button onClick={this.setColorToRed}>Set to Red</button>
          </TabPanel>
          <TabPanel>
            <form>
              <input type="text" name="search" placeholder="Type here" />
              <br />
            </form>
            <button>Nothing</button>
            <button>Debug</button>
            <button>Grid</button>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
