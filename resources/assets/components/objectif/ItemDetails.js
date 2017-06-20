import React, { Component } from 'react';
//Doit être encapsuler dans une modal
export default class ItemDetails extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-square">
            <img
              src="http://bulma.io/images/placeholders/256x256.png"
              alt="screenshot"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-right">
              <div className="icon">
                <i className="fa fa-star-o" />
                <i className="fa fa-star-o" />
                <i className="fa fa-star-o" />
              </div>
            </div>
          </div>
          <div className="content has-text-centered">
            <h1 className="title is-1 is-spaced">
              Challenge 1
            </h1>
            <h2 className="subtitle is-4">
              Voici la description
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
