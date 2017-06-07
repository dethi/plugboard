import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li><a>{new Date().getFullYear()} Plugboard</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
