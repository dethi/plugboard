import React from 'react';

import InputField from './InputField';

export default function Text(props) {
  return (
    <InputField
      label={props.label}
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
  );
}
