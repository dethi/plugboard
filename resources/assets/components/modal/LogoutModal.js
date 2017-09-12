import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

import UserAction from '../../actions/userActions';

class LogoutModal extends Component {
  onApply = () => {
    this.props.dispatch(UserAction.logout());
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
