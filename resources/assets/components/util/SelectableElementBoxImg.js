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
      <article className="media">
        <div className="media-content">
          <figure className="image">
            <img src={props.img} alt="Board Preview" />
          </figure>
          <div className="content has-text-centered">
            <strong className="title">{props.title}</strong>
          </div>
        </div>
      </article>
    </a>
  );
}
