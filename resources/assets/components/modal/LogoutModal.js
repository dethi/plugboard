import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

import UserAction from '../../actions/userActions';
import BoardAction from '../../actions/boardActions';
import ObjectifAction from '../../actions/objectifActions';

class LogoutModal extends Component {
  onApply = () => {
    this.props.dispatch(UserAction.logout());
    this.props.dispatch(ObjectifAction.emptyScores());
    this.props.dispatch(BoardAction.clearBoard());
    this.props.dispatch(ObjectifAction.exitObjectifMode());
  };

  render() {
    return (
      <Modal
        modalName="LOGOUT"
        title="Logout"
        success="Yes"
        cancelText="No"
        content="Are you sure you want to logout?"
        onApply={this.onApply}
      />
    );
  }
}

export default connect()(LogoutModal);
