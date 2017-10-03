import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ObjectifInBoard extends Component {
  render() {
    const { currentObjectif } = this.props.objectif;
    return (
      <div className="card on-canvas board-objectif">
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
        <div className="card-content">
          <div className="content has-text-centered">
            <h1 className="title is-spaced">
              {currentObjectif.title}
            </h1>
            <span className="icon is-medium has-text-info">
              <i className="fa fa-play" />
            </span>
            <span className="icon is-medium has-text-info">
              <i className="fa fa-info-circle" />
            </span>
          </div>
        </div>
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
