import React from 'react';
import classNames from 'classnames';

export default function Element(props) {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <figure className="image">
            <img src={props.img} alt="Board Preview" />
          </figure>
          <div className="content has-text-centered is-size-4	">
            <strong className="title">{props.title}</strong> by {props.name}
            <br />

            <div
              className={classNames('has-text-center', 'button', 'is-medium', {
                'component-already-imported': !props.originalComponent,
                'is-info': props.originalComponent,
                'is-primary': !props.originalComponent
              })}
              onClick={props.originalComponent ? props.onClickImport : null}
            >
              {props.originalComponent ? 'Import' : 'Imported'}
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
