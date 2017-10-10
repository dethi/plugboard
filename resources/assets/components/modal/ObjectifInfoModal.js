import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

import ObjectifAction from '../../actions/objectifActions';

class ObjectifInfoModal extends Component {
  render() {
    const { currentObjectif, objectifIsLoaded } = this.props.objectif;
    const onApply = () => {
      // this.props.dispatch(BoardAction.clearBoard());
      // this.props.dispatch(ModalAction.displayModal('OBJECTIF_INFO'));
      if (!objectifIsLoaded)
        this.props.dispatch(ObjectifAction.prepareLoadIOs());
    };

    return (
      <div>
        <Modal
          modalName="OBJECTIF_INFO"
          title={currentObjectif ? currentObjectif.title : ''}
          content={
            <div>
              <figure className="image is-square">
                <img
                  src="http://bulma.io/images/placeholders/256x256.png"
                  alt="screenshot"
                />
              </figure>
              <div className="has-text-centered">
                <h2 className="subtitle is-4">
                  {currentObjectif ? currentObjectif.description : ''}
                </h2>
              </div>
            </div>
          }
          success={objectifIsLoaded ? '' : 'Start'}
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

ObjectifInfoModal.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifInfoModal);
