import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import UserAction from '../actions/userActions';
import Authentification from '../api/authentification';

function GuestMenu(props) {
  return (
    <div className="nav-right nav-menu">
      <a className="nav-item is-tab" href="/register">
        Register
      </a>
      <a className="nav-item is-tab" onClick={props.onLogin}>
        Login
      </a>
    </div>
  );
}

function LoggedMenu(props) {
  return (
    <div className="nav-right nav-menu">
      <a className="nav-item is-tab">
        {/*
        <figure className="image is-24x24" style={{ marginRight: '8px' }}>
          <img src={props.profile} alt="Profile" />
        </figure>
        */}
        {props.user.name}
      </a>
      <a className="nav-item is-tab" onClick={props.onLogout}>
        Log out
      </a>
    </div>
  );
}

class NavBar extends Component {
  handleLogin = () => {
    Authentification.login('test', 'test').then(user => {
      this.props.dispatch(UserAction.login(user));
    });
  };

  handleLogout = () => {
    this.props.dispatch(UserAction.logout());
  };

  render() {
    return (
      <nav className="nav has-shadow app-main-nav">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <img src="/static/Plugboard-Green.png" alt="Plugboard logo" />
            </a>
          </div>

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
            <a className="nav-item" onClick={this.props.onDelete}>
              <span className="icon">
                <i className="fa fa-trash" />
              </span>
            </a>
            <a className="nav-item" onClick={this.props.onRotate}>
              <span className="icon">
                <i className="fa fa-repeat" />
              </span>
            </a>
            <a className="nav-item" onClick={this.props.onSave}>
              <span className="icon">
                <i className="fa fa-save" />
              </span>
            </a>
            <a className="nav-item" onClick={this.props.onOpen}>
              <span className="icon">
                <i className="fa fa-folder-open" />
              </span>
            </a>
          </div>

          {!this.props.user
            ? <GuestMenu onLogin={this.handleLogin} />
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

export default connect(mapStateToProps)(NavBar);
