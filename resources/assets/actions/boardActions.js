const clearBoard = () => {
  return {
    type: 'CLEAR_BOARD'
  };
};

const prepareBoardForSave = () => {
  return {
    type: 'PREPARE_BOARD_SAVE'
  };
};

const setBoardMetaData = boardMetaData => {
  return {
    type: 'SET_BOARD_METADATA',
    boardMetaData
  };
};

const loadBoard = (boardMetaData, boardData) => {
  return {
    type: 'LOAD_BOARD',
    boardMetaData,
    boardData
  };
};

const updateBoard = (boardData, preview) => {
  return {
    type: 'UPDATE_BOARD',
    boardData,
    preview
  };
};

export default {
  clearBoard,
  prepareBoardForSave,
  setBoardMetaData,
  loadBoard,
  updateBoard
};
