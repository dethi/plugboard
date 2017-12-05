import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import ModalAction from '../actions/modalActions';
import BoardAction from '../actions/boardActions';
import ObjectifAction from '../actions/objectifActions';

function GuestMenu(props) {
  return (
    <div className="nav-right nav-menu">
      <a
        className="nav-item is-tab"
        data-tour="register"
        onClick={props.onRegister}
      >
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
      <NavLink
        className="nav-item is-tab"
        to="/profile"
        onClick={props.onGoToProfile}
      >
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

  showObjectifQuickView = () => {
    this.props.dispatch(
      ObjectifAction.showQuickView(!this.props.objectif.showQuickView)
    );
  };

  handleGoToProfile = () => {
    this.props.dispatch(BoardAction.clearBoard());
    this.props.dispatch(ObjectifAction.exitObjectifMode());
  };

  render() {
    return (
      <nav className="nav has-shadow app-main-nav">
        <div className="container">
          <div className="nav-left">
            <NavLink className="nav-item" to="/" data-tour="logo">
              <img src="/static/Plugboard-Green.png" alt="Plugboard logo" />
            </NavLink>
          </div>
          {this.props.showControl
            ? <div className="nav-center">
                <a className="nav-item" onClick={this.props.onNextStep}>
                  <span className="icon">
                    <i className="fa fa-step-forward" />
                  </span>
                </a>
                <a className="nav-item" data-tour="play">
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
                <a
                  className="nav-item"
                  data-tour="save"
                  onClick={this.handleSaving}
                >
                  <span className="icon">
                    <i className="fa fa-save" />
                  </span>
                </a>
                <a className="nav-item" onClick={this.handleLoading}>
                  <span className="icon">
                    <i className="fa fa-folder-open" />
                  </span>
                </a>
                <a
                  className="nav-item"
                  data-tour="create-component"
                  onClick={this.handleNewComponent}
                >
                  <span className="icon">
                    <i className="fa fa-microchip" />
                  </span>
                </a>
                <a
                  className="nav-item"
                  data-tour="choose-component"
                  onClick={this.handleChooseComponent}
                >
                  <span className="icon">
                    <i className="fa fa-book" />
                  </span>
                </a>
                <a
                  className="nav-item"
                  data-tour="goal"
                  onClick={this.showObjectifQuickView}
                >
                  <span className="icon">
                    <i className="fa fa-list" />
                  </span>
                </a>
                <NavLink className="nav-item" to="/community">
                  <span className="icon">
                    <i className="fa fa-share-alt" />
                  </span>
                </NavLink>
              </div>
            : <NavLink className="nav-item is-tab" to="/app">
                Board
              </NavLink>}
          {!this.props.user
            ? <GuestMenu
                onLogin={this.handleLogin}
                onRegister={this.handleRegister}
              />
            : <LoggedMenu
                onLogout={this.handleLogout}
                user={this.props.user}
                onGoToProfile={this.handleGoToProfile}
              />}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    objectif: state.objectif
  };
};

NavBar.PropTypes = {
  onNextStep: PropTypes.func.isRequired,
  running: PropTypes.bool.isRequired,
  toggleRun: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  showControl: PropTypes.bool.isRequired,
  user: PropTypes.object,
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(NavBar);
