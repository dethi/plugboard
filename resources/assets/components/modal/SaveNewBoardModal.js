import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Text from '../fields/Text';
import TextArea from '../fields/TextArea';

import SaveBoard from '../../api/saveBoard';

class SaveNewBoardModal extends Component {
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
    SaveBoard.saveBoard(null);
    console.log(this.state);
  };

  render() {
    return (
      <Modal
        modalName="BOARD_SAVE"
        title="Save new Board"
        content={
          <div>
            {this.props.board.preview &&
              <div>
                <img src={this.props.board.preview} alt="Preview" />
              </div>}
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

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

SaveNewBoardModal.propTypes = {
  board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SaveNewBoardModal);
