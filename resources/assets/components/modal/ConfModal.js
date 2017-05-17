import React from 'react';
import classNames from 'classnames';
import Modal from './Modal';

export default function ConfModal(props) {
  const onCancel = props.onCancel;
  return (
    <Modal
      isOpen={props.isOpen}
      onCancel={onCancel}
      title={props.title}
      content={<p>{props.content}</p>}
      footer={
        <div>
          <a className="button is-success" onClick={props.onApply}>
            {props.success}
          </a>
          <a className="button" onClick={onCancel}>Cancel</a>
        </div>
      }
    />
  );
}
