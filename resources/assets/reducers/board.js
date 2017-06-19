const board = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD':
      if (!state.clear) state.clear = 0;
      return {
        ...state,
        clear: state.clear + 1
      };
    case 'PREPARE_BOARD_SAVE':
      if (!state.prepare) state.prepare = 0;
      return {
        ...state,
        prepare: state.prepare + 1
      };
    case 'SET_BOARD_METADATA':
      return {
        ...state,
        boardMetaData: action.boardMetaData
      };
    case 'LOAD_BOARD':
      return {
        ...state,
        boardMetaData: action.boardMetaData,
        boardData: action.boardData
      };
    case 'UPDATE_BOARD':
      return {
        ...state,
        boardData: action.boardData,
        preview: action.preview
      };
    default:
      return state;
  }
};

export default board;
