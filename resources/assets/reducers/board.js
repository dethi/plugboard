const board = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_BOARD':
      return {
        ...state,
        needClear: true
      };
    case 'CLEAR_BOARD_DONE':
      return {
        ...state,
        needClear: false
      };
    default:
      return state;
  }
};

export default board;
