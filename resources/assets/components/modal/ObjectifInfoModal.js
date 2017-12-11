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
          id="modal-info"
          modalName={this.props.modalName}
          title={currentObjectif ? currentObjectif.title : ''}
          ribbon={
            currentObjectif && scores[currentObjectif.id - 1]
              ? scores[currentObjectif.id - 1].score
              : null
          }
          content={
            currentObjectif
              ? <div>
                  <h2 className="subtitle is-4 marginForRibbon">
                    {currentObjectif.description}
                  </h2>
                  <TruthTable objectif={currentObjectif} />
                  {this.props.showHelp &&
                    <div className="has-text-centered">
                      <a className="button is-info" href={currentObjectif.help}>
                        Click here if you need help
                      </a>
                    </div>}
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
