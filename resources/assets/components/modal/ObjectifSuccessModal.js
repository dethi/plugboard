import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

import BoardAction from '../../actions/boardActions';
import ObjectifAction from '../../actions/objectifActions';

class ObjectifSuccessModal extends Component {
  render() {
    const { currentObjectif } = this.props.objectif;
    const onApply = () => {
      // this.props.dispatch(BoardAction.clearBoard());
      if (currentObjectif)
        this.props.dispatch(
          ObjectifAction.setCurrentObjectif(
            this.props.objectif.objectifs[currentObjectif.id]
          )
        );
      this.props.dispatch(ObjectifAction.prepareLoadIOs());
    };

    return (
      <div>
        <Modal
          modalName="OBJECTIF_SUCCESS"
          title={currentObjectif ? currentObjectif.title : ''}
          content={
            <article className="media">
              <div className="media-left">
                <span className="icon is-large has-text-warning">
                  <i className="fa fa-trophy" />
                </span>
              </div>
              <div className="media-content">
                <div className="content ">
                  <h2>
                    Congratulations! Objectif completed!
                  </h2>
                </div>
              </div>
            </article>
          }
          success="Next Objectif"
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

ObjectifSuccessModal.propTypes = {
  objectif: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifSuccessModal);
