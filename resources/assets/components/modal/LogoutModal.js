import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

import UserAction from '../../actions/userActions';

class LogoutModal extends Component {
  onCancel = () => {
    this.props.dispatch(UserAction.logout());
  };

  render() {
    return (
      <Modal
        modalName="LOGOUT"
        title="Logout"
        success="No"
        cancelText="Yes"
        content="Are you sure you want to logout?"
        onCancel={this.onCancel}
      />
    );
  }
}

export default connect()(LogoutModal);
