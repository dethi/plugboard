import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

import ObjectifAction from '../../actions/objectifActions';
import BoardAction from '../../actions/boardActions';
import TruthTable from '../util/TruthTable';

class ObjectifInfoModal extends Component {
  render() {
    const {
      currentObjectif,
      objectifIsLoaded
    } = this.props.objectif;

    const onApply = () => {
      if (!objectifIsLoaded) {
        this.props.dispatch(ObjectifAction.prepareLoadIOs());
        this.props.dispatch(ObjectifAction.showQuickView(false));
      }
    };

    const onCancel = () => {
      if (!objectifIsLoaded) {
        this.props.dispatch(BoardAction.clearBoard());
        this.props.dispatch(ObjectifAction.setCurrentObjectif(null));
      }
    };

    return (
      <div>
        <Modal
          modalName="OBJECTIF_INFO"
          title={currentObjectif ? currentObjectif.title : ''}
          content={
            <div>
              {currentObjectif ? <TruthTable objectif={currentObjectif} /> : ''}
              <div className="has-text-centered">
                <h2 className="subtitle is-4">
                  {currentObjectif ? currentObjectif.description : ''}
                </h2>
              </div>
            </div>
          }
          success={objectifIsLoaded ? '' : 'Start'}
          onApply={onApply}
          onCancel={onCancel}
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

ObjectifInfoModal.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifInfoModal);
