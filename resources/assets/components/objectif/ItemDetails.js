import React, { Component } from 'react';

export default class ItemDetails extends Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" />
          </header>
          <section className="modal-card-body">
            <figure className="image is-128x128">
              <img
                src="http://bulma.io/images/placeholders/128x128.png"
                alt="screenshot"
              />
            </figure>
            <div className="has-text-centered">
              Challenge 1
            </div>
            <p>Blabla description</p>
          </section>
        </div>
      </div>
    );
  }
}
