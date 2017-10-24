import React, { Component } from 'react';

import Modal from './Modal';

import TruthTable from '../util/TruthTable';

class ObjectifInfoModal extends Component {
  render() {
    let currentObjectif = this.props.objectif;
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
                    {currentObjectif.score &&
                      <div className="ribbon is-primary">
                        {currentObjectif.score}
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

export default ObjectifInfoModal;
