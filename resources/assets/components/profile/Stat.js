import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BoardAction from '../../actions/boardActions';
import ObjectifAction from '../../actions/objectifActions';
import ComponentAction from '../../actions/componentActions';

class Stats extends Component {
  componentWillMount() {
    this.setState({ loading: true });

    this.props.dispatch(BoardAction.getBoardsAsync());
    this.props.dispatch(ObjectifAction.getScoresAsync());
    this.props.dispatch(ObjectifAction.getObjectifsAsync());
    this.props.dispatch(ComponentAction.getComponentsAsync());
  }

  render() {
    const { boards } = this.props.board;
    const { scores, objectifs } = this.props.objectif;
    const { components } = this.props.component;

    const maxObjectif = objectifs && scores && scores.length > 0
      ? objectifs.find(
          objectif => objectif.id === scores[scores.length - 1].objectif_id
        ).id
      : 0;

    return (
      <div>
        <h3 className="level-profile title is-3 has-text-centered">
          Goal {maxObjectif}
        </h3>
        <progress
          className="progress "
          value={maxObjectif}
          max={objectifs && objectifs.length}
        >
          {maxObjectif}%
        </progress>
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
              <th>{boards && boards.length}</th>
            </tr>
            <tr>
              <th>Component created</th>
              <th>{components && components.length}</th>
            </tr>
            <tr>
              <th>Total Score</th>
              <th>
                {scores && scores.reduce((a, b) => a + b.score, 0)}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    board: state.board,
    objectif: state.objectif,
    component: state.component
  };
};

Stats.propTypes = {
  board: PropTypes.object.isRequired,
  objectif: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Stats);
