import React from 'react';
import classNames from 'classnames';

export default function ConfModal(props) {
  return (
    <div
      className={classNames('modal', {
        'is-active': props.isOpen
      })}
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button onClick={props.onCancel} className="delete" />
        </header>
        <section className="modal-card-body">
          <p>{props.content}</p>
        </section>
        <footer className="modal-card-foot">
          <a className="button is-success" onClick={props.onApply}>
            {props.success}
          </a>
          <a className="button" onClick={props.onCancel}>Cancel</a>
        </footer>
      </div>
    </div>
  );
}
