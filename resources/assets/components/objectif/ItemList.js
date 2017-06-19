import React, { Component } from 'react';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className=" element">
        <div className="card">
          <div className="card-image">
            <figure className="image">
              <img
                src="http://bulma.io/images/placeholders/128x128.png"
                alt="Image"
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
              Challenge N1
            </div>
          </div>
        </div>

      </div>
    );
  }
}
