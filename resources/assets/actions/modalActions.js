const displayModal = name => {
  return {
    type: 'DISPLAY_MODAL',
    name: name
  };
};

const hideModal = name => {
  return {
    type: 'HIDE_MODAL',
    name: name
  };
};

const displayErrorModal = error => {
  return {
    type: 'DISPLAY_ERROR_MODAL',
    error: error
  };
};

export default {
  displayModal,
  displayErrorModal,
  hideModal
};
