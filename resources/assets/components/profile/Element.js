import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function Element(props) {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <figure className="image">
            <img src={props.img} alt="Board Preview" />
          </figure>
          <div className="content has-text-centered">
            <strong className="title">{props.title}</strong><br />
            <NavLink
              className="has-text-center button is-medium is-primary has-margin"
              to="/app"
              onClick={props.onClick}
            >
              Edit
            </NavLink>
            <a
              className="has-text-center button is-medium is-danger has-margin"
            >
              Delete
            </a>

          </div>
        </div>
      </article>
    </div>
  );
  /*
    <div className="box">
      <div className="has-text-centered">
        <strong className="title">{props.title}</strong>
      </div>
      <article className="media">

        <div className="media-content">
          <figure
            className={classNames('image', 'image-is-centered', {
              'is-128x128': props.isElement
            })}
          >
            <img src={props.img} alt="Board Preview" />
          </figure>

          <div className="content has-text-centered">

            <div className="columns is-centered">
              <div className="column is-half">
                <NavLink
                  className="has-text-center button is-medium is-primary has-margin"
                  to="/app"
                  onClick={props.onClick}
                >
                  Edit
                </NavLink>
                <a
                  className="has-text-center button is-medium is-danger has-margin"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>*/
}
