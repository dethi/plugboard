import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { ElementBlueprint } from '../libs/element/elementBlueprint';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: [
        ElementBlueprint.createInputBlueprint(),
        ElementBlueprint.createOutputBlueprint(),
        ElementBlueprint.createDefaultGateBlueprint()
      ],
      curElementId: 0
    };

    console.log(this.props);
  }
  setToInput = () => {
    this.setState({ curElementId: 0 });
    this.props.updatePalette(this.state.elements[0]);
  };
  setToOutput = () => {
    this.setState({ curElementId: 1 });
    this.props.updatePalette(this.state.elements[1]);
  };
  setToGate = () => {
    this.setState({ curElementId: 2 });
    this.props.updatePalette(this.state.elements[2]);
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
            <button onClick={this.setToInput}>Input</button>
            <button onClick={this.setToOutput}>Output</button>
            <button onClick={this.setToGate}>Porte</button>
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
