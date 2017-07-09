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

const prepareBoardForComponent = () => {
  return {
    type: 'PREPARE_BOARD_COMPONENT'
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

const updateSpec = spec => {
  return {
    type: 'UPDATE_SPEC',
    spec
  };
};

export default {
  clearBoard,
  prepareBoardForSave,
  prepareBoardForComponent,
  setBoardMetaData,
  loadBoard,
  updateBoard,
  updateSpec
};
