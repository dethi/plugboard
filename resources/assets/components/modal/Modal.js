import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModalAction from '../../actions/modalActions';

class Modal extends Component {
  handleCancel = () => {
    if (this.props.onCancel) this.props.onCancel();
    this.props.dispatch(ModalAction.hideModal(this.props.modalName));
  };

  handleApply = () => {
    if (this.props.onApply) this.props.onApply();
    this.props.dispatch(ModalAction.hideModal(this.props.modalName));
  };

  render() {
    return (
      <div
        className={classNames('modal', {
          'is-active': this.props.modal[this.props.modalName]
        })}
      >
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button onClick={this.handleCancel} className="delete" />
          </header>
          <section className="modal-card-body">
            {this.props.content}
          </section>
          <footer className="modal-card-foot">
            <div>
              <a className="button is-success" onClick={this.handleApply}>
                {this.props.success}
              </a>
              <a className="button" onClick={this.handleCancel}>Cancel</a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
};

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  modalName: PropTypes.string,
  onApply: PropTypes.func,
  onCancel: PropTypes.func
};


export default connect(mapStateToProps)(Modal);
