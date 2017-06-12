import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

// import UserAction from '../../actions/userActions';
// import Authentification from '../../api/authentification';

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onCancel = () => {
    this.setState({
      email: '',
      password: '',
      passwordConfirmation: ''
    });
  };

  onApply = () => {
    // Register with Authentification
  };

  render() {
    return (
      <Modal
        modalName="REGISTER"
        title="Register"
        content={
          <div className="content">
            <div className="field">
              <div className="control has-icon">
                <input
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoFocus
                />
                <span className="icon is-small">
                  <i className="fa fa-envelope" />
                </span>
              </div>
            </div>

            <div className="field">
              <div className="control has-icon">
                <input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                <span className="icon is-small">
                  <i className="fa fa-lock" />
                </span>
              </div>
            </div>

            <div className="field">
              <div className="control has-icon">
                <input
                  value={this.state.passwordConfirmation}
                  onChange={this.handleInputChange}
                  className="input"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                <span className="icon is-small">
                  <i className="fa fa-lock" />
                </span>
              </div>
            </div>
          </div>
        }
        success="Register"
        onApply={this.onApply}
        onCancel={this.onCancel}
      />
    );
  }
}

export default connect()(RegisterModal);
