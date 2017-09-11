import React, { Component } from 'react';
import ItemList from './ItemList';
import NavBarAccueil from '../home/NavBarAccueil';

export default class ListObjectif extends Component {
  render() {
    return (
      <div id="landing">
        <section className="hero is-fullheight is-dark">
          <NavBarAccueil />
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <div className="conteneur">
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
              </div>
            </div>
        </div>
      </section>
  </div>  
    );
  }
}
