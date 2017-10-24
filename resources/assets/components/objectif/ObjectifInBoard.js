import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ObjectifActions from '../../actions/objectifActions';
import ModalAction from '../../actions/modalActions';

class ObjectifInBoard extends Component {
  checkObjectif = () => {
    this.props.dispatch(ObjectifActions.prepareCheckObjectif());
  };
  reloadObjectif = () => {
    const { currentObjectif } = this.props.objectif;
    this.props.dispatch(ObjectifActions.prepareStartObjectif(currentObjectif));
  };

  showInfo = () => {
    this.props.dispatch(ModalAction.displayModal('OBJECTIF_INFO_DETAIL'));
  };

  render() {
    const { currentObjectif } = this.props.objectif;
    return (
      <div className="box on-canvas board-objectif">
        <h1 className="title has-text-centered is-spaced">
          {currentObjectif.title}
        </h1>

        <nav className="level">
          <a className="level-item" onClick={this.reloadObjectif}>
            <span className="icon is-medium">
              <i className="fa fa-refresh" />
            </span>
          </a>
          <a className="level-item" onClick={this.checkObjectif}>
            <span className="icon is-medium">
              <i className="fa fa-play" />
            </span>
          </a>
          <a className="level-item" onClick={this.showInfo}>
            <span className="icon is-medium">
              <i className="fa fa-info-circle" />
            </span>
          </a>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    objectif: state.objectif
  };
};

ObjectifInBoard.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifInBoard);
