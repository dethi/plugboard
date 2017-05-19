import React, { Component } from 'react';
import Modal from './Modal';
import Text from '../fields/Text';
import TextArea from '../fields/TextArea';

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
            <div>
              {/* FIXME: need to recize/limit previews */}
              <img src={this.props.prev} alt="Preview" />
            </div>
            <Text
              label="Name"
              value={this.state.name}
              onChange={this.updateName}
            />
            <TextArea
              label="Description"
              value={this.state.desc}
              onChange={this.updateDesc}
            />
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
