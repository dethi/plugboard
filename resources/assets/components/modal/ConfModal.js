import React from 'react';

import Modal from './Modal';

export default function ConfModal(props) {
  return (
    <Modal
      modalName={props.modalName}
      title={props.title}
      content={<p>{props.content}</p>}
      success={props.success}
      onApply={props.onApply}
    />
  );
}
