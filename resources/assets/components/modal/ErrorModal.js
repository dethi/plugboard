import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

class ErrorModal extends Component {
  render() {
    return (
      <Modal
        modalName={'ERROR'}
        title={'Error'}
        content={<div />}
        err={this.props.modal['ERROR_MSG']}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
};

ErrorModal.propTypes = {
  modal: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ErrorModal);
