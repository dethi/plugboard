import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UserAction from '../../actions/userActions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(UserAction.init());
  }

  render() {
    return (
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1 is-spaced">
            It's time to learn combinatory logic
          </h1>
          <h2 className="subtitle is-4">
            Create, assemble, share.
          </h2>
          <NavLink className="button is-medium is-primary uppercase" to="/app">
            Get started
          </NavLink>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
