import React from 'react';
import classNames from 'classnames';

export default function Modal(props) {
  return (
    <div
      className={classNames('modal', {
        'is-active': props.isOpen // Should use state instead of props
      })}
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button onClick={props.onCancel} className="delete" />
        </header>
        <section className="modal-card-body">
          {props.content}
        </section>
        <footer className="modal-card-foot">
          {props.footer}
        </footer>
      </div>
    </div>
  );
}
