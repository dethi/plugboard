import React from 'react';

export default function InputField(props) {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <p className="control">
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      </p>
    </div>
  );
}
