import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Palette from './Palette';
import Board from './Board';
// import Profile from './Profile';

import UserAction from '../actions/userActions';
import Authentification from '../api/authentification';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      deleting: 0,
      running: false
    };

    // Check if token existe
    const token = localStorage.getItem('plugboardToken');
    if (token) {
      Authentification.loginFromToken(token).then(user => {
        this.props.dispatch(UserAction.login(user));
      });
    }
  }

  handleDelete = () => {
    this.setState({ deleting: this.state.deleting + 1 });
  };

  handleNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  toggleRun = () => {
    this.setState({ running: !this.state.running });
  };

  render() {
    const { step, running, deleting } = this.state;

    return (
      <div>
        <NavBar
          onDelete={this.handleDelete}
          onSave={() => {}}
          onOpen={() => {}}
          onNextStep={this.handleNextStep}
          toggleRun={this.toggleRun}
          running={running}
        />
        <div className="app">
          <div className="columns">
            <Palette />
            <Board
              ref="board"
              delete={deleting}
              step={step}
              running={running}
            />
            {/*<Profile />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
