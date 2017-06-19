import React, { Component } from 'react';

export default class ItemList extends Component {
  render() {
    return (
      <div className="column is-2 on-canvas">
        <div className="box">
          <figure className="image is-128x128">
            <img
              src="http://bulma.io/images/placeholders/128x128.png"
              alt="screenshot"
            />
          </figure>
          <div className="has-text-centered">
            Challenge 1
          </div>

        </div>
      </div>
    );
  }
}
