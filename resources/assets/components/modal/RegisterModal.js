import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';

import UserAction from '../../actions/userActions';
import Authentification from '../../api/authentification';

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      err: null
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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      err: null
    });
  };

  onApply = () => {
    return new Promise((resolve, reject) => {
      Authentification.register(
        this.state.name,
        this.state.email,
        this.state.password,
        this.state.password_confirmation
      )
        .then(data => {
          this.setState({ err: null });
          resolve();
        })
        .catch(response => {
          if (response.status === 422) {
            const errFormat = [];
            Object.values(response.data).forEach(err => errFormat.push(err[0]));
            this.setState({ err: errFormat });
            reject();
          }
        });
    });
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
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  className="input"
                  name="name"
                  type="text"
                  placeholder="User Name"
                  required
                  autoFocus
                />
                <span className="icon is-small">
                  <i className="fa fa-user" />
                </span>
              </div>
            </div>

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
                  value={this.state.password_confirmation}
                  onChange={this.handleInputChange}
                  className="input"
                  name="password_confirmation"
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
        err={this.state.err}
      />
    );
  }
}

export default connect()(RegisterModal);
