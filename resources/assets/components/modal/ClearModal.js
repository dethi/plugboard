import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfModal from './ConfModal';

import BoardAction from '../../actions/boardActions';

class ClearModal extends Component {
  render() {
    const onApply = () => {
      this.props.dispatch(BoardAction.clearBoard());
    };
    return (
      <div>
        <ConfModal
          modalName="DELETE"
          title="Clear The Board"
          content="Are you sure you want to clear the board ?"
          success="Clear"
          onApply={onApply}
        />
      </div>
    );
  }
}

export default connect()(ClearModal);
