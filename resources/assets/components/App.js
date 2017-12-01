import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

import Palette from './board/Palette';
import MoveArrow from './board/MoveArrow';
import Board from './board/Board';
import ObjectifInBoard from './objectif/ObjectifInBoard';
import ListObjectif from './objectif/ListObjectif';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      running: false
    };
  }

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  render() {
    const { step, running } = this.state;
    const { inObjectifMode } = this.props.objectif;
    return (
      <div>
        <NavBar
          showControl={true}
          onNextStep={this.handleNextStep}
          toggleRun={this.toggleRun}
          running={running}
        />
        <div className="app">
          <div className="columns">
            <Board step={step} running={running} />
            <MoveArrow />
            {inObjectifMode && <ObjectifInBoard />}
            <ListObjectif />
            <Palette />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    objectif: state.objectif
  };
};

App.propTypes = {
  objectif: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(App);
