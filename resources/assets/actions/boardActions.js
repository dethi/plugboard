const clearBoard = () => {
  return {
    type: 'CLEAR_BOARD'
  };
};

const clearBoardDone = () => {
  return {
    type: 'CLEAR_BOARD_DONE'
  };
};

export default {
  clearBoard,
  clearBoardDone
};
