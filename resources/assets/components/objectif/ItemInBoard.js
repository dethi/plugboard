import React, { Component } from 'react';

export default class ItemList extends Component {
  render() {
    return (
      <div className="card on-canvas board-objectif">
        <div className="card-image">
          <figure className="image is-square">
            <img
              src="http://bulma.io/images/placeholders/256x256.png"
              alt="screenshot"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content has-text-centered">
            <h1 className="title is-spaced">
              Challenge 1
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
