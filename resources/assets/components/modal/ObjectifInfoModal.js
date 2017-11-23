import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';
import TruthTable from '../util/TruthTable';

class ObjectifInfoModal extends Component {
  render() {
    const currentObjectif = this.props.objectifToDisplay;
    const { scores } = this.props.objectif;
    return (
      <div>
        <Modal
          modalName={this.props.modalName}
          title={currentObjectif ? currentObjectif.title : ''}
          content={
            currentObjectif
              ? <div className="has-ribbon">
                  <div className="box">
                    <div className="has-text-centered">
                      <h2 className="subtitle is-4">
                        {currentObjectif.description}
                      </h2>
                    </div>
                    {scores[currentObjectif.id - 1] &&
                      <div className="ribbon is-primary">
                        {scores[currentObjectif.id - 1].score}
                      </div>}
                    <TruthTable objectif={currentObjectif} />

                  </div>
                </div>
              : ''
          }
          success={this.props.success}
          onApply={this.props.onApply}
          onCancel={this.props.onCancel}
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
