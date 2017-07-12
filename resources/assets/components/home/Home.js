import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Home extends Component {
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
