import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModalAction from '../../actions/modalActions';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.modalName,
      display: false
    };
  }

  handleCancel = () => {
    if (this.props.onCancel) this.props.onCancel();
    this.props.dispatch(ModalAction.hideModal(this.props.modalName));
  };

  handleApply = () => {
    if (this.props.onApply) this.props.onApply();
    this.props.dispatch(ModalAction.hideModal(this.props.modalName));
  };

  componentWillReceiveProps(nextProps) {
    const isDisplay = nextProps.modal[this.state.name];
    if (isDisplay !== this.props.modal[this.state.name]) {
      this.setState({ display: isDisplay });
      if (isDisplay && this.props.onDisplay) this.props.onDisplay();
    }
  }

  render() {
    let cancelStyle = 'button';
    let cancelText = 'Cancel';
    if (typeof this.props.cancelText !== 'undefined') {
      cancelStyle = 'button is-danger';
      cancelText = this.props.cancelText;
    }
    return (
      <div
        className={classNames('modal', {
          'is-active': this.state.display
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
              <a className={cancelStyle} onClick={this.handleCancel}>
                {cancelText}
              </a>
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
  onCancel: PropTypes.func,
  onDisplay: PropTypes.func
};

export default connect(mapStateToProps)(Modal);
