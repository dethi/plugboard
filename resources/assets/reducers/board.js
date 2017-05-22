const board = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD':
      if (!state.clear) state.clear = 0;
      return {
        ...state,
        clear: state.clear + 1
      };
    case 'UPDATE_PREVIEW':
      return {
        ...state,
        preview: action.preview
      };
    default:
      return state;
  }
};

export default board;
