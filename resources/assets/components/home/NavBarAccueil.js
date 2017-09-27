import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ModalAction from '../../actions/modalActions';

class NavBarAccueil extends Component {
  handleLogin = () => {
    this.props.dispatch(ModalAction.displayModal('LOGIN'));
  };

  handleLogout = () => {
    this.props.dispatch(ModalAction.displayModal('LOGOUT'));
  };

  render() {
    return (
      <nav className="nav app-home-nav">
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

            <NavLink className="nav-item" to="/contact">
              Contact
            </NavLink>
            <span className="nav-item">
              {!this.props.user
                ? <a className="button is-default" onClick={this.handleLogin}>
                    Login
                  </a>
                : <a className="button is-default" onClick={this.handleLogout}>
                    Logout
                  </a>}
            </span>
          </div>
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

NavBarAccueil.PropTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(NavBarAccueil);
