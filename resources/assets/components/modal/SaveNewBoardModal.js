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

  onCancel = () => {
    this.setState({
      name: '',
      desc: ''
    });
  };

  onApply = () => {
    // Change store ? Call Api ?
    console.log(this.state);
  };

  render() {
    return (
      <Modal
        modalName="BOARD_SAVE"
        title="Save new Board"
        content={
          <div>
            {/*
            <div>
              FIXME: need to recize/limit previews
              <img src={this.props.prev} alt="Preview" />
            </div>
            */}
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
        success="Save"
        onApply={this.onApply}
        onCancel={this.onCancel}
      />
    );
  }
}
