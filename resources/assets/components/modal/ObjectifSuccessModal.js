import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

import ModalAction from '../../actions/modalActions';
import ObjectifAction from '../../actions/objectifActions';

class ObjectifSuccessModal extends Component {
  render() {
    const { currentObjectif, objectifs, score } = this.props.objectif;
    const onApply = () => {
      if (currentObjectif) {
        this.props.dispatch(
          ObjectifAction.setCurrentObjectif(
            this.props.objectif.objectifs[currentObjectif.id]
          )
        );
      }
      this.props.dispatch(ModalAction.displayModal('OBJECTIF_INFO'));
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
                <div className="content">
                  <h2>
                    Congratulations! Objectif completed!
                  </h2>
                  <table className="table is-bordered">
                    <tbody>
                      {score &&
                        score.scores.map((value, i) => (
                          <tr key={i}>
                            <th>{value.name}</th>
                            <th>{value.value}</th>
                            <th>{value.point > 0 ? '+' + value.point : 0}</th>
                          </tr>
                        ))}
                      <tr>
                        <th>Total</th>
                        <th />
                        <th>{score && score.total}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          }
          success={
            currentObjectif && currentObjectif.id < objectifs.length
              ? 'Next Objectif'
              : ''
          }
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
