import React from 'react';

function LoginCard() {
  return (
    <div className="card is-fullwidth has-spacing">
      <header className="card-header">
        <p className="card-header-title">Login</p>
      </header>

      <div className="card-content">
        <div className="content">
          <div className="field">
            <div className="control has-icon">
              <input
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
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" name="remember" /> Remember Me
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                className="button is-primary is-fullwidth uppercase"
                type="submit"
              >
                Login
              </button>
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
      </div>
    </div>
  );
}

export default LoginCard;
