import boardApi from '../api/board';

const clearBoard = () => {
  return {
    type: 'CLEAR_BOARD'
  };
};

const applyElementAction = (actionType, actionArgs) => {
  return {
    type: 'APPLY_ELEMENT_ACTION',
    actionType,
    actionArgs
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

const setCurrentTruthTable = currentTruthTable => {
  return {
    type: 'SET_CURRENT_TRUTHTABLE',
    currentTruthTable
  };
};

const loadBoard = (boardMetaData, boardData) => {
  return {
    type: 'LOAD_BOARD',
    boardMetaData,
    boardData
  };
};

const loadBoardAsync = boardId => {
  return dispatch => {
    boardApi.getBoard(boardId).then(board => {
      const boardMetaData = { ...board };
      delete boardMetaData.versions;

      const versionData = board.versions[board.versions.length - 1];
      const boardData = JSON.parse(versionData.data);

      dispatch(loadBoard(boardMetaData, boardData));
    });
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

const getBoards = boards => {
  return {
    type: 'GET_BOARDS',
    boards
  };
};

const getBoardsAsync = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      boardApi.getBoards().then(boards => {
        dispatch(getBoards(boards));
        resolve();
      });
    });
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
  loadBoardAsync,
  updateBoard,
  updateSpec,
  getBoardsAsync,
  setCurrentTruthTable
};
