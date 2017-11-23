import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ObjectifInfoModal from './ObjectifInfoModal';

class ObjectifInfoDetailModal extends Component {
  render() {
    const {
      currentObjectif
    } = this.props.objectif;

    return (
      <div>
        <ObjectifInfoModal
          modalName="OBJECTIF_INFO_DETAIL"
          objectifToDisplay={currentObjectif}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    objectif: state.objectif
  };
};

ObjectifInfoDetailModal.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifInfoDetailModal);
