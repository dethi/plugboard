import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stats extends Component {
  render() {
    return (
      <div>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Stats);
