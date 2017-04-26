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
        ElementBlueprint.createDefaultGateBlueprint(),
        ElementBlueprint.createOrGateBlueprint()
      ],
      curElementId: 0
    };
  }

  updateStateOnClick(i) {
    console.log('upppdae');
    this.setState({ curElementId: i });
    this.props.updatePalette(this.state.elements[i]);
  }
  currentSelected(i) {
    console.log('called');
    if (i == this.props.state.curElementId) {
      ('selectedComponent');
    } else {
      return '';
    }
  }
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
                <div className="componentPalette">
                  <a
                    className={this.currentSelected.bind(this, 0)}
                    onClick={this.updateStateOnClick.bind(this, 0)}
                  >
                    <figure className=" image is-64x64">
                      <img src={this.state.elements[0].img} id="test-img" />
                    </figure>
                  </a>
                </div>

                <div className="componentPalette">
                  <a onClick={this.updateStateOnClick.bind(this, 1)}>
                    <figure className="image is-64x64">
                      <img src={this.state.elements[1].img} />
                    </figure>
                  </a>
                </div>
              </div>
            </div>

            <div className="box">
              <h3 className="title is-3 has-text-centered">Gate 2/1</h3>

              <div className="componentsPalette">
                <div className="componentPalette">
                  <a onClick={this.updateStateOnClick.bind(this, 2)}>
                    <figure className="image is-64x64">
                      <img src={this.state.elements[2].img} />
                    </figure>
                  </a>
                </div>
                <div className="componentPalette">
                  <a onClick={this.updateStateOnClick.bind(this, 3)}>
                    <figure className="image is-64x64">
                      <img src={this.state.elements[3].img} />
                    </figure>
                  </a>
                </div>
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
