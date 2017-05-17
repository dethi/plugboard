import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from './Modal';

export default class SaveNewBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: ''
    };
  }

  updateName = event => {
    this.setState({ name: event.target.value });
  };

  updateDesc = event => {
    this.setState({ desc: event.target.value });
  };

  onApply = () => {
    this.props.onApply({
      name: this.state.name,
      desc: this.state.desc
    });
  };

  render() {
    const onCancel = this.props.onCancel;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onCancel={onCancel}
        title="Save new Board"
        content={
          <div>
            <div className="field">
              <label className="label">Name</label>
              <p className="control">
                <input
                  className="input"
                  type="text"
                  value={this.state.name}
                  onChange={this.updateName}
                />
              </p>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <p className="control">
                <textarea
                  className="textarea"
                  value={this.state.desc}
                  onChange={this.updateDesc}
                />
              </p>
            </div>
          </div>
        }
        footer={
          <div>
            <a className="button is-success" onClick={this.onApply}>
              Save
            </a>
            <a className="button" onClick={onCancel}>Cancel</a>
          </div>
        }
      />
    );
  }
}
