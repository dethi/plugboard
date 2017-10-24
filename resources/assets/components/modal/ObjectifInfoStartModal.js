import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ObjectifInfoModal from './ObjectifInfoModal';
import ObjectifAction from '../../actions/objectifActions';

class ObjectifInfoStartModal extends Component {
  render() {
    const {
      objectifForModalInfoStart
    } = this.props.objectif;

    const onApply = () => {
      this.props.dispatch(
        ObjectifAction.prepareStartObjectif(objectifForModalInfoStart)
      );
      this.props.dispatch(ObjectifAction.showQuickView(false));
    };

    return (
      <div>
        <ObjectifInfoModal
          modalName="OBJECTIF_INFO_START"
          objectif={objectifForModalInfoStart}
          success="Start"
          onApply={onApply}
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

ObjectifInfoStartModal.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifInfoStartModal);
