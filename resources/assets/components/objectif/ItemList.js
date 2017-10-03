import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ItemList extends Component {
  render() {
    if (!this.props.locked) {
      return (
        <div className=" element">
          <div className="card">
            <div className="card-image">
              <figure className="image is-square">
                <img alt="Locked" src="/static/lock.png" />
              </figure>
            </div>
            <div className="card-content">

              <div className="content has-text-centered">
                Locked
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className=" element">
          <NavLink to="/app">

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

                {/*
              <div className="media">
                <div className="media-right">
                  <div className="icon">
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                  </div>
                </div>
              </div>
              */}
                <div className="content has-text-centered">
                  {this.props.title}
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      );
    }
  }
}
