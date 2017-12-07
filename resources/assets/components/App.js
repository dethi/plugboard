import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tour from 'reactour';

import NavBar from './NavBar';

import Palette from './board/Palette';
import MoveArrow from './board/MoveArrow';
import Board from './board/Board';
import ObjectifInBoard from './objectif/ObjectifInBoard';
import ListObjectif from './objectif/ListObjectif';

const steps = [
  {
    selector: '[data-tour="logo"]',
    content: "Welcome to Plugboard! Let's start a little tour of the available feature!",
    position: 'bottom'
  },
  {
    selector: '[data-tour="play"]',
    content: 'The play button let you start the simulation of your current board.',
    position: 'bottom'
  },
  {
    selector: '[data-tour="save"]',
    content: 'You can save your current board with the save button.',
    position: 'bottom'
  },
  {
    selector: '[data-tour="create-component"]',
    content: 'Any board can be transformed in an component to be reused later!',
    position: 'bottom'
  },
  {
    selector: '[data-tour="choose-component"]',
    content: 'You can choose anytime which component is available in the panel.',
    position: 'bottom'
  },
  {
    selector: '[data-tour="goal"]',
    content: 'The list of goal is available in the side bar menu!',
    position: 'bottom'
  },
  {
    selector: '[data-tour="share"]',
    content: 'You can import components shared by the community by clicking on this button!',
    position: 'bottom'
  },
  {
    selector: '[data-tour="move-arrow"]',
    content: 'The arrow let you move in your huge board!'
  },
  {
    selector: '[data-tour="palette"]',
    content: 'Select the component you want to add in your board in the palette...'
  },
  {
    selector: '[data-tour="register"]',
    content: "That's all for now. Don't forget to register an account if you want to save your work and import components shared by the community!",
    position: 'bottom'
  }
];

const FIRST_TIME_KEY = 'plugboard-first-time';

class App extends Component {
  constructor(props) {
    super(props);

    const isFirstTime = localStorage.getItem(FIRST_TIME_KEY) === null;
    this.state = {
      step: 0,
      running: false,
      isOpenTour: isFirstTime
    };
  }

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  handleCloseTour = () => {
    localStorage.setItem(FIRST_TIME_KEY, new Date().toString());
    this.setState({ isOpenTour: false });
  };

  render() {
    const { step, running, isOpenTour } = this.state;
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
        <Tour
          steps={steps}
          isOpen={isOpenTour}
          disableInteraction={true}
          onRequestClose={this.handleCloseTour}
        />
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
