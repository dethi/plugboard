import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Element(props) {
  return (
    <div className="box">
      <div
        className="image-square-ratio"
        style={{ backgroundImage: `url(${props.img})` }}
      />
      <div className="content has-text-centered is-size-4">
        <strong className="title">{props.title}</strong>
        {props.originalName && ' by ' + props.originalName}
        <br />
        {props.onClickEdit &&
          <NavLink
            className="button is-primary has-margin"
            to="/app"
            onClick={props.onClickEdit}
          >
            Edit
          </NavLink>}
        {props.onClickShare &&
          <a className="button is-info has-margin" onClick={props.onClickShare}>
            {!props.share ? 'Share' : 'Make private'}
          </a>}
        <a
          className="button is-danger has-margin"
          onClick={props.onClickDelete}
        >
          Delete
        </a>

      </div>
    </div>
  );
}
