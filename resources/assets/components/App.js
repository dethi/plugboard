import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Palette from './Palette';
import Board from './Board';
import ModalContainer from './modal/ModalContainer';

import UserAction from '../actions/userActions';
import Authentification from '../api/authentification';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      rotating: 0,
      running: false,
      saving: false,
      loading: false
    };

    // Check if token existe
    const token = localStorage.getItem('plugboardToken');
    if (token) {
      Authentification.loginFromToken(token).then(user => {
        this.props.dispatch(UserAction.login(user));
      });
    }
  }

  handleSave = () => {
    //this.saveController.saveGrid(this.refs.board.gridController.grid);
    this.setState({ saving: !this.state.saving });
  };

  getCurCanvas = () => {
    return this.refs.board.gridController.gridView.fabricCanvas;
  };

  handleOpen = () => {
    //this.saveController.openGrid();
    this.setState({ loading: !this.state.loading });
  };

  handleRotate = () => {
    this.setState({ rotating: this.state.rotating + 1 });
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  render() {
    const { step, running, saving, rotating, loading } = this.state;

    return (
      <div>
        <NavBar
          onRotate={this.handleRotate}
          onSave={this.handleSave}
          onOpen={this.handleOpen}
          onNextStep={this.handleNextStep}
          toggleRun={this.toggleRun}
          running={running}
        />
        <div className="app">
          <div className="columns">
            <Palette />
            <Board
              ref="board"
              rotate={rotating}
              step={step}
              running={running}
              saving={saving}
              loading={loading}
              getCurCanvas={this.getCurCanvas}
            />
            {/*<Profile />*/}
          </div>
        </div>
        <ModalContainer />
      </div>
    );
  }
}

export default connect()(App);
