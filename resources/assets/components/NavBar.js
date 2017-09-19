import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import ModalAction from '../actions/modalActions';
import BoardAction from '../actions/boardActions';

function GuestMenu(props) {
  return (
    <div className="nav-right nav-menu">
      <a className="nav-item is-tab" onClick={props.onRegister}>
        Register
      </a>
      <a className="nav-item is-tab" onClick={props.onLogin}>
        Login
      </a>
    </div>
  );
}

GuestMenu.PropTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired
};

function LoggedMenu(props) {
  return (
    <div className="nav-right nav-menu">
      {/*
        <figure className="image is-24x24" style={{ marginRight: '8px' }}>
          <img src={props.profile} alt="Profile" />
        </figure>
        */}
      <NavLink className="nav-item is-tab" to="/profile">
        {props.user.name}
      </NavLink>
      <a className="nav-item is-tab" onClick={props.onLogout}>
        Log out
      </a>
    </div>
  );
}

LoggedMenu.PropTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
};

class NavBar extends Component {
  handleLogin = () => {
    this.props.dispatch(ModalAction.displayModal('LOGIN'));
  };

  handleRegister = () => {
    this.props.dispatch(ModalAction.displayModal('REGISTER'));
  };

  handleLogout = () => {
    this.props.dispatch(ModalAction.displayModal('LOGOUT'));
  };

  handleDelete = () => {
    this.props.dispatch(ModalAction.displayModal('BOARD_CLEAR'));
  };

  handleSaving = () => {
    if (this.props.user === null) {
      this.props.dispatch(ModalAction.displayModal('LOGIN_NEEDED'));
      return;
    }

    this.props.dispatch(BoardAction.prepareBoardForSave());
  };

  handleLoading = () => {
    if (this.props.user === null) {
      this.props.dispatch(ModalAction.displayModal('LOGIN_NEEDED'));
      return;
    }
    this.props.dispatch(ModalAction.displayModal('BOARD_LOAD'));
  };

  handleNewComponent = () => {
    if (this.props.user === null) {
      this.props.dispatch(ModalAction.displayModal('LOGIN_NEEDED'));
      return;
    }
    this.props.dispatch(BoardAction.prepareBoardForComponent());
  };

  handleChooseComponent = () => {
    if (this.props.user === null) {
      this.props.dispatch(ModalAction.displayModal('LOGIN_NEEDED'));
      return;
    }
    this.props.dispatch(ModalAction.displayModal('COMPONENT_CHOOSE'));
  };

  render() {
    return (
      <nav className="nav has-shadow app-main-nav">
        <div className="container">
          <div className="nav-left">
            <NavLink className="nav-item" to="/">
              <img src="/static/Plugboard-Green.png" alt="Plugboard logo" />
            </NavLink>
          </div>
          {this.props.showControl &&
            <div className="nav-center">
              <a className="nav-item" onClick={this.props.onNextStep}>
                <span className="icon">
                  <i className="fa fa-step-forward" />
                </span>
              </a>
              <a className="nav-item">
                <span className="icon">
                  <i
                    className={classNames('fa', {
                      'fa-play': !this.props.running,
                      'fa-stop': this.props.running
                    })}
                    onClick={this.props.toggleRun}
                  />
                </span>
              </a>
              <a className="nav-item" onClick={this.handleDelete}>
                <span className="icon">
                  <i className="fa fa-trash" />
                </span>
              </a>
              <a className="nav-item" onClick={this.props.onRotate}>
                <span className="icon">
                  <i className="fa fa-repeat" />
                </span>
              </a>
              <a className="nav-item" onClick={this.handleSaving}>
                <span className="icon">
                  <i className="fa fa-save" />
                </span>
              </a>
              <a className="nav-item" onClick={this.handleLoading}>
                <span className="icon">
                  <i className="fa fa-folder-open" />
                </span>
              </a>
              <a className="nav-item" onClick={this.handleNewComponent}>
                <span className="icon">
                  <i className="fa fa-ship" />
                </span>
              </a>
              <a className="nav-item" onClick={this.handleChooseComponent}>
                <span className="icon">
                  <i className="fa fa-book" />
                </span>
              </a>
            </div>}

          {!this.props.user
            ? <GuestMenu
                onLogin={this.handleLogin}
                onRegister={this.handleRegister}
              />
            : <LoggedMenu
                onLogout={this.handleLogout}
                user={this.props.user}
              />}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

NavBar.PropTypes = {
  onNextStep: PropTypes.func.isRequired,
  running: PropTypes.bool.isRequired,
  toggleRun: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps)(NavBar);
