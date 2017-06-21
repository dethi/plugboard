import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import defaultUserProfilPicture
  from '../../../public/static/default-user-profile.png';

class Profile extends Component {
  render() {
    return (
      <div>
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
        <div className="columns">
          <div className="column is-one-quarter" />
          <div className="column is-half">
            <h3 className="level-profile title is-3 has-text-centered">
              Level 3
            </h3>
            <progress className="progress " value="15" max="100">15%</progress>
            <table className="table">
              <thead>
                <tr>
                  <th>Donnée</th>
                  <th>Valeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Circuit créé</th>
                  <th>35</th>
                </tr>
                <tr>
                  <th>Etoile débloquée</th>
                  <th>15</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column is-one-third" />
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
