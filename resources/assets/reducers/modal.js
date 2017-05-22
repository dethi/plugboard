const modal = (state = {}, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case 'DISPLAY_MODAL':
      newState[action.name] = true;
      return newState;
    case 'HIDE_MODAL':
      delete newState[action.name];
      return newState;
    default:
      return state;
  }
};

export default modal;
