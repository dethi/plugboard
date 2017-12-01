import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stats extends Component {
  render() {
    return (
      <div>
        <h3 className="level-profile title is-3 has-text-centered">
          Goal 3
        </h3>
        <progress className="progress " value="15" max="100">15%</progress>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Board created</th>
              <th>35</th>
            </tr>
            <tr>
              <th>Total Score</th>
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
