import React, { Component } from 'react';

import NavBarAccueil from './NavBarAccueil';
import Footer from './Footer';
import Home from './Home';

export default class Index extends Component {
  render() {
    return (
      <div id="landing">
        <section className="hero is-fullheight is-dark">
          <NavBarAccueil />
          <Home />
          <Footer />
        </section>
      </div>
    );
  }
}
