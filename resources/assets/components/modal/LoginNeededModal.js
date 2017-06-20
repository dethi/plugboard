import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

import ModalAction from '../../actions/modalActions';

class LoginNeededModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalName: 'LOGIN_NEEDED'
    };
  }

  displayLogin = () => {
    this.props.dispatch(ModalAction.hideModal(this.state.modalName));
    this.props.dispatch(ModalAction.displayModal('LOGIN'));
  };

  displayRegister = () => {
    this.props.dispatch(ModalAction.hideModal(this.state.modalName));
    this.props.dispatch(ModalAction.displayModal('REGISTER'));
  };

  onApply = () => {
    this.displayLogin();
  };

  render() {
    return (
      <Modal
        modalName={this.state.modalName}
        title="Login is mandatory"
        content={
          <div className="content">
            <p>You need to be logged to use this feature</p>
            <nav className="level">
              <div className="level-item has-text-centered">
                <a className="button is-success" onClick={this.displayRegister}>
                  Register
                </a>
              </div>
              <div className="level-item has-text-centered">
                <a className="button is-success" onClick={this.displayLogin}>
                  Login
                </a>
              </div>
            </nav>
          </div>
        }
        success="Login"
        onApply={this.onApply}
      />
    );
  }
}

export default connect()(LoginNeededModal);
