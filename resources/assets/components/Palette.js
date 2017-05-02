import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { GateType, ElementBlueprint } from '../libs/element/elementBlueprint';

// Used to create html for a single element in the palette
function SelectableElement(props) {
  return (
    <div className="componentPalette">
      <a onClick={props.onClick}>
        <figure className="image is-64x64">
          <img src={props.img} className="test-img" alt="sorry" />
        </figure>
      </a>
    </div>
  );
}

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elements: [
        ElementBlueprint.createInputBlueprint(),
        ElementBlueprint.createOutputBlueprint(),
        ElementBlueprint.createGateBlueprint('not', GateType.NOT, 1),
        ElementBlueprint.createGateBlueprint('and', GateType.AND),
        ElementBlueprint.createGateBlueprint('nand', GateType.NAND),
        ElementBlueprint.createGateBlueprint('or', GateType.OR),
        ElementBlueprint.createGateBlueprint('nor', GateType.NOR),
        ElementBlueprint.createGateBlueprint('nxor', GateType.NXOR)
      ],
      curElementId: 0
    };
  }
  updateStateOnClick = index => {
    this.setState({ curElementId: index });
    this.props.updatePalette(this.state.elements[index]);
  };
  //Not working yet
  /**
  currentSelected(i) {
    if (i === this.props.state.curElementId) {
      ('selectedComponent');
    } else {
      return '';
    }
  }**/

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
            <div className="box">

              <h3 className="title is-3 has-text-centered">Input/Ouput</h3>
              <div className="componentsPalette">
                <SelectableElement
                  img={this.state.elements[0].img}
                  onClick={() => this.updateStateOnClick(0)}
                />
                <SelectableElement
                  img={this.state.elements[1].img}
                  onClick={() => this.updateStateOnClick(1)}
                />
              </div>
            </div>
            <div className="box">
              <h3 className="title is-3 has-text-centered">Gate 1/1</h3>
              <div className="componentsPalette">
                <SelectableElement
                  img={this.state.elements[2].img}
                  onClick={() => this.updateStateOnClick(2)}
                />
              </div>
            </div>
            <div className="box">
              <h3 className="title is-3 has-text-centered">Gate 2/1</h3>
              <div className="componentsPalette">
                <SelectableElement
                  img={this.state.elements[3].img}
                  onClick={() => this.updateStateOnClick(3)}
                />
                <SelectableElement
                  img={this.state.elements[4].img}
                  onClick={() => this.updateStateOnClick(4)}
                />
                <SelectableElement
                  img={this.state.elements[5].img}
                  onClick={() => this.updateStateOnClick(5)}
                />
                <SelectableElement
                  img={this.state.elements[6].img}
                  onClick={() => this.updateStateOnClick(6)}
                />
                <SelectableElement
                  img={this.state.elements[7].img}
                  onClick={() => this.updateStateOnClick(7)}
                />
              </div>
            </div>
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
