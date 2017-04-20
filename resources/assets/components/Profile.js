import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Profile extends Component {
  render() {
    const styleProfile = {
      float: 'right',
      width: '20%',
      borderLeft: '1px solid black',
      paddingLeft: '10px'
    };
    return (
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
    );
  }
}

export default () => <Profile />;
