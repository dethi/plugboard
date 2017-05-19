import React, { Component } from 'react';

import UserAction from '../actions/userActions';
import Authentification from '../api/authentification';

class NavBarAccueil extends Component {
  handleLogin = () => {
    Authentification.login('test', 'test').then(user => {
      this.props.dispatch(UserAction.login(user));
    });
  };

  render() {
    return (
      <nav className="nav">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <img src="/static/Plugboard-White.png" alt="Plugboard logo" />
            </a>
          </div>
          <span className="nav-toggle">
            <span />
            <span />
            <span />
          </span>
          <div className="nav-right nav-menu">
            <a className="nav-item">
              About
            </a>
            <a className="nav-item">
              FAQ
            </a>
            <a className="nav-item">
              Contact
            </a>
            <span className="nav-item">
              <a className="button is-default" href="/login">
                Login
              </a>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBarAccueil;
