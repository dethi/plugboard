import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserAction from '../../actions/userActions';

import Profile from '../../api/profile';

class General extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.name,
      old_password: '',
      new_password: '',
      new_password_confirmation: '',
      wants_autosav: this.props.user.wants_autosav,
      err: null,
      success: null
    };
  }

  onApply = () => {
    this.setState({ err: null, success: null });
    return new Promise((resolve, reject) => {
      Profile.update(
        this.state.name,
        this.state.old_password,
        this.state.new_password,
        this.state.new_password_confirmation,
        this.state.wants_autosav
      )
        .then(updated_user => {
          console.log(updated_user);
          this.props.dispatch(UserAction.update(updated_user));
          this.setState({ success: 'Profile updated!' });
          resolve();
        })
        .catch(response => {
          if (response.status === 422) {
            const errFormat = [];
            Object.values(response.data).forEach(err => errFormat.push(err[0]));
            this.setState({ err: errFormat });
          }
          if (response.status === 401) {
            this.setState({ err: [response.data.status] });
          }
        });
    });
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        {this.state.success &&
          <div className="notification is-primary">
            <p>{this.state.success}</p>
          </div>}
        {this.state.err &&
          <div className="notification is-danger">
            {this.state.err.map(err => <p key={err}>{err}</p>)}
          </div>}
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
                value={this.state.old_password}
                onChange={this.handleInputChange}
                className="input"
                name="old_password"
                type="password"
                placeholder="Current Password"
              />
              <span className="icon is-small">
                <i className="fa fa-lock" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control has-icon">
              <input
                value={this.state.new_password}
                onChange={this.handleInputChange}
                className="input"
                name="new_password"
                type="password"
                placeholder="New Password"
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
                value={this.state.new_password_confirmation}
                onChange={this.handleInputChange}
                className="input"
                name="new_password_confirmation"
                type="password"
                placeholder="Confirm New Password"
                required
              />
              <span className="icon is-small">
                <i className="fa fa-lock" />
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  checked={this.state.wants_autosav ? 'checked' : ''}
                  onChange={this.handleInputChange}
                  type="checkbox"
                  name="wants_autosav"
                />
              </label>
              Activer la sauvegarde automatique
            </div>
          </div>
          <div className="control">
            <button className="button is-primary" onClick={this.onApply}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(General);
