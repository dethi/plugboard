import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import NavBar from '../NavBar';
import Stat from './Stat.js';
import MyBoards from './MyBoards.js';
import MyComponents from './MyComponents.js';
import General from './General';
import defaultUserProfilPicture
  from '../../../../public/static/default-user-profile.png';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curTab: 'general'
    };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(newTab) {
    this.setState({ curTab: newTab });
  }

  render() {
    if (this.props.user === null) {
      return <Redirect to="/app" />;
    }
    let toDisplay = <div />;
    if (this.state.curTab === 'stat') toDisplay = <Stat />;
    else if (this.state.curTab === 'boards') toDisplay = <MyBoards />;
    else if (this.state.curTab === 'general') toDisplay = <General />;
    else toDisplay = <MyComponents />;

    return (
      <div>
        <NavBar showControl={false} />
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="profile container">
              <div className="has-text-centered">
                <figure className="image image-is-centered is-128x128">
                  <img
                    src={defaultUserProfilPicture}
                    className="is-centered"
                    alt="profile"
                  />
                </figure>
                <h1 className="title">
                  {this.props.user ? this.props.user.name : 'Name'}
                </h1>
                <h2 className="subtitle">
                  {this.props.user ? this.props.user.email : 'Email'}
                </h2>
              </div>
            </div>
          </div>
        </section>
        <div className="tabs is-centered">
          <ul>
            <li className={this.state.curTab === 'general' && 'is-active'}>
              <a onClick={() => this.changeTab('general')}>General</a>
            </li>
            <li className={this.state.curTab === 'stat' && 'is-active'}>
              <a onClick={() => this.changeTab('stat')}>Stat</a>
            </li>
            <li className={this.state.curTab === 'boards' && 'is-active'}>
              <a onClick={() => this.changeTab('boards')}>Board</a>
            </li>
            <li className={this.state.curTab === 'composants' && 'is-active'}>
              <a onClick={() => this.changeTab('composants')}>Component</a>
            </li>
          </ul>
        </div>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            {toDisplay}
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

Profile.PropTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(Profile);
