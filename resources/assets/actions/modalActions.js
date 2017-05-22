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

export default {
  displayModal,
  hideModal
};
