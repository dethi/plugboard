import React from 'react';
import classNames from 'classnames';

export default function SelectableElementBoxImg(props) {
  return (
    <a
      className={classNames('box', {
        'box-is-active': props.selected
      })}
      onClick={props.onClick}
    >
      <div
        className="image-square-ratio"
        style={{ backgroundImage: `url(${props.img})` }}
      />
      <div className="content has-text-centered">
        <strong className="title">{props.title}</strong>
      </div>
    </a>
  );
}
