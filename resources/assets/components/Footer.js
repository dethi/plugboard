import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li><a> Plugboard</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default () => <Footer />;
