const board = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD':
      if (!state.clear) state.clear = 0;
      return {
        ...state,
        clear: state.clear + 1
      };
    case 'APPLY_ELEMENT_ACTION':
      if (!state.applyElementAction) state.applyElementAction = 0;
      return {
        ...state,
        applyElementAction: state.applyElementAction + 1,
        actionType: action.actionType,
        actionArgs: action.actionArgs
      };
    case 'PREPARE_BOARD_SAVE':
      if (!state.prepare) state.prepare = 0;
      return {
        ...state,
        prepare: state.prepare + 1
      };
    case 'PREPARE_BOARD_COMPONENT':
      if (!state.prepareForComponent) state.prepareForComponent = 0;
      return {
        ...state,
        prepareForComponent: state.prepareForComponent + 1
      };
    case 'PREPARE_CONTEXT_MENU':
      if (!state.prepareContextMenu) state.prepareContextMenu = 0;
      return {
        ...state,
        prepareContextMenu: state.prepareContextMenu + 1
      };
    case 'SET_BOARD_METADATA':
      return {
        ...state,
        boardMetaData: action.boardMetaData
      };
    case 'DELETE_BOARD_METADATA':
      delete state.boardMetaData;
      return state;
    case 'LOAD_BOARD':
      if (!state.load) state.load = 0;
      return {
        ...state,
        boardMetaData: action.boardMetaData,
        boardData: action.boardData,
        load: state.load + 1
      };
    case 'UPDATE_BOARD':
      return {
        ...state,
        boardData: action.boardData,
        preview: action.preview
      };
    case 'UPDATE_SPEC':
      return {
        ...state,
        spec: action.spec
      };
    case 'GET_BOARDS':
      return {
        ...state,
        boards: action.boards
      };
    case 'SET_CURRENT_TRUTHTABLE':
      return {
        ...state,
        currentTruthTable: action.currentTruthTable
      };
    default:
      return state;
  }
};

export default board;
