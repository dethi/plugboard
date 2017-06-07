const clearBoard = () => {
  return {
    type: 'CLEAR_BOARD'
  };
};

const updatePreview = preview => {
  return {
    type: 'UPDATE_PREVIEW',
    preview: preview
  };
};

export default {
  clearBoard,
  updatePreview
};
