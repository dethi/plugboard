import React from 'react';
import classNames from 'classnames';

function GuestMenu(props) {
  return (
    <div className="nav-right nav-menu">
      <a className="nav-item is-tab" href="/register">
        Register
      </a>
      <a className="nav-item is-tab" href="/login">
        Login
      </a>
    </div>
  );
}

function LoggedMenu(props) {
  const handleLogout = e => {
    e.preventDefault();
    document.getElementById('logout-form').submit();
  };

  return (
    <div className="nav-right nav-menu">
      <a className="nav-item is-tab">
        <figure className="image is-24x24" style={{ marginRight: '8px' }}>
          <img src={props.profile} alt="Profile" />
        </figure>
        Profile
      </a>
      <a className="nav-item is-tab" href="/logout" onClick={handleLogout}>
        Log out
      </a>
    </div>
  );
}

export default function NavBar(props) {
  const { guest, gravatarUrl } = window.Laravel;

  return (
    <nav className="nav has-shadow app-main-nav">
      <div className="container">
        <div className="nav-left">
          <a className="nav-item">
            <img src="/static/Plugboard-Green.png" alt="Plugboard logo" />
          </a>
        </div>

        <div className="nav-center">
          <a className="nav-item" onClick={props.onNextStep}>
            <span className="icon">
              <i className="fa fa-step-forward" />
            </span>
          </a>
          <a className="nav-item">
            <span className="icon">
              <i
                className={classNames('fa', {
                  'fa-play': !props.running,
                  'fa-stop': props.running
                })}
                onClick={props.toggleRun}
              />
            </span>
          </a>
          <a className="nav-item" onClick={props.onDelete}>
            <span className="icon">
              <i className="fa fa-trash" />
            </span>
          </a>
          <a className="nav-item" onClick={props.onSave}>
            <span className="icon">
              <i className="fa fa-save" />
            </span>
          </a>
          <a className="nav-item" onClick={props.onOpen}>
            <span className="icon">
              <i className="fa fa-folder-open" />
            </span>
          </a>
        </div>

        {guest ? <GuestMenu /> : <LoggedMenu profile={gravatarUrl} />}
      </div>
    </nav>
  );
}
