import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ObjectifActions from '../../actions/objectifActions';
import ModalAction from '../../actions/modalActions';

class ObjectifInBoard extends Component {
  checkObjectif = () => {
    console.log('step 1');
    this.props.dispatch(ObjectifActions.prepareCheckObjectif());
  };
  reloadObjectif = () => {
    this.props.dispatch(ObjectifActions.prepareLoadIOs());
  };

  showInfo = () => {
    this.props.dispatch(ModalAction.displayModal('OBJECTIF_INFO'));
  };

  render() {
    const { currentObjectif } = this.props.objectif;
    return (
      <div className="box on-canvas board-objectif">
        {/* Maybe use a box ? */}
        {/*
        <div className="card-image">
          <figure className="image is-square">
            <img
              src="http://bulma.io/images/placeholders/256x256.png"
              alt="screenshot"
            />
          </figure>
        </div>*/}
        <h1 className="title has-text-centered is-spaced">
          {currentObjectif.title}
        </h1>

        <nav className="level">
          <a className="level-item" onClick={this.reloadObjectif}>
            <span className="icon is-medium has-text-info">
              <i className="fa fa-refresh" />
            </span>
          </a>
          <a className="level-item" onClick={this.checkObjectif}>
            <span className="icon is-medium has-text-info">
              <i className="fa fa-play" />
            </span>
          </a>
          <a className="level-item" onClick={this.showInfo}>
            <span className="icon is-medium has-text-info">
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
