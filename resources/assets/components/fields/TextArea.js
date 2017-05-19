import React from 'react';

import InputField from './InputField';

export default function TextArea(props) {
  return (
    <InputField
      label={props.label}
      type="textarea"
      value={props.value}
      onChange={props.onChange}
    />
  );
}
