import React from 'react';

export default function TextArea(props) {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <p className="control">
        <textarea
          className="input"
          type="textarea"
          value={props.value}
          onChange={props.onChange}
        />
      </p>
    </div>
  );
}
