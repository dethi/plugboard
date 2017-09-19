const clearBoard = () => {
  return {
    type: 'CLEAR_BOARD'
  };
};

const applyElementAction = actionType => {
  return {
    type: 'APPLY_ELEMENT_ACTION',
    actionType
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

const prepareContextMenu = () => {
  return {
    type: 'PREPARE_CONTEXT_MENU'
  };
};

const setBoardMetaData = boardMetaData => {
  return {
    type: 'SET_BOARD_METADATA',
    boardMetaData
  };
};

const deleteBoardMetaData = () => {
  return {
    type: 'DELETE_BOARD_METADATA'
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
  applyElementAction,
  prepareBoardForSave,
  prepareContextMenu,
  prepareBoardForComponent,
  setBoardMetaData,
  deleteBoardMetaData,
  loadBoard,
  updateBoard,
  updateSpec
};
