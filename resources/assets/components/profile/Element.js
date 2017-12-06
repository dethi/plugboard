import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

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
            {props.onClickEdit &&
              <NavLink
                className="has-text-center button is-medium is-primary has-margin"
                to="/app"
                onClick={props.onClickEdit}
              >
                Edit
              </NavLink>}
            {props.onClickShare &&
              <a
                className="has-text-center button is-medium is-info has-margin"
                onClick={props.onClickShare}
              >
                {!props.share ? 'Share' : 'Make private'}
              </a>}
            <a
              className="has-text-center button is-medium is-danger has-margin"
              onClick={props.onClickDelete}
            >
              Delete
            </a>

          </div>
        </div>
      </article>
    </div>
  );
}
