import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';
import TruthTable from '../util/TruthTable';

class ObjectifFailModal extends Component {
  render() {
    const {
      currentObjectif
    } = this.props.objectif;
    return (
      <div>
        <Modal
          modalName="OBJECTIF_FAIL"
          title={currentObjectif ? currentObjectif.title : ''}
          content={
            <div className="">
              <div className="has-text-centered">
                <h2 className="subtitle is-4">
                  {this.props.board.currentTruthTable &&
                    this.props.board.currentTruthTable.err !== undefined
                    ? this.props.board.currentTruthTable.err
                    : 'Some outputs are not correct'}
                </h2>
              </div>
              {this.props.board.currentTruthTable &&
                this.props.board.currentTruthTable.err === undefined &&
                currentObjectif
                ? <TruthTable
                    objectif={currentObjectif}
                    truthTableFromBoard={
                      this.props.board.currentTruthTable.truthTable
                    }
                  />
                : ''}

            </div>
          }
          success="Fix"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    objectif: state.objectif,
    board: state.board
  };
};

ObjectifFailModal.propTypes = {
  objectif: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ObjectifFailModal);
