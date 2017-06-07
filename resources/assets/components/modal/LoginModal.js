import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

import UserAction from '../../actions/userActions';
import Authentification from '../../api/authentification';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
      password: ''
    });
  };

  onApply = () => {
    Authentification.login(this.state.email, this.state.password).then(user => {
      this.props.dispatch(UserAction.login(user));
    });
  };

  render() {
    return (
      <Modal
        modalName="LOGIN"
        title="Login"
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
              <p className="has-text-centered">
                <a className="button is-link" href="/password/reset">
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        }
        success="Login"
        onApply={this.onApply}
        onCancel={this.onCancel}
      />
    );
  }
}

export default connect()(LoginModal);
