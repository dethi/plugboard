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

            <a
              className="has-text-center button is-medium is-info has-margin"
              onClick={props.onClickShare}
            >
              Import
            </a>

          </div>
        </div>
      </article>
    </div>
  );
}
